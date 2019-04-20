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
     * 数字组件
     * @author clong 2018.11.2
     */
    var UINumberItemComp = (function (_super) {
        __extends(UINumberItemComp, _super);
        function UINumberItemComp() {
            var _this = _super.call(this) || this;
            _this._minVal = 0;
            _this._maxVal = 100;
            _this._add = 1;
            return _this;
        }
        UINumberItemComp.prototype.initUI = function () {
            _super.prototype.initUI.call(this);
            this.lab_num = this.getChild("title").asTextField;
            this.lab_num.touchable = true;
        };
        UINumberItemComp.prototype.addAllListener = function () {
            _super.prototype.addAllListener.call(this);
            this.addGameListener(egret.TouchEvent.TOUCH_TAP, this.touchAddHandler, this, this.btn_add);
            this.addGameListener(egret.TouchEvent.TOUCH_TAP, this.touchRedHandler, this, this.btn_red);
            this.addGameListener(egret.TouchEvent.TOUCH_TAP, this.touchLabHandler, this, this.lab_num);
            // this.addGameListener( GameEvent.CLICK_COUNTER , this.clickCounterHandler , this );
        };
        UINumberItemComp.prototype.removeAllListener = function () {
            _super.prototype.removeAllListener.call(this);
            this.removeGameListener(egret.TouchEvent.TOUCH_TAP, this.touchAddHandler, this, this.btn_add);
            this.removeGameListener(egret.TouchEvent.TOUCH_TAP, this.touchRedHandler, this, this.btn_red);
            this.removeGameListener(egret.TouchEvent.TOUCH_TAP, this.touchLabHandler, this, this.lab_num);
            // this.removeGameListener( GameEvent.CLICK_COUNTER , this.clickCounterHandler , this );
        };
        UINumberItemComp.prototype.touchAddHandler = function (e) {
            var num = this.value;
            if (num + this._add > this._maxVal) {
                this.lab_num.text = this._maxVal + "";
            }
            else {
                this.lab_num.text = "" + (num + this._add);
            }
            if (this._addHandler != null) {
                this._addHandler.executeWith([this.value]);
            }
            if (this._changeHandler != null) {
                this._changeHandler.executeWith([this.value]);
            }
        };
        UINumberItemComp.prototype.touchRedHandler = function (e) {
            var num = this.value;
            if (num - this._add < this._minVal) {
                this.lab_num.text = this._minVal + "";
            }
            else {
                this.lab_num.text = "" + (num - this._add);
            }
            if (this._redHandler != null) {
                this._redHandler.executeWith([this.value]);
            }
            if (this._changeHandler != null) {
                this._changeHandler.executeWith([this.value]);
            }
        };
        /**获取点击计算器的值 */
        UINumberItemComp.prototype.clickCounterHandler = function (e) {
            var item = e.data["item"];
            if (item != this) {
                return;
            }
            var index = e.data["index"];
            var str = this.lab_num.text;
            if (index < 10) {
                str = str + index;
                if (parseInt(str) > this._maxVal) {
                    str = this._maxVal.toString();
                }
                else if (parseInt(str) < this._minVal) {
                    str = this._minVal.toString();
                }
                this.lab_num.text = str;
            }
            else if (index == 10) {
                if (!str) {
                    str = this._minVal.toString();
                }
                this.lab_num.text = str;
            }
            else if (index == 11) {
                str = str.length > 0 ? str.substr(0, str.length - 1) : "";
                if (parseInt(str) > this._maxVal) {
                    str = this._maxVal.toString();
                }
                else if (parseInt(str) < this._minVal) {
                    str = this._minVal.toString();
                }
                this.lab_num.text = str;
            }
            else if (index == 12) {
                this.lab_num.text = this._maxVal.toString();
            }
            if (this._changeHandler != null) {
                this._changeHandler.executeWith([this.value]);
            }
        };
        /**打开计算器 */
        UINumberItemComp.prototype.touchLabHandler = function (e) {
            // UISystem.Inst.createWindowView( UIStoreCounterView , {"min":this._minVal,"max":this._maxVal,"item":this} );
        };
        Object.defineProperty(UINumberItemComp.prototype, "addValue", {
            /**添加的值 */
            get: function () {
                return this._add;
            },
            set: function (value) {
                this._add = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UINumberItemComp.prototype, "minVal", {
            /**最小值 */
            get: function () {
                return this._minVal;
            },
            set: function (value) {
                this._minVal = value;
                if (this.value < this._minVal) {
                    this.lab_num.text = this._minVal + "";
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UINumberItemComp.prototype, "maxVal", {
            /**最大值 */
            get: function () {
                return this._maxVal;
            },
            set: function (value) {
                this._maxVal = value;
                if (this.value > this._maxVal) {
                    this.lab_num.text = this._maxVal + "";
                }
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 设置默认值
         * @param num 默认值
         */
        UINumberItemComp.prototype.setDefault = function (num) {
            this.lab_num.text = num.toString();
        };
        Object.defineProperty(UINumberItemComp.prototype, "addHandler", {
            /**
             * 按加按钮触发
             */
            get: function () {
                return this._addHandler;
            },
            set: function (value) {
                this._addHandler = value;
                value.isImmediatelyGc = false;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UINumberItemComp.prototype, "redHandler", {
            /**
             * 按减按钮触发
             */
            get: function () {
                return this._redHandler;
            },
            set: function (value) {
                this._redHandler = value;
                value.isImmediatelyGc = false;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UINumberItemComp.prototype, "changeHandler", {
            get: function () {
                return this._changeHandler;
            },
            set: function (value) {
                this._changeHandler = value;
                value.isImmediatelyGc = false;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UINumberItemComp.prototype, "value", {
            get: function () {
                var num = this.lab_num ? parseInt(this.lab_num.text) : 0;
                return num;
            },
            enumerable: true,
            configurable: true
        });
        UINumberItemComp.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
            if (this._addHandler != null) {
                this._addHandler.gc();
            }
            if (this._redHandler != null) {
                this._redHandler.gc();
            }
            if (this._changeHandler != null) {
                this._changeHandler.gc();
            }
            this._addHandler = null;
            this._redHandler = null;
            this._changeHandler = null;
            this._maxVal = 0;
            this._minVal = 0;
        };
        return UINumberItemComp;
    }(fairui.BaseButton));
    fairui.UINumberItemComp = UINumberItemComp;
    __reflect(UINumberItemComp.prototype, "fairui.UINumberItemComp");
})(fairui || (fairui = {}));
//# sourceMappingURL=UINumberItemComp.js.map