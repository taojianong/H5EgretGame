var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
* 对象存储器,可根据字符名称和对象作为标签名来存储的数据.
* 建议"get"一次后缓存好数据不要频繁使用"get对象key","字符key"不影响
* 支持用对象作为key存储数据.
* @author clong 2019.4.20
*/
var flash;
(function (flash) {
    /**
     * 数据字典
     */
    var Dictionary = (function () {
        function Dictionary(weak) {
            /**字典计数器*/
            this._count = 0;
            this._maps = {};
            this._hashMaps = {};
            this._objectMaps = {};
        }
        Object.defineProperty(Dictionary.prototype, "map", {
            get: function () {
                return this._maps;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 添加指定类型的数据
         * @param key 可以是对象、字符、数字
         * @param data 任何类型
         */
        Dictionary.prototype.setItem = function (key, data) {
            if (typeof key === "string" || typeof key === "number") {
                if (!this._maps[key]) {
                    this._count++;
                }
                this._maps[key] = data;
            }
            else if (key instanceof egret.HashObject) {
                if (!this._hashMaps[key.hashCode]) {
                    this._count++;
                }
                this._hashMaps[key.hashCode] = [key, data];
            }
            else {
                if (!key) {
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
        };
        /**
         * 删除指定类型的全部数据
         * @param key  可以是对象、字符、数字
         */
        Dictionary.prototype.delItem = function (key) {
            var index;
            if (typeof key === "string" || typeof key === "number") {
                if (this._maps[key]) {
                    delete this._maps[key];
                    this._count--;
                }
            }
            else if (key instanceof egret.HashObject) {
                if (this._hashMaps[key.hashCode]) {
                    delete this._hashMaps[key.hashCode];
                    this._count--;
                }
            }
            else {
                if (key && key.hasOwnProperty(Dictionary.HASCODE_NAME)) {
                    if (this._objectMaps[key[Dictionary.HASCODE_NAME]]) {
                        delete this._objectMaps[key[Dictionary.HASCODE_NAME]];
                        this._count--;
                    }
                }
            }
        };
        /**
         * 获取存储中的数据,对象作为key实际上需要进行遍历索引，所以在同一个字典中尽量不要添加过多的key会影响性能,
         * 建议get一次后缓存好数据不要频繁使用get对象key,字符key不影响
         * @param key 可以是对象、字符、数字
         * @return
         */
        Dictionary.prototype.getItem = function (key) {
            if (typeof key === "string" || typeof key === "number") {
                if (this._maps[key] == null || this._maps[key] == undefined) {
                    return null;
                }
                return this._maps[key];
            }
            else if (key instanceof egret.HashObject) {
                if (!this._hashMaps[key.hashCode]) {
                    return null;
                }
                return this._hashMaps[key.hashCode][1];
            }
            else {
                if (key && key.hasOwnProperty(Dictionary.HASCODE_NAME)) {
                    if (this._objectMaps[key[Dictionary.HASCODE_NAME]])
                        return this._objectMaps[key[Dictionary.HASCODE_NAME]][1];
                    else
                        return null;
                }
                else {
                    return null;
                }
            }
        };
        /**
         * 检查是否有该类型的数据存在
         * @param key 可以是对象、字符、数字
         * @return
         */
        Dictionary.prototype.hasOwnProperty = function (key) {
            if (typeof key === "string" || typeof key === "number") {
                return this._maps[key] ? true : false;
            }
            else if (key instanceof egret.HashObject) {
                return this._hashMaps[key.hashCode] ? true : false;
            }
            else {
                if (key.hasOwnProperty(Dictionary.HASCODE_NAME)) {
                    return this._objectMaps[key[Dictionary.HASCODE_NAME]] ? true : false;
                }
                else
                    return false;
            }
        };
        Object.defineProperty(Dictionary.prototype, "length", {
            /**
             *  获取字典中储存数据的个数
             *
             */
            get: function () {
                return this._count;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 对字典中的每一项执行函数，用该函数可以省去for循环，
         * 允许回调函数中删除当前正在执行的key，
         * 但是删除字典中的其他key可能会出现少遍历或重复遍历的情况.
         */
        Dictionary.prototype.forEach = function (callback, thisObject) {
            var args = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                args[_i - 2] = arguments[_i];
            }
            var name, arr;
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
        };
        Object.defineProperty(Dictionary.prototype, "elements", {
            /**
             *  获取字典中储存key和data的队列
             *
             */
            get: function () {
                var _list = [];
                var name, arr;
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
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Dictionary.prototype, "keys", {
            /**
             *  获取字典中储存key队列
             *
             */
            get: function () {
                var _list = [];
                var name;
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
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Dictionary.prototype, "datum", {
            /**获取字典中储存data的队列*/
            get: function () {
                var _list = [];
                var name;
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
            },
            enumerable: true,
            configurable: true
        });
        /**删除字典中的所有数据*/
        Dictionary.prototype.reset = function () {
            this._maps = {};
            this._hashMaps = {};
            this._objectMaps = {};
            this._count = 0;
        };
        /**
         * 字典释放
         */
        Dictionary.prototype.dispose = function () {
            this._maps = null;
            this._hashMaps = null;
            this._objectMaps = null;
            this._count = 0;
        };
        /**
         *  打印字典中的所有数据
         */
        Dictionary.prototype.dump = function () {
            var name, arr;
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
        };
        Dictionary.hashCode = 0;
        Dictionary.HASCODE_NAME = "____hashCode";
        return Dictionary;
    }());
    flash.Dictionary = Dictionary;
    __reflect(Dictionary.prototype, "flash.Dictionary");
})(flash || (flash = {}));
//# sourceMappingURL=Dictionary.js.map