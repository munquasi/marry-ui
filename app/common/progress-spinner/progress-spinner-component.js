module.exports = function(ngModule) {
  var bindings = {
    mode: '<',
    currentProgressPercentage: '<',
    disabled: '<'
  };

  function progressSpinnerController(){
    var controllerScope = this;
    controllerScope.mode = controllerScope.mode || 'indeterminate';
  }

  ngModule.component('progressSpinner', {
    template: require('./progress-spinner.html'),
    controller: progressSpinnerController,
    bindings: bindings
  });
};
