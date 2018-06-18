module.exports = function(ngModule) {
  ngModule.service('AppUtilsService', AppUtilsService);
};

var moment = require('moment');

function AppUtilsService() {

  // extract time display from a given date
  this.timeDisplay = function(dateTimeString){
      return moment(dateTimeString).format("HH:mm");
  }

  // extract time display from a given date
  this.dateTimeDisplay = function(dateTimeString){
    // desired format is <locale date display> <locale time display>
    // e.g. (for UK) 09/29/2016 01:27 pm   -->   DD/MM/YYYY HH:mm
    return moment(dateTimeString).format("L") + " " + moment(dateTimeString).format("LT");
  }

  // extract date display from a given date
  this.dateDisplay = function(dateTimeString){
      // use the moment localised format which is based on momentLocale as defined in the country module for this user
      // (note: momrnt locale is set as part of the L10n service initialisation, add the L10n service if you want to access country preferences directly)
      return moment(dateTimeString).format("L");
  }

  this.dateDisplayFormat = function(){
    // as we are using moment locale to generate our date display, we can reverse engineer the display format from moment creationData
    return moment().creationData().locale._longDateFormat.L;
  }

  this.parseDisplayDateString = function(dateString){
    // note: this function assumes that momentLocale has been set on the global moment object
    var dateDisplayFormat = this.dateDisplayFormat();
    return moment(dateString, dateDisplayFormat).toDate();
  }

  this.validDateStringOfFormat = function(dateString){
    // test to see if the provided string is a valid date - based on an expected format
    // note: this function assumes that momentLocale has been set on the global moment object
    var dateDisplayFormat = this.dateDisplayFormat();
    var parsedDateString = moment(dateString, dateDisplayFormat);
    var parsedDateStringOriginalFormat = moment(parsedDateString).format(dateDisplayFormat);
    if ( dateString === parsedDateStringOriginalFormat ){
      return true;
    } else {
      return false;
    }
  }

  // show the shift length in format 8h25m (8 hours and 25 minutes)
  this.shiftLength = function(shiftStart, shiftEnd){
    var start = moment(shiftStart);
    var end = moment(shiftEnd);
    var diff = end.diff(start);
    return ( diff>=86400000 ? moment.duration(diff).days() + "d " : "") + moment.duration(diff).hours() + "h "+ moment.duration(diff).minutes() +"m";
  }

  // generate google maps URL using known lat and long values
  this.gmaps_concat_url = function(lat,lng){
    return 'https://maps.googleapis.com/maps/api/staticmap?size=640x400&markers=' + lat + ',' + lng;
  }

  // generate name display (optionally provide first and last name attribute names)
  this.nameDisplay = function(data, firstNameAttr, secondNameAttr){
    var nameDisplayText = "";
    var firstNameAttr = firstNameAttr || "firstName";
    var secondNameAttr = secondNameAttr || "lastName";
    if (data[firstNameAttr]){
      nameDisplayText = data[firstNameAttr];
    }
    if (data[secondNameAttr]){
      nameDisplayText += (data[firstNameAttr]) ?  " " + data[secondNameAttr] : data[secondNameAttr];
    }
    return nameDisplayText;
  }

  // comma seperate address parts in to a single line
  this.singleLineAddress = function(data){
    var locationAddressParts = [];
    if (data.addressLine1){
      locationAddressParts.push(data.addressLine1);
    }
    if (data.city){
      locationAddressParts.push(data.city);
    }
    if (data.postalCode){
      locationAddressParts.push(data.postalCode);
    }
    if (data.postalCodeExtension  && ( data.postalCodeExtension !== data.postalCode) ){
      locationAddressParts.push(data.postalCodeExtension);
    }
    if (data.country){
      locationAddressParts.push(data.country);
    }
    return locationAddressParts.join(", ");
  }

  //101916 - moved here from contractModel to be reused
  this.composeName = function(name) {
      return camelCase((name.salutation || name.title) || "") + " " + (name.firstName || name.firstname) + " " + (name.lastName || name.surname);
    }

  function camelCase(string){
    if(string){
      return string.charAt(0).toUpperCase() + string.slice(1);
    } else {
      return "";
    }
  }

  this.isValidNumber = function(numberParam,rules){
    /*
      this function checks that the provided number parameter is a genuine number
      it also applies the following optional rules (provided as rules param object)
      {
        allownegative: <boolean>,
        min: <number>,
        max: <number>,
        numbercharsonly: <boolean>,
        allowinvalidvalue: <boolean>
      }
      the function turns a response object with the status of the test and any relevant error message
      e.g.
      {
        status: true,
        erroMsg: ""
      }
      OR
      {
        status: false,
        erroMsg: "Invalid Number"
      }
    */
    var isValid = true, errorMsg = "";
    // convert the number param in to a number
    var number = Number(numberParam);
    if ( isValid && isNaN(number) ){
      isValid = false;
      errorMsg = "Invalid Number";
    }
    // check if negative number is allowed
    if ( isValid && (rules && !rules.allownegative ) ){
      if ( number < 0 ){
        isValid = false;
        errorMsg = "Negative Number";
      }
    }
    // check if number characters only (e.g. to avoid 'e' in a number field)
    if ( isValid && ( rules && rules.numbercharsonly ) ){
      // test for Non-numeric character
      if (!/^\d+$/.test(numberParam)){
        isValid = false;
        errorMsg = "Non-numeric character";
      }
    }
    // check if less than min
    if ( isValid && ( rules && rules.min ) ){
      if ( number < rules.min ){
        isValid = false;
        errorMsg = "Min Number " + rules.min;
      }
    }
    // check if geater than max
    if ( isValid && ( rules && rules.max ) ){
      if ( number > rules.max ){
        isValid = false;
        errorMsg = "Max Number " + rules.max;
      }
    }
    return {
      status: isValid,
      errorMsg: errorMsg
    }
  }

  this.resolveParamAsBoolean = function(param){
    if ( param === 'true' ){
      return true;
    } else if ( param === 'false' ){
      return false;
    } else {
      return undefined;
    }
  }

  this.sortArrayByProperty = function(property) {
    var sortOrder = 1;
    if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a,b) {
        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    }
  }

  this.isValidLatLong = function(type, value){
    var isValid = true, numericValue;
    var latLongRules = {
      'latitude' : {
        min: -90,
        max: 90
      },
      'longitude' : {
        min: -180,
        max: 180
      }
    };
    // ensure we have a value (note: that a 0 value is valid)
    if ( value === 0 || value ){
        // cast any string digits to a Number
        numericValue = Number(value);
        // ensure is a valid number
        if ( !isNaN(numericValue) ){
          // test for min/max of the lang/long rules
          if ( numericValue > latLongRules[type].max || numericValue < latLongRules[type].min ){
            isValid = false;
          }
        } else {
          isValid = false;
        }
      } else {
        isValid = false;
      }
    return isValid;
  }
  /*JP-9365 - Start, Amrish kumar, CreatedDate Jan, 12, 2017*/
  this.addHoursToDate = function(date, hours){
      return moment(date).add(hours, 'hours').toDate();
  }

  this.addMinutesToDate = function(date, minutes){
      return moment(date).add(minutes, 'minutes').toDate();
  }

  this.convertMilliSecondsToDate = function(milliseconds){
    var millisecondsInt = parseInt(milliseconds);
    return this.parseDisplayDateString(this.dateDisplay(new Date(millisecondsInt)));
  }

  this.dateDifferenceInHrs = function(startDateTime, endDateTime){
    var duration = moment.duration(moment(endDateTime).diff(moment(startDateTime)));
    return duration.asHours();
  }

  this.substractDays = function(date, days){
    return moment(date).subtract(days, 'days').toDate();
  }

  this.addDays = function(date, days){
    return moment(date).add(days, 'days').toDate();
  }

  this.toStartISOString = function(date){
    return moment(date).format('YYYY-MM-DD')+"T00:00:00.000Z";
  }

  this.toEndISOString = function(date){
    return moment(date).format('YYYY-MM-DD')+"T23:59:59.999Z";
  }

  this.toISOString = function(date){
    return moment(date).format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
  }

  this.toUTCDate = function(date){
    return moment.utc(date);
  }
  /*JP-9365 - Start, Amrish kumar, CreatedDate Jan, 12, 2017*/
  
  /*START SPRINT8, JP-15193 -FC6, JAN, 17, 2017 */
  this.formatDecimalNum = function(num){
    num = num.replace(/[^0-9.]/g, '');

    if(!num)
      return undefined;

    return num;
  }

  this.addPrecision = function(num,rules){
    if(num && rules.precision){
      var numParts = (num + "").split(".");
      var zerosToaAdd = 0;
     
      if(numParts.length>1){
         var precision =  numParts[1];
         if(numParts && precision.length < rules.precision){
          zerosToaAdd = (rules.precision - precision.length)
        }
      }
      else{
        num = (num + "")+".";
        zerosToaAdd = rules.precision;
      }
            
      for(var index=0; index<zerosToaAdd;index++){
           num = (num + "")+"0";
      }
    }
    return num;
  }

  
  this.isValidNum = function(num, rules){
    num = Number(num);

    if(isNaN(num)){
      return false;
    }  
    
    if(rules.max){
      if(num > Number(rules.max)){
        return false;
      }
    }
    
    if(rules.precision){
      var precision =  (num + "").split(".")[1];
      if(precision && precision.length > rules.precision){
        return false;
      }
    }
    
    return true;
  }
  /*END SPRINT8, JP-15193 -FC6, JAN, 17, 2017 */

}
