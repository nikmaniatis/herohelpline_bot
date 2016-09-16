var Twit = require('twit');
var config = require('./conf');

var T = new Twit(config);

var stream = T.stream('statuses/filter', { track: '#herohelpline' })

stream.on('tweet', function (tweet) {
  console.log(tweet)
})
