var angular = require('angular');
var ngApp = angular.module('dashboardHeader', []);

require('./dashboardHeaderComponent')(ngApp);
require('./dashboardHeaderService')(ngApp);

module.exports = ngApp;

require('./dashboardHeader.css');

