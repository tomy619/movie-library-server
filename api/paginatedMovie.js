var express = require('express');

require('../app/config')

var pageMovie = express.Router();

pageMovie.get('/',(req,res) => {

    var pageNo = parseInt(req.query.pageNo)
    var size = 20
    var query = {}
    if(pageNo < 0 || pageNo === 0) {
          response = {"error" : true,"message" : "invalid page number, should start with 1"};
          return res.json(response)
    }
    query.skip = size * (pageNo - 1)
    query.limit = size
    // Find some documents
         Movie.countDocuments({},function(err,totalCount) {
               if(err) {
                 response = {"error" : true,"message" : "Error fetching data"}
               }
           Movie.find({},{},query).sort('_id').exec(function(err,data) {
                // Mongo command to fetch all data from collection.
              if(err) {
                  response = {"error" : true,"message" : "Error fetching data"};
              } else {
                  var totalPages = Math.ceil(totalCount / size)
                  response = {"error" : false,"movies" : data,"pages": totalPages};
              }
              res.json(response);
           });
         })
  })

  module.exports = pageMovie;