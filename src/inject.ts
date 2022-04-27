export const injectMap = new Map();
const injectServiceArray = [];
const singletonArray = [];
export function inject(injectClass) {
    return (target, key) => {
        if (!injectServiceArray.includes(injectClass)) {
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


