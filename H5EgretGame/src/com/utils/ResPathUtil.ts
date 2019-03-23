module com.utils {
	/**
	 * 1.动态图片资源地址路径工具(这个工具只进行图片加载)
	 * 2.动态加载特效请使用AssetPathManager工具类
	 */
	export class ResPathUtil {
		public static RES_SFX: string = ".res";
		public static ASSETS_SFX: string = ".xll";//.asset";
		public static XLL_SFX: string = ".xll";
		/**
		 * 获取res/image/目录下对应资源
		 * @param name 			资源名字
		 * @param subPackage 	资源子目录
		 * @param suffix 		资源格式,如png,jpg
		 */
		public static getImageRes(name: string, suffix: string = ".jpg", subPackage: string = ""): string {
			if (subPackage != "") {
				subPackage += "/";
			}
			return ResPathUtil.getVersionUrl("image/" + subPackage + name + suffix) + "?t=" + Config.releaseVersion;
		}

		/**
		 * 获取面板图片等资源 image/panel/{subPackage}/{name}.png cl 2018.3.15
		 * @param name 			资源名字
		 * @param subPackage 	子目录
		 * @param suffix		后缀名
		 */
		public static getPanelRes(name: string, subPackage: string = "", suffix: string = ".png"): string {
			if (subPackage != "") {
				subPackage += "/";
			}
			return ResPathUtil.getVersionUrl("image/panel/" + subPackage + name + suffix) + "?t=" + Config.releaseVersion;
		}

		/**
		 * 图标地址 resource/res/icon2/
		 * @param iconName 图标名字
		 * @param imageType	类型，EnumImageType 常量
		 */
		public static getIcon(iconName: string, imageType: string, suffix: string = ".png"): string {
			if (imageType.indexOf("/") != -1) {
				let typeList: Array<any> = imageType.split("/");
				return ResPathUtil.getNewIcon(iconName, typeList[0], typeList[1], suffix);
			}
			return ResPathUtil.getVersionUrl("icon2/" + imageType + "/" + iconName + suffix) + "?t=" + Config.releaseVersion;
		}

		public static getNewIcon(iconName: string, imageType: string, icontype: string, suffix: string = ".png"): string {
			return ResPathUtil.getVersionUrl("icon2/" + imageType + "/" + iconName + "/" + icontype + suffix) + "?t=" + Config.releaseVersion;
		}

		/**

		 * 获取头像资源路径 resource/res/head/{imageType}/{headName}.png
		 * @param headName	头像字段=
		 * @param imageType	类型，EnumImageType常量
		 * @param suffix	文件后缀名，默认png
		 * @return
		 */
		public static getHead(headName: string, imageType: string, suffix: string = ".png"): string {
			return ResPathUtil.getVersionUrl("head/" + imageType + "/" + headName + suffix) + "?t=" + Config.releaseVersion;
		}

		/**
		 * 获取头像资源路径 resource/res/head/{imageType}/{headName}.png
		 * @param headName	头像字段=
		 * @param imageType	类型，EnumImageType常量
		 * @param suffix	文件后缀名，默认png
		 * @return
		 */
		public static getHeadBorder(headName: string, imageType: string, suffix: string = ".png"): string {
			return ResPathUtil.getVersionUrl("head/" + imageType + "/" + headName + suffix) + "?t=" + Config.releaseVersion;
		}

		/**
		 * 获取对应版本号 resource/res/{url}
		 */
		public static getVersionUrl(url: string): string {
			let resVersion: string = "";
			resVersion = App.resourceVersion.getVersionPath(url);
			if (!resVersion) {
				return "";
			}
			return WebParams.cdn + AssetPathManager.getInstance().RES_PATH + resVersion;
		}

		/**
		 * 获得文件后缀名
		 * @param url 文件路径
		 * @return <b>String</b> 文件后缀名
		 */
		public static getFileExtension(url: string): string {
			//切掉路径后面的参数
			let searchString: string = url.indexOf("?") > -1 ? url.substring(0, url.indexOf("?")) : url;
			//截取后缀
			let finalPart: string = searchString.substring(searchString.lastIndexOf("/"));
			return finalPart.lastIndexOf(".") == -1 ? "" : finalPart.substring(finalPart.lastIndexOf(".") + 1).toLowerCase();
		}
	}
}