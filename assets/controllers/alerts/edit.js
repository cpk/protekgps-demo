/**
 * Created by Khoa on 29/09/2015.
 */
protekgps.controller("EditAlertsController", function($scope, $timeout) {
    //init map
    $scope.$parent.initMap('map-canvas-edit-alerts', $scope.$parent.alerts)
    //Edit Alerts popup Fade Out
    $scope.editAlertsFadeOut = function(){
        $('#edit-alerts-popup').fadeOut();
    }
    //Add new send template
    $scope.add =  function(){
        $scope.$parent.alerts.updatedInstance.sends.push({id: "1", sendType: "0", send: "", version: ""})
    }
    //Delete send template by index
    $scope.delete =  function(index){
        if($scope.$parent.alerts.updatedInstance.sends.length > 1)
            $scope.$parent.alerts.updatedInstance.sends.splice(index, 1)
    }
    //Save Devices popup Fade Out
    $scope.updateAlerts = function(){
        alert('Update Alert Success!');
        $('#edit-alerts-popup').fadeOut();
    }
    $scope.alertTypesChange = function(){
        //If type == Geofence -> show map
        if($scope.$parent.alerts.updatedInstance.type == 1){
            $timeout(function(){
                $scope.$parent.reziseMap($scope.$parent.alerts.map)
                $scope.$parent.drawGeofence($scope.$parent.alerts.map, $scope.$parent.alerts.updatedInstance, $scope.$parent.selectGeofences);
            }, 100);
        }
    }
    $scope.drawGeofenceChange = function(){
        $scope.$parent.drawGeofence($scope.$parent.alerts.map, $scope.$parent.alerts.updatedInstance, $scope.$parent.selectGeofences);
    }
});
