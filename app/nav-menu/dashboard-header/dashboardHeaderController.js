module.exports = dashboardCtrl;


/*@ngInject*/
function dashboardCtrl($scope, $state,dashboardHeaderService) {
    var _this = this;
    _this.goToEditProfile = function(){
    	$state.go("edit.profile");
    }

    _this.logoutUser = function(){
    	console.log("logoutUser");
        dashboardHeaderService.logoutUser().then(function (response) {
           _this.resp = response;
            console.log("mmm1:"+_this.resp);
            if(_this.resp){
                 console.log("mmm2:"+_this.resp);
            $state.go("login.signin");
        }

     	});      
    }  

   
}