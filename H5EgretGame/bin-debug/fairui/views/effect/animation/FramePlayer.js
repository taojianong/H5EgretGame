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
    var FramePlayer = (function (_super) {
        __extends(FramePlayer, _super);
        function FramePlayer() {
            var _this = _super.call(this) || this;
            _this._aniLength = -1;
            _this._scaleX = 1;
            _this._scaleY = 1;
            _this._x = 0;
            _this._y = 0;
            _this._alpha = 1;
            _this._visible = true;
            _this._isDisposed = false;
            _this._currentIndex = 0;
            _this.init();
            return _this;
        }
        Object.defineProperty(FramePlayer.prototype, "father", {
            get: function () {
                return this._father;
            },
            set: function (value) {
                this._father = value;
            },
            enumerable: true,
            configurable: true
        });
        FramePlayer.prototype.init = function () {
            this._bitmap = this.makeBitmap();
            this._isDisposed = false;
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
        FramePlayer.prototype.addAnimatior = function (ani) {
            if (ani == null) {
                this.deleteAnimator();
            }
            else {
                this._ani = ani;
                this._aniLength = this._ani.length;
                this._bitmap.blendMode = this._ani.blendMode;
                this.updateViewBmd();
            }
        };
        Object.defineProperty(FramePlayer.prototype, "animator", {
            get: function () {
                return this._ani;
            },
            enumerable: true,
            configurable: true
        });
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
                if (image && this._bitmap && image.bitmapData) {
                    this._bitmap.texture = image.bitmapData;
                    this._bitmap.x = image.offsetX * this._scaleX + this._x;
                    this._bitmap.y = image.offsetY * this._scaleY + this._y;
                }
            }
        };
        Object.defineProperty(FramePlayer.prototype, "isDisposed", {
            get: function () {
                return this._isDisposed;
            },
            enumerable: true,
            configurable: true
        });
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
        FramePlayer.prototype.resetAndClear = function () {
            this.removeParent();
            this.deleteAnimator();
            this._x = 0;
            this._y = 0;
            this._scaleX = 1;
            this._scaleY = 1;
            this.view.scaleX = 1;
            this.view.scaleY = 1;
            this.alpha = 1;
            this.visible = true;
            this._father = null;
        };
        FramePlayer.prototype.dispose = function () {
            this.resetAndClear();
            this._bitmap = null;
            this._isDisposed = true;
        };
        return FramePlayer;
    }(egret.HashObject));
    fairui.FramePlayer = FramePlayer;
    __reflect(FramePlayer.prototype, "fairui.FramePlayer", ["IDispose"]);
})(fairui || (fairui = {}));
//# sourceMappingURL=FramePlayer.js.map