module.exports = editProfileCtrl;

function editProfileCtrl($rootScope, editProfileService, $state, $scope) {
  var _this = this;
   

  _this.getProfile = function(){
      editProfileService.getProfile().then(function (response) {
        $scope.user = response;
        console.log("user detail");
          console.log($scope.user);
      });
  }
_this.getProfile();

  _this.basicDetailFlage = false;
  _this.editBasicDetail = function(){
    /*$scope.profile={};
    $scope.profile.age='22Yrs';
    $scope.profile.hight='5ft 5in';*/
    _this.basicDetailFlage = true;
    $scope.maritalStatusList = [
            {
                Id: 1,
                Name: 'NEVER_MARRIED'
            },
            { Id: 2,
              Name: 'Married'
              },

             {
                Id: 3,
                Name: 'Divorced'
           
            }, {
                Id: 4,
                Name: 'Widowed'
            },
            {
                Id: 5,
                Name: 'Awaiting Divorce'
           
            }
            ];
    
  };

  _this.cancelBasicDetail = function(){
    //console.log("chand")
    _this.basicDetailFlage = false;
  };
  _this.saveBasicDetail = function(user){
    console.log('user');
    console.log(user);
  };

  _this.editCondition1 = false;
  _this.editAboutMe = function(){
    /*$scope.profile={};
    $scope.profile.age='22Yrs';
    $scope.profile.hight='5ft 5in';*/
    _this.editCondition1 = true;
  };
  _this.cancelEditAboutMe = function(){
    //console.log("chand")
    _this.editCondition1 = false;
  };


  _this.editCondition2 = false;
  _this.editEducationCareer = function(){
    /*$scope.profile={};
    $scope.profile.age='22Yrs';
    $scope.profile.hight='5ft 5in';*/
    _this.editCondition2 = true;
  };
  _this.cancelEducationCareer = function(){
    //console.log("chand")
    _this.editCondition2 = false;
  };


  _this.editCondition3 = false;
  _this.editFamilyDetail = function(){
    /*$scope.profile={};
    $scope.profile.age='22Yrs';
    $scope.profile.hight='5ft 5in';*/
    _this.editCondition3 = true;
  };
  _this.cancelFamilyDetail = function(){
    //console.log("chand")
    _this.editCondition3 = false;
  };


  _this.editCondition4 = false;
  _this.editLifeStyle = function(){
    /*$scope.profile={};
    $scope.profile.age='22Yrs';
    $scope.profile.hight='5ft 5in';*/
    _this.editCondition4 = true;
  };
  _this.cancelLifeStyle = function(){
    //console.log("chand")
    _this.editCondition4 = false;
  };

  _this.contactDetailFlage = false;
  _this.editContactDetail = function(){
    /*$scope.profile={};
    $scope.profile.age='22Yrs';
    $scope.profile.hight='5ft 5in';*/
    _this.contactDetailFlage = true;
    _this.profile={
      age:'22Yrs',
      height:'5ft 5in',
      
    }
  };

  _this.cancellContactDetail = function(){
    //console.log("chand")
    _this.contactDetailFlage = false;
  };
  _this.saveContactDetail = function(){

  };

  _this.idAndAddressProofFlage = false;
   _this.editIdAndAddressProof = function(){
   
    _this.idAndAddressProofFlage = true;
    
  };

  
  _this.cancellIdAndAddressProof = function(){
 _this.idAndAddressProofFlage = false;
  };

  _this.saveIdAndAddressProof = function(){
    //console.log("chand")
   
  };

}
