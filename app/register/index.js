var angular = require('angular');
require('angular-ui-router');

var ngApp = angular.module('app.register', [
  'Layout',
  'ui.router',
  require('./registerStep2/index').name


]);

require('./routes')(ngApp);


require('./registerComponent')(ngApp);
require('./registerService')(ngApp);


module.exports = ngApp;
