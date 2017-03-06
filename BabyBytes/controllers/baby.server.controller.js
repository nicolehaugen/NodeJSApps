var mongoose = require('mongoose'),
    babyModel = mongoose.model('Baby'),
    express = require('express'),
    moment = require('moment');

exports.create = function(req, res, next) {
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

//Finds baby by id and passes it on response so that it can be used further on down 
//in callback chain, such as by an update or delete method
exports.findById = function(req, res, next) {
    var babyId = req.params.id;

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

exports.findByIdJson = function(req, res) {
    findById(req, res, false);
};

exports.findByIdView = function(req, res) {
    findById(req, res, true);
};

findById = function(req, res, isRendered) {
    var babyId = req.params.id;

    babyModel.findById(babyId, function(err, baby, n) {
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

exports.addLogJson = function(req, res) {
    addLog(req, res, false);
};

exports.addLogView = function(req, res) {
    addLog(req, res, true);
};

addLog = function(req, res, isRendered) {
    var baby = res.baby;
    baby.dailyLogs.push({ date: req.body.logDate });

    baby.save(function(err) {
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