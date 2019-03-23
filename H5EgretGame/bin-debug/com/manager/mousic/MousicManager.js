var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var com;
(function (com) {
    var manager;
    (function (manager) {
        var MousicManager = (function () {
            function MousicManager() {
            }
            /**播放游戏背景音乐*/
            MousicManager.prototype.play = function (fileName) {
                if (Config.playBGM && fileName && fileName != "")
                    egret.ExternalInterface.call("playGameBGM", fileName + ".mp3");
            };
            /**暂停游戏背景音乐*/
            MousicManager.prototype.stop = function () {
                egret.ExternalInterface.call("stopGameBGM", "");
            };
            return MousicManager;
        }());
        manager.MousicManager = MousicManager;
        __reflect(MousicManager.prototype, "com.manager.MousicManager");
    })(manager = com.manager || (com.manager = {}));
})(com || (com = {}));
//# sourceMappingURL=MousicManager.js.map