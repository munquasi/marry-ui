module.exports = function(ngModule) {
  ngModule.component('editProfile', {
    template: require('./editProfile.html'),
    controller: require('./editProfileController')
  });
};
