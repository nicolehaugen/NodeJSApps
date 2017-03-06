var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    moment = require('moment');

var OfferSchema = new Schema({
  time: {
    type: String,
    default: moment(),
    required: 'Time is required'
  },
  unitsConsumed: {
    type: Number,
    default: '',
    trim: true,
    required: 'Units Consumed is required'
  },
  offeredBy: {
    type: String,
    default: '',
    trim: true,
    required: 'Offered By is required'
  }
});

mongoose.model('Offer', OfferSchema);
exports.modelSchema = OfferSchema;