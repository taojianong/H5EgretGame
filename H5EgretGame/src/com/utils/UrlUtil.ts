/**
 * 地址管理工具
 * @author clong 2019.4.20
 */
class UrlUtil {

    public static readonly resPng: string = ".png";
    public static readonly resJpg: string = ".jpg";
    public static readonly resMP3: string = ".mp3";
    public static readonly resJson: string = ".json";
    public static readonly resTmx: string = ".tmx";
    public static readonly resGfx: string = ".gfx";
    public static readonly resBytes: string = ".bytes";
    public static readonly resExml: string = ".exml";

    // public static readonly NPC: number = 5;
    // public static readonly BUILD_ANIMATION: number = 6;
    // public static readonly EFFECT: number = 8;
    // public static readonly ROLE: number = 1;

    /** resource/ */
    public static readonly RESOURCE: string = "resource/";
    /** resource/assets/res/ */
    public static readonly ASSETS: string = UrlUtil.RESOURCE + "assets/res/";

    /**角色动画 resource/assets/res/avatar */
    public static readonly AVATAR: string = UrlUtil.ASSETS + "avatar/";
    /**特效动画 resource/assets/res/effect */
    public static readonly EFFECT: string = UrlUtil.ASSETS + "effect/";
    /**图标资源地址 resource/assets/res/icon/ */
    public static readonly ICON: string = UrlUtil.ASSETS + "icon/";//图标资源
    /**面板资源地址 resource/assets/res/panel/ */
    public static readonly PANEL: string = UrlUtil.ASSETS + "panel/";
    /**字体资源地址 resource/assets/res/font/ */
    public static readonly FONT: string = UrlUtil.ASSETS + "font/";
    /**字体资源地址 resource/assets/res/sound/ */
    public static readonly SOUND: string = UrlUtil.ASSETS + "sound/";

    /**物品图标 resource/assets/res/icon/goods/ */
    public static readonly URL_GOODS_ICON: string = UrlUtil.ICON + "goods/";

    // public static readonly EFFECT_PARTICLE: string = UrlUtil.EFFECT_ANI + "2/";//粒子特效
    // public static readonly MAP: string = UrlUtil.ASSETS + "map/";
    // public static readonly BUILD: string = UrlUtil.MAP + "build/";
    // public static readonly AREA: string = UrlUtil.MAP + "areas/";
    // public static readonly IMAGES: string = UrlUtil.MAP + "images/";
    // public static readonly CONFIG: string = UrlUtil.MAP + "config/";
    // public static readonly MINS: string = UrlUtil.MAP + "mins/";
    // public static readonly UI: string = UrlUtil.ASSETS + "ui/";//UI模块资源
    // public static readonly FONT: string = UrlUtil.ASSETS + "font/";//字体模块资源
    // public static readonly URL_UI_MODEL: string = UrlUtil.UI + "model/";
    // public static readonly URL_UI_JSON: string = UrlUtil.UI + "json/";


    // public static readonly URL_ZONE: string = UrlUtil.MAP + "zone/";
    // public static readonly URL_PRODUCE: string = UrlUtil.MAP + "produce/";
    // public static readonly URL_ICON_SEED: string = UrlUtil.ICON + "seed/";
    // public static readonly URL_SKILL: string = UrlUtil.AVATAR + UrlUtil.EFFECT + "/";
    // public static readonly URL_SKILL_ICON: string = UrlUtil.ICON + "skill/";
    // public static readonly URL_MONSTER_BACK_ICON: string = UrlUtil.ICON + "monsterbackicon/";
    // public static readonly URL_GOURDDOLL_ICON: string = UrlUtil.ICON + "gourddollicon/";    
    // /**物品图标 */
    // public static readonly URL_BUILDING_ICON: string = UrlUtil.ICON + "goods/";
    // /**种子图标 */
    // public static readonly URL_SEED_ICON: string = UrlUtil.ICON + "goods/";
    // /**科技图标 */
    // public static readonly URL_SCIENCE_ICON: string = UrlUtil.ICON + "science/";
    // /**订单图标 */
    // public static readonly URL_ORDER_ICON: string = UrlUtil.ICON + "order/";
    // /**外发光物品图标 */
    // public static readonly URL_LIGHT_GOODS_ICON:string = UrlUtil.ICON + "lightgoods/";
    // /**头像图标 resource/assets/res/icon/head */
    // public static readonly URL_HEAD_ICON: string = UrlUtil.ICON + "head/";

    // /**捣乱图标 */
    // public static readonly URL_MAKE_TROUBLE_ICON: string = UrlUtil.ICON + "maketrouble/";

    // public static readonly URL_EFFECT: string = UrlUtil.ICON + "effect/";

    /**表情动画地址 */
    // public static readonly URL_EXPRESS:string = UrlUtil.EFFECT_ANI +"express/";

    // /**任务图标 */
    // public static readonly URL_TASK_ICON: string = UrlUtil.ICON + "task/";
    // public static readonly URL_COIN_ICON: string = UrlUtil.ICON + "coinicon/";

    // public static readonly URL_MAIN_ICON: string = UrlUtil.ICON + "mainicon/";
    // public static readonly URL_SHOP_ICON: string = UrlUtil.ICON + "shopicon/";
    // public static readonly URL_MOUSE_CREAT_ICON: string = UrlUtil.ICON + "mouscreaticon/";
    // /**小游戏图标 */
    // public static readonly URL_SMALL_GAME_ICON: string = UrlUtil.ICON + "smallgame/";
    public static readonly URL_MUSIC: string = "music/";

    public static getCommonAssetsUrl(job: number, action: number = 201): string {
        var str: string = UrlUtil.getAction(action + "");
        return UrlUtil.AVATAR + job + "/" + str + "/" + str + UrlUtil.resGfx;
    }

    /**字体1 assets/res/resource/Fonts_0.ttf */
    public static FONT_1: string = UrlUtil.FONT + "Fonts_0.ttf";


    /**
     * 获取物品图标地址
     * @param icon 物品配置icon名字
     */
    public static getGoodIconUrl(icon: string): string {

        return UrlUtil.URL_GOODS_ICON + icon + UrlUtil.resPng;
    }

    /**
     * 获取对应面板资源
     * @param iconName  资源名字
     * @param plate     对应模块
     * @param ext       对应资源格式 如(.jpg)
     */
    public static getPanelUrl(iconName: string, plate: string, ext: string = ".jpg"): string {

        return UrlUtil.PANEL + plate + "/" + iconName + ext;
    }

    /**
     * 获取面板图片资源
     * @param name 			资源名字
     * @param subPackage 	资源子目录
     * @param suffix 		资源格式,如png,jpg
     * @return resource/assets/res/panel/{subPackage}/{name}.{suffix}
     */
    public static getPanelRes(name: string, subPackage: string = "", suffix: string = ".jpg"): string {
        if (subPackage != "") {
            subPackage += "/";
        }
        return UrlUtil.PANEL + subPackage + name + suffix;
    }

    public static getEffectImgUrl(name: string): string {
        return UrlUtil.EFFECT + "normal/" + name + UrlUtil.resPng;
    }

    public static getAction(str: string): string {
        if (str.length < 3) str = "0" + str;
        if (str.length < 3) str = "0" + str;
        return str;
    }

    /**
     * 获取音效路径
     * @param resName 音效名称
     */
    public static getSoundUrl(resName: string): string {
        return UrlUtil.SOUND + resName + UrlUtil.resMP3;
    }

}
