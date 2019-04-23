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
     * 主界面
     * @author clong 2019.4.21
     */
    var UIMainView = (function (_super) {
        __extends(UIMainView, _super);
        function UIMainView() {
            return _super.call(this, "main", "UIMainView") || this;
        }
        UIMainView.prototype.initUI = function () {
            _super.prototype.initUI.call(this);
        };
        UIMainView.prototype.addAllListener = function () {
            _super.prototype.addAllListener.call(this);
            this.addGameListener(egret.TouchEvent.TOUCH_TAP, this.touchGmHandler, this, this.btn_gm);
        };
        UIMainView.prototype.removeAllListener = function () {
            _super.prototype.removeAllListener.call(this);
        };
        UIMainView.prototype.touchGmHandler = function (e) {
            UISystem.Inst.createWindowView(fairui.UIGMView);
        };
        UIMainView.prototype.onResize = function () {
            _super.prototype.onResize.call(this);
        };
        UIMainView.prototype.clear = function () {
            _super.prototype.clear.call(this);
        };
        UIMainView.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
        };
        return UIMainView;
    }(fairui.UIBaseWindow));
    fairui.UIMainView = UIMainView;
    __reflect(UIMainView.prototype, "fairui.UIMainView");
})(fairui || (fairui = {}));
//# sourceMappingURL=UIMainView.js.map