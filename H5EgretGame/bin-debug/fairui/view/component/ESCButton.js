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
     * 单选按钮,上下居中模式
     * @author clong 2019.2.11
     */
    var ESCButton = (function (_super) {
        __extends(ESCButton, _super);
        function ESCButton() {
            return _super.call(this) || this;
        }
        return ESCButton;
    }(fairui.EButton));
    fairui.ESCButton = ESCButton;
    __reflect(ESCButton.prototype, "fairui.ESCButton");
})(fairui || (fairui = {}));
//# sourceMappingURL=ESCButton.js.map