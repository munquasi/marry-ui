module.exports = registerCtrl;

/*@ngInject*/ function registerCtrl($rootScope, registerService, $state,$scope) {
  var _this = this;
  
    _this.registerUser = function(user){
    console.log("mm:"+user);
        registerService.registerUser(user).then(function (response) {
           _this.user = response;
            //console.log(_this.user);
     });
        $scope.user = {};
        $state.go("profile.stepTwo");
    }   

    _this.registerUserNext = function(user){
    	console.log(user);
        registerService.registerUserNext(user).then(function (response) {
           _this.user = response;
            console.log(_this.user);
             $scope.user = {};
             alert("you have register successfully and details are sent in your email id");
              $state.go("dashboard.profile");
            
     });
        
    }  
  
}
