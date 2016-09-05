myApp.factory('albumFactory', function($http){

    var factory = {};

    factory.create = function(album, callback){
      console.log("creating album")
      $http.post('/albums/', album).then(function(returned_data){
        callback(returned_data.data)
      });
    };

    factory.update = function(album, callback){
      console.log("updating album")
      $http.post('/albums/update', album).then(function(returned_data){
        callback(returned_data.data)
      });
    };

    factory.index = function(callback){
        $http.get('/albums/').then(function(returned_data){
        callback(returned_data)
      });
    };

    factory.deleteImage = function(image, callback){// what parameters do we need?
      $http.delete('/images/'+image._id).then(function(returned_data){
      })
    };
    factory.deleteAlbum = function(album, callback){// what parameters do we need?
      $http.delete('/albums/'+album._id).then(function(returned_data){
      })
    };

    return factory;
});
