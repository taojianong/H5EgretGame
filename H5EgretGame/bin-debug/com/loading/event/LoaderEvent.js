var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var load;
(function (load) {
    /**
     * 加载事件
     * @author clong 2019.4.26
     */
    var LoaderEvent = (function (_super) {
        __extends(LoaderEvent, _super);
        function LoaderEvent(type, thisObject, data) {
            if (data === void 0) { data = null; }
            var _this = _super.call(this, type) || this;
            _this._thisObject = thisObject;
            _this.data = data;
            return _this;
        }
        Object.defineProperty(LoaderEvent.prototype, "thisObject", {
            get: function () {
                return this._thisObject;
            },
            enumerable: true,
            configurable: true
        });
        LoaderEvent.COMPLETE = "complete";
        LoaderEvent.PROGRESS = "progress";
        LoaderEvent.ERROR = "error";
        LoaderEvent.IO_ERROR = "ioError";
        /**加载一组资源完成 */
        LoaderEvent.LOAD_LIST_COMPLETE = "loadListComplete";
        /**释放资源 */
        LoaderEvent.DISPOSE_RESOURCE = "disposeResource";
        return LoaderEvent;
    }(egret.Event));
    load.LoaderEvent = LoaderEvent;
    __reflect(LoaderEvent.prototype, "load.LoaderEvent");
})(load || (load = {}));
//# sourceMappingURL=LoaderEvent.js.map