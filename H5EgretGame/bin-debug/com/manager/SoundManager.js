var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 音乐管理器
 * @author clong 2019.4.20
 */
var SoundManager = (function () {
    function SoundManager() {
    }
    SoundManager.getInstance = function () {
        return this._instance = this._instance || new SoundManager();
    };
    SoundManager._instance = null;
    return SoundManager;
}());
__reflect(SoundManager.prototype, "SoundManager");
//# sourceMappingURL=SoundManager.js.map