var express = require('express');
var fs = require('fs');

require('../app/config')

var movie = express.Router();

module.exports = movie;


movie.get('/getMovie', (req,res)=>{

    Movie.find({ }).sort('_id').exec(function (err, result) {
        res.send({ movies: result });
    })
})

movie.get('/getMoviePage', (req,res)=>{

    Movie.find({},{},{ skip: 0, limit: 20 }).sort('_id').exec(function (err, result) {
        res.send({ movies: result });
    })
})

movie.get('/addMovie', (req,res)=>{

    for(j=1;j<4;j++){

    let rawdata = fs.readFileSync('./data/'+j+'.json');  
    let student = JSON.parse(rawdata);  


   student.page['content-items'].content.map(media=>{


        var movie = new Movie();
        movie.name = media.name;
        movie.poster_Image = 'https://movie-library-server.herokuapp.com/img/'+media['poster-image']
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

})