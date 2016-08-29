var mongoose = require('mongoose');
var Schema = mongoose.Schema;
  var ImageSchema = new Schema({
    fileName: String,
    url: String, // Should store the URL of image on S3.
    contentType: String,
    size: String,
    dimensions: String,


  _user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },

}, {timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'}})


var Images = mongoose.model('images', ImageSchema);
