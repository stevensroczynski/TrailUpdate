var app = angular.module('ngTrailApp');

app.component('navComponent', {

  templateUrl : 'app_client/templates/nav-component.view.html',

  controller : function(authService,$location) {
    var vm = this;
    
    vm.loggedIn = function(){
    	console.log("in nav componenet loggedin")
    	return authService.isLoggedIn();
    }

    vm.logout = function(){
    	console.log("in nav component logout")
    	authService.logout();
    	$location.path('/');
    }
    
    $(document).ready(function() {
      var $pills = $('#navComponent ul li');
      $pills.click(function(e) {
        var $this = $(this);

        $pills.removeClass('active');

        if (!$this.hasClass('active')) {
          $this.addClass('active');
        }
      });
    });
  },

  bindings: {}
});