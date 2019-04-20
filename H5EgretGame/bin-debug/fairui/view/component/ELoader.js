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
     * 加载图片
     * @author cl 2019.1.29
     */
    var ELoader = (function (_super) {
        __extends(ELoader, _super);
        function ELoader(loader) {
            if (loader === void 0) { loader = null; }
            var _this = _super.call(this) || this;
            _this._pixelHitTest = false;
            _this.img = loader || new fairygui.GLoader();
            _this.img.touchable = false;
            return _this;
        }
        ELoader.prototype.addEventListener = function (type, listener, thisObject) {
            this.img.addEventListener(type, listener, thisObject);
        };
        ELoader.prototype.removeEventListener = function (type, listener, thisObject) {
            this.img.removeEventListener(type, listener, thisObject);
        };
        Object.defineProperty(ELoader.prototype, "fill", {
            get: function () {
                return this.img.fill;
            },
            set: function (value) {
                this.img.fill = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ELoader.prototype, "autoSize", {
            /**是否自动大小 */
            get: function () {
                return this.img.autoSize;
            },
            set: function (value) {
                this.img.autoSize = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ELoader.prototype, "touchable", {
            get: function () {
                return this.img.touchable;
            },
            set: function (value) {
                this.img.touchable = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ELoader.prototype, "parent", {
            get: function () {
                return this.img ? this.img.parent : null;
            },
            enumerable: true,
            configurable: true
        });
        ELoader.prototype.removeFromParent = function () {
            if (this.img) {
                this.img.removeFromParent();
            }
        };
        /**
         * 设置FairyGui资源
         * @param pkgName 包名
         * @param resName 资源名
         */
        ELoader.prototype.setFairySource = function (pkgName, resName) {
            if (this._url) {
                this._url = null;
                this.texture = null;
            }
            var url = fairygui.UIPackage.getItemURL(pkgName, resName);
            this.setFariyUrl(url);
        };
        /**
         * 设置FairyGui资源地址
         * @param url FairyGui资源地址
         */
        ELoader.prototype.setFariyUrl = function (url) {
            this._url = url;
            this.texture = fairui.FairyTextureUtils.getTexture(url);
        };
        Object.defineProperty(ELoader.prototype, "source", {
            get: function () {
                return this._source;
            },
            set: function (value) {
                this._source = value;
                if (value instanceof egret.Texture) {
                    this.texture = value;
                }
                else {
                    this.url = value;
                }
            },
            enumerable: true,
            configurable: true
        });
        ELoader.prototype.loadImage = function (url, callback, thisObject) {
            if (callback === void 0) { callback = null; }
            if (thisObject === void 0) { thisObject = null; }
            var sel = this;
            if (sel._url == url)
                return;
            sel.clear();
            sel._url = url;
            if (url != null) {
                fairui.LoaderManager.loadImageRes(url, this, onComplete);
            }
            function onComplete(value) {
                sel.texture = value;
                if (callback != null && thisObject != null) {
                    callback.call(thisObject);
                }
            }
        };
        Object.defineProperty(ELoader.prototype, "url", {
            get: function () {
                return this._url;
            },
            set: function (value) {
                var _self = this;
                var oldurl = _self._url;
                _self._url = value;
                if (oldurl != value && value) {
                    _self.texture = null;
                    if (value.indexOf("ui:") == 0) {
                        _self.img.url = value;
                    }
                    else {
                        fairui.LoaderManager.loadImageRes(value, _self, function loadComplete(value) {
                            _self.texture = value;
                        });
                    }
                }
                else if (!value) {
                    _self.texture = null;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ELoader.prototype, "texture", {
            /**
             * 设置图片纹理
             */
            get: function () {
                return this.img.texture;
            },
            set: function (value) {
                if (this.img != null) {
                    this.img.texture = value;
                }
                if (value != null) {
                    this.dispatchEvent(new egret.Event(egret.Event.COMPLETE));
                }
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 移动
         * @param $x        x坐标
         * @param $y        y坐标
         * @param $parent   容器
         */
        ELoader.prototype.move = function ($x, $y, $parent) {
            if ($parent === void 0) { $parent = null; }
            this.img.x = $x;
            this.img.y = $y;
            if ($parent != null) {
                $parent.addChild(this.img);
            }
        };
        Object.defineProperty(ELoader.prototype, "visible", {
            get: function () {
                return this.img.visible;
            },
            set: function (value) {
                this.img.visible = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ELoader.prototype, "grayed", {
            get: function () {
                return this.img.grayed;
            },
            set: function (val) {
                this.img.grayed = val;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ELoader.prototype, "alpha", {
            set: function (value) {
                this.img.alpha = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ELoader.prototype, "scaleX", {
            get: function () {
                return this.img.scaleX;
            },
            set: function (value) {
                this.img.scaleX = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ELoader.prototype, "scaleY", {
            get: function () {
                return this.img.scaleY;
            },
            set: function (value) {
                this.img.scaleY = value;
            },
            enumerable: true,
            configurable: true
        });
        ELoader.prototype.setScale = function (sx, sy) {
            this.img.setScale(sx, sy);
        };
        Object.defineProperty(ELoader.prototype, "x", {
            get: function () {
                return this.img.x;
            },
            set: function (value) {
                this.img.x = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ELoader.prototype, "y", {
            get: function () {
                return this.img.y;
            },
            set: function (value) {
                this.img.y = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ELoader.prototype, "width", {
            get: function () {
                return this.img ? this.img.width : 0;
            },
            set: function (value) {
                this.img.width = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ELoader.prototype, "height", {
            get: function () {
                return this.img ? this.img.height : 0;
            },
            set: function (value) {
                this.img.height = value;
            },
            enumerable: true,
            configurable: true
        });
        ELoader.prototype.setSize = function (width, height) {
            if (this.img) {
                this.img.setSize(width, height);
            }
        };
        Object.defineProperty(ELoader.prototype, "rotation", {
            get: function () {
                return this.img.rotation;
            },
            set: function (value) {
                this.img.rotation = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ELoader.prototype, "pixelHitTest", {
            /**
             * 像素碰撞
             */
            get: function () {
                return this._pixelHitTest;
            },
            set: function (val) {
                var loader = this.img;
                if (loader.content instanceof egret.Bitmap) {
                    loader.content.pixelHitTest = val;
                }
                this._pixelHitTest = val;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ELoader.prototype, "content", {
            get: function () {
                return this.img.content;
            },
            enumerable: true,
            configurable: true
        });
        ELoader.prototype.clear = function () {
            _super.prototype.clear.call(this);
            this._url = "";
            this.texture = null;
        };
        ELoader.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
            if (this.img != null) {
                this.img.dispose();
                this.img = null;
            }
            this._texture = null;
            this._url = null;
            this._source = null;
        };
        return ELoader;
    }(fairui.BaseSprite));
    fairui.ELoader = ELoader;
    __reflect(ELoader.prototype, "fairui.ELoader");
})(fairui || (fairui = {}));
//# sourceMappingURL=ELoader.js.map