/**
 * Created by savo on 24.2.16..
 */

import template from './draw.html!text';
import DrawController from './draw.controller';

export default function (module) {
    module.config(configure);

    function configure($stateProvider) {
        'ngInject';

        $stateProvider
            .state('draw', {
                template: template,
                controller: DrawController,
                controllerAs: 'vm',
                params: {
                    drawData: null
                },
                resolve: {
                    drawData: function($stateParams) {
                        'ngInject';

                        return $stateParams.drawData;
                    }
                }
            });
    }
}
