import { HumanService } from './HumanService';
import { WxBaseComponent } from './WxBaseComponent';
import { MainService } from './MainService';
import { inject } from './inject';

class HumanComponent {
    @inject(HumanService)humanService: HumanService;
    binding = [{
        src: () => this.humanService,
        keys: {
            name: () =>this.humanService.data.name
        }
    }]

    constructor() {
        console.log('component init');
    }
}

new WxBaseComponent(HumanComponent);
const main = new MainService();
console.log('main', main.publish)
main.publish()
