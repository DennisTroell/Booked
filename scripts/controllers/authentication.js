// Always be strict.
'use strict';

controllers.controller('AuthenticationController', [
 '$scope',
 '$location',
 '$window',
 'User',
 'Authentication',
 function ($scope, $location, $window, User, Authentication) {
        $scope.login = function (username, password) {
            if (username != null && password != null) {
                User.login(username, password).success(
                    function (data) {
                        Authentication.isAuthenticated = true;
                        $window.sessionStorage.userId = data.userId;
                        $window.sessionStorage.sessionToken = data.sessionToken;

                        console.log("Sending to: " + $window.sessionStorage.location);
                        $location.path($window.sessionStorage.location);
                    }).error(
                    function (status, data) {
                        console.log(status);
                        console.log(data);
                    });
            }
        }
}]);