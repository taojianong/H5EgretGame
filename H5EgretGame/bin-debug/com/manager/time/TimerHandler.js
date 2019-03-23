var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var com;
(function (com) {
    var time;
    (function (time) {
        var TimerHandler = (function () {
            function TimerHandler() {
                this.delay = 0;
                this.repeat = false;
                this.userFrame = false;
                this.exeTime = NaN;
            }
            TimerHandler.prototype.clear = function () {
                this.method = null;
                this.args = null;
                this.callbackThisObj = null;
            };
            return TimerHandler;
        }());
        time.TimerHandler = TimerHandler;
        __reflect(TimerHandler.prototype, "com.time.TimerHandler");
    })(time = com.time || (com.time = {}));
})(com || (com = {}));
//# sourceMappingURL=TimerHandler.js.map