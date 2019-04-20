var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 通用事件类
 * @author clong 2019.3.23
 */
var EventObj = (function () {
    /**
     * 事件构造函数
     * @param type      事件类型
     * @param listener       事件响应处理函数
     * @param target    事件绑定的控件
     * @param _hisObj   是否是绑定控件的 handler方法
     *
     */
    function EventObj(type, listener, target, thisObj) {
        if (type === void 0) { type = ""; }
        if (listener === void 0) { listener = null; }
        if (target === void 0) { target = null; }
        if (thisObj === void 0) { thisObj = null; }
        this._type = type;
        this._listener = listener;
        this._target = target;
        this._thisObj = thisObj;
    }
    EventObj.create = function (type, listener, target, thisObj) {
        if (target === void 0) { target = null; }
        if (thisObj === void 0) { thisObj = null; }
        var obj = EventObj.pool.shift();
        if (obj == null) {
            obj = new EventObj();
        }
        obj.type = type;
        obj.listener = listener;
        obj.target = target;
        obj.thisObj = thisObj;
        return obj;
    };
    EventObj.recover = function (obj) {
        if (obj != null && EventObj.pool.indexOf(obj) == -1) {
            EventObj.pool.push(obj);
        }
    };
    Object.defineProperty(EventObj.prototype, "type", {
        get: function () {
            return this._type;
        },
        set: function (value) {
            this._type = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EventObj.prototype, "listener", {
        get: function () {
            return this._listener;
        },
        set: function (value) {
            this._listener = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EventObj.prototype, "target", {
        get: function () {
            return this._target;
        },
        set: function (value) {
            this._target = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EventObj.prototype, "thisObj", {
        get: function () {
            return this._thisObj;
        },
        set: function (value) {
            this._thisObj = value;
        },
        enumerable: true,
        configurable: true
    });
    /**重置并回收 */
    EventObj.prototype.recover = function () {
        this._type = "";
        this._listener = null;
        this._target = null;
        this._thisObj = null;
        EventObj.recover(this);
    };
    EventObj.pool = [];
    return EventObj;
}());
__reflect(EventObj.prototype, "EventObj");
//# sourceMappingURL=EventObj.js.map