var ngModule = angular.module('common.datePicker', [
  'ngMaterial'
]);

require('./date-picker-component')(ngModule);

module.exports = ngModule;
