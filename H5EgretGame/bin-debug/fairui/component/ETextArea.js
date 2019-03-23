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
    /**文本域 2018.5.21 LinJ */
    var ETextArea = (function (_super) {
        __extends(ETextArea, _super);
        function ETextArea() {
            return _super.call(this) || this;
        }
        return ETextArea;
    }(fairygui.GLabel));
    fairui.ETextArea = ETextArea;
    __reflect(ETextArea.prototype, "fairui.ETextArea");
})(fairui || (fairui = {}));
//# sourceMappingURL=ETextArea.js.map