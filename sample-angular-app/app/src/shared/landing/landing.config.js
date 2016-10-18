/**
 * Copyright © 2016
 *
 * Created by vinay.adepu.
 * Description:
 *
 */
(function () {
    'use strict';
    angular.module('landing', []).config(['$stateProvider',
        function ($stateProvider) {
            $stateProvider.state('landing', {
                url: '/landing',
                title: 'Home',
                templateUrl:'app/src/shared/landing/landing.html',
                controller:'landingCtrl'
            })
        }]);
})();