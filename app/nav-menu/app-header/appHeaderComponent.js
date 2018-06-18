module.exports = function(ngModule) {
  ngModule.component('appHeader', {
    template: require('./appHeader.html'),
    controller: require('./appHeaderController')
  });
};
