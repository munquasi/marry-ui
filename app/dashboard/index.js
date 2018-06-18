var angular = require('angular');
require('angular-ui-router');

var ngApp = angular.module('app.dashboard', [
  'Layout',
  'ui.router'

]);



//angular.module('modal.editing', ['ui.grid', 'ui.grid.edit', 'ui.bootstrap', 'schemaForm'])

require('./routes')(ngApp);


require('./dashboardComponent')(ngApp);
require('./dashboardService')(ngApp);


module.exports = ngApp;




