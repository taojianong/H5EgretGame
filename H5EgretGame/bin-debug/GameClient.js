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
 * 游戏客户端
 * @author clong 2019.3.23
 */
var GameClient = (function (_super) {
    __extends(GameClient, _super);
    function GameClient() {
        var _this = _super.call(this) || this;
        /**游戏层 */
        _this.gameLayer = new egret.Sprite();
        /**界面层 */
        _this.uiLayer = new egret.Sprite();
        _this.addChild(_this.gameLayer);
        _this.addChild(_this.uiLayer);
        fairui.FairyUIManager.init(_this.uiLayer);
        return _this;
    }
    return GameClient;
}(egret.DisplayObjectContainer));
__reflect(GameClient.prototype, "GameClient");
//# sourceMappingURL=GameClient.js.map