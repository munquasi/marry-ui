module.exports = loginCtrl;

/*@ngInject*/ function loginCtrl($rootScope, loginService, $state, $scope) {
  var _this = this;
  
    _this.loginUser = function(user){
      //$state.go("dashboard.profile");
            
    	//console.log(user);
        loginService.loginUser(user).then(function (response) {
           _this.user = response;
           if(response===true){
            $rootScope.email = user.email;
            console.log($rootScope.email);
             $state.go("dashboard.profile");
            }
           else {
            $scope.isLoginError=true;
            $scope.loginErrorMessage='Invalid User name and password';
            //alert('user name and password is wrong');
           }
        });
    }
    $scope.user = {};
   $scope.user.email = 'abc@gmail.com';
   $scope.user.password = 'abc'; 
}
