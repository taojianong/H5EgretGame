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
    LogManager.prototype.log = function (thisObj) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var clsName = this.getClassName(thisObj);
        args.unshift("[console.log][" + clsName + "] ");
        console.log.apply(thisObj, args);
    };
    /**在Debug模式下输出一个日志信息到控制台。 LogManager.isShowLogType控制是否强制输出日志*/
    LogManager.prototype.debug = function (thisObj) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (this.isShowLogType || Global.isDebug) {
            var clsName = this.getClassName(thisObj);
            args.unshift("[debug][" + clsName + "] ");
            egret.log.apply(null, args);
        }
    };
    LogManager.prototype.error = function (thisObj) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        try {
            var clsName = this.getClassName(thisObj);
            args.unshift("[error][" + clsName + "] ");
            egret.error.apply(null, args);
            var str = "Error Start.\n";
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
            else {
                str = args;
            }
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
    /**
     * 警告日志
     */
    LogManager.prototype.warn = function (thisObj) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (Global.isDebug) {
            var clsName = this.getClassName(thisObj);
            args.unshift("[warn][" + clsName + "] ");
            egret.warn.apply(null, args);
        }
    };
    LogManager.prototype.getClassName = function (thisObj) {
        if (thisObj == null) {
            return "";
        }
        if (typeof (thisObj) == "string") {
            return String(thisObj);
        }
        var fullNames = egret.getQualifiedClassName(thisObj).split("::");
        return fullNames[fullNames.length - 1];
    };
    return LogManager;
}());
__reflect(LogManager.prototype, "LogManager");
//# sourceMappingURL=LogManager.js.map