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
        return _super.call(this) || this;
    }
    return GameClient;
}(egret.DisplayObjectContainer));
__reflect(GameClient.prototype, "GameClient");
//# sourceMappingURL=GameClient.js.map