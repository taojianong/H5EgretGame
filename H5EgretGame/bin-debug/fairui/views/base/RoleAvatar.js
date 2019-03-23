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
var view;
(function (view) {
    var fight;
    (function (fight) {
        /**
         * 角色avatar,默认显示黑影
         * @author clong 2019.3.23
         */
        var RoleAvatar = (function (_super) {
            __extends(RoleAvatar, _super);
            function RoleAvatar() {
                return _super.call(this) || this;
            }
            Object.defineProperty(RoleAvatar.prototype, "camps", {
                set: function (value) {
                    this._camps = value;
                    this._waitAvatar.texture = RES.getRes("heiying_png");
                    this._waitAvatar.x = -this._waitAvatar.measuredWidth * 0.5;
                    this._waitAvatar.y = -this._waitAvatar.measuredHeight;
                },
                enumerable: true,
                configurable: true
            });
            RoleAvatar.prototype.init = function () {
                _super.prototype.init.call(this);
                this.makeWaitAvatar();
            };
            RoleAvatar.prototype.onAddToStage = function (event) {
                _super.prototype.onAddToStage.call(this, event);
                if (this._waitAvatar && !this._waitAvatar.parent)
                    this.addChild(this._waitAvatar);
            };
            RoleAvatar.prototype.dispose = function (type) {
                _super.prototype.dispose.call(this, type);
            };
            return RoleAvatar;
        }(base.Avatar));
        fight.RoleAvatar = RoleAvatar;
        __reflect(RoleAvatar.prototype, "view.fight.RoleAvatar");
    })(fight = view.fight || (view.fight = {}));
})(view || (view = {}));
//# sourceMappingURL=RoleAvatar.js.map