var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var WallpostSchema = new mongoose.Schema({
	text: {
    type: String,
    required: true,
  },
  _user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  _comments: [{
    type: Schema.Types.ObjectId,
    ref: "comments",
  }],
  _favorite: {
		type: Schema.Types.ObjectId,
		ref: "users",
	},
	_likes: [{
		type: Schema.Types.ObjectId,
		ref: "users",
	}],
}, {timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'}})


var Wallposts = mongoose.model('wallposts', WallpostSchema);
