var express = require('express');
var app = express()
const fs = require('fs');
var bodyParser = require('body-parser');
var cors = require("cors");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());

require('./app/config')

app.get('/getMovie', (req,res)=>{

    Movie.find({ }).sort('_id').exec(function (err, result) {
        res.send({ movies: result });
    })
})

app.get('/getMoviePage', (req,res)=>{

    Movie.find({},{},{ skip: 0, limit: 20 }).sort('_id').exec(function (err, result) {
        res.send({ movies: result });
    })
})

app.get('/getPaginatedMovie',(req,res) => {
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
         Movie.count({},function(err,totalCount) {
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

app.post('/trial', (req,res)=>{

    for(j=1;j<4;j++){

    let rawdata = fs.readFileSync('./data/'+j+'.json');  
    let student = JSON.parse(rawdata);  


   let mediaLib =  student.page['content-items'].content.map(media=>{


        var movie = new Movie();
        movie.name = media.name;
        movie.poster_Image = 'https://viewbox-media-content.s3.us-west-2.amazonaws.com/tomy/'+media['poster-image']
        movie.save_Date =  Date.now();
    
        movie.save(function (err, success) {
            if (err) {
                console.log('ERROR');
                res.send('ERROR');
            }
            else {
                return success
            }
        });        

    })

    if(j === 3){
        res.send('success');
    }
    
}


    // Promise.all(mediaLib).then(response=>{
    //     console.log('====================================');
    //     console.log(i);
    //     console.log('====================================');
    //     res.send('success');

    // })



})




app.listen(9090,()=> console.log("SERVER STARTTED AT 9090"))