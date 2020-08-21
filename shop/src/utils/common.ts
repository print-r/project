interface StringObject {
    [propName: string]: string;
}
type UrlParamsResult = string | StringObject;

export function handleDeep(target: any, methodName: string, descriptor: any): any {
    let method = descriptor.value;
    descriptor.value = function(...arg: any) {
      let flag = method.apply(this, arg);
      if (flag !== false) {
          this.list[arg[1]].data = Object.assign({}, JSON.parse(JSON.stringify(this.list[arg[1]].data)));
      }
   };
}

// 对象深拷贝
export function deep<T>(data: T): T {
    return Object.assign({}, JSON.parse(JSON.stringify(data)));
}

// 防抖
export function debounce(this: Vue, fn: () => void, delay: number = 200): () => void {
    let timer: any = null;
    return () => {
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
            fn.apply(this);
        }, delay);
    };
}

/**
 * rem
 * @param width [number] 当前计算的宽度
 */
export function handleSetRem(width?: number): void {
    /* 设计图文档宽度 */
    let docWidth = 750;
    let doc = window.document;
    let docEl = doc.documentElement;
    let resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
    let recalc = (function refreshRem() {
        let clientWidth: any = width || docEl.getBoundingClientRect().width;
        /* 8.55：小于320px不再缩小，11.2：大于420px不再放大 */
        docEl.style.fontSize = Math.max(Math.min(20 * (clientWidth / docWidth), 11.2), 8.55) * 5 + 'px';
        return refreshRem;
    })();
    
    /* 添加倍屏标识，安卓为1 */
    // @ts-ignore
    docEl.setAttribute('data-dpr', (window.navigator.appVersion.match(/iphone/gi) 
    ? window.devicePixelRatio 
    : 1).toString());
    
    if (/iP(hone|od|ad)/.test(window.navigator.userAgent)) {
        /* 添加IOS标识 */
        doc.documentElement.classList.add('ios');
        /* IOS8以上给html添加hairline样式，以便特殊处理 */
        if (parseInt((window as any).navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/)[1], 10) >= 8) {
            doc.documentElement.classList.add('hairline');
        }
    }
    if (!doc.addEventListener) {
        return;
    }
    window.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
}

/**
 * 获取url参数值，单个值直接传参数名，获取多个值以数组形式：[参数名，参数名]
 * @param name [string|array] 参数名
 * @return string | array
 */
export function getUrlParams(name: string | string[]): UrlParamsResult {
    let value: UrlParamsResult = '';
    let query = ((location.search || location.hash).match(/\?(.*)/) as string[])?.[1];
    if (query) {   
        let arr: string[] = [];
        let isArray = Array.isArray(name);
        if (isArray) {
            value = {};
        }
        query.split('&').forEach( (val: string) => {
            // 转数组
            arr = val.split('=');
            // 获取多个值
            if (isArray) {
                (name as []).forEach((item: string) => {
                    if (arr[0] === item) {
                        // @ts-ignore
                        value[arr[0]] = arr[1];
                    }
                });
            } else {
                if (arr[0] === name) {
                    value = arr[1];
                }
            }
        });
    }
    return value;
}

export function unload(event: any): void {
    event.returnValue = '';
}