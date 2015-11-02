/**
 * Created by Khoa on 29/09/2015.
 */
protekgps.controller("EditDevicesController", function($scope) {
    //Edit Devices popup Fade Out
    $scope.editDevicesFadeOut = function(){
        $('#edit-devices-popup').fadeOut();
    }
    //Update Devices popup Fade Out
    $scope.updateDevices = function(id){
        alert('Update Device with '+id+' Success!');
        $('#update-alerts-popup').fadeOut();
    }
    //init map
    setTimeout(function () {
      $scope.$parent.initMap('map-canvas-edit-devices', $scope.$parent.devices)
      console.log($scope.$parent.devices.map)
    }, 0);
});
