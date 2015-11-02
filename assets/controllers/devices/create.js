/**
 * Created by Khoa on 09/10/2015.
 */
protekgps.controller("CreateDevicesController", function($scope) {
    //Create Devices popup Fade Out
    $scope.createDevicesFadeOut = function(){
        $('#create-devices-popup').fadeOut();
    }
    //Save Devices popup Fade Out
    $scope.saveDevices = function(){
        alert('Create Device Success!');
        $('#create-devices-popup').fadeOut();
    }
});