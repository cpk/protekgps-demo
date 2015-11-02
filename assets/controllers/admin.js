/**
 * Created by Khoa on 09/10/2015.
 */
protekgps.controller("AdminController", function($scope) {
    //Admin popup Fade Out
    $scope.adminFadeOut = function(){
        $('#admin-popup').fadeOut();
    }
    //Index Devices popup Fade In
    $scope.indexDevicesFadeIn = function(){
        $('#admin-popup').fadeOut();
        $scope.$parent.setDefault()
        //Getting list devices by current user
        $scope.$parent.devices.listInstances = [
            { id: "1", image: "bus_icon.png", name: "Device Name 1", serial: "Device Serial 1", messageDateTime: "02/26/2015 08:16:31 AM", location: "123 N Federal Hwy, Fort Lauderdale, Florida, United State, 33308", messageType: "Periodit Report"},
            { id: "2", image: "car2_icon.png", name: "Device Name 2", serial: "Device Serial 2", messageDateTime: "02/26/2015 08:16:31 AM", location: "123 N Federal Hwy, Fort Lauderdale, Florida, United State, 33308", messageType: "Periodit Report"},
            { id: "3", image: "car3_icon.png", name: "Device Name 3", serial: "Device Serial 3", messageDateTime: "02/26/2015 08:16:31 AM", location: "123 N Federal Hwy, Fort Lauderdale, Florida, United State, 33308", messageType: "Periodit Report"},
            { id: "4", image: "car_icon.png", name: "Device Name 4", serial: "Device Serial 4", messageDateTime: "02/26/2015 08:16:31 AM", location: "123 N Federal Hwy, Fort Lauderdale, Florida, United State, 33308", messageType: "Periodit Report"},
            { id: "5", image: "truck.png", name: "Device Name 5", serial: "Device Serial 5", messageDateTime: "02/26/2015 08:16:31 AM", location: "123 N Federal Hwy, Fort Lauderdale, Florida, United State, 33308", messageType: "Periodit Report"},
            { id: "6", image: "car3_icon.png", name: "Device Name 6", serial: "Device Serial 6", messageDateTime: "02/26/2015 08:16:31 AM", location: "123 N Federal Hwy, Fort Lauderdale, Florida, United State, 33308", messageType: "Periodit Report"},
            { id: "7", image: "car2_icon.png", name: "Device Name 7", serial: "Device Serial 7", messageDateTime: "02/26/2015 08:16:31 AM", location: "123 N Federal Hwy, Fort Lauderdale, Florida, United State, 33308", messageType: "Periodit Report"},
            { id: "8", image: "car_icon.png", name: "Device Name 8", serial: "Device Serial 8", messageDateTime: "02/26/2015 08:16:31 AM", location: "123 N Federal Hwy, Fort Lauderdale, Florida, United State, 33308", messageType: "Periodit Report"},
            { id: "9", image: "truck.png", name: "Device Name 9", serial: "Device Serial 9", messageDateTime: "02/26/2015 08:16:31 AM", location: "123 N Federal Hwy, Fort Lauderdale, Florida, United State, 33308", messageType: "Periodit Report"},
            { id: "10", image: "bus_icon.png", name: "Device Name 10", serial: "Device Serial 10", messageDateTime: "02/26/2015 08:16:31 AM", location: "123 N Federal Hwy, Fort Lauderdale, Florida, United State, 33308", messageType: "Periodit Report"},
        ];
        $('#index-devices-popup').fadeIn();
    }
    //Index Alerts popup Fade In
    $scope.indexAlertsFadeIn = function(){
        $('#admin-popup').fadeOut();
        $scope.$parent.setDefault()
        //Getting list alerts by current user
        $scope.$parent.alerts.listInstances = [
            { id: "1", name: "Alert Name 1", type: "Device Type 1", dateCreated: "02/26/2015", method: "Txt Msg, Email HTML", createBy: "Romy", device_group: "1 Device(s)"},
            { id: "2", name: "Alert Name 2", type: "Device Type 2", dateCreated: "02/26/2015", method: "Txt Msg, Email HTML", createBy: "Romy", device_group: "1 Device(s)"},
            { id: "3", name: "Alert Name 3", type: "Device Type 3", dateCreated: "02/26/2015", method: "Txt Msg, Email HTML", createBy: "Romy", device_group: "1 Device(s)"},
            { id: "4", name: "Alert Name 4", type: "Device Type 4", dateCreated: "02/26/2015", method: "Txt Msg, Email HTML", createBy: "Romy", device_group: "1 Device(s)"},
            { id: "5", name: "Alert Name 5", type: "Device Type 5", dateCreated: "02/26/2015", method: "Txt Msg, Email HTML", createBy: "Romy", device_group: "1 Device(s)"},
            { id: "6", name: "Alert Name 6", type: "Device Type 6", dateCreated: "02/26/2015", method: "Txt Msg, Email HTML", createBy: "Romy", device_group: "1 Device(s)"},
            { id: "7", name: "Alert Name 7", type: "Device Type 7", dateCreated: "02/26/2015", method: "Txt Msg, Email HTML", createBy: "Romy", device_group: "1 Device(s)"},
            { id: "8", name: "Alert Name 8", type: "Device Type 8", dateCreated: "02/26/2015", method: "Txt Msg, Email HTML", createBy: "Romy", device_group: "1 Device(s)"},
            { id: "9", name: "Alert Name 9", type: "Device Type 9", dateCreated: "02/26/2015", method: "Txt Msg, Email HTML", createBy: "Romy", device_group: "1 Device(s)"},
            { id: "10", name: "Alert Name 10", type: "Device Type 10", dateCreated: "02/26/2015", method: "Txt Msg, Email HTML", createBy: "Romy", device_group: "1 Device(s)"},
        ];
        $('#index-alerts-popup').fadeIn();
    }
    //Index Renewals popup Fade In
    $scope.indexRenewalsFadeIn = function(){
        $scope.$parent.setDefault()
        $scope.$parent.renewals.listInstance = [{"id":"1","name":"1234567890921","serial_number":"1234567890921","date_activated":"03/26/2015","device_expiration":"04/01/2015","last_renewal":"","renewal_period":"1","amount":146,"renewing":"12"},{"id":"2","name":"1234567890922","serial_number":"1234567890922","date_activated":"03/26/2015","device_expiration":"04/01/2015","last_renewal":"","renewal_period":"2","amount":146,"renewing":"12"},{"id":"3","name":"1234567890923","serial_number":"1234567890923","date_activated":"03/26/2015","device_expiration":"04/01/2015","last_renewal":"","renewal_period":"3","amount":146,"renewing":"24"}];
        $('#admin-popup').fadeOut();
        $('#renewal-popup').fadeIn();
    }
    //Index Users  popup Fade In
    $scope.indexUsersFadeIn = function(){
        $scope.$parent.setDefault();
        $scope.$parent.users.listInstance =[]
        //Getting list users by current user
        var page = $scope.$parent.page.current;
        for(var index =((page-1)*$scope.$parent.page.number +1); index <=(page*$scope.$parent.page.number);index++){
            var item = {"id": index,"firstName":"Romy " + index,"lastName":"Torres " + index,"address":"","contractPhone":"1234567890","email":"romytorres@gmail.com","company":"RTPM","dateOfBirth":"","country":"USA","streetAddress":"streetAddress","city":"city","state":"al","zipCode":"70000","defaultMap":"","timeZone":"","daylightSaving":"","userRole":"","unitSystem":"","group":"","userName":"","password":"","timeOfDayFormat":"","permission":[1,0,0,0,0,0,0,0]};
            $scope.$parent.users.listInstance.push(item);
        }

        $('#admin-popup').fadeOut();
        $('#users-popup').fadeIn();
    }
    //Index Groups  popup Fade In
    $scope.indexGroupsFadeIn = function(){
        $scope.$parent.setDefault();
        $scope.$parent.groups.listInstance =[]
        //Getting list Groups by current user
        var page = $scope.$parent.page.current;
        for(var index =((page-1)*$scope.$parent.page.number +1); index <=(page*$scope.$parent.page.number);index++){
            var item = {"id": index,"name":"Torres " +index,"company:":"","contactName":""};
            $scope.$parent.groups.listInstance.push(item);
        }

        $('#admin-popup').fadeOut();
        $('#groups-popup').fadeIn();
    }
    //Index Geofences  popup Fade In
    $scope.indexGeofencesFadeIn = function(){
        $('#admin-popup').fadeOut();
        $scope.$parent.setDefault()
        //Getting list alerts by current user
        $scope.$parent.geofences.listInstances = [
            { id: "1", image: "bus_icon.png", deviceName: "Device Name 1", serial: "123456789"},
            { id: "2", image: "car_icon.png", deviceName: "Device Name 2", serial: "123456789"},
            { id: "3", image: "car2_icon.png", deviceName: "Device Name 3", serial: "123456789"},
            { id: "4", image: "bus_icon.png", deviceName: "Device Name 4", serial: "123456789"},
            { id: "5", image: "car_icon.png", deviceName: "Device Name 5", serial: "123456789"},
            { id: "6", image: "car2_icon.png", deviceName: "Device Name 6", serial: "123456789"},
            { id: "7", image: "bus_icon.png", deviceName: "Device Name 7", serial: "123456789"},
            { id: "8", image: "car_icon.png", deviceName: "Device Name 8", serial: "123456789"},
            { id: "9", image: "car2_icon.png", deviceName: "Device Name 9", serial: "123456789"},
            { id: "10", image: "bus_icon.png", deviceName: "Device Name 10", serial: "123456789"},
        ];
        $('#index-geofences-popup').fadeIn();
    }

});