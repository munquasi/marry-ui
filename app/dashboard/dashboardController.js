module.exports = editProfileCtrl;

function editProfileCtrl($rootScope, dashboardService, $state, $scope) {
  var _this = this;

  _this.getDashboard = function(){
    console.log();
      dashboardService.getDashboard().then(function (response) {
         _this.user = response;
          console.log(_this.user);
      });
  }
  
}
