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
     * 封装fairygui按钮
     * @author clong 2019.3.4
     */
    var EButton = (function (_super) {
        __extends(EButton, _super);
        function EButton() {
            var _this = _super.call(this) || this;
            //--------------------------------------------------------------------
            _this._data = null;
            _this._custom_downEffect = 2;
            return _this;
        }
        EButton.prototype.constructFromXML = function (xml) {
            _super.prototype.constructFromXML.call(this, xml);
        };
        EButton.prototype.setup_afterAdd = function (buffer, beginPos) {
            _super.prototype.setup_afterAdd.call(this, buffer, beginPos);
        };
        EButton.prototype.setState = function (val) {
            _super.prototype.setState.call(this, val);
        };
        Object.defineProperty(EButton.prototype, "label", {
            get: function () {
                return this.text;
            },
            set: function (value) {
                this.text = value;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 设置按钮文本标签
         * @param value 按钮标签文本，可为多语言表标签
         */
        EButton.prototype.setLabel = function (value) {
            this.text = Global.lang.getLang(value);
        };
        EButton.prototype.setScale = function (sx, sy) {
            if (this._custom_downEffect == 2) {
                _super.prototype.setScale.call(this, sx, sy);
            }
        };
        Object.defineProperty(EButton.prototype, "downScaled", {
            /**是否允许按钮缩放 */
            get: function () {
                return this._custom_downEffect == 2;
            },
            set: function (value) {
                this._custom_downEffect = value ? 2 : 0;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EButton.prototype, "buttonType", {
            /**几种公用按钮类型 */
            get: function () {
                return this._buttonType;
            },
            set: function (value) {
                if (value) {
                    var bgUrl = "";
                    switch (this._buttonType) {
                        case EButton.BUTTON_NORMAL_RED:
                            bgUrl = fairui.FairyTextureUtils.getUrl("common", "common_anniu002");
                            break;
                        case EButton.BUTTON_NORMAL_YELLOW:
                            bgUrl = fairui.FairyTextureUtils.getUrl("common", "common_anniu005"); //"common_json.common_anniu005";
                            break;
                        case EButton.BUTTON_NORMAL_GREEN:
                            bgUrl = fairui.FairyTextureUtils.getUrl("common", "common_anniu001"); //"common_json.common_anniu001";
                            break;
                        case EButton.BUTTON_NORMAL_GOLDEN:
                            bgUrl = fairui.FairyTextureUtils.getUrl("common", "common_anniu006"); //"common_json.common_anniu006";
                            break;
                        case EButton.BUTTON_NORMAL_BLUE:
                            bgUrl = fairui.FairyTextureUtils.getUrl("common", "common_anniu003"); //"common_json.common_anniu003";
                            break;
                        case EButton.BUTTON_TINNY_RED:
                            bgUrl = fairui.FairyTextureUtils.getUrl("common", "common_anniu02"); //"common_json.common_anniu02";
                            break;
                        case EButton.BUTTON_TINNY_YELLOW:
                            bgUrl = fairui.FairyTextureUtils.getUrl("common", "common_anniu05"); //"common_json.common_anniu05";
                            break;
                        case EButton.BUTTON_TINNY_GREEN:
                            bgUrl = fairui.FairyTextureUtils.getUrl("common", "common_anniu01"); //"common_json.common_anniu01";
                            break;
                        case EButton.BUTTON_TINNY_GOLDEN:
                            bgUrl = fairui.FairyTextureUtils.getUrl("common", "common_anniu06"); //"common_json.common_anniu06";
                            break;
                        case EButton.BUTTON_TINNY_BLUE:
                            bgUrl = fairui.FairyTextureUtils.getUrl("common", "common_anniu03"); //"common_json.common_anniu03";
                            break;
                    }
                    if (bgUrl) {
                        this.icon = this.selectedIcon = bgUrl;
                    }
                }
            },
            enumerable: true,
            configurable: true
        });
        EButton.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
        };
        /**普通绿色 */
        EButton.BUTTON_NORMAL_GREEN = "button.normal.green";
        /**普通红色 */
        EButton.BUTTON_NORMAL_RED = "button.normal.red";
        /**普通黄色 */
        EButton.BUTTON_NORMAL_YELLOW = "button.normal.yellow";
        /**普通蓝色 */
        EButton.BUTTON_NORMAL_BLUE = "button.normal.blue";
        /**普通金色 */
        EButton.BUTTON_NORMAL_GOLDEN = "button.normal.golden";
        /**小绿色 */
        EButton.BUTTON_TINNY_GREEN = "button.tinny.green";
        /**普通红色 */
        EButton.BUTTON_TINNY_RED = "button.tinny.red";
        /**普通黄色 */
        EButton.BUTTON_TINNY_YELLOW = "button.tinny.yellow";
        /**普通蓝色 */
        EButton.BUTTON_TINNY_BLUE = "button.tinny.blue";
        /**普通金色 */
        EButton.BUTTON_TINNY_GOLDEN = "button.tinny.golden";
        return EButton;
    }(fairui.BaseButton));
    fairui.EButton = EButton;
    __reflect(EButton.prototype, "fairui.EButton");
})(fairui || (fairui = {}));
//# sourceMappingURL=EButton.js.map