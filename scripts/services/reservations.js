// Always be strict.
'use strict';

services.factory('Reservation', ['$resource', function ($resource) {
    return $resource(options.api.base_url + '/Reservations/', {}, {
            query: {
                method: 'GET'
            }
        }, {
            stripTrailingSlashes: false
        }


    );
}]);