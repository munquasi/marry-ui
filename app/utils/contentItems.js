module.exports = function(ngModule) {
    ngModule.service('ContentItemsService', ContentItemsService);
    ngModule.constant('CONTENT_KEYS', {
        SKILL: 'Skills',
        LICENSE: 'Licenses and Certifications'
    });
};

function ContentItemsService($cacheFactory, $gapi, $q, JAVELIN_CONFIG) {
    var _this = this;
    var deferred = $q.defer();
    var loadApi = deferred.promise;
    _this.initialKeyList = ['Skills', 'Licenses and Certifications'];
    _this.contentItemCacheFactory = $cacheFactory('contentItemCache');

    _this.getCachedData = getCachedData;
    _this.getItemsByCode = getItemsByCode;
    _this.matchItemName = matchItemName;

    $gapi.loaded.then(function() {
        return $gapi.load('employeesAndAssets', 'v1', JAVELIN_CONFIG.API_BASE);
    }).then(function() {
        return deferred.resolve();
    });

    function getCachedData(key) {
        if (_this.contentItemCacheFactory.info().size == 0) {
            //get skills and licenses
            if (_this.initialKeyList.indexOf(key) == -1) {
                _this.initialKeyList.push(key);
            }
            return _this.getItemsByCode(key).then(function(response) {
                addToCacheFactory(response, key);
                return _this.contentItemCacheFactory.get(key);
            });
        } else {
            //get only missing list
            return _this.getItemsByCode(key).then(function(response) {
                addToCacheFactory(response);
                return _this.contentItemCacheFactory.get(key);
            });
        }
    }

    function getItemsByCode(key) {
        var def = $q.defer();
        if (key == "Skills") {
            loadApi.then(function() {
                return $gapi.client.employeesAndAssets.skills.items();
            }).then(function(data) {
                var skills = data.items;
                def.resolve(skills);
            });
            return def.promise;
        }

        if (key == "Licenses and Certifications") {
            loadApi.then(function() {
                return $gapi.client.country.license.items();
            }).then(function(data) {
                var licenses = data.itemList;
                def.resolve(licenses);
            });
            return def.promise;
        }
        //return def.promise;
    }

    function addToCacheFactory(optionList, param) {
        /*for(var i = 0; i < optionList.length; i++) {*/
        _this.contentItemCacheFactory.put(param, optionList);
        /*}*/
    }

    function matchItemName(key, itemId) {
        var list = _this.contentItemCacheFactory.get(key);
        var name = '';
        for (var i = 0; i < list.length; i++) {
            if (list[i].id == itemId) {
                name = list[i].name;
                break;
            }
        }
        return name;
    }
}
