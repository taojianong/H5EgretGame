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
 * 掌阅播放器复写
 * @author clong 2019.4.24
 */
var ZYVideo = (function (_super) {
    __extends(ZYVideo, _super);
    function ZYVideo(media, option) {
        var _this = _super.call(this, media, option) || this;
        _this.eventObj = new egret.EventDispatcher();
        /**总时长,秒 */
        _this._totalTime = 0;
        if (media instanceof HTMLVideoElement) {
            _this._video = media;
        }
        _this.divEle = document.getElementsByClassName("zy_media")[0];
        return _this;
    }
    ZYVideo.prototype.init = function () {
        _super.prototype.init.call(this);
    };
    ZYVideo.prototype.buildTotalTime = function () {
        // this._totalTime = this._video.duration;
        // t.durationDuration = time;
        // this.eventObj.dispatchEvent( new egret.Event( egret.Event.COMPLETE ) );
    };
    ZYVideo.prototype.loadComplete = function () {
        if (this._video) {
            this._totalTime = parseInt("" + this._video.duration);
            this.eventObj.dispatchEvent(new egret.Event(egret.Event.COMPLETE));
        }
    };
    Object.defineProperty(ZYVideo.prototype, "totalTime", {
        get: function () {
            return this._totalTime;
        },
        enumerable: true,
        configurable: true
    });
    ZYVideo.prototype.buildContainer = function () {
        var t = this;
        t["container"] = t._video.parentNode;
        t["container"].style.overflow = 'hidden';
        t["width"] = t["options"].videoWidth;
        t["height"] = t["options"].videoHeight;
        if (t["width"] == '100%' && t["height"] == 'auto') {
            t["enableAutoSize"] = true;
        }
        t.setPlayerSize(t["width"], t["height"]);
    };
    ZYVideo.prototype.updateTime = function () {
        if (this._video) {
            this.eventObj.dispatchEvent(new GameEvent(GameEvent.RENDER, this._video.currentTime));
        }
    };
    ZYVideo.prototype.load = function (url) {
        if (this._video) {
            this._video.src = url;
        }
    };
    ZYVideo.prototype.play = function () {
        if (this._video) {
            this._video.play();
            this.eventObj.dispatchEvent(new GameEvent(GameEvent.PLAY_AD));
        }
    };
    ZYVideo.prototype.stop = function () {
        if (this._video) {
            this._video.pause();
            this._video.src = "";
        }
    };
    ZYVideo.prototype.addVideoEventListener = function (type, listener, thisObject) {
        if (this._video) {
            this._video.addEventListener(type, flash.bind(listener, thisObject));
        }
    };
    ZYVideo.prototype.removeVideoEventListener = function (type, listener, thisObject) {
        if (this._video) {
            this._video.removeEventListener(type, flash.bind(listener, thisObject));
        }
    };
    ZYVideo.prototype.addEventListener = function (type, listener, thisObject) {
        if (this.eventObj) {
            this.eventObj.addEventListener(type, listener, thisObject);
        }
    };
    ZYVideo.prototype.removeEventListener = function (type, listener, thisObject) {
        if (this.eventObj) {
            this.eventObj.removeEventListener(type, listener, thisObject);
        }
    };
    ZYVideo.prototype.setMediaTitle = function (title) {
        if (this.options) {
            this.options["mediaTitle"] = title;
        }
    };
    ZYVideo.prototype.showControls = function () {
    };
    ZYVideo.prototype.hideControls = function () {
    };
    /**
     * 进入全屏
     */
    ZYVideo.prototype.enterFullScreen = function () {
        _super.prototype.exitFullScreen.call(this);
    };
    /**
     * 退出全屏
     */
    ZYVideo.prototype.exitFullScreen = function () {
        _super.prototype.exitFullScreen.call(this);
    };
    Object.defineProperty(ZYVideo.prototype, "videoWidth", {
        get: function () {
            return this._video.videoWidth;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ZYVideo.prototype, "videoHeight", {
        get: function () {
            return this._video.videoHeight;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ZYVideo.prototype, "top", {
        /**
         * 设置距离顶部距离
         */
        set: function (value) {
            this._video.style.top = value + "px";
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 自适应
     */
    ZYVideo.prototype.resize = function () {
        var gap = 100;
        var bodyHeight = document.documentElement.clientHeight;
        var bodyWidth = document.documentElement.clientWidth;
        if (this._video) {
            var scale = (bodyWidth - gap) / this._video.videoWidth;
            var h = this._video.videoHeight * scale;
            var cy = Math.floor(bodyHeight - h) * 0.5;
            this._video.style.width = (bodyWidth - gap) + "px";
            this._video.style.height = h + "px";
            this._video.style.left = Math.floor(gap * 0.5) + "px";
            this._video.style.top = cy + "px";
        }
    };
    ZYVideo.prototype.dispose = function () {
        this.stop();
        this._video = null;
    };
    return ZYVideo;
}(zyMedia.MediaPlayer));
__reflect(ZYVideo.prototype, "ZYVideo");
//# sourceMappingURL=ZYVideo.js.map