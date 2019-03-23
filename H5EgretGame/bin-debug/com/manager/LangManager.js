var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 多语言管理类
 * @author clong 2019.3.23
 */
var LangManager = (function () {
    function LangManager() {
        this.data = new Object();
    }
    /**
     * 获取多语言
     * @param code 对应json键值
     * @param ...args 对应占位符参数
     */
    LangManager.prototype.getLang = function (code) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var str = this.data[code] || code;
        if (args.length > 0) {
            for (var i = 0, n = args.length; i < n; i++) {
                str = str.replace("{" + i + "}", args[i]);
            }
        }
        return str;
    };
    /**
     * 获取多语言
     * @param code 对应json键值
     * @param args 对应占位符参数 [string]
     */
    LangManager.prototype.getLangBy = function (code, args) {
        var str = this.data[code] || code;
        if (args.length > 0) {
            for (var i = 0, n = args.length; i < n; i++) {
                str = str.replace("{" + i + "}", args[i]);
            }
        }
        return str;
    };
    return LangManager;
}());
__reflect(LangManager.prototype, "LangManager");
//# sourceMappingURL=LangManager.js.map