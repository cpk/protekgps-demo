/**
 * Created by admin on 10/12/2015.
 */
var protekgps = angular.module("protekgps", []);
protekgps.controller("RegisterAccountController", function($scope) {

    $scope.actionAccount ='new_account';

    $scope.changeRegisterTypeAccount =function(type){
        $scope.actionAccount = type;
    }

});