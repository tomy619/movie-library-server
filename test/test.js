process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
require('../app/config')

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();
var expect = chai.expect;

chai.use(chaiHttp);
describe('movies', () => {

    // beforeEach((done) => { 
    //     Book.remove({}, (err) => { 
    //        done();           
    //     });        
    // });

    describe('/GET movie', () => {
      it('it should GET all the movies', (done) => {
        chai.request(server)
            .get('/getMovie/getMovie')
            .end((err, res) => {

                  res.should.have.status(200);
                res.should.be.an('object');
                expect(res.body.movies).to.be.a('array');

              done();
            });
      });


      it('it should GET some of the movies', (done) => {
        chai.request(server)
            .get('/getPaginatedMovie')
            .end((err, res) => {

                res.should.have.status(200);
                res.should.be.an('object');
                expect(res.body.movies).to.be.a('array');


              done();
            });
      });

  });

});