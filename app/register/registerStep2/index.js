var angular = require('angular');
require('angular-ui-router');

var ngApp = angular.module('app.register2', [
  'Layout',
  'ui.router'
]);

require('./registerStep2Component')(ngApp);
require('../registerService')(ngApp);


module.exports = ngApp;
