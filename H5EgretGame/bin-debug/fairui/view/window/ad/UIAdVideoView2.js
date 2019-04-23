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
     * 掌阅播放器
     * @author clong 2019.4.23
     */
    var UIAdVideoView2 = (function (_super) {
        __extends(UIAdVideoView2, _super);
        function UIAdVideoView2() {
            var _this = _super.call(this, "common", "UIAdVideoView2") || this;
            _this.url = "";
            _this.fullscreenUrl = "";
            _this.inlineUrl = "";
            return _this;
        }
        UIAdVideoView2.prototype.initUI = function () {
            _super.prototype.initUI.call(this);
            this._video = document.querySelector('video');
        };
        UIAdVideoView2.prototype.addAllListener = function () {
            _super.prototype.addAllListener.call(this);
            this.addGameListener(egret.TouchEvent.TOUCH_TAP, this.touchPlayHandler, this, this.btn_play);
            this._video.addEventListener("ended", flash.bind(this.onPlayEnd, this));
        };
        UIAdVideoView2.prototype.removeAllListener = function () {
            _super.prototype.removeAllListener.call(this);
            this._video.removeEventListener("ended", flash.bind(this.onPlayEnd, this));
        };
        /**点击播放按钮 */
        UIAdVideoView2.prototype.touchPlayHandler = function (e) {
            this.btn_play.visible = false;
            if (this._video) {
                this.url = UrlUtil.getVideoAdUrl("trailer");
                this.fullscreenUrl = UrlUtil.getVideoAdImgUrl("posterfullscreen");
                this.inlineUrl = UrlUtil.getVideoAdImgUrl("posterinline");
                var div = document.getElementsByClassName("zy_media")[0];
                div.style['display'] = "";
                div.style['top'] = "10px";
                this._video.poster = this.inlineUrl;
                this._video.setAttribute("mediaTitle", "test");
                this._video.src = this.url;
                this._video.play();
            }
        };
        /**
         * 播放完成
         */
        UIAdVideoView2.prototype.onPlayEnd = function (e) {
            this.close();
        };
        UIAdVideoView2.prototype.onResize = function () {
            _super.prototype.onResize.call(this);
            var scale = Global.stageWidth / this._video.videoWidth;
            var h = this._video.videoHeight * scale;
            var y = Math.floor((Global.stageHeight - h) * 0.25);
            var div = document.getElementsByClassName("zy_media")[0];
            div.style['top'] = y + "px";
        };
        UIAdVideoView2.prototype.clear = function () {
            _super.prototype.clear.call(this);
            if (this._video != null) {
                this._video.pause();
                this._video.src = "";
                var div = document.getElementsByClassName("zy_media")[0];
                div.style['display'] = "none";
            }
        };
        UIAdVideoView2.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
        };
        return UIAdVideoView2;
    }(fairui.UIBaseWindow));
    fairui.UIAdVideoView2 = UIAdVideoView2;
    __reflect(UIAdVideoView2.prototype, "fairui.UIAdVideoView2");
})(fairui || (fairui = {}));
//# sourceMappingURL=UIAdVideoView2.js.map