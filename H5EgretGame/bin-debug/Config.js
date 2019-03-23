var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Config = (function () {
    function Config() {
    }
    Object.defineProperty(Config, "playSound", {
        get: function () {
            return App.sound.playType;
        },
        /**是否允许播放游戏音效*/
        set: function (value) {
            App.sound.playType = value;
        },
        enumerable: true,
        configurable: true
    });
    Config.gotoHeartBeat = function () {
        // if (Config.socket) {
        // 	Config.socket.sendHeartbeat();
        // }
        Config.clearHeartBeat();
        if (!Config.isActivate) {
            Config.lastTimeOut = setTimeout(Config.gotoHeartBeat, 60000);
        }
    };
    Config.clearHeartBeat = function () {
        if (Config.lastTimeOut) {
            clearTimeout(Config.lastTimeOut);
        }
        Config.lastTimeOut = null;
    };
    Config.GAME_FPS = 30;
    /**游戏版本号 除了控制游戏资源版本，还会额外控制loadding界面，国际化,default.res.json的版本控制*/
    Config.releaseVersion = "201808102134";
    /**是否为调试版 */
    Config.isDebug = true;
    /**是否显示ID,GM面板勾选控制 */
    Config.showItemId = false;
    /**是否自动游戏 */
    Config.isAutoGame = false;
    /**是否开启引导 */
    Config.isGuide = false;
    /**登录进入的地图*/
    Config.mapId = 0;
    Config.isFristEnterMap = true;
    // public static socket: game.GameSocket;
    /**消息服务器版本号*/
    Config.msgServerVerson = 0;
    Config.currentGameFps = Config.GAME_FPS;
    /**是否异地登录了*/
    Config.isSubstitute = false;
    /**是否启用文字滤镜效果*/
    Config.useTxtFilters = false;
    /**是否启用粒子效果*/
    Config.useParticleType = true;
    /**客户端是否处于激活状态*/
    Config.isActivate = true;
    /**是否进入游戏的状态*/
    Config.inGame = false;
    /**语言国家化*/
    Config.locale = "zh_TW"; //"zh_CN";//"zh_TW";
    /**是否允许播放游戏背景音乐*/
    Config.playBGM = true;
    return Config;
}());
__reflect(Config.prototype, "Config");
//# sourceMappingURL=Config.js.map