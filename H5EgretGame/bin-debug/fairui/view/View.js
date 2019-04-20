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
var fairui;
(function (fairui) {
    var View = (function (_super) {
        __extends(View, _super);
        function View() {
            var _this = _super.call(this) || this;
            _this.cls = null;
            //释放时间
            _this.gcTime = 0;
            return _this;
        }
        /**获取当前组件Class类 */
        View.prototype.getCls = function () {
            return this.cls;
        };
        //------------------------------------------------
        View.prototype.init = function (param) {
            _super.prototype.init.call(this, param);
            this.gcTime = Number.MAX_VALUE;
        };
        //初始化UI
        View.prototype.initUI = function () {
        };
        /**
         * 自适应接口
         */
        View.prototype.onResize = function () {
        };
        /**
         * 是否可回收
         */
        View.prototype.isCanGc = function () {
            return Global.timer.currFrame >= this.gcTime;
        };
        /**
         * 重置,每次关闭界面调用
         */
        View.prototype.clear = function () {
            _super.prototype.clear.call(this);
            this.gcTime = Global.timer.currFrame + View.CACHE_TIME;
        };
        /**
         * 销毁，完全销毁对象和资源
         * 接口除了组件你们其它地方不要调用这个接口
         * 只有回收资源的时候会调用一次
         */
        View.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
            this.cls = null;
        };
        /**资源可释放后缓存时间,毫秒 */
        View.CACHE_TIME = 5000;
        return View;
    }(fairui.UIComponent));
    fairui.View = View;
    __reflect(View.prototype, "fairui.View", ["IView", "IComponent", "IDispose"]);
})(fairui || (fairui = {}));
//# sourceMappingURL=View.js.map