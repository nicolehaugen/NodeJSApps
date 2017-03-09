var app = require('../app.js'),
    should = require('should'),
    mongoose = require('mongoose'),
    User = mongoose.model('User'),
    Baby = mongoose.model('Baby');

var user, baby;

describe('Baby Model Unit Tests:', function() {
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

            done();
        });
    });

    describe('Testing the save method', function() {

        it('Should be able to save without problems', function() {
            baby.save(function(err) {
                should.not.exist(err);
            });
        });

        it('Should not be able to save a baby without a first name', function() {
            baby.firstName = '';

            baby.save(function(err) {
                should.exist(err);
            });
        });
    });

    /*afterEach(function(done) {
        Baby.remove(function() {
            User.remove(function() {
                done();
            });
        });
    });*/
});