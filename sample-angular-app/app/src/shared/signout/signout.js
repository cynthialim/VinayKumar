/**
 * Copyright © 2016
 *
 * Created by vinay.adepu.
 * Description:
 *
 */
(function () {
    'use strict';
    angular.module('signout', []).config(['$stateProvider',
        function ($stateProvider) {
            $stateProvider.state('signout', {
                url: 'signout',
                title: 'NGAGER',
                templateUrl:'src/shared/signout/signout.html',
                controller:['$scope',function($scope){
                    $scope.message = "Thank You for Using NGAGER Application."
                }]
            })
        }]);
})();