module.exports = function(ngModule) {
  ngModule.config(routes);
};

function routes($stateProvider) {
  $stateProvider
    .state({
      name: 'home',
      url: '/home',
      abstract: true,
      templateProvider: function(Layout) {
        return Layout.HOME;
      }
    })
    .state({
      name: 'home.page',
      url: '',
      template: '<home-form/>'
      //params: {willRedirect: null}
    })
}
