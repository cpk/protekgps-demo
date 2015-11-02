/**
 * Created by Khoa on 09/10/2015.
 */
protekgps.controller("IndexAlertsController", function($scope, $timeout) {
    //Create Alerts popup Fade In
    $scope.createAlertsFadeIn = function(){
        $('#index-alerts-popup').fadeOut();
        //Set alert info
        $scope.$parent.listSelectedDevices = []
        $scope.$parent.alerts.savedInstance = {
            id: "",
            name: "",
            type: "18",
            geofence: "1",
            sendWhen: "1",
            slotNumber: "0",
            sends: [
                {id: "0", sendType: "0", send: "", version: ""}
            ],
            devices: $scope.$parent.listSelectedDevices,
            geofenceInstance: []
        };
        $('#create-alerts-popup').fadeIn();
    }
    //Edit Alerts popup Fade In
    $scope.editAlertsFadeIn = function(id){
        $('#index-alerts-popup').fadeOut();
        //Get alert info by id
        $scope.$parent.alerts.updatedInstance = {
            id: "1",
            name: "Alert Name",
            type: "1",
            geofence: "1",
            sendWhen: "1",
            slotNumber: "0",
            sends: [
                {id: "1", sendType: "0", send: "abc@yahoo.com", version: ""},
                {id: "2", sendType: "0", send: "abc@yahoo.com", version: ""},
                {id: "3", sendType: "1", send: "123123123", version: "1"},
            ],
            devices: ["1", "2"]
        };
        $scope.$parent.listSelectedDevices = $scope.$parent.alerts.updatedInstance.devices
        $('#edit-alerts-popup').fadeIn();
        $timeout(function(){
            $scope.$parent.reziseMap($scope.$parent.alerts.map)
            $scope.$parent.drawGeofence($scope.$parent.alerts.map, $scope.$parent.alerts.updatedInstance, $scope.$parent.selectGeofences);
        }, 100);
    }
    //Index Alerts popup Fade Out
    $scope.indexAlertsFadeOut = function(){
        $('#index-alerts-popup').fadeOut();
    }
    //
    $scope.alertIds = [];
    $scope.check = function(id, checked){
        var idx = $scope.alertIds.indexOf(id);
        if (idx >= 0 && !checked) {
            $scope.alertIds.splice(idx, 1);
            if($scope.alertIds.length < $scope.$parent.alerts.listInstances.length){
                $scope.master = '0'
                //alert($scope.master)
            }
        }
        if (idx < 0 && checked) {
            $scope.alertIds.push(id);
            if($scope.alertIds.length == $scope.$parent.alerts.listInstances.length){
                $scope.master = '1'
            }
        }
    }
    $scope.checkAllAlertIds = function(){
        if($scope.alertIds.length > 0){
            if($scope.alertIds.length == $scope.$parent.alerts.listInstances.length){
                $scope.alertIds = [];
            }else{
                $scope.alertIds = [];
                for(var index in $scope.$parent.alerts.listInstances){
                    alertInstance = $scope.$parent.alerts.listInstances[index];
                    $scope.alertIds.push(alertInstance.id);
                }
            }
        }else{
            for(var index in $scope.$parent.alerts.listInstances){
                alertInstance = $scope.$parent.alerts.listInstances[index];
                $scope.alertIds.push(alertInstance.id);
            }
        }
    }
    $scope.getAlertIds = function() {
        return $scope.alertIds;
    };
    //Page Click
    $scope.pageClick = function (page) {
        $scope.$parent.pageClick(page)
        //Getting list devices by current user with new page ex: ws.com/devices/list/page/number
        page = page - 1;
        var plus1 = page*10 + 1,plus2 = page*10 + 2,plus3 = page*10 + 3,plus4 = page*10 + 4,plus5 = page*10 + 5,plus6 = page*10 + 6,plus7 = page*10 + 7,plus8 = page*10 + 8,plus9 = page*10 + 9,plus10 = page*10 + 10;
        $scope.$parent.alerts.listInstances = [
            { id: plus1, name: "Alert Name "+plus1, type: "Device Type "+plus1, dateCreated: "02/26/201"+plus5, method: "Txt Msg, Email HTML", createBy: "Romy", device_group: "1 Device(s)"},
            { id: plus2, name: "Alert Name "+plus2, type: "Device Type "+plus2, dateCreated: "02/26/201"+plus5, method: "Txt Msg, Email HTML", createBy: "Romy", device_group: "1 Device(s)"},
            { id: plus3, name: "Alert Name "+plus3, type: "Device Type "+plus3, dateCreated: "02/26/201"+plus5, method: "Txt Msg, Email HTML", createBy: "Romy", device_group: "1 Device(s)"},
            { id: plus4, name: "Alert Name "+plus4, type: "Device Type "+plus4, dateCreated: "02/26/201"+plus5, method: "Txt Msg, Email HTML", createBy: "Romy", device_group: "1 Device(s)"},
            { id: plus5, name: "Alert Name "+plus5, type: "Device Type "+plus5, dateCreated: "02/26/201"+plus5, method: "Txt Msg, Email HTML", createBy: "Romy", device_group: "1 Device(s)"},
            { id: plus6, name: "Alert Name "+plus6, type: "Device Type "+plus6, dateCreated: "02/26/201"+plus5, method: "Txt Msg, Email HTML", createBy: "Romy", device_group: "1 Device(s)"},
            { id: plus7, name: "Alert Name "+plus7, type: "Device Type "+plus7, dateCreated: "02/26/201"+plus5, method: "Txt Msg, Email HTML", createBy: "Romy", device_group: "1 Device(s)"},
            { id: plus8, name: "Alert Name "+plus8, type: "Device Type "+plus8, dateCreated: "02/26/201"+plus5, method: "Txt Msg, Email HTML", createBy: "Romy", device_group: "1 Device(s)"},
            { id: plus9, name: "Alert Name "+plus9, type: "Device Type "+plus9, dateCreated: "02/26/201"+plus5, method: "Txt Msg, Email HTML", createBy: "Romy", device_group: "1 Device(s)"},
            { id: plus10, name: "Alert Name "+plus10, type: "Device Type "+plus10, dateCreated: "02/26/201"+plus5, method: "Txt Msg, Email HTML", createBy: "Romy", device_group: "1 Device(s)"},
        ];
    }
    //Sort click
    $scope.sortClick = function (field) {
        $scope.$parent.sortClick(field)
        $scope.$parent.alerts.listInstances = $scope.$parent.alerts.listInstances.reverse()
    }
});
