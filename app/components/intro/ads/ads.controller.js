/**
 * Created by savo on 25.2.16..
 */

const DI = ['prCfg', '$timeout', '$interval', '$state'];

export default class AdsController {
    constructor(prCfg, $timeout, $interval, $state) {
        //let start = new Date().getTime();
        //let changeAdsInterval;
        //
        //let totalIntroTime = prCfg.countDownTime;
        //
        //this.countDownTime = prCfg.countDownTime;
        //if (this.drawData && this.drawData.seconds_to_next_draw !== null) {
        //    this.countDownTime = this.drawData.seconds_to_next_draw;
        //}
        //
        //let endTime = this.countDownTime;
        //let elapsedTime = totalIntroTime - endTime;
        //
        ////console.log('proteklo vreme', elapsedTime);
        //
        //let timePerAd = totalIntroTime / 7;
        //let currentAd = Math.ceil(elapsedTime / timePerAd);
        //let timeToNextAd = currentAd * timePerAd - elapsedTime;
        //
        ////console.log('time per ad', timePerAd);
        ////console.log('current ad', currentAd);
        ////console.log('time to next ad', timeToNextAd);
        //
        //$timeout(() => {
        //    //console.log('menjam rekalmu prvi put');
        //
        //    changeAdsInterval = $interval(() => {
        //        //console.log('stavljam novu reklamu')
        //    }, timePerAd * 1000);
        //}, timeToNextAd * 1000);
        //
        //
        //
        //
        ////console.log('count down time', this.countDownTime);
        //this.countDownTime--; // Reduce by one second to show 00:00 time
        //
        //let countDownInterval = $interval(() => {
        //    if (this.countDownTime > 0) {
        //        this.countDownTime--;
        //    }
        //}, 1000);
        //
        //$timeout(() => {
        //    if (angular.isDefined(countDownInterval)) {
        //        $interval.cancel(countDownInterval);
        //        countDownInterval = undefined;
        //    }
        //
        //    if (angular.isDefined(changeAdsInterval)) {
        //        $interval.cancel(changeAdsInterval);
        //        changeAdsInterval = undefined;
        //    }
        //
        //    let elapsed = new Date().getTime() - start;
        //    //console.log('Intro total time', elapsed);
        //
        //    $state.go('home');
        //}, endTime * 1000);
    }
}

AdsController.$inject = DI;