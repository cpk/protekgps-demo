/**
 * Created by Khoa on 09/10/2015.
 */
protekgps.controller("MenuController", function($scope) {
  //for demo unit test
    $scope.testUnitTestCount = 0;
    $scope.testUnitTestIncrement= function(){
      $scope.testUnitTestCount = $scope.testUnitTestCount + 1;
    };
    $scope.testUnitTestSet= function(count){
      $scope.testUnitTestCount = count;
    };
  //end for demo unit test

    //Admin popup Fade In
    $scope.adminFadeIn = function(){
        $('#admin-popup').fadeIn();
    }
});
