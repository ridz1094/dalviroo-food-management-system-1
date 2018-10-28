(function() {
  'use strict';
  angular.module('dalvirooApp').controller('DisplayCtrl', DisplayCtrl);

  DisplayCtrl.$inject = ['$scope','$sce', '$state', '$mdDialog', '$mdToast', 'orderLineItems', 'OrderLineItemService', '$interval', '$http'];

  function DisplayCtrl($scope, $sce, $state, $mdDialog, $mdToast, orderLineItems, OrderLineItemService, $interval, $http) {
    var DisplayCtrlVM = this;
    DisplayCtrlVM.orderLineItems = orderLineItems;
    DisplayCtrlVM.orderLineItemPresent = DisplayCtrlVM.orderLineItems.length > 0;
    DisplayCtrlVM.changeStatus = changeStatus;
    DisplayCtrlVM.downloadReport = downloadReport;

    function changeStatus(item_id, index){
      OrderLineItemService.changeOrderStatus({id: item_id, status: 1}, function(response){
        DisplayCtrlVM.orderLineItemPresent = DisplayCtrlVM.orderLineItems.length > 0;
      }, function(error){
      })
    }

    var reload = function(){
      OrderLineItemService.query(function(response){
        DisplayCtrlVM.orderLineItems = response;
      }, function(error){

      });
    }

    function downloadReport(){
      var url = '/order_line_items/download_report.json'
      $http({method: 'GET', url: url}).
      success(function(data, status, headers, config) {
        var disposition = headers('content-disposition');
        var fileName = disposition.substring(22,disposition.length-1)
        var href = 'xls/' + fileName
        var link = document.createElement("a");
        if (link.download !== undefined) {
          link.setAttribute("href", href);
          link.setAttribute("download", "report.xls");
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        } else {
          alert('Resume download only works in Chrome, Firefox, and Opera.');
        }
      }).
      error(function(data, status, headers, config) {});
    }

    $interval(function(){
      reload();
    }, 5000);

 }
})();
