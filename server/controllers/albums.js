const mongoose = require('mongoose')
const Album = mongoose.model('albums')
const User = mongoose.model('users')

module.exports = (function() {
  return {

    create: function(req, res){
        var album = new Album(req.body)
        album.save(function(err, result){
            if(err){
                res.json({error:err});
            }else{
              console.log("req body " , req.body)
            User.update({ _user : req.session.userId }, { $push : { _albums : result._id } }, function(err, updated) {
                res.send(result);
            });
        }
    })},

    index: function(req, res){
        Album.find({})
            .populate({ // populate not necessary for this assignment, demonstration purpose only!
              path: '_user',
              model: 'users',

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
