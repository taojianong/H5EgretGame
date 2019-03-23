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
var WindowB = (function (_super) {
    __extends(WindowB, _super);
    function WindowB() {
        return _super.call(this) || this;
    }
    WindowB.prototype.onInit = function () {
        this.contentPane = fairygui.UIPackage.createObject("Basic", "WindowB").asCom;
        this.center();
        //弹出窗口的动效已中心为轴心
        this.setPivot(0.5, 0.5);
    };
    WindowB.prototype.doShowAnimation = function () {
        this.setScale(0.1, 0.1);
        egret.Tween.get(this).to({ scaleX: 1, scaleY: 1 }, 300, egret.Ease.quadOut).call(this.onShown, this);
    };
    WindowB.prototype.doHideAnimation = function () {
        egret.Tween.get(this).to({ scaleX: 0.1, scaleY: 0.1 }, 300, egret.Ease.quadOut).call(this.hideImmediately, this);
    };
    WindowB.prototype.onShown = function () {
        this.contentPane.getTransition("t1").play();
    };
    WindowB.prototype.onHide = function () {
        this.contentPane.getTransition("t1").stop();
    };
    return WindowB;
}(fairygui.Window));
__reflect(WindowB.prototype, "WindowB");
//# sourceMappingURL=WindowB.js.map