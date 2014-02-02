#!/bin/sh
curl -XPOST localhost:9200/twitter -d '{
    "settings" : {
        "number_of_shards" : 1
    },
    "mappings" : {
        "tweet" : {
            "properties" : {
                "tweet_id" : {
                  "type" : "long",   "index" : "analyzed"
                },
                "text" : {
                  "type" : "string", "index" : "analyzed"
                },
                "time" : {
                  "type" : "long",   "index" : "not_analyzed"
                },
                "user_id" : {
                  "type" : "string",   "index" : "analyzed"
                },
                "user_name" : {
                  "type" : "string",   "index" : "analyzed"
                },
                "retweet_count" : {
                  "type" : "integer",   "index" : "not_analyzed"
                },
                "favorite_count" : {
                  "type" : "integer",   "index" : "not_analyzed"
                }
            }
        }
    }
}'

