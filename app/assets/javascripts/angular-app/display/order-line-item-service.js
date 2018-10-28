(function() {
 'use strict';
 angular.module('dalvirooApp').factory ('OrderLineItemService', ['$resource', function($resource) {

   var OrderLineItemResource = $resource('/order_line_items/:id/:operation.json', {
     id: '@id',
     operation: '@operation'
   },{
     'changeOrderStatus':{
       method:'GET',
       params: {
         operation:'change_order_status'
       }
     }
   });

   return OrderLineItemResource;
 }]);

})();
