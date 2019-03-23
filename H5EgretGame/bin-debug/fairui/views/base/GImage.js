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
    var GImage = (function (_super) {
        __extends(GImage, _super);
        function GImage() {
            var _this = _super.call(this) || this;
            _this._isCache = true;
            _this._bitmap = new base.GBitmap();
            _this.addChild(_this._bitmap);
            _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.addtoStageHandler, _this);
            return _this;
        }
        Object.defineProperty(GImage.prototype, "url", {
            get: function () {
                return this._url;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GImage.prototype, "isChche", {
            get: function () {
                return this._isCache;
            },
            set: function (value) {
                this._isCache = value;
            },
            enumerable: true,
            configurable: true
        });
        GImage.prototype.addtoStageHandler = function (event) {
            this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.addtoStageHandler, this);
        };
        /**作为内容加载的URL或texture的对象。*/
        GImage.prototype.source = function (data, thisObject, complete, progress, error) {
            var _self = this;
            if (data) {
                _self._thisObject = thisObject;
                _self._complete = complete;
                _self._progress = progress;
                _self._error = error;
                if (!_self._bitmap) {
                    _self._bitmap = new base.GBitmap();
                    _self.addChild(_self._bitmap);
                }
                if (typeof data === "string") {
                    if (_self._url == data)
                        return;
                    _self._url = data;
                    com.loader.GLoaderManager.getInstance().load(data, EnumLoader.IMG, _self, _self.onComplete, _self.onProgress, _self.onLoadError, null, _self._isCache);
                }
                else {
                    if (_self._bitmap.texture == data)
                        return;
                    _self._url = null;
                    _self._bitmap.texture = data;
                }
            }
            else
                _self.dispose(false);
        };
        GImage.prototype.scale9Grid = function (sx, sy, sw, sh) {
            this._bitmap.scale9Grid = new egret.Rectangle(sx, sy, sw, sh);
        };
        GImage.prototype.onComplete = function (data) {
            if (this._bitmap)
                this._bitmap.texture = data.data;
            if (this._complete)
                this._complete.apply(this._thisObject);
        };
        GImage.prototype.onLoadError = function (data) {
            if (this._error)
                this._error.apply(this._thisObject);
        };
        GImage.prototype.onProgress = function (event) {
            if (this._progress)
                this._progress.apply(this._thisObject, [event]);
        };
        Object.defineProperty(GImage.prototype, "width", {
            get: function () {
                return this._bitmap.width;
            },
            set: function (value) {
                this._bitmap.width = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GImage.prototype, "height", {
            get: function () {
                return this._bitmap.height;
            },
            set: function (value) {
                this._bitmap.height = value;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 释放资源
         * @param type 是否释放资源
         */
        GImage.prototype.dispose = function (type) {
            _super.prototype.dispose.call(this, type);
            var _self = this;
            _self.removeAllEventListener();
            if (_self._bitmap) {
                _self._bitmap.texture = null;
                _self.removeChild(_self._bitmap);
            }
            _self._bitmap = null;
            if (_self._url) {
                com.loader.GLoaderManager.getInstance().unLoad(_self._url, _self, _self.onComplete);
                if (type) {
                    App.asset.deleteImgAsset(_self._url);
                    _self._url = null;
                }
            }
            _self._complete = null;
            _self._progress = null;
            _self._error = null;
            _self._thisObject = null;
        };
        return GImage;
    }(base.GSprite));
    base.GImage = GImage;
    __reflect(GImage.prototype, "base.GImage");
})(base || (base = {}));
//# sourceMappingURL=GImage.js.map