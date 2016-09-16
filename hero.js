var Twit = require('twit');
var config = require('./conf');

var T = new Twit(config);

var stream = T.stream('statuses/filter', { track: '#herohelpline' })

stream.on('tweet', function (tweet) {
  console.log(tweet);
  var caller = tweet.user.screen_name;
  var tweetId = tweet.id_str;

 T.post('statuses/update', {status: 'Please @'+caller+' '+'come back later', in_reply_to_status_id: tweetId}, function (error, response) {
    if (response) {
      console.log('Success! Hero is on its way.');
    }
    if (error) {
      console.log('There was an error with Twitter:', error);
    }
  });
})
