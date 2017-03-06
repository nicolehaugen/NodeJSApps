var mongoose = require('mongoose'),
    dailyLogModel = mongoose.model('DailyLog'),
    express = require('express');

exports.create = function(req, res) {
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