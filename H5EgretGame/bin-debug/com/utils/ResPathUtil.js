var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var com;
(function (com) {
    var utils;
    (function (utils) {
        /**
         * 1.动态图片资源地址路径工具(这个工具只进行图片加载)
         * 2.动态加载特效请使用AssetPathManager工具类
         */
        var ResPathUtil = (function () {
            function ResPathUtil() {
            }
            /**
             * 获取res/image/目录下对应资源
             * @param name 			资源名字
             * @param subPackage 	资源子目录
             * @param suffix 		资源格式,如png,jpg
             */
            ResPathUtil.getImageRes = function (name, suffix, subPackage) {
                if (suffix === void 0) { suffix = ".jpg"; }
                if (subPackage === void 0) { subPackage = ""; }
                if (subPackage != "") {
                    subPackage += "/";
                }
                return ResPathUtil.getVersionUrl("image/" + subPackage + name + suffix) + "?t=" + Config.releaseVersion;
            };
            /**
             * 获取面板图片等资源 image/panel/{subPackage}/{name}.png cl 2018.3.15
             * @param name 			资源名字
             * @param subPackage 	子目录
             * @param suffix		后缀名
             */
            ResPathUtil.getPanelRes = function (name, subPackage, suffix) {
                if (subPackage === void 0) { subPackage = ""; }
                if (suffix === void 0) { suffix = ".png"; }
                if (subPackage != "") {
                    subPackage += "/";
                }
                return ResPathUtil.getVersionUrl("image/panel/" + subPackage + name + suffix) + "?t=" + Config.releaseVersion;
            };
            /**
             * 图标地址 resource/res/icon2/
             * @param iconName 图标名字
             * @param imageType	类型，EnumImageType 常量
             */
            ResPathUtil.getIcon = function (iconName, imageType, suffix) {
                if (suffix === void 0) { suffix = ".png"; }
                if (imageType.indexOf("/") != -1) {
                    var typeList = imageType.split("/");
                    return ResPathUtil.getNewIcon(iconName, typeList[0], typeList[1], suffix);
                }
                return ResPathUtil.getVersionUrl("icon2/" + imageType + "/" + iconName + suffix) + "?t=" + Config.releaseVersion;
            };
            ResPathUtil.getNewIcon = function (iconName, imageType, icontype, suffix) {
                if (suffix === void 0) { suffix = ".png"; }
                return ResPathUtil.getVersionUrl("icon2/" + imageType + "/" + iconName + "/" + icontype + suffix) + "?t=" + Config.releaseVersion;
            };
            /**
    
             * 获取头像资源路径 resource/res/head/{imageType}/{headName}.png
             * @param headName	头像字段=
             * @param imageType	类型，EnumImageType常量
             * @param suffix	文件后缀名，默认png
             * @return
             */
            ResPathUtil.getHead = function (headName, imageType, suffix) {
                if (suffix === void 0) { suffix = ".png"; }
                return ResPathUtil.getVersionUrl("head/" + imageType + "/" + headName + suffix) + "?t=" + Config.releaseVersion;
            };
            /**
             * 获取头像资源路径 resource/res/head/{imageType}/{headName}.png
             * @param headName	头像字段=
             * @param imageType	类型，EnumImageType常量
             * @param suffix	文件后缀名，默认png
             * @return
             */
            ResPathUtil.getHeadBorder = function (headName, imageType, suffix) {
                if (suffix === void 0) { suffix = ".png"; }
                return ResPathUtil.getVersionUrl("head/" + imageType + "/" + headName + suffix) + "?t=" + Config.releaseVersion;
            };
            /**
             * 获取对应版本号 resource/res/{url}
             */
            ResPathUtil.getVersionUrl = function (url) {
                var resVersion = "";
                resVersion = App.resourceVersion.getVersionPath(url);
                if (!resVersion) {
                    return "";
                }
                return WebParams.cdn + AssetPathManager.getInstance().RES_PATH + resVersion;
            };
            /**
             * 获得文件后缀名
             * @param url 文件路径
             * @return <b>String</b> 文件后缀名
             */
            ResPathUtil.getFileExtension = function (url) {
                //切掉路径后面的参数
                var searchString = url.indexOf("?") > -1 ? url.substring(0, url.indexOf("?")) : url;
                //截取后缀
                var finalPart = searchString.substring(searchString.lastIndexOf("/"));
                return finalPart.lastIndexOf(".") == -1 ? "" : finalPart.substring(finalPart.lastIndexOf(".") + 1).toLowerCase();
            };
            ResPathUtil.RES_SFX = ".res";
            ResPathUtil.ASSETS_SFX = ".xll"; //.asset";
            ResPathUtil.XLL_SFX = ".xll";
            return ResPathUtil;
        }());
        utils.ResPathUtil = ResPathUtil;
        __reflect(ResPathUtil.prototype, "com.utils.ResPathUtil");
    })(utils = com.utils || (com.utils = {}));
})(com || (com = {}));
//# sourceMappingURL=ResPathUtil.js.map