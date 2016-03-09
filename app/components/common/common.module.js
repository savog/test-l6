/**
 * Created by savo on 25.2.16..
 */

import angular from 'angular';

let m = angular.module('prCommon', [
]);

m.filter('range', function() {
    return function(input, total) {
        total = parseInt(total);

        for (var i=0; i<total; i++) {
            input.push(i);
        }

        return input;
    };
});

export default m;
