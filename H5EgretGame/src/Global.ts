/**
 * 全局类
 * @author clong 2019.3.23
 */
class Global {
	
	/**当前版本号 */
	public static version: string = "0.0.1";
	/**是否为调试模式 */
	public static isDebug:boolean = true;
	/**是否显示日志 */
    public static isShowLog:boolean = true;
	/**是否激活 */
    public static isActive:boolean = true;
	/**是否开启音效 默认开启 */
    public static isMusic:boolean = true;

	/**全局默认字体 */
    public static defaultFont: string = "方正粗圆_GBK";// "方正粗圆_GBK" | 迷你繁启体
    
	/**舞台 */
	public static stage:egret.Stage = null;

	/**当前时间（毫秒） */
    public static timeMS:number = 0;

	/**时间管理器 */
    public static timer: com.time.TimeManager;
	/**语言包管理 */
    public static lang: LangManager;
	/**日志系统 */
	public static log: LogManager;
    /**当前游戏帧频 */
    public static currentGameFps: number = 30;

	public static initStage(stage: egret.Stage): void {

		this.stage = stage;

		this.stage.addEventListener(egret.Event.RESIZE, this.resizeHandler, this);

		Global.timer = new com.time.TimeManager();
        Global.lang = new LangManager();
		Global.log = new LogManager();

        stage.addEventListener(egret.Event.ACTIVATE, this.onActive, this);
        stage.addEventListener(egret.Event.DEACTIVATE, this.onDeActive, this);
	}

	/**
     * 自适应管理
     */
    private static resizeHandler():void {

        EventManager.dispatchEvent(GameEvent.STGAE_RESIZE);
    }

	protected static onDeActive(event: egret.Event): void {
        Global.isActive = false;
        Global.isMusic = false;
        Global.log.debug( this , "游戏进入缓慢运动状态");
        // SoundManager.getInstance().backGroundMusicVolume(0);
    }

    protected static onActive(event: egret.Event): void {
        Global.isActive = true;
        Global.isMusic = true;
        Global.log.debug( this , "游戏进入正常运动状态");
		// SoundManager.getInstance().backGroundMusicVolume(0.8);
    }

	/**舞台宽度 */
	public static get stageWidth():number{

		return this.stage ? this.stage.stageWidth : 0;
	}

	/**舞台高度 */
	public static get stageHeight():number{

		return this.stage ? this.stage.stageHeight : 0;
	}
	
}