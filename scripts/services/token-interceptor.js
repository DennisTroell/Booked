// Always be strict.
'use strict';

services.factory('TokenInterceptor', function ($q, $window, Authentication) {
    return {
        request: function (config) {
            config.headers = config.headers || {};
            if ($window.sessionStorage.sessionToken) {
                config.headers['X-Booked-SessionToken'] = $window.sessionStorage.sessionToken;
                config.headers['X-Booked-UserId'] = $window.sessionStorage.userId;
            }
            return config;
        },

        requestError: function (rejection) {
            return $q.reject(rejection);
        },

        /*
         * Set Authentication.isAuthenticated to true if 200 is
         * received.
         */
        response: function (response) {
            if (response != null && response.status == 200 && $window.sessionStorage.sessionToken && !Authentication.isAuthenticated) {
                Authentication.isAuthenticated = true;
            }
            return response || $q.when(response);
        },

        /* Revoke client authentication if 401 is received. */
        responseError: function (rejection) {
            if (rejection != null && rejection.status === 401 && ($window.sessionStorage.sessionToken || Authentication.isAuthenticated)) {
                delete $window.sessionStorage.sessionToken;
                delete $window.sessionStorage.userId;
                console.log("unauthorized");
                Authentication.isAuthenticated = false;
            }
            return $q.reject(rejection);
        }
    };
});