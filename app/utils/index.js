var angular = require('angular');
require('angular-ui-router');

var ngApp = angular.module('javelin.utils', [
    'ui.router'
]);

require('./pubsub')(ngApp);
require('./contentItems')(ngApp);
require('./appUtils')(ngApp);
require('./filters')(ngApp);
require('./cacheUtils')(ngApp);
require('./helpPageUtils')(ngApp);
module.exports = ngApp;