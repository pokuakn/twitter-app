# twitter-app
An application that connects to the Tweets API and processes incoming tweets to compute various statistics. 

Twitter API sample endpoint provides a random sample of approximately 1% of the full tweet stream. This app consumes the sample stream and keeps track of the following:

<ul>
 <li>Total number of tweets received</li>
 <li>Average tweets per hour/minute/second</li>
 <li>Top emojis in tweets</li>
 <li>Percent of tweets that contains emojis</li>
 <li>Top hashtags</li>
 <li>Percent of tweets that contain a url</li>
 <li>Percent of tweets that contain a photo url (pic.twitter.com, pbs.twimg.com, or instagram)</li>
 <li>Top domains of urls in tweets</li>
   </ul>

This app what built in Nodejs and depends on:

<ul>
  <li>Express for the server.</li>
 <li> socket.io for realtime websockets.</li>
 <li>Twitter API for live data.</li>
 <li>Emoji Regex Datasource</li>
  </ul>
