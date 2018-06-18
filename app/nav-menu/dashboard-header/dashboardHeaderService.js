module.exports = function(ngModule) {
    ngModule.service('dashboardHeaderService', dashboardHeaderService);
  };

  function dashboardHeaderService($q, MARRY_CONFIG, $http) {
    var _this = this;

    _this.logoutUser = function () {
      var def = $q.defer();
      var promise = $http({
      method: 'GET',
      url: MARRY_CONFIG.API_BASE+'logout',
         headers:{
              'Content-Type': 'application/json',
               "Access-Control-Allow-Origin": "*"
                },
              })
              .success(function(data) { 
               def.resolve(data);
               console.log('from service'+data)
              }).error(function(error) {
                def.reject(error);
              });
                 return def.promise;  
              };

  }