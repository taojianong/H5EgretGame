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
    var BaseGroup = (function (_super) {
        __extends(BaseGroup, _super);
        function BaseGroup(pkgName, resName) {
            var _this = _super.call(this) || this;
            _this._pkgName = pkgName;
            _this._resName = resName;
            _this.init();
            return _this;
        }
        BaseGroup.prototype.init = function () {
            var obj = fairygui.UIPackage.createObject(this._pkgName, this._resName);
            this.view = obj.asCom;
            this.addChild(this.view);
            fairui.FairyUtils.setVar(this.view, this);
        };
        return BaseGroup;
    }(fairui.BaseSprite));
    fairui.BaseGroup = BaseGroup;
    __reflect(BaseGroup.prototype, "fairui.BaseGroup");
})(fairui || (fairui = {}));
//# sourceMappingURL=BaseGroup.js.map