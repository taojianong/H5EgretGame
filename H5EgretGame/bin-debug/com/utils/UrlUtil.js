var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 地址管理工具
 * @author clong 2019.4.20
 */
var UrlUtil = (function () {
    function UrlUtil() {
    }
    UrlUtil.getAction = function (str) {
        if (str.length < 3)
            str = "0" + str;
        if (str.length < 3)
            str = "0" + str;
        return str;
    };
    UrlUtil.getCommonAssetsUrl = function (job, action) {
        if (action === void 0) { action = 201; }
        var str = UrlUtil.getAction(action + "");
        return UrlUtil.AVATAR + job + "/" + str + "/" + str + UrlUtil.resGfx;
    };
    /**
     * 获取物品图标地址
     * @param icon 物品配置icon名字
     */
    UrlUtil.getGoodIconUrl = function (icon) {
        return UrlUtil.URL_GOODS_ICON + icon + UrlUtil.resPng;
    };
    /**
     * 获取对应面板资源
     * @param iconName  资源名字
     * @param plate     对应模块
     * @param ext       对应资源格式 如(.jpg)
     */
    UrlUtil.getPanelUrl = function (iconName, plate, ext) {
        if (ext === void 0) { ext = ".jpg"; }
        return UrlUtil.PANEL + plate + "/" + iconName + ext;
    };
    /**
     * 获取面板图片资源
     * @param name 			资源名字
     * @param subPackage 	资源子目录
     * @param suffix 		资源格式,如png,jpg
     * @return resource/assets/res/panel/{subPackage}/{name}.{suffix}
     */
    UrlUtil.getPanelRes = function (name, subPackage, suffix) {
        if (subPackage === void 0) { subPackage = ""; }
        if (suffix === void 0) { suffix = ".jpg"; }
        if (subPackage != "") {
            subPackage += "/";
        }
        return UrlUtil.PANEL + subPackage + name + suffix;
    };
    UrlUtil.getEffectImgUrl = function (name) {
        return UrlUtil.EFFECT + "normal/" + name + UrlUtil.resPng;
    };
    /**
     * 获取音效路径
     * @param resName 音效名称
     */
    UrlUtil.getSoundUrl = function (resName) {
        return UrlUtil.SOUND + resName + UrlUtil.resMP3;
    };
    /**
     * 获取视频地址
     */
    UrlUtil.getVideoAdUrl = function (resName) {
        return UrlUtil.VIDEO + resName + UrlUtil.resMP4;
    };
    /**
     * 获取视频图片资源
     */
    UrlUtil.getVideoAdImgUrl = function (resName) {
        return UrlUtil.VIDEO + resName + UrlUtil.resJpg;
    };
    UrlUtil.resPng = ".png";
    UrlUtil.resJpg = ".jpg";
    UrlUtil.resMP3 = ".mp3";
    UrlUtil.resMP4 = ".mp4";
    UrlUtil.resJson = ".json";
    UrlUtil.resTmx = ".tmx";
    UrlUtil.resGfx = ".gfx";
    UrlUtil.resBytes = ".bytes";
    UrlUtil.resExml = ".exml";
    // public static readonly NPC: number = 5;
    // public static readonly BUILD_ANIMATION: number = 6;
    // public static readonly EFFECT: number = 8;
    // public static readonly ROLE: number = 1;
    /** resource/ */
    UrlUtil.RESOURCE = "resource/";
    /** resource/assets/res/ */
    UrlUtil.ASSETS = UrlUtil.RESOURCE + "assets/res/";
    /**角色动画 resource/assets/res/avatar */
    UrlUtil.AVATAR = UrlUtil.ASSETS + "avatar/";
    /**特效动画 resource/assets/res/effect */
    UrlUtil.EFFECT = UrlUtil.ASSETS + "effect/";
    /**图标资源地址 resource/assets/res/icon/ */
    UrlUtil.ICON = UrlUtil.ASSETS + "icon/"; //图标资源
    /**面板资源地址 resource/assets/res/panel/ */
    UrlUtil.PANEL = UrlUtil.ASSETS + "panel/";
    /**字体资源地址 resource/assets/res/font/ */
    UrlUtil.FONT = UrlUtil.ASSETS + "font/";
    /**音乐资源地址 resource/assets/res/sound/ */
    UrlUtil.SOUND = UrlUtil.ASSETS + "sound/";
    /**视频资源地址 resource/assets/res/video/ */
    UrlUtil.VIDEO = UrlUtil.ASSETS + "video/";
    /**物品图标 resource/assets/res/icon/goods/ */
    UrlUtil.URL_GOODS_ICON = UrlUtil.ICON + "goods/";
    /**字体1 assets/res/resource/Fonts_0.ttf */
    UrlUtil.FONT_1 = UrlUtil.FONT + "Fonts_0.ttf";
    return UrlUtil;
}());
__reflect(UrlUtil.prototype, "UrlUtil");
//# sourceMappingURL=UrlUtil.js.map