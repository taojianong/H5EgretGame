var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var fairui;
(function (fairui) {
    var ResPathUtil = com.utils.ResPathUtil;
    var NetResource = (function () {
        function NetResource() {
            this.type = 0;
            this._resource = null;
            this._isLoading = false;
            this._delayDisposeTime = 0;
            this._isDispose = false;
            this._isCache = true;
            this._hash = new flash.Dictionary();
        }
        Object.defineProperty(NetResource.prototype, "isCache", {
            get: function () {
                return this._isCache;
            },
            set: function (value) {
                this._isCache = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NetResource.prototype, "delayDisposeTime", {
            get: function () {
                return this._delayDisposeTime;
            },
            set: function (value) {
                this._delayDisposeTime = value;
            },
            enumerable: true,
            configurable: true
        });
        NetResource.prototype.addRequest = function (element) {
            if (this._hash) {
                this._hash.setItem(element, element);
            }
        };
        NetResource.prototype.deleteRequest = function (element) {
            if (this._hash) {
                this._hash.delItem(element);
            }
        };
        Object.defineProperty(NetResource.prototype, "requestLength", {
            get: function () {
                if (this._hash) {
                    return this._hash.length;
                }
                return 0;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NetResource.prototype, "url", {
            get: function () {
                return this._url;
            },
            set: function (value) {
                this._url = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NetResource.prototype, "resType", {
            get: function () {
                var ext = ResPathUtil.getFileExtension(this._url);
                if (ext == "xll") {
                    return EnumLoader.RES;
                }
                else if (ext == "jpg" || ext == "png" || ext == "jepg") {
                    return EnumLoader.IMG;
                }
                else if (ext == "json" || ext == "txt") {
                    return EnumLoader.TXT;
                }
                else {
                    return EnumLoader.RES;
                }
                // return this.type;
            },
            set: function (value) {
            },
            enumerable: true,
            configurable: true
        });
        NetResource.prototype.netComplete = function (res) {
            this.data = res;
            this.unNetLoad();
        };
        NetResource.prototype.netProgress = function (value) {
            this._hash.forEach(function (key, data, _value) {
                data.netProgress(_value);
            }, this, value);
        };
        NetResource.prototype.netError = function (value) {
            this._hash.forEach(function (key, data, _value) {
                data.netError(_value);
            }, this, value);
        };
        Object.defineProperty(NetResource.prototype, "data", {
            get: function () {
                return this._resource;
            },
            set: function (value) {
                this._resource = value;
                if (this._hash != null) {
                    this._hash.forEach(function (key, data) {
                        data.netComplete(this._resource);
                    }, this);
                }
            },
            enumerable: true,
            configurable: true
        });
        NetResource.prototype.netLoad = function () {
            this._isLoading = true;
        };
        NetResource.prototype.unNetLoad = function () {
            this._isLoading = false;
        };
        NetResource.prototype.clear = function () {
            this.unNetLoad();
        };
        Object.defineProperty(NetResource.prototype, "isLoading", {
            get: function () {
                return this._isLoading;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NetResource.prototype, "isDisposed", {
            get: function () {
                return this._isDispose;
            },
            enumerable: true,
            configurable: true
        });
        NetResource.prototype.dispose = function () {
            this.unNetLoad();
            // if (flash.As3is(this._resource, egret.Bitmap)) {
            // 	(<egret.Bitmap>(this._resource)).texture.dispose();
            // }
            // else if (flash.As3is(this._resource, null, "isDispose")) {
            // 	(<IDispose>(this._resource)).dispose();
            // }
            // else if (flash.As3is(this._resource, egret.ByteArray)) {
            // 	(<egret.ByteArray>(this._resource)).clear();
            // }
            // else if (flash.As3is(this._resource, egret.Texture)) {
            // 	(<egret.Texture>(this._resource)).dispose();
            // }
            // else if (flash.As3is(this._resource, egret.DisplayObject)) {
            // 	if (this._resource.loaderInfo.loader) {
            // 		this._resource.loaderInfo.loader.unloadAndStop(false);
            // 	}
            // }
            if (egret.is(this._resource, "AysncAnimator")) {
                App.asset.deleteResAsset(this.url);
            }
            if (this._hash)
                this._hash.reset();
            this._hash = null;
            this._resource = null;
            this._delayDisposeTime = 0;
            this._isDispose = true;
            this._isCache = true;
        };
        return NetResource;
    }());
    fairui.NetResource = NetResource;
    __reflect(NetResource.prototype, "fairui.NetResource", ["com.interfaces.INetResourceElement", "IDispose"]);
})(fairui || (fairui = {}));
//# sourceMappingURL=NetResource.js.map