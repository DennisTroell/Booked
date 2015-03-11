// Always be strict.
'use strict';

services.factory('Resource', ['$resource', function ($resource) {
    return $resource(options.api.base_url + '/Resources/:resourceId', {}, {
            query: {
                method: 'GET'
            }
        }, {
            stripTrailingSlashes: false
        }


    );
}]);