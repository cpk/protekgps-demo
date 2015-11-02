/**
 * Created by Khoa on 09/10/2015.
 */
protekgps.controller("IndexGeofencesController", function($scope, $timeout) {
  $scope.labels = [];
      //Show Devices popup Fade In
      $scope.showGeofencesFadeIn = function(id){
        $('#index-geofences-popup').fadeOut();
        $scope.$parent.geofences.showInstance.list= []
        if(id != null && id >0){
          for(var index =0; index <id; index++){
            var round = index + 50;
            if(index==0){
              $scope.$parent.geofences.showInstance.list.push({id: index, shape: "1", address: "address " +index, name: "Name" +index, hashpoit: [{lat: 25.774, lng: -80.190},{lat: 18.466, lng: -66.118}, {lat: 32.321, lng: -64.757}]})
            }else{
              $scope.$parent.geofences.showInstance.list.push({id: index, shape: "2", address: "address " +index,name: "Name" +index, center: {lat: 34.052, lng: -118.243+index*5}, radius: Math.sqrt(3857799) * 100})
            }

          }
          //$scope.$parent.geofences.showInstance.list = [
          //  {id: "1", shape: "1", name: "Bermuda Triangle", hashpoit: [{lat: 25.774, lng: -80.190},{lat: 18.466, lng: -66.118}, {lat: 32.321, lng: -64.757}]},
          //  {id: "2", shape: "2", name: "Losangeles", center: {lat: 34.052, lng: -118.243}, radius: Math.sqrt(3857799) * 100},
          //]
        }


        $timeout(function(){
          for (var i = 0; i < $scope.labels.length; i++) {
            $scope.labels[i].setMap(null);
          }
          $scope.labels = []
          for(var index in $scope.$parent.listDrawedGeofence){
            var drawGeofence = $scope.$parent.listDrawedGeofence[index]
            drawGeofence.shape.setMap(null)
          }
          $scope.$parent.listDrawedGeofence = []
          for(var index in $scope.$parent.geofences.showInstance.list){
            var geofence = $scope.$parent.geofences.showInstance.list[index]
            var shape
            var bounds
            var center = {}
            var mapLabel = null
            switch (geofence.shape) {
              case $scope.$parent.geofenceTypes.POLYGON:
                bounds = new google.maps.LatLngBounds();
                center.lat = geofence.hashpoit[0].lat
                center.lng = geofence.hashpoit[0].lng
                for(var j =0; j< geofence.hashpoit.length; j++) {
                  bounds.extend(new google.maps.LatLng(geofence.hashpoit[j].lat, geofence.hashpoit[j].lng));
                }
                shape = $scope.$parent.drawPolygon($scope.$parent.mapColection.showGeofences.map, geofence.hashpoit)
                mapLabel = new MapLabel({
                  text: geofence.name,
                  position: bounds.getCenter(),
                  map: $scope.$parent.mapColection.showGeofences.map
                });
                break;
              case $scope.$parent.geofenceTypes.CIRCLE:
                center.lat = geofence.center.lat
                center.lng = geofence.center.lng
                shape = $scope.$parent.drawCircle($scope.$parent.mapColection.showGeofences.map, geofence.center, geofence.radius)
                bounds = shape.getBounds();
                mapLabel = new MapLabel({
                  text: geofence.name,
                  position: bounds.getCenter(),
                  map: $scope.$parent.mapColection.showGeofences.map
                });
                break;
            }

            if (mapLabel != null) $scope.labels.push(mapLabel);

            $scope.$parent.listDrawedGeofence.push({
              id: geofence.id,
              shape: shape
            })

          }
          $scope.$parent.reziseMap($scope.$parent.mapColection.showGeofences.map)
          $scope.$parent.setCenter($scope.$parent.mapColection.showGeofences.map, $scope.$parent.geofences.showInstance.list[0])
        }, 100);
        $('#show-geofences-popup').fadeIn();

      }
    //Create Devices popup Fade In
    $scope.createGeofencesFadeIn = function(){
        $('#index-geofences-popup').fadeOut();
        //Set geofence info
        $scope.$parent.listSelectedDevices = []
        $scope.$parent.listDrawedGeofence = []
        $scope.$parent.geofences.savedInstance = {
            id: "",
            deviceName: "",
            name: "",
            location: "",
            type: "0",
            sendType: "0",
            send: "0",
            devices: $scope.$parent.listSelectedDevices
        };
        $('#create-geofences-popup').fadeIn();
        $scope.$parent.reziseMap($scope.$parent.geofences.map)
    }
    //Index Devices popup Fade Out
    $scope.indexGeofencesFadeOut = function(){
        $('#index-geofences-popup').fadeOut();
    }
    //Page Click
    $scope.pageClick = function (page) {
        $scope.$parent.pageClick(page)
        //Getting list devices by current user with new page ex: ws.com/devices/list/page/number
        page = page - 1;
        var plus1 = page*10 + 1,plus2 = page*10 + 2,plus3 = page*10 + 3,plus4 = page*10 + 4,plus5 = page*10 + 5,plus6 = page*10 + 6,plus7 = page*10 + 7,plus8 = page*10 + 8,plus9 = page*10 + 9,plus10 = page*10 + 10;
        $scope.$parent.geofences.listInstances = [
            { id: plus1, image: "bus_icon.png", deviceName: "Device Name "+plus1, serial: "12345678"+plus9},
            { id: plus2, image: "car_icon.png", deviceName: "Device Name "+plus2, serial: "12345678"+plus9},
            { id: plus3, image: "car2_icon.png", deviceName: "Device Name "+plus3, serial: "12345678"+plus9},
            { id: plus4, image: "bus_icon.png", deviceName: "Device Name "+plus4, serial: "12345678"+plus9},
            { id: plus5, image: "car_icon.png", deviceName: "Device Name "+plus5, serial: "12345678"+plus9},
            { id: plus6, image: "car2_icon.png", deviceName: "Device Name "+plus6, serial: "12345678"+plus9},
            { id: plus7, image: "bus_icon.png", deviceName: "Device Name "+plus7, serial: "12345678"+plus9},
            { id: plus8, image: "car_icon.png", deviceName: "Device Name "+plus8, serial: "12345678"+plus9},
            { id: plus9, image: "car2_icon.png", deviceName: "Device Name "+plus9, serial: "12345678"+plus9},
            { id: plus10, image: "bus_icon.png", deviceName: "Device Name "+plus10, serial: "12345678"+plus9},
        ];
    }
    //Sort click
    $scope.sortClick = function (field) {
        $scope.$parent.sortClick(field)
        $scope.$parent.geofences.listInstances = $scope.$parent.geofences.listInstances.reverse()
    }
});
