const express = require('express');
const router = express.Router();
const Services = require('./services');
const test = require('./test');

module.exports = router;

router.get('/', function(req, res) {
  res.send('/client/index.html');
});

router.get('/api/test', function(req, res) {
  var targeted = Services.fillEpisodeWithAds(test.episode, test.campaigns);
  res.send(targeted);
});

router.post('/api/episodes', function(req, res) {
  const ep = JSON.parse(req.body.episode);
  const campaigns = JSON.parse(req.body.adCampaigns);
  var finishedEpisode = Services.fillEpisodeWithAds(ep, campaigns);
  // Create database entry for /api/episodes/:id/audio
  res.send(finishedEpisode);
});
