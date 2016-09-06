var mongoose = require('mongoose');
var Schema = mongoose.Schema;
  var AlbumSchema = new Schema({
    title: String,
    date: Date,
    description: String,

  _images : [{ type : mongoose.Schema.Types.ObjectId, ref: 'images' }],
  _user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },

}, {timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'}})


var Album = mongoose.model('albums', AlbumSchema);
