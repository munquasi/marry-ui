module.exports = function(ngModule) {
  var bindings = {
    editable: '=',
    required: '=',
    milliseconds: '=',
    mindatemilliseconds: '<',
    maxdatemilliseconds: '<',
    name: '@'
  };

  function datePickerController(AppUtilsService, $mdDateLocale, $scope){

    var controllerScope = this;
    controllerScope.name = controllerScope.name || "";

    // override the angular material formatDate and parseDate functions
    // we do this in the controller rather than on the provider, as the date display format in the AppUtilsService is not known at the point of module configuration

    $mdDateLocale.formatDate = function (date) {
      if( !date ){
        return date;
      }
      return AppUtilsService.dateDisplay(date);
    }

    $mdDateLocale.parseDate = function(dateString){
      if ( AppUtilsService.validDateStringOfFormat(dateString) ){
        // our date string is valid so return it as a parsed date object
        return AppUtilsService.parseDisplayDateString(dateString);
      } else {
        // date is not valid so we merely return the date string rather than a date object
        // which will result in an invalid date input
        return dateString;
      }
    };

    $scope.$watch(angular.bind(controllerScope, function () {
      return controllerScope.milliseconds;
    }), function () {
      createDate();
    });

    controllerScope.$onInit = init;
    controllerScope.$doCheck = doCheck;
    controllerScope.$onChanges = onChanges;
    controllerScope.dateChanged = dateChanged;

    function init(){
      createDate();
      bindDisabledOption();
      updateMinDate();
      updateMaxDate();
    }

    function doCheck(){
      checkDateIsPopulated();
    }

    function checkDateIsPopulated(){
      if(!controllerScope.date && controllerScope.milliseconds){
        createDate();
      }
    }

    function createDate(){
      var millisecondsInt = parseInt(controllerScope.milliseconds);

      if(!millisecondsInt){
        controllerScope.date = '';
        return;
      }

      controllerScope.date = new Date(millisecondsInt);
    }

    function onChanges(){
      updateMinDate();
      updateMaxDate();
    }

    function updateMinDate(){
      if(controllerScope.mindatemilliseconds){
        var minDateMillisecondsInt = parseInt(controllerScope.mindatemilliseconds);

        if(minDateMillisecondsInt){
          controllerScope.minDate = new Date(minDateMillisecondsInt);
        }
      }
    }

    function updateMaxDate(){
      if(controllerScope.maxdatemilliseconds){
        var maxDateMillisecondsInt = parseInt(controllerScope.maxdatemilliseconds);

        if(maxDateMillisecondsInt){
          controllerScope.maxDate = new Date(maxDateMillisecondsInt);
        }
      }
    }

    function bindDisabledOption(){
      controllerScope.disabled = !controllerScope.editable;
    }

    function dateChanged(){
      if(controllerScope.date != null){
        controllerScope.milliseconds = controllerScope.date.getTime();
      }
    }

  }

  ngModule.component('datePicker', {
    template: require('./date-picker-template.html'),
    controller: datePickerController,
    bindings: bindings
  });
};
