/**
 * Created by savo on 25.2.16..
 */

import angular from 'angular';
import 'angular-ui-router';

import routes from './home.routes';

let m = angular.module('prHome', [
    'ui.router'
]);

routes(m);

export default m;
