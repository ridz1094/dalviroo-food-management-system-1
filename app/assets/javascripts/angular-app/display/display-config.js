angular.module('dalvirooApp').config(['$stateProvider','$urlRouterProvider',function($stateProvider,$urlRouterProvider) {

  var displayState = {
    name: 'container.user.kitchen-display',
    url:'/kitchen-display',
    templateUrl: "angular-app/display/views/display.html",
    controller:"DisplayCtrl as DisplayCtrlVM",
    resolve: {
      orderLineItems: ['OrderLineItemService', function(OrderLineItemService) {
                  return OrderLineItemService.query({}).$promise;
                }]
    }
  }

  var reportState = {
    name: 'container.user.report',
    url:'/report',
    templateUrl: "angular-app/display/views/report.html",
    controller:"ReportCtrl as ReportCtrlVM",
    resolve: {
      orderLineItems: ['OrderLineItemService', function(OrderLineItemService) {
                  return OrderLineItemService.query({ status: 1}).$promise;
                }]
    }
  }
  $stateProvider.state(displayState);
  $stateProvider.state(reportState);

}]);
