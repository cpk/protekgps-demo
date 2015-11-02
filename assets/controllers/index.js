/**
 * Created by Khoa on 09/10/2015.
 */
var protekgps = angular.module("protekgps", []);
window.onresize = function() {
  var vph = $(window).height()-153;
  $('#map-canvas-index').css({'height': vph + 'px'});
  $('#quick-report').css({'height': vph + 'px'});
  $('.quick-report-contain').css({'height': (vph-49) + 'px'});
  $('.tab').css({'height': (vph-150) + 'px'});
  $('.tab').css({'min-height': (vph-150) + 'px'});

  var vpw = $(window).width();
  if(!$('#quick-report').is(":visible")) {
    $('#map-canvas-index').css({'width': vpw + 'px'});
  }
  else{
    $('#map-canvas-index').css({'width': vpw/2 + 'px'});
    $('#quick-report').css({'width': vpw/2 + 'px'});
  }
  $('.hidden').css({'height': $(window).height() - 70 + 'px', 'width': $(window).width() + 'px', 'padding-top': 70 + 'px'});
}
document.addEventListener("DOMContentLoaded", window.onresize, false);
protekgps.controller("MainController", ['$scope', '$sce', '$compile', '$timeout', function($scope, $sce, $compile, $timeout) {
    $scope.mapColection = {};
    $scope.mapColection.showGeofences = {}
    $scope.sortType = {asc: $sce.trustAsHtml("&uarr;"), dsc: $sce.trustAsHtml("&darr;")};
    $scope.sortDefault = {
        type: $scope.sortType.asc,
        field: ""
    }
    $scope.pageDefault = {
        total: 99,
        current: 1,
        number: 10,
        max: 2,
    }
    $scope.setDefault = function(){
        $scope.sort = {
            type: $scope.sortType.asc,
            field: ""
        }
        $scope.page = {
            total: 99,
            current: 1,
            number: 10,
            max: 2,
        }
    }
    $scope.setDefault()
    $scope.range = function(min, max, step){
        step = step || 1;
        var input = [];
        var opposite = false
        if(min > max) {
            var tmp = min
            min = max
            max = tmp
            opposite = true
        }
        if(min < 1) min = 1
        if(max > $scope.page.total) max = $scope.page.total
        if(opposite){
            for (var i = max; i >= min; i -= step) input.push(i);
        }else{
            for (var i = min; i <= max; i += step) input.push(i);
        }

        return input;
    };
    $scope.pageClick = function (page) {
        $scope.page.current = page;
    }
    $scope.sortClick = function (field) {
        if($scope.sort.field != field){
            $scope.sort.field = field;
            $scope.sort.type = $scope.sortType.asc
        }else{
            if($scope.sort.type == $scope.sortType.asc){
                $scope.sort.type = $scope.sortType.dsc
            }else{
                $scope.sort.type = $scope.sortType.asc
            }
        }
    }

    $scope.renewals ={};
    $scope.renewals.historySearch="";
    $scope.renewals.listInstance=[];
    $scope.renewals.listHistoryInstance=[];
    $scope.renewals.listSummaryInstance=[];
    $scope.groups = {};
    $scope.groups.listInstance=[];
    $scope.groups.instance={};
    $scope.groups.testListInstance=[];
    $scope.users = {};
    $scope.users.listInstance=[];
    $scope.users.instance=[];

    $scope.selectCountrys = [
        { id: "USA", name: 'USA' },
        { id: "VN", name: 'VN' },
        { id: "ENG", name: 'ENG' }
    ];
    $scope.selectStates = [
        { id: "alabama", name: 'alabama' },
        { id: "texas", name: 'texas' },
        { id: "florida", name: 'florida' }
    ];
    $scope.selectDataYear = [
        { id: "1", name: '1 year' },
        { id: "2", name: '2 year' },
        { id: "3", name: '3 year' }
    ];
    $scope.selectDataNumbers = [
        { id: "10", name: '10' },
        { id: "20", name: '20' },
        { id: "30", name: '30' }
    ];
    $scope.selectDevices = [
        { id: "", name: 'Show All' },
        { id: "12", name: 'Devices Renewing in 12hrs' },
        { id: "24", name: 'Devices Renewing in 24hrs' }
    ];
    $scope.selectDataAccounts = [
        { id: "Main accounts", name: 'Main accounts' }
    ];


    //back Admin popup Fade In
    $scope.backAdminFadeIn = function(){
        $('.hidden').each(function(){
            if($(this).attr('id') != 'admin-popup'){
                $(this).fadeOut();
            }
        });
        $('#admin-popup').fadeIn();
    }

    //Back Index Devices popup Fade In
    $scope.backIndexDevicesFadeIn = function(){
        $('#create-devices-popup').fadeOut();
        $('#edit-devices-popup').fadeOut();
        $('#index-devices-popup').fadeIn();
    }


    //Back Index Alerts popup Fade In
    $scope.backIndexAlertsFadeIn = function(){
        $('#create-alerts-popup').fadeOut();
        $('#edit-alerts-popup').fadeOut();
        $('#index-alerts-popup').fadeIn();
    }

    //Back Index Renewals popup Fade In
    $scope.backIndexRenewalsFadeIn = function(){
        $('#renewal-history-popup').fadeOut();
        $('#renewal-summary-popup').fadeOut();
        $('#renewal-popup').fadeIn();;
    }

    //Back Index Users  popup Fade In
    $scope.backIndexUsersFadeIn = function(){
        $('#edit-users-popup').fadeOut();
        $('#add-users-popup').fadeOut();
        $('#users-popup').fadeIn();
    }
    //Back Index Groups  popup Fade In
    $scope.backIndexGroupsFadeIn = function(){
        $('#test-groups-popup').fadeOut();
        $('#add-groups-popup').fadeOut();
        $('#edit-groups-popup').fadeOut();
        $('#groups-popup').fadeIn();
    }
    //Back Index Geofences  popup Fade In
    $scope.backIndexGeofencesFadeIn = function(){
        $('#create-geofences-popup').fadeOut();
        $('#show-geofences-popup').fadeOut();
        $('#index-geofences-popup').fadeIn();
    }
    //Back Index Geofences  popup Fade In
    $scope.listDevicesFadeOut = function(){
        $('#list-devices-popup').fadeOut();
    }
    //List Device popup Fade In
    $scope.listDevicesFadeIn = function(){
        $('#list-devices-popup').fadeIn();
    }
    //
    $scope.devices = {}
    $scope.devices.listInstances = []
    $scope.devices.savedInstance = {}
    $scope.devices.updatedInstance = {}
    $scope.devices.map = {}
    $scope.alerts = {}
    $scope.alerts.listInstances = []
    $scope.alerts.savedInstance = {}
    $scope.alerts.updatedInstance = {}
    $scope.alerts.map = {}
    $scope.geofences = {}
    $scope.geofences.listInstances = []
    $scope.geofences.savedInstance = {}
    $scope.geofences.showInstance = {}
    $scope.selectSendTypes = [
        {id: "0", name: "Email"},
        {id: "1", name: "SMS"}
    ]
    $scope.selectVersion = [
        {id: "1", value: "alltelmessage.com", name: "Alltel"},
        {id: "2", value: "txt.att.net", name: "AT&amp;T"},
        {id: "3", value: "myboostmobile.com", name: "Boost"},
        {id: "4", value: "cspire1.com", name: "C Spire"},
        {id: "5", value: "cellularone.txtmsg.com", name: "Cellular One"},
        {id: "6", value: "cingularme.com", name: "Cingular"},
        {id: "7", value: "iclaro.com.co", name: "Claro (Colombia)"},
        {id: "8", value: "comcastpcs.textmsg.com", name: "Comcast"},
        {id: "9", value: "sms.mycricket.com", name: "Cricket"},
        {id: "10", value: "mymetropcs.com", name: "Metro PCS"},
        {id: "11", value: "correo.movistar.net", name: "Movistar"},
        {id: "12", value: "movistar.com.co", name: "Movistar (Colombia)"},
        {id: "13", value: "msgnextel.com.mx", name: "Nextel"},
        {id: "14", value: "pcs.ntelos.com", name: "Ntelos"},
        {id: "15", value: "msg.pioneerenidcellular.com", name: "Pioneer"},
        {id: "16", value: "pcs.rogers.com", name: "Rogers"},
        {id: "17", value: "messaging.sprintpcs.com", name: "Sprint"},
        {id: "18", value: "vtext.com", name: "Straight Talk"},
        {id: "19", value: "tmomail.net", name: "T-MOBILE"},
        {id: "20", value: "itelcel.com", name: "Telcel"},
        {id: "21", value: "msg.telus.com", name: "Telus"},
        {id: "22", value: "sms.tigo.com.co", name: "Tigo (Formerly Ola)"},
        {id: "23", value: "email.uscc.net", name: "US Cellular"},
        {id: "24", value: "rek2.com.mx", name: "Usucacell"},
        {id: "25", value: "vtext.com", name: "Verizon"},
        {id: "26", value: "vmobl.com", name: "Virgin Mobile"},
    ]

    $scope.listDevices = [
        {id: "1", name: "Device Name 1"},
        {id: "2", name: "Device Name 2"},
        {id: "3", name: "Device Name 3"},
        {id: "4", name: "Device Name 4"},
        {id: "5", name: "Device Name 5"},
        {id: "6", name: "Device Name 6"},
        {id: "7", name: "Device Name 7"},
        {id: "8", name: "Device Name 8"}
    ]
    $scope.listSelectedDevices = []

    $scope.checkDevice = function(id, checked){
        var idx = $scope.listSelectedDevices.indexOf(id);
        if (idx >= 0 && !checked) {
            $scope.listSelectedDevices.splice(idx, 1);
        }
        if (idx < 0 && checked) {
            $scope.listSelectedDevices.push(id);
        }
    }

    $scope.selectAlertTypes = [
        {id: "18", value: "18", name: "Engine Hours"},
        {id: "1", value: "22", name: "Entering Sleep Mode"},
        {id: "2", value: "1", name: "Geofence"},
        {id: "3", value: "24", name: "Idle"},
        {id: "4", value: "21", name: "Low Battery DB"},
        {id: "5", value: "16", name: "Main Power Disconnect"},
        {id: "6", value: "17", name: "Main Power Reconnect"},
        {id: "7", value: "31", name: "Message Button"},
        {id: "8", value: "20", name: "Speeding"},
        {id: "9", value: "5", name: "Towing"},
        {id: "10", value: "23", name: "Towing DB"},
        {id: "11", value: "19", name: "Wake On Motion"},
    ]
    $scope.selectSendAlertWhen = [
        {id: "1", value: "0", name: "Exiting"},
        {id: "2", value: "1", name: "Entering"},
        {id: "3", value: "2", name: "Crossing"},
    ]
    $scope.selectUnit = [
        {id: "1", value: "1", name: "Kms/h"},
        {id: "2", value: "1.609344", name: "Miles/h"},
    ]
    $scope.selectGeofences = [
        {id: "1", shape: "1", name: "Bermuda Triangle", hashpoit: [{lat: 25.774, lng: -80.190},{lat: 18.466, lng: -66.118}, {lat: 32.321, lng: -64.757}]},
        {id: "2", shape: "2", name: "Losangeles", center: {lat: 34.052, lng: -118.243}, radius: Math.sqrt(3857799) * 100},
    ]
    $scope.listDrawedGeofence = []
    $scope.isCheckedDevice = function(id){
        for(var index in $scope.listSelectedDevices){
            if($scope.listSelectedDevices[index] == id){
                return true
            }
        }
        return false;
    }
    $scope.geofenceTypes = {
      POLYGON : '1',
      CIRCLE: '2'
    }
    $scope.drawGeofence = function(map, alertInstance, listGeofences){
      var shape = {}
        if(map != null && alertInstance != null) {
            var geofenceInstance = [];
            for (var index in listGeofences) {
                var geofence = listGeofences[index];
                if (geofence.id == alertInstance.geofence) {
                    geofenceInstance = geofence;
                }
            }
            switch (geofenceInstance.shape) {
                case $scope.geofenceTypes.POLYGON:
                    shape = $scope.drawPolygon(map, geofenceInstance.hashpoit)
                    break;
                case $scope.geofenceTypes.CIRCLE:
                    shape = $scope.drawCircle(map, geofenceInstance.center, geofenceInstance.radius)
                    break;
            }
        }
      return shape;
    }
    $scope.drawPolygon = function(map, hashpoit){
      var polygon = new google.maps.Polygon({
        paths: hashpoit,
        strokeColor: '#3399FF',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#3399FF',
        fillOpacity: 0.35
      });
      polygon.setMap(map);
      map.setCenter(new google.maps.LatLng(hashpoit[0].lat, hashpoit[0].lng));
      return polygon
    }
    $scope.drawCircle = function(map, center, radius ){
      var circle = new google.maps.Circle({
        strokeColor: '#3399FF',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#3399FF',
        fillOpacity: 0.35,
        center: center,
        radius: radius
      });
      circle.setMap(map);
      map.setCenter(new google.maps.LatLng(center.lat, center.lng));
      return circle
    }
    //Draw marker
    $scope.drawPoint = function(map, deviceInstance){
        if(map != null && deviceInstance != null){
            var marker = new google.maps.Marker({
                position: {lat: deviceInstance.lat, lng: deviceInstance.long},
                map: map,
                title: deviceInstance.location
            });
            map.setCenter(new google.maps.LatLng(deviceInstance.lat, deviceInstance.long));
        }
    }
    $scope.setCenter = function(map, geofence){
      switch (geofence.shape) {
        case $scope.geofenceTypes.POLYGON:
          map.setCenter(new google.maps.LatLng(geofence.hashpoit[0].lat, geofence.hashpoit[0].lng));
          break;
        case $scope.geofenceTypes.CIRCLE:
          map.setCenter(new google.maps.LatLng(geofence.center.lat, geofence.center.lng));
          break;
      }
    }

    $scope.bubbles = {}
    $scope.bubblesData = {}
    $scope.bubblesData.listInstance = [{"Id":53869,"Name":"_6361543560526","SerialNumber":"6361543560526","Location":"7703 Westbrook Way, Stanton, California, United States, 90680","Latitude":33.775460,"Longitude":-117.997300,"Speed":"0 mph","Heading":"N","LastReported":"10/08/2015 05:04","DisplayLastReported":"10/08/2015 05:04 AM","SimStatus":"","PaidUntil":"02/12/2016 02:11:10 PM","DeviceStatus":"Heart Beat","Avatar":"http://images.skypatrol.com/img.php?src=mercury/qa/avatars/user_7977_635769018498880626.jpg\u0026w=40\u0026h=40\u0026no-upscale","BatteryLevel":14.000000,"Unit":"VDC","VIN":"","StockNumber":"","Make":"","Model":"","YearMade":"","PlateNo":"","VehicleColor":null,"Color":"Blue","DiffHours":21.567854722222222,"Installed":0,"PaymentPeriod":12,"Commands":"CDBG,CDBOS,CSPDI,DAGEOFNC,DDBG,DeviceAckTool,DLPM,DSTARTER,ELPM,ENG,ESTARTER,GSPDI,LOCATE,PGEOFNC,RGPS,RMD,RME,RST,RSTB,SLBT,SOSENABLE"},
      {"Id":53929,"Name":"_Bob","SerialNumber":"351934046592197","Location":"1435 W Kimberly Ln, Anaheim, California, United States, 92802","Latitude":33.805810,"Longitude":-117.931400,"Speed":"0 mph","Heading":"N","LastReported":"10/08/2015 20:43","DisplayLastReported":"10/08/2015 08:43 PM","SimStatus":"ACTIVE","PaidUntil":"05/31/2016 02:00:00 PM","DeviceStatus":"Periodic Report","Avatar":"http://qa.protekgps.com/Content/images/avatars/misc/small/18.png","BatteryLevel":12.900000,"Unit":"VDC","VIN":"JN8AS5MT7BW179965","StockNumber":"","Make":"","Model":"","YearMade":"","PlateNo":"","VehicleColor":null,"Color":"","DiffHours":5.9192436111111109,"Installed":0,"PaymentPeriod":1,"Commands":"CDBG,DDBG,DeviceAckTool,ENG,GETIMEI,LOCATE,SLBT"},
      {"Id":53940,"Name":"_G79W_6456","SerialNumber":"357330050216456","Location":"4608 Nw 107th Ave, Doral, Florida, United States, 33178","Latitude":25.815520,"Longitude":-80.370210,"Speed":"0 mph","Heading":"N","LastReported":"10/02/2015 08:01","DisplayLastReported":"10/02/2015 08:01 AM","SimStatus":"","PaidUntil":"","DeviceStatus":"Parking","Avatar":"http://qa.protekgps.com/Content/images/avatars/default/protekgps/small/dummy2.png","BatteryLevel":4.179688,"Unit":"%","VIN":"5YFBU4EE2DP216131","StockNumber":"","Make":"Toyota","Model":"Corolla","YearMade":"2013","PlateNo":"","VehicleColor":null,"Color":"","DiffHours":162.6231325,"Installed":0,"PaymentPeriod":1,"Commands":"*GS00,MGS;0#,*GS00,MGE;1#,CDBG,CDBOS,DDBEP,DDBG,DDBI,DDBIP,DDBP,DDBS,DDBT,DeviceAckTool,EDBEP,EDBI,EDBIGN,EDBIP,EDBO,EDBP,EDBT,ESTARTER,LOCATE,QOBD"},
      {"Id":53968,"Name":"_GL300VC","SerialNumber":"A1000043D2036A","Location":"8340 Nw 30th Ter, Doral, Florida, United States, 33122","Latitude":25.801980,"Longitude":-80.332310,"Speed":"7 mph","Heading":"E","LastReported":"10/02/2015 07:18","DisplayLastReported":"10/02/2015 07:18 AM","SimStatus":"","PaidUntil":"","DeviceStatus":"First Location Power On","Avatar":"http://qa.protekgps.com/Content/images/avatars/default/protekgps/small/dummy2.png","BatteryLevel":5.000000,"Unit":"%","VIN":"","StockNumber":"","Make":"","Model":"","YearMade":"","PlateNo":"","VehicleColor":null,"Color":"","DiffHours":163.33618805555554,"Installed":0,"PaymentPeriod":12,"Commands":"CDBG,CDBOS,DDBG,DDBOS,DDBPB,EDBPB,ENG,LOCATE"},{"Id":53920,"Name":"_GL300VC3","SerialNumber":"A1000043D200A6","Location":"7703 Westbrook Way, Stanton, California, United States, 90680","Latitude":33.775400,"Longitude":-117.997200,"Speed":"1 mph","Heading":"E","LastReported":"10/08/2015 15:00","DisplayLastReported":"10/08/2015 03:00 PM","SimStatus":"","PaidUntil":"","DeviceStatus":"Periodic Report","Avatar":"http://qa.protekgps.com/Content/images/avatars/default/protekgps/small/dummy2.png","BatteryLevel":86.000000,"Unit":"%","VIN":"","StockNumber":"","Make":"","Model":"","YearMade":"","PlateNo":"","VehicleColor":null,"Color":"","DiffHours":11.63424361111111,"Installed":0,"PaymentPeriod":1,"Commands":"CDBG,CDBOS,DDBG,DDBOS,DDBPB,EDBPB,ENG,LOCATE"},{"Id":53788,"Name":"_Orion_0251","SerialNumber":"6361542590251","Location":"8339 Nw 30th Ter, Doral, Florida, United States, 33122","Latitude":25.802160,"Longitude":-80.332290,"Speed":"0 mph","Heading":"N","LastReported":"05/05/2015 07:13","DisplayLastReported":"05/05/2015 07:13 AM","SimStatus":"","PaidUntil":"09/30/2015 08:11:57 AM","DeviceStatus":"Periodic","Avatar":"http://qa.protekgps.com/Content/images/avatars/bikes/small/28.png","BatteryLevel":12.250000,"Unit":"VDC","VIN":"","StockNumber":"1234567","Make":"","Model":"","YearMade":"","PlateNo":"","VehicleColor":null,"Color":"","DiffHours":3763.4222991666666,"Installed":0,"PaymentPeriod":12,"Commands":"CDBG,CDBOS,CSPDI,DAGEOFNC,DDBG,DeviceAckTool,DLPM,DSTARTER,ELPM,ENG,ESTARTER,GSPDI,LOCATE,PGEOFNC,RGPS,RMD,RME,RST,RSTB,SLBT,SOSENABLE"},{"Id":53931,"Name":"_Test WS QA","SerialNumber":"PO049112C1039","Location":"8340 Nw 30th Ter, Doral, Florida, United States, 33122","Latitude":25.802100,"Longitude":-80.332250,"Speed":"0 mph","Heading":"N","LastReported":"10/08/2015 20:37","DisplayLastReported":"10/08/2015 08:37 PM","SimStatus":"","PaidUntil":"","DeviceStatus":"Periodic Report","Avatar":"http://qa.protekgps.com/Content/images/avatars/cars/small/04.png","BatteryLevel":0.000000,"Unit":"%","VIN":"YV1MS682452281701","StockNumber":"WST9013","Make":"FORD","Model":"F-250 SUPER DUTY","YearMade":"2014","PlateNo":"WSP767","VehicleColor":null,"Color":"GREEN","DiffHours":6.0300769444444438,"Installed":0,"PaymentPeriod":1,"Commands":"DeviceAckTool,ENG,GETIMEI"},{"Id":52955,"Name":"_TT8750+","SerialNumber":"SB213010118065","Location":"1437 W Kimberly Ln, Anaheim, California, United States, 92802","Latitude":33.806050,"Longitude":-117.931300,"Speed":"0 mph","Heading":"N","LastReported":"09/08/2014 21:00:00","DisplayLastReported":"09/08/2014 09:00:00 PM","SimStatus":"","PaidUntil":"04/24/2016 09:00:00 PM","DeviceStatus":"Going In Geofence","Avatar":"http://images.skypatrol.com/img.php?src=mercury/qa/avatars/user_7977_635770333663641850.png\u0026w=40\u0026h=40\u0026no-upscale","BatteryLevel":4.270000,"Unit":"VDC","VIN":"","StockNumber":"","Make":"","Model":"","YearMade":"","PlateNo":"","VehicleColor":null,"Color":"","DiffHours":9485.64674361111,"Installed":1,"PaymentPeriod":12,"Commands":"CCDPG,CDBG,CDBOS,CEDPG,CLDPG,DDBG,DDBOS,DeviceAckTool,DLPM,DPGF,DSTARTER,ELPM,ESTARTER,GETIMEI,LOCATE,SLBT,SOSENABLE"},{"Id":52944,"Name":"_TT8760","SerialNumber":"I4301086G0390","Location":"9032 Timothy Ln, Garden Grove, California, United States, 92841","Latitude":33.790160,"Longitude":-117.974800,"Speed":"0 mph","Heading":"N","LastReported":"04/10/2014 20:03:57","DisplayLastReported":"04/10/2014 08:03:57 PM","SimStatus":"","PaidUntil":"03/29/2016 09:00:00 PM","DeviceStatus":"Locate Now","Avatar":"http://qa.protekgps.com/Content/images/avatars/cars/small/01.png","BatteryLevel":0.000000,"Unit":"","VIN":"","StockNumber":"","Make":"","Model":"","YearMade":"2000","PlateNo":"phuong","VehicleColor":null,"Color":"","DiffHours":13110.580910277777,"Installed":0,"PaymentPeriod":12,"Commands":"CDBG,DDBG,DeviceAckTool,DLPM,DLPMSMS,DSTARTER,DSTARTERSMS,ELPM,ELPMSMS,ENG,ESTARTER,ESTARTERSMS,ET,GEOFENCE 1 IN,GEOFENCE 1 OUT,GEOFENCE 2 IN,GEOFENCE 2 OUT,GEOFENCE 3 IN,GEOFENCE 3 OUT,GEOFENCE 4 IN,GEOFENCE 4 OUT,GEOFENCE 5 IN,GEOFENCE 5 OUT,GETIMEI,GFMI21,LOCATE,LOCATESMS,NO GEOFENCE 1 IN,NO GEOFENCE 1 OUT,NO GEOFENCE 2 IN,NO GEOFENCE 2 OUT,NO GEOFENCE 3 IN,NO GEOFENCE 3 OUT,NO GEOFENCE 4 IN,NO GEOFENCE 4 OUT,NO GEOFENCE 5 IN,NO GEOFENCE 5 OUT,OFFEQUIP,ONEQUIP,QRYTMP,SOSENABLE,SOSENABLESMS,ST,UNLOCK,UPDATE CANNED MSG"},{"Id":53881,"Name":"_TT8950","SerialNumber":"RS01107411440","Location":"Unknown","Latitude":0.000000,"Longitude":0.000000,"Speed":"0 mph","Heading":"N","LastReported":"12/31/1999 21:00:00","DisplayLastReported":"12/31/1999 09:00:00 PM","SimStatus":"ACTIVE","PaidUntil":"09/09/2014 09:00:00 PM","DeviceStatus":null,"Avatar":"http://qa.protekgps.com/Content/images/avatars/default/protekgps/small/dummy2.png","BatteryLevel":0.000000,"Unit":"","VIN":"","StockNumber":"","Make":"","Model":"","YearMade":"","PlateNo":"","VehicleColor":null,"Color":null,"DiffHours":138245.64674361111,"Installed":0,"PaymentPeriod":12,"Commands":"CDBG,DDBG,DeviceAckTool,DLPM,DLPMSMS,DSTARTER,DSTARTERSMS,ELPM,ELPMSMS,ENG,ESTARTER,ESTARTERSMS,ET,GEOFENCE 1 IN,GEOFENCE 1 OUT,GEOFENCE 2 IN,GEOFENCE 2 OUT,GEOFENCE 3 IN,GEOFENCE 3 OUT,GEOFENCE 4 IN,GEOFENCE 4 OUT,GEOFENCE 5 IN,GEOFENCE 5 OUT,GETIMEI,GFMI21,LOCATE,LOCATESMS,NO GEOFENCE 1 IN,NO GEOFENCE 1 OUT,NO GEOFENCE 2 IN,NO GEOFENCE 2 OUT,NO GEOFENCE 3 IN,NO GEOFENCE 3 OUT,NO GEOFENCE 4 IN,NO GEOFENCE 4 OUT,NO GEOFENCE 5 IN,NO GEOFENCE 5 OUT,OFFEQUIP,ONEQUIP,QRYTMP,SOSENABLE,SOSENABLESMS,ST,UNLOCK,UPDATE CANNED MSG"},{"Id":52926,"Name":"_TT9200","SerialNumber":"SD213267353115","Location":"1437 W Kimberly Ln, Anaheim, California, United States, 92802","Latitude":33.805900,"Longitude":-117.931500,"Speed":"0 mph","Heading":"N","LastReported":"04/22/2015 06:27","DisplayLastReported":"04/22/2015 06:27 AM","SimStatus":"ACTIVE","PaidUntil":"02/13/2016 06:39:56 AM","DeviceStatus":"Locate Now","Avatar":"http://qa.protekgps.com/Content/images/avatars/bikes/small/42.png","BatteryLevel":0.000000,"Unit":"VDC","VIN":"ABGHDHJ1234567898","StockNumber":"","Make":"Mazda","Model":"CX7","YearMade":"2010","PlateNo":"987123","VehicleColor":null,"Color":"Red","DiffHours":4076.1820213888886,"Installed":0,"PaymentPeriod":24,"Commands":"CCDPG,CDBG,CDBOS,CEDPG,CLDPG,DDBG,DDBOS,DeviceAckTool,DLPM,DPGF,DSTARTER,ELPM,ESTARTER,GETIMEI,LOCATE,SLBT,SOSENABLE"},{"Id":53780,"Name":"_TT9300G","SerialNumber":"N7132000211","Location":"8334 Nw 30th Ter, Doral, Florida, United States, 33122","Latitude":25.802230,"Longitude":-80.332310,"Speed":"1 mph","Heading":"N","LastReported":"09/12/2014 16:51:15","DisplayLastReported":"09/12/2014 04:51:15 PM","SimStatus":"","PaidUntil":"","DeviceStatus":"Locate Now","Avatar":"http://qa.protekgps.com/Content/images/avatars/default/protekgps/small/dummy2.png","BatteryLevel":13.800000,"Unit":"VDC","VIN":"3VWJF71K47M737718","StockNumber":"","Make":"Volkswagen","Model":"Jetta","YearMade":"2007","PlateNo":"","VehicleColor":null,"Color":"Reflex Silver Metallic","DiffHours":9393.7925769444446,"Installed":0,"PaymentPeriod":1,"Commands":"CDBG,CDBOS,DDBG,DDBOS,DeviceAckTool,DSTARTER,ENG,ESTARTER,LOCATE,SLBT"},{"Id":53966,"Name":"_TT9400_AL142902072","SerialNumber":"AL142902072","Location":"7703 Westbrook Way, Stanton, California, United States, 90680","Latitude":33.775470,"Longitude":-117.997300,"Speed":"0 mph","Heading":"N","LastReported":"10/08/2015 21:11","DisplayLastReported":"10/08/2015 09:11 PM","SimStatus":"FAILED","PaidUntil":"09/30/2016 01:18:57 PM","DeviceStatus":"Heartbeat","Avatar":"http://qa.protekgps.com/Content/images/avatars/default/protekgps/small/dummy2.png","BatteryLevel":13.900000,"Unit":"VDC","VIN":"WDBUF56XX9B416896","StockNumber":"2072","Make":"Mercedes-Benz","Model":"E-Class","YearMade":"2009","PlateNo":"","VehicleColor":null,"Color":"Sahara Beige/Black","DiffHours":5.4631324999999995,"Installed":1,"PaymentPeriod":12,"Commands":"CDBG,CDBOS,DDBG,DDBOS,DeviceAckTool,DSTARTER,ENG,ESTARTER,LOCATE,SLBT"},{"Id":53766,"Name":"_TT9400C","SerialNumber":"AW140700261","Location":"9027 Timothy Ln, Garden Grove, California, United States, 92841","Latitude":33.790100,"Longitude":-117.974900,"Speed":"0 mph","Heading":"N","LastReported":"07/09/2014 21:00:00","DisplayLastReported":"07/09/2014 09:00:00 PM","SimStatus":"","PaidUntil":"06/12/2016 09:00:00 PM","DeviceStatus":"Diagnostic Data","Avatar":"http://images.skypatrol.com/img.php?src=mercury/qa/avatars/user_7977_635770354869385346.png\u0026w=40\u0026h=40\u0026no-upscale","BatteryLevel":13.700000,"Unit":"VDC","VIN":"WDBRF61J12F166302","StockNumber":"","Make":"Mercedes-Benz","Model":"C-Class","YearMade":"2002","PlateNo":"","VehicleColor":null,"Color":"Black","DiffHours":10949.646743611111,"Installed":0,"PaymentPeriod":12,"Commands":"CDBG,CDBOS,DDBG,DDBOS,DeviceAckTool,DSTARTER,ENG,ESTARTER,LOCATE,SLBT"},{"Id":53877,"Name":"1643015296","SerialNumber":"1643015296","Location":"7703 Westbrook Way, Stanton, California, United States, 90680","Latitude":33.775490,"Longitude":-117.997200,"Speed":"1 mph","Heading":"NE","LastReported":"10/08/2015 10:06","DisplayLastReported":"10/08/2015 10:06 AM","SimStatus":"","PaidUntil":"","DeviceStatus":"Locate","Avatar":"http://qa.protekgps.com/Content/images/avatars/default/protekgps/small/dummy2.png","BatteryLevel":0.000000,"Unit":"","VIN":"1FTEW1CP0FFA09886","StockNumber":"","Make":"Ford","Model":"F-150","YearMade":"2015","PlateNo":"","VehicleColor":null,"Color":"","DiffHours":16.5331325,"Installed":1,"PaymentPeriod":12,"Commands":"CDBG,CDBOS,DDBG,DeviceAckTool,DLPM,DSTARTER,ELPM,ENG,ESTARTER,LOCATE,MRST,RPDE,SLBT,SOSENABLE"},{"Id":53876,"Name":"1643016344","SerialNumber":"1643016344","Location":"Unknown","Latitude":0.000000,"Longitude":0.000000,"Speed":"0 mph","Heading":"N","LastReported":"12/31/1999 21:00:00","DisplayLastReported":"12/31/1999 09:00:00 PM","SimStatus":"","PaidUntil":"","DeviceStatus":null,"Avatar":"http://qa.protekgps.com/Content/images/avatars/default/protekgps/small/dummy2.png","BatteryLevel":0.000000,"Unit":"","VIN":"ABGHDHJ1234567898","StockNumber":"","Make":"Mazda","Model":"CX7","YearMade":"2010","PlateNo":"","VehicleColor":null,"Color":"Red","DiffHours":138245.64674361111,"Installed":0,"PaymentPeriod":36,"Commands":"CDBG,CDBOS,DDBG,DeviceAckTool,DLPM,DSTARTER,ELPM,ENG,ESTARTER,LOCATE,MRST,RPDE,SLBT,SOSENABLE"},{"Id":53882,"Name":"300234030001220","SerialNumber":"KQ1000003230","Location":"Unknown","Latitude":0.000000,"Longitude":0.000000,"Speed":"0 mph","Heading":"N","LastReported":"12/31/1999 21:00:00","DisplayLastReported":"12/31/1999 09:00:00 PM","SimStatus":"","PaidUntil":"03/18/2015 02:05:16 PM","DeviceStatus":null,"Avatar":"http://qa.protekgps.com/Content/images/avatars/default/protekgps/small/dummy2.png","BatteryLevel":0.000000,"Unit":"VDC","VIN":"","StockNumber":"","Make":"","Model":"","YearMade":"","PlateNo":"","VehicleColor":null,"Color":"","DiffHours":138245.64674361111,"Installed":0,"PaymentPeriod":12,"Commands":"CDBG,DDBG,DeviceAckTool,ENG,LOCATEMAMBO,LOCATESATELLITE"},{"Id":7642,"Name":"312219","SerialNumber":"1431016673","Location":"1343 E Rundberg Ln Austin TX 78753 US","Latitude":30.351270,"Longitude":-97.679060,"Speed":"0 mph","Heading":"SW","LastReported":"04/11/2012 01:22:07","DisplayLastReported":"04/11/2012 01:22:07 AM","SimStatus":"ACTIVE","PaidUntil":"03/10/2013 09:00:00 PM","DeviceStatus":"Tracking","Avatar":"http://images.skypatrol.com/img.php?src=mercury/qa/avatars/user_8507_635780922736813862.jpg\u0026w=40\u0026h=40\u0026no-upscale","BatteryLevel":0.000000,"Unit":"%","VIN":"1FTRW07L53KB63810","StockNumber":"","Make":"Ford","Model":"F-150","YearMade":"2003","PlateNo":"","VehicleColor":null,"Color":"","DiffHours":30625.2781325,"Installed":0,"PaymentPeriod":12,"Commands":"Change Max Speed Alert,Change Report time,DeviceAckTool,Disable Battery Disconnected Mode,Disable Theft mode,DLPM,DLPMSMS,DSTARTER,DSTARTERSMS,DTHEFTM,ELPM,ELPMSMS,Enable Sleep Mode,Enable Theft mode,ENG,ESLEEPM,ESTARTER,ESTARTERSMS,ETHEFTM,LOCATE,LOCATESMS,SOSENABLE,SOSENABLECDMA,SOSENABLESMS"},{"Id":53884,"Name":"354660046140268","SerialNumber":"354660046140268","Location":"Unknown","Latitude":0.000000,"Longitude":0.000000,"Speed":"0 mph","Heading":"N","LastReported":"12/31/1999 21:00:00","DisplayLastReported":"12/31/1999 09:00:00 PM","SimStatus":"","PaidUntil":"12/31/1999 09:00:00 PM","DeviceStatus":null,"Avatar":"http://qa.protekgps.com/Content/images/avatars/default/protekgps/small/dummy2.png","BatteryLevel":0.000000,"Unit":"VDC","VIN":"","StockNumber":"","Make":"","Model":"","YearMade":"","PlateNo":"","VehicleColor":null,"Color":null,"DiffHours":138245.64674361111,"Installed":0,"PaymentPeriod":12,"Commands":"CDBG,CDBOS,CMR,CMSSR,CPTT,CTR,DDBG,DDBOS,DeviceAckTool,DITR,DMR,DMSSR,DPTT,DSTARTER,DTR,ENG,ESTARTER,LOCATE,SIT,SLBT"},
      {"Id":53923,"Name":"357330050220011","SerialNumber":"357330050220011","Location":"Unknown","Latitude":0.000000,"Longitude":0.000000,"Speed":"0 mph","Heading":"N","LastReported":"08/27/2015 10:58","DisplayLastReported":"08/27/2015 10:58 AM","SimStatus":"","PaidUntil":"","DeviceStatus":null,"Avatar":"http://qa.protekgps.com/Content/images/avatars/default/protekgps/small/dummy2.png","BatteryLevel":0.000000,"Unit":"%","VIN":"","StockNumber":"","Make":"","Model":"","YearMade":"","PlateNo":"","VehicleColor":null,"Color":null,"DiffHours":1023.6739658333333,"Installed":0,"PaymentPeriod":1,"Commands":""}];

    $scope.bubblesData.listMakers = []
    $scope.map = {}
    $scope.oms = {}
    $scope.spiderPopup = null
    $scope.spiderPopupData = {}
    $scope.spiderPopupData.listInstance = []
    $scope.markerPopup = null

    $scope.closeOms = function(){
      $scope.spiderPopup.close();
    }
    $scope.detailsOms = function(marker) {
      for(var i = 0; i < $scope.bubblesData.listMakers.length; i++){
        if($scope.bubblesData.listMakers[i].id == marker){
          $scope.showDevicePopup($scope.bubblesData.listMakers[i]);
          break;
        }
      }
    }

    $scope.initMap =  function(divId, instance){
      var mapOptions = {
        zoom: 4,
        center: new google.maps.LatLng(38.19264126069414, -94.05427382812503),
        mapTypeId: google.maps.MapTypeId.HYBRID,
        zoomControl: true,
        zoomControlOptions: {
          position: google.maps.ControlPosition.RIGHT_TOP
        },
        scaleControl: true,
        streetViewControl: false,
        streetViewControlOptions: {
          position: google.maps.ControlPosition.RIGHT_TOP
        },
        mapTypeControl: true,
        mapTypeControlOptions: {
          position: google.maps.ControlPosition.LEFT_TOP
        },
        rotateControl:false
      }
      $scope.map = new google.maps.Map(document.getElementById('map-canvas-index'), mapOptions);
      $scope.oms = new OverlappingMarkerSpiderfier($scope.map, {
        markersWontMove: true,
        markersWontHide: true,
        keepSpiderfied: true
      });

      $scope.showAllMarker();

      $scope.oms.addListener('click', function (marker, event) {
        $scope.showDevicePopup(marker);
      });

      $scope.oms.addListener('spiderfy', function (markers) {
        var bounds = new google.maps.LatLngBounds();
        var html = "";
        html += '<div class="spider-popup">';
        $scope.spiderPopupData.listInstance = [];
        listInstanceTemp = [];
        for (var i = 0; i < markers.length; i++) {
          var marker = markers[i];
          var text = marker.name + (marker.serialnumber ? ' (' + marker.serialnumber + ')' : '');
          if (text.length > 30)
            text = text.substring(0, 30);
          listInstanceTemp.push({text: text, id: marker.id});
          if (!bounds.contains(markers[i].getPosition())) {
            bounds.extend(markers[i].getPosition());
          }
        }
        setTimeout(function () {
          $scope.$apply(function () {
            $scope.spiderPopupData.listInstance = listInstanceTemp;
          });
          var element = angular.element($('.spider-popup-template'));
          element.scope().$apply();
          html += angular.element('.spider-popup-template').html().replace(/ng-repeat/g, 'repeat');
          html += '</div>';
          if ($scope.spiderPopup) {
            $scope.spiderPopup.close();
          }
          $scope.spiderPopup = new SubOverlay(
            bounds,
            $scope.map,
            $compile(html)($scope)[0],
            bounds.getCenter(),
            {
              left: 200,
              top: 90
            }
          );
          $scope.spiderPopup.setMap($scope.map);
        }, 0);

      });
    }
    $scope.showAllMarker = function() {
      var bounds = new google.maps.LatLngBounds();
      for (var i = 0; i < $scope.bubblesData.listInstance.length; i++) {
        var value = $scope.bubblesData.listInstance[i];
        if (Math.round(value.Latitude * 10) / 10 == 0 || Math.round(value.Longitude * 10) / 10 == 0) {
          continue;
        }
        var myLatLng = {lat: value.Latitude, lng: value.Longitude};
        var marker = new google.maps.Marker({
          position: myLatLng,
          map: $scope.map,
          name: value.Name,
          id: value.Id,
          serialnumber: value.SerialNumber,
          lat: value.Latitude,
          lng: value.Longitude,
          speed: value.Speed,
          direction: value.Heading,
          lastReported: value.LastReported,
          displayLastReported: value.DisplayLastReported,
          status: value.SimStatus,
          batteryLevel: value.BatteryLevel,
          unit: value.Unit,
          diffHours: value.DiffHours,
          commands: value.Commands,
          location: value.Location,
          icon: 'assets/images/generals/pindrop_1.png',
          avatar: value.Avatar
        });
        if (!bounds.contains(marker.getPosition())) {
          bounds.extend(marker.getPosition());
        }
        $scope.oms.addMarker(marker);
        $scope.bubblesData.listMakers.push(marker);
      }

      $scope.map.setZoom(4);
      $scope.map.setCenter(bounds.getCenter());
    }
    $scope.bubbles = {}
    $scope.showDevicePopup = function(marker){
      $scope.ClearMap();
      marker.setMap($scope.map);
      var bounds = new google.maps.LatLngBounds();
      bounds.extend(marker.getPosition());

      setTimeout(function () {
        $scope.$apply(function () {
          $scope.bubbles = {
            name: marker.name,
            id: marker.id,
            serialnumber: marker.serialnumber,
            lat: marker.lat,
            lng: marker.lng,
            speed: marker.speed,
            direction: marker.direction,
            lastReported: marker.lastReported,
            displayLastReported: marker.displayLastReported,
            status: marker.status,
            batteryLevel: marker.batteryLevel,
            unit: marker.unit,
            diffHours: marker.diffHours,
            commands: marker.commands,
            location: marker.location,
            icon: 'assets/images/generals/pindrop_1.png',
            avatar: marker.avatar
          }
        });

        var html = '<div class="map-bubble">';
        html += angular.element('.map-bubble').html();
        html += '</div>';
        $scope.markerPopup = new SubOverlay(
          bounds,
          $scope.map,
          $compile(html)($scope)[0],
          bounds.getCenter(),
          {
            left: 5,
            top: -50
          }
        );
        $scope.markerPopup.setMap($scope.map);
        $scope.map.setZoom(18);
        $scope.map.setCenter(bounds.getCenter());
      }, 0);
    }

    $scope.closeDevicePopup = function() {
      $scope.ClearMap();
      $scope.showAllMarker();
    }
    $scope.ClearMap = function () {
      if ($scope.oms != null) {
        $scope.oms.clearMarkers();
      }
      if ($scope.spiderPopup) {
        $scope.spiderPopup.close();
      }
      for (var i = 0; i <  $scope.bubblesData.listMakers.length; i++) {
        $scope.bubblesData.listMakers[i].setMap(null);
      }
      if($scope.markerPopup)
        $scope.markerPopup.setMap(null);
    }
    $scope.reziseMap = function(map){
        if(map != null)
            google.maps.event.trigger(map, 'resize');
    }

    $scope.quickReport = {}
    $scope.quickReport.VehicleHistory = [
      {time: "10/28/2015 10:01 PM", speed: "0 mph", heading: "N", location:"1435 W Kimberly Ln, Anaheim, California, United States, 92802", description:"Periodic Report"},
      {time: "10/28/2015 05:41 PM", speed: "0 mph", heading: "N", location:"1435 W Kimberly Ln, Anaheim, California, United States, 92802", description:"Ignition Off"},
      {time: "10/28/2015 05:40 PM", speed: "30 mph", heading: "S", location:"1636 S 9th St, Anaheim, California, United States, 92802", description:"Periodic Report"},
      {time: "10/28/2015 05:40 PM", speed: "29 mph", heading: "S", location:"1551 S 9th St, Anaheim, California, United States, 92802", description:"Going In GEO 4"},
      {time: "10/28/2015 05:38 PM", speed: "0 mph", heading: "N", location:"1721 W Cerritos Ave, Anaheim, California, United States, 92804", description:"Periodic Report"}
    ]
    $scope.quickReport.AlertHistory = [
      {eventname: "Ignition Off M", speed: "0 mph", location:"1435 W Kimberly Ln, Anaheim, California, United States, 92802", reporttime:"10/28/2015 05:41:29 PM"},
      {eventname: "Ignition On M", speed: "0 mph", location:"1215 S Empire St, Anaheim, California, United States, 92804", reporttime:"10/28/2015 05:34:20 PM"},
      {eventname: "Ignition Off M", speed: "0 mph", location:"1215 S Empire St, Anaheim, California, United States, 92804", reporttime:"10/28/2015 05:29:34 PM"},
      {eventname: "Ignition On M", speed: "0 mph", location:"7915 Garden Grove Blvd, Garden Grove, California, United States, 92841", reporttime:"10/28/2015 05:10:26 PM"},
      {eventname: "Ignition Off M", speed: "0 mph", location:"7915 Garden Grove Blvd, Garden Grove, California, United States, 92841", reporttime:"10/28/2015 08:00:14 AM"}
    ]
    $scope.quickReport.CommandHistory = [
      {status: "failed", commandname: "Locate", timesent:"10/14/2015 08:09:10 AM", location:"7703 Westbrook Way, Stanton, California, United States, 90680"},
      {status: "failed", commandname: "Locate", timesent:"10/09/2015 08:45:16 AM", location:"7703 Westbrook Way, Stanton, California, United States, 90680"},
      {status: "failed", commandname: "Creating Geofence - Crossing", timesent:"10/08/2015 09:51:58 AM", location:"7703 Westbrook Way, Stanton, California, United States, 90680"},
      {status: "failed", commandname: "Locate", timesent:"10/08/2015 09:49:28 AM", location:"7703 Westbrook Way, Stanton, California, United States, 90680"},
      {status: "failed", commandname: "Creating Geofence - Crossing", timesent:"10/08/2015 09:48:28 AM", location:"7703 Westbrook Way, Stanton, California, United States, 90680"}
    ]
    $scope.quickReport.DurationReport = [
      {vehicle: "_Bob", serialnumber: "351934046592197", duration:"424:50", location:"1437 W Kimberly Ln, Anaheim, California, United States, 92802", lat:"33.805807", long:"-117.931386"},
      {vehicle: "_Bob", serialnumber: "351934046592197", duration:"171:00", location:"7915 Garden Grove Blvd, Garden Grove, California, United States, 92841", lat:"33.775525", long:"-117.997190"},
      {vehicle: "_Bob", serialnumber: "351934046592197", duration:"3:32", location:"13117 Taft St, Garden Grove, California, United States, 92843", lat:"33.773354", long:"-33.773354"},
      {vehicle: "_Bob", serialnumber: "351934046592197", duration:"2:37", location:"2039 W Ball Rd, Anaheim, California, United States, 92804", lat:"33.817341", long:"-117.952430"},
      {vehicle: "_Bob", serialnumber: "351934046592197", duration:"1:29", location:"9009 Garden Grove Blvd, Garden Grove, California, United States, 92844", lat:"33.773912", long:"-117.977621"},
      {vehicle: "_Bob", serialnumber: "351934046592197", duration:"1:29", location:"9009 Garden Grove Blvd, Garden Grove, California, United States, 92844", lat:"33.773912", long:"-117.977621"},
      {vehicle: "_Bob", serialnumber: "351934046592197", duration:"1:29", location:"9009 Garden Grove Blvd, Garden Grove, California, United States, 92844", lat:"33.773912", long:"-117.977621"}
    ]
    $scope.quickReport.VehicleMileage = [
      {vehicle: "_Bob", serialnumber: "351934046592197", from:"10/01/2015 04:41:15 AM", to:"10/28/2015 02:41:29 PM", mileage:"697.0"}
    ]
    $scope.quickReport.EngineHours = [
      {vehicle: "_Bob", serialnumber: "351934046592197", from:"10/01/2015 04:41:15 AM", to:"10/28/2015 02:41:29 PM", totaltime:"20:22"}
    ]
    $scope.showQuickReport = function(id){
      $('#quick-report').show();
      var vpw = $(window).width()/2;
      $('#map-canvas-index').css({'width': vpw + 'px'});
      $('#quick-report').css({'width': vpw + 'px'});
    }
}]);


$(".tabs-menu a").click(function(event) {
  event.preventDefault();
  $(this).parent().addClass("current");
  $(this).parent().siblings().removeClass("current");
  var tab = $(this).attr("href");
  $(".tab-content").not(tab).css("display", "none");
  $(tab).fadeIn();
});
