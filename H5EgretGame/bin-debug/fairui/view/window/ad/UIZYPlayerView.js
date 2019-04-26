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
var fairui;
(function (fairui) {
    /**
     * 掌阅Video播放器
     * @author clong 2019.4.24
     */
    var UIZYPlayerView = (function (_super) {
        __extends(UIZYPlayerView, _super);
        function UIZYPlayerView() {
            var _this = _super.call(this, "common", "UIZYPlayerView") || this;
            _this.url = "";
            _this.fullscreenUrl = "";
            _this.inlineUrl = "";
            /**是否为错误播放  */
            _this.isError = false;
            return _this;
        }
        UIZYPlayerView.prototype.initUI = function () {
            _super.prototype.initUI.call(this);
        };
        UIZYPlayerView.prototype.initData = function (data) {
            _super.prototype.initData.call(this, data);
            if (this._video == null) {
                var video = document.querySelector('video');
                this._video = new ZYVideo(video);
            }
            this.url = UrlUtil.getVideoAdUrl("trailer");
            this.fullscreenUrl = UrlUtil.getVideoAdImgUrl("posterfullscreen");
            this.inlineUrl = UrlUtil.getVideoAdImgUrl("posterinline");
            this.play();
        };
        UIZYPlayerView.prototype.addAllListener = function () {
            _super.prototype.addAllListener.call(this);
            this._video.addVideoEventListener("ended", this.videoPlayEnd, this);
            this._video.addVideoEventListener("canplay", this.videoCanPlay, this);
            this._video.addEventListener(GameEvent.RENDER, this.updateVideoTime, this);
            this._video.addEventListener(egret.Event.COMPLETE, this.loadVideoComplete, this);
            this.addGameListener(egret.TouchEvent.TOUCH_TAP, this.touchPlayHandler, this, this.btn_play);
        };
        UIZYPlayerView.prototype.removeAllListener = function () {
            _super.prototype.removeAllListener.call(this);
            this._video.removeVideoEventListener("ended", this.videoPlayEnd, this);
            this._video.removeVideoEventListener("canplay", this.videoCanPlay, this);
            this._video.removeEventListener(egret.Event.COMPLETE, this.loadVideoComplete, this);
            this._video.removeEventListener(GameEvent.RENDER, this.updateVideoTime, this);
        };
        UIZYPlayerView.prototype.touchPlayHandler = function () {
            var div = document.getElementsByClassName("zy_media")[0];
            div.style['display'] = "";
            this._video.play();
        };
        UIZYPlayerView.prototype.play = function () {
            this._video.load(this.url);
            this.btn_play.enabled = false;
        };
        /**
         * 视频加载完成
         */
        UIZYPlayerView.prototype.videoCanPlay = function () {
            this.onResize();
            //this._video.play();
        };
        /**
         * 加载视频完成
         */
        UIZYPlayerView.prototype.loadVideoComplete = function (e) {
            // this._video.play();
            this.btn_play.enabled = true;
            this.txt_time.text = this._video.totalTime + "秒";
        };
        /**
         * 视频播放完成
         */
        UIZYPlayerView.prototype.videoPlayEnd = function (e) {
            this.isError = false;
            // UISystem.Inst.removeWindowClass(this.getCls());
            var div = document.getElementsByClassName("zy_media")[0];
            div.style['display'] = "none";
        };
        /**
         * 更新播放时间
         */
        UIZYPlayerView.prototype.updateVideoTime = function (e) {
        };
        UIZYPlayerView.prototype.onResize = function () {
            _super.prototype.onResize.call(this);
            if (this._video) {
                this._video.resize();
            }
        };
        UIZYPlayerView.prototype.closeHandler = function (e) {
            this.isError = true;
            _super.prototype.closeHandler.call(this, e);
        };
        UIZYPlayerView.prototype.clear = function () {
            _super.prototype.clear.call(this);
            this._video.stop();
            var div = document.getElementsByClassName("zy_media")[0];
            div.style['display'] = "none";
            EventManager.dispatchEvent(GameEvent.END_PLAY_AD, this.isError);
        };
        UIZYPlayerView.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
            if (this._video != null) {
                this._video.dispose();
                this._video = null;
            }
        };
        return UIZYPlayerView;
    }(fairui.UIBaseWindow));
    fairui.UIZYPlayerView = UIZYPlayerView;
    __reflect(UIZYPlayerView.prototype, "fairui.UIZYPlayerView");
})(fairui || (fairui = {}));
//# sourceMappingURL=UIZYPlayerView.js.map