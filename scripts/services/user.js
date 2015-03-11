// Always be strict.
'use strict';

services.factory('User', function ($http) {
    return {
        login: function (username, password) {
            return $http.post(options.api.base_url + '/Authentication/Authenticate', {
                username: username,
                password: password
            });
        },

        logout: function () {
            return $http.get(options.api.base_url + '/Authentication/SignOut');
        }
    }
});