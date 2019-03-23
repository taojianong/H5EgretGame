var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 面板ID
 * @author clong 2019.3.23
 */
var EnumPanelID = (function () {
    function EnumPanelID() {
    }
    /**登陆面板 1*/
    EnumPanelID.LOGIN = 1;
    /**主加载界面 5*/
    EnumPanelID.MAIN_LOADING = 5;
    /**弹出框 6*/
    EnumPanelID.ALERT = 6;
    return EnumPanelID;
}());
__reflect(EnumPanelID.prototype, "EnumPanelID");
//# sourceMappingURL=EnumPanelID.js.map