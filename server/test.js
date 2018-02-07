module.exports = {
  
  episode: { audio: '[PRE]++++++++[POST]', id: '892' },

  campaigns: [
    [
      { audio: '*AcmeA*', type: 'PRE', targets: ['892'], revenue: 1 },
    ],
    [
      { audio: '*TacoCat*', type: 'MID', targets: ['892'], revenue: 3 }
    ],
    [
      { audio: '*CorpCorpA*', type: 'POST', targets: ['892'], revenue: 11 },
    ]
  ],

  checklist: [
    { input: [5, 3, 7, 2, 6, 4, 5, 9, 1, 2], output: [3, 8, 11] },
    { input: [5, 3, 7, 2, 6, 4, 5, 6, 1, 2], output: [3, 5, 4] },
    { input: [], output: false },
    { input: [5], output: false },
    { input: [5, 10], output: false },
    { input: [1, 2, 3], output: false },
    { input: [3, 2, 1], output: false },
    { input: [2, 3, 2], output: false },
    { input: [2, 1, 3], output: [1, 3, 1] },
    { input: [2, 0, 3], output: [1, 3, 2] },
    { input: [2, 3, 4, 3, 1, 2], output: [4, 6, 1] },
    { input: [2, 3, 4, 3, 1, 2, 1, 1, 1], output: [4, 6, 1] },
    { input: [5, 3, 7, 8, 8, 7, 7, 2, 6, 4, 5, 9, 1, 2], output: [7, 12, 11] },
  ],

};