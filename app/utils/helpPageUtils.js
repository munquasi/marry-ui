module.exports = function(ngModule) {
    ngModule.service('HelpPageUtilService', HelpPageUtilService);
};

function HelpPageUtilService($http) {
    map = [];
    var helpPageKey;
    var promise = $http({ method: 'GET', url: 'static/helpkey.json', dataType: "json" });
    promise.then(function(data) {
        helpPageKey = data['data'];
        for (var i = 0; i < helpPageKey.length; i++) {
            map[helpPageKey[i].id] = helpPageKey[i].page;
        }
    });

    this.RH_ShowResponsiveHelpWithMapId = function(szMapId) {
        var szHelpURL = 'Responsive_HTML5';
        var szWnd = '';
        var page = map[szMapId];
        event.stopPropagation();
        event.preventDefault();
        event.keyCode = 0;
        window.open("static/help/!SSL!/" + szHelpURL + page, 'targetWindow', 'toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=550,height=550,modal=yes,alwaysRaised=yes').focus();
        szMapId = '';
        szHelpURL = '';
        page = '';
    }
}