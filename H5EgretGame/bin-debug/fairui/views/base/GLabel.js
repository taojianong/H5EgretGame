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
var base;
(function (base) {
    var GLabel = (function (_super) {
        __extends(GLabel, _super);
        function GLabel(text) {
            return _super.call(this) || this;
        }
        return GLabel;
    }(egret.TextField));
    base.GLabel = GLabel;
    __reflect(GLabel.prototype, "base.GLabel");
})(base || (base = {}));
//# sourceMappingURL=GLabel.js.map