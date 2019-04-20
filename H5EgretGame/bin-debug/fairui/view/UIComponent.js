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
    /**
     * yanfaqiang
     * UI显示代理类
     */
    var UIComponent = (function (_super) {
        __extends(UIComponent, _super);
        function UIComponent() {
            return _super.call(this) || this;
        }
        UIComponent.prototype.constructFromXML = function (xml) {
            _super.prototype.constructFromXML.call(this, xml);
            this.initComplete();
        };
        UIComponent.prototype.isInited = function () {
            return !this.isComplyed;
        };
        UIComponent.prototype.initComplete = function () {
            //检测初始化是否完成
            if (!this.isInited()) {
                return false;
            }
            if (!this.isOpened) {
                this.isOpened = true;
                this.initUI();
            }
            this.initData(this.param);
            this.addAllListener();
            this.isComplyed = true;
            return true;
        };
        /**
         * 外部不要调用
         */
        UIComponent.prototype.init = function (param) {
            this.param = param;
            this.initComplete();
        };
        /**
         * 初始化UI界面
         */
        UIComponent.prototype.initUI = function () {
        };
        /**
         * 初始化参数
         */
        UIComponent.prototype.initData = function (param) {
            if (param === void 0) { param = null; }
        };
        /**
         * 关闭界面时调用
         */
        UIComponent.prototype.clear = function () {
            _super.prototype.clear.call(this);
            this.param = null;
            this.isComplyed = false;
        };
        UIComponent.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
            this.param = null;
        };
        return UIComponent;
    }(fairui.BaseSprite));
    fairui.UIComponent = UIComponent;
    __reflect(UIComponent.prototype, "fairui.UIComponent");
})(fairui || (fairui = {}));
//# sourceMappingURL=UIComponent.js.map