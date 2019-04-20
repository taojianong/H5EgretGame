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
     * 进度条
     * @author cl 2019.1.29
     */
    var ProgressBar = (function (_super) {
        __extends(ProgressBar, _super);
        function ProgressBar() {
            var _this = _super.call(this) || this;
            _this._progress = 0;
            _this._barWidth = 0;
            _this._maximum = 100;
            _this._minimum = 0;
            _this._slideDuration2 = 500;
            _this._isPlayTween = false;
            _this.tweenObj = null;
            _this["_slideDuration"] = 0;
            _this.touchable = false;
            return _this;
        }
        ProgressBar.prototype.constructFromXML = function (xml) {
            _super.prototype.constructFromXML.call(this, xml);
        };
        ProgressBar.prototype.setup_afterAdd = function (buffer, beginPos) {
            this.bg = this.getElement("bg");
            this.bar = this.getElement("icon");
            this.titleTxt = this.getElement("title");
            this._barWidth = this.bar.width;
            _super.prototype.setup_afterAdd.call(this, buffer, beginPos);
            if (this.selectedIcon && this.selectedIcon.length > 0) {
                this.bg.url = this.selectedIcon;
            }
            this.InitUI();
        };
        //初始化UI
        ProgressBar.prototype.InitUI = function () {
            this.maximum = this._maximum > 0 ? this._maximum : this.width;
        };
        ;
        /**
         * 设置标签
         * @param text 文本
         * @param color 文本颜色
         */
        ProgressBar.prototype.setLabel = function (text, color) {
            if (color === void 0) { color = -1; }
            this.text = text;
            if (color >= 0) {
                this.textColor = color;
            }
        };
        Object.defineProperty(ProgressBar.prototype, "textColor", {
            /**设置文本颜色 */
            get: function () {
                return this.titleTxt.color;
            },
            set: function (value) {
                this.titleTxt.color = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ProgressBar.prototype, "slideDuration2", {
            /**滑动时间，毫秒 */
            get: function () {
                return this._slideDuration2;
            },
            set: function (value) {
                this._slideDuration2 = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ProgressBar.prototype, "isPlayTween", {
            /**是否播放缓动动画 */
            get: function () {
                return this._isPlayTween; // this.slideDuration != 0;
            },
            set: function (value) {
                this._isPlayTween = value;
                if (value) {
                    this.tweenObj = this.tweenObj || {};
                }
                else if (this.tweenObj != null) {
                    fairygui.GTween.kill(this.tweenObj);
                    this.tweenObj = null;
                }
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 设置进度值
         * @param value 当前值
         * @param max 最大值
         * @param min 最小值,默认为0
         * @param needTween 是否需要缓动
         */
        ProgressBar.prototype.setVal = function (value, max, min, needTween, complete, thisObj) {
            if (max === void 0) { max = -1; }
            if (min === void 0) { min = 0; }
            if (needTween === void 0) { needTween = true; }
            if (complete === void 0) { complete = null; }
            if (thisObj === void 0) { thisObj = null; }
            var _self = this;
            if (max >= 0) {
                this._maximum = max;
                this.maximum = max;
            }
            if (min >= 0) {
                this.minimum = min;
            }
            this._slideDuration2 = (this.width - this.width * this.progress) * 0.0005; //这里单位是秒           
            if (this._isPlayTween && needTween) {
                this.tweenObj["value"] = this.value; //原来的值
                fairygui.GTween.kill(this.tweenObj);
                fairygui.GTween.to(this.value, value, this.slideDuration2).setTarget(this.tweenObj)
                    .onUpdate(this.onUpdate, this)
                    .onComplete(function complete2() {
                    var tw = fairygui.GTween.getTween(_self.tweenObj);
                    if (tw && complete != null) {
                        complete.apply(thisObj);
                    }
                }, this);
            }
            else {
                this.value = value;
            }
        };
        ProgressBar.prototype.onUpdate = function (tw) {
            this.value = this.tweenObj["value"] = tw.value.x;
        };
        Object.defineProperty(ProgressBar.prototype, "minimum", {
            get: function () {
                return this._minimum;
            },
            set: function (value) {
                this._minimum = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ProgressBar.prototype, "maximum", {
            get: function () {
                return this._maximum;
            },
            set: function (value) {
                this._maximum = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ProgressBar.prototype, "value", {
            get: function () {
                return this._minimum + (this._maximum - this._minimum) * this._progress;
            },
            set: function (val) {
                this.progress = (val - this._minimum) / (this._maximum - this._minimum);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ProgressBar.prototype, "progress", {
            /**
             * 进度条
             */
            get: function () {
                return this._progress;
            },
            set: function (value) {
                this._progress = value > 1 ? 1 : (value < 0 ? 0 : value);
                if (this.bar) {
                    this.bar.width = this._barWidth * this._progress;
                }
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 显示进度
         * @param value 当前值
         * @param max   最大值
         * @param isPer 是否显示百分比
         */
        ProgressBar.prototype.showProgress = function (value, max, isPer) {
            if (isPer === void 0) { isPer = false; }
            this.progress = max == 0 ? 0 : value / max;
            if (!isPer) {
                this.text = parseInt(value.toString()) + "/" + parseInt(max.toString());
            }
            else {
                this.text = parseInt("" + (this.progress * 100)) + "%";
            }
        };
        Object.defineProperty(ProgressBar.prototype, "text", {
            /**进度显示文本 */
            get: function () {
                return this.titleTxt.text;
            },
            set: function (value) {
                this.titleTxt.text = value;
            },
            enumerable: true,
            configurable: true
        });
        ProgressBar.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
            this.bar = null;
            this.titleTxt = null;
            this.bg = null;
        };
        return ProgressBar;
    }(fairui.BaseButton));
    fairui.ProgressBar = ProgressBar;
    __reflect(ProgressBar.prototype, "fairui.ProgressBar");
})(fairui || (fairui = {}));
//# sourceMappingURL=ProgressBar.js.map