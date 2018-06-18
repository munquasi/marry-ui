module.exports = function(ngModule) {
  ngModule.config(routes);
};

function routes($stateProvider) {
  $stateProvider
    .state({
      name: 'dashboard',
      url: '',
      abstract: true,
      templateProvider: function(Layout) {
        return Layout.DASHBOARD;
      }
    })
    .state({
      name: 'dashboard.profile',
      url: '/dashboard',
      template: '<dashboard/>',
      params: {willRedirect: null}
    })
    
}
