module.exports = function(ngModule) {
  ngModule.component('registerStep2', {
    template: require('./registerStep2.html'),
    controller: require('../registerController')
  });
};
