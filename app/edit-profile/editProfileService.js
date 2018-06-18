module.exports = function(ngModule) {
    ngModule.service('editProfileService', editProfileService);
  };

  function editProfileService($q, MARRY_CONFIG, $http, $rootScope) {
    var _this = this;
    
    _this.getProfile = function () {
      var def = $q.defer();
      var promise = $http({
      method: 'GET',
      url: MARRY_CONFIG.API_BASE+'edit/getProfile?email='+$rootScope.email,
         headers:{
              'Content-Type': 'application/json',
               "Access-Control-Allow-Origin": "*"
                },
              })
              .success(function(data) { 
               def.resolve(data);
              }).error(function(error) {
                def.reject(error);
              });
                 return def.promise;  
              };


  }

  