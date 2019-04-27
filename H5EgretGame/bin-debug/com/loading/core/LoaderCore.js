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
     * 加载基类
     * @author clong 2019.4.26
     */
    var LoaderCore = (function (_super) {
        __extends(LoaderCore, _super);
        function LoaderCore() {
            var _this = _super.call(this) || this;
            //-------------------------------------------------------
            /**加载类型 */
            _this.type = load.LoaderStatus.TYPE_TEXTURE;
            /**加载地址 */
            _this.url = "";
            /**加载等级 */
            _this.level = 0;
            /**加载状态 */
            _this.state = load.LoaderStatus.READY;
            /**是否已经释放 */
            _this.isDisposed = false;
            return _this;
        }
        /**初始创建 */
        LoaderCore.prototype.create = function (url, type, level, state) {
            if (level === void 0) { level = 0; }
            if (state === void 0) { state = 0; }
            this.url = url;
            this.type = type;
            this.level = level;
            this.state = state;
        };
        /**释放资源 */
        LoaderCore.prototype.recover = function () {
            ObjectPool.recoverObject(this);
        };
        /**清理资源 */
        LoaderCore.prototype.clear = function () {
            this.url = "";
            this.type = 0;
            this.level = 0;
            this.state = 0;
        };
        LoaderCore.prototype.dispose = function () {
            this.clear();
            this.isDisposed = true;
        };
        LoaderCore.version = 0.1;
        return LoaderCore;
    }(egret.EventDispatcher));
    load.LoaderCore = LoaderCore;
    __reflect(LoaderCore.prototype, "load.LoaderCore", ["IPool", "IDispose"]);
})(load || (load = {}));
//# sourceMappingURL=LoaderCore.js.map