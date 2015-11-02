/**
 * Created by Khoa on 29/09/2015.
 */

protekgps.controller("CreateGeofencesController", function($scope) {
    function initializeCreateGeofences() {
        var mapCanvas = document.getElementById('map-canvas-create-geofence');
        var mapOptions = {
            center: {lat: -34.397, lng: 150.644},
            zoom: 8
        }
        $scope.$parent.geofences.map = new google.maps.Map(mapCanvas, mapOptions);
        $scope.$parent.geofences.drawingCreateGeofencesManager = new google.maps.drawing.DrawingManager({
            drawingMode: google.maps.drawing.OverlayType.MARKER,
            drawingControl: true,
            drawingControlOptions: {
                position: google.maps.ControlPosition.TOP_CENTER,
                drawingModes: [
                    google.maps.drawing.OverlayType.CIRCLE,
                    google.maps.drawing.OverlayType.POLYGON,
                    google.maps.drawing.OverlayType.RECTANGLE
                ]
            },
            circleOptions: {
                strokeColor: '#FF0000',
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: '#FF0000',
                fillOpacity: 0.35,
                clickable: false,
                editable: true,
                zIndex: 1
            },
            polygonOptions: {
                strokeColor: '#FF0000',
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: '#FF0000',
                fillOpacity: 0.35,
                clickable: false,
                editable: true,
                zIndex: 1
            },
            rectangleOptions: {
                strokeColor: '#FF0000',
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: '#FF0000',
                fillOpacity: 0.35,
                clickable: false,
                editable: true,
                zIndex: 1
            }
        });
        $scope.$parent.geofences.drawingCreateGeofencesManager.setMap($scope.$parent.geofences.map);
        google.maps.event.addListener($scope.$parent.geofences.drawingCreateGeofencesManager, 'circlecomplete', onCircleComplete);
        google.maps.event.addListener($scope.$parent.geofences.drawingCreateGeofencesManager, 'polygoncomplete', onPolygonComplete);
        google.maps.event.addListener($scope.$parent.geofences.drawingCreateGeofencesManager, 'rectanglecomplete', onRectangleComplete);
    }


    function onCircleComplete(shape) {
        if (shape == null || (!(shape instanceof google.maps.Circle))) return;

        //listDrawedGeofence.push({shape: '2', radius: circle.getRadius(), center: {lat: circle.getCenter().lat(), lng: circle.getCenter().lng()}});
        $scope.$parent.listDrawedGeofence.push(shape);
    }
    function onPolygonComplete(shape) {
        if (shape == null || (!(shape instanceof google.maps.Polygon))) return;

        //listDrawedGeofence.push({shape: '1', pointhash: polygon.getPath().getArray()});
        $scope.$parent.listDrawedGeofence.push(shape);
    }
    function onRectangleComplete(shape) {
        if (shape == null || (!(shape instanceof google.maps.Rectangle))) return;

        //listDrawedGeofence.push({shape: '3', bounds: rectangle.getBounds() });
        $scope.$parent.listDrawedGeofence.push(shape);
    }
    google.maps.event.addDomListener(window, 'load', initializeCreateGeofences);
    //Create Geofences popup Fade Out
    $scope.createGeofencesFadeOut = function(){
        $('#create-geofences-popup').fadeOut();
    }
    //Save Geofences popup Fade Out
    $scope.saveGeofences = function(){
        alert('Create Geofence Success!');
        $('#create-geofences-popup').fadeOut();
    }
    //Delete All Geofences
    $scope.deleteAllGeofences = function(){
        for(var index in $scope.$parent.listDrawedGeofence){
            $scope.$parent.listDrawedGeofence[index].setMap(null);
        }
        $scope.$parent.listDrawedGeofence = []
    }
});