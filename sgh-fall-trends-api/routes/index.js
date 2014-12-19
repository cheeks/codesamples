var mongoose = require('mongoose');
var VoteMen = mongoose.model('VoteMen');
var VoteWomen = mongoose.model('VoteWomen');

exports.addVote = function (req, res) {
  if (req.params.gender === 'men') {
    var Vote = VoteMen;
  } else if (req.params.gender === 'women') {
    var Vote = VoteWomen;
  } else {
    return res.json(400, {'error': '1st param needs to be "men" or "women".'});
  }

  var id = req.params.id;
  var reg = new RegExp('^[0-9]+$');

  if (!reg.test(id)) {
    return res.json(400, {'error': '2nd param needs to be a Number.'});
  }

  Vote.findByIdAndUpdate(parseInt(id), { $inc: { votes: 1 }}, function (err, vote) {
    if (err) return res.json(500, {'error': 'server error'});
    res.jsonp(vote);
  });
};

exports.getVotes = function (req,res) {
  if (req.params.gender === 'men') {
    var Vote = VoteMen;
  } else if (req.params.gender === 'women') {
    var Vote = VoteWomen;
  } else {
    return res.json(400, {'error': '1st param needs to be "men" or "women".'});
  }

  Vote
    .find()
    .sort({votes: 'desc'})
    .limit(3)
    .exec(function (err, data) {
      if (err) return res.json(500, {'error': 'server error'});
      res.jsonp(data);
    });
};