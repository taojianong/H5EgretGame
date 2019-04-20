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
     * 基于Fairygui组件的Avatar
     * @author cl 2018.4.24
     */
    var FairyAvatar = (function (_super) {
        __extends(FairyAvatar, _super);
        function FairyAvatar() {
            var _this = _super.call(this) || this;
            _this._lastTime = 0;
            _this._avatar = new view.fight.RoleAvatar();
            _this._avatar.aniDirType = EnumAvatarPart.FIVE_DIR;
            _this._avatar.addPart(EnumAvatarPart.BODY);
            _this.addEgretChild(_this._avatar);
            _this.opaque = true;
            _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.addToStageHandler, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.removeFromStageHandler, _this);
            return _this;
        }
        FairyAvatar.prototype.addToStageHandler = function (e) {
            this._lastTime = egret.getTimer();
            Global.timer.doFrameLoop(1, flash.bind(this.enterFrameHandler, this));
        };
        FairyAvatar.prototype.removeFromStageHandler = function (e) {
            Global.timer.clearTimer(flash.bind(this.enterFrameHandler, this));
        };
        /**
         * 改变挂件动画资源
         * @param  resId 资源名字
         * @param  resType 资源类型 1-role 2-pet 3-monster
         */
        FairyAvatar.prototype.changePartPath = function (resId, resType) {
            if (resType === void 0) { resType = 2; }
            var path;
            switch (resType) {
                case 1:
                    path = AssetPathManager.getInstance().getFightHeroPartPath(parseInt(resId), EnumAvatarPart.BODY);
                    break;
                case 2:
                    path = AssetPathManager.getInstance().getPetPartPath(resId);
                    break;
                case 3:
                    path = AssetPathManager.getInstance().getFightMonsterPartPath(resId);
                    break;
            }
            this.avatar.getPart(EnumAvatarPart.BODY).path = path;
        };
        /**
         * 改变方向
         *
         */
        FairyAvatar.prototype.changeDirAction = function (action, dir, loop, reset, startFrame) {
            if (dir === void 0) { dir = -1; }
            if (loop === void 0) { loop = true; }
            if (reset === void 0) { reset = false; }
            if (startFrame === void 0) { startFrame = 0; }
            this._avatar.dir = dir == -1 ? this._avatar.dir : dir;
            this._avatar.changeAction(action, loop, reset, startFrame);
            this._avatar.play();
        };
        Object.defineProperty(FairyAvatar.prototype, "playEndHanlder", {
            /**
             * 结束时调用
             */
            get: function () {
                return this._avatar.playEndHanlder;
            },
            set: function (value) {
                this._avatar.playEndHanlder = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FairyAvatar.prototype, "action", {
            /**动画动作 */
            get: function () {
                return this._avatar.action;
            },
            enumerable: true,
            configurable: true
        });
        FairyAvatar.prototype.enterFrameHandler = function (event) {
            var nowTime = egret.getTimer();
            var passtime = nowTime - this._lastTime;
            this.addvanceTime(passtime);
            this._lastTime = nowTime;
        };
        FairyAvatar.prototype.addvanceTime = function (passtime) {
            if (this._avatar) {
                this._avatar.addvanceTime(passtime);
            }
        };
        Object.defineProperty(FairyAvatar.prototype, "avatar", {
            /**纸娃娃*/
            get: function () {
                return this._avatar;
            },
            enumerable: true,
            configurable: true
        });
        /**停止播放 */
        FairyAvatar.prototype.stop = function () {
            this._avatar.stop();
        };
        /**清理 */
        FairyAvatar.prototype.clear = function () {
            this._avatar.clear();
        };
        FairyAvatar.prototype.dispose = function (isAll) {
            if (isAll === void 0) { isAll = true; }
            Global.timer.clearTimer(flash.bind(this.enterFrameHandler, this));
            this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.addToStageHandler, this);
            this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.removeFromStageHandler, this);
            _super.prototype.dispose.call(this);
            if (this._avatar != null) {
                this._avatar.dispose();
                this._avatar = null;
            }
            if (isAll) {
                App.asset.deleteAllResAsset();
            }
        };
        return FairyAvatar;
    }(fairui.BaseSprite));
    fairui.FairyAvatar = FairyAvatar;
    __reflect(FairyAvatar.prototype, "fairui.FairyAvatar");
})(fairui || (fairui = {}));
//# sourceMappingURL=FairyAvatar.js.map