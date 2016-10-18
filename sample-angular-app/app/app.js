/**
 * Copyright © 2016
 *
 * Created by vinay.adepu.
 * Description:
 *
 */
(function () {
    'use strict';
    angular.module('nGager', [
        'ngRoute',
        'ui.router',
        'chart.js',
        'appModules',
        'shared'
    ]).
        config(['$locationProvider', '$urlRouterProvider', '$routeProvider', function ($locationProvider, $urlRouterProvider, $routeProvider) {
            // Set the following to true to enable the HTML5 Mode
            // You may have to set <base> tag in index and a routing configuration in your server
            $locationProvider.html5Mode(false);

            $routeProvider
                // route for the menu/home page
                .when('/', {
                    templateUrl : 'src/shared/landing/landing.html',
                    controller  : 'landingCtrl'
                });
            // default route
            $urlRouterProvider.otherwise('/');
        }]);
})();