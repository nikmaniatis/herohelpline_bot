var Twit = require('twit');
var request = require('request');
var config = require('./conf');

var T = new Twit(config);

var stream = T.stream('statuses/filter', { track: '#herohelpline' })

stream.on('tweet', function (tweet) {
  // console.log(tweet);
  var caller = tweet.user.screen_name;
  var tweetId = tweet.id_str;
  var helpText = tweet.text;
  console.log(helpText);

//helpline call starts
  // Set the headers
  var headers = {
      'User-Agent':       'Super Agent/0.0.1',
      'Content-Type':     'application/x-www-form-urlencoded'
  }

  // Configure the request
  var options = {
      url: 'http://herohelpline.com',
      method: 'POST',
      headers: headers,
      form: {'text': helpText}
  }

  // Start the request
  request(options, function (error, response, body) {
      if (!error && response.statusCode == 200) {
          // Print out the response body
          console.log(body)
      }
  })

  //helpline call ends



 T.post('statuses/update', {status: 'Please @'+caller+' '+'come back later', in_reply_to_status_id: tweetId}, function (error, response) {
    if (response) {
      console.log('Success! Hero is on its way.');

    }
    if (error) {
      console.log('There was an error with Twitter:', error);
    }
  });
})
