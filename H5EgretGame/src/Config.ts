class Config {
	public static GAME_FPS: number = 30;
	/**游戏版本号 除了控制游戏资源版本，还会额外控制loadding界面，国际化,default.res.json的版本控制*/
	public static releaseVersion: string = "201808102134";
	/**是否为调试版 */
	public static isDebug: boolean = true;
	/**是否显示ID,GM面板勾选控制 */
	public static showItemId: boolean = false;
	/**是否自动游戏 */
	public static isAutoGame: boolean = false;
	/**是否开启引导 */
	public static isGuide: boolean = false;
	/**登录进入的地图*/
	public static mapId: number = 0;
	public static isFristEnterMap: boolean = true;
	// public static socket: game.GameSocket;
	/**消息服务器版本号*/
	public static msgServerVerson: number = 0;
	public static currentGameFps: number = Config.GAME_FPS;
	/**是否异地登录了*/
	public static isSubstitute: boolean = false;
	/**是否启用文字滤镜效果*/
	public static useTxtFilters: boolean = false;
	/**是否启用粒子效果*/
	public static useParticleType: boolean = true;
	/**客户端是否处于激活状态*/
	public static isActivate: boolean = true;

	public static lastTimeOut: number;
	/**是否进入游戏的状态*/
	public static inGame: boolean = false;
	/**语言国家化*/
	public static locale: string = "zh_TW";//"zh_CN";//"zh_TW";
	/**是否允许播放游戏背景音乐*/
	public static playBGM: boolean = true;
	/**是否允许播放游戏音效*/
	public static set playSound(value: boolean) {
		App.sound.playType = value;
	}
	public static get playSound():boolean {
		return App.sound.playType;
	}

	public static gotoHeartBeat() {
		// if (Config.socket) {
		// 	Config.socket.sendHeartbeat();
		// }
		Config.clearHeartBeat();
		if (!Config.isActivate) {
			Config.lastTimeOut = setTimeout(Config.gotoHeartBeat, 60000);
		}
	}

	public static clearHeartBeat() {
		if (Config.lastTimeOut) {
			clearTimeout(Config.lastTimeOut);
		}
		Config.lastTimeOut = null;
	}
}