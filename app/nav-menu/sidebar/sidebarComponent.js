module.exports = function(ngModule) {
  ngModule.component('navMenuSidebar', {
    template: require('./sidebar.html'),
    controller: require('./sidebarController')
  });
};
