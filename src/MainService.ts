import { inject } from './inject';
import { HumanService } from './HumanService';

export class MainService {
    @inject(HumanService) humanService: HumanService;
    publish = () => {
        console.log('startPublish')
        this.humanService.dataPublish('jerry');
    }
    constructor() {
        console.log('main init', this.publish);
    }
    
    
}
