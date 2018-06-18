var moment = require('moment');

module.exports = function(ngModule) {
  ngModule.filter('localized_date', localize_date);
  ngModule.filter('dateDisplay', dateDisplay);
  ngModule.filter('timeDisplay', timeDisplay);
  ngModule.filter('dateTimeDisplay', dateTimeDisplay);
};

function localize_date() {
  return function(dateStr) {
    if (!!dateStr)
      return moment(dateStr).format('L');
    else
      return '---';
  };
}

function dateDisplay(AppUtilsService){
  return function(date){
    if (date){
      return AppUtilsService.dateDisplay(date);
    } else {
      return "";
    }
  };
}

function timeDisplay(AppUtilsService){
  return function(dateTimeString){
    if (dateTimeString){
      return AppUtilsService.timeDisplay(dateTimeString);
    } else {
      return "";
    }
  };
}

function dateTimeDisplay(AppUtilsService){
  return function(dateTimeString){
    if (dateTimeString){
      return AppUtilsService.dateTimeDisplay(dateTimeString);
    } else {
      return "";
    }
  };
}
