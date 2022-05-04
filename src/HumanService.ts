import { injectable } from './inject';
import { observable } from './WxBaseComponent';


export class HumanService {
    data = observable({
        name: 'tom'
    }, HumanService);

    dataPublish(name) {
        console.log('publish', name)
        this.data.name = name;
    }
}