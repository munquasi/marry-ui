window.$ = window.jQuery = require('jquery');
require('jquery-ui/ui/widgets/sortable');

var angular = require('angular');
var $script = require('scriptjs');

var reqLibs0;
var reqLibs = [
'//apis.google.com/js/client.js?onload=_gapi_load_callback'
];

var configData = null;
var devLibs = [];
$.getJSON("config.json", function (data) {
  configData = data;
  reqLibs0 = [
  '//maps.googleapis.com/maps/api/js?key=' + configData.googleApiKeys.mapsApi + '&libraries=places'
  ];
  $script(reqLibs0, 'reqLibs0');
});

$script.ready('reqLibs0', function () {

  var ngApp = angular.module('mainApp', [
    // angular material
    require('angular-material'),
    require('./utils/index').name,
    // core modules
   
    require('./layout/index').name,
    // app modules
    
    require('./nav-menu/index').name,
    ///chand sabir////
    require('./home/index').name,
    require('./register/index').name,
    require('./edit-profile/index').name,
    require('./login/index').name,
    require('./dashboard/index').name,

    
    

     require('./common/date-picker/index').name,
    // require('./common/modal/index').name,
    // require('./common/upload-thumbnail/index').name,
     require('./common/progress-spinner/index').name,
     require('./common/progress-spinner-small/index').name,
    //require('./common/input-number/index').name,

    // 3rd-party libs
    require('angular-ui-router')

    // apply angular material theme
    ]).config(function ($mdThemingProvider,$sceDelegateProvider) {
      $sceDelegateProvider.resourceUrlWhitelist([
       'self',
            // Allow loading from our assets domain.  Notice the difference between * and **.
            configData.marryConfig.apiBase+'/**'
      ]);

      $mdThemingProvider.theme('default')
      .primaryPalette('indigo')
      .accentPalette('light-blue');
    });

    require('./config')(ngApp, configData);
    require('./routes')(ngApp);

    $script(reqLibs, 'reqLibs');

    $script.ready('reqLibs', function () {
      $script(devLibs, 'devLibs');

      require('./utils/filters')(ngApp);
      require('./common/spinner').name;
      require('./common/angular-ui-calendar');

      angular.bootstrap(document, [ngApp.name]);
      ngApp.run(function ($log) {
        $script.ready('devLibs', function () { $log.info('The application has been initialized.'); });
      });
    });

    ngApp.filter('split', function () {
      return function (input, splitChar, splitIndex) {
        return input.split(splitChar)[splitIndex];
      }
    });

  });

// index.html style (frozen legacy styles)
require('./app.min.css');
// // latest app styles
//require('./static/css/app-latest.css');
// // angular material styles
require('./static/css/angular-material.css');
require('./static/css/bootstrap.css');

// // app styles
 require('./static/scss/main.scss');

/*require('./static/help/SSL/Responsive_HTML5/Payroll/Create_New_Payroll.html');
require('./static/help/SSL/Responsive_HTML5/Reports/Billage_Ratio_Report.html');*/


// index.html partials
// require('./html_includes/navbar.brand.incl.html');
// require('./html_includes/aside.top.2.incl.html');
// //require('./html_includes/nav.incl.html');
// //require('./nav-menu/nav-incl/navIncl.incl.html');
// require('./html_includes/header.incl.html');
// require('./html_includes/footer.incl.html');
// // header.incl.html partials
// require('./html_includes/dropdown.grid.incl.html');
// require('./html_includes/dropdown.notification.incl.html');
// require('./html_includes/dropdown.user.incl.html');
// require('./html_includes/navbar.form.incl.html');
// // dropdown.grid.incl.html
// require('./html_includes/widget.apps.incl.html');
// // accordion templates
// require('./html_includes/accordion.header.incl.html');
