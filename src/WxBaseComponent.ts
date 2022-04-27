const bindMap = new WeakMap();

export function observable(data, _class) {
    for (const item in data) {
        Object.defineProperty(data, item, {
            set: (value) => {
                const bindArray = bindMap.get(_class);
                console.log(_class, bindMap, bindArray)
                if (bindArray && bindArray.length > 0) {
                    for (const bindItem of bindArray) {
                        console.log('item setdata', item)
                        bindItem.setData(item, value);
                    }
                    return value;
                }
                return value;
            }
        })
    }
    return data;
}

export class WxBaseComponent {
    constructor(_class) {
        const componentObj =  new _class();
        for(const injectItem of componentObj.binding) {
            const service = injectItem.src()
            const serviceClass = service.__proto__.constructor;
            console.log('service bind', service.__proto__.constructor)
            let bindArray = bindMap.get(serviceClass);
            if(!bindArray || !bindArray.length) {
                bindMap.set(serviceClass, []);
                bindArray = bindMap.get(serviceClass);
            }
            console.log('bind array', bindArray)
            bindArray.push(componentObj);
        }
        componentObj.setData = (item, data) => {
            console.log('set data successfully', `change ${item} to ${data}`)
        }
        return componentObj;
    }
}