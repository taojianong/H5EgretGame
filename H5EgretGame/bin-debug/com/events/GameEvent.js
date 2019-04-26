var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
/**
 * 游戏事件
 * @author clong 2019.3.23
 */
var GameEvent = (function (_super) {
    __extends(GameEvent, _super);
    function GameEvent(type, data, bubbles, cancelable) {
        var _this = _super.call(this, type, bubbles, cancelable, data) || this;
        _this.thisObject = null;
        return _this;
    }
    /**选择 */
    GameEvent.SELECT = "GameEvent.select";
    /**渲染事件 */
    GameEvent.RENDER = "GameEvent.render";
    /**加载完成 */
    GameEvent.LOAD_COMPLETE = "GameEvent.loadComplete";
    /**舞台自适应 */
    GameEvent.STGAE_RESIZE = "GameEvent.stageResize";
    /**加载进度 */
    GameEvent.LOAD_PROGRESS = "GameEvent.loadProgress";
    /**列表渲染 */
    GameEvent.EGLIST_RENDER = "GameEvent.EGlistRender";
    /**列表渲染完成 */
    GameEvent.EGLIST_COMPLETE = "GameEvent.EGlistComplete";
    /**结束引导 */
    GameEvent.GUIDE_END = "GameEvent.guideEnd";
    /**寻找引导对象 */
    GameEvent.GUIDE_SEARCH_TARGET = "GameEvent.guideSearchTarget";
    /**设置引导目标对象 */
    GameEvent.GUIDE_TARGET = "GameEvent.guideTarget";
    /**主加载界面加载完成 */
    GameEvent.MAIN_LOAD_COMPLETE = "GameEvent.mainLoadComplete";
    /**开始游戏 */
    GameEvent.START_GAME = "GameEvent.stageGame";
    /**添加消息 */
    GameEvent.ADD_MESSAGE = "GameEvent.addMessage";
    /**播放广告 */
    GameEvent.PLAY_AD = "GameEvent.playAd";
    /**播放广告完成 */
    GameEvent.END_PLAY_AD = "GameEvent.endPlayAd";
    return GameEvent;
}(egret.Event));
__reflect(GameEvent.prototype, "GameEvent");
//# sourceMappingURL=GameEvent.js.map