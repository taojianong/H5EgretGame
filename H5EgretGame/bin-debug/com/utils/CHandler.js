var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var CHandler = (function () {
    function CHandler(handler, param) {
        if (param === void 0) { param = null; }
        this._isDispose = false;
        //super();
        this._handler = handler;
        this._params = param;
    }
    Object.defineProperty(CHandler.prototype, "params", {
        get: function () {
            return this._params;
        },
        set: function (value) {
            this._params = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CHandler.prototype, "handler", {
        get: function () {
            return this._handler;
        },
        enumerable: true,
        configurable: true
    });
    CHandler.prototype.execute = function () {
        if (this._handler != null) {
            this._handler.apply(null, this._params);
        }
    };
    CHandler.prototype.executeWith = function (data) {
        if (data == null) {
            this.execute();
        }
        else if (this._handler != null) {
            this._handler.apply(null, this._params ? this._params.concat(data) : data);
        }
    };
    Object.defineProperty(CHandler.prototype, "isDisposed", {
        get: function () {
            return this._isDispose;
        },
        enumerable: true,
        configurable: true
    });
    CHandler.prototype.dispose = function () {
        this._handler = null;
        this._params = null;
        this._isDispose = true;
    };
    return CHandler;
}());
__reflect(CHandler.prototype, "CHandler", ["IDispose"]);
//# sourceMappingURL=CHandler.js.map