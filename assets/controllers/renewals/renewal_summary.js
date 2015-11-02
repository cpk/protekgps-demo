/**
 * Created by admin on 10/9/2015.
 */
protekgps.controller("RenewalSummaryController", function($scope) {
    //Renewals summary popup Fade Out
    $scope.renewalsSummaryFadeOut = function(){
        $('#renewal-summary-popup').fadeOut();
    }
    $scope.getTotal =function(){
        var total = 0;
        if($scope.$parent.renewals.listSummaryInstance !== undefined) {
            for (var i = 0; i < $scope.$parent.renewals.listSummaryInstance.length; i++) {
                total += $scope.$parent.renewals.listSummaryInstance[i].amount;
            }
        }
        return total;
    }
    $scope.confirm =function(){
        alert("Confirm success!")
    }
    $scope.summaryCreditCardInformation = {"cardHolderName":"","city":"","creditCardNumber":"","country":'USA',"state":"alabama","expireDate":"","zipCode":"","cvvNumber":"","email":"","address":""};
    //Sort click
    $scope.sortClick = function (field) {
        $scope.$parent.sortClick(field);
        $scope.$parent.renewals.listSummaryInstance = $scope.$parent.renewals.listSummaryInstance.reverse();

    }
});