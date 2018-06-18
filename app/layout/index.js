var angular = require('angular');
require('angular-ui-router');

var ngApp = angular.module('Layout', [
  'ui.router'
]);

require('./routes')(ngApp);
require('./layoutService')(ngApp);

module.exports = ngApp;
