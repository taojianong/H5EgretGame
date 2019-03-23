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
    var GLoader = (function (_super) {
        __extends(GLoader, _super);
        function GLoader() {
            return _super.call(this) || this;
        }
        GLoader.prototype.dispose = function (type) {
        };
        return GLoader;
    }(egret.URLLoader));
    base.GLoader = GLoader;
    __reflect(GLoader.prototype, "base.GLoader");
})(base || (base = {}));
//# sourceMappingURL=GLoader.js.map