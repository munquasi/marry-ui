module.exports = homeCtrl;

/*@ngInject*/ function homeCtrl($rootScope, homeService, Spinner,$scope) {
  var _this = this;
  _this.spinnerLoading = new Spinner();
  _this.users = [];
    _this.getUsers = function(){
        _this.spinnerLoading.watch(homeService.getUsers()).then(function (response) {
           _this.users = response;
            console.log(_this.users);
     });
    } 

   
function init(){
	_this.getUsers();
}    

 init(); 

  _this.getFilterData = function(homeForm){
  alert("data");
/* var formData = $scope.homeForm;
  console.log("mmmm:"+formData);*/
  console.log("mmm:"+homeForm.country);

        _this.spinnerLoading.watch(homeService.getFilterData(homeForm)).then(function (response) {
           _this.users= response;
            console.log(_this.users);
     });
    }

  
}
