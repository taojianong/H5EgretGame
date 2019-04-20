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
 * 广告播放器
 */
var ADVideo = (function (_super) {
    __extends(ADVideo, _super);
    function ADVideo() {
        var _this = _super.call(this) || this;
        _this.firstPause = false;
        _this.addEventListener(egret.Event.COMPLETE, _this.onVideoLoaded2, _this);
        return _this;
    }
    ADVideo.prototype.load = function (url, cache) {
        if (cache === void 0) { cache = false; }
        var _self = this;
        if (cache === void 0) {
            cache = true;
        }
        url = url || this.src;
        if (!url) {
            egret.$error(3002);
        }
        if (this["video"] && this["video"].src == url) {
            return;
        }
        this.src = url;
        var video;
        if (!this["video"] || egret.Capabilities.isMobile) {
            video = document.createElement("video");
            this["video"] = video;
            video.controls = null;
        }
        else {
            video = this["video"];
        }
        video.src = url;
        video.setAttribute("autoplay", "autoplay");
        // video.setAttribute("autoplay", "meta");
        video.setAttribute("webkit-playsinline", "true"); //内联播放
        // video.setAttribute("playsinline", "true");
        video.setAttribute("x5-video-orientation", "landscape"); //x5-video-orientation="portraint" ：声明播放器支持的方向，可选值landscape 横屏,portraint竖屏。
        video.addEventListener("canplay", this["onVideoLoaded"]);
        video.addEventListener("error", function () { return _self.onVideoError(); });
        video.addEventListener("ended", function () { return _self.onVideoEnded(); });
        // video.addEventListener("canplay", function () { return _self.videoCanplay(); } );
        // video.addEventListener("waiting", function () { return _self.videoWaiting(); } );
        video.addEventListener("progress", function (e) { return _self.loadProgress(e); }); //加载进度
        video.addEventListener("loadedmetadata", function () { return _self.onLoadedmetadata(); });
        video.addEventListener("durationchange", function () { return _self.onDurationchange(); }); //资源长度改变		
        video.load();
        // this.videoPlay();
        video.style.position = "absolute";
        video.style.top = "0px";
        video.style.zIndex = "-88888";
        video.style.left = "0px";
        video.height = 1;
        video.width = 1;
    };
    /**加载完成 */
    ADVideo.prototype.onVideoLoaded2 = function (e) {
        if (e === void 0) { e = null; }
        var _self = this;
        this.removeEventListener(egret.Event.COMPLETE, this.onVideoLoaded2, this);
        var video = _self["video"];
        _self["loaded"] = true;
        video["currentTime"] = 0;
        video.pause();
        if (_self["posterData"]) {
            _self["posterData"].width = _self.getPlayWidth();
            _self["posterData"].height = _self.getPlayHeight();
        }
        video.width = video.videoWidth;
        video.height = video.videoHeight;
        _self.videoCanplay();
        _self.dispatchEvent(new GameEvent(GameEvent.LOAD_COMPLETE));
        fairui.Notice.showMiddleMessage("----------------------------------------onVideoLoaded2---duration: " + this["video"].duration + " currentTime: " + this["video"].currentTime);
    };
    // private videoWaiting():void{
    // 	this["waiting"] = true;
    // }
    ADVideo.prototype.onLoadedmetadata = function () {
        fairui.Notice.showMiddleMessage("----------------------------------------onLoadedmetadata---duration: " + this["video"].duration + " currentTime: " + this["video"].currentTime);
    };
    ADVideo.prototype.onDurationchange = function () {
        fairui.Notice.showMiddleMessage("----------------------------------------onDurationchange---duration: " + this["video"].duration + " currentTime: " + this["video"].currentTime);
    };
    ADVideo.prototype.loadProgress = function (e) {
        fairui.Notice.showMiddleMessage("----------------------------------------loadProgress: " + e.timeStamp);
    };
    /**
     * 视频准备好可以播放了
     */
    ADVideo.prototype.videoCanplay = function () {
        var _self = this;
        var video = this["video"];
        fairui.Notice.showMiddleMessage("----------------------------------------videoCanplay---0");
        this["video"].currentTime = 0;
        _self.pause();
    };
    ADVideo.prototype.pause = function () {
        this["userPlay"] = false;
        this["userPause"] = false;
        if (this["video"] != null) {
            this["video"].pause();
        }
        fairui.Notice.showMiddleMessage("----------------------------------------pause");
        egret.stopTick(this.markDirty, this);
    };
    ADVideo.prototype.play = function (startTime, loop) {
        if (startTime === void 0) { startTime = 0; }
        if (loop === void 0) { loop = false; }
        fairui.Notice.showMiddleMessage("----------------------------------------play---0");
        var _self = this;
        // if (loop === void 0) { loop = false; }
        // if (this["loaded"] == false) {
        // 	this.load(this.src);
        // 	this.once(egret.Event.COMPLETE, function (e) { return _self.play(startTime, loop); }, this);
        // 	fairui.Notice.showMiddleMessage("----------------------------------------play---1");
        // 	return;
        // }
        this["isPlayed"] = true;
        var video = this["video"];
        if (startTime != undefined) {
            video.currentTime = +startTime || 0;
        }
        video.loop = !!loop;
        if (egret.Capabilities.isMobile) {
            video.style.zIndex = "-88888"; //移动端，就算设置成最小，只要全屏，都会在最上层，而且在自动退出去后，不担心挡住canvas
        }
        else {
            video.style.zIndex = "9999";
        }
        video.style.position = "absolute";
        // video.style.top = "0px";
        // video.style.left = "0px";
        video.height = video.videoHeight;
        video.width = video.videoWidth;
        if (egret.Capabilities.os != "Windows PC" && egret.Capabilities.os != "Mac OS") {
            fairui.Notice.showMiddleMessage("----------------------------------------play---1");
            window.setTimeout(function () {
                video.width = 0;
            }, 1000);
        }
        fairui.Notice.showMiddleMessage("----------------------------------------play---2");
        this.checkFullScreen(this["_fullscreen"]);
        video.removeEventListener('timeupdate', function () { return _self.onTimeUpdate(); });
        video.addEventListener('timeupdate', function () { return _self.onTimeUpdate(); });
    };
    ADVideo.prototype.checkFullScreen = function (playFullScreen) {
        fairui.Notice.showMiddleMessage("----------------------------------------checkFullScreen---:" + playFullScreen);
        var video = this["video"];
        if (playFullScreen) {
            if (video.parentElement == null) {
                video.removeAttribute("webkit-playsinline");
                // video.removeAttribute("playsinline", "true");
                document.body.appendChild(video);
            }
            egret.stopTick(this.markDirty, this);
            this.goFullscreen();
        }
        else {
            if (video.parentElement != null) {
                video.parentElement.removeChild(video);
            }
            video.setAttribute("webkit-playsinline", "true");
            // video.setAttribute("playsinline", "true");
            this.setFullScreenMonitor(false);
            egret.startTick(this.markDirty, this);
            if (egret.Capabilities.isMobile) {
                video.currentTime = 0;
                this.onVideoEnded();
                return;
            }
        }
        this.videoPlay();
    };
    ;
    ADVideo.prototype.videoPlay = function () {
        fairui.Notice.showMiddleMessage("----------------------------------------videoPlay---0");
        this["userPause"] = false;
        this["userPlay"] = false;
        this["video"].play();
        fairui.Notice.showMiddleMessage("----------------------------------------videoPlay---2");
    };
    ADVideo.prototype.goFullscreen = function () {
        fairui.Notice.showMiddleMessage("----------------------------------------goFullscreen---0");
        var video = this["video"];
        video.removeAttribute("webkit-playsinline");
        // video.removeAttribute("playsinline");
        // video[fullscreenType]();
        if (egret.Capabilities.isMobile) {
            this.requestFullScreen(video);
            this.setFullScreenMonitor(true);
            fairui.Notice.showMiddleMessage("----------------------------------------goFullscreen---3");
        }
        return true;
    };
    /**
    * [requestFullScreen 设置全屏]
    */
    ADVideo.prototype.requestFullScreen = function (video) {
        var de = video; //document.documentElement;
        try {
            if (de.requestFullscreen) {
                de.requestFullscreen();
            }
            else if (de["mozRequestFullScreen"] != null) {
                de["mozRequestFullScreen"]();
            }
            else if (de.webkitRequestFullScreen) {
                de.webkitRequestFullScreen();
            }
        }
        catch (e) {
            fairui.Notice.showMiddleMessage("----------------------------------------requestFullScreen error:" + e);
        }
    };
    ADVideo.prototype.setFullScreenMonitor = function (use) {
        var video = this["video"];
        if (use) {
            video.addEventListener("mozfullscreenchange", this.screenChanged);
            video.addEventListener("webkitfullscreenchange", this.screenChanged);
            video.addEventListener("mozfullscreenerror", this.screenError);
            video.addEventListener("webkitfullscreenerror", this.screenError);
        }
        else {
            video.removeEventListener("mozfullscreenchange", this.screenChanged);
            video.removeEventListener("webkitfullscreenchange", this.screenChanged);
            video.removeEventListener("mozfullscreenerror", this.screenError);
            video.removeEventListener("webkitfullscreenerror", this.screenError);
        }
    };
    ADVideo.prototype.screenChanged = function (e) {
        var isfullscreen = document.fullscreenEnabled || document.webkitIsFullScreen;
        if (!isfullscreen) {
            this.checkFullScreen(false);
            if (!egret.Capabilities.isMobile) {
                this["_fullscreen"] = isfullscreen;
            }
        }
    };
    ADVideo.prototype.screenError = function () {
        egret.$error(3014);
    };
    ADVideo.prototype.markDirty = function () {
        this.$renderDirty = true;
        return true;
    };
    /**播放完成 */
    ADVideo.prototype.onVideoEnded = function () {
        this.pause();
        this["isPlayed"] = false;
        this.dispatchEventWith(egret.Event.ENDED);
        fairui.Notice.showMiddleMessage("----------------------------------------ADVideo onVideoEnded 播放完成");
    };
    /**更新时间 */
    ADVideo.prototype.onTimeUpdate = function () {
        if (this["video"] != null) {
            var time = this["video"].currentTime; // > 0.1
            if (time > 0.1) {
                this.dispatchEvent(new GameEvent(GameEvent.RENDER, time));
            }
        }
    };
    ADVideo.prototype.onVideoError = function () {
        fairui.Notice.showMiddleMessage("----------------------------------------ADVideo onVideoError:播放错误");
        this.dispatchEventWith(egret.IOErrorEvent.IO_ERROR);
    };
    /**退出全屏 */
    ADVideo.prototype.exitFullscreen = function () {
        fairui.Notice.showMiddleMessage("----------------------------------------exitFullscreen---0");
        var de = this["video"];
        this.exitFullscreen;
        try {
            // if (document['exitFullscreen'] != null ) {
            // 	document['exitFullscreen']();
            // }
            // else if (document['msExitFullscreen'] != null ) {
            // 	document['msExitFullscreen']();
            // }
            // else if (document['mozCancelFullScreen'] != null ) {
            // 	document['mozCancelFullScreen']();
            // }
            // else if (document['oCancelFullScreen'] != null ) {	
            // 	document['oCancelFullScreen']();
            // }
            // else if (document['webkitExitFullscreen'] != null ) {
            // 	document['webkitExitFullscreen']();
            // }
            if (de["exitFullscreen"] != null) {
                de["exitFullscreen"]();
            }
            else if (de["mozCancelFullScreen"] != null) {
                de["mozCancelFullScreen"]();
            }
            else if (de["webkitCancelFullScreen"]) {
                de["webkitCancelFullScreen"]();
            }
        }
        catch (e) {
            fairui.Notice.showMiddleMessage("exitFullscreen error:" + e);
        }
    };
    ADVideo.prototype.close = function () {
        var _self = this;
        this.fullscreen = false;
        this.exitFullscreen();
        this["closed"] = true;
        this["video"].removeEventListener("canplay", _self["onVideoLoaded"]);
        this["video"].removeEventListener("error", function () { return _self.onVideoError(); });
        this["video"].removeEventListener("ended", function () { return _self.onVideoEnded(); });
        this["video"].removeEventListener('timeupdate', function () { return _self.onTimeUpdate(); });
        // this["video"].removeEventListener("canplay", function () { return _self.videoCanplay(); } );
        // this["video"].removeEventListener("waiting", function () { return _self.videoWaiting(); } );
        this.pause();
        if (this["video"]) {
            this["video"].src = "";
            this["video"].removeAttribute("webkit-playsinline");
            if (this["video"].parentElement != null) {
                this["video"].parentElement.removeChild(this["video"]);
            }
            this["video"] = null;
        }
        this.src = "";
        this["loaded"] = false;
    };
    ADVideo.prototype.setWH = function (w, h, x, y) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        var video = this["video"];
        if (video) {
            video.width = w;
            video.height = h;
            video.style.left = x + "px";
            video.style.top = y + "px";
        }
    };
    ADVideo.prototype.getPlayWidth = function () {
        if (!isNaN(this["widthSet"])) {
            return this["widthSet"];
        }
        if (this.bitmapData) {
            return this.bitmapData.width;
        }
        if (this["posterData"]) {
            return this["posterData"].width;
        }
        return NaN;
    };
    ADVideo.prototype.getPlayHeight = function () {
        if (!isNaN(this["heightSet"])) {
            return this["heightSet"];
        }
        if (this.bitmapData) {
            return this.bitmapData.height;
        }
        if (this["posterData"]) {
            return this["posterData"].height;
        }
        return NaN;
    };
    //------------------------------------
    ADVideo.prototype.getElement = function () {
        return this["video"].parentElement;
    };
    ADVideo.prototype.removeFromParentElement = function () {
        if (this["video"].parentElement != null) {
            this["video"].removeAttribute("webkit-playsinline");
            this["video"].parentElement.removeChild(this["video"]);
        }
    };
    return ADVideo;
}(egret.Video));
__reflect(ADVideo.prototype, "ADVideo");
//# sourceMappingURL=ADVideo.js.map