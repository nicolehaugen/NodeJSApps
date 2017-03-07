var mongoose = require('mongoose'),
    babyModel = mongoose.model('Baby'),
    express = require('express'),
    moment = require('moment');

//Returns json for created baby
exports.createJson = function(req, res, next) {
    var baby = new babyModel(req.body);
    baby.parent = req.user;

    baby.save(function(err) {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            res.json(baby);
            next();
        }
    });
};

//Redirects back to the previous view
exports.createView = function(req, res, next) {
    var baby = new babyModel(req.body);
    baby.parent = req.user;

    baby.save(function(err) {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            res.redirect("back");
        }
    });
};

//Finds baby by id and sets it on the response so that it can be used further down 
//in callback chain, such as by an update or delete method
exports.findByIdRes = function(req, res, next) {
    var babyId = req.params.babyid;

    babyModel.findById(babyId, function(err, baby) {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            res.baby = baby;
            next();
        }
    });
};

//These find methods either render the found baby as a view or simply return the json
exports.findByIdJson = function(req, res) {
    findBabyById(req, res, false);
};

exports.findByIdView = function(req, res) {
    findBabyById(req, res, true);
};

findBabyById = function(req, res, isRendered) {
    var babyId = req.params.babyid;

    babyModel.findById(babyId, function(err, baby) {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            if (isRendered) {
                res.render('babydetailsview', { baby });
            } else {
                res.json(baby);
            }
        }
    });
};

exports.listJson = function(req, res) {
    list(req, res, false);
}

exports.listView = function(req, res) {
    list(req, res, true);
}

list = function(req, res, isRendered) {
    var callback = function(err, babies) {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            if (isRendered) {
                res.render('babyview', { babyList: babies });
            } else {
                res.json(babies);
            }
        }
    }

    //If the current user is a parent, only show their children
    if (req.user.userType === "parent") {
        babyModel.where('parent').equals(req.user).exec(callback);
    } else if (req.user.userType === "employee") {
        //Otherwise, assume the user is an employee and show all children
        babyModel.find(callback);
    } else {
        //TODO: Show error
    }
};

var getErrorMessage = function(err) {
    if (err.errors) {
        for (var errName in err.errors) {
            if (err.errors[errName].message) return err.errors[errName].message;
        }
    } else {
        return 'Unknown server error';
    }
};