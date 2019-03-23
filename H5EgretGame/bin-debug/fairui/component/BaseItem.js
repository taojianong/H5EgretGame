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
     * 条目基类
     * @author cl 2018.3.15
     */
    var BaseItem = (function (_super) {
        __extends(BaseItem, _super);
        function BaseItem() {
            return _super.call(this) || this;
        }
        BaseItem.prototype.constructFromXML = function (xml) {
            _super.prototype.constructFromXML.call(this, xml);
            this.init();
        };
        BaseItem.prototype.init = function () {
            fairui.FairyUtils.setVar(this, this);
        };
        BaseItem.prototype.dispose = function () {
            com.utils.ObjectUtils.clearFilter(this);
            var child;
            while (this.numChildren > 0) {
                child = this.removeChildAt(0);
                //是否对应资源
                if (egret.is(child, "fairygui.GLoader")) {
                    fairui.LoaderManager.disposeTarget(child.url, child);
                }
                child.dispose();
                child = null;
            }
            _super.prototype.dispose.call(this);
            if (this.bg instanceof fairui.ELoader) {
                this.bg.dispose();
                this.bg = null;
            }
            this._data = null;
        };
        return BaseItem;
    }(fairui.BaseSprite));
    fairui.BaseItem = BaseItem;
    __reflect(BaseItem.prototype, "fairui.BaseItem");
})(fairui || (fairui = {}));
//# sourceMappingURL=BaseItem.js.map