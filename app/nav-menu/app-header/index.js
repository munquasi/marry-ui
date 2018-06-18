var angular = require('angular');
var ngApp = angular.module('appHeaderApp', []);

require('./appHeaderComponent')(ngApp);

module.exports = ngApp;
