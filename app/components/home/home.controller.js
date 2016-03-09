/**
 * Created by savo on 24.2.16..
 */

const DI = ['drawData', '$state'];

export default class HomeController {
    constructor(drawData, $state) {
        this.drawData = drawData.data;
        console.log(drawData.data);

        if (this.drawData.seconds_to_next_draw === null) {
            $state.go('draw', {
                drawData: this.drawData
            });
        } else {
            $state.go('intro', {
                drawData: this.drawData
            });
        }
    }
}

HomeController.$inject = DI;