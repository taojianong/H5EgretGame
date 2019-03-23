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
    var GameEffect = (function (_super) {
        __extends(GameEffect, _super);
        function GameEffect() {
            var _this = _super.call(this) || this;
            _this._playing = false;
            var _self__ = _this;
            _self__._effect = new fairui.CEffect();
            _self__._effect.father = _self__;
            _self__.addChild(_self__._effect.view);
            _self__.touchEnabled = false;
            _self__.touchChildren = false;
            return _this;
        }
        Object.defineProperty(GameEffect.prototype, "effect", {
            get: function () {
                return this._effect;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameEffect.prototype, "isCache", {
            /**是否允许资源缓存：默认值true-该动画资源会一直缓存再内存中，除非手动删除该资源；false-会在下次动画资源回收时被释放*/
            get: function () {
                return this._effect.isCache;
            },
            set: function (value) {
                this._effect.isCache = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameEffect.prototype, "lastFrameHanderCallBack", {
            get: function () {
                return this._effect.lastFrameHanderCallBack;
            },
            set: function (value) {
                this._effect.lastFrameHanderCallBack = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameEffect.prototype, "lastFrameParams", {
            /**最后一帧执行方法参数 */
            get: function () {
                return this._effect.lastFrameParams;
            },
            set: function (value) {
                this._effect.lastFrameParams = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameEffect.prototype, "url", {
            get: function () {
                return this._effect.url;
            },
            set: function (value) {
                this._effect.url = value;
            },
            enumerable: true,
            configurable: true
        });
        GameEffect.prototype.palyOnceStop = function () {
            this._effect.lastFrameHanderCallBack = this.onPlayComplete; // new Handler("game::GameEffect /palyOnceStop()", flash.bind(this.onPlayComplete, this));
            this.restart();
        };
        GameEffect.prototype.onPlayComplete = function () {
            this.stop();
            App.timer.doTimeOnce(2000, flash.bind(this.onEnterFrame, this));
        };
        GameEffect.prototype.onEnterFrame = function () {
            this.palyOnceStop();
        };
        GameEffect.prototype.play = function () {
            if (!this._playing) {
                this._playing = true;
                this._effect.play();
            }
        };
        GameEffect.prototype.stop = function () {
            if (this._playing) {
                this._playing = false;
                this._effect.stop();
            }
        };
        GameEffect.prototype.restart = function () {
            this._effect.restart();
            this.play();
        };
        GameEffect.prototype.move = function ($x, $y, $parent) {
            if ($parent === void 0) { $parent = null; }
            this.x = $x;
            this.y = $y;
            if ($parent != null) {
                $parent.addChild(this);
            }
        };
        GameEffect.prototype.playOnce = function (fun, params) {
            if (fun === void 0) { fun = null; }
            if (params === void 0) { params = null; }
            this._effect.lastFrameParams = params;
            this._effect.lastFrameHanderCallBack = fun || flash.bind(this.onComplete, this); // new Handler("GameEffect/playOnce()", (fun != null ? fun : flash.bind(this.onComplete, this)));
            this.restart();
        };
        GameEffect.prototype.onComplete = function () {
            this.dispose();
        };
        Object.defineProperty(GameEffect.prototype, "currentIndex", {
            get: function () {
                return this._effect.currentIndex;
            },
            enumerable: true,
            configurable: true
        });
        GameEffect.prototype.clear = function () {
            App.timer.clearTimer(flash.bind(this.onEnterFrame, this));
            this.stop();
            this._effect.restart();
            this._effect.url = "";
        };
        GameEffect.prototype.dispose = function () {
            App.timer.clearTimer(flash.bind(this.onEnterFrame, this));
            this.stop();
            if (this.parent != null) {
                this.parent.removeChild(this);
            }
            if (this._effect) {
                this._effect.dispose();
                this._effect = null;
            }
        };
        Object.defineProperty(GameEffect.prototype, "width", {
            get: function () {
                return this._effect.view.width;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameEffect.prototype, "height", {
            get: function () {
                return this._effect.view.height;
            },
            enumerable: true,
            configurable: true
        });
        return GameEffect;
    }(egret.Sprite));
    fairui.GameEffect = GameEffect;
    __reflect(GameEffect.prototype, "fairui.GameEffect");
})(fairui || (fairui = {}));
//# sourceMappingURL=GameEffect.js.map