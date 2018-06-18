module.exports = function(ngModule) {
  ngModule.config(routes);
};

function routes($stateProvider) {
  $stateProvider
    .state({
      name: 'edit',
      url: '',
      abstract: true,
      templateProvider: function(Layout) {
        return Layout.DASHBOARD;
      }
    })
    .state({
      name: 'edit.profile',
      url: '/profile',
      template: '<edit-profile/>'
      //params: {willRedirect: null}
    })
    
}
