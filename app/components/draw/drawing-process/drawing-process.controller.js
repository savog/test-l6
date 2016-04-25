/**
 * Created by savo on 25.2.16..
 */

const DI = ['$state'];

export default class DrawingController {
    constructor($state) {
        this._$state = $state;
    }

    goToIntoPage(drawData) {
        this._$state.go('intro', {drawData: drawData});
    }

    goToHomePage() {
        this._$state.go('home');
    }

}

DrawingController.$inject = DI;