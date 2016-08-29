var mongoose = require('mongoose');
var Users = mongoose.model('users');
var Wallposts = mongoose.model('wallposts');
console.log("wallpost controller loaded");

module.exports = {

    create: function(req, res){
        var newWallpost = new Wallposts({text: req.body})
            newWallpost._comments = [];
            newWallpost._likes = [];
            newWallpost.save(function(err){
                if(err) res.json(err);
                else res.json({success: true});
            })
    },

    show: function(req, res){
        Question.find({}).populate('_comments').exec(function(err, wallpost){
            if(err) res.json(err);
            else res.json(wallposts);
        })
    },

    like: function(req, res){
        Wallposts.findOne({_id: req.params.id}, function(err, wallpost){
            wallposts.likes ++;
            wallposts.save(function(err){
                if(err) res.json(err);
                else res.json({success: true});
            })
        })
    }
};



}
