/**
 * Created by savo on 24.2.16..
 */

const DI = ['drawData'];

export default class DrawController {
    constructor(drawData) {
        this.drawData = drawData;
    }
}

DrawController.$inject = DI;