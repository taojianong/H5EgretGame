var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var fairui;
(function (fairui) {
    /**
     * FairyGUI纹理集处理工具类
     * @author cl 2018.3.19
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
         * @param target    使用对象
         */
        FairyTextureUtils.getTextureBy = function (pkgName, resName, target) {
            if (target === void 0) { target = null; }
            var url = fairygui.UIPackage.getItemURL(pkgName, resName);
            return this.getTexture(url, target);
        };
        /**
         * 根据Fairygui的URL地址获取对应纹理
         * @param uiUrl     如ui://q4evlwcjdmoc2i
         * @param target    使用对象
         */
        FairyTextureUtils.getTexture = function (uiUrl, target) {
            if (target === void 0) { target = null; }
            var obj = uiUrl ? this.textureMap.getItem(uiUrl) : null;
            var texture = obj ? obj["texture"] : null;
            var targetList = obj ? obj["targetlist"] : [];
            if (texture == null) {
                var gObj = fairygui.UIPackage.createObjectFromURL(uiUrl);
                var img = gObj != null ? gObj.asImage : null;
                texture = img ? img.texture : null;
                if (texture != null) {
                    obj = obj || { "texture": texture, "targetlist": [] };
                    obj["texture"] = texture;
                    targetList = obj["targetlist"];
                    this.textureMap.setItem(uiUrl, obj);
                }
            }
            if (target && targetList.indexOf(target) == -1) {
                targetList.push(target);
            }
            return texture;
        };
        /**
         * 释放资源
         * @param pkgName   包名
         * @param resName   资源名
         * @param target    使用对象
         */
        FairyTextureUtils.disposeTextureBy = function (pkgName, resName, target) {
            if (target === void 0) { target = null; }
            var url = fairygui.UIPackage.getItemURL(pkgName, resName);
            this.disposeTexture(url, target);
        };
        /**
         * 释放纹理
         * @param uiUrl     如ui://q4evlwcjdmoc2i
         * @param target    使用对象
         */
        FairyTextureUtils.disposeTexture = function (uiUrl, target) {
            if (target === void 0) { target = null; }
            var obj = uiUrl ? this.textureMap.getItem(uiUrl) : null;
            var targetList = obj ? obj["targetlist"] : null;
            if (targetList != null) {
                if (target != null && targetList.indexOf(target) != -1) {
                    targetList.splice(targetList.indexOf(target), 1);
                }
                else if (target == null) {
                    for (var i = targetList.length - 1; i >= 0; i--) {
                        targetList.splice(i, 1);
                    }
                }
                if (targetList.length <= 0) {
                    var texture = obj["texture"];
                    if (texture != null) {
                        // texture.dispose();
                        texture = null;
                    }
                    obj = null;
                    this.textureMap.delItem(uiUrl);
                }
            }
        };
        /**
         * 释放所有资源
         */
        FairyTextureUtils.disposeAll = function () {
            var len = this.textureMap.keys.length;
            var obj;
            var key;
            for (var i = len - 1; i >= 0; i--) {
                key = this.textureMap.keys[i];
                if (!key)
                    continue;
                obj = this.textureMap.getItem(key);
                if (obj != null) {
                    this.disposeTexture(key);
                }
                else {
                    this.textureMap.delItem(key);
                }
            }
        };
        /**
         * 纹理集字典
         */
        FairyTextureUtils.textureMap = new flash.Dictionary();
        return FairyTextureUtils;
    }());
    fairui.FairyTextureUtils = FairyTextureUtils;
    __reflect(FairyTextureUtils.prototype, "fairui.FairyTextureUtils");
})(fairui || (fairui = {}));
//# sourceMappingURL=FairyTextureUtils.js.map