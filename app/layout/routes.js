module.exports = function(ngModule) {
  ngModule.config(routes);
};

function routes($stateProvider) {
  $stateProvider
    .state({
      name: 'error',
      url: '/error',
      abstract: true,
      template:  '<ui-view/>'
    })
    .state({
      name: 'error.404',
      url: '/404',
      template: require('./404.html')
    }).state({
      name: 'error.500',
      url: '/500',
      template: require('./500.html')
    }).state({
      name: 'error.403',
      url: '/403',
      template: require('./403.html')
    })
    .state({
      name: 'error.503',
      url: '/503',
      template: require('./503.html') 
    });
}
