/**
 * 应用类
 * @author clong 2019.3.23
 */
class App {
	public static mainUI: Main;
	// public static timer: com.time.TimeManager;
	// public static lang: LangManager;
	// public static log: LogManager;
	// public static stage: egret.Stage;

	public static config: com.bean.DataManager;
	/**资源管理器*/
	public static asset: com.manager.AssetManager;
	/**路径管理器*/
	public static path:AssetPathManager;
	/**资源文件映射URL数据*/
	public static resourceVersion: com.manager.GameVersionParser;

	public static mousic: com.manager.MousicManager;
	public static sound: com.manager.SoundManager;
	/**APP启动*/
	public static init(main: Main) {
		App.mainUI = main;
		// App.stage = main.stage;
		// App.lang = new LangManager();
		//App.lang.addLangObject(RES.getRes("login_language"));
		// App.log = new LogManager();
		// App.timer = new com.time.TimeManager();
		App.asset = new com.manager.AssetManager();
		App.config = new com.bean.DataManager();
		App.mousic = new com.manager.MousicManager();
		App.sound = new com.manager.SoundManager();
		//Config.playSound = false;
	}

	private static _stageX: number = 0;

	public static set stageX(value: number) {
		this._stageX = value;
	}

	public static get stageX(): number {
		return this._stageX;
	}

	private static _stageY: number = 0;

	public static set stageY(value: number) {
		this._stageY = value;
	}

	public static get stageY(): number {
		return this._stageY;
	}
	
	/**刷新游戏*/
	public static refresh(): void {
		let url: string = location.href;
		// if (Config.isDebug) {
		// 	//测试版刷新
		// 	if (url.indexOf("index.html") == -1) {
		// 		url = url + "index.html";
		// 	}
		// } else {
		// 	//正式版刷新
		// }
		// let search: string = location.search;//URL ?号后面部分
		// let refreshStr: string = "kdlReloadGame=";
		// if (search.length <= 1 || search == "?") {
		// 	url = url + "?" + refreshStr + Math.random().toFixed(1);
		// } else {
		// 	if (url.indexOf(refreshStr) == -1) {
		// 		url = url + "&" + refreshStr + Math.random().toFixed(1);
		// 	} else {
		// 		url = url.replace(refreshStr, refreshStr + Math.random().toFixed(1));
		// 	}
		// }
		location.href = url;
	}
}