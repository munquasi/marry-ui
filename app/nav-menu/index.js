var angular = require('angular');
require('angular-ui-router');

var ngApp = angular.module('navMenuApp', [
  'Layout',
  'ui.router',
  // app components
  require('./sidebar/index').name,
  require('./app-header/index').name,
  require('./app-footer/index').name,
  require('./dashboard-header/index').name
]);

require('./routes')(ngApp);

module.exports = ngApp;
