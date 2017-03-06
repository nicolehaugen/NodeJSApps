var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    dailyLog = require("./dailylog.server.model"),
    moment = require('moment');

var BabySchema = new Schema({
    birthDate: {
        type: Date,
        default: moment().startOf('year').toDate(),
        required: 'Birth Date is required'
    },
    firstName: {
        type: String,
        default: '',
        trim: true,
        required: 'First Name is required'
    },
    lastName: {
        type: String,
        default: '',
        trim: true,
        required: 'Last Name is required'
    },
    remainingUnits: {
        type: Number,
        default: '',
        trim: true,
        required: 'Remaining Units is required'
    },
    unitOfMeasure: {
        type: String,
        default: 'Ounce(s)',
        trim: true,
        required: 'Unit of Measure is required'
    },
    dailyLogs: [dailyLog.modelSchema],
    parent: {
        type: Schema.ObjectId,
        ref: 'User'
    }
});

BabySchema.virtual('fullName').get(function() {
    return this.firstName + ' ' + this.lastName;
});

mongoose.model('Baby', BabySchema);
exports.modelSchema = BabySchema;