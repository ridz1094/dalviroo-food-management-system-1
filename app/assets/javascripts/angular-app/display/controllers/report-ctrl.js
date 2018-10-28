(function() {
  'use strict';
  angular.module('dalvirooApp').controller('ReportCtrl', ReportCtrl);

  ReportCtrl.$inject = ['$scope','$sce', '$state', '$mdDialog', '$mdToast', 'orderLineItems', 'OrderLineItemService'];

  function ReportCtrl($scope, $sce, $state, $mdDialog, $mdToast, orderLineItems, OrderLineItemService) {
    var ReportCtrlVM = this;
    ReportCtrlVM.orderLineItems = orderLineItems;
    ReportCtrlVM.orderLineItemPresent = ReportCtrlVM.orderLineItems.length > 0;
 }
})();
