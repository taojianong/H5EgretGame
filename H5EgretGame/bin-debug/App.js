var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 应用类
 * @author clong 2019.3.23
 */
var App = (function () {
    function App() {
    }
    /**APP启动*/
    App.init = function (main) {
        App.mainUI = main;
        App.stage = main.stage;
        App.lang = new LangManager();
        //App.lang.addLangObject(RES.getRes("login_language"));
        App.log = new LogManager();
        App.timer = new com.time.TimeManager();
        App.asset = new com.manager.AssetManager();
        App.config = new com.bean.DataManager();
        App.mousic = new com.manager.MousicManager();
        App.sound = new com.manager.SoundManager();
        //Config.playSound = false;
    };
    Object.defineProperty(App, "stageX", {
        get: function () {
            return this._stageX;
        },
        set: function (value) {
            this._stageX = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(App, "stageY", {
        get: function () {
            return this._stageY;
        },
        set: function (value) {
            this._stageY = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(App, "stageWidth", {
        /**有效显示区域宽度 */
        get: function () {
            return this.stage.stageWidth;
            //return window.innerWidth;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(App, "stageHeight", {
        /**有效显示区域高度 */
        get: function () {
            //return window.innerHeight;
            return this.stage.stageHeight;
        },
        enumerable: true,
        configurable: true
    });
    /**刷新游戏*/
    App.refresh = function () {
        var url = location.href;
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
    };
    App._stageX = 0;
    App._stageY = 0;
    return App;
}());
__reflect(App.prototype, "App");
//# sourceMappingURL=App.js.map