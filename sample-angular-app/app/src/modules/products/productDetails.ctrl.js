/**
 * Copyright © 2016
 *
 * Created by vinay.adepu.
 * Description:
 *
 */
(function () {
    'use strict';
    angular.module('products').controller("productDetailsCtrl", ['$scope', 'productsSvc','$state','landingSvc', function ($scope, productsSvc, $state, landingSvc) {

        $scope.product = $state.params.productInfo;
        $scope.labels = ["Time Left", "Finished Time"];
        $scope.data = [140, 100];
        //This information can be used from service in real scenario
        $scope.userInfo = landingSvc.getUserInfo();
        $scope.creditsInBag = $scope.userInfo.points;
        $scope.bidValue = 0;
        $scope.colours = ["#000000","#d6d4d4"];
        $scope.getTimeDifference = function(dateVal){
            return productsSvc.getTimeDifference(dateVal);
        };

        $scope.maxBidValue = 0;
        $scope.showHistory = false;
        $scope.productHistory = [];
        $scope.newBids = [];
        $scope.getProductHistory = function(fieldName){
            productsSvc.getProductHistory().then(function(res){
                $scope.productHistory = res.data[fieldName];
                angular.extend($scope.productHistory, $scope.newBids);
                $scope.showHistory = true;
                for(var i = 0; i < $scope.productHistory.length; i++){
                    if(parseFloat($scope.productHistory[i].value) > $scope.maxBidValue){
                        $scope.maxBidValue = $scope.productHistory[i].value;
                    }
                }
            }, function(){
                $scope.productHistory = [];
            });
        };

        $scope.updateBidValue = function(type){
            if(type == null && $scope.bidValue){
                $scope.creditsInBag = $scope.userInfo.points - parseFloat($scope.bidValue);
                return true;
            }
            if($scope.bidValue >=  $scope.userInfo.points){
                alert("Max Credit reached!");
                return true;
            }
            if($scope.bidValue == 0 && !type){
                alert("Bidding value cannot be a Negative value!");
                return true;
            }
            if(type){
                $scope.bidValue = parseFloat($scope.bidValue) +1;
                $scope.creditsInBag = $scope.userInfo.points - parseFloat($scope.bidValue);
            }else if($scope.bidValue){
                $scope.bidValue = parseFloat($scope.bidValue) -1;
                $scope.creditsInBag = $scope.userInfo.points - parseFloat($scope.bidValue);
            }
        };


        $scope.addNewBid = function(){
            if($scope.bidValue && $scope.bidValue <= $scope.userInfo.points){
                var obj = {
                    "name": $scope.userInfo.name,
                    "value": $scope.bidValue,
                    "time": (new Date()).toISOString()
                };
                $scope.newBids.unshift(obj);
                $scope.productHistory.unshift(obj);
                if(parseFloat($scope.bidValue) > $scope.maxBidValue){
                    $scope.maxBidValue = $scope.bidValue;
                }
                $scope.bidValue = 0;
                //I can directly change the value in parent scope but to think for code extensible i wrote to call to parent and in parent i will call setCredits service.
                $scope.$parent.updateCredits($scope.creditsInBag);
                $scope.userInfo = landingSvc.getUserInfo();
            } else {
                alert("Invalid Bid value / Exceeded the credit!");
            }
        };

        $scope.getProductHistory($scope.product.field);
    }]);
})()