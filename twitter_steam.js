var twitter = require('twitter');
var elasticsearch = require('elasticsearch');
var moment = require('moment');

var client = elasticsearch.Client({
  hosts: [
    'localhost:9200',
  ]
});

var twitter = new twitter({
  consumer_key:        '',
  consumer_secret:     '',
  access_token_key:    '',
  access_token_secret: ''
});

twitter.stream('statuses/filter', {
    'locations':'132.2,29.9,146.2,39.0,138.4,33.5,146.1,46.20'
}, function(stream) {
    stream.on('data', function(data) {
        var body = {
            tweet_id :        data.id,
            text :            data.text,
            time :            moment(data.created_at).unix(),
            user_id :         data.user.id,
            user_name :       data.user.name,
            retweet_count :   data.retweet_count,
            favorite_count:   data.favorite_count
        };
        client.create({
            index: 'twitter',
            type:  'tweet',
            body:  body
        });
        console.log(body);
    });
    stream.on('error', function(response) {
        console.log(response);
    });
});
