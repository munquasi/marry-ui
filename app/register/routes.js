module.exports = function(ngModule) {
  ngModule.config(routes);
};

function routes($stateProvider) {
  $stateProvider
    .state({
      name: 'profile',
      url: '/profile',
      abstract: true,
      templateProvider: function(Layout) {
        return Layout.HOME;
      }
    })
    .state({
      name: 'profile.stepOne',
      url: '/createprofile',
      template: '<register/>'
      //params: {willRedirect: null}
    })
    .state({
      name: 'profile.stepTwo',
      url: '/createprofilenext',
      template: '<register-step2/>'
      //params: {willRedirect: null}
    })
}
