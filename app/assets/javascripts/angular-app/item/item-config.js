angular.module('dalvirooApp').config(['$stateProvider','$urlRouterProvider',function($stateProvider,$urlRouterProvider) {

  var itemState = {
    name: 'container.user.items',
    url:'/items',
    templateUrl: "angular-app/item/views/items.html",
    controller:"ItemCtrl as ItemCtrlVM",
    resolve: {
      items: ['ItemService', function(ItemService) {
                  return ItemService.query({
                  }).$promise;
                }]
    }
  }

  $stateProvider.state(itemState);

}]);
