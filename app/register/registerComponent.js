module.exports = function(ngModule) {
  ngModule.component('register', {
    template: require('./register.html'),
    controller: require('./registerController')
  });
};
