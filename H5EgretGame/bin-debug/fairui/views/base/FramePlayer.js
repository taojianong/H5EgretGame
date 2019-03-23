var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var base;
(function (base) {
    var FramePlayer = (function () {
        function FramePlayer() {
            this._aniLength = -1;
            this._scaleX = 1;
            this._scaleY = 1;
            this._x = 0;
            this._y = 0;
            this._alpha = 1;
            this._visible = true;
            this._currentIndex = 0;
            this.init();
        }
        Object.defineProperty(FramePlayer.prototype, "animator", {
            get: function () {
                return this._ani;
            },
            enumerable: true,
            configurable: true
        });
        FramePlayer.prototype.init = function () {
            this._bitmap = this.makeBitmap();
        };
        FramePlayer.prototype.makeBitmap = function () {
            return new base.GBitmap();
        };
        FramePlayer.prototype.setTo = function (value1, value2) {
            this._x = value1;
            this._y = value2;
        };
        FramePlayer.prototype.seToPoint = function (p) {
            this.setTo(p.x, p.y);
        };
        Object.defineProperty(FramePlayer.prototype, "x", {
            get: function () {
                return this._x;
            },
            set: function (value) {
                this._x = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FramePlayer.prototype, "y", {
            get: function () {
                return this._y;
            },
            set: function (value) {
                this._y = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FramePlayer.prototype, "scaleX", {
            get: function () {
                return this._scaleX;
            },
            set: function (value) {
                if (this._scaleX != value) {
                    this._scaleX = value;
                    this.view.scaleX = value;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FramePlayer.prototype, "scaleY", {
            get: function () {
                return this._scaleY;
            },
            set: function (value) {
                if (this._scaleY != value) {
                    this._scaleY = value;
                    this.view.scaleY = value;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FramePlayer.prototype, "visible", {
            get: function () {
                return this._visible;
            },
            set: function (value) {
                if (this._visible != value) {
                    this._visible = value;
                    if (this.view) {
                        this.view.visible = value;
                    }
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FramePlayer.prototype, "alpha", {
            get: function () {
                return this._alpha;
            },
            set: function (value) {
                if (this._alpha != value) {
                    this._alpha = value;
                    if (this.view) {
                        this.view.alpha = value;
                    }
                }
            },
            enumerable: true,
            configurable: true
        });
        FramePlayer.prototype.deleteAnimator = function () {
            if (this._bitmap)
                this._bitmap.texture = null;
            if (this._ani) {
                this._ani = null;
            }
            this._aniLength = 0;
            this._currentIndex = 0;
        };
        Object.defineProperty(FramePlayer.prototype, "aniLength", {
            get: function () {
                return this._aniLength;
            },
            enumerable: true,
            configurable: true
        });
        /**给动画播放器添加动画数据*/
        FramePlayer.prototype.addAnimatior = function (ani) {
            if (ani == null) {
                this.deleteAnimator();
            }
            else {
                this._ani = ani;
                this._aniLength = this._ani.length;
                this._bitmap.blendMode = this._ani.blendMode;
                this._currentIndex = 0;
                this.updateViewBmd();
            }
        };
        Object.defineProperty(FramePlayer.prototype, "view", {
            get: function () {
                return this._bitmap;
            },
            enumerable: true,
            configurable: true
        });
        FramePlayer.prototype.restart = function () {
            this._currentIndex = 0;
        };
        FramePlayer.prototype.updateViewBmd = function () {
            if (this._ani && this._ani.isDispose == false) {
                var image = this._ani.getImage(this._currentIndex);
                if (image && image.bitmapData) {
                    this._bitmap.texture = image.bitmapData;
                    this._bitmap.x = image.offsetX * this._scaleX + this._x;
                    this._bitmap.y = image.offsetY * this._scaleY + this._y - 152;
                }
                else
                    this._bitmap.texture = null;
            }
            else
                this._bitmap.texture = null;
        };
        Object.defineProperty(FramePlayer.prototype, "currentIndex", {
            get: function () {
                return this._currentIndex;
            },
            set: function (value) {
                value = Math.floor(value);
                if (this._currentIndex != value) {
                    this._currentIndex = value;
                    this.updateViewBmd();
                }
            },
            enumerable: true,
            configurable: true
        });
        FramePlayer.prototype.addParent = function (parent) {
            if (this._parent != parent) {
                this._parent = parent;
                this._parent.addChild(this.view);
            }
        };
        FramePlayer.prototype.addParentAt = function (parent, idx) {
            if (this._parent != parent) {
                this._parent = parent;
                this._parent.addChildAt(this.view, idx);
            }
        };
        Object.defineProperty(FramePlayer.prototype, "parent", {
            get: function () {
                return this._parent;
            },
            enumerable: true,
            configurable: true
        });
        FramePlayer.prototype.removeParent = function () {
            if (this.view && this.view.parent)
                this.view.parent.removeChild(this.view);
            this._parent = null;
        };
        FramePlayer.prototype.resetAndClear = function (type) {
            if (type)
                this.removeParent();
            this.deleteAnimator();
            this.x = 0;
            this.y = 0;
            this.scaleX = 1;
            this.scaleY = 1;
            this.alpha = 1;
            this.visible = true;
            this._bitmap.x = 0;
            this._bitmap.y = 0;
            this._currentIndex = 0;
        };
        FramePlayer.prototype.dispose = function (type) {
            this.resetAndClear(type);
        };
        return FramePlayer;
    }());
    base.FramePlayer = FramePlayer;
    __reflect(FramePlayer.prototype, "base.FramePlayer");
})(base || (base = {}));
//# sourceMappingURL=FramePlayer.js.map