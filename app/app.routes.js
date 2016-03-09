export default function (module) {

    module.config(routes);

    function routes($urlRouterProvider, $urlMatcherFactoryProvider) {
        'ngInject';

        // Default route - home
        $urlRouterProvider.otherwise('/');

        // Accept URLs with and without trailing slash
        $urlMatcherFactoryProvider.strictMode(false);

        $urlRouterProvider.rule(function ($injector, $location) {
            var path = $location.url();

            // check to see if the path already has a slash where it should be
            if (path[path.length - 1] === '/' || path.indexOf('/?') > -1) {
                return;
            }

            if (path.indexOf('?') > -1) {
                return path.replace('?', '/?');
            }

            return path + '/';
        });
    }
}
