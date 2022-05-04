export const injectMap = new Map();
const injectServiceArray = [];
const singletonArray = [];
export function inject(injectClass) {
    return (target, key) => {
        // 判断注入的服务是否Injectable
        if (!injectServiceArray.includes(injectClass)) {
            console.error('service is not injectable', injectClass)
            injectServiceArray.push(injectClass);
        }
        if (!injectMap.has(target)) {
            injectMap.set(target, [])
        }
        const targetMapArray = injectMap.get(target);
        if (!targetMapArray.includes(key)) {
            targetMapArray.push(key);
        }
        Object.defineProperty(target, key, {
            get: () => {
                console.log('define', target, key)
                return getSingleton(injectClass);
            }
        })
    }
}

export function injectable(target) {
    console.log('injectable', target);
    injectServiceArray.push(target);
    getSingleton(target);
}

function getSingleton(injectClass) {
    for (const item of singletonArray) {
        if (item instanceof injectClass) {
            console.log('singleton', item)
            return item;
        }
    }
    console.log('singleton', singletonArray)
    const singleton = new injectClass();
    singletonArray.push(singleton)

    return singleton;
}


