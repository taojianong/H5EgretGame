var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 日志管理类
 * @author clong 2019.3.23
 */
var LogManager = (function () {
    function LogManager() {
        /**是否强制在控制台输出日志信息*/
        this.isShowLogType = false;
    }
    LogManager.prototype.log = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        console.log(args);
    };
    /**在Debug模式下输出一个日志信息到控制台。 LogManager.isShowLogType控制是否强制输出日志*/
    LogManager.prototype.debug = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (this.isShowLogType || Global.isDebug)
            egret.log("Debug Log：", args);
    };
    LogManager.prototype.error = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        try {
            var str = "Error Start.\n";
            egret.error("Error Log：", args);
            if (args instanceof Array) {
                for (var index in args) {
                    if (typeof args[index] === "object" && args[index]["stack"]) {
                        str += "Error Stack:" + args[index].stack + "\n";
                    }
                    else {
                        str += "Error TXT:" + args[index] + "\n";
                    }
                }
            }
            else
                str = args;
            if (!Global.isDebug) {
                // WebParams.setErrorLog(App.lang.getLang("lang_client_760"), str);
            }
            // fairui.OpenUIManager.getInstance().openDebugUI(str + "Error End.");
        }
        catch (e) {
            var txt = "LogManager.error() Error：" + e.toString();
            alert(txt);
            egret.error(txt);
        }
    };
    LogManager.prototype.warn = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (Global.isDebug)
            egret.warn("Warn Log：", args);
    };
    return LogManager;
}());
__reflect(LogManager.prototype, "LogManager");
//# sourceMappingURL=LogManager.js.map