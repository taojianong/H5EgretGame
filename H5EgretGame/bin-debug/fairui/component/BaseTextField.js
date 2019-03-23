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
     * 文本基类
     * @author cl 2018.3.20
     */
    var BaseTextField = (function (_super) {
        __extends(BaseTextField, _super);
        function BaseTextField() {
            return _super.call(this) || this;
        }
        Object.defineProperty(BaseTextField.prototype, "textHeight", {
            get: function () {
                return this._textHeight;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BaseTextField.prototype, "text", {
            /**文本 */
            get: function () {
                return egret.superGetter(BaseTextField, this, "text");
            },
            set: function (value) {
                value = App.lang.getLang(value);
                egret.superSetter(BaseTextField, this, "text", value);
            },
            enumerable: true,
            configurable: true
        });
        BaseTextField.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
        };
        return BaseTextField;
    }(fairygui.GTextField));
    fairui.BaseTextField = BaseTextField;
    __reflect(BaseTextField.prototype, "fairui.BaseTextField");
})(fairui || (fairui = {}));
//# sourceMappingURL=BaseTextField.js.map