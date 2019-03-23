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
    var Bitmap = egret.Bitmap;
    /**
     * 加载图片
     * @author cl 2018.3.17
     */
    var ELoader = (function (_super) {
        __extends(ELoader, _super);
        function ELoader(loader) {
            if (loader === void 0) { loader = null; }
            var _this = _super.call(this) || this;
            _this.img = loader || new fairygui.GLoader();
            return _this;
        }
        ELoader.prototype.addEventListener = function (type, listener, thisObject, useCapture, priority) {
            _super.prototype.addEventListener.call(this, type, listener, thisObject, useCapture, priority);
        };
        /**
         * 设置FairyGui资源
         * @param pkgName 包名
         * @param resName 资源名
         */
        ELoader.prototype.setFairySource = function (pkgName, resName) {
            // if (this._url) {
            //     if (this._url.indexOf("ui://") == 0) {
            //         FairyTextureUtils.disposeTexture(this._url, this);//如果这里释放了，不可能重新加载，所以不能释放，除非整包资源都被卸载了!
            //         this.texture = null;
            //     } else if (this._url) {
            //         LoaderManager.disposeTarget(this._url, this);
            //     }
            //     this._url = null;
            // }
            var url = fairygui.UIPackage.getItemURL(pkgName, resName);
            this.setFariyUrl(url);
        };
        /**
         * 设置FairyGui资源地址
         * @param url FairyGui资源地址
         */
        ELoader.prototype.setFariyUrl = function (url) {
            if (this._url != url) {
                if (this._url && this._url.indexOf("ui://") == -1) {
                    fairui.LoaderManager.disposeTarget(this._url, this);
                }
                this._url = url;
                this.texture = fairui.FairyTextureUtils.getTexture(url, this);
            }
        };
        Object.defineProperty(ELoader.prototype, "url", {
            get: function () {
                return this._url;
            },
            set: function (value) {
                var _self = this;
                if (_self._url != value && _self._url) {
                    fairui.LoaderManager.disposeTarget(_self._url, _self); //这里释放有问题,后面再加载释放的图片有问题
                }
                var oldurl = _self._url;
                _self._url = value;
                if (oldurl != value && value) {
                    _self.texture = null;
                    fairui.LoaderManager.loadImageRes(value, _self, function loadComplete(texture) {
                        if (_self._url == value) {
                            var tempValue = fairui.LoaderManager.getRes(value, _self);
                            _self.texture = tempValue;
                        }
                    }, null);
                }
                else if (!value) {
                    _self.texture = null;
                }
                // _self._url = value;
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
        Object.defineProperty(ELoader.prototype, "displayObject", {
            get: function () {
                return this.img;
            },
            enumerable: true,
            configurable: true
        });
        ELoader.prototype.dispose = function () {
            if (this._url) {
                fairui.LoaderManager.disposeTarget(this._url, this);
                this._url = null;
            }
            if (this.img != null) {
                this.img.dispose();
                this.img = null;
            }
            this._texture = null;
            this._url = null;
        };
        Object.defineProperty(ELoader.prototype, "pixelHitTest", {
            set: function (val) {
                var loader = this.img;
                if (loader.content instanceof Bitmap) {
                    loader.content.pixelHitTest = val;
                }
            },
            enumerable: true,
            configurable: true
        });
        return ELoader;
    }(egret.EventDispatcher));
    fairui.ELoader = ELoader;
    __reflect(ELoader.prototype, "fairui.ELoader");
})(fairui || (fairui = {}));
//# sourceMappingURL=ELoader.js.map