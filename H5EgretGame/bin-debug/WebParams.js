var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 网页相关参数
 * @author clong 2019.3.23
 */
var WebParams = (function () {
    function WebParams() {
    }
    WebParams.cdn = "";
    return WebParams;
}());
__reflect(WebParams.prototype, "WebParams");
//# sourceMappingURL=WebParams.js.map