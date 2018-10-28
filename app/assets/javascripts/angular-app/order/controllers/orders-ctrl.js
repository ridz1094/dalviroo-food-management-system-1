(function() {
  'use strict';
  angular.module('dalvirooApp').controller('OrdersCtrl', OrdersCtrl);

  OrdersCtrl.$inject = ['$scope','$sce', '$state', 'orders', '$mdDialog', 'ItemService', '$mdToast'];

  function OrdersCtrl($scope, $sce, $state, orders, $mdDialog, ItemService, $mdToast) {
    var OrdersCtrlVM = this;
    OrdersCtrlVM.orders = orders || [];
    OrdersCtrlVM.orderDetail = orderDetail;
    OrdersCtrlVM.orderPresent = OrdersCtrlVM.orders.length > 0;

    OrdersCtrlVM.showAdvanced = function(ev) {
    $mdDialog.show({
      controller: 'CreateOrderCtrl as CreateOrderCtrlVM',
      templateUrl: 'angular-app/order/views/create-order.html',
      parent: angular.element(document.body),
      scope: $scope,
      targetEvent: ev,
      scope: $scope,
       preserveScope: true,
       clickOutsideToClose: false,
       fullscreen: true,
      resolve: {
         items: ['ItemService', function(ItemService) {
                     return ItemService.query({
                     }).$promise;
                   }]
       }
    })
    .then(function(order) {
        OrdersCtrlVM.orders.push(order);
        $mdToast.show({
          template: '<md-toast class="md-toast ' + 'success' + '">' + "Order created successfully" + '</md-toast>',
          hideDelay: 6000,
          position: 'bottom left'
        });
    }, function() {
    });
  };

  function orderDetail(orderId, ev) {

    $mdDialog.show({
      controller: 'OrderCtrl as OrderCtrlVM',
      templateUrl: 'angular-app/order/views/order.html',
      parent: angular.element(document.body),
      scope: $scope,
      targetEvent: ev,
      preserveScope: true,
      clickOutsideToClose: false,
      fullscreen: true,
      resolve: {
         order: ['OrderService', function(OrderService) {
                return OrderService.get({id: orderId}).$promise;
                }]
        }
      })
  }
}
})();
