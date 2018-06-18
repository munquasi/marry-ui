require('angular-material');
require('../../static/css/angular-material.css');

var ngModule = angular.module('common.progressSpinner', [
  'ngMaterial'
]);

require('./progress-spinner-component')(ngModule);

module.exports = ngModule;
