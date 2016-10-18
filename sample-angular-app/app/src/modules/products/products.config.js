/**
 * Copyright © 2016
 *
 * Created by vinay.adepu.
 * Description:
 *
 */
(function () {
    'use strict';
    angular.module('products', []).config(['$stateProvider',
        function ($stateProvider) {
            $stateProvider.state('products', {
                url: 'landing/products',
                title: 'Products',
                templateUrl:'src/modules/products/products.html',
                controller:'productsCtrl'
            }).state('productDetails', {
                url: 'landing/productDetails',
                title: 'Product Details',
                templateUrl:'src/modules/products/productDetails.html',
                controller:'productDetailsCtrl',
                params: {
                    productInfo: {}
                }
            })
        }]);
})();