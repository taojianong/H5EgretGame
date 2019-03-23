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
var com;
(function (com) {
    var time;
    (function (time) {
        /**
         * Timer基类
         * @author cl 2018.3.28
         */
        var BaseTimer = (function (_super) {
            __extends(BaseTimer, _super);
            /**
             * 构造函数
             * @param name Timer的名字
             * @param delay 延时
             * @param repeatCount 计时次数
             */
            function BaseTimer(stack, delay, repeatCount) {
                if (repeatCount === void 0) { repeatCount = 0; }
                var _this = _super.call(this, delay, repeatCount) || this;
                /**名字 */
                _this.name = "";
                _this.name = stack;
                return _this;
            }
            return BaseTimer;
        }(egret.Timer));
        time.BaseTimer = BaseTimer;
        __reflect(BaseTimer.prototype, "com.time.BaseTimer");
    })(time = com.time || (com.time = {}));
})(com || (com = {}));
//# sourceMappingURL=BaseTimer.js.map