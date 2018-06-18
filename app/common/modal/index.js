var ngModule = angular.module('common.modal', [
  'ui.bootstrap'
]);

require('./validationErrorModal.html');
require('./validationErrorService')(ngModule);

module.exports = ngModule;
