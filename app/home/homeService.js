module.exports = function(ngModule) {
    ngModule.service('homeService', homeService);
  };

  function homeService($q, MARRY_CONFIG, $http) {
    var _this = this;

    _this.getUsers = function () {
      var def = $q.defer();
      var promise = $http({
      method: 'GET',
      url: MARRY_CONFIG.API_BASE+'getUsers',
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

    /*  _this.getFilterData = function (user) {
        alert("user:"+user.country)
      var def = $q.defer();
      var promise = $http({
      method: 'GET',
      url: MARRY_CONFIG.searchApi+'SearchProfile',
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
*/

_this.getFilterData =function(homeForm){
    var deferred2 = $q.defer();
    var url = MARRY_CONFIG.API_BASE+'SearchProfile';
    headers={
      'Content-Type': 'application/json',
      "Access-Control-Allow-Origin": "*"
      };
    $http.post(url, homeForm)
    .success(function(data) { 
      deferred2.resolve(data);
    }).error(function(error) {
      deferred2.reject(error);
    });
    return deferred2.promise;
  }


  }