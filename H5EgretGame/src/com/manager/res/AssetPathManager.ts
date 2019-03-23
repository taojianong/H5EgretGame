/**
 * 动画资源地址管理
 */
class AssetPathManager {
	private static instance: AssetPathManager;
	/**获取静态实例*/
	public static getInstance(): AssetPathManager {
		if (!AssetPathManager.instance) {
			AssetPathManager.instance = new AssetPathManager();
		}
		return AssetPathManager.instance;
	}

	public static PNG_SFX: string = ".png";

	//public static XLL_SFX: string = ".xll";

	public static JSON_SFX: string = ".json";

	/**游戏的资源基础路径前缀*/
	public RES_PATH: string = "res/";//public RES_PATH: string = "resource/res/";

	public constructor() {
		if (AssetPathManager.instance) {
			App.log.error("AssetPathManager an only use getInstance() to get an instance!");
			return;
		}
	}
	/**
	 * 获得版本号处理后的资源
	 * @param url
	 * @return
	 */
	public getVersionUrl(url: string): string {
		let resVersion: string = App.resourceVersion.getVersionPath(url);
		if (!resVersion) {
			return url;
		}
		return WebParams.cdn + this.RES_PATH + resVersion + "?t=" + Config.releaseVersion;
	}
	/**
	 * 获得版本号处理后的文件夹
	 * @param url
	 * @return
	 */
	public getVersionPath(url: string): string {
		let resVersion: string = App.resourceVersion.getVersionPath(url);
		if (!resVersion) {
			return "";
		}
		return resVersion;
	}
	/**
	 * 战斗地图资源地址
	 * @param mapid
	 * @return string
	 */
	public getFigthMapRes(mapid: number): string {
		return this.getVersionUrl(this.getVersionPath("map/" + mapid + "/") + mapid + ".jpg");
	}
	/**
	 * 战斗地图缩略图资源地址
	 * @param mapid
	 * @return string
	 */
	public getFigthMapOutlineRes(mapid: number): string {
		return this.getVersionUrl(this.getVersionPath("map/" + mapid + "/") + mapid + "_outline.jpg");
	}
	/**
	 * 根据角色动画资源地址
	 * @param path
	 * @param action
	 * @param dir
	 * @return string
	 */
	public getFightRoleRes(path: string, action: string, dir: number): string {
		return path + action + "_" + dir;
	}
	/**
	 * 
	 * @param path
	 */
	public getFightEffectRes(path: string): string {
		return this.getVersionPath("effect/skill/") + path;
	}
	/**
	 * 获取聊天表情路径
	 * @param res		通用资源swf名称
	 * @param suffix	文件后缀名，默认res
	 * @return
	 *
	 */
	public getChatfaceRes(res: String): string {
		return this.getVersionPath("effect/menu/") + "chatface/" + res + "_0";
	}
	/**
	 * 
	 * @param path
	 */
	public getFightBuffRes(path: string): string {
		return this.getVersionPath("effect/buff/") + path;
	}
	/**
	 * 根据角色动画部位获得资源地址
	 * @param resId
	 * @param part
	 * @return string
	 */
	public getFightHeroPartPath(resId: number, part: number): string {
		return this.getVersionPath("avatar/role/" + EnumAvatarPart.getPartName(part) + "/1/" + resId + "/");
	}
	/**
	 * 根据怪物配置动画路径获得资源地址前缀
	 * @param resId
	 * @return string
	 */
	public getFightMonsterPartPath(resId: string): string {
		return this.getVersionPath("avatar/monster/" + resId + "/");
	}
	/**
	 * 根据斩魄刀配置动画路径获得资源地址前缀
	 * @param resId
	 * @return string
	 */
	public getFightFabaoPartPath(resId: string): string {
		return this.getVersionPath("avatar/fabao/" + resId + "/");
	}
	/**
	 * 根据附身斩魄刀配置动画路径获得资源地址
	 * @param resId
	 * @return string
	 */
	public getFightFushenRes(resId: string): string {
		return this.getVersionPath("avatar/fushen/" + resId);
	}
	/**
	 * 根据宠物动画部位获得资源地址前缀
	 * @param resId
	 * @return string
	 */
	public getPetPartPath(resId: string): string {
		return this.getVersionPath("avatar/pet/" + resId + "/");
	}
	/**
	 * 获取粒子效果资源地址
	 * @param resId
	 * @return string
	 */
	public getParticleRes(path: string, file: string): string {
		return this.getVersionUrl(this.getVersionPath("effect/menu/") + "particle/" + path + "." + file);
	}
	/**获取面板特效资源地址 resource/res/effect/menu/{panelName}/effectName*/
	public getPanelEffect(effectName: string, panelName: string = null): string {
		panelName = panelName == null ? "" : (panelName + "/");
		let url: string = this.getVersionPath("effect/menu/") + "panel/" + panelName + effectName;
		return url;
	}

	public getMenuEffect(packName: string, effectName: string): string {
		let url: string = this.getVersionPath("effect/menu/") + packName + "/" + effectName;
		return url;
	}
	/**
	 * 获取通用资源res路径
	 * @param pack
	 * @param name
	 * @param suffix
	 * @return
	 */
	public getCommonIconRes(pack: string, name: string): string {
		return this.getMenuEffect(pack, name);
	}
	// /**
	//  * 根据特效动画资源地址
	//  * @param path
	//  * @param action
	//  * @param dir
	//  * @return string
	//  */
	// public getFightEffectRes(path: string): string {
	// 	return this.getVersionUrl("fight/effect/" + path + this.XLL_SFX);
	// }
}