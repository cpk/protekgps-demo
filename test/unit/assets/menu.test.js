/**
 * Created by Khoa on 19/10/2015.
 */
describe("MenuController Unit testing #1", function () {

  beforeEach(angular.mock.module("protekgps"));
  var expect = chai.expect;
  var $controller;

  beforeEach(angular.mock.inject(function (_$controller_) {
    // The injector unwraps the underscores (_) from around the parameter names when matching
    $controller = _$controller_;
  }));

  describe('$scope.testUnitTestCount', function() {
    var $scope, controller;

    beforeEach(function() {
      $scope = {};
      controller = $controller('MenuController', { $scope: $scope });
    });

    it("Test testUnitTestIncrement", function () {
      $scope.testUnitTestIncrement();
      expect($scope.testUnitTestCount).to.equal(1);
    });
  });

  describe('$scope.testUnitTestSet', function() {
    var $scope, controller;

    beforeEach(function() {
      $scope = {};
      controller = $controller('MenuController', { $scope: $scope });
    });

    it("Test testUnitTestSet", function () {
      $scope.testUnitTestSet(0);
      expect($scope.testUnitTestCount).to.equal(0);
    });
  });
});
