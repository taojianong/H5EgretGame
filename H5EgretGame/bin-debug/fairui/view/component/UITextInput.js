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
     * 输入文本框
     * @author clong 2018.12.10
     */
    var UITextInput = (function (_super) {
        __extends(UITextInput, _super);
        function UITextInput() {
            var _this = _super.call(this) || this;
            _this._textColor = NaN;
            _this._fillColor = NaN;
            _this._fillAlpha = NaN;
            _this._strokeColor = NaN;
            _this._strokeAlpha = NaN;
            _this._strokeWeight = NaN;
            return _this;
        }
        UITextInput.prototype.setup_afterAdd = function (buffer, beginPos) {
            _super.prototype.setup_afterAdd.call(this, buffer, beginPos);
            if (this.rect_bg) {
                if (!isNaN(this._textColor)) {
                    this.textColor = this._textColor;
                }
                this._fillColor = isNaN(this._fillColor) ? this.rect_bg.color : this._fillColor;
                this._fillAlpha = isNaN(this._fillAlpha) ? this.rect_bg["_fillAlpha"] : this._fillAlpha;
                this._strokeColor = isNaN(this._strokeColor) ? this.rect_bg["_lineColor"] : this._strokeColor;
                this._strokeAlpha = isNaN(this._strokeAlpha) ? this.rect_bg["_lineAlpha"] : this._strokeAlpha;
                this._strokeWeight = isNaN(this._strokeWeight) ? this.rect_bg["_lineSize"] : this._strokeWeight;
                this.drawBg();
            }
        };
        UITextInput.prototype.initUI = function () {
            _super.prototype.initUI.call(this);
            this.rect_bg = this.getChild("icon");
            this.titleTxt = this.getChild("title");
        };
        Object.defineProperty(UITextInput.prototype, "textColor", {
            /**设置文字颜色 */
            get: function () {
                return isNaN(this._textColor) ? 0x00ff00 : 0xffffff;
            },
            set: function (value) {
                this._textColor = value;
                this.titleTxt.color = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UITextInput.prototype, "prompt", {
            /**设置默认文字 */
            get: function () {
                return this.titleTxt.promptText;
            },
            set: function (value) {
                this.titleTxt.promptText = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UITextInput.prototype, "text", {
            /**文本 */
            get: function () {
                return this.titleTxt.text;
            },
            set: function (value) {
                this.titleTxt.text = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UITextInput.prototype, "align", {
            /**fairygui.AlignType */
            get: function () {
                return this.titleTxt.align;
            },
            set: function (value) {
                this.titleTxt.align = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UITextInput.prototype, "verticalAlign", {
            /**fairygui.VertAlignType */
            get: function () {
                return this.titleTxt.verticalAlign;
            },
            set: function (value) {
                this.titleTxt.verticalAlign = value;
            },
            enumerable: true,
            configurable: true
        });
        /**设置焦点 */
        UITextInput.prototype.setFocus = function () {
            fairygui.GRoot.inst.focus = this.titleTxt;
            var tf = this.titleTxt.displayObject;
            if (tf) {
                tf.$setSelection(tf.selectionEndIndex, tf.selectionEndIndex); //焦点到文本最后
            }
        };
        Object.defineProperty(UITextInput.prototype, "fillColor", {
            /**填充颜色 */
            get: function () {
                return this._fillColor;
            },
            set: function (value) {
                this._fillColor = value;
                if (this.rect_bg) {
                    this.rect_bg.color = value;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UITextInput.prototype, "fillAlpha", {
            /**填充透明度 */
            get: function () {
                return this._fillAlpha;
            },
            set: function (value) {
                this._fillAlpha = value;
                if (this.rect_bg) {
                    this.rect_bg.alpha = value;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UITextInput.prototype, "strokeColor", {
            /**边框颜色 */
            get: function () {
                return this._strokeColor;
            },
            set: function (value) {
                this._strokeColor = value;
                if (this.rect_bg) {
                    this.drawBg();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UITextInput.prototype, "strokeAlpha", {
            /**边框线条透明度 */
            get: function () {
                return this._strokeAlpha;
            },
            set: function (value) {
                this._strokeAlpha = value;
                if (this.rect_bg) {
                    this.drawBg();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UITextInput.prototype, "strokeWeight", {
            /**线条粗细 */
            get: function () {
                return this._strokeWeight;
            },
            set: function (value) {
                this._strokeWeight = value;
                if (this.rect_bg) {
                    this.drawBg();
                }
            },
            enumerable: true,
            configurable: true
        });
        UITextInput.prototype.drawBg = function () {
            // this.rect_bg.graphics.clear();
            // this.rect_bg.graphics.lineStyle( this._strokeWeight  , this._strokeColor , this._strokeAlpha );
            // this.rect_bg.graphics.drawRect( 0 , 0 , this.width , this.height );
            // this.rect_bg.graphics.endFill();
            this.rect_bg["drawCommon"]();
        };
        return UITextInput;
    }(fairui.BaseButton));
    fairui.UITextInput = UITextInput;
    __reflect(UITextInput.prototype, "fairui.UITextInput");
})(fairui || (fairui = {}));
//# sourceMappingURL=UITextInput.js.map