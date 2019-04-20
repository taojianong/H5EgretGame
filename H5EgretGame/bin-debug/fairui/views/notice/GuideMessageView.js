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
     * 主菜单上方的指引提示
     * @author cl 2018.3.19
     */
    var GuideMessageView = (function (_super) {
        __extends(GuideMessageView, _super);
        function GuideMessageView() {
            var _this = _super.call(this) || this;
            _this._type = 1;
            _this.filters = [new egret.GlowFilter(0xff0000, 1, 16, 16, 2, 1, false)];
            _this.autoSize = fairygui.AutoSizeType.None;
            _this.fontSize = 30;
            EventManager.addEventListener(GameEvent.STGAE_RESIZE, _this.reSetPos, _this);
            return _this;
        }
        /**
         * 显示引导消息
         * @param str 提示文字,支持语言包字段名
         */
        GuideMessageView.prototype.showGuideMessage = function (str) {
            if (parent == null) {
                fairui.FairyUIManager.tipLayer.addChild(this);
            }
            this._type = 1;
            this.text = Global.lang.getLang(str);
            this.setPos();
            this.clear();
            this._obj = Global.timer.doTimeOnce(4000, this.dispose1, [this]);
        };
        /**
         * 显示提示信息
         * @param str
         *
         */
        GuideMessageView.prototype.showNoticeMessage = function (str) {
            if (parent == null) {
                fairui.FairyUIManager.tipLayer.addChild(this);
            }
            this._type = 2;
            this.text = str;
            this.setNoticePos();
            this.clear();
            this._obj = Global.timer.doTimeOnce(4000, this.dispose1, [this]);
        };
        GuideMessageView.prototype.dispose1 = function (thisObject) {
            if (thisObject === void 0) { thisObject = null; }
            thisObject = thisObject || this;
            thisObject.dispose();
        };
        GuideMessageView.prototype.dispose = function () {
            EventManager.removeEventListener(GameEvent.STGAE_RESIZE, this.reSetPos, this);
            this.clear();
            _super.prototype.dispose.call(this);
        };
        GuideMessageView.prototype.clear = function () {
            if (this._obj != null) {
                Global.timer.clearTimer(this._obj);
                this._obj = null;
            }
        };
        /**
         * 重新刷新位置
         */
        GuideMessageView.prototype.reSetPos = function () {
            if (this._type == 1) {
                this.setPos();
            }
            else if (this._type == 2) {
                this.setNoticePos();
            }
            else {
                this.setPos();
            }
        };
        /**
         * 引导信息位置
         */
        GuideMessageView.prototype.setPos = function () {
            this.x = Global.stageWidth - this.width >> 1;
            this.y = Global.stageHeight - 200;
        };
        /**
         * 提示文字信息位置
         */
        GuideMessageView.prototype.setNoticePos = function () {
            this.x = Global.stageWidth - this.width >> 1;
            this.y = Global.stageHeight - this.height >> 1;
        };
        return GuideMessageView;
    }(fairygui.GTextField));
    fairui.GuideMessageView = GuideMessageView;
    __reflect(GuideMessageView.prototype, "fairui.GuideMessageView");
})(fairui || (fairui = {}));
//# sourceMappingURL=GuideMessageView.js.map