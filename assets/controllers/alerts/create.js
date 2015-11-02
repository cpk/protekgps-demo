/**
 * Created by Khoa on 29/09/2015.
 */
protekgps.controller("CreateAlertsController", function($scope, $timeout) {
    //init map
    $scope.$parent.initMap('map-canvas-create-alerts', $scope.$parent)
    //$('#create-alerts-map').hide();
    //Create Alerts popup Fade Out
    $scope.createAlertsFadeOut = function(){
        $('#create-alerts-popup').fadeOut();
    }
    //Add new send template
    $scope.add =  function(){
        $scope.$parent.alerts.savedInstance.sends.push({id: "1", sendType: "0", send: "", version: ""})
    }
    //Delete send template by index
    $scope.delete =  function(index){
        if($scope.$parent.alerts.savedInstance.sends.length > 1)
            $scope.$parent.alerts.savedInstance.sends.splice(index, 1)
    }
    //Save Devices popup Fade Out
    $scope.saveAlerts = function(){
        alert('Create Alert Success!');
        $('#create-alerts-popup').fadeOut();
    }
    $scope.alertTypesChange = function(){
        //If type == Geofence -> show map
        if($scope.$parent.alerts.savedInstance.type == 1){
            //$('#create-alerts-map').show();
            $timeout(function(){
                $scope.$parent.reziseMap($scope.$parent.map)
                $scope.$parent.drawGeofence($scope.$parent.map, $scope.$parent.alerts.savedInstance, $scope.$parent.selectGeofences);
            }, 100);
        }
    }
    $scope.drawGeofenceChange = function(){
        $scope.$parent.drawGeofence($scope.$parent.map, $scope.$parent.alerts.savedInstance, $scope.$parent.selectGeofences);
    }
});
