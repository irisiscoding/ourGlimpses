myApp.factory('albumFactory', function($http){

    var factory = {};

    factory.create = function(album, callback){
      console.log("creating album")
      $http.post('/albums/', album).then(function(returned_data){
        callback(returned_data.data)
      });
    };

    factory.index = function(callback){
        $http.get('/albums/').then(function(returned_data){
        callback(returned_data)
      });
    };




    return factory;
});
