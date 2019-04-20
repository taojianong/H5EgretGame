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
     * 普通按钮,自由缩放模式
     * @author clong 2019.2.11
     */
    var ECButton = (function (_super) {
        __extends(ECButton, _super);
        function ECButton() {
            return _super.call(this) || this;
        }
        return ECButton;
    }(fairui.EButton));
    fairui.ECButton = ECButton;
    __reflect(ECButton.prototype, "fairui.ECButton");
})(fairui || (fairui = {}));
//# sourceMappingURL=ECButton.js.map