var app = require('../app.js'),
    request = require('supertest'),
    should = require('should'),
    mongoose = require('mongoose'),
    User = mongoose.model('User'),
    Baby = mongoose.model('Baby'),
    users = require('../controllers/user.server.controller'),
    babies = require('../controllers/baby.server.controller'),
    mockhttp = require('node-mocks-http');

var user, baby;

/*//Mocks a response that simply adds an event emitter - this is needed so that when the 
//controller finishes, it is able to trigger an end event
function buildResponse() {
  return http_mocks.createResponse({eventEmitter: require('events').EventEmitter})
}



describe('Welcome Controller Tests', function() {

    it ('Find baby by id', function(done) {
        var response = buildResponse();
        var request = mockhttp.createRequest({
            method: 'GET',
            url: ''
        })

    })

})*/

describe('Baby Controller Unit Tests:', function() {
    beforeEach(function(done) {
        user = new User({
            firstName: 'Full',
            lastName: 'Name',
            displayName: 'Full Name',
            email: 'test@test.com',
            username: 'username',
            password: 'password',
            provider: 'local'
        });

        user.save(function() {
            baby = new Baby({
                birthDate: '12/31/2012',
                firstName: 'Presley',
                lastName: 'Larson',
                remainingUnits: 10,
                unitOfMeasure: 'Ounces',
                parent: user
            });

            baby.save(function(err) {
                done();
            });
        });
    });

    describe('Testing the GET methods', function() {
        it('Should be able to get the list of babies', function(done) {

            var creds = {
                username: 'username',
                password: 'password'
            };

            babies.findByIdJson()

            request(app).post('/users/signin')
                .type("form")
                .send(creds)
                .set("Content-Type", "application/json")
                .expect(200)
                .end(function(err, res) {
                    should.not.exist(err);
                    done();
                });

            request(app).get('/baby/json/')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function(err, res) {
                    res.body.should.be.an.Array.and.have.lengthOf(1);
                    res.body[0].should.have.property('firstName', baby.firstName);
                    res.body[0].should.have.property('lastName', baby.lastName);

                    done();
                });
        });

        it('Should be able to find the baby', function(done) {
            request(app).get('/baby/json/' + baby.id)
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function(err, res) {
                    res.body.should.be.an.Object.and.have.property('firstName', baby.firstName);
                    res.body.should.have.property('lastName', baby.lastName);

                    done();
                });
        });
    });

    /* afterEach(function(done) {
         Baby.remove().exec();
         User.remove().exec();
         done();
     });*/
});