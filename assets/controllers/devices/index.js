/**
 * Created by Khoa on 09/10/2015.
 */
protekgps.controller("IndexDevicesController", function($scope) {
    //Create Devices popup Fade In
    $scope.createDevicesFadeIn = function(){
        $('#index-devices-popup').fadeOut();
        //Set device info
        $scope.$parent.devices.savedInstance = {
            id: "",
            serial: "",
            vin: "",
            group: "",
        };
        $('#create-devices-popup').fadeIn();
    }

    //Index Devices popup Fade Out
    $scope.indexDevicesFadeOut = function(){
        $('#index-devices-popup').fadeOut();
    }

    //Edit Devices popup Fade In
    $scope.editDevicesFadeIn = function(id){
      $('#index-devices-popup').fadeOut();
      //Get device info by id
      $scope.$parent.devices.updatedInstance = {
        id: "1",
        image: "truck_big.png",
        name: "Device Name 1",
        serial: "Device Serial 1",
        messageDateTime: "02/26/2015 08:16:31 AM",
        messageType: "Periodit Report",
        actived: "03/26/2015",
        subscription: "04/01/2015",
        location: "Losangeles",
        lat: 34.052,
        long: -118.243
      };
      $('#test-groups-popup').fadeOut();
      $('#edit-devices-popup').fadeIn();
      console.log($scope.$parent.devices.map)
      $scope.reziseMap($scope.$parent.devices.map)
      $scope.drawPoint($scope.$parent.devices.map, $scope.$parent.devices.updatedInstance);
    }
    //Page Click
    $scope.pageClick = function (page) {
        $scope.$parent.pageClick(page)
        //Getting list devices by current user with new page ex: ws.com/devices/list/page/number
        page = page - 1;
        var plus1 = page*10 + 1,plus2 = page*10 + 2,plus3 = page*10 + 3,plus4 = page*10 + 4,plus5 = page*10 + 5,plus6 = page*10 + 6,plus7 = page*10 + 7,plus8 = page*10 + 8,plus9 = page*10 + 9,plus10 = page*10 + 10;
        $scope.$parent.devices.listInstances = [
            { id: plus1, image: "bus_icon.png", name: "Device Name " + plus1, serial: "Device Serial " + plus1, messageDateTime: "02/26/2015 08:16:31 AM", location: "123 N Federal Hwy, Fort Lauderdale, Florida, United State, 33308", messageType: "Periodit Report"},
            { id: plus2, image: "car2_icon.png", name: "Device Name " + plus2, serial: "Device Serial " + plus2, messageDateTime: "02/26/2015 08:16:31 AM", location: "123 N Federal Hwy, Fort Lauderdale, Florida, United State, 33308", messageType: "Periodit Report"},
            { id: plus3, image: "car3_icon.png", name: "Device Name " + plus3, serial: "Device Serial " + plus3, messageDateTime: "02/26/2015 08:16:31 AM", location: "123 N Federal Hwy, Fort Lauderdale, Florida, United State, 33308", messageType: "Periodit Report"},
            { id: plus4, image: "car_icon.png", name: "Device Name " + plus4, serial: "Device Serial " + plus4, messageDateTime: "02/26/2015 08:16:31 AM", location: "123 N Federal Hwy, Fort Lauderdale, Florida, United State, 33308", messageType: "Periodit Report"},
            { id: plus5, image: "truck.png", name: "Device Name " + plus5, serial: "Device Serial " + plus5, messageDateTime: "02/26/2015 08:16:31 AM", location: "123 N Federal Hwy, Fort Lauderdale, Florida, United State, 33308", messageType: "Periodit Report"},
            { id: plus6, image: "car3_icon.png", name: "Device Name " + plus6, serial: "Device Serial " + plus6, messageDateTime: "02/26/2015 08:16:31 AM", location: "123 N Federal Hwy, Fort Lauderdale, Florida, United State, 33308", messageType: "Periodit Report"},
            { id: plus7, image: "car2_icon.png", name: "Device Name " + plus7, serial: "Device Serial " + plus7, messageDateTime: "02/26/2015 08:16:31 AM", location: "123 N Federal Hwy, Fort Lauderdale, Florida, United State, 33308", messageType: "Periodit Report"},
            { id: plus8, image: "car_icon.png", name: "Device Name " + plus8, serial: "Device Serial " + plus8, messageDateTime: "02/26/2015 08:16:31 AM", location: "123 N Federal Hwy, Fort Lauderdale, Florida, United State, 33308", messageType: "Periodit Report"},
            { id: plus9, image: "truck.png", name: "Device Name " + plus9, serial: "Device Serial " + plus9, messageDateTime: "02/26/2015 08:16:31 AM", location: "123 N Federal Hwy, Fort Lauderdale, Florida, United State, 33308", messageType: "Periodit Report"},
            { id: plus10, image: "bus_icon.png", name: "Device Name " +plus10, serial: "Device Serial " + plus10, messageDateTime: "02/26/2015 08:16:31 AM", location: "123 N Federal Hwy, Fort Lauderdale, Florida, United State, 33308", messageType: "Periodit Report"},
        ];
    }
    //Sort click
    $scope.sortClick = function (field) {
        $scope.$parent.sortClick(field)
        $scope.$parent.devices.listInstances = $scope.$parent.devices.listInstances.reverse()
    }
});
