var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var base;
(function (base) {
    var Animator = (function () {
        function Animator() {
            this._totalMovieTime = 1;
            this._isDispose = false;
            this._blendMode = egret.BlendMode.NORMAL;
            this._width = -1;
            this._height = -1;
            this.isCache = false;
        }
        /**Create an egret.SpriteSheet object 创建并缓存一个 egret.SpriteSheet 对象*/
        Animator.prototype.findFromCache = function (movieClipDataSet, texture) {
            var _self = this;
            _self._list = [];
            _self._width = texture.textureWidth;
            _self._height = texture.textureHeight;
            _self._spriteSheet = new egret.SpriteSheet(texture);
            _self._blendMode = movieClipDataSet.blendMode;
            var img;
            var dataList = movieClipDataSet.data;
            var length = dataList.length;
            for (var i = 0; i < length; i++) {
                img = _self.getSingleImage();
                img.offsetX = dataList[i].offx;
                img.offsetY = dataList[i].offy;
                img.width = dataList[i].width;
                img.height = dataList[i].height;
                img.x = dataList[i].x;
                img.y = dataList[i].y;
                img.delayTime = dataList[i].delay;
                img.imageName = dataList[i].imgName;
                _self._totalMovieTime += img.delayTime;
                _self._list.push(img);
            }
            this._isDispose = false;
        };
        /**Create a new Texture object for the specified area on SpriteSheet and cache it 为 SpriteSheet 上的指定区域创建一个新的 Texture 对象并缓存它 */
        Animator.prototype.createTexture = function (name, bitmapX, bitmapY, bitmapWidth, bitmapHeight, offsetX, offsetY, textureWidth, textureHeight) {
            return this._spriteSheet.createTexture(name, bitmapX, bitmapY, bitmapWidth, bitmapHeight, offsetX, offsetY, textureWidth, textureHeight);
        };
        Animator.prototype.getImage = function (index) {
            if (this._list)
                return this._list[index];
            return null;
        };
        Animator.prototype.getSingleImage = function () {
            return new base.SingleImage();
        };
        Object.defineProperty(Animator.prototype, "width", {
            get: function () {
                return this._width;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Animator.prototype, "height", {
            get: function () {
                return this._height;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Animator.prototype, "totalMovieTime", {
            get: function () {
                return this._totalMovieTime;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Animator.prototype, "length", {
            get: function () {
                return this._list.length;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Animator.prototype, "url", {
            get: function () {
                return this._url;
            },
            set: function (value) {
                this._url = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Animator.prototype, "blendMode", {
            get: function () {
                return this._blendMode;
            },
            set: function (value) {
                this._blendMode = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Animator.prototype, "isDispose", {
            get: function () {
                return this._isDispose;
            },
            enumerable: true,
            configurable: true
        });
        Animator.prototype.dispose = function () {
            if (this._list) {
                var leng = this._list.length;
                for (var i = 0; i < leng; i++) {
                    this._list[i].dispose();
                }
                this._list.slice(0, leng);
            }
            this._list = null;
            if (this._spriteSheet)
                this._spriteSheet.dispose();
            this._spriteSheet = null;
            this._url = null;
            this._totalMovieTime = 0;
            this._isDispose = true;
        };
        return Animator;
    }());
    base.Animator = Animator;
    __reflect(Animator.prototype, "base.Animator");
})(base || (base = {}));
//# sourceMappingURL=Animator.js.map