const mongoose = require('mongoose')
const Image = mongoose.model('images')
const Album = mongoose.model('albums')

module.exports = (function() {
  return {

    delete: function(req, res){
        console.log('delete image', req)
        Image.remove({_id: req.params.id}, function(err, data) {
          if(err) { console.log(err); }
          res.json("deleted");
        })
    },


    index: function(req, res){
        Image.find({})
            .populate({ // populate not necessary for this assignment, demonstration purpose only!
              path: '_album',
              model: 'albums',

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
