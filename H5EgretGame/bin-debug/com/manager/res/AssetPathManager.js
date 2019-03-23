var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 动画资源地址管理
 */
var AssetPathManager = (function () {
    function AssetPathManager() {
        /**游戏的资源基础路径前缀*/
        this.RES_PATH = "res/"; //public RES_PATH: string = "resource/res/";
        if (AssetPathManager.instance) {
            App.log.error("AssetPathManager an only use getInstance() to get an instance!");
            return;
        }
    }
    /**获取静态实例*/
    AssetPathManager.getInstance = function () {
        if (!AssetPathManager.instance) {
            AssetPathManager.instance = new AssetPathManager();
        }
        return AssetPathManager.instance;
    };
    /**
     * 获得版本号处理后的资源
     * @param url
     * @return
     */
    AssetPathManager.prototype.getVersionUrl = function (url) {
        var resVersion = App.resourceVersion.getVersionPath(url);
        if (!resVersion) {
            return url;
        }
        return WebParams.cdn + this.RES_PATH + resVersion + "?t=" + Config.releaseVersion;
    };
    /**
     * 获得版本号处理后的文件夹
     * @param url
     * @return
     */
    AssetPathManager.prototype.getVersionPath = function (url) {
        var resVersion = App.resourceVersion.getVersionPath(url);
        if (!resVersion) {
            return "";
        }
        return resVersion;
    };
    /**
     * 战斗地图资源地址
     * @param mapid
     * @return string
     */
    AssetPathManager.prototype.getFigthMapRes = function (mapid) {
        return this.getVersionUrl(this.getVersionPath("map/" + mapid + "/") + mapid + ".jpg");
    };
    /**
     * 战斗地图缩略图资源地址
     * @param mapid
     * @return string
     */
    AssetPathManager.prototype.getFigthMapOutlineRes = function (mapid) {
        return this.getVersionUrl(this.getVersionPath("map/" + mapid + "/") + mapid + "_outline.jpg");
    };
    /**
     * 根据角色动画资源地址
     * @param path
     * @param action
     * @param dir
     * @return string
     */
    AssetPathManager.prototype.getFightRoleRes = function (path, action, dir) {
        return path + action + "_" + dir;
    };
    /**
     *
     * @param path
     */
    AssetPathManager.prototype.getFightEffectRes = function (path) {
        return this.getVersionPath("effect/skill/") + path;
    };
    /**
     * 获取聊天表情路径
     * @param res		通用资源swf名称
     * @param suffix	文件后缀名，默认res
     * @return
     *
     */
    AssetPathManager.prototype.getChatfaceRes = function (res) {
        return this.getVersionPath("effect/menu/") + "chatface/" + res + "_0";
    };
    /**
     *
     * @param path
     */
    AssetPathManager.prototype.getFightBuffRes = function (path) {
        return this.getVersionPath("effect/buff/") + path;
    };
    /**
     * 根据角色动画部位获得资源地址
     * @param resId
     * @param part
     * @return string
     */
    AssetPathManager.prototype.getFightHeroPartPath = function (resId, part) {
        return this.getVersionPath("avatar/role/" + EnumAvatarPart.getPartName(part) + "/1/" + resId + "/");
    };
    /**
     * 根据怪物配置动画路径获得资源地址前缀
     * @param resId
     * @return string
     */
    AssetPathManager.prototype.getFightMonsterPartPath = function (resId) {
        return this.getVersionPath("avatar/monster/" + resId + "/");
    };
    /**
     * 根据斩魄刀配置动画路径获得资源地址前缀
     * @param resId
     * @return string
     */
    AssetPathManager.prototype.getFightFabaoPartPath = function (resId) {
        return this.getVersionPath("avatar/fabao/" + resId + "/");
    };
    /**
     * 根据附身斩魄刀配置动画路径获得资源地址
     * @param resId
     * @return string
     */
    AssetPathManager.prototype.getFightFushenRes = function (resId) {
        return this.getVersionPath("avatar/fushen/" + resId);
    };
    /**
     * 根据宠物动画部位获得资源地址前缀
     * @param resId
     * @return string
     */
    AssetPathManager.prototype.getPetPartPath = function (resId) {
        return this.getVersionPath("avatar/pet/" + resId + "/");
    };
    /**
     * 获取粒子效果资源地址
     * @param resId
     * @return string
     */
    AssetPathManager.prototype.getParticleRes = function (path, file) {
        return this.getVersionUrl(this.getVersionPath("effect/menu/") + "particle/" + path + "." + file);
    };
    /**获取面板特效资源地址 resource/res/effect/menu/{panelName}/effectName*/
    AssetPathManager.prototype.getPanelEffect = function (effectName, panelName) {
        if (panelName === void 0) { panelName = null; }
        panelName = panelName == null ? "" : (panelName + "/");
        var url = this.getVersionPath("effect/menu/") + "panel/" + panelName + effectName;
        return url;
    };
    AssetPathManager.prototype.getMenuEffect = function (packName, effectName) {
        var url = this.getVersionPath("effect/menu/") + packName + "/" + effectName;
        return url;
    };
    /**
     * 获取通用资源res路径
     * @param pack
     * @param name
     * @param suffix
     * @return
     */
    AssetPathManager.prototype.getCommonIconRes = function (pack, name) {
        return this.getMenuEffect(pack, name);
    };
    AssetPathManager.PNG_SFX = ".png";
    //public static XLL_SFX: string = ".xll";
    AssetPathManager.JSON_SFX = ".json";
    return AssetPathManager;
}());
__reflect(AssetPathManager.prototype, "AssetPathManager");
//# sourceMappingURL=AssetPathManager.js.map