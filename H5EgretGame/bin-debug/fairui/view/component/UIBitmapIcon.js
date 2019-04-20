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
     * 通用icon资源加载,不可自由缩放
     * @author clong 2019.2.20
     */
    var UIBitmapIcon = (function (_super) {
        __extends(UIBitmapIcon, _super);
        function UIBitmapIcon() {
            var _this = _super.call(this) || this;
            _this.touchable = false;
            return _this;
        }
        UIBitmapIcon.prototype.constructExtension = function (buffer) {
            _super.prototype.constructExtension.call(this, buffer);
        };
        UIBitmapIcon.prototype.setup_afterAdd = function (buffer, beginPos) {
            _super.prototype.setup_afterAdd.call(this, buffer, beginPos);
        };
        Object.defineProperty(UIBitmapIcon.prototype, "source", {
            get: function () {
                return this._source;
            },
            set: function (value) {
                this._source = value;
                if (value instanceof egret.Texture) {
                    this.texture = value;
                }
                else {
                    this.url = value;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UIBitmapIcon.prototype, "url", {
            get: function () {
                return this._iconUrl;
            },
            set: function (value) {
                if (value && value.indexOf("ui://") == 0) {
                    this.icon = value;
                    return;
                }
                if (this._iconUrl != value && value) {
                    fairui.LoaderManager.loadImageRes(this._iconUrl, this, function loadComplete(texture) {
                        this.texture = texture;
                        this.dispatchEvent(new egret.Event(egret.Event.COMPLETE));
                    });
                }
                else if (!value) {
                    this._iconObject.texture = null;
                }
                this._iconUrl = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UIBitmapIcon.prototype, "texture", {
            /**
             * 设置图片纹理
             */
            get: function () {
                return this._iconObject.texture;
            },
            set: function (value) {
                if (this._iconObject) {
                    this._iconObject.texture = value;
                    this.width = value ? value.textureWidth : 1;
                    this.height = value ? value.textureHeight : 1;
                }
            },
            enumerable: true,
            configurable: true
        });
        UIBitmapIcon.prototype.setIcon = function (url, callback, thisObject) {
            if (callback === void 0) { callback = null; }
            if (thisObject === void 0) { thisObject = null; }
            if (!url) {
                if (callback != null && thisObject != null) {
                    callback.call(thisObject);
                }
                this.clear();
            }
            else if (url && url.indexOf("ui://") == 0) {
                this.icon = url;
                if (callback != null && thisObject != null) {
                    callback.call(thisObject);
                }
            }
            else if (url.indexOf("/") < 0) {
                this.texture = RES.getRes(url);
            }
            else {
                this.loadImage(url, callback, thisObject);
            }
            this._iconUrl = url;
        };
        /**
         * 加载图片
         * @param url 			图片地址
         * @param callback 		加载完成调用方法
         * @param thisObject
         */
        UIBitmapIcon.prototype.loadImage = function (url, callback, thisObject) {
            if (callback === void 0) { callback = null; }
            if (thisObject === void 0) { thisObject = null; }
            var sel = this;
            if (sel._iconUrl == url)
                return;
            sel.clear();
            sel._iconUrl = url;
            if (url != null) {
                fairui.LoaderManager.loadImageRes(this._iconUrl, this, onComplete);
            }
            function onComplete(value, param) {
                if (value && url == param) {
                    sel.texture = value;
                    if (callback != null && thisObject != null) {
                        callback.call(thisObject);
                    }
                }
            }
        };
        UIBitmapIcon.prototype.LoadRes = function (resName, atlas, callback, thisObject) {
            if (callback === void 0) { callback = null; }
            if (thisObject === void 0) { thisObject = null; }
            var sel = this;
            if (sel._iconUrl == resName)
                return;
            sel.dispose();
            sel._iconUrl = resName;
            if (atlas != null) {
                fairui.LoaderManager.loadGroups(atlas, onComplete);
            }
            function onComplete() {
                sel.texture = RES.getRes(resName);
                if (callback != null && thisObject != null) {
                    callback.call(thisObject);
                }
            }
        };
        UIBitmapIcon.prototype.hasUrl = function (url) {
            return this._iconUrl == url;
        };
        UIBitmapIcon.prototype.show = function (data) {
            _super.prototype.show.call(this, data);
            this.loadImage(data);
        };
        UIBitmapIcon.prototype.hide = function () {
            _super.prototype.hide.call(this);
            this.clear();
        };
        UIBitmapIcon.prototype.clear = function () {
            this.texture = null;
            this._iconUrl = null;
            this._source = null;
        };
        UIBitmapIcon.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
            this._iconUrl = null;
        };
        return UIBitmapIcon;
    }(fairui.BaseButton));
    fairui.UIBitmapIcon = UIBitmapIcon;
    __reflect(UIBitmapIcon.prototype, "fairui.UIBitmapIcon");
})(fairui || (fairui = {}));
//# sourceMappingURL=UIBitmapIcon.js.map