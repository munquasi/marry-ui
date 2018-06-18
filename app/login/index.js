var angular = require('angular');
require('angular-ui-router');

var ngApp = angular.module('app.login', [
  'Layout',
  'ui.router'

]);


require('./routes')(ngApp);


require('./loginComponent')(ngApp);
require('./loginService')(ngApp);


module.exports = ngApp;
