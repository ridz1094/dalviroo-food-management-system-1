angular
  .module('dalvirooApp')
  .controller('LoginCtrl', function($scope, $rootScope, Auth, $state){
    var config = {headers: {'X-HTTP-Method-Override': 'POST'}}

    $scope.login = function(){
      Auth.login($scope.user, config).then(function(user){
        $rootScope.user = user;
        $state.go('container.user.items');
      }, function(response){
        alert(response.data.error)
      });
    }
  })
