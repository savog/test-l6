/**
 * Created by savo on 25.2.16..
 */

const DI = ['$state'];

export default class DrawingController {
    constructor($state) {
        this._$state = $state;
    }

    goToIntoPage() {
        this._$state.go('intro');
    }

    goToHomePage() {
        this._$state.go('home');
    }

}

DrawingController.$inject = DI;