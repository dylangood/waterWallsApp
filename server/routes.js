const express = require('express');
const router = express.Router();
const Services = require('./services');
const test = require('./test');

module.exports = router;

router.get('/', function(req, res) {
  res.send('/client/index.html');
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

router.get('/api/tests/mapTroughs/cases/:caseId', function(req, res) {
  let checklist = test.checklist[req.params.caseId] ? test.checklist[req.params.caseId].input : undefined;
  if (checklist) {
    let troughMap = Services.mapTroughs(checklist);
    res.send(troughMap);
  } else {
    res.status(404).send(`Test case #${req.params.caseId} is undefined.`);
  }
});

router.get('/api/tests/mapAllTroughs/cases/:caseId', function(req, res) {
  let checklist = test.checklist[req.params.caseId] ? test.checklist[req.params.caseId].input : undefined;
  if (checklist) {
    let troughMap = Services.mapAllTroughs(checklist);
    res.send(troughMap);
  } else {
    res.status(404).send(`Test case #${req.params.caseId} is undefined.`);
  }
});

router.post('/api/mapAllTroughs', function(req, res) {
  const body = req.body;
  let troughMap = Services.mapAllTroughs(body.heights);
  res.send({troughMap});
});

router.post('/api/largestTrough', function(req, res) {
  const body = req.body;
  let largestTrough = Services.largestTrough(body.heights);
  res.send({largestTrough});
});

router.post('/api/mapAllTroughs');