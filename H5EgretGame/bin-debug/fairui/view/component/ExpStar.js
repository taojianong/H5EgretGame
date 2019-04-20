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
     * 经验星星
     * @author clong 2019.2.2
     */
    var ExpStar = (function (_super) {
        __extends(ExpStar, _super);
        function ExpStar() {
            return _super.call(this) || this;
        }
        Object.defineProperty(ExpStar.prototype, "text", {
            get: function () {
                return this.lab_level.text;
            },
            set: function (value) {
                this.lab_level.text = value;
            },
            enumerable: true,
            configurable: true
        });
        return ExpStar;
    }(fairui.BaseSprite));
    fairui.ExpStar = ExpStar;
    __reflect(ExpStar.prototype, "fairui.ExpStar");
})(fairui || (fairui = {}));
//# sourceMappingURL=ExpStar.js.map