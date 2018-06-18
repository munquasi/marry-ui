var angular = require('angular');
require('angular-ui-router');
require('angular-material');
require('ngspinner');
require('../common/progress-spinner');

var ngApp = angular.module('app.home', [
  'Layout',
  'ui.router',
  'ngMaterial',
  'spinner',
  'common.progressSpinner'
]);

require('./routes')(ngApp);

require('./homeComponent')(ngApp);
require('./homeService')(ngApp);


module.exports = ngApp;

require('./homeForm.css');