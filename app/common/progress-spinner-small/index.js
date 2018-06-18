require('angular-material');
require('../../static/css/angular-material.css');

var ngModule = angular.module('common.progressSpinnerSmall', [
  'ngMaterial'
]);

require('./progress-spinner-small-component')(ngModule);

module.exports = ngModule;
