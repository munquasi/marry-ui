module.exports = function(ngModule) {
    ngModule.service('dashboardService', dashboardService);
  };

  function dashboardService($q, MARRY_CONFIG, $http) {
    var _this = this;
    
   /* _this.editUser =function(user){
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
  }*/

  }

  