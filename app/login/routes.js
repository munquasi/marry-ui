module.exports = function(ngModule) {
  ngModule.config(routes);
};

function routes($stateProvider) {
  $stateProvider
    .state({
      name: 'login',
      url: '/login',
      abstract: true,
      templateProvider: function(Layout) {
        return Layout.HOME;
      }
    })
    .state({
      name: 'login.signin',
      url: '',
      template: '<login/>'
      
    })
    
}
