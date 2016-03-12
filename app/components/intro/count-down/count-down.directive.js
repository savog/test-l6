/**
 * Created by savo on 25.2.16..
 */

import template from './count-down.html!text';
import AdsController from './count-down.controller';

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

        let totalIntroTime = this._prCfg.countDownTime;

        this.countDownTime = this._prCfg.countDownTime;
        if (this.drawData && this.drawData.seconds_to_next_draw !== null) {
            this.countDownTime = this.drawData.seconds_to_next_draw;
        }

        let remainingTime = this.countDownTime;
        let elapsedTime = totalIntroTime - remainingTime;

        let timePerAd = totalIntroTime / 7;
        let currentAd = Math.ceil(elapsedTime / timePerAd) + 1;
        let timeToNextAd = currentAd * timePerAd - elapsedTime;

        let adEl = angular.element(element[0].querySelector(`.lucky6-games-intro`));
        adEl.attr('src', `assets/images/intro/bingo_intro_screen_${currentAd}.gif`);
        adEl.css('display', `block`);
        this.preLoadNextImage(currentAd + 1);

        this._$timeout(() => {
            currentAd++;
            //angular.element(element[0].querySelectorAll('.lucky6-games-intro')).css('display', 'none');
            //angular.element(element[0].querySelector(`.position-${currentAd}`)).css('display', 'block');
            adEl.attr('src', `assets/images/intro/bingo_intro_screen_${currentAd}.gif`);
            this.preLoadNextImage(currentAd + 1);

            changeAdsInterval = this._$interval(() => {
                currentAd++;
                //angular.element(element[0].querySelectorAll('.lucky6-games-intro')).css('display', 'none');
                //angular.element(element[0].querySelector(`.position-${currentAd}`)).css('display', 'block');
                adEl.attr('src', `assets/images/intro/bingo_intro_screen_${currentAd}.gif`);
                this.preLoadNextImage(currentAd + 1);
            }, timePerAd * 1000);
        }, timeToNextAd * 1000);

        //console.log('count down time', this.countDownTime);
        this.countDownTime--; // Reduce by one second to show 00:00 time

        let timerText = angular.element(element[0].querySelector('.counter'));
        if (this.countDownTime >= 0) {
            timerText.text(this.countDownTimer(this.countDownTime));
        }

        let countDownInterval = this._$interval(() => {
            if (this.countDownTime > 0) {
                this.countDownTime--;
                if (this.countDownTime >= 0) {
                    timerText.text(this.countDownTimer(this.countDownTime));
                    if (this.countDownTime <= 10) {
                        timerText.addClass('last-seconds');
                    }
                }
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
            //console.log('Intro total time', elapsed);

            this._$state.go('home');
        }, remainingTime * 1000);

        //this.animateCountDownCircle(remainingTime, totalIntroTime, element);
    }

    /*
        This is snippet code from stack-overflow
     */
    //animateCountDownCircle(remainingTime, totalIntroTime, element) {
    //    (function () {
    //        var n = ["webkit", "moz"];
    //        for (var e = 0; e < n.length && !window.requestAnimationFrame; ++e) {
    //            var i = n[e];
    //            window.requestAnimationFrame = window[i + "RequestAnimationFrame"];
    //            window.cancelAnimationFrame = window[i + "CancelAnimationFrame"] || window[i + "CancelRequestAnimationFrame"]
    //        }
    //        if (/iP(ad|hone|od).*OS 6/.test(window.navigator.userAgent) || !window.requestAnimationFrame || !window.cancelAnimationFrame) {
    //            var a = 0;
    //            window.requestAnimationFrame = function (n) {
    //                var e = Date.now();
    //                var i = Math.max(a + 16, e);
    //                return setTimeout(function () {
    //                    n(a = i)
    //                }, i - e)
    //            };
    //            window.cancelAnimationFrame = clearTimeout
    //        }
    //    })();
    //
    //    var totalTime = totalIntroTime,
    //        currentTime = remainingTime,
    //        percentTime = null,
    //        timerId = null,
    //        timerText = angular.element(element[0].querySelector('.text')),
    //        timerCircle = angular.element(element[0].querySelector('.circle'));
    //
    //    timerId = () => {
    //        if (currentTime < 0) {
    //            return;
    //        }
    //
    //        if (currentTime > 0) {
    //            currentTime -= 1;
    //            timerText.text(this.countDownTimer(currentTime));
    //        }
    //
    //        percentTime = Math.round((currentTime / totalTime) * 100);
    //        timerCircle.css('strokeDashoffset', percentTime - 100);
    //
    //        setTimeout(() => {
    //            requestAnimationFrame(timerId);
    //        }, 1000);
    //    };
    //    timerId();
    //}

    countDownTimer(time) {
        let minutes = Math.floor(time / 60);
        let seconds = time % 60;

        minutes = minutes < 10 ? '0' + minutes : minutes;
        seconds = seconds < 10 ? '0' + seconds : seconds;

        return minutes + ':' + seconds;
    }

    preLoadNextImage(number) {
        if (number <= 7) {
            let image = new Image();
            image.src = `assets/images/intro/bingo_intro_screen_${number}.gif`;
        }
    }

    static register(module) {
        module.directive('prIntroAds', AdsDirective);
    }
}

AdsDirective.$inject = DI;
