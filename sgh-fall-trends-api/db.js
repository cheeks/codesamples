var mongoose   = require('mongoose');
var Schema     = mongoose.Schema;

var voteSchemaMen   = new Schema({ _id: Number, upc: Number, votes: Number }, { collection: 'men' });
var voteSchemaWomen = new Schema({ _id: Number, upc: Number, votes: Number }, { collection: 'women' });

mongoose.model('VoteMen', voteSchemaMen);
mongoose.model('VoteWomen', voteSchemaWomen);

// mongoose.connect('mongodb://localhost/fall-trends');
mongoose.connect('mongodb://evb:fifty5un1on@ds027509.mongolab.com:27509/heroku_app26557166');