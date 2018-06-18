module.exports = function(ngModule) {
  ngModule.component('dashboard', {
    template: require('./dashboard.html'),
    controller: require('./dashboardController')
  });
};
