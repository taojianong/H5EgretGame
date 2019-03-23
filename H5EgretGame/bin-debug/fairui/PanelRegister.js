var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var fairui;
(function (fairui) {
    /**
     * 面板注册 cl 2018.2.5
     */
    var PanelRegister = (function () {
        function PanelRegister() {
        }
        /**
         * 注册组件类与fairgui编辑器中类对应
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
         * 创建自定义组件，必须用此方式,与以上方法对应使用
         * @param pkgName 包名
         * @param resName 资源名
         */
        PanelRegister.createGObject = function (pkgName, resName) {
            return fairygui.UIPackage.createObjectFromURL(fairygui.UIPackage.getItemURL(pkgName, resName));
        };
        return PanelRegister;
    }());
    fairui.PanelRegister = PanelRegister;
    __reflect(PanelRegister.prototype, "fairui.PanelRegister");
})(fairui || (fairui = {}));
//# sourceMappingURL=PanelRegister.js.map