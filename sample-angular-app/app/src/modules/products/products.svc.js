/**
 * Copyright © 2016
 *
 * Created by vinay.adepu.
 * Description:
 *
 */
(function () {
    'use strict';

    angular.module('products')
        .service('productsSvc', ['$http', function ($http) {
            this.getProductsList = function(){
                return $http.get("src/fixtures/products.json");
            };

            this.getProductHistory = function(){
                return $http.get("src/fixtures/productHistory.json");
            };

            this.getTimeDifference = function(date1){
                var today = new Date();
                var expiryOn = new Date(date1);
                var diffMs = (expiryOn - today);
                var diffDays = Math.round(diffMs / 86400000); // days
                var diffHrs = Math.round((diffMs % 86400000) / 3600000); // hours
                var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); // minutes
                return diffDays + " days " + diffHrs + " hours " + diffMins +" minutes";
            };
        }]);
})();