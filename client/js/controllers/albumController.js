myApp.controller('albumController', ['$scope','albumFactory', '$location', function($scope, albumFactory, $location) {
  console.log("album controller loaded")
  $scope.album = function(){
        console.log("getting album data ")
      //   userFactory.album({email: $scope.email, password: $scope.password}, function(data){
      //       console.log("userfactory response")
      //       console.log(data)
      //   $scope.errors = {}
      //   if(data.hasOwnProperty("email")){
      //     $location.url('/home')
      //   }else {
      //     $scope.errors = data
      //   }
      // })
    }
  }]);
