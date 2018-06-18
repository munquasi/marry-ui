module.exports = function (ngModule, configData) {

  ngModule.constant('MARRY_CONFIG', {
    API_BASE: configData.marryConfig.apiBase
  });

  ngModule.config(config);

  function config($httpProvider) {
  
}

};

