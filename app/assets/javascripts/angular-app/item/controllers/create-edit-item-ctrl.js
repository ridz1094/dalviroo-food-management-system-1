(function() {
  'use strict';
  angular.module('dalvirooApp').controller('CreateEditItemCtrl', CreateEditItemCtrl);

  CreateEditItemCtrl.$inject = ['$scope','$sce', '$state', '$mdDialog', 'item', 'ItemService', '$mdToast'];

  function CreateEditItemCtrl($scope, $sce, $state, $mdDialog, item, ItemService, $mdToast) {
    var CreateEditItemCtrlVM = this;

   $scope.formSubmitted = false;
   CreateEditItemCtrlVM.cancel = cancel;
   CreateEditItemCtrlVM.item = item;
   CreateEditItemCtrlVM.isUpdate = CreateEditItemCtrlVM.item ? angular.isDefined(CreateEditItemCtrlVM.item.id) : null;

   CreateEditItemCtrlVM.transformChip = transformChip;
   CreateEditItemCtrlVM.saveItem = saveItem;
   CreateEditItemCtrlVM.deleteItem = deleteItem;
   CreateEditItemCtrlVM.itemErrors = [];

   function transformChip(chip) {
      // If it is an object, it's already a known chip
      if (angular.isObject(chip)) {
        return chip;
      }

      // Otherwise, create a new one
      return {
        name: chip
      }
    }


   function cancel() {
     $mdDialog.cancel();
   }

   function saveItem(form) {
      var returnBack = false;
      if(form.$invalid) {
        $scope.formSubmitted = true;
        returnBack = true;
      }

      if (CreateEditItemCtrlVM.isUpdate) {
        ItemService.update(CreateEditItemCtrlVM.item).$promise.then(function(value) {
          CreateEditItemCtrlVM.item = value.item;
          CreateEditItemCtrlVM.itemsErrors = [];
          CreateEditItemCtrlVM.item.requestType = "update";
          $mdDialog.hide(CreateEditItemCtrlVM.item);
        }, function(badResponse) {
          CreateEditItemCtrlVM.itemErrors = badResponse.data.errors;
          $mdToast.show({
                template: '<md-toast class="md-toast ' + 'error' +'">' + CreateEditItemCtrlVM.itemErrors.join(', ') + '</md-toast>',
                hideDelay: 3000,
                position: 'bottom left'
            });
        });
      } else {
        ItemService.save({item: CreateEditItemCtrlVM.item}).$promise.then(function(value) {
          CreateEditItemCtrlVM.item = value.item;
          CreateEditItemCtrlVM.itemErrors = [];
          CreateEditItemCtrlVM.item.requestType = "save";
          $mdDialog.hide(CreateEditItemCtrlVM.item);
        }, function(badResponse) {
          CreateEditItemCtrlVM.itemErrors = badResponse.data.errors;
          $mdToast.show({
                template: '<md-toast class="md-toast ' + 'error' +'">' + CreateEditItemCtrlVM.itemErrors.join(', ') + '</md-toast>',
                hideDelay: 3000,
                position: 'bottom left'
            });
        });
      }
    }

    function deleteItem(ev) {
      ItemService.delete({
        id: CreateEditItemCtrlVM.item.id
      }).$promise.then(function(value) {
        CreateEditItemCtrlVM.item.requestType = "delete";
        $mdDialog.hide(CreateEditItemCtrlVM.item);
      }, function(response) {
      });

    }
 }
})();
