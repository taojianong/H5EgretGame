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
     * 图片基类
     * @author cl 2018.3.19
     */
    var BaseImage = (function (_super) {
        __extends(BaseImage, _super);
        function BaseImage() {
            var _this = _super.call(this) || this;
            _this.img = new fairygui.GImage();
            _this.addChild(_this.img);
            return _this;
        }
        /**
         * 设置FairyGui资源
         * @param pkgName 包名
         * @param resName 资源名
         */
        BaseImage.prototype.setFairySource = function (pkgName, resName, disObj) {
            if (disObj === void 0) { disObj = null; }
            if (this._url) {
                if (this._url.indexOf("ui://") == 0) {
                    //FairyTextureUtils.disposeTexture( this._url , this );//如果这里释放了，不可能重新加载，所以不能释放，除非整包资源都被卸载了!
                    this.texture = null;
                }
                else if (this._url) {
                    fairui.LoaderManager.disposeTarget(this._url, this);
                }
                this._url = null;
            }
            var url = fairygui.UIPackage.getItemURL(pkgName, resName);
            this.setFariyUrl(url);
        };
        /**
         * 设置FairyGui资源地址
         * @param url FairyGui资源地址
         */
        BaseImage.prototype.setFariyUrl = function (url, disObj) {
            if (disObj === void 0) { disObj = null; }
            this._url = url;
            this.texture = fairui.FairyTextureUtils.getTexture(url, this);
        };
        Object.defineProperty(BaseImage.prototype, "url", {
            /**
             * 设置图片加载地址,绝对路径地址
             */
            get: function () {
                return this._url;
            },
            set: function (value) {
                if (value && value.indexOf("ui://") == 0) {
                    this.setFariyUrl(value);
                    return;
                }
                else if (this._url != value && this._url) {
                    fairui.LoaderManager.disposeTarget(this._url, this);
                }
                if (this._url != value && value) {
                    fairui.LoaderManager.loadImageRes(value, this, function loadComplete(texture) {
                        value = fairui.LoaderManager.getRes(value, this);
                        this.texture = value;
                        this.dispatchEvent(new egret.Event(egret.Event.COMPLETE));
                    }, null);
                }
                else if (!value) {
                    this.texture = null;
                }
                this._url = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BaseImage.prototype, "sizeGrid", {
            /**
             * 设置九宫格数据
             * @param value 如 90,2,90,2
             */
            set: function (value) {
                var rect = new egret.Rectangle();
                var arr = value.split(",");
                rect.x = parseInt(arr[0]);
                rect.y = parseInt(arr[1]);
                rect.width = parseInt(arr[0]);
                rect.height = parseInt(arr[0]);
                this.scale9Grid = rect;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BaseImage.prototype, "scale9Grid", {
            /**
             * 设置九宫格
             */
            get: function () {
                var content = this.displayObject;
                var bmp = content.getChildAt(0);
                return bmp.scale9Grid;
            },
            set: function (value) {
                var content = this.img.displayObject;
                var bmp = content.getChildAt(0);
                if (bmp) {
                    bmp.scale9Grid = value;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BaseImage.prototype, "texture", {
            /**
             * 设置图片纹理
             */
            get: function () {
                return this.img.texture;
            },
            set: function (value) {
                this.img.texture = value;
                this.width = value ? value.textureWidth : 1;
                this.height = value ? value.textureHeight : 1;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BaseImage.prototype, "width", {
            get: function () {
                return this.img.width;
            },
            set: function (value) {
                this.img.width = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BaseImage.prototype, "height", {
            get: function () {
                return this.img.height;
            },
            set: function (value) {
                this.img.height = value;
            },
            enumerable: true,
            configurable: true
        });
        BaseImage.prototype.clear = function () {
            //super.clear();
            if (this._url.indexOf("ui://") == 0) {
                fairui.FairyTextureUtils.disposeTexture(this._url, this);
            }
            else if (this._url) {
                fairui.LoaderManager.disposeTarget(this._url, this);
            }
            this._url = null;
            this.texture = null;
        };
        /**
         * 释放资源
         */
        BaseImage.prototype.dispose = function () {
            this.removeAllListeners();
            this.clear();
            _super.prototype.dispose.call(this);
            if (this.img != null) {
                this.img.dispose();
                this.img = null;
            }
        };
        return BaseImage;
    }(fairui.BaseSprite));
    fairui.BaseImage = BaseImage;
    __reflect(BaseImage.prototype, "fairui.BaseImage");
})(fairui || (fairui = {}));
//# sourceMappingURL=BaseImage.js.map