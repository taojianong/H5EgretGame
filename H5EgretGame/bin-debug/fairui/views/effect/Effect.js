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
    // import RantionDisplayObjectUtil = com.utils.RantionDisplayObjectUtil;
    var MathUnit = com.utils.MathUnit;
    var ListenerHandlers = com.utils.ListenerHandlers;
    var Effect = (function (_super) {
        __extends(Effect, _super);
        function Effect() {
            var _this = _super.call(this) || this;
            _this._matrix = new egret.Matrix();
            _this._currentPasstime = 0;
            _this._angle = 0;
            _this._speed = 1;
            _this._isPlaying = false;
            _this._isCache = true;
            return _this;
        }
        Object.defineProperty(Effect.prototype, "isCache", {
            get: function () {
                return this._isCache;
            },
            set: function (value) {
                this._isCache = value;
            },
            enumerable: true,
            configurable: true
        });
        Effect.prototype.init = function () {
            _super.prototype.init.call(this);
        };
        Effect.prototype.makeBitmap = function () {
            return new fairui.EffectBitmap(this);
        };
        Effect.prototype.setTo = function (value1, value2) {
            egret.superSetter(Effect, this, "x", value1);
            egret.superSetter(Effect, this, "y", value2);
            if (this.animator) {
                var image = this.animator.getImage(this._currentIndex);
                if (image) {
                    this.view.x = (image.offsetX * this.view.scaleX + this.x);
                    this.view.y = (image.offsetY + this.y);
                }
            }
        };
        Object.defineProperty(Effect.prototype, "x", {
            get: function () {
                return egret.superGetter(Effect, this, "x");
            },
            set: function (value) {
                egret.superSetter(Effect, this, "x", value);
                if (this.animator) {
                    var image = this.animator.getImage(this._currentIndex);
                    if (image)
                        this.view.x = (image.offsetX * this.view.scaleX + this.x);
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Effect.prototype, "y", {
            get: function () {
                return egret.superGetter(Effect, this, "y");
            },
            set: function (value) {
                egret.superSetter(Effect, this, "y", value);
                if (this.animator) {
                    var image = this.animator.getImage(this._currentIndex);
                    if (image)
                        this.view.y = (image.offsetY + this.y);
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Effect.prototype, "degrees", {
            get: function () {
                return MathUnit.radinToDegrees(this._angle);
            },
            set: function (value) {
                this.angle = MathUnit.degreesToRadin(value);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Effect.prototype, "angle", {
            get: function () {
                return this._angle;
            },
            set: function (value) {
                if (value != this._angle) {
                    this._angle = value;
                    if (value == 0) {
                        this._matrix.identity();
                        this.view.matrix = this._matrix;
                    }
                    else {
                        this.rantionView();
                    }
                }
            },
            enumerable: true,
            configurable: true
        });
        Effect.prototype.rantionView = function () {
            if (this._angle != 0 && this.isDisposed == false && this.animator) {
                var image = this.animator.getImage(this._currentIndex);
                if (image) {
                    this._matrix.tx = this.x + image.offsetX;
                    this._matrix.ty = this.y + image.offsetY;
                    MathUnit.toPoint(this.view, this._matrix, image.offsetX, image.offsetY, this._angle);
                }
            }
        };
        Object.defineProperty(Effect.prototype, "isPlaying", {
            get: function () {
                return this._isPlaying;
            },
            enumerable: true,
            configurable: true
        });
        Effect.prototype.play = function () {
            this._isPlaying = true;
        };
        Effect.prototype.stop = function () {
            this._isPlaying = false;
        };
        Effect.prototype.restart = function () {
            this._currentPasstime = 0;
            _super.prototype.restart.call(this);
        };
        Effect.prototype.updateFrame = function (passtime) {
            this._currentPasstime += passtime;
            if (this.animator == null || this.animator.isDispose)
                return;
            var num = Math.floor(this._currentPasstime / this.animator.totalMovieTime);
            this._currentPasstime = this._currentPasstime % this.animator.totalMovieTime;
            var frame = this.currentIndex;
            var image = this.animator.getImage(frame);
            while (image && this._currentPasstime >= image.delayTime * this._speed) {
                this._currentPasstime -= image.delayTime * this._speed;
                frame++;
                if (frame >= this.aniLength) {
                    frame = 0;
                    num++;
                }
                image = this.animator.getImage(frame);
            }
            if (num > 0 && this.aniLength > 0) {
                for (var i = 0; i < num; i++)
                    this.lastFrameHandler();
            }
            if (this.isPlaying) {
                this.currentIndex = frame;
            }
        };
        Effect.prototype.lastFrameHandler = function () {
        };
        Object.defineProperty(Effect.prototype, "speed", {
            get: function () {
                return this._speed;
            },
            set: function (value) {
                if (this._speed != value) {
                    this._speed = (value <= 0.1 ? 0.1 : value);
                }
            },
            enumerable: true,
            configurable: true
        });
        Effect.prototype.updateViewBmd = function () {
            _super.prototype.updateViewBmd.call(this);
            this.rantionView();
        };
        Effect.prototype.addvanceTime = function (passtime) {
            if (this._isPlaying)
                this.updateFrame(passtime);
        };
        Object.defineProperty(Effect.prototype, "frameHandler", {
            get: function () {
                if (this._frameHandler == null)
                    this._frameHandler = new ListenerHandlers();
                return this._frameHandler;
            },
            enumerable: true,
            configurable: true
        });
        Effect.prototype.resetAndClear = function () {
            _super.prototype.resetAndClear.call(this);
            this._currentPasstime = 0;
            this._speed = 1;
            this._angle = 0;
            this.stop();
            if (this._matrix) {
                this._matrix.identity();
                this.view.matrix = this._matrix;
            }
            // if(this.animator) {
            // 	this.animator.resetAndClear();
            // }
        };
        Effect.prototype.dispose = function () {
            //yr_engine.core.utils.debug.stack.$_FunctionStackLog.intoStack("yr_engine.scene.effect::Effect /dispose()");
            _super.prototype.dispose.call(this);
            this._matrix = null;
        };
        return Effect;
    }(fairui.FramePlayer));
    fairui.Effect = Effect;
    __reflect(Effect.prototype, "fairui.Effect");
})(fairui || (fairui = {}));
//# sourceMappingURL=Effect.js.map