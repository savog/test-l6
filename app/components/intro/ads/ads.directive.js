/**
 * Created by savo on 25.2.16..
 */

import template from './ads.html!text';
import AdsController from './ads.controller.js';

const DI = ['prCfg', '$timeout', '$interval', '$state'];
export default class AdsDirective {
    constructor(prCfg, $timeout, $interval, $state) {
        this.restrict = 'E';
        this.template = template;
        this.controller = AdsController;
        this.controllerAs = 'vm';
        this.bindToController = true;
        this.scope = {
            ads: '=prAds',
            drawData: '=prDrawData'
        };
        this._prCfg = prCfg;
        this._$timeout = $timeout;
        this._$interval = $interval;
        this._$state = $state;
    }

    link(scope, element) {
        this.vm = scope.vm;
        this.drawData = this.vm.drawData;

        let start = new Date().getTime();
        let changeAdsInterval;

        let totalIntroTime = prCfg.countDownTime;

        this.vm.countDownTime = prCfg.countDownTime;
        if (this.drawData && this.drawData.seconds_to_next_draw !== null) {
            this.vm.countDownTime = this.drawData.seconds_to_next_draw;
        }

        let endTime = this.vm.countDownTime;
        let elapsedTime = totalIntroTime - endTime;

        let timePerAd = totalIntroTime / 7;
        let currentAd = Math.ceil(elapsedTime / timePerAd);
        let timeToNextAd = currentAd * timePerAd - elapsedTime;

        angular.element(element[0].querySelector(`.position-${currentAd}`)).css('display', 'block');

        this._$timeout(() => {
            currentAd++;
            angular.element(element[0].querySelectorAll('.lucky6-games-intro')).css('display', 'none');
            angular.element(element[0].querySelector(`.position-${currentAd}`)).css('display', 'block');

            changeAdsInterval = this._$interval(() => {
                currentAd++;
                console.log(angular.element(element[0].querySelectorAll('.lucky6-games-intro')));
                angular.element(element[0].querySelectorAll('.lucky6-games-intro')).css('display', 'none');
                angular.element(element[0].querySelector(`.position-${currentAd}`)).css('display', 'block');
            }, timePerAd * 1000);
        }, timeToNextAd * 1000);

        //console.log('count down time', this.countDownTime);
        this.vm.countDownTime--; // Reduce by one second to show 00:00 time

        let countDownInterval = this._$interval(() => {
            if (this.vm.countDownTime > 0) {
                this.vm.countDownTime--;
            }
        }, 1000);

        this._$timeout(() => {
            if (angular.isDefined(countDownInterval)) {
                this._$interval.cancel(countDownInterval);
                countDownInterval = undefined;
            }

            if (angular.isDefined(changeAdsInterval)) {
                this._$interval.cancel(changeAdsInterval);
                changeAdsInterval = undefined;
            }

            let elapsed = new Date().getTime() - start;
            console.log('Intro total time', elapsed);

            this._$state.go('home');
        }, endTime * 1000);


        if (!Date.now)Date.now = function () {
            return (new Date).getTime()
        };
        (function () {
            var n = ["webkit", "moz"];
            for (var e = 0; e < n.length && !window.requestAnimationFrame; ++e) {
                var i = n[e];
                window.requestAnimationFrame = window[i + "RequestAnimationFrame"];
                window.cancelAnimationFrame = window[i + "CancelAnimationFrame"] || window[i + "CancelRequestAnimationFrame"]
            }
            if (/iP(ad|hone|od).*OS 6/.test(window.navigator.userAgent) || !window.requestAnimationFrame || !window.cancelAnimationFrame) {
                var a = 0;
                window.requestAnimationFrame = function (n) {
                    var e = Date.now();
                    var i = Math.max(a + 16, e);
                    return setTimeout(function () {
                        n(a = i)
                    }, i - e)
                };
                window.cancelAnimationFrame = clearTimeout
            }
        })();

        var totalTime = this.vm.countDownTime,
            currentTime = totalTime,
            percentTime = null,
            timerId = null,
            timerText = angular.element(element[0].querySelector('.text')),
            timerCircle = angular.element(element[0].querySelector('.circle'));

        timerId = function () {
            if (currentTime === -1) {
                return;
            }
            timerText.text(currentTime);
            percentTime = Math.round((currentTime / totalTime) * 100);
            timerCircle.css('strokeDashoffset', percentTime - 100);

            setTimeout(function () {
                timerText.text(currentTime);
                currentTime -= 1;
                requestAnimationFrame(timerId);
            }, 1000);
        };
        timerId();
    }

    static register(module) {
        module.directive('prIntroAds', AdsDirective);
    }
}

AdsDirective.$inject = DI;
