/**
 * Copyright © 2016
 *
 * Created by vinay.adepu.
 * Description:
 *
 */
(function () {
    'use strict';

    angular.module('landing',[])
        .service('landingSvc', [function () {
            this.userInfo = {img:"avatar", name:"Vinay", points:245};
            this.getUserInfo = function(){
                return this.userInfo;
            };

            this.setCredits = function(val){
                this.userInfo.points = val;
            };
        }]);
})();