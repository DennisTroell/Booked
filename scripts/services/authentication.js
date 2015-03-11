// Always be strict.
'use strict';

services.factory('Authentication', function () {
    var auth = {
        isAuthenticated: false
    }

    return auth;
});