/**
 * Created by savo on 24.2.16..
 */

import angular from 'angular';
import 'angular-ui-router';

import register from 'utils/register';
import routes from './draw.routes';

import prCommon from '/components/common/common.module';

import DrawingDirective from './drawing-process/drawing-process.directive';

let m = angular.module('prDraw', [
    'ui.router',
    prCommon.name
]);

DrawingDirective.register(register(m));

routes(m);

export default m;
