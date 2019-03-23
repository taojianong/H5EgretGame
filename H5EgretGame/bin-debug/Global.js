var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 全局类
 * @author clong 2019.3.23
 */
var Global = (function () {
    function Global() {
    }
    /**是否为调试模式 */
    Global.isDebug = true;
    return Global;
}());
__reflect(Global.prototype, "Global");
//# sourceMappingURL=Global.js.map