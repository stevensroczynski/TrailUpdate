var module = angular.module('ngTrailApp');

var loginController = function(authService, $location) {
  var vm = this;

  vm.login = function(user) {
	  
    authService.login(user)
      .then(function(resp){
       console.log('logged in!')
        vm.loginRoute();
        })
        
        
        
      .catch(function(err) {
        console.log('login failed!');
      });
  }
  
  vm.loginRoute = function(){
	  
	  var loggedInUser = authService.currentUser();
	  $location.path('/user/'+loggedInUser.id)
	  
  }

};

module.component('loginComponent', {
  templateUrl : 'app_client/templates/login-component.view.html',
  controller : loginController
});
