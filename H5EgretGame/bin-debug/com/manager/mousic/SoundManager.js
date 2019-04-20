var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var com;
(function (com) {
    var manager;
    (function (manager) {
        var SoundManager = (function () {
            function SoundManager() {
                this._playType = true;
                this._playList = [];
                this.playType = true;
            }
            Object.defineProperty(SoundManager.prototype, "playType", {
                get: function () {
                    return this._playType;
                },
                set: function (value) {
                    this._playType = value;
                    if (this._playType) {
                        Global.timer.doFrameLoop(20, flash.bind(this.playSoundHandler, this));
                    }
                    else {
                        Global.timer.clearTimer(flash.bind(this.playSoundHandler, this));
                    }
                },
                enumerable: true,
                configurable: true
            });
            /**播放游戏音效*/
            SoundManager.prototype.play = function (fileName) {
                if (this._playType && fileName && fileName != "") {
                    if (this._playList.indexOf(fileName + ".mp3") == -1) {
                        this._playList.push(fileName + ".mp3");
                    }
                }
                //egret.ExternalInterface.call("playSound", fileName + ".mp3");
            };
            SoundManager.prototype.playSoundHandler = function () {
                if (this._playList.length > 0) {
                    var jsons = JSON.stringify(this._playList);
                    egret.ExternalInterface.call("playSound", jsons);
                    egret.log("开始播放音效" + jsons);
                    this._playList = [];
                }
            };
            return SoundManager;
        }());
        manager.SoundManager = SoundManager;
        __reflect(SoundManager.prototype, "com.manager.SoundManager");
    })(manager = com.manager || (com.manager = {}));
})(com || (com = {}));
//# sourceMappingURL=SoundManager.js.map