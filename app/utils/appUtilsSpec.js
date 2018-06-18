var component = require('./index');
var moment = require('moment');

describe("App Utils Service", function() {
  var AppUtilsService;
  var sampleDateTimeString = '1980-03-26T18:00:00.000Z';
  var sampleDateString = '1980-03-26';
  var dateDisplayFormat = moment().creationData().locale._longDateFormat.L;
  var sampleDateDisplayString = moment(sampleDateString).format(dateDisplayFormat);

  beforeEach(angular.mock.module(component.name));

  beforeEach(angular.mock.inject(function(_AppUtilsService_){
    AppUtilsService = _AppUtilsService_;
  }));

  // note: the below may be timezone dependent, so watch out for this if these tests start failing

  it('timeDisplay utility output as expected', function () {
    expect( AppUtilsService.timeDisplay(sampleDateTimeString) ).toEqual( moment(sampleDateTimeString).format("HH:mm") );
  });

  it('dateTimeDisplay utility output as expected', function () {
    expect( AppUtilsService.dateTimeDisplay(sampleDateTimeString) ).toEqual( moment(sampleDateTimeString).format("L") + " " + moment(sampleDateTimeString).format("LT") );
  });

  it('dateDisplay utility output as expected', function () {
    expect( AppUtilsService.dateDisplay(sampleDateTimeString) ).toEqual( moment(sampleDateTimeString).format("L") );
  });

  it('dateDisplayFormat utility output as expected', function () {
    expect( AppUtilsService.dateDisplayFormat() ).toEqual( dateDisplayFormat );
  });

  it('parseDisplayDateString utility output as expected', function () {
    expect( AppUtilsService.parseDisplayDateString(sampleDateDisplayString) ).toEqual( moment(sampleDateDisplayString, dateDisplayFormat).toDate() );
  });

  it('shiftLength utility output as expected', function () {
    var shiftStartTime = '1980-03-26T18:00:00.000Z';
    var shiftEndTime = '1980-03-26T19:25:00.000Z';
    expect( AppUtilsService.shiftLength(shiftStartTime, shiftEndTime) ).toEqual('1h25m');
  });

  it('gmaps_concat_url utility output as expected', function () {
    var latitude = '51.5032520';
    var longitude = '-0.1278990';
    expect( AppUtilsService.gmaps_concat_url(latitude, longitude) )
    .toEqual('https://maps.googleapis.com/maps/api/staticmap?size=640x400&markers=51.5032520,-0.1278990');
  });

  it('nameDisplay utility output as expected', function () {
    var bob = {
      firstName: 'Bob',
      lastName: 'Marley'
    };
    var bill = {
      custFirstName: 'Bill',
      custLastName: 'Oddy'
    };
    expect( AppUtilsService.nameDisplay(bob) ).toEqual("Bob Marley");
    expect( AppUtilsService.nameDisplay(bill, 'custFirstName', 'custLastName' ) ).toEqual("Bill Oddy");
  });

  it('singleLineAddress utility output as expected', function () {
    var address1 = {
      addressLine1: '1 The Road',
      city: 'The City',
      postalCode: 'ABC DEF',
      postalCodeExtension: 'GHI',
      country: 'UK'
    };
    var address2 = {
      addressLine1: '1 The Road',
      city: 'The City',
      postalCode: 'ABC DEF',
      postalCodeExtension: 'ABC DEF',
      country: 'UK'
    };
    var address3 = {
      addressLine1: '1 The Road',
      city: 'The City'
    };
    expect( AppUtilsService.singleLineAddress(address1) ).toEqual("1 The Road, The City, ABC DEF, GHI, UK");
    expect( AppUtilsService.singleLineAddress(address2) ).toEqual("1 The Road, The City, ABC DEF, UK");
    expect( AppUtilsService.singleLineAddress(address3) ).toEqual("1 The Road, The City");
  });

  it('composeName utility output as expected', function () {
    var bob = {
      salutation: 'Mr',
      firstName: 'Bob',
      lastName: 'Marley'
    };
    var bill = {
      title: 'Dr',
      firstname: 'Bill',
      surname: 'Oddy'
    };
    expect( AppUtilsService.composeName(bob) ).toEqual("Mr Bob Marley");
    expect( AppUtilsService.composeName(bill) ).toEqual("Dr Bill Oddy");
  });

  it('isValidNumber utility output as expected', function () {
    expect( AppUtilsService.isValidNumber('A').status ).toEqual(false);
    expect( AppUtilsService.isValidNumber('1e2').status ).toEqual(true);
    expect( AppUtilsService.isValidNumber(0).status ).toEqual(true);
    expect( AppUtilsService.isValidNumber(-1).status ).toEqual(true);
    expect( AppUtilsService.isValidNumber(1).status ).toEqual(true);
    var rules = {
      numbercharsonly: true,
      allownegative: false,
      min: 0,
      max: 1
    };
    expect( AppUtilsService.isValidNumber('A', rules).status ).toEqual(false);
    expect( AppUtilsService.isValidNumber('1e2', rules).status ).toEqual(false);
    expect( AppUtilsService.isValidNumber(0, rules).status ).toEqual(true);
    expect( AppUtilsService.isValidNumber(-1, rules).status ).toEqual(false);
    expect( AppUtilsService.isValidNumber(1, rules).status ).toEqual(true);
    expect( AppUtilsService.isValidNumber(2, rules).status ).toEqual(false);
  });

  it('resolveParamAsBoolean utility output as expected', function () {
    expect( AppUtilsService.resolveParamAsBoolean('false') ).toEqual(false);
    expect( AppUtilsService.resolveParamAsBoolean('true') ).toEqual(true);
  });

  it('sortArrayByProperty utility output as expected', function () {
    var unsortedArray = [{ a: 2, b: 'bill'}, { a: 1, b: 'bob' }, { a: 3, b: 'ben' }];
    expect( unsortedArray.sort(AppUtilsService.sortArrayByProperty('a')) )
    .toEqual( [{ a: 1, b: 'bob' }, { a: 2, b: 'bill'}, { a: 3, b: 'ben' }] );
    expect( unsortedArray.sort(AppUtilsService.sortArrayByProperty('-a')) )
    .toEqual( [{ a: 3, b: 'ben' }, { a: 2, b: 'bill'}, { a: 1, b: 'bob' }] );
  });

  it('isValidLatLong utility output as expected', function () {
    expect( AppUtilsService.isValidLatLong('latitude', 90) ).toEqual(true);
    expect( AppUtilsService.isValidLatLong('latitude', 0) ).toEqual(true);
    expect( AppUtilsService.isValidLatLong('latitude', -90) ).toEqual(true);
    expect( AppUtilsService.isValidLatLong('latitude', 91) ).toEqual(false);
    expect( AppUtilsService.isValidLatLong('latitude', -91) ).toEqual(false);
    expect( AppUtilsService.isValidLatLong('longitude', 180) ).toEqual(true);
    expect( AppUtilsService.isValidLatLong('longitude', 0) ).toEqual(true);
    expect( AppUtilsService.isValidLatLong('longitude', -180) ).toEqual(true);
    expect( AppUtilsService.isValidLatLong('longitude', 181) ).toEqual(false);
    expect( AppUtilsService.isValidLatLong('longitude', -181) ).toEqual(false);
  });


});
