module.exports = function(ngModule) {
  ngModule.service('pubsub', service);
};

function service($rootScope) {

  var listeners = [];

  $rootScope.$on('$stateChangeStart', function() {
    listeners.map(function(fn) { fn(); });
  });

  this.subscribe = function(eventName, listener) {
    listeners.push($rootScope.$on(eventName, listener));
  };

  this.publish = function() {
    $rootScope.$broadcast.apply($rootScope, arguments);
  };
}
