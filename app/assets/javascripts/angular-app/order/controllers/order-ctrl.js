(function() {
  'use strict';
  angular.module('dalvirooApp').controller('OrderCtrl', OrderCtrl);

  OrderCtrl.$inject = ['$scope','$sce', '$state', 'order', '$mdDialog'];

  function OrderCtrl($scope, $sce, $state, order, $mdDialog) {
    var OrderCtrlVM = this;
    OrderCtrlVM.order = order.order;
    OrderCtrlVM.close = close;
    function close() {
      $mdDialog.cancel();
    }
 }
})();
