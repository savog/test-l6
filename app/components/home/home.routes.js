/**
 * Created by savo on 24.2.16..
 */

import HomeController from './home.controller';

export default function (module) {
    module.config(configure);

    function configure($stateProvider) {
        'ngInject';

        $stateProvider
            .state('home', {
                url: '/',
                controller: HomeController,
                controllerAs: 'vm',
                resolve: {
                    drawData: function ($http) {
                        'ngInject';

                        return $http({method: 'POST', url: 'svc2/bingomaster/last_draw'});

                        // Mock data
                        let randomTime = Math.floor(Math.random() * (50 - 1 + 1)) + 1;
                        return {
                            data: {
                                daily_jackpot: {
                                    city: 'BAR',
                                    value: 152.2,
                                    code: '7KB5T',
                                    issued: false,
                                    address: 'Cafe RELAX'
                                },
                                last_daily_jackpot: {
                                    code: 'DJN5V',
                                    draw_id: 117696,
                                    address: 'Cafe RELAX',
                                    datetime: 1,
                                    city: 'BAR',
                                    value: 151.0
                                },

                                last_jackpot: {
                                    draw_id: 34173,
                                    text: 'Izvucen je JACKPOT <br />u mjestu Bulevar Svetog Petra Cetinjskog 1, ' +
                                    'Podgorica <br /> u vrijednosti od <span class=\'jackpot_notif_highlight\'>' +
                                    '1541.20</span>'
                                },
                                previous_draw_jackpot: 5895.2,
                                jackpot: 5895.25,
                                seconds_to_next_draw: 55,
                                clovers: [17, 26],
                                status: 'ok',
                                seconds_from_last_draw: 0,  // na 180 sec je kraj kola,od tada je ova vrednost je null.
                                // Oko 120 sec prikazujes reklame i za to vreme je vrednost null jos uvek i
                                // cekas da ponovo bude 0, sto znaci da je novo izvlacenje pocelo
                                id: 117958,
                                numbers: [10, 47, 26, 41, 18, 34, 45, 9, 15, 46, 7, 29, 24, 33, 22,
                                    11, 44, 2, 8, 14, 17, 28, 4, 39, 36, 23, 38, 30, 35, 3, 13, 6, 43, 27, 32],
                                next_draw_time: '2016-02-24 13:55:00'
                            }
                        };
                    }
                }
            });
    }
}
