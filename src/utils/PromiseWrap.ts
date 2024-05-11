export function WrapCallback(fn: Function, bindTo: any) {
    return function(...args: any[]){
        return new Promise<any[]>((resolve, reject)=>{
            function callback(...callbackArgs: any[]){
                resolve(callbackArgs);
            }
            fn.call(bindTo, ...args, callback);
        });
    }
}