var mongoose = require('mongoose'),
    dailyLogModel = mongoose.model('DailyLog'),
    express = require('express'),
    moment = require('moment');

/*exports.create = function(req, res) {
var dailyLog = new dailyLogModel(req.body);

if (req.user.userType === "employee") {

    //Add some fake data
    var numDailyLogs = baby.dailyLogs.push({ totalUnitsConsumed: '3' });
    baby.dailyLogs[numDailyLogs - 1].offers.push({ unitsConsumed: '10', offeredBy: 'Amy Smith' });
    baby.dailyLogs[numDailyLogs - 1].offers.push({ unitsConsumed: '5', offeredBy: 'Amy Smith' });
    baby.dailyLogs[numDailyLogs - 1].offers.push({ unitsConsumed: '6', offeredBy: 'Jane Larson' });

    dailyLog.save(function(err) {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            res.json(dailyLog);

        }
    });
}
}; */

exports.findByIdJson = function(req, res) {
    findLogById(req, res, false);
};

exports.findByIdView = function(req, res) {
    findLogById(req, res, true);
};

findLogById = function(req, res, isRendered) {
    var logid = req.params.logid;
    var baby = res.baby;
    var log = baby.dailyLogs.id(logid);

    if (log == null) {
        return res.status(400).send({
            message: getErrorMessage(err)
        });
    } else {
        if (isRendered) {
            res.render('babylogview', { baby, log });
        } else {
            res.json(log);
        }
    }
};

exports.list = function(req, res) {
    dailyLogModel.find(function(err, dailyLogs) {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            res.json(dailyLogs);

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

exports.addLogJson = function(req, res) {
    addLog(req, res, false);
};

exports.addLogView = function(req, res) {
    addLog(req, res, true);
};

addLog = function(req, res, isRendered) {
    var baby = res.baby;

    var logIndex = baby.dailyLogs.push({ date: req.body.logDate });

    //For now, add some fake data for the number of bottle offerings for this day
    baby.dailyLogs[logIndex - 1].offers.push({ unitsConsumed: '10', offeredBy: 'Amy Smith', time: moment.now().time });
    baby.dailyLogs[logIndex - 1].offers.push({ unitsConsumed: '5', offeredBy: 'Amy Smith', time: moment.now().time });
    baby.dailyLogs[logIndex - 1].offers.push({ unitsConsumed: '6', offeredBy: 'Jane Larson', time: moment.now().time });

    baby.save(function(err) {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            if (isRendered) {
                res.redirect("back");
            } else {
                res.json(baby);
            }
        }
    });
};