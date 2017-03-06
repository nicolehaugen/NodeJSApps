var mongoose = require('mongoose'),
    offerModel = mongoose.model('Offer'),
    express = require('express');

exports.create = function(req, res) {
    var offer = new offerModel(req.body);

    offer.save(function(err) {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            res.json(offer);

        }
    });
};

exports.list = function(req, res) {
    offerModel.find(function(err, offers) {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            res.json(offers);

        }
    });

    var getErrorMessage = function(err) {
        if (err.errors) {
            for (var errName in err.errors) {
                if (err.errors[errName].message) return err.errors[errName].message;
            }
        } else {
            return 'Unknown server error';
        }
    };

};