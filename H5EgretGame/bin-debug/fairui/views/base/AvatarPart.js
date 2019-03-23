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
var base;
(function (base) {
    var AvatarPart = (function (_super) {
        __extends(AvatarPart, _super);
        function AvatarPart(type) {
            var _this = _super.call(this) || this;
            _this._dir = 0;
            _this._partType = -1;
            _this._partType = type;
            return _this;
        }
        Object.defineProperty(AvatarPart.prototype, "action", {
            get: function () {
                return this._action;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AvatarPart.prototype, "dir", {
            get: function () {
                return this._dir;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AvatarPart.prototype, "partType", {
            get: function () {
                return this._partType;
            },
            set: function (value) {
                this._partType = value;
            },
            enumerable: true,
            configurable: true
        });
        AvatarPart.prototype.init = function () {
            _super.prototype.init.call(this);
        };
        AvatarPart.prototype.checkContainPoint = function () {
            return false; //(flash.As3As(this.view, yr_engine.core.display.InteractiveBitmap)).checkMousePoint();
        };
        AvatarPart.prototype.changeAnimator = function (action, dir) {
            if (this._action != action || this._dir != dir) {
                this._action = action;
                this._dir = dir;
                return true;
            }
            return false;
        };
        AvatarPart.prototype.clearActionAndDir = function () {
            this._dir = -1;
            this._action = null;
            this.resetAndClear();
        };
        AvatarPart.prototype.dispose = function () {
            this._partType = -1;
            _super.prototype.dispose.call(this);
        };
        return AvatarPart;
    }(base.FramePlayer));
    base.AvatarPart = AvatarPart;
    __reflect(AvatarPart.prototype, "base.AvatarPart");
})(base || (base = {}));
//# sourceMappingURL=AvatarPart.js.map