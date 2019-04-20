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
     * 主加载界面
     * @author cl 2018.10.29
     */
    var UILoadingView = (function (_super) {
        __extends(UILoadingView, _super);
        function UILoadingView() {
            var _this = _super.call(this, "load", "UILoadingView") || this;
            _this.index = 1;
            return _this;
        }
        UILoadingView.prototype.registerClasses = function () {
            fairui.PanelRegister.registerClass("load", "ProgressBar", fairui.ProgressBar);
        };
        UILoadingView.prototype.InitUI = function () {
            _super.prototype.initUI.call(this);
            this.lab_tip.visible = false;
            this.lab_tip.text = "";
        };
        UILoadingView.prototype.setViewStruct = function () {
            _super.prototype.setViewStruct.call(this);
            this.viewStruct.isWindow = false;
            this.viewStruct.layerType = UILayout.TYPE_TOP;
        };
        /**
         * 外部不要调用
         */
        UILoadingView.prototype.initData = function (param) {
            _super.prototype.initData.call(this, param);
            this.proBar.progress = 0;
            this.proBar.isPlayTween = true;
            this.lab_tip.text = "";
            //改变背景图片
            this.changeBgImg();
            Global.timer.doTimeLoop(6000, flash.bind(this.changeBgImg, this));
            if (param instanceof utils.Handler) {
                param.execute();
            }
            // GlobalJugger.add(this);
        };
        UILoadingView.prototype.labelFunction = function (value, max) {
            return "";
        };
        UILoadingView.prototype.advanceTime = function (time) {
            // var lq: LoadQueue = LoadQueue.Inst;
            // this.onImitateProgress(lq.itemsLoaded, lq.itemsTotal);
        };
        UILoadingView.prototype.changeBgImg = function () {
            var num = 0;
            while (num = MathUtil.makeRandom(1, 3)) {
                if (num != this.index) {
                    this.index = num;
                    break;
                }
            }
            //加载对应背景图片
            this.eloader_bg.loadImage(UrlUtil.getPanelUrl("loading" + num, "loading"), null);
        };
        /**
         * 添加事件函数
         */
        UILoadingView.prototype.addAllListener = function () {
            _super.prototype.addAllListener.call(this);
            this.addGameListener(egret.TouchEvent.TOUCH_TAP, this.clickBtnStartHandler, this, this);
        };
        /**
         * 移除事件函数
         */
        UILoadingView.prototype.removeAllListener = function () {
            _super.prototype.removeAllListener.call(this);
            this.removeGameListener(egret.TouchEvent.TOUCH_TAP, this.clickBtnStartHandler, this, this);
        };
        /**
         * 加载完成
         */
        UILoadingView.prototype.onComplete = function () {
            // var lq: LoadQueue = LoadQueue.Inst;
            // Global.log.log(this, lq.itemsLoaded + "  /  " + lq.itemsTotal);
            // if (lq.itemsLoaded < lq.itemsTotal){
            //     return;
            // }
            // KeyFrameJugger.delayFrame(1, utils.Handler.Create(this.OnDelayFrameComplete, this));
            if (this.proBar.progress >= 1) {
                Global.timer.doFrameOnce(1, flash.bind(this.OnDelayFrameComplete, this));
            }
        };
        UILoadingView.prototype.OnDelayFrameComplete = function () {
            this.btn_start.touchable = true;
            this.proBar.progress = 1;
            this.lab_pro.text = "100%";
            this.currentState = "loaded";
            // GlobalJugger.remove(this); 
            EventManager.dispatchEvent(GameEvent.MAIN_LOAD_COMPLETE);
        };
        /**
         * 模拟进度
         */
        UILoadingView.prototype.onImitateProgress = function (itemsLoaded, itemsTotal) {
            var progress = itemsLoaded / itemsTotal;
            this.proBar.setVal(itemsLoaded, itemsTotal, 0, true, this.onComplete, this);
            this.proBar.setLabel("");
            this.lab_pro.text = MathUtil.toInt(progress * 100) + "%";
        };
        /**
         * 点击开始游戏
         */
        UILoadingView.prototype.clickBtnStartHandler = function (e) {
            if (this.btn_start.touchable) {
                EventManager.dispatchEvent(GameEvent.START_GAME);
            }
        };
        UILoadingView.prototype.onResize = function () {
            _super.prototype.onResize.call(this);
            this.btn_start.width = Global.stageWidth;
            this.group_start.y = Global.stageHeight - this.group_start.height;
            var scaleX = Global.stageWidth / this.width;
            var scaleY = Global.stageHeight / this.height;
            this.eloader_bg.scaleX = scaleX;
            this.eloader_bg.scaleY = scaleY;
        };
        UILoadingView.prototype.clear = function () {
            _super.prototype.clear.call(this);
            Global.timer.clearTimer(flash.bind(this.changeBgImg, this));
            // GlobalJugger.remove(this);
        };
        return UILoadingView;
    }(fairui.UIBaseWindow));
    fairui.UILoadingView = UILoadingView;
    __reflect(UILoadingView.prototype, "fairui.UILoadingView");
})(fairui || (fairui = {}));
//# sourceMappingURL=UILoadingView.js.map