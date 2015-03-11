// Always be strict.
'use strict';

var options = {
    api: {
        base_url: 'https://booking.cmm.ki.se/Web/Services'
    }
}

var app = angular.module('app', ['ngRoute', 'services', 'controllers']);
var controllers = angular.module('controllers', []);
var services = angular.module('services', ['ngResource']);


app.config(['$locationProvider', '$routeProvider',
  function ($location, $routeProvider) {
        $routeProvider.
        when('/resources/:id', {
            templateUrl: 'partials/reservation.list.html',
            controller: 'ReservationListController',
            access: {
                requiredAuthentication: true
            }
        })

        .when('/issues/:id', {
            templateUrl: 'partials/issues.html',
            controller: 'ReservationListController'
        })

        .when('/login', {
            templateUrl: 'partials/login.html',
            controller: 'AuthenticationController'
        }).

        otherwise({
            redirectTo: '/resources'
        });
      }])


app.config(function ($httpProvider) {
    $httpProvider.interceptors.push('TokenInterceptor');
});

app.run(function ($rootScope, $location, $window, Authentication) {
    $rootScope.$on("$routeChangeStart",
        function (event, nextRoute, currentRoute) {
            // redirect only if both isAuthenticated is false and no token
            // is set
            if (nextRoute != null && nextRoute.access != null && nextRoute.access.requiredAuthentication && !Authentication.isAuthenticated && !$window.sessionStorage.sessionToken) {

                console.log("Storing: " + $location.url());
                $window.sessionStorage.location = $location.url();

                //console.log("Routes");
                //console.log(nextRoute);
                //console.log(currentRoute);

                $location.path("/login");
            }
        });
});