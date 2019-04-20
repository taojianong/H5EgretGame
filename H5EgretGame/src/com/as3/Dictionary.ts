/**
* 对象存储器,可根据字符名称和对象作为标签名来存储的数据.
* 建议"get"一次后缓存好数据不要频繁使用"get对象key","字符key"不影响
* 支持用对象作为key存储数据.
* @author clong 2019.4.20
*/
module flash {

    /**
     * 数据字典
     */
    export class Dictionary {
        public static hashCode: number = 0;
        public static HASCODE_NAME: string = "____hashCode";
        /**字典计数器*/
        private _count: number = 0;
        /**字符索引对象*/
        private _maps: Object;

        public get map(): Object {
            return this._maps;
        }
        /**hashCode索引对象*/
        private _hashMaps: Object;

        private _objectMaps: Object;

        public constructor(weak?: boolean) {

            this._maps = {};
            this._hashMaps = {};
            this._objectMaps = {};
        }

        /**
         * 添加指定类型的数据
         * @param key 可以是对象、字符、数字
         * @param data 任何类型
         */
        public setItem(key: any, data: any): void {
            
            if (typeof key === "string" || typeof key === "number") {
                if (!this._maps[key]) {
                    this._count++;
                }
                this._maps[key] = data;
            } else if (key instanceof egret.HashObject) {
                if (!this._hashMaps[key.hashCode]) {
                    this._count++;
                }
                this._hashMaps[key.hashCode] = [key, data];
            } else {                
                if( !key ){
                    egret.error("key can not null.");
                    return;
                }
                if (!key.hasOwnProperty(Dictionary.HASCODE_NAME)) {
                    key[Dictionary.HASCODE_NAME] = Dictionary.hashCode;
                    Dictionary.hashCode++;
                }
                this._objectMaps[key[Dictionary.HASCODE_NAME]] = [key, data];
                this._count++;
            }
        }
        /**
         * 删除指定类型的全部数据
         * @param key  可以是对象、字符、数字
         */
        public delItem(key: any): void {
            let index: number;
            if (typeof key === "string" || typeof key === "number") {
                if (this._maps[key]) {
                    delete this._maps[key];
                    this._count--;
                }
            } else if (key instanceof egret.HashObject) {
                if (this._hashMaps[key.hashCode]) {
                    delete this._hashMaps[key.hashCode];
                    this._count--;
                }
            } else {
                if (key && key.hasOwnProperty(Dictionary.HASCODE_NAME)) {
                    if (this._objectMaps[key[Dictionary.HASCODE_NAME]]) {
                        delete this._objectMaps[key[Dictionary.HASCODE_NAME]];
                        this._count--;
                    }
                }
            }
        }
        /**
         * 获取存储中的数据,对象作为key实际上需要进行遍历索引，所以在同一个字典中尽量不要添加过多的key会影响性能,
         * 建议get一次后缓存好数据不要频繁使用get对象key,字符key不影响
         * @param key 可以是对象、字符、数字
         * @return
         */
        public getItem(key: any): any {
            if (typeof key === "string" || typeof key === "number") {
                if (this._maps[key] == null || this._maps[key] == undefined) {
                    return null;
                }
                return this._maps[key];
            } else if (key instanceof egret.HashObject) {
                if (!this._hashMaps[key.hashCode]) {
                    return null;
                }
                return this._hashMaps[key.hashCode][1];
            } else {
                if (key && key.hasOwnProperty(Dictionary.HASCODE_NAME)) {
                    if (this._objectMaps[key[Dictionary.HASCODE_NAME]])
                        return this._objectMaps[key[Dictionary.HASCODE_NAME]][1];
                    else
                        return null;
                }else{
                    return null;
                } 
            }
        }
        /**
         * 检查是否有该类型的数据存在
         * @param key 可以是对象、字符、数字
         * @return
         */
        public hasOwnProperty(key: any): boolean {
            if (typeof key === "string" || typeof key === "number") {
                return this._maps[key] ? true : false;
            } else if (key instanceof egret.HashObject) {
                return this._hashMaps[key.hashCode] ? true : false;
            } else {
                if (key.hasOwnProperty(Dictionary.HASCODE_NAME)) {
                    return this._objectMaps[key[Dictionary.HASCODE_NAME]] ? true : false;
                }
                else
                    return false;
            }
        }

        /**
         *  获取字典中储存数据的个数
         *
         */
        public get length(): number {

            return this._count;
        }

        /**
         * 对字典中的每一项执行函数，用该函数可以省去for循环，
         * 允许回调函数中删除当前正在执行的key，
         * 但是删除字典中的其他key可能会出现少遍历或重复遍历的情况.
         */
        public forEach(callback: (key: any, data: any, ...args) => void, thisObject: any, ...args): void {
            let name, arr;
            for (name in this._maps) {
                callback.call(thisObject, name, this._maps[name], args);
            }
            for (name in this._hashMaps) {
                arr = this._hashMaps[name];
                callback.apply(thisObject, [arr[0], arr[1], args]);
            }
            for (name in this._objectMaps) {
                callback.call(thisObject, this._objectMaps[name][0], this._objectMaps[name][1], args);
            }
        }

        /**
         *  获取字典中储存key和data的队列
         *
         */
        public get elements(): Array<{ key: any; data: any }> {
            let _list: Array<{ key: any; data: any }> = [];
            let name, arr;
            for (name in this._maps) {
                _list.push({ key: name, data: this._maps[name] });
            }
            for (name in this._hashMaps) {
                arr = this._hashMaps[name];
                _list.push({ key: arr[0], data: arr[1] });
            }
            for (name in this._objectMaps) {
                _list.push({ key: this._objectMaps[name][0], data: this._objectMaps[name][1] });
            }
            return _list;
        }
        /**
         *  获取字典中储存key队列
         *
         */
        public get keys(): Array<any> {
            let _list: Array<{ key: any; data: any }> = [];
            let name;
            for (name in this._maps) {
                _list.push(name);
            }
            for (name in this._hashMaps) {
                _list.push(this._hashMaps[name][0]);
            }
            for (name in this._objectMaps) {
                _list.push(this._objectMaps[name][0]);
            }
            return _list;
        }

        /**获取字典中储存data的队列*/
        public get datum(): Array<any> {
            let _list: Array<{ key: any; data: any }> = [];
            let name;
            for (name in this._maps) {
                _list.push(this._maps[name]);
            }
            for (name in this._hashMaps) {
                _list.push(this._hashMaps[name][1]);
            }
            for (name in this._objectMaps) {
                _list.push(this._objectMaps[name][1]);
            }
            return _list;
        }

        /**删除字典中的所有数据*/
        public reset(): void {
            this._maps = {};
            this._hashMaps = {};
            this._objectMaps = {};
            this._count = 0;
        }

        /**
         * 字典释放
         */
        public dispose():void{

            this._maps = null;
            this._hashMaps = null;
            this._objectMaps = null;
            this._count = 0;
        }
        
        /**
         *  打印字典中的所有数据
         */
        public dump(): void {
            let name, arr;
            for (name in this._maps) {
                console.log("key:", name, "---> data:", this._maps[name]);
            }
            for (name in this._hashMaps) {
                arr = this._hashMaps[name];
                console.log("key:", arr[0], "---> data:", arr[1]);
            }
            for (name in this._objectMaps) {
                arr = this._objectMaps[name];
                console.log("key:", arr[0], "---> data:", arr[1]);
            }
        }
    }
}