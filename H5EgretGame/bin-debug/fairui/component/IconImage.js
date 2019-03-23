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
    var ResPathUtil = com.utils.ResPathUtil;
    /**
     * 物品图标
     * @author cl 2018.3.26
     */
    var IconImage = (function (_super) {
        __extends(IconImage, _super);
        /**
         * 构造函数
         * @param $imageType 类型，EnumImageType常量
         */
        function IconImage($imageType, callback) {
            if ($imageType === void 0) { $imageType = null; }
            if (callback === void 0) { callback = null; }
            var _this = _super.call(this) || this;
            _this._callback = null;
            _this._imageType = $imageType;
            _this._callback = callback;
            return _this;
        }
        Object.defineProperty(IconImage.prototype, "imageType", {
            get: function () {
                return this._imageType;
            },
            /**
             * 类型，EnumImageType常量
             * @param value
             */
            set: function (value) {
                this._imageType = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(IconImage.prototype, "url", {
            set: function (value) {
                egret.superSetter(IconImage, this, "url", value);
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 图标飞包袱时使用源IconImage的url生成一个新的IconImage时使用
         * @param url
         *
         */
        IconImage.prototype.loadIcon = function (url) {
            this._url = url;
            // this._src = url;
            // netLoad();
        };
        Object.defineProperty(IconImage.prototype, "path", {
            /**
             * 传入配置表中的icon字段即可
             * @param value
             */
            set: function (value) {
                var temp = ResPathUtil.getIcon(value, this._imageType);
                if (this._url != temp) {
                    this.clear();
                    this.showDefault();
                    if (this._callback != null) {
                        this._callback.apply(this);
                    }
                    if (value != null && this._imageType != null) {
                        // this._url = temp;
                        //netLoad();
                        this.url = temp;
                    }
                }
            },
            enumerable: true,
            configurable: true
        });
        IconImage.prototype.showDefault = function () {
            // if (defaultBaseBitmapData == null) {
            //     var cls: Class = ClassUtil.getClass(DEFAULT_ICON) as Class;
            //     defaultBaseBitmapData = new cls();
            // }
            // bitmapData = defaultBaseBitmapData;
            this.texture = fairui.FairyTextureUtils.getTextureBy("common", "default_item_icon_common");
        };
        IconImage.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
        };
        return IconImage;
    }(fairui.BaseImage));
    fairui.IconImage = IconImage;
    __reflect(IconImage.prototype, "fairui.IconImage");
})(fairui || (fairui = {}));
//# sourceMappingURL=IconImage.js.map