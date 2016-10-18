/**
 * Copyright © 2016
 *
 * Created by vinay.adepu.
 * Description:
 *
 */
(function () {
    'use strict';
    angular.module('landing').controller("landingCtrl", ['$scope', 'landingSvc', function ($scope, landingSvc) {
        //img need to be base64 in real system
        $scope.userInfo = landingSvc.getUserInfo();

        //this is used if we integrate with backend service.
        $scope.updateCredits = function(val){
            landingSvc.setCredits(val);
            $scope.userInfo = landingSvc.getUserInfo();
            $scope.$apply();
        };
    }]);
})();