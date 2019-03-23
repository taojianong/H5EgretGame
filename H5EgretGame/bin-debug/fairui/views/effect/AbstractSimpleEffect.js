var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var fairui;
(function (fairui) {
    var SingleImage = base.SingleImage;
    var AbstractSimpleEffect = (function () {
        function AbstractSimpleEffect() {
            this._currentPasstime = 0;
            this._speed = 1;
            this._aniLength = -1;
            this._x = 0;
            this._y = 0;
            this._isDisposed = false;
            this._isPlaying = false;
            this._currentIndex = 0;
            this.init();
        }
        AbstractSimpleEffect.prototype.init = function () {
        };
        AbstractSimpleEffect.prototype.deleteAnimator = function () {
            this._ani = null;
            this._aniLength = 0;
            this._currentIndex = 0;
        };
        Object.defineProperty(AbstractSimpleEffect.prototype, "aniLength", {
            get: function () {
                return this._aniLength;
            },
            enumerable: true,
            configurable: true
        });
        AbstractSimpleEffect.prototype.addAnimatior = function (ani) {
            if (ani == null) {
                this.deleteAnimator();
            }
            else {
                this._ani = ani;
                this._aniLength = this._ani.length;
                this.updateViewBmd();
            }
        };
        Object.defineProperty(AbstractSimpleEffect.prototype, "animator", {
            get: function () {
                return this._ani;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AbstractSimpleEffect.prototype, "view", {
            get: function () {
                return this._view;
            },
            enumerable: true,
            configurable: true
        });
        AbstractSimpleEffect.prototype.restart = function () {
            this._currentIndex = 0;
        };
        AbstractSimpleEffect.prototype.updateViewBmd = function () {
            if (this._ani && this._ani.isDispose == false) {
                var image = flash.As3As(this._ani.getImage(this._currentIndex), SingleImage);
                if (image && this._view && image.bitmapData) {
                    this.setViewSingleImage(image);
                }
            }
        };
        AbstractSimpleEffect.prototype.setViewSingleImage = function (image) {
        };
        Object.defineProperty(AbstractSimpleEffect.prototype, "isDispose", {
            get: function () {
                return this._isDisposed;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AbstractSimpleEffect.prototype, "currentIndex", {
            get: function () {
                return this._currentIndex;
            },
            set: function (value) {
                //value = value);
                if (this._currentIndex != value) {
                    this._currentIndex = value;
                    this.updateViewBmd();
                }
            },
            enumerable: true,
            configurable: true
        });
        AbstractSimpleEffect.prototype.addParent = function (parent) {
            if (this._parent != parent) {
                this._parent = parent;
                this._parent.addChild(this.view);
            }
        };
        Object.defineProperty(AbstractSimpleEffect.prototype, "parent", {
            get: function () {
                return this._parent;
            },
            enumerable: true,
            configurable: true
        });
        AbstractSimpleEffect.prototype.removeParent = function () {
            if (this.view && this.view.parent)
                this.view.parent.removeChild(this.view);
            this._parent = null;
        };
        AbstractSimpleEffect.prototype.setTo = function (value1, value2) {
            this._x = value1;
            this._y = value2;
            if (this.animator) {
                var image = this.animator.getImage(this._currentIndex);
                if (image) {
                    this.view["x"] = (image.offsetX * this.view["scaleX"] + this.x);
                    this.view["y"] = (image.offsetY + this.y);
                }
            }
        };
        Object.defineProperty(AbstractSimpleEffect.prototype, "x", {
            get: function () {
                return this._x;
            },
            set: function (value) {
                if (this._x != value) {
                    this._x = value;
                    if (this.animator) {
                        var image = this.animator.getImage(this._currentIndex);
                        if (image)
                            this.view["x"] = (image.offsetX * this.view["scaleX"] + this.x);
                    }
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AbstractSimpleEffect.prototype, "y", {
            get: function () {
                return this._y;
            },
            set: function (value) {
                if (this._y != value) {
                    this._y = value;
                    if (this.animator) {
                        var image = this.animator.getImage(this._currentIndex);
                        if (image) {
                            this.view["y"] = (image.offsetY + this.y);
                        }
                    }
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AbstractSimpleEffect.prototype, "alpha", {
            get: function () {
                if (this.view)
                    return this.view["alpha"];
                return 1;
            },
            set: function (value) {
                if (this.view)
                    this.view["alpha"] = value;
            },
            enumerable: true,
            configurable: true
        });
        AbstractSimpleEffect.prototype.play = function () {
            this._isPlaying = true;
        };
        AbstractSimpleEffect.prototype.stop = function () {
            this._isPlaying = false;
        };
        AbstractSimpleEffect.prototype.updateFrame = function (passtime) {
            this._currentPasstime += passtime;
            if (this.animator == null || this.animator.isDispose)
                return;
            var num = this._currentPasstime / this.animator.totalMovieTime;
            this._currentPasstime = this._currentPasstime % this.animator.totalMovieTime;
            var frame = this.currentIndex;
            var image = this.animator.getImage(frame);
            while (image && this._currentPasstime >= image.delayTime * this.speed) {
                this._currentPasstime -= image.delayTime * this.speed;
                frame++;
                if (frame >= this.aniLength) {
                    frame = 0;
                    num++;
                }
                image = this.animator.getImage(frame);
            }
            this.currentIndex = frame;
            if (num > 0 && this.aniLength > 0) {
                for (var i = 0; i < num; i++)
                    this.lastFrameHandler();
            }
        };
        AbstractSimpleEffect.prototype.lastFrameHandler = function () {
        };
        Object.defineProperty(AbstractSimpleEffect.prototype, "speed", {
            get: function () {
                return this._speed;
            },
            set: function (value) {
                if (this._speed != value) {
                    this._speed = value;
                }
            },
            enumerable: true,
            configurable: true
        });
        AbstractSimpleEffect.prototype.addvanceTime = function (passtime) {
            if (this._isPlaying)
                this.updateFrame(passtime);
        };
        AbstractSimpleEffect.prototype.resetAndClear = function () {
            this.removeParent();
            this.deleteAnimator();
            this._x = 0;
            this._y = 0;
            this._currentPasstime = 0;
            this._speed = 1;
            this.stop();
        };
        AbstractSimpleEffect.prototype.dispose = function () {
            this.resetAndClear();
            this._view = null;
            this._isDisposed = true;
        };
        return AbstractSimpleEffect;
    }());
    fairui.AbstractSimpleEffect = AbstractSimpleEffect;
    __reflect(AbstractSimpleEffect.prototype, "fairui.AbstractSimpleEffect");
})(fairui || (fairui = {}));
//# sourceMappingURL=AbstractSimpleEffect.js.map