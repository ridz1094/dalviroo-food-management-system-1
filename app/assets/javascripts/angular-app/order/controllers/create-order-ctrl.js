(function() {
  'use strict';
  angular.module('dalvirooApp').controller('CreateOrderCtrl', CreateOrderCtrl);

  CreateOrderCtrl.$inject = ['$scope','$sce', '$state', 'items', '$mdDialog', 'OrderService'];

  function CreateOrderCtrl($scope, $sce, $state, items, $mdDialog, OrderService) {
    var CreateOrderCtrlVM = this;
    CreateOrderCtrlVM.cancel = cancel;
    CreateOrderCtrlVM.items = items;
    CreateOrderCtrlVM.saveOrder = saveOrder;
    CreateOrderCtrlVM.order = {amount: 0, service_tax: 0, total_amount: 0};
    CreateOrderCtrlVM.calculateAmount = calculateAmount;
    CreateOrderCtrlVM.orderLineItems = [];

    function cancel() {
      $mdDialog.cancel();
    }

    function saveOrder(form){
      var returnBack = false;
      if(form.$invalid) {
        $scope.formSubmitted = true;
        returnBack = true;
      }
      CreateOrderCtrlVM.order.order_line_items_attributes = CreateOrderCtrlVM.orderLineItems;
      OrderService.save({order: CreateOrderCtrlVM.order}).$promise.then(function(value) {
        CreateOrderCtrlVM.order = value.order;
        CreateOrderCtrlVM.orderErrors = [];
        $mdDialog.hide(CreateOrderCtrlVM.order);
      }, function(badResponse) {
        CreateOrderCtrlVM.orderErrors = badResponse.data.errors;
        $mdToast.show({
              template: '<md-toast class="md-toast ' + 'error' +'">' + CreateOrderCtrlVM.orderErrors.join(', ') + '</md-toast>',
              hideDelay: 3000,
              position: 'bottom left'
          });
      });
    }

    function calculateAmount(){
      CreateOrderCtrlVM.order.amount = 0;
      CreateOrderCtrlVM.orderLineItems = [];
      for(var i = 0; i< CreateOrderCtrlVM.items.length; i++){
        if(CreateOrderCtrlVM.items[i].quantity > 0){
          CreateOrderCtrlVM.orderLineItems.push({item_id: CreateOrderCtrlVM.items[i].id, quantity: CreateOrderCtrlVM.items[i].quantity});
          CreateOrderCtrlVM.order.amount += CreateOrderCtrlVM.items[i].quantity * CreateOrderCtrlVM.items[i].price;
        }
      }
      CreateOrderCtrlVM.order.service_tax = CreateOrderCtrlVM.order.amount * 0.15;
      CreateOrderCtrlVM.order.total_amount = CreateOrderCtrlVM.order.amount + CreateOrderCtrlVM.order.service_tax;
    }
 }
})();
