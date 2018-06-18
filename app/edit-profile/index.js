var angular = require('angular');
require('angular-ui-router');

var ngApp = angular.module('app.edit-profile', [
  'Layout',
  'ui.router'

]);



//angular.module('modal.editing', ['ui.grid', 'ui.grid.edit', 'ui.bootstrap', 'schemaForm'])

require('./routes')(ngApp);


require('./editProfileComponent')(ngApp);
require('./editProfileService')(ngApp);


module.exports = ngApp;

require('./editProfile.css');



