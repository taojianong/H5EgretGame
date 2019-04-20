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
    var Animator = base.Animator;
    var NetEffect = (function (_super) {
        __extends(NetEffect, _super);
        function NetEffect() {
            var _this = _super.call(this) || this;
            _this._url = "NetEffect";
            _this._isLoading = false;
            _this._resourceID = 0;
            return _this;
        }
        Object.defineProperty(NetEffect.prototype, "extendData", {
            get: function () {
                return this._extendData;
            },
            set: function (value) {
                this._extendData = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NetEffect.prototype, "resourceID", {
            get: function () {
                return this._resourceID;
            },
            set: function (value) {
                this._resourceID = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NetEffect.prototype, "ownerid", {
            get: function () {
                return this._ownerid;
            },
            set: function (value) {
                this._ownerid = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NetEffect.prototype, "url", {
            get: function () {
                return this._url;
            },
            set: function (value) {
                if (this._url != value) {
                    this.clear();
                    this._url = (value == null ? "NetEffect" : value);
                    if (value && value != "" && flash.As3is(value, "string"))
                        this.netLoad();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NetEffect.prototype, "resType", {
            get: function () {
                return EnumLoader.RES;
            },
            enumerable: true,
            configurable: true
        });
        // public set resType(value: number) {
        // }
        NetEffect.prototype.clear = function () {
            this.unNetLoad();
            //this._data = null;
        };
        Object.defineProperty(NetEffect.prototype, "data", {
            get: function () {
                return this._vo;
            },
            set: function (value) {
                this._vo = value;
            },
            enumerable: true,
            configurable: true
        });
        NetEffect.prototype.netLoad = function () {
            if (this._isLoading == false) {
                if (this._url != "NetEffect" && this._url != null) {
                    this._isLoading = true;
                    fairui.NetResourceManager.getInstance().getResource(this);
                }
                else {
                    Global.log.error("加载路径有问题"); //NetEffect >> 加载路径有问题
                }
            }
        };
        NetEffect.prototype.unNetLoad = function () {
            this._isLoading = false;
            fairui.NetResourceManager.getInstance().delResource(this);
        };
        Object.defineProperty(NetEffect.prototype, "isLoading", {
            get: function () {
                return this._isLoading;
            },
            enumerable: true,
            configurable: true
        });
        NetEffect.prototype.netComplete = function (value) {
            if (value instanceof Animator) {
                //this._data = value;
                this._isLoading = false;
                this.addAnimatior(value); //flash.As3As(value, Animator)
            }
        };
        NetEffect.prototype.netProgress = function (value) {
            if (this._netHandler)
                this._netHandler.netProgress();
        };
        NetEffect.prototype.netError = function (value) {
            if (this._netHandler)
                this._netHandler.netError();
        };
        Object.defineProperty(NetEffect.prototype, "netHandler", {
            get: function () {
                if (this._netHandler == null)
                    this._netHandler = new fairui.NetHandler();
                return this._netHandler;
            },
            enumerable: true,
            configurable: true
        });
        NetEffect.prototype.resetAndClear = function () {
            this._vo = null;
            if (this._netHandler)
                this._netHandler.clear();
            this.clear();
            this._url = "NetEffect";
            _super.prototype.resetAndClear.call(this);
        };
        NetEffect.prototype.dispose = function () {
            //yr_engine.core.utils.debug.stack.$_FunctionStackLog.intoStack("yr_engine.compoments.netcomps::NetEffect /dispose()");
            this._vo = null;
            this.clear();
            if (this._netHandler) {
                com.loader.GLoaderManager.getInstance().unLoad(this._url, this, this._netHandler.netComplete);
                this._netHandler.dispose();
            }
            this._netHandler = null;
            _super.prototype.dispose.call(this);
        };
        return NetEffect;
    }(fairui.Effect));
    fairui.NetEffect = NetEffect;
    __reflect(NetEffect.prototype, "fairui.NetEffect", ["com.interfaces.INetResourceElement", "IDispose"]);
})(fairui || (fairui = {}));
// flash.extendsClass("yr_engine.compoments.netcomps.NetEffect", "yr_engine.scene.effect.Effect")
// flash.implementsClass("yr_engine.compoments.netcomps.NetEffect", ["INetResourceElement"]); 
//# sourceMappingURL=NetEffect.js.map