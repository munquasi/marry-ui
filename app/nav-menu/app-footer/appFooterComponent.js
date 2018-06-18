module.exports = function(ngModule) {
  ngModule.component('appFooter', {
    template: require('./appFooter.html'),
    controller: require('./appFooterController')
  });
};
