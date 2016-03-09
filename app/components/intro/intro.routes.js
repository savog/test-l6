/**
 * Created by savo on 24.2.16..
 */

import template from './intro.html!text';
import IntroController from './intro.controller';

export default function (module) {
    module.config(configure);

    function configure($stateProvider) {
        'ngInject';

        $stateProvider
            .state('intro', {
                template: template,
                controller: IntroController,
                controllerAs: 'vm',
                params: {
                    drawData: null
                },
                resolve: {
                    drawData: function($stateParams) {
                        'ngInject';

                        return $stateParams.drawData;
                    },
                    ads: function () {
                        return {
                            0: {title: 'This is first advertisement'},
                            1: {title: 'This is second advertisement'},
                            2: {title: 'This is third advertisement'}
                        };
                    }
                }
            });
    }
}
