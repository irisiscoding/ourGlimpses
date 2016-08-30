const mongoose = require('mongoose')
const Favorite = mongoose.model('favorites')
const User = mongoose.model('users')

module.exports = (function() {
  return {

    add: function(req, res){
        var favorite = new Favorite(req.body)
        favorite.save(function(err, result){
            if(err){
                res.json({error:err});
            }else{
              console.log("req body " , req.body)
            User.update({ _user : req.session.userId }, { $push : { _favorites : result._id } }, function(err, updated) {
                res.send(result);
            });
        }
    })},

    index: function(req, res){
        Favorite.find({})(function(err, results){
            if(err){
              console.log(err);
            }else{
                res.json(results);
            }
        })
    },
  }

})();
