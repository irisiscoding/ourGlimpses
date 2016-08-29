var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var CommentSchema = new mongoose.Schema({
	text: {
    type: String,
    required: true,
  },
  _user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  _wallpost: {
    type: Schema.Types.ObjectId,
    ref: "wallposts",
  },

}, {timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'}})


var Comments = mongoose.model('comments', CommentSchema);
