/**
 * Copyright © 2016
 *
 * Created by vinay.adepu.
 * Description:
 *
 */
(function () {
    'use strict';
    angular.module('shopping', []).config(['$stateProvider',
        function ($stateProvider) {
            $stateProvider.state('shopping', {
                url: 'landing/shopping',
                title: 'Shopping',
                templateUrl:'src/modules/shopping/shopping.html',
                controller:['$scope',function($scope){
                    $scope.message = "Coming Soon.."
                }]
            })
        }]);
})();