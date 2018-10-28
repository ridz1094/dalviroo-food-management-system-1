angular.module('dalvirooApp').config(['$stateProvider','$urlRouterProvider',function($stateProvider,$urlRouterProvider) {

  var ordersState = {
    name: 'container.user.orders',
    url:'/orders',
    templateUrl: "angular-app/order/views/orders.html",
    controller:"OrdersCtrl as OrdersCtrlVM",
    resolve: {
      orders: ['OrderService', function(OrderService) {
                  return OrderService.query({
                  }).$promise;
                }]
    }
  }

  $stateProvider.state(ordersState);

}]);
