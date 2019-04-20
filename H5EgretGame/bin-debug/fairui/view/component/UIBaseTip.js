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
     * TIP基类
     * @author clong 2019.2.20
     */
    var UIBaseTip = (function (_super) {
        __extends(UIBaseTip, _super);
        function UIBaseTip() {
            var _this = _super.call(this) || this;
            /**背景遮罩点击是否关闭 */
            _this.maskClick = true;
            return _this;
        }
        UIBaseTip.prototype.constructFromXML = function (xml) {
            // super.constructFromXML( xml );
            fairui.FairyUtils.setVar(this, this);
        };
        UIBaseTip.prototype.init = function (param) {
            // super.init(param);
            this.param = param;
            this.initUI();
            this.addAllListener();
            this.initData(param);
            this.onResize();
            if (this.maskClick) {
                EffectUtil.openWindowEffect(this);
            }
        };
        UIBaseTip.prototype.addAllListener = function () {
            _super.prototype.addAllListener.call(this);
            this.addGameListener(egret.TouchEvent.TOUCH_END, this.stageHandler, this, Global.stage);
        };
        UIBaseTip.prototype.removeAllListener = function () {
            _super.prototype.removeAllListener.call(this);
            this.removeGameListener(egret.TouchEvent.TOUCH_END, this.stageHandler, this, Global.stage);
        };
        UIBaseTip.prototype.stageHandler = function (e) {
            var item = this.param ? this.param["target"] : null;
            if (!this.containsGlobalPoint(e.stageX, e.stageY)) {
                if (item instanceof fairui.UIEListRenderItem) {
                    if (!item.containsGlobalPoint(e.stageX, e.stageY)) {
                        this.close();
                    }
                }
                else {
                    this.close();
                }
            }
        };
        /**关闭TIP */
        UIBaseTip.prototype.close = function () {
            var _self = this;
            UISystem.Inst.closeTipView(_self.getCls());
        };
        Object.defineProperty(UIBaseTip.prototype, "isShowMask", {
            /**是否显示遮罩 */
            get: function () {
                var showMask = this.param && this.param.hasOwnProperty("showMask") && this.param["showMask"];
                return showMask;
            },
            enumerable: true,
            configurable: true
        });
        //ui9宫格布局 自适应
        UIBaseTip.prototype.OnResize = function () {
            var showMask = this.param && this.param.hasOwnProperty("showMask") && this.param["showMask"];
            if (showMask) {
                this.x = (Global.stageWidth - this.width) * 0.5;
                this.y = (Global.stageHeight - this.height) * 0.5;
            }
            else {
                var target = this.param && this.param.hasOwnProperty("target") ? this.param["target"] : null;
                if (target) {
                    var gp = target.parent.localToGlobal(target.x, target.y);
                    this.x = gp.x + target.width;
                    this.y = gp.y - this.height * 0.5;
                    if (this.x < 0) {
                        this.x = 0;
                    }
                    else if ((this.x + this.width) > Global.stageWidth) {
                        this.x = Global.stageWidth - this.width;
                    }
                    if (this.y < 0) {
                        this.y = 0;
                    }
                    else if ((this.y + this.height) > Global.stageHeight) {
                        this.y = Global.stageHeight - this.height;
                    }
                }
            }
        };
        UIBaseTip.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
        };
        return UIBaseTip;
    }(fairui.View));
    fairui.UIBaseTip = UIBaseTip;
    __reflect(UIBaseTip.prototype, "fairui.UIBaseTip");
})(fairui || (fairui = {}));
//# sourceMappingURL=UIBaseTip.js.map