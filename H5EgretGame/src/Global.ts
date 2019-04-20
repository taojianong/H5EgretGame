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

		if (this.stage.stageWidth < 1280 || this.stage.stageHeight < 720) {
            this.stage.scaleMode = egret.StageScaleMode.FIXED_HEIGHT;
        } else{
			this.stage.scaleMode = egret.StageScaleMode.NO_SCALE;
		} 

		Global.timer = new com.time.TimeManager();
        Global.lang = new LangManager();
		Global.log = new LogManager();

        this.stage.addEventListener(egret.Event.RESIZE, this.resizeHandler, this);
        this.stage.addEventListener(egret.Event.ACTIVATE, this.onActive, this);
        this.stage.addEventListener(egret.Event.DEACTIVATE, this.onDeActive, this);
	}

	/**
     * 自适应管理
     */
    private static resizeHandler():void {

		UILayout.resizeDisplay();

        this.changeXY(fairui.FairyUIManager.mainLayer);
        this.changeXY(fairui.FairyUIManager.windowLayer);
        this.changeXY(fairui.FairyUIManager.promptLayer);
        this.changeXY(fairui.FairyUIManager.alertLayer);
        this.changeXY(fairui.FairyUIManager.topLayer);

        this.resetIframeSize();

        EventManager.dispatchEvent(GameEvent.STGAE_RESIZE);
    }

    /**iframe宽高resize */
    public static resetIframeSize():void{
        let frame = <HTMLIFrameElement>document.getElementById("igame");
        if(!frame) return;
        let game_frame = <HTMLDivElement>document.getElementsByClassName("egret-player")[0];
        let player = game_frame["egret-player"];
        frame.style['width'] = player.container.clientWidth + "px";
        frame.style['height'] = player.container.clientHeight + "px";
        frame.style['position'] = 'absolute';
        frame.style['cursor'] = 'inherit';
        frame.style['left'] = '0px';
        frame.style['top'] = '0px';
        frame.style['border'] = '0';
    }

	/**
     * 自适应改变窗口位置
     */
    private static changeXY(sprite: egret.DisplayObjectContainer|fairygui.GComponent): void {

        var window: any;
        var leng: number = sprite.numChildren;
        for (var i = 0; i < leng; i++) {
            window = sprite.getChildAt(i);
            if ( window instanceof fairui.UIBaseWindow ) {
                window.onResize();
            }else if( window instanceof fairui.UIBaseTip ){
                window.onResize();
            }
        }
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