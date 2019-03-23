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
    var EffectBitmap = (function (_super) {
        __extends(EffectBitmap, _super);
        function EffectBitmap(father) {
            var _this = _super.call(this) || this;
            _this._fatherEffect = father;
            return _this;
        }
        Object.defineProperty(EffectBitmap.prototype, "father", {
            get: function () {
                return this._fatherEffect;
            },
            enumerable: true,
            configurable: true
        });
        EffectBitmap.prototype.dispose = function () {
            this._fatherEffect = null;
        };
        return EffectBitmap;
    }(base.GBitmap));
    fairui.EffectBitmap = EffectBitmap;
    __reflect(EffectBitmap.prototype, "fairui.EffectBitmap");
})(fairui || (fairui = {}));
//# sourceMappingURL=EffectBitmap.js.map