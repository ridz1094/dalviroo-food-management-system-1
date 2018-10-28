angular.module('dalvirooApp').config(['$stateProvider','$urlRouterProvider',function($stateProvider,$urlRouterProvider) {

  $urlRouterProvider.otherwise('/');
  $urlRouterProvider.when('/', '/login');

  var containerState = {
    name: 'container',
    abstract: true,
    controller: 'HomeCtrl as HomeCtrlVM',
    templateUrl: 'angular-app/common/views/home.html'
  }

  var containerPublicState = {
    name: 'container.public',
    abstract: true,
    template: '<ui-view />',
  }

  var containerPublicHomeState = {
    name: 'container.public.home',
    url: '/'
  }

  var containerUserState = {
    name: 'container.user',
    abstract: true,
    template: '<ui-view />',
    onEnter: function(Auth, $state){
          Auth.currentUser().then(function(){

          },function(){
            $state.go('login');
          })
    }
  }

  var loginState = {
    name: 'login',
    url: '/login',
    controller: 'LoginCtrl',
    templateUrl: 'angular-app/common/views/login.html',
    onEnter: function(Auth, $state){
          Auth.currentUser().then(function(){
            $state.go('container.user.items')
          })
        }
  }

  $stateProvider.state(containerState);
  $stateProvider.state(containerPublicState);
  $stateProvider.state(containerPublicHomeState);
  $stateProvider.state(containerUserState);
  $stateProvider.state(loginState);



}]);
