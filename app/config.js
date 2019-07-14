Movie = require(__dirname + '/model'); // get the mongoose user model

var mongoose = require('mongoose');
var database =  'mongodb://diagnal:qwert12345@ds351107.mlab.com:51107/media-library';

mongoose.connect(database, { useNewUrlParser: true });

var db = mongoose.connection;
db.on('error', (err) => {
    // console.error.bind(console, 'connection error:')
    console.log('MONGO DB CONNECT FAILED');
    console.log(err);

});
db.once('open', function () {
    console.log('MONGO DB CONNECTED');
});

