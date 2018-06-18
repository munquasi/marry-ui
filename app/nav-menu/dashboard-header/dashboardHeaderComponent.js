module.exports = function(ngModule) {
  ngModule.component('dashboardHeader', {
    template: require('./dashboardHeader.html'),
    controller: require('./dashboardHeaderController')
  });
};
