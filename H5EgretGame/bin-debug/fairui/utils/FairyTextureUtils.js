var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var fairui;
(function (fairui) {
    /**
     * FairyGUI纹理集处理工具类
     * @author cl 2019.2.20
     */
    var FairyTextureUtils = (function () {
        function FairyTextureUtils() {
        }
        /**
         * 获取资源地址
         * @param pkgName   包名
         * @param resName   资源名
         */
        FairyTextureUtils.getUrl = function (pkgName, resName) {
            var url = fairygui.UIPackage.getItemURL(pkgName, resName);
            return url;
        };
        /**
         * 获取Fairy资源包里的图片资源
         * @param pkgName   包名
         * @param resName   资源名
         */
        FairyTextureUtils.getTextureBy = function (pkgName, resName) {
            var url = fairygui.UIPackage.getItemURL(pkgName, resName);
            return this.getTexture(url);
        };
        /**
         * 根据Fairygui的URL地址获取对应纹理
         * @param uiUrl     如ui://q4evlwcjdmoc2i
         */
        FairyTextureUtils.getTexture = function (url) {
            var item = fairygui.UIPackage.getItemByURL(url);
            if (item) {
                item.load();
            }
            return item ? item.texture : null;
        };
        return FairyTextureUtils;
    }());
    fairui.FairyTextureUtils = FairyTextureUtils;
    __reflect(FairyTextureUtils.prototype, "fairui.FairyTextureUtils");
})(fairui || (fairui = {}));
//# sourceMappingURL=FairyTextureUtils.js.map