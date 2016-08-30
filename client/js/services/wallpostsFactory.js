myApp.factory('wallpostsFactory', function($http){

    var factory = {};

    factory.create = function(wallpost, callback){
      console.log("creating post")
      $http.post('/wallposts/', wallpost).then(function(returned_data){
        callback(returned_data.data)
      });
    };

    factory.index = function(callback){
        $http.get('/wallposts/').then(function(returned_data){
        callback(returned_data)
      });
    };


    factory.like = function(wallpostId, callback){
      $http.put('/wallposts/' + wallpostId + '/like').then(function(returned_data){
        // callback(returned_data.data)
      });
    };

    return factory;
});
