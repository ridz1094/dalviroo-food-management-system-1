(function() {
 'use strict';
 angular.module('dalvirooApp').factory ('ItemService', ['$resource', function($resource) {

   var ItemResource = $resource('/items/:id/:operation.json', {
     id: '@id',
     operation: '@operation'
   }, {
     'update': {
        method:'PUT'
      }
   });

   return ItemResource;
 }]);

})();
