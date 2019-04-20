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
     * 文本标签
     * @author clong 2019.2.20
     */
    var UILabel = (function (_super) {
        __extends(UILabel, _super);
        function UILabel() {
            return _super.call(this) || this;
        }
        UILabel.prototype.constructExtension = function (buffer) {
            _super.prototype.constructExtension.call(this, buffer);
        };
        UILabel.prototype.constructFromXML = function (xml) {
            _super.prototype.constructFromXML.call(this, xml);
            this._txt = this.getChild("title");
        };
        /**设置文本，可为多语言标签 */
        UILabel.prototype.setText = function (text) {
            this.text = Global.lang.getLang(text) || text;
        };
        Object.defineProperty(UILabel.prototype, "txt", {
            /**原生组件 */
            get: function () {
                return this._txt["_textField"];
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UILabel.prototype, "htmlText", {
            /**设置HTML文本 */
            get: function () {
                return this._txt.text;
            },
            set: function (value) {
                this.text = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UILabel.prototype, "text", {
            get: function () {
                return this._txt.text;
            },
            set: function (value) {
                this._txt.text = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UILabel.prototype, "fontSize", {
            get: function () {
                return this._txt.fontSize;
            },
            set: function (value) {
                this._txt.fontSize = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UILabel.prototype, "color", {
            get: function () {
                return this._txt.color;
            },
            set: function (value) {
                this._txt.color = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UILabel.prototype, "font", {
            get: function () {
                return this._txt.font;
            },
            set: function (value) {
                this._txt.font = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UILabel.prototype, "align", {
            get: function () {
                return this._txt.align;
            },
            set: function (value) {
                this._txt.align = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UILabel.prototype, "verticalAlign", {
            get: function () {
                return this._txt.verticalAlign;
            },
            set: function (value) {
                this._txt.verticalAlign = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UILabel.prototype, "singleLine", {
            /**是否为多行 */
            get: function () {
                return this._txt.singleLine;
            },
            set: function (value) {
                this._txt.singleLine = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UILabel.prototype, "textWidth", {
            get: function () {
                return this._txt.textWidth;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UILabel.prototype, "textHeight", {
            get: function () {
                return this._txt.height;
            },
            enumerable: true,
            configurable: true
        });
        return UILabel;
    }(fairui.BaseSprite));
    fairui.UILabel = UILabel;
    __reflect(UILabel.prototype, "fairui.UILabel");
})(fairui || (fairui = {}));
//# sourceMappingURL=UILabel.js.map