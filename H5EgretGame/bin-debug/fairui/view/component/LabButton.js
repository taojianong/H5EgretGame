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
     * 标签按钮
     * @author clong 2019.2.25
     */
    var LabButton = (function (_super) {
        __extends(LabButton, _super);
        function LabButton() {
            return _super.call(this) || this;
        }
        LabButton.prototype.initUI = function () {
            _super.prototype.initUI.call(this);
            this.lab = this.getChild("title").asTextField;
        };
        return LabButton;
    }(fairui.BaseButton));
    fairui.LabButton = LabButton;
    __reflect(LabButton.prototype, "fairui.LabButton");
})(fairui || (fairui = {}));
//# sourceMappingURL=LabButton.js.map