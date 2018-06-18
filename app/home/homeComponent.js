module.exports = function(ngModule) {
  ngModule.component('homeForm', {
    template: require('./home.html'),
    controller: require('./homeController')
  });
};
