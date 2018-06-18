var layouts = {
  AUTH: require('./loginLayout.html'),
  BASE: require('./baseLayout.html'),
  HOME: require('./homeLayout.html'),
  SHIFT_BASE: require('./shiftBaseLayout.html'),
  DASHBOARD: require('./dashboardLayout.html')
};

module.exports = function(ngModule) {
  ngModule.constant('Layout', layouts);
};
