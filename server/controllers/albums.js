const mongoose = require('mongoose')
const Album = mongoose.model('albums')
const User = mongoose.model('users')
const Image = mongoose.model('images')

module.exports = (function() {
  return {

    create: function(req, res){
        var album = new Album({"title":req.body.title, "description":req.body.description, "date":req.body.date, "_user":req.body._user})
        console.log(req.body)
        album.save(function(err, result){
            if(err){
                res.json({error:err});
            }else{
              console.log("req body " , req.body)
            User.update({ _user : req.session.userId }, { $push : { _albums : result._id } }, function(err, updated) {
                // res.send(result);


            });
            var image = new Image({"_album":result._id, "fileName":req.body.fileName, "url":"https://s3-us-west-2.amazonaws.com/glimpses/"+req.body.fileName});
            image.save(function(err, image_result){
                if(err){
                res.json({error:err});
                }else{
                    Album.update({ _id : result._id }, { $push : { _images : image_result._id } }, function(err, updated) {
                    res.send(result);
                    });
                }
            }) // end of image.save()
        }

    })},
    delete: function(req, res){
        console.log('delete album')
        Album.find({"_id":req.params.id}).exec(function(err, results){
            if(err){
              console.log(err);
            }else{
                for (var idx=0; idx < results[0]._images.length; idx++) {
                    Image.remove({_id: results[0]._images[idx]}, function(err, data) {
                      if(err) { console.log(err); }
                      // res.json("deleted");
                    })
                }
                Album.remove({_id: req.params.id}, function(err, data) {
                  if(err) { console.log(err); }
                  res.json("deleted");
                })
            }
        });


    },
    update: function(req, res){
        console.log('album updating')
        console.log(req.body)
        var image = new Image({"_album":req.body._id, "fileName":req.body.fileName, "url":"https://s3-us-west-2.amazonaws.com/glimpses/"+req.body.fileName});
            image.save(function(err, image_result){
                if(err){
                res.json({error:err});
                }else{
                    Album.update({ _id : req.body._id }, { $push : { _images : image_result._id } }, function(err, updated) {
                    res.send(image_result);
                    });
                }
            }) // end of image.save()

    },

    index: function(req, res){
        Album.find({})
            .populate({ // populate not necessary for this assignment, demonstration purpose only!
              path: '_user',
              model: 'users',

          })
          .populate({ // populate not necessary for this assignment, demonstration purpose only!
              path: '_images',
              model: 'images',

          })
        .exec(function(err, results){
            if(err){
              console.log(err);
            }else{
                res.json(results);
            }
        })
    },
  }

})();
