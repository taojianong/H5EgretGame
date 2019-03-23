var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var fairui;
(function (fairui) {
    // import Q_panel_registerExpandBean = com.game.data.bean.Q_panel_registerExpandBean;
    /**
     * 面板信息
     * @author cl 2018.2.5
     */
    var PanelInfo = (function () {
        /**
         * 构造函数
         * @param res			面板资源swf名称
         * @param loadingTip	面板加载时显示的加载内容，如背包模块加载中
         * @param className	面板类
         * @param panelId		面板id
         * @param panelType 面板类型
         * @param canDispose    是否可释放
         * @param showBottomBtn 打开面板的时候显示底部按钮
         * @param funcId    面板对应功能ID
         */
        function PanelInfo(panelId, panelType, res, loadingTip, className, canDispose, showBottomBtn, funcId) {
            if (canDispose === void 0) { canDispose = true; }
            if (showBottomBtn === void 0) { showBottomBtn = false; }
            if (funcId === void 0) { funcId = 0; }
            /**是否可释放 */
            this.canDispose = true;
            /**打开面板的时候显示底部按钮 */
            this.showBottomBtn = true;
            this.panelid = panelId;
            this.panelType = panelType;
            this.res = res;
            this.loadingTip = App.lang.getLang(loadingTip);
            this.className = className;
            this.canDispose = canDispose;
            this.showBottomBtn = showBottomBtn;
            this.funcId = funcId;
        }
        /**面板配置数据 */
        // public get bean():Q_panel_registerExpandBean{
        //     return App.config.q_panel_registerContainer.getDataBean( this.panelid );
        // }
        PanelInfo.prototype.onProgress = function (current, total) {
            EventManager.dispatchEvent(GameEvent.LOAD_PROGRESS, this.panelid, current, total);
        };
        return PanelInfo;
    }());
    fairui.PanelInfo = PanelInfo;
    __reflect(PanelInfo.prototype, "fairui.PanelInfo", ["RES.PromiseTaskReporter"]);
})(fairui || (fairui = {}));
//# sourceMappingURL=PanelInfo.js.map