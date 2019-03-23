var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 界面静态参数
 */
var EnumPanel = (function () {
    function EnumPanel() {
    }
    /**底层UI层界面*/
    EnumPanel.TYPE_BOTTOM = 0;
    /**一级UI层界面*/
    EnumPanel.TYPE_WINDOW1 = 1;
    /**二级UI层界面*/
    EnumPanel.TYPE_WINDOW2 = 2;
    /**主UI层界面*/
    EnumPanel.TYPE_MAIUI = 3;
    /**Alert层界面*/
    EnumPanel.TYPE_ALERT = 4;
    /**TIPS层界面*/
    EnumPanel.TYPE_TIPS = 5;
    /**引导层界面*/
    EnumPanel.TYPE_Guide = 6;
    return EnumPanel;
}());
__reflect(EnumPanel.prototype, "EnumPanel");
//# sourceMappingURL=EnumPanel.js.map