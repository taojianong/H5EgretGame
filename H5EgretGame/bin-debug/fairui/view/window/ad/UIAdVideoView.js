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
     * 视频广告界面
     * @author clong 2019.4.18
     */
    var UIAdVideoView = (function (_super) {
        __extends(UIAdVideoView, _super);
        function UIAdVideoView() {
            var _this = _super.call(this, "common", "UIAdVideoView") || this;
            _this._totalTime = 0; //视频时间总长,秒
            _this._playTime = 0;
            _this._isLoaded = false; //视频是否加载完成
            _this._videoWidth = 0;
            _this._videoHeight = 0;
            _this.proTime = 0; //进度毫秒数
            _this.url = "";
            _this.fullscreenUrl = "";
            _this.inlineUrl = "";
            return _this;
        }
        UIAdVideoView.prototype.initUI = function () {
            _super.prototype.initUI.call(this);
            this.pro.width = 0;
        };
        UIAdVideoView.prototype.initData = function (data) {
            _super.prototype.initData.call(this, data);
            this.currentState = "normal";
            this._playTime = 0;
            this._isLoaded = false;
            this.btn_play.visible = false;
            this.btn_exit.visible = false;
            this.url = UrlUtil.getVideoAdUrl("trailer");
            this.fullscreenUrl = UrlUtil.getVideoAdImgUrl("posterfullscreen");
            this.inlineUrl = UrlUtil.getVideoAdImgUrl("posterinline");
            this.img_icon.loadImage(this.fullscreenUrl);
            var _self = this;
            // LoadQueue.Inst.loadVideo( this.url , this.onVideoComplete , this );
            _self.loadVideo(_self.url, _self.fullscreenUrl, _self.inlineUrl);
            this.onResize();
        };
        UIAdVideoView.prototype.addAllListener = function () {
            _super.prototype.addAllListener.call(this);
            this.addGameListener(egret.TouchEvent.TOUCH_TAP, this.touchDetailHandler, this, this.btn_detail);
            this.addGameListener(egret.TouchEvent.TOUCH_TAP, this.touchPlayHandler, this, this.btn_play);
            this.addGameListener(egret.TouchEvent.TOUCH_TAP, this.closeHandler, this, this.btn_exit);
        };
        /**
         * 加载错误
         */
        UIAdVideoView.prototype.onLoadErr = function (e) {
            fairui.Notice.showMiddleMessage("---------------------------------加载视频错误------------------------------");
        };
        /**点击播放按钮 */
        UIAdVideoView.prototype.touchPlayHandler = function (e) {
            this.btn_play.visible = false;
            this.play();
        };
        /**
         * 加载视频
         * @param url 视频地址
         * @param fullscreenUrl 视频加载前全屏图片
         * @param inlineUrl 视频截图图片
         */
        UIAdVideoView.prototype.loadVideo = function (url, fullscreenUrl, inlineUrl) {
            if (fullscreenUrl === void 0) { fullscreenUrl = ""; }
            if (inlineUrl === void 0) { inlineUrl = ""; }
            if (this._video == null) {
                this._isLoaded = false;
                this._video = new ADVideo(); // new egret.Video();
                // this._video.fullscreen = false;
                this.cont.addEgretChild(this._video);
                this._video.load(url, false);
                // this._video.addEventListener(egret.Event.COMPLETE, this.loadComplete, this);
                this._video.addEventListener(GameEvent.LOAD_COMPLETE, this.loadComplete, this);
                this._video.addEventListener(GameEvent.RENDER, this.renderPlayVideo, this);
                this._video.addEventListener(egret.Event.ENDED, this.videoPlayEnd, this);
                //监听视频加载失败
                this._video.once(egret.IOErrorEvent.IO_ERROR, this.onLoadErr, this);
            }
        };
        /**加载视频完成 */
        UIAdVideoView.prototype.loadComplete = function (e) {
            this._isLoaded = true;
            this.img_icon.clear();
            this._video.removeEventListener(egret.Event.COMPLETE, this.loadComplete, this);
            this._video.removeEventListener(GameEvent.LOAD_COMPLETE, this.loadComplete, this);
            this._videoWidth = this._video.measuredWidth;
            this._videoHeight = this._video.measuredHeight;
            this.updateVideoXY();
            // this.play();
            this._video.videoCanplay();
            this.btn_play.visible = true;
            if (egret.Capabilities.isMobile) {
                this.btn_exit.visible = true;
            }
        };
        /**
         * 视频正在播放时
         */
        UIAdVideoView.prototype.renderPlayVideo = function (e) {
            var time = parseInt("" + e.data);
            this.setPlayTime(time);
            // Notice.showMiddleMessage("视频正在播放：" + time);
        };
        //播放
        UIAdVideoView.prototype.play = function () {
            // this._video.fullscreen = true;
            this._video.play(0, false);
            this.pro.width = 0;
            this._totalTime = this._playTime = parseInt("" + this._video.length);
            // this.setPlayTime( this._playTime );
            Global.timer.doTimeLoop(1000, flash.bind(this.updateTime, this));
            this.proTime = 0;
            Global.timer.doTimeLoop(1, flash.bind(this.updateProgress, this));
        };
        /**显示剩余时间 */
        UIAdVideoView.prototype.updateTime = function () {
            this._playTime--;
            // this.setPlayTime( this._playTime );
            if (this._playTime < 0) {
                fairygui.GTween.kill(this.pro, true);
                this.pro.width = this.bg.width;
                this.currentState = "complete";
                Global.timer.clearTimer(flash.bind(this.updateTime, this));
                Global.timer.clearTimer(flash.bind(this.updateProgress, this));
                this.onComplete();
            }
        };
        /**更新进度条 */
        UIAdVideoView.prototype.updateProgress = function () {
            var progress = this.proTime / (this._totalTime * 1000);
            progress = progress < 0 ? 0 : (progress > 1 ? 1 : progress);
            this.pro.width = this.bg.width * progress;
            this.proTime++;
        };
        UIAdVideoView.prototype.onUpdate = function () {
            var tw = fairygui.GTween.getTween(this.pro);
            if (tw != null) {
                this.pro.width = parseInt(tw.value.x + "");
            }
        };
        UIAdVideoView.prototype.setPlayTime = function (time) {
            if (time >= 0) {
                this.txt_time.text = (this._totalTime - time) + "秒";
            }
            else {
                this.txt_time.text = "";
            }
        };
        /**视频播放完成 */
        UIAdVideoView.prototype.videoPlayEnd = function () {
            if (egret.Capabilities.isMobile) {
                if (egret.Capabilities.os == "Android") {
                    fairui.Notice.showMiddleMessage("---------------------------------安卓播放完成------------------------------");
                    this.onComplete();
                }
            }
        };
        //播放完成
        UIAdVideoView.prototype.onComplete = function (e) {
            if (e === void 0) { e = null; }
            fairui.Notice.showMiddleMessage("---------------------------------播放完成------------------------------");
            this.currentState = "complete";
            //显示播放完成图片
            var fullscreenUrl = UrlUtil.getVideoAdImgUrl("posterfullscreen");
            this.img_icon.loadImage(fullscreenUrl);
            this.releaseVideo();
        };
        UIAdVideoView.prototype.releaseVideo = function () {
            if (this._video) {
                this._video.removeEventListener(egret.Event.COMPLETE, this.loadComplete, this);
                this._video.removeEventListener(egret.Event.ENDED, this.onComplete, this);
                this._video.close();
                this.cont.removeEgretChild(this._video);
                this._video = null;
            }
        };
        /**
         * 点击详情按钮
         */
        UIAdVideoView.prototype.touchDetailHandler = function (e) {
            // TsToNative.sendToNative("showweb," + path);
        };
        /**更新视频坐标 */
        UIAdVideoView.prototype.updateVideoXY = function () {
            if (this._video != null && this._isLoaded) {
                var w = this._videoWidth;
                var h = this._videoHeight;
                var x = (this.bg.width - w) * 0.5;
                var y = (this.bg.height - h) * 0.5;
                x = parseInt("" + x);
                y = parseInt("" + y);
                this._video.setWH(w, h, x, y);
                this.updateProgress();
            }
        };
        UIAdVideoView.prototype.onResize = function () {
            _super.prototype.onResize.call(this);
            this.bg.width = Global.stageWidth;
            this.bg.height = Global.stageHeight;
            this.updateVideoXY();
        };
        UIAdVideoView.prototype.clear = function () {
            _super.prototype.clear.call(this);
            this.currentState = "normal";
            this.cont.removeChildren();
            // Notice.showMiddleMessage( "---------关闭视频广告播放界面." );
            this.releaseVideo();
            // this._pauseTime = 0;
            this._playTime = 0;
            this._totalTime = 0;
            this._isLoaded = false;
            this._videoWidth = 0;
            this._videoHeight = 0;
            this.pro.width = 0;
            this.proTime = 0;
            this.btn_play.visible = false;
            this.txt_time.text = "";
            Global.timer.clearTimer(flash.bind(this.updateTime, this));
            Global.timer.clearTimer(flash.bind(this.updateProgress, this));
            EventManager.dispatchEvent(GameEvent.END_PLAY_AD);
        };
        UIAdVideoView.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
        };
        return UIAdVideoView;
    }(fairui.UIBaseWindow));
    fairui.UIAdVideoView = UIAdVideoView;
    __reflect(UIAdVideoView.prototype, "fairui.UIAdVideoView");
})(fairui || (fairui = {}));
//# sourceMappingURL=UIAdVideoView.js.map