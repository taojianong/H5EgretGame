var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 事件池
 * @author clong 2019.4.20
 */
var EventPool = (function () {
    function EventPool() {
        //----------------------------------------------------
        this._eventObjList = null;
        this._eventObjList = [];
    }
    EventPool.create = function () {
        var obj = EventPool.pool.shift();
        if (obj == null) {
            obj = new EventPool();
        }
        return obj;
    };
    EventPool.recover = function (obj) {
        if (obj != null && EventPool.pool.indexOf(obj) == -1) {
            EventPool.pool.push(obj);
        }
    };
    /**
     * 添加事件监听
     * @param type 		事件类型
     * @param listener 	事件方法
     * @param target	事件对象
     * @param thisObj
     */
    EventPool.prototype.addListener = function (type, listener, target, thisObj) {
        if (target === void 0) { target = null; }
        if (!this.hasEventListener(type, listener, target, thisObj)) {
            var obj = EventObj.create(type, listener, target, thisObj);
            this._eventObjList.push(obj);
            EventManager.addEventListener(type, listener, thisObj, target);
        }
    };
    /**
     * 移除事件监听
     * @param type 		事件类型
     * @param listener 	事件方法
     * @param target	事件对象
     * @param thisObj
     */
    EventPool.prototype.removeListener = function (type, listener, target, thisObj) {
        if (target === void 0) { target = null; }
        var obj = null;
        for (var i = 0; i < this._eventObjList.length; i++) {
            obj = this._eventObjList[i];
            if (obj && obj.type == type && obj.listener == listener && obj.thisObj == thisObj) {
                this._eventObjList.splice(i, 1);
                break;
            }
        }
        EventManager.removeEventListener(type, listener, thisObj, target);
    };
    /**
     * 移除池里所有事件监听,保持的对象不从列表里移除
     */
    EventPool.prototype.removeAllListener = function () {
        var obj = null;
        for (var i = 0; i < this._eventObjList.length; i++) {
            obj = this._eventObjList[i];
            if (obj) {
                EventManager.removeEventListener(obj.type, obj.listener, obj.thisObj, obj.target);
            }
        }
    };
    /**
     * 重新监听所有事件
     */
    EventPool.prototype.relistenerAll = function () {
        var obj = null;
        for (var i = 0; i < this._eventObjList.length; i++) {
            obj = this._eventObjList[i];
            if (obj) {
                EventManager.addEventListener(obj.type, obj.listener, obj.thisObj, obj.target);
            }
        }
    };
    /**
     * 是否有某个监听
     * @param type 		事件类型
     * @param listener 	事件方法
     * @param target	事件对象
     * @param thisObj
     */
    EventPool.prototype.hasEventListener = function (type, listener, target, thisObj) {
        if (target === void 0) { target = null; }
        var obj = null;
        for (var _i = 0, _a = this._eventObjList; _i < _a.length; _i++) {
            obj = _a[_i];
            if (obj && obj.type == type && obj.listener == listener) {
                if (target == null) {
                    return obj.thisObj == thisObj;
                }
                else {
                    return obj.target == target && obj.thisObj == thisObj;
                }
            }
        }
        return false;
    };
    /**
     * 释放资源
     */
    EventPool.prototype.dispose = function () {
        while (this._eventObjList && this._eventObjList.length > 0) {
            var obj = this._eventObjList.shift();
            if (obj) {
                EventManager.removeEventListener(obj.type, obj.listener, obj.thisObj, obj.target);
                obj.recover();
            }
        }
        this._eventObjList = [];
        EventPool.recover(this);
    };
    EventPool.pool = [];
    return EventPool;
}());
__reflect(EventPool.prototype, "EventPool");
//# sourceMappingURL=EventPool.js.map