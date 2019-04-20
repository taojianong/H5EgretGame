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
     * Tip条目显示
     * @author cl 2018.5.17
     */
    var TipBottomItem = (function (_super) {
        __extends(TipBottomItem, _super);
        //----------------------------------------------
        function TipBottomItem() {
            return _super.call(this) || this;
        }
        TipBottomItem.create = function () {
            var item = TipBottomItem.pool.shift();
            if (item == null) {
                item = fairui.PanelRegister.createGObject("common", "TipBottomItem");
            }
            item.create();
            return item;
        };
        TipBottomItem.recover = function (item) {
            if (item && TipBottomItem.pool.indexOf(item) == -1) {
                item.clear();
                TipBottomItem.pool.push(item);
            }
        };
        TipBottomItem.prototype.create = function () {
            this.alpha = this.scaleX = this.scaleY = 1;
        };
        TipBottomItem.prototype.initUI = function () {
            _super.prototype.initUI.call(this);
        };
        TipBottomItem.prototype.show = function (value) {
            _super.prototype.show.call(this, value);
            if (this._titleObject != null) {
                this._titleObject.text = value;
            }
        };
        Object.defineProperty(TipBottomItem.prototype, "text", {
            /**显示文本 */
            get: function () {
                return this._titleObject && this._titleObject.text;
            },
            enumerable: true,
            configurable: true
        });
        TipBottomItem.prototype.hide = function () {
            _super.prototype.hide.call(this);
            this._titleObject.text = "";
        };
        TipBottomItem.prototype.clear = function () {
            _super.prototype.clear.call(this);
            this.hide();
        };
        TipBottomItem.prototype.recover = function () {
            _super.prototype.recover.call(this);
            if (this.parent != null) {
                this.parent.removeChild(this);
            }
            TipBottomItem.recover(this);
        };
        TipBottomItem.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
        };
        TipBottomItem.pool = [];
        return TipBottomItem;
    }(fairui.BaseButton));
    fairui.TipBottomItem = TipBottomItem;
    __reflect(TipBottomItem.prototype, "fairui.TipBottomItem");
})(fairui || (fairui = {}));
//# sourceMappingURL=TipBottomItem.js.map