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
    var ECheckbox = (function (_super) {
        __extends(ECheckbox, _super);
        function ECheckbox() {
            return _super.call(this) || this;
        }
        ECheckbox.prototype.selectFunction = function (func, thisObj) {
            this._function = func;
            this._thisObj = thisObj;
        };
        Object.defineProperty(ECheckbox.prototype, "selected", {
            get: function () {
                return egret.superGetter(fairui.ECheckbox, this, "selected");
            },
            set: function (value) {
                egret.superSetter(fairui.ECheckbox, this, "selected", value);
                if (this._function && this._thisObj) {
                    this._function.call(this._thisObj, this.selected);
                }
            },
            enumerable: true,
            configurable: true
        });
        return ECheckbox;
    }(fairui.BaseButton));
    fairui.ECheckbox = ECheckbox;
    __reflect(ECheckbox.prototype, "fairui.ECheckbox");
})(fairui || (fairui = {}));
//# sourceMappingURL=ECheckbox.js.map