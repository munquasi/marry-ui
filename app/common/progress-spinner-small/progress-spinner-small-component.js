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

  ngModule.component('progressSpinnerSmall', {
    template: require('./progress-spinner-small.html'),
    controller: progressSpinnerController,
    bindings: bindings
  });
};
