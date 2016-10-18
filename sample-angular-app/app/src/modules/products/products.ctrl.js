/**
 * Copyright © 2016
 *
 * Created by vinay.adepu.
 * Description:
 *
 */
(function () {
    'use strict';
    angular.module('products').controller("productsCtrl", ['$scope','productsSvc','$state', function ($scope, productsSvc, $state) {
        $scope.productsList = [];
        productsSvc.getProductsList().then(function(res){
            $scope.productsList = res.data;
        }, function(){
            $scope.productsList = [];
        });
        $scope.labels = ["Time Left", "Finished Time"];
        $scope.data = [140, 100];

        $scope.colours = ["#000000","#d6d4d4"]
        $scope.getTimeDifference = function(dateVal){
            return productsSvc.getTimeDifference(dateVal);
        };

        $scope.goToDetailPage = function(product){
            $state.go('productDetails',{productInfo:product})
        };

    }]);
})();