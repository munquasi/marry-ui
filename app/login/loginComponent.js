module.exports = function(ngModule) {
  ngModule.component('login', {
    template: require('./login.html'),
    controller: require('./loginController')
  });
};
