var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 通用事件类 cl 2019.3.23
 */
var EventObj = (function () {
    /**
     * 事件构造函数
     * @param eventKey 事件Key
     * @param fun 事件响应处理函数
     * @param source 事件绑定的控件
     * @param handler 是否是绑定控件的 handler方法
     *
     */
    function EventObj(eventKey, fun, source, thisObj, handler, args) {
        if (source === void 0) { source = null; }
        if (thisObj === void 0) { thisObj = null; }
        if (handler === void 0) { handler = null; }
        if (args === void 0) { args = null; }
        this._eventKey = eventKey;
        this._fun = fun;
        this._source = source;
        this._handler = handler;
        this._thisObj = thisObj;
    }
    Object.defineProperty(EventObj.prototype, "eventKey", {
        get: function () {
            return this._eventKey;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EventObj.prototype, "fun", {
        get: function () {
            return this._fun;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EventObj.prototype, "source", {
        get: function () {
            return this._source;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EventObj.prototype, "handler", {
        get: function () {
            return this._handler;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EventObj.prototype, "thisObj", {
        get: function () {
            return this._thisObj;
        },
        enumerable: true,
        configurable: true
    });
    return EventObj;
}());
__reflect(EventObj.prototype, "EventObj");
//# sourceMappingURL=EventObj.js.map