myApp.controller('albumController', ['$scope','albumFactory','userFactory', '$location', function($scope, albumFactory, userFactory, $location) {
  console.log("album controller loaded")

    var index = function(){
         albumFactory.index(function(data){
             $scope.albums = data.data;
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

    $scope.createAlbum = function(newAlbum){        
        if (newAlbum && $scope.file.name) {
            console.log('image file name to be uploaded: ',$scope.file.name);
            $scope.upload();
            newAlbum._user = $scope.session;
            // newAlbum.image = $scope.file.name; // testing, one image per album
            newAlbum.image = $scope.uniqueFileName;
            console.log('I want to create this newAlbum', newAlbum);
            albumFactory.create(newAlbum, (data)=>{
                console.log('returned', data);$scope.error = data.error;}) ;
                index();
                // $location.path('./#/album')
              }
         else {
            $scope.message = "Could not create new album"
        }
    };


// ********** upload to s3
  $scope.sizeLimit      = 10585760; // 10MB in Bytes
  $scope.uploadProgress = 0;
  $scope.creds          = {
   "accessKeyId": "",
   "secretAccessKey": "",
   // "region": "us-west-2"
}

  $scope.upload = function() {
    console.log("upload image")
    AWS.config.update({ accessKeyId: $scope.creds.accessKeyId, secretAccessKey: $scope.creds.secretAccessKey });
    AWS.config.region = 'us-west-2';
    var bucket = new AWS.S3({ params: { Bucket: "glimpses" } });
    console.log($scope.file)
    if($scope.file) {
        // Perform File Size Check First
        var fileSize = Math.round(parseInt($scope.file.size));
        if (fileSize > $scope.sizeLimit) {
          // toastr.error('Sorry, your attachment is too big. <br/> Maximum '  + $scope.fileSizeLabel() + ' file attachment allowed','File Too Large');
          return false;
        }
        // Prepend Unique String To Prevent Overwrites
        $scope.uniqueFileName = $scope.uniqueString() + '-' + $scope.file.name;

        var params = { Key: $scope.uniqueFileName, ContentType: $scope.file.type, Body: $scope.file, ServerSideEncryption: 'AES256' };

        bucket.putObject(params, function(err, data) {
            console.log('putObject')
          if(err) {
            // toastr.error(err.message,err.code);
            return false;
          }
          else {
            console.log('result for putObject', data)
            // Upload Successfully Finished
            // toastr.success('File Uploaded Successfully', 'Done');

            // Reset The Progress Bar
            setTimeout(function() {
              $scope.uploadProgress = 0;
              $scope.$digest();
            }, 4000);
          }
        })
        .on('httpUploadProgress',function(progress) {
          $scope.uploadProgress = Math.round(progress.loaded / progress.total * 100);
          $scope.$digest();
        });
      }
      else {
        // No File Selected
        // toastr.error('Please select a file to upload');
      }
    }

    $scope.fileSizeLabel = function() {
    // Convert Bytes To MB
    return Math.round($scope.sizeLimit / 1024 / 1024) + 'MB';
  };

  $scope.uniqueString = function() {
    var text     = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 8; i++ ) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }
// ********** end of 'upload to s3'

// ********** list all files from s3 server
  $scope.list = function() {
    AWS.config.update({ accessKeyId: $scope.creds.accessKeyId, secretAccessKey: $scope.creds.secretAccessKey });
    AWS.config.region = 'us-west-2';
    var s3 = new AWS.S3();
    var params = {
      Bucket: 'glimpses', /* required */
      // Delimiter: 'STRING_VALUE',
      EncodingType: 'url',
      // Marker: 'STRING_VALUE',
      // MaxKeys: 0,
      // Prefix: 'STRING_VALUE'
    };
    s3.listObjects(params, function(err, data) {
      if (err) console.log(err, err.stack); // an error occurred
      else     console.log(data);           // successful response
        $scope.urls = data.Contents;
    });

  }
// ********** end of 'list all files from s3 server'
  }]);
