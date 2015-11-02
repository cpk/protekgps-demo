/**
 * Created by Khoa on 29/09/2015.
 */

protekgps.controller("ShowGeofencesController", function($scope, $timeout) {
  //init map
  $scope.$parent.initMap('map-canvas-show-geofence', $scope.$parent.mapColection.showGeofences);


  $scope.mouseEnterGeofence =function(id){
    for (var index in $scope.$parent.geofences.showInstance.list){
      var geofence = $scope.$parent.geofences.showInstance.list[index]
      //console.log('geofence.id: ' + geofence.id + ' - id: ' + id + ' - compare: ' + (geofence.id == id).toString())
      if(geofence.id == id){
        for (var index in $scope.$parent.listDrawedGeofence) {
          shape = $scope.$parent.listDrawedGeofence[index]
          if(shape.id == id){
            $scope.$parent.listDrawedGeofence[index].shape.setOptions( { fillColor: '#FF0000' });
            $scope.$parent.setCenter($scope.$parent.mapColection.showGeofences.map, geofence)
            return
          }
        }
      }
    }
  }
  $scope.mouseLeaveGeofence =function(id){
    for (var index in $scope.$parent.geofences.showInstance.list){
      var geofence = $scope.$parent.geofences.showInstance.list[index]
      if(geofence.id == id){
        for (var index in $scope.$parent.listDrawedGeofence) {
          shape = $scope.$parent.listDrawedGeofence[index]
          if(shape.id == id){
            $scope.$parent.listDrawedGeofence[index].shape.setOptions( { fillColor: '#3399FF' });
            $scope.$parent.setCenter($scope.$parent.mapColection.showGeofences.map, geofence)
            return
          }
        }
      }
    }
  }
  //Create Geofences popup Fade Out
  $scope.showGeofencesFadeOut = function(){
    $('#show-geofences-popup').fadeOut();
  }
});
