var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var fairui;
(function (fairui) {
    /**
     * 面板注册 clong 2019.1.30
     */
    var PanelRegister = (function () {
        function PanelRegister() {
        }
        /**
         * 注册组件类与fairygui编辑器中类对应
         * @param pkgName 包名
         * @param resName 资源名
         * @param cls	  对应包中类名
         */
        PanelRegister.registerClass = function (pkgName, resName, cls) {
            if (pkgName && !fairygui.UIPackage.getById(pkgName)) {
                fairygui.UIPackage.addPackage(pkgName);
            }
            var url = fairygui.UIPackage.getItemURL(pkgName, resName);
            fairygui.UIObjectFactory.setPackageItemExtension(url, cls);
        };
        /**
         * 创建自定义fairygui组件，必须用此方式,与以上方法对应使用,不能直接使用new cls()的方式创建一个绑定fairygui的类！
         * @param pkgName 包名
         * @param resName 资源名
         */
        PanelRegister.createGObject = function (pkgName, resName) {
            return fairygui.UIPackage.createObjectFromURL(fairygui.UIPackage.getItemURL(pkgName, resName));
        };
        /**注册界面 */
        PanelRegister.registerPanels = function () {
            //主界面注册
            //PanelRegister.register(EnumPanelID.MAIN_MENU, new PanelInfo(EnumPanelID.MAIN_MENU, EnumPanel.TYPE_MAIUI, "main", "", fairui.MenuPanel, false, true));
            //Alert层界面注册 警示类的面板定义为Alert层
            // PanelRegister.register(EnumPanelID.DEBUG_VIEW, new PanelInfo(EnumPanelID.DEBUG_VIEW, EnumPanel.TYPE_ALERT, "", App.lang.getLang("uiload_txt_1"), DebugPanel));//正在加载错误日志面板资源
            PanelRegister.register(EnumPanelID.MAIN_LOADING, new fairui.PanelInfo(EnumPanelID.MAIN_LOADING, EnumPanel.TYPE_ALERT, "", "", fairui.LoadingPanel, false, true));
        };
        /**
         * 注册面板
         * @param id 	面板ID
         * @param panel PanelInfo
         */
        PanelRegister.register = function (id, panel) {
            PanelRegister.dmap.setItem(id, panel);
            PanelRegister.dmap.setItem(panel, id);
        };
        /**
         * 获取对应面板
         * @param idOrCls 面板ID
         * @return id => PanelInfo , cls => panelid
         */
        PanelRegister.getPanel = function (idOrCls) {
            return this.dmap.getItem(idOrCls);
        };
        /**
         * 获取对应面板的panelid
         * @param panel fairui.BasePanel
         * @return 面板ID
         */
        PanelRegister.getPanelId = function (panel) {
            var thisObj = this;
            var index = -1;
            if (panel instanceof fairui.BasePanel && panel.panelInfo) {
                index = PanelRegister.getPanel(panel.panelInfo);
            }
            return index;
        };
        /**
         * 移除注册
         * @param panelid 面板ID
         */
        PanelRegister.removeRegister = function (panelid) {
            if (PanelRegister.dmap.hasOwnProperty(panelid)) {
                var panelinfo = PanelRegister.dmap.getItem(panelid);
                if (panelinfo != null) {
                    PanelRegister.dmap.delItem(panelid);
                    panelinfo = null;
                }
            }
        };
        //-------------------------------------------
        /**注册的面板类 */
        PanelRegister.dmap = new flash.Dictionary();
        return PanelRegister;
    }());
    fairui.PanelRegister = PanelRegister;
    __reflect(PanelRegister.prototype, "fairui.PanelRegister");
})(fairui || (fairui = {}));
//# sourceMappingURL=PanelRegister.js.map