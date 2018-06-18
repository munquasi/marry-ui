var angular = require('angular');

var ngApp = angular.module('sidebarApp', [
  
]);

require('./sidebarService')(ngApp);
require('./sidebarComponent')(ngApp);

module.exports = ngApp;
