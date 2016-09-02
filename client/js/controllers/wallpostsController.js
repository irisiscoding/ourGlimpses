myApp.controller('wallpostsController', function(wallpostsFactory, favoritesFactory, userFactory, $location, $routeParams, $scope){

    $scope.id = $routeParams.id;

    var index = function(){
         wallpostsFactory.index(function(data){
             $scope.wallposts = data.data;
             console.log(data.data)
         });
        userFactory.getLoggedUser(function(data){
            $scope.session = data;
            console.log("get logged user" , $scope.session)
            if (data.error) {
                $location.path('/')
            }
        });
    };
    index();

    $scope.cancel = function(){
        window.history.back();
    };

    // $scope.like = function(answerId){
    //     console.log('thumbs up!', answerId)
    //     if (answerId) {
    //         answersFactory.like(answerId, (data)=>{
    //             console.log('returned', data);$scope.error = data.error;}) ;
    //         index();
    //     }
    // };

    $scope.addtoFavorites = function(wallpost){
      console.log(wallpost)
      if(wallpost){
        favoritesFactory.add(wallpost, (data)=>{
          console.log('returned', data);$scope.error = data.error;}) ;
        }
      }

    $scope.createWallpost = function(newWallpost){
        if (newWallpost) {
            newWallpost._user = $scope.session;
            console.log('I want to create this newWallpost', newWallpost);
            wallpostsFactory.create(newWallpost, (data)=>{
                console.log('returned', data);$scope.error = data.error;}) ;
                index();
              }
         else {
            $scope.message = "Minimum of 10 characters required"
        }
    };

});
