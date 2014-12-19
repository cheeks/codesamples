require('./db');

var express  = require('express'),
    routes   = require('./routes'),
    logfmt   = require("logfmt");

var app = express();

app.use(logfmt.requestLogger());

// app.get('/', routes.index);
app.get('/vote/:gender/:id', routes.addVote);
app.get('/get_votes/:gender', routes.getVotes);

var port = process.env.PORT || 8080;
app.listen(port, function () {
  console.log('listening to ' + port);
});

module.exports = app;
