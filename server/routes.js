const express = require('express');
const router = express.Router();
const Services = require('./services');
const test = require('./test');

module.exports = router;

router.get('/', function(req, res) {
  res.send('/client/index.html');
});

router.get('/api/tests/fillEpisode', function(req, res) {
  let targeted = Services.fillEpisodeWithAds(test.episode, test.campaigns);
  res.send(targeted);
});

router.get('/api/tests/largestTrough/cases/:caseId', function(req, res) {
  let checklist = test.checklist[req.params.caseId] ? test.checklist[req.params.caseId].input : undefined;
  if (checklist) {
    let largestTroughStats = Services.largestTrough(checklist);
    res.send(largestTroughStats);
  } else {
    res.status(404).send(`Test case #${req.params.caseId} is undefined.`);
  }
});

router.post('/api/episodes', function(req, res) {
  const ep = JSON.parse(req.body.episode);
  const campaigns = JSON.parse(req.body.adCampaigns);
  let finishedEpisode = Services.fillEpisodeWithAds(ep, campaigns);
  // Create database entry for /api/episodes/:id/audio
  res.send(finishedEpisode);
});
