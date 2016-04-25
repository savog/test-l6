/**
 * Created by savo on 25.2.16..
 */
import _ from 'lodash';

import template from './drawing-process.html!text';
import DrawingController from './drawing-process.controller.js';

const DI = ['prCfg', '$timeout', '$interval', '$state'];
export default class DrawingDirective {
    constructor(prCfg, $timeout, $interval, $state) {
        this.restrict = 'E';
        this.template = template;
        this.controller = DrawingController;
        this.controllerAs = 'vm';
        this.bindToController = true;
        this.scope = {
            drawData: '=prDrawData'
        };
        this._prCfg = prCfg;
        this._$timeout = $timeout;
        this._$interval = $interval;
        this._$state = $state;
    }

    static register(module) {
        module.directive('prLucky6Drawing', DrawingDirective);
    }

    link(scope, element) {
        this.vm = scope.vm;
        this.drawData = this.vm.drawData;

        if (this.drawData === null || (this.drawData && this.drawData.seconds_from_last_draw === null)) {
            this._$state.go('home');
        } else {
            this.initialElapsedTime = this.drawData.seconds_from_last_draw;

            //console.log('elapsed time', this.initialElapsedTime);

            this.containerEl = element;
            this.vm.numOfEvenNumbers = 0;
            this.vm.numOfOddNumbers = 0;
            this.vm.sumFirst5Numbers = 0;
            this.vm.numOfBallsPerColor = angular.copy(this._prCfg.numOfBallsPerColor);

            this.start = new Date().getTime();

            this.numbers = this.drawData.numbers;

            let clovers = this.drawData.clovers;
            if (clovers) {
                clovers.forEach((val) => {
                    let cloverEl = angular.element(this.containerEl[0].querySelector(`#clover-${val}`));
                    cloverEl.css('visibility', 'visible');
                });
            }

            let cashBackPosition = this.drawData['cashback_number'];
            if (cashBackPosition) {
                let cashBackEl = angular.element(this.containerEl[0].querySelector(`#return-${cashBackPosition}`));
                cashBackEl.css('visibility', 'visible');
            }

            let drawingDelay = this.checkStartDrawingDelay();
            if (drawingDelay > 0) {
                //console.log('Delay je ', drawingDelay);
                this._$timeout(() => {
                    //this.drawBall(0);
                    this.continuesDrawing(0);
                }, (drawingDelay) * 1000);
            } else {
                let alreadyTakenNumbers = this.getAlreadyTakenBalls();
                let timeToNextBall = this.getTimeToNextBall();
                let nextBallPosition = this.getNextBallPosition();

                alreadyTakenNumbers.forEach((number, position) => {
                    this.drawBall(position);
                });

                if (alreadyTakenNumbers.length >= this.numbers.length) {
                    this.showDailyJackpot();
                } else {
                    this.dailyJackpotInterval = this._$interval(() => {
                        this.dailyJackpotShuffle(nextBallPosition);
                    }, 30);
                }

                if (alreadyTakenNumbers.length < this.numbers.length) {
                    this._$timeout(() => {
                        //this.drawBall(nextBallPosition);
                        this.continuesDrawing(nextBallPosition);
                    }, timeToNextBall * 1000);
                }
            }

            this.showJackpotsValue();
            this.scheduleEndDrawing();
        }
    }

    checkStartDrawingDelay() {
        let delay = 0;

        if (this.initialElapsedTime < this._prCfg.delayBeforeDraw) {
            delay = this._prCfg.delayBeforeDraw - this.initialElapsedTime;
        }

        return delay;
    }

    getAlreadyTakenBalls() {
        let numOfDrawnBalls = Math.floor(this.initialElapsedTime / this._prCfg.timePerBall) + 1;
        //console.log('vec izvuceno loptica', numOfDrawnBalls);

        return angular.copy(this.numbers).splice(0, numOfDrawnBalls);
    }

    getTimeToNextBall() {
        let numOfDrawnBalls = this.getAlreadyTakenBalls().length;
        let timeForNextBall = numOfDrawnBalls * this._prCfg.timePerBall - this.initialElapsedTime;
        //console.log('vreme do sledece kuglice', timeForNextBall);
        return timeForNextBall;
    }

    getNextBallPosition() {
        return Math.floor(this.initialElapsedTime / this._prCfg.timePerBall) + 1;
    }

    drawBall(position) {
        //let currentEl = angular.element(containerEl[0].querySelector(`.position-${position}`));
        let number = this.numbers[position];
        let colorName = this._prCfg.colors[number];
        let colorStyle = `ball-${colorName}`;

        this.showCurrentBall(position, number, colorStyle);
        this.showFirstBall(position, number, colorStyle);
        this.showFirst5Balls(position, number);
        this.showEvenOddBar(number);
        this.showMostColors(colorName);
    }

    showCurrentBall(position, number, colorStyle) {
        let ballWrapEl = angular.element(this.containerEl[0].querySelector(`.position-${position}`));
        let ballCircleEl = angular.element(this.containerEl[0].querySelector(`.position-${position} .ball-color`));
        let ballTextEl = angular.element(this.containerEl[0].querySelector(`.position-${position} text`));

        ballCircleEl.css('fill', `url(#${colorStyle})`);
        ballTextEl.text(number);
        ballWrapEl.css('display', 'block');
    }

    showFirstBall(position, number, colorStyle) {
        if (position === 0) {
            let firstBallWrapEl = angular.element(this.containerEl[0].querySelector('#first-num-ball'));
            let firstBallEl = angular.element(this.containerEl[0].querySelector('#first-num-ball text'));
            let firstBallCircleEl = angular.element(this.containerEl[0].querySelector('#first-num-ball circle'));

            firstBallEl.text(number);
            firstBallWrapEl.css('display', 'block');
            firstBallCircleEl.css('fill', `url(#${colorStyle})`);

            if (number > 24.5) {
                angular.element(this.containerEl[0].querySelector('#fist-num-over')).addClass('active-green');
            } else {
                angular.element(this.containerEl[0].querySelector('#fist-num-under')).addClass('active-green');
            }
        }
    }

    showFirst5Balls(position, number) {
        if (position >= 0 && position < 5) {
            this.vm.sumFirst5Numbers += number;
            let sumFirst5NumbersEl = angular.element(this.containerEl[0].querySelector('#sum5 .sum5-value'));
            sumFirst5NumbersEl.text(this.vm.sumFirst5Numbers);
            sumFirst5NumbersEl.css('display', 'block');
        }

        if (position >= 4) {
            if (this.vm.sumFirst5Numbers > 122.5) {
                angular.element(this.containerEl[0].querySelector('#sum5-over')).addClass('active-green');
            } else {
                angular.element(this.containerEl[0].querySelector('#sum5-under')).addClass('active-green');
            }
        }
    }

    showEvenOddBar(number) {
        number % 2 === 0 ? this.vm.numOfEvenNumbers++ : this.vm.numOfOddNumbers++;

        let evenEls = angular.element(this.containerEl[0]
            .querySelector(`#even-bars > :nth-child(${this.vm.numOfEvenNumbers})`));
        evenEls.removeClass('bar-default');
        evenEls.addClass('even');

        let oddEls = angular.element(this.containerEl[0]
            .querySelector(`#odd-bars > :nth-child(${this.vm.numOfOddNumbers})`));
        oddEls.removeClass('bar-default');
        oddEls.addClass('odd');
    }

    showMostColors(colorName) {
        this.vm.numOfBallsPerColor[colorName]++;
        Object.keys(this.vm.numOfBallsPerColor).forEach((color) => {
            let num = this.vm.numOfBallsPerColor[color];

            let colorEls = angular.element(this.containerEl[0]
                .querySelector(`#color-bars-${color} > :nth-last-child(${num})`));
            colorEls.css('fill', `url(#bar-${color})`);
        });
    }

    continuesDrawing(position) {
        this.animateDrum(position);

        this.drawingInterval = this._$interval(() => {
            this.drawBall(position);
            position++;
            //
            //if (position > this.numbers.length) {
            //    this.stopDrawing();
            //}


            if (position > this.numbers.length - 1) {
                this._$interval.cancel(this.drawingInterval);
                this.drawingInterval = undefined;
                this.cancelDailyJackpotInterval();
            } else {
                this.animateDrum(position);
                this.cancelDailyJackpotInterval();
                this.dailyJackpotInterval = this._$interval(() => {
                    this.dailyJackpotShuffle(position);
                }, 30);
            }

        }, this._prCfg.timePerBall * 1000);

    }

    animateDrum(position) {
        let bulbs = angular.element(this.containerEl[0].querySelector('#bulbs'));
        bulbs.attr('xlink:href', '/assets/images/bulbs.gif');
        bulbs.css('visibility', 'visible');

        let num = this.numbers[position];
        this.preLoadBallImage(num);

        this._$timeout(() => {
            bulbs.css('visibility', 'hidden');
            this.animateCurrentBallInDrum(position);
        }, this._prCfg.bulbsAnimationTime * 1000);
    }

    animateCurrentBallInDrum(position) {
        let number = this.numbers[position];
        let currentBallEl = angular.element(this.containerEl[0].querySelector('#draw'));
        currentBallEl.attr('xlink:href', `/assets/images/balls/${number}.gif`);
        currentBallEl.css('visibility', 'visible');
        let nextNum = this.numbers[position + 1];
        this.preLoadBallImage(nextNum);

        this._$timeout(() => {
            currentBallEl.css('visibility', 'hidden');
        }, this._prCfg.ballAnimationTime * 1000);
    }

    preLoadBallImage(number) {
        if (number) {
            let image = new Image();
            image.src = `/assets/images/balls/${number}.gif`;
        }
    }

    scheduleEndDrawing() {
        if (angular.isDefined(this.drawingInterval)) {
            this._$interval.cancel(this.drawingInterval);
            this.drawingInterval = undefined;
        }

        this._$timeout(() => {
            this.vm.goToIntoPage();
            this.cancelDailyJackpotInterval();
            let elapsed = new Date().getTime() - this.start;
            //console.log('total time', elapsed);
            //this.vm.goToHomePage();
        }, (this._prCfg.totalDrawingTime - this.initialElapsedTime) * 1000);
    }

    cancelDailyJackpotInterval() {
        if (angular.isDefined(this.dailyJackpotInterval)) {
            this._$interval.cancel(this.dailyJackpotInterval);
            this.dailyJackpotInterval = undefined;
        }
    }

    dailyJackpotShuffle(position) {
        if (position > 24) {
            let alreadyTakenChars = 0;
            switch (position) {
                case 27: case 28:
                    alreadyTakenChars = 1; break;
                case 29: case 30:
                    alreadyTakenChars = 2; break;
                case 31: case 32:
                    alreadyTakenChars = 3; break;
                case 33: case 34:
                    alreadyTakenChars = 4; break;
                case 35:
                    alreadyTakenChars = 5; break;
            }
            let dailyJackpotWrapEl = angular.element(this.containerEl[0].querySelector('#ticket-code'));

            for (let k = 0; k < alreadyTakenChars; k++) {
                let m = angular.element(dailyJackpotWrapEl[0].children[k]);
                let char = this.drawData.daily_jackpot.code[k];
                m.text(char);
            }

            for (let i = alreadyTakenChars; i < dailyJackpotWrapEl[0].children.length; i++) {
                let el = angular.element(dailyJackpotWrapEl[0].children[i]);
                el.text(_.sample(this._prCfg.jackpotCodeCharacters));
            }
        }
    }

    showDailyJackpot() {
        this.cancelDailyJackpotInterval();
        let dailyJackpotWrapEl = angular.element(this.containerEl[0].querySelector('#ticket-code'));

        for (var k = 0; k < this.drawData.daily_jackpot.code.length; k++) {
            let el = angular.element(dailyJackpotWrapEl[0].children[k]);
            let char = this.drawData.daily_jackpot.code[k];
            el.text(char);
        }
    }

    showJackpotsValue() {
        let dEl = angular.element(this.containerEl[0].querySelector('#dnevni_jackpot text'));
        let mEl = angular.element(this.containerEl[0].querySelector('#master_jackpot text'));

        dEl.text(this.drawData.daily_jackpot.value.formatMoney(2, ',', '.'));
        mEl.text(this.drawData.jackpot.formatMoney(2, ',', '.'));
    }

    //stopDrawing() {
    //    if (angular.isDefined(this.drawingInterval)) {
    //        this._$interval.cancel(this.drawingInterval);
    //        this.drawingInterval = undefined;
    //
    //        let elapsed = new Date().getTime() - this.start;
    //        console.log('ukupno vreme trajanja animacije', elapsed);
    //
    //        // if delay time exist don't add any seconds or add all predicted time for delay
    //        let delayDiff = this.checkStartDrawingDelay() > 0 ? 0 : this._prCfg.delayBeforeDraw;
    //        console.log('vreme trajanja rezultata', this._prCfg.displayedResultsTime + delayDiff);
    //
    //        this._$timeout(() => {
    //            this.vm.goToIntoPage();
    //            let elapsed = new Date().getTime() - this.start;
    //            console.log('total time', elapsed);
    //            //this.vm.goToHomePage();
    //        }, (this._prCfg.displayedResultsTime + delayDiff) * 1000);
    //    }
    //}
    //
    //displayResult() {
    //    let remainingTime = this._prCfg.totalDrawingTime - this.drawData.seconds_from_last_draw;
    //    this._$timeout(() => {
    //        let elapsed = new Date().getTime() - this.start;
    //        console.log('total time', elapsed);
    //        this.vm.goToIntoPage();
    //        //this.vm.goToHomePage();
    //    }, remainingTime * 1000);
    //}
}

DrawingDirective.$inject = DI;
