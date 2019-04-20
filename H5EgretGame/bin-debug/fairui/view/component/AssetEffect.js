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
     * FairyGui组件播放Asset特效
     * @author cl 2018.3.13
     */
    var AssetEffect = (function (_super) {
        __extends(AssetEffect, _super);
        function AssetEffect() {
            var _this = _super.call(this) || this;
            _this.gameEffect = new fairui.GameEffect();
            _this.gameEffect.touchChildren = false;
            _this.gameEffect.touchEnabled = false;
            _this.touchable = false;
            _this._rootContainer.addChild(_this.gameEffect);
            return _this;
        }
        Object.defineProperty(AssetEffect.prototype, "url", {
            /**
             * 特效地址
             */
            get: function () {
                return this.gameEffect.url;
            },
            set: function (value) {
                this.gameEffect.url = value;
                // Global.log.debug( Global.lang.getLang("panel_debug_1",value) );//加载特效地址 url: {0}
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AssetEffect.prototype, "lastFrameHanderCallBack", {
            get: function () {
                return this.gameEffect.lastFrameHanderCallBack;
            },
            /**
             * 播放到最后一帧时的动画调用事件
             */
            set: function (value) {
                this.gameEffect.lastFrameHanderCallBack = value;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 播放一次停止
         */
        AssetEffect.prototype.palyOnceStop = function () {
            this.gameEffect.palyOnceStop();
        };
        /**
         * 播放
         */
        AssetEffect.prototype.play = function () {
            this.gameEffect.play();
        };
        /**
         * 停止
         */
        AssetEffect.prototype.stop = function () {
            this.gameEffect.stop();
        };
        /**
         * 重新播放
         */
        AssetEffect.prototype.restart = function () {
            this.gameEffect.restart();
        };
        /**
         * 移动
         * @param $x        x坐标
         * @param $y        y坐标
         * @param $parent   容器
         */
        AssetEffect.prototype.move = function ($x, $y, $parent) {
            if ($parent === void 0) { $parent = null; }
            this.gameEffect.move($x, $y, null);
            if ($parent != null) {
                if (this.parent != null) {
                    this.removeFromParent();
                }
                $parent.addChild(this);
            }
        };
        /**
         * 播放一次
         */
        AssetEffect.prototype.playOnce = function (fun) {
            if (fun === void 0) { fun = null; }
            this.gameEffect.playOnce(fun);
        };
        Object.defineProperty(AssetEffect.prototype, "currentIndex", {
            /**
             * 当前帧
             */
            get: function () {
                return this.gameEffect.currentIndex;
            },
            enumerable: true,
            configurable: true
        });
        AssetEffect.prototype.setScale = function (sx, sy) {
            //super.setScale(sx,sy);//不能调用此函数,这样会导致特效放缩增大一倍
            this.gameEffect.scaleX = sx;
            this.gameEffect.scaleY = sy;
        };
        /**
         * 清理
         */
        AssetEffect.prototype.clear = function () {
            if (this.gameEffect) {
                this.gameEffect.clear();
            }
        };
        Object.defineProperty(AssetEffect.prototype, "height", {
            get: function () {
                return this.gameEffect.height;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AssetEffect.prototype, "width", {
            get: function () {
                return this.gameEffect.width;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AssetEffect.prototype, "openTouch", {
            /**设置 触摸是否开启或者关闭 */
            set: function (value) {
                this.gameEffect.touchChildren = value;
                this.gameEffect.touchEnabled = value;
                this.touchable = value;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 释放
         */
        AssetEffect.prototype.dispose = function () {
            this.stop();
            if (this.gameEffect != null) {
                this.gameEffect.dispose();
                this.gameEffect = null;
            }
            _super.prototype.dispose.call(this);
        };
        return AssetEffect;
    }(fairui.BaseSprite));
    fairui.AssetEffect = AssetEffect;
    __reflect(AssetEffect.prototype, "fairui.AssetEffect");
})(fairui || (fairui = {}));
//# sourceMappingURL=AssetEffect.js.map