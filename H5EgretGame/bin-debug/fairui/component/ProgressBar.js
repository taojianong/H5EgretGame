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
     * @author cl 2018.3.31
     */
    var ProgressBar = (function (_super) {
        __extends(ProgressBar, _super);
        function ProgressBar() {
            var _this = _super.call(this) || this;
            _this.fullEffect = null;
            _this._progress = 0;
            _this._barWidth = 0;
            _this.touchable = false;
            return _this;
        }
        ProgressBar.prototype.constructFromXML = function (xml) {
            _super.prototype.constructFromXML.call(this, xml);
        };
        //public setup_beforeAdd(xml: any): void {
        // super.setup_beforeAdd(xml);
        ProgressBar.prototype.setup_beforeAdd = function (buffer, beginPos) {
            _super.prototype.setup_beforeAdd.call(this, buffer, beginPos);
            this.bg = this.getElement("bg");
            this.bar = this.getElement("icon");
            this.titleTxt = this.getElement("title");
            this._barWidth = this.bar.width;
            // super.setup_afterAdd(xml);
            _super.prototype.setup_beforeAdd.call(this, buffer, beginPos);
            if (this.selectedIcon && this.selectedIcon.length > 0) {
                this.bg.url = this.selectedIcon;
            }
        };
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
            if (!value) {
                value = 0;
            }
            if (max == 0) {
                this.progress = 0;
            }
            else {
                this.progress = value / max;
            }
            //this.progress = max == 0 ? 0 : value / max;
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
        ProgressBar.prototype.playUpEffect = function (once) {
            if (once === void 0) { once = true; }
            var _self = this;
            if (_self.fullEffect) {
                _self.fullEffect.stop();
                _self.fullEffect.removeFromParent();
                // _self.activeEffect.dispose();
                _self.fullEffect = null;
            }
            if (_self.fullEffect == null) {
                _self.fullEffect = new fairui.AssetEffect();
                _self.fullEffect.url = AssetPathManager.getInstance().getMenuEffect("main", "effect_01");
                _self.fullEffect.setScale(this.width / 295, 1.09);
                _self.fullEffect.move(this.width * 0.5 - 8, 5);
                _self.addChild(_self.fullEffect);
                if (once) {
                    _self.fullEffect.playOnce(playComplete);
                }
                else {
                    _self.fullEffect.play();
                }
            }
            function playComplete() {
                if (_self.fullEffect) {
                    _self.fullEffect.stop();
                    _self.fullEffect.removeFromParent();
                    // _self.activeEffect.dispose();
                    _self.fullEffect = null;
                }
            }
        };
        ProgressBar.prototype.stopUpEffect = function () {
            var _self = this;
            if (_self.fullEffect) {
                _self.fullEffect.stop();
                _self.fullEffect.removeFromParent();
                _self.fullEffect.dispose();
                _self.fullEffect = null;
            }
        };
        Object.defineProperty(ProgressBar.prototype, "isPlayingEffect", {
            get: function () {
                return this.fullEffect != null;
            },
            enumerable: true,
            configurable: true
        });
        return ProgressBar;
    }(fairui.BaseButton));
    fairui.ProgressBar = ProgressBar;
    __reflect(ProgressBar.prototype, "fairui.ProgressBar");
})(fairui || (fairui = {}));
//# sourceMappingURL=ProgressBar.js.map