var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var MeetupSchema = new mongoose.Schema({
	title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  _user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },


}, {timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'}})


var Meetups = mongoose.model('meeups', MeetupSchema);
