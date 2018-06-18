module.exports = function(ngModule) {
  ngModule.service('CachingService', CachingService);
  ngModule.constant('CACHE_CONST', {
    KEY: {
      COUNTRY_CODE: 'COUNTRY_CODE',
      EMP_NAME: 'EMPLOYEE_NAME',
      EMP_EMAIL: 'EMPLOYEE_EMAIL',
      MENU_ITEMS : 'MENU_ITEMS',
    }
  });
};

function CachingService($cacheFactory) {
  var _this = this;
  _this.get = get;
  _this.put = put;
  _this.userDataCache = $cacheFactory('USER');
  _this.menuDataCache = $cacheFactory('MENU');

  function get(cache, key) {
    var data = cache.get(key);
    if (data !== undefined) {
      return data;
    } else {
      return undefined;
    }
  }

  function put(cache, key, data) {
    cache.put(key, data);
    return;
  }
}
