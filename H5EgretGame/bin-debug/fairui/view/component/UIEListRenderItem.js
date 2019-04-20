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
     * 列表渲染条目
     * @author cl 2019.1.30
     */
    var UIEListRenderItem = (function (_super) {
        __extends(UIEListRenderItem, _super);
        function UIEListRenderItem() {
            var _this = _super.call(this) || this;
            /**是否有可选中状态 */
            _this.canSelect = false;
            _this.__data = null;
            _this._select = false;
            return _this;
        }
        UIEListRenderItem.prototype.constructFromXML = function (xml) {
            _super.prototype.constructFromXML.call(this, xml);
        };
        UIEListRenderItem.prototype.initComplete = function () {
            //检测初始化是否完成
            if (!this.isInited()) {
                return false;
            }
            if (!this.isOpened) {
                this.isOpened = true;
                this.initUI();
            }
            this.initData(this.param);
            // this.AddRootListener();//此方法在show方法的时候调用
            this.isComplyed = true;
            return true;
        };
        /**
         * 是否包含全局坐标点
         * @param gx 全局X坐标
         * @param gy 全局Y坐标
         */
        UIEListRenderItem.prototype.containsGlobalPoint = function (gx, gy) {
            var lp = this.globalToLocal(gx, gy);
            var bounds = new egret.Rectangle(0, 0, this.width, this.height);
            return bounds.contains(lp.x, lp.y);
        };
        Object.defineProperty(UIEListRenderItem.prototype, "select", {
            get: function () {
                return this.canSelect ? this.currentState == "down" : false;
            },
            set: function (value) {
                if (this.canSelect) {
                    this.currentState = value ? "down" : "up";
                }
            },
            enumerable: true,
            configurable: true
        });
        UIEListRenderItem.prototype.show = function (data) {
            this.data = this._data = data;
            this.addAllListener();
        };
        UIEListRenderItem.prototype.hide = function () {
            this.clear();
        };
        /**
         * 重置
         */
        UIEListRenderItem.prototype.clear = function () {
            _super.prototype.clear.call(this);
            this.removeAllListener();
        };
        /**
         * 释放资源
         */
        UIEListRenderItem.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
        };
        return UIEListRenderItem;
    }(fairui.UIComponent));
    fairui.UIEListRenderItem = UIEListRenderItem;
    __reflect(UIEListRenderItem.prototype, "fairui.UIEListRenderItem");
})(fairui || (fairui = {}));
//# sourceMappingURL=UIEListRenderItem.js.map