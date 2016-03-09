import angular from 'angular';

import routes from './app.routes';

import prHome from './components/home/home.module';
import prIntro from './components/intro/intro.module';
import prDraw from './components/draw/draw.module';

import 'bootstrap/css/bootstrap.css!';
import 'assets/css/app.css!';

// Create main application module
let m = angular.module('app', [
    prHome.name,
    prIntro.name,
    prDraw.name
]);

// Create Angular constant for global config object so that we can mock it in tests
m.constant('prCfg', angular.extend({}, window.prCfg));

// Define routes
routes(m);
