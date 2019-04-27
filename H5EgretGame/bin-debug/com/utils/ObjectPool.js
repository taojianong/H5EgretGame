var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 对象池
 * @author clong 2019.4.27
 */
var ObjectPool = (function () {
    function ObjectPool(cls) {
        this._pool = [];
        this.isDisposed = false;
        this._cls = cls;
    }
    /**
     * 从池中拿对象
     * @param cls 类对象
     */
    ObjectPool.getObject = function (cls) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (!cls)
            return null;
        var clsName = egret.getQualifiedClassName(cls); // egret.getDefinitionByName( egret.getQualifiedClassName(cls) );
        var pool = ObjectPool._pool[clsName];
        if (pool == null) {
            pool = new ObjectPool(cls);
            ObjectPool._pool[clsName] = pool;
        }
        return pool.getObject(args);
    };
    /**
     * 回收对象
     * @param item 实例对象
     */
    ObjectPool.recoverObject = function (item) {
        if (!item)
            return null;
        var clsName = egret.getQualifiedClassName(item);
        var pool = ObjectPool._pool[clsName];
        if (pool == null) {
            var cls = egret.getDefinitionByName(clsName);
            pool = new ObjectPool(cls);
            ObjectPool._pool[clsName] = pool;
        }
        pool.recoverObject(item);
    };
    ObjectPool.prototype.getObject = function (args) {
        var obj = this._pool.shift();
        if (obj == null) {
            obj = new this._cls();
        }
        if (egret.is(obj, "IPool")) {
            obj.create.apply(obj, args);
        }
        return obj;
    };
    ObjectPool.prototype.recoverObject = function (obj) {
        if (this._pool.indexOf(obj) == -1) {
            if (egret.is(obj, "IPool")) {
                obj.clear();
            }
            this._pool.push(obj);
        }
    };
    /**
     * 释放资源
     */
    ObjectPool.prototype.dispose = function () {
        var obj;
        while (this._pool && this._pool.length > 0) {
            obj = this._pool.shift();
            if (egret.is(obj, "IDispose")) {
                obj.dispose();
            }
        }
        this._pool = [];
    };
    ObjectPool._pool = {};
    return ObjectPool;
}());
__reflect(ObjectPool.prototype, "ObjectPool", ["IDispose"]);
//# sourceMappingURL=ObjectPool.js.map