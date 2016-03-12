/**
 * Created by savo on 24.2.16..
 */

import angular from 'angular';
import 'angular-ui-router';

import register from 'utils/register';
import routes from './intro.routes';

import AdsDirective from './count-down/count-down.directive';

let m = angular.module('prIntro', [
    'ui.router'
]);

AdsDirective.register(register(m));

routes(m);

export default m;
