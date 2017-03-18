var app = angular.module('ngTrailApp');

app.factory('authService', function($window, $http){
    // Place JWT into local storage
    var saveToken = function(token){
      if(token) {
        $window.localStorage['todo-token'] = token;
      }
    };

    // Retrieve JWT from local storage
    var getToken = function() {
      return $window.localStorage['todo-token'];
    };

    var signup = function(user) {
      return $http({
        method : "POST",
        url : "api/signup",
        headers : {
          "Content-Type" : "application/json"
        },
        data : user
      })
      .then(function(response){
        saveToken(response.data.jwt);
        return response;
      });
    };

    // Contact the server, authenticate user credentials
    var login = function(user) {
      return $http({
        method : "POST",
        url : "api/login",
        headers : {
          "Content-Type" : "application/json"
        },
        data : user
      })
      .then(function(response){
        saveToken(response.data.jwt);
        return response;
      });
    };

    // Remove JWT from local storage
    var logout = function() {
      $window.localStorage.removeItem('todo-token');
    };

    // Check that a user's login is valid (present AND not expired)
    var isLoggedIn = function() {
      var token = getToken();

      if(token) {
        // $window.atob decodes a the encoded string
        var payload = JSON.parse($window.atob(token.split('.')[1]));

        return payload.exp > Date.now() / 1000;

      }
      else {
        return false;
      }
    };

    // Get current user from JWT
    var currentUser = function() {

      if (isLoggedIn()) {
        var token = getToken();
        var payload = JSON.parse($window.atob(token.split('.')[1]));

        return {
          name : payload.email,
          id : payload.user_id
        };
      }
    };

    return {
      login : login,
      signup : signup,
      logout : logout,
      isLoggedIn : isLoggedIn,
      currentUser : currentUser,
      getToken : getToken
    };
});
