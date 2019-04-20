var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 全局类
 * @author clong 2019.3.23
 */
var Global = (function () {
    function Global() {
    }
    Global.initStage = function (stage) {
        this.stage = stage;
        if (this.stage.stageWidth < 1280 || this.stage.stageHeight < 720) {
            this.stage.scaleMode = egret.StageScaleMode.FIXED_HEIGHT;
        }
        else {
            this.stage.scaleMode = egret.StageScaleMode.NO_SCALE;
        }
        Global.timer = new com.time.TimeManager();
        Global.lang = new LangManager();
        Global.log = new LogManager();
        this.stage.addEventListener(egret.Event.RESIZE, this.resizeHandler, this);
        this.stage.addEventListener(egret.Event.ACTIVATE, this.onActive, this);
        this.stage.addEventListener(egret.Event.DEACTIVATE, this.onDeActive, this);
    };
    /**
     * 自适应管理
     */
    Global.resizeHandler = function () {
        UILayout.resizeDisplay();
        this.changeXY(fairui.FairyUIManager.mainLayer);
        this.changeXY(fairui.FairyUIManager.windowLayer);
        this.changeXY(fairui.FairyUIManager.promptLayer);
        this.changeXY(fairui.FairyUIManager.alertLayer);
        this.changeXY(fairui.FairyUIManager.topLayer);
        this.resetIframeSize();
        EventManager.dispatchEvent(GameEvent.STGAE_RESIZE);
    };
    /**iframe宽高resize */
    Global.resetIframeSize = function () {
        var frame = document.getElementById("igame");
        if (!frame)
            return;
        var game_frame = document.getElementsByClassName("egret-player")[0];
        var player = game_frame["egret-player"];
        frame.style['width'] = player.container.clientWidth + "px";
        frame.style['height'] = player.container.clientHeight + "px";
        frame.style['position'] = 'absolute';
        frame.style['cursor'] = 'inherit';
        frame.style['left'] = '0px';
        frame.style['top'] = '0px';
        frame.style['border'] = '0';
    };
    /**
     * 自适应改变窗口位置
     */
    Global.changeXY = function (sprite) {
        var window;
        var leng = sprite.numChildren;
        for (var i = 0; i < leng; i++) {
            window = sprite.getChildAt(i);
            if (window instanceof fairui.UIBaseWindow) {
                window.onResize();
            }
            else if (window instanceof fairui.UIBaseTip) {
                window.onResize();
            }
        }
    };
    Global.onDeActive = function (event) {
        Global.isActive = false;
        Global.isMusic = false;
        Global.log.debug(this, "游戏进入缓慢运动状态");
        // SoundManager.getInstance().backGroundMusicVolume(0);
    };
    Global.onActive = function (event) {
        Global.isActive = true;
        Global.isMusic = true;
        Global.log.debug(this, "游戏进入正常运动状态");
        // SoundManager.getInstance().backGroundMusicVolume(0.8);
    };
    Object.defineProperty(Global, "stageWidth", {
        /**舞台宽度 */
        get: function () {
            return this.stage ? this.stage.stageWidth : 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Global, "stageHeight", {
        /**舞台高度 */
        get: function () {
            return this.stage ? this.stage.stageHeight : 0;
        },
        enumerable: true,
        configurable: true
    });
    /**当前版本号 */
    Global.version = "0.0.1";
    /**是否为调试模式 */
    Global.isDebug = true;
    /**是否显示日志 */
    Global.isShowLog = true;
    /**是否激活 */
    Global.isActive = true;
    /**是否开启音效 默认开启 */
    Global.isMusic = true;
    /**全局默认字体 */
    Global.defaultFont = "方正粗圆_GBK"; // "方正粗圆_GBK" | 迷你繁启体
    /**舞台 */
    Global.stage = null;
    /**当前时间（毫秒） */
    Global.timeMS = 0;
    /**当前游戏帧频 */
    Global.currentGameFps = 30;
    return Global;
}());
__reflect(Global.prototype, "Global");
//# sourceMappingURL=Global.js.map