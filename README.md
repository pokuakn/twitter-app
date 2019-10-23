# twitter-app
An application that connects to the Tweets API and processes incoming tweets to compute various statistics. 

Twitter API sample endpoint provides a random sample of approximately 1% of the full tweet stream. This app consumes the sample stream and keeps track of the following:

Total number of tweets received
Average tweets per hour/minute/second
Top emojis in tweets
Percent of tweets that contains emojis
Top hashtags
Percent of tweets that contain a url
Percent of tweets that contain a photo url (pic.twitter.com, pbs.twimg.com, or instagram)
Top domains of urls in tweets

This app what built in Nodejs and depends on:

Express for the server.
socket.io for realtime websockets.
Twitter API for live data.
Emoji Regex Datasource
