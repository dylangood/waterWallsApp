const _ = require('lodash');

module.exports = {

  measureTrough: function measureWaterWallsTrough(section) {
    let waterLevel = Math.min(section[0], section[section.length - 1]);
    let waterVolume = 0;
    for (let i = 1; i < section.length - 1; i++) {
      waterVolume += Math.max(0, waterLevel - section[i]);
    }
    return waterVolume;
  },

  fillTrough: function addWaterToWaterWallsTrough(section) {
    let waterLevel = Math.min(section[0], section[section.length - 1]);
    return section.map( wallHeight => {
      return { blocks: wallHeight, water: Math.max(0, waterLevel - wallHeight) };
    });
  },
  
  mapTroughs: function mapTroughsClimbingTowardsPeak(heights) {
    let troughMap = [];
    let leftWall = 0;
    let rightWall = 1;
    for (let i = 2; i < heights.length; i++) {
      if (heights[i] >= heights[leftWall]) {
        rightWall = i;
        let mappedSection = this.fillTrough(heights.slice(leftWall, rightWall + 1));
        troughMap = troughMap.concat(mappedSection.slice(0, -1));
        leftWall = i;
        rightWall = i + 1;
      }
    }
    troughMap.push({ blocks: heights[heights.length - 1], water: 0 });
    return troughMap;
  },

  findTroughs: function findTroughsClimbingTowardsPeak(heights) {
    let troughData = false;
    let leftWall = 0;
    let rightWall = 1;
    for (let i = 2; i < heights.length; i++) {
      if (heights[i] >= heights[leftWall]) {
        rightWall = i;
        let capacity = this.measureTrough(heights.slice(leftWall, rightWall + 1));
        if (capacity && (!troughData || capacity > troughData[2])) {
          troughData = [1 + leftWall, 1 + rightWall, capacity];
        }
        leftWall = i;
        rightWall = i + 1;
      } 
    }
    return troughData;
  },

  largestTrough: function findLargestWaterWallsTrough(heights) {
    
    if (heights.length < 3) { return false; }
    
    let peak = heights.indexOf(Math.max(...heights));
    
    let west = heights.slice(0, peak + 1);
    let east = heights.slice(peak).reverse();
    
    let westBest = this.findTroughs(west);
    let eastBest = this.findTroughs(east);
    if (eastBest) {
      eastBest = [heights.length - eastBest[1] + 1, heights.length - eastBest[0] + 1, eastBest[2]];
    }
    if (eastBest && westBest) {
      return eastBest[2] > westBest[2] ? eastBest : westBest;
    } else {
      return westBest || eastBest || false;
    } 
  },

  countAllSlots: function(audio) {
    var slots = {};
    slots.pre = this.countSlots(audio, '[PRE]');
    slots.mid = this.countSlots(audio, '[MID]');
    slots.post = this.countSlots(audio, '[POST]');
    return slots;
  },

  countSlots: (audio, tag) => {
    var count = 0;
    var position = audio.indexOf(tag);
    while (position > -1) {
      count += 1;
      position = audio.indexOf(tag, position + 1);
    }
    return count;
  },
  
  filterByEpId: (episode) => {
    return (adCampaigns) => {
      return adCampaigns.filter( campaign => {
        return campaign[0].targets.includes(episode.id);
      });
    };
  },

  filterBySlots: (slots) => {
    return (decoratedAdCampaigns) => {
      return decoratedAdCampaigns.filter( campaign => {
        return campaign.meta.slotsRequired.pre <= slots.pre 
          && campaign.meta.slotsRequired.mid <= slots.mid
          && campaign.meta.slotsRequired.post <= slots.post;
      });
    };
  },

  decorateCampaignsMeta: (campaigns) => {
    return campaigns.map( adCampaign => {
      var meta = {};
      meta.slotsRequired = adCampaign.reduce( (slots, ad) => {
        if (ad.type === 'PRE') {
          slots.pre += 1;
        } else if (ad.type === 'MID') {
          slots.mid += 1;
        } else if (ad.type === 'POST') {
          slots.post += 1;
        }
        return slots;
      }, { pre: 0, mid: 0, post: 0 } );
      meta.totalRev = adCampaign.reduce( (sum, ad) => {
        return sum + ad.revenue;
      }, 0);
      meta.averageRev = meta.totalRev / ( meta.slotsRequired.pre + meta.slotsRequired.mid + meta.slotsRequired.post );
      return { meta, adCampaign }; 
    });
  },

  fillEpisodeWithAds: function(episode, adCampaigns) {
    var episodeAudioWithAds = episode.audio;
    var slots = this.countAllSlots(episodeAudioWithAds);

    var filterCampaignsByEpId = this.filterByEpId(episode);
    var targetedAdCampaigns = filterCampaignsByEpId(adCampaigns);
    targetedAdCampaigns = this.decorateCampaignsMeta(targetedAdCampaigns);
    var filterCampaignsBySlots = this.filterBySlots(slots);
    targetedAdCampaigns = filterCampaignsBySlots(targetedAdCampaigns);
    targetedAdCampaigns.sort( (a, b) => {
      return a.meta.averageRev - b.meta.averageRev;
    });

    while ( targetedAdCampaigns.length && (slots.pre || slots.mid || slots.post) ) {
      var best = targetedAdCampaigns.pop();
      best.adCampaign.forEach( ad => {
        episodeAudioWithAds = episodeAudioWithAds.replace(`[${ad.type}]`, ad.audio);
      });
      slots = this.countAllSlots(episodeAudioWithAds);
      filterCampaignsBySlots = this.filterBySlots(slots);
      targetedAdCampaigns = filterCampaignsBySlots(targetedAdCampaigns);
    }

    if (slots.pre || slots.mid || slots.post) {
      episodeAudioWithAds = episodeAudioWithAds.replace(/\[PRE\]|\[MID\]|\[POST\]/g, '');
    }
    
    return episodeAudioWithAds;
  },

};