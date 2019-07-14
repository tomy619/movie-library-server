var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MovieSchema = new Schema({

  name: {
    
  },

  poster_Image: {
   
  },
  save_Date:{
    
  }


});

module.exports = mongoose.model('Movie', MovieSchema);