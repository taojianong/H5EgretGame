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
     * 反向遮罩界面
     * @author clong 2019.3.25
     */
    var UIReverseMaskView = (function (_super) {
        __extends(UIReverseMaskView, _super);
        function UIReverseMaskView() {
            var _this = _super.call(this, "common", "UIReverseMaskView") || this;
            /**对应引导的显示对象 */
            _this._target = null;
            /**箭头方向 */
            _this._dir = 2;
            /**其他数据 */
            _this._other = null;
            return _this;
        }
        UIReverseMaskView.prototype.initUI = function () {
            _super.prototype.initUI.call(this);
            this.circle.downScaled = false;
            this.maskClick = false;
            this.eloader_icon.touchable = true;
            this.rmsk = fairui.PanelRegister.createGObject("common", "ReverseMask");
            fairui.FairyUtils.setVar(this.rmsk, this);
            this.rmsk.setTarget(this.eloader_icon, this.onUpdate, this.onComplete, this);
        };
        UIReverseMaskView.prototype.initData = function (param) {
            _super.prototype.initData.call(this, param);
            if (param == "msk") {
                this.currentState = "msk";
                this.onResize();
                return;
            }
            var target = param[0];
            this._dir = param[1]; //箭头方向
            var isMust = param[2]; //是否为强制引导			
            this._other = param[3]; //其他参数
            this.currentState = isMust ? "must" : "nomust";
            this.img_arrow.visible = false;
            if (this._dir == 2 || this._dir == 0) {
                this.img_arrow.scaleX = 1;
                this.img_arrow.scaleY = -1;
                this.img_arrow.rotation = 0;
            }
            else if (this._dir == 8) {
                this.img_arrow.scaleX = this.img_arrow.scaleY = 1;
                this.img_arrow.rotation = 0;
            }
            else if (this._dir == 4) {
                this.img_arrow.scaleX = 1;
                this.img_arrow.scaleY = -1;
                this.img_arrow.rotation = 50;
            }
            else if (this._dir == 6) {
                this.img_arrow.scaleX = 1;
                this.img_arrow.scaleY = 1;
                this.img_arrow.rotation = 50;
            }
            this.onResize();
            this.setTarget(target);
        };
        UIReverseMaskView.prototype.addAllListener = function () {
            _super.prototype.addAllListener.call(this);
            this.addGameListener(egret.TouchEvent.TOUCH_BEGIN, this.beginGuide, this, Global.stage);
        };
        UIReverseMaskView.prototype.RemoveRootListener = function () {
            _super.prototype.removeAllListener.call(this);
            this.removeGameListener(egret.TouchEvent.TOUCH_BEGIN, this.beginGuide, this, Global.stage);
        };
        UIReverseMaskView.prototype.beginGuide = function (e) {
            e.stopPropagation();
            if (this.btn_center.containsGlobalPoint(e.stageX, e.stageY) && !this.rmsk.isMoving) {
                EventManager.dispatchEvent(GameEvent.GUIDE_END); //结束引导
            }
        };
        /**
         * 设置显示中心对象
         */
        UIReverseMaskView.prototype.setTarget = function (target) {
            this._target = target;
            this.updateCirclePoint();
        };
        /**更新引导中心坐标 */
        UIReverseMaskView.prototype.updateCirclePoint = function () {
            var _self = this;
            _self.img_arrow.visible = false;
            var offsetX = this._other && this._other.hasOwnProperty("offsetX") ? this._other["offsetX"] : 0;
            var offsetY = this._other && this._other.hasOwnProperty("offsetY") ? this._other["offsetY"] : 0;
            if (this._target instanceof fairygui.GObject) {
                var gp = this._target.localToGlobal(0, 0);
                var lp = this.globalToLocal(gp.x, gp.y);
                lp.x += this._target.width * (this._target.scaleX - 1) * 0.5;
                lp.y += this._target.height * (this._target.scaleY - 1) * 0.5;
                if (!this._target.pivotAsAnchor) {
                    lp.x += this._target.width * 0.5;
                    lp.y += this._target.height * 0.5;
                }
                this.show(lp.x + offsetX, lp.y + offsetY);
            }
        };
        /**移动中心点刷新 */
        UIReverseMaskView.prototype.onUpdate = function () {
            this.btn_center.visible = true;
        };
        /**移动中心点完成 */
        UIReverseMaskView.prototype.onComplete = function () {
            if (this._dir == 2) {
                this.img_arrow.x = this.sp.x;
                this.img_arrow.y = this.sp.y - this.sp.height * 0.5 - this.img_arrow.height * 0.5;
            }
            else if (this._dir == 8) {
                this.img_arrow.x = this.sp.x;
                this.img_arrow.y = this.sp.y + this.sp.height * 0.5 + this.img_arrow.height * 0.5;
            }
            else if (this._dir == 4) {
                this.img_arrow.x = this.sp.x - this.sp.width * 0.5 - this.img_arrow.height * 0.5;
                this.img_arrow.y = this.sp.y;
            }
            else if (this._dir == 6) {
                this.img_arrow.x = this.sp.x + this.sp.width * 0.5 + this.img_arrow.height * 0.5;
                this.img_arrow.y = this.sp.y;
            }
            this.img_arrow.visible = true;
            this.btn_center.visible = false;
            this.btn_center.setXY(this.sp.x, this.sp.y);
            this.btn_center.setSize(this.sp.width, this.sp.height);
        };
        /**
         * 显示中心坐标
         * @param  	x 		中心全局X坐标
         * @param  	y 		中心全局Y坐标
         * @param 	width 	中心宽度
         * @param 	height 	中心高度
         */
        UIReverseMaskView.prototype.show = function (x, y, width, height) {
            if (width === void 0) { width = 100; }
            if (height === void 0) { height = 100; }
            this.rmsk.setSize(Global.stageWidth, Global.stageHeight);
            this.rmsk.moveTo(x, y, width, height);
        };
        /**更新除中心点其他模块坐标及高宽度 */
        UIReverseMaskView.prototype.updateOtherPoint = function () {
            this.up.height = this.circle.y - this.circle.height * 0.5;
            this.down.y = this.circle.y + this.circle.height * 0.5;
            this.down.height = (this.height - this.down.y) || 0;
            this.left.width = this.circle.x - this.circle.width * 0.5;
            this.left.y = this.right.y = this.circle.y - this.circle.height * 0.5;
            this.right.x = this.circle.x + this.circle.width * 0.5;
            this.right.width = (this.width - this.right.x) || 0;
        };
        /**关闭事件 */
        UIReverseMaskView.prototype.closeHandler = function (e) {
            _super.prototype.closeHandler.call(this, e);
        };
        UIReverseMaskView.prototype.clear = function () {
            _super.prototype.clear.call(this);
            this._target = null;
            this._other = null;
        };
        UIReverseMaskView.prototype.onResize = function () {
            this.setSize(Global.stageWidth, Global.stageHeight);
            _super.prototype.onResize.call(this);
            this.updateCirclePoint();
        };
        UIReverseMaskView.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
            if (this.rmsk) {
                this.rmsk.dispose();
                this.rmsk = null;
            }
        };
        return UIReverseMaskView;
    }(fairui.UIBaseWindow));
    fairui.UIReverseMaskView = UIReverseMaskView;
    __reflect(UIReverseMaskView.prototype, "fairui.UIReverseMaskView");
})(fairui || (fairui = {}));
//# sourceMappingURL=UIReverseMaskView.js.map