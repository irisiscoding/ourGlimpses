myApp.factory('favoritesFactory',  function($http) {
	function favoriteConstructor() {
    var factory = {};


    factory.add = function(wallpost, callback){
      // if (typeof(callback) === 'function') {
        console.log("adding to favorites")
        $http.post('/addtoFavorites/', wallpost).then(function(returned_data){
        callback(returned_data.data)

        });
      };
	//  }
}
	return this
});
