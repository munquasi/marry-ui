module.exports = function(ngModule) {
    ngModule.service('registerService', registerService);
  };

  function registerService($q, MARRY_CONFIG, $http) {
    var _this = this;
    // _this.registerUser = function (user) {
    //   var def = $q.defer();
    //   var promise = $http({
    //   method: 'POST',
    //   url: MARRY_CONFIG.API_BASE+'createOrUpdateUser,'+ JSON.stringify(user),
    //      headers:{
    //           'Content-Type': 'application/json',
    //            "Access-Control-Allow-Origin": "*"
    //             },
    //           })
    //           .success(function(data) { 
    //            def.resolve(data);
    //           }).error(function(error) {
    //             def.reject(error);
    //           });
    //              return def.promise;  

    // };

    _this.registerUser =function(user){
    var deferred2 = $q.defer();
    var url = MARRY_CONFIG.API_BASE+'createOrUpdateUser';
    headers={
      'Content-Type': 'application/json',
      "Access-Control-Allow-Origin": "*"
      };
    $http.post(url, user)
    .success(function(data) { 
      deferred2.resolve(data);
    }).error(function(error) {
      deferred2.reject(error);
    });
    return deferred2.promise;
  }

  _this.registerUserNext =function(user){
    var dateOfBirth=user.year+'-'+user.month+'-'+user.day;
    user.dateOfBirth = dateOfBirth;
    var deferred2 = $q.defer();
    var url = MARRY_CONFIG.API_BASE+'createOrUpdateUser';
    headers={
      'Content-Type': 'application/json',
      "Access-Control-Allow-Origin": "*"
      };
    $http.post(url, user)
    .success(function(data) { 
      deferred2.resolve(data);
    }).error(function(error) {
      deferred2.reject(error);
    });
    return deferred2.promise;
  }



  }