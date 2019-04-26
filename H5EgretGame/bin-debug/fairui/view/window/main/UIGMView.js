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
     * GM主界面
     * @author clong 2019.4.21
     */
    var UIGMView = (function (_super) {
        __extends(UIGMView, _super);
        function UIGMView() {
            return _super.call(this, "common", "UIGMView") || this;
        }
        UIGMView.prototype.initUI = function () {
            _super.prototype.initUI.call(this);
        };
        UIGMView.prototype.initData = function (data) {
            _super.prototype.initData.call(this, data);
            this.currentState = "normal";
        };
        UIGMView.prototype.addAllListener = function () {
            _super.prototype.addAllListener.call(this);
            this.addGameListener(egret.TouchEvent.TOUCH_TAP, this.touchPlayHandler, this, this.btn_play);
            this.addGameListener(egret.TouchEvent.TOUCH_TAP, this.touchPlay2Handler, this, this.btn_play2);
            this.addGameListener(egret.TouchEvent.TOUCH_TAP, this.touchLogHandler, this, this.btn_log);
        };
        UIGMView.prototype.removeAllListener = function () {
            _super.prototype.removeAllListener.call(this);
        };
        UIGMView.prototype.touchPlayHandler = function (e) {
            UISystem.Inst.createWindowView(fairui.UIAdVideoView);
        };
        UIGMView.prototype.touchPlay2Handler = function (e) {
            UISystem.Inst.createWindowView(fairui.UIZYPlayerView);
        };
        UIGMView.prototype.touchLogHandler = function (e) {
            if (this.currentState == "normal") {
                this.currentState = "log";
            }
            else {
                this.currentState = "normal";
            }
        };
        return UIGMView;
    }(fairui.UIBaseWindow));
    fairui.UIGMView = UIGMView;
    __reflect(UIGMView.prototype, "fairui.UIGMView");
})(fairui || (fairui = {}));
//# sourceMappingURL=UIGMView.js.map