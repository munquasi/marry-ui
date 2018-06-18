module.exports = function(ngModule) {
  var bindings = {
    form: '=',
    value: '=',
    valid: '=',
    errormsg: '=',
    changed: '&',
    id: '@',
    name: '@',
    class: '@',
    size: '@',
    min: '<',
    max: '<',
    allownegative: '<',
    numbercharsonly: '<',
    allowinvalidvalue: '<',
    required: '<'
  };

  function applyRuleOverrides(target, source, propertyName){
    if ( typeof source[propertyName] != 'undefined' ){
      target.rules[propertyName] = source[propertyName];
    }
  }

  function inputNumberController(AppUtilsService, $timeout){
    var controllerScope = this;
    // set defaults for two way bind parameters
    controllerScope.value = controllerScope.value || "";
    controllerScope.valid = controllerScope.value || true;
    controllerScope.errormsg = controllerScope.errormsg || "";

    controllerScope.id = controllerScope.id || "";
    controllerScope.name = controllerScope.name || "";
    controllerScope.class = controllerScope.class || "p-a-sm";
    controllerScope.size = controllerScope.size || 30;
    controllerScope.min = controllerScope.min || "";
    controllerScope.max = controllerScope.max || "";
    // local state
    controllerScope.lastValidValue = "";
    controllerScope.localValue = "";
    // default rules
    controllerScope.rules = {
      allownegative: false,
      min: "",
      max: "",
      numbercharsonly: true,
      allowinvalidvalue: true,
      required: false
    };
    // rule overrides
    controllerScope.overrides = ['allownegative', 'min','max','numbercharsonly','allowinvalidvalue','required'];
    // apply any rule overrides from bindings
    controllerScope.overrides.forEach(function(ruleName){
      applyRuleOverrides(controllerScope, controllerScope, ruleName);
    });

    controllerScope.$onInit = function(){
      // set the local value based on any existing value
      if ( controllerScope.value ){
        controllerScope.localValue = angular.copy(controllerScope.value);
      }
    };

    controllerScope.$onChanges = function(changesObj){
      // relevant for one-way data binding
      // if value has changed outside of this component then use this new value
      // loop through and apply relevant updates by key
      var rule;
      for ( var key in changesObj ){
        if ( controllerScope.overrides.indexOf(key) > -1 ){
          rule = {};
          rule[key] = changesObj[key].currentValue;
          applyRuleOverrides(controllerScope, rule, key);
        }
      }

      // the main value is currently two-way bound, but keeping this here regardless
      if ( changesObj['value'] ){
        controllerScope.localValueChanged(changesObj['value'].currentValue);
      }
    };

    controllerScope.$doCheck = function(){
      // if the master value is updated then we need to update this components local value accordingly
      // we need to use $doCheck as the binding is two-way rather than one-way
      if ( controllerScope.value !== controllerScope.localValue ){
        controllerScope.localValueChanged(controllerScope.value);
      }
    };

    controllerScope.localValueChanged = function(newValue){
      var newValue = newValue || controllerScope.localValue;
      // check that our new value is valid
      var isValid = AppUtilsService.isValidNumber(newValue, controllerScope.rules);
      if ( isValid.status ){
        // number is valid
        // set this as our localValue (if set externally)
        // store this as our latest valid value
        // and capture valid status
        controllerScope.localValue = angular.copy(newValue);
        controllerScope.lastValidValue = angular.copy(newValue);
        // set main validity status and clear any errors
        controllerScope.valid = true;
        controllerScope.errormsg = "";
      } else {
        // number is not valid so set main validity status and error message
        controllerScope.valid = false;
        controllerScope.errormsg = isValid.errorMsg;
        // if invalid values are not allowed then revert to the last known valid value
        if ( !controllerScope.rules.allowinvalidvalue ){
          controllerScope.localValue = angular.copy(controllerScope.lastValidValue);
        }
      }
      // check if we have a value
      if ( controllerScope.localValue === "" || controllerScope.localValue === undefined || controllerScope.localValue === null ){
        if ( controllerScope.rules.required ){
          controllerScope.valid = false;
          controllerScope.errormsg = "Required";
        } else {
          // number is blank and not required so is therefore valid
          controllerScope.valid = true;
          controllerScope.errormsg = "";
        }
      }
      // upate the main value binding to reflect our local value state
      // (only required as we are using two-way binding)
      controllerScope.value = angular.copy(controllerScope.localValue);
      // update the form status for this form field
      controllerScope.form.$setValidity(controllerScope.name, controllerScope.valid);
      // if there is an changed binding then run this too, passing back the new value
      if ( controllerScope.changed ){
          // use a timeout as another workaround for two-way data binding
          // to ensure the master value has been updated
          $timeout( function(){
            controllerScope.changed();
          }, 100);
      }
    }

  }

  ngModule.component('inputNumber', {
    template: require('./input-number.html'),
    controller: inputNumberController,
    bindings: bindings
  });
};
