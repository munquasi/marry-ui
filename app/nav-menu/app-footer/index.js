var angular = require('angular');
var ngApp = angular.module('appFooterApp', []);

require('./appFooterComponent')(ngApp);

module.exports = ngApp;
