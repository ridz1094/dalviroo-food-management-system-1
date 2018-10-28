(function() {
  'use strict';
  angular.module('dalvirooApp').controller('HomeCtrl', HomeCtrl);

  HomeCtrl.$inject = ['$scope','$sce', '$state', '$rootScope', 'Auth'];

  function HomeCtrl($scope, $sce, $state, $rootScope, Auth) {
    var HomeCtrlVM = this;
    HomeCtrlVM.goTo = goTo;
    Auth.currentUser().then(function (user){
      $rootScope.user = user
    });
    HomeCtrlVM.user = $rootScope.user;
    HomeCtrlVM.logout = logout;

    HomeCtrlVM.tabs = [
      { title: 'Items', state: {name:'container.user.items'}},
      { title: 'Orders', state: {name:'container.user.orders'}},
      { title: 'Kitchen Display', state: {name:'container.user.kitchen-display'}},
      { title: 'Report', state: {name:'container.user.report'}}
    ];
    function goTo(state) {
      return $state.go(state.name,state.args);
    }

    function logout(){
      Auth.logout();
      goTo({name: 'login'});
    }
 }
})();
