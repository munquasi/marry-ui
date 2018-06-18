module.exports = function(ngModule) {
  ngModule.service('validationErrorService', validationErrorService);
};

function getPrompts(errorItem) {
  if(errorItem.hasOwnProperty('reason')){
    return errorItem.reason === 'PROMPT';
  }
  return false;
}

function getWarnings(errorItem) {
  if(errorItem.hasOwnProperty('reason')){
    return errorItem.reason === 'WARNING';
  }
  return false;
}

function validationErrorService($uibModal) {

  this.openDialog = openDialog;

  function openDialog(errorData, userAction) {
    var errorDTO = angular.fromJson(errorData.error.message);
    var warningList = errorDTO.error.errors.filter(getWarnings);
    var promptList = errorDTO.error.errors.filter(getPrompts);
    var errorList = [];
    var isPrompt = false;

    if(warningList.length) {
      errorList = warningList;
    }else{
      errorList = promptList;
      isPrompt = true;
    }

    $uibModal.open({
      animation: true,
      template: require('./validationErrorModal.html'),
      backdrop: 'static',
      controller: function ($uibModalInstance) {
        var _this = this;
        _this.okAction = okAction;
        _this.cancelAction = cancelAction;
        _this.continueAction = continueAction;
        _this.title = errorDTO.error.message;
        _this.errors = errorList;
        _this.isPrompt = isPrompt;
        function okAction() {
          $uibModalInstance.dismiss('cancel');
          if(userAction) {
            userAction.resolve('ok');
          }
        }
        function cancelAction() {
          $uibModalInstance.dismiss('cancel');
          if(userAction) {
            userAction.resolve('cancel');
          }
        }
        function continueAction() {
          $uibModalInstance.dismiss('cancel');
          if(userAction) {
            userAction.resolve('continue');
          }
        }


      },
      controllerAs: "$ctrl",
      size: null,
      resolve: {
        items: function () {
          return true;
        }
      }
    });
  }
}
