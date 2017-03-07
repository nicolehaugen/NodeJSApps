var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    offer = require("./offer.server.model"),
    baby = require("./baby.server.model")
moment = require('moment');

var DailyLogSchema = new Schema({
    date: {
        type: Date,
        //max: [moment.get('date'), 'Daily log date is in future'],
        //min: [baby.modelSchema.birthDate, 'Daily log date is older than child'],
        default: Date.now //,
            //required: 'Log date is required'
    },
    totalUnitsConsumed: {
        type: Number,
        default: '0',
        trim: true,
        required: 'Units Consumed is required'
    },

    offers: [offer.modelSchema]
});

mongoose.model('DailyLog', DailyLogSchema);
exports.modelSchema = DailyLogSchema;