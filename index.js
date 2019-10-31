require("./server/bootstrap");

const twit = require("twit");
const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);
const emojiRegex = require("emoji-regex");
const regex = emojiRegex();
const chalk = require("chalk");
const streamError = require("./error/index");

const T = new twit({
  consumer_key: process.env.TWITTER_API_KEY,
  consumer_secret: process.env.TWITTER_API_SECRET,
  access_token: process.env.TWITTER_ACCESS_TOKEN,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
  timeout_ms: 60 * 1000
});

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

io.on("connection", function(socket) {
  const stream = T.stream("statuses/sample");
  stream.on("error", streamError);
  stream.on("tweet", function(tweet) {
    const text = tweet.text;
    const startTime = new Date();
    let emojis = [];
    let match;
    // console.log(
    //   "firehose Tweet",
    //   chalk.green(tweet.user.screen_name, " : ", tweet.text)
    // );
    while ((match = regex.exec(text))) {
      const emoji = match[0];
      let e = {
        codepoints: [...emoji].length,
        emoji: emoji
      };
      emojis.push(e);
    }
    // add emoji node to tweet entities object
    tweet.entities["emojis"] = emojis;
    socket.emit("startTime", startTime);
    socket.emit("tweet", { t: tweet });
  });
});

//listen for HTTP requests :)
const port = process.env.PORT || 3000;
const listener = server.listen(port, function() {
  console.log("Your app is listening on port " + listener.address().port);
});
