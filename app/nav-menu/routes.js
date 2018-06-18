module.exports = function(ngModule) {
  ngModule.config(routes);
};

function routes($stateProvider) {
	$stateProvider
     .state({
       name: 'nav-menu',
       url: '/nav-menu',
       abstract: true,
       templateProvider: function(Layout) {
         return Layout.BASE;
       }
     })
    .state({
      name: 'nav-menu.sidebar',
      url: '/sidebar',
      template: '<nav-menu-sidebar/>'
    });
}
