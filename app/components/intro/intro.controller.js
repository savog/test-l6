/**
 * Created by savo on 24.2.16..
 */

const DI = ['ads', 'drawData'];

export default class IntroController {
    constructor(ads, drawData) {
        this.ads = ads;
        this.drawData = drawData;
    }

}

IntroController.$inject = DI;