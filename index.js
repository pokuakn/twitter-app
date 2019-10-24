const Twit = require("twit");
const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);
const emojiRegex = require("emoji-regex");
const regex = emojiRegex();

const T = new Twit({
  consumer_key: "",
  consumer_secret: "",
  access_token: "",
  access_token_secret: "",
  timeout_ms: 60 * 1000, // optional HTTP request timeout to apply to all requests.
  strictSSL: true // optional - requires SSL certificates to be valid.
});

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

io.on("connection", function(socket) {
  const stream = T.stream("statuses/sample");

  stream.on("tweet", function(tweet) {
    const text = tweet.text;
    const startTime = new Date();
    let emojis = [];
    let match;

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
