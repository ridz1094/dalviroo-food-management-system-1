(function() {
  'use strict';
  angular.module('dalvirooApp').controller('ItemCtrl', ItemCtrl);

  ItemCtrl.$inject = ['$scope','$sce', '$state', '$mdDialog', 'items', '$mdToast', 'ItemService'];

  function ItemCtrl($scope, $sce, $state, $mdDialog, items, $mdToast, ItemService) {
    var ItemCtrlVM = this;
    ItemCtrlVM.items = items;
    ItemCtrlVM.itemPresent = ItemCtrlVM.items.length > 0;

    ItemCtrlVM.showAdvanced = function(ev, item, index) {
    $mdDialog.show({
      controller: 'CreateEditItemCtrl as CreateEditItemCtrlVM',
      templateUrl: 'angular-app/item/views/create-edit-item.html',
      parent: angular.element(document.body),
      scope: $scope,
      targetEvent: ev,
      scope: $scope,
       preserveScope: true,
       clickOutsideToClose: false,
       fullscreen: false,
      resolve: {
         item: function() {
           return angular.copy(item);
         }
       }
    })
    .then(function(item) {
      switch (item.requestType) {
          case "save":
            ItemCtrlVM.items.push(item);
            $mdToast.show({
              template: '<md-toast class="md-toast ' + 'success' + '">' + "Item created successfully" + '</md-toast>',
              hideDelay: 6000,
              position: 'bottom left'
            });
            break;
          case "update":
            ItemCtrlVM.items[index] = item;
            $mdToast.show({
              template: '<md-toast class="md-toast ' + 'success' + '">' + "Item updated successfully" + '</md-toast>',
              hideDelay: 6000,
              position: 'bottom left'
            });
            break;
          case "delete":
            ItemCtrlVM.items.splice(index, 1);
            $mdToast.show({
              template: '<md-toast class="md-toast ' + 'success' + '">' + "Item deleted successfully" + '</md-toast>',
              hideDelay: 6000,
              position: 'bottom left'
            });
            break;
          default:

        }
        delete item.requestType;
    }, function() {
    });
  };
 }
})();
