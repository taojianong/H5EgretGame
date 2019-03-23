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
    var ResPathUtil = com.utils.ResPathUtil;
    var EImage = (function (_super) {
        __extends(EImage, _super);
        function EImage() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Object.defineProperty(EImage.prototype, "icon", {
            // public setup_afterAdd(xml: any): void {
            //     //App.log.debug(xml);
            //     super.setup_afterAdd(xml);
            // }
            set: function (value) {
                //这里要覆盖父类的setup_afterAdd,不然要去加载绝对路径的本地的资源文件
                App.log.debug(value);
            },
            enumerable: true,
            configurable: true
        });
        //public setup_beforeAdd(xml: any): void {
        // super.setup_beforeAdd(xml);
        EImage.prototype.setup_beforeAdd = function (buffer, beginPos) {
            _super.prototype.setup_beforeAdd.call(this, buffer, beginPos);
            if (this.data && this.data != undefined && this.data.length > 0) {
                var tmpArr = this.data.split(",");
                //this.url = ResPathUtil.getImageRes(tmpArr[0].replace("\\",""), tmpArr[1].replace("\\",""), tmpArr[2].replace("\\",""));
                this.url = ResPathUtil.getImageRes(tmpArr[0].replace(/(\\r|\\n|\\)/g, ""), tmpArr[1].replace(/(\\r|\\n|\\)/g, ""), tmpArr[2].replace(/(\\r|\\n|\\)/g, ""));
            }
        };
        Object.defineProperty(EImage.prototype, "url", {
            get: function () {
                return this._url;
            },
            set: function (value) {
                if (this._url != value && this._url) {
                    fairui.LoaderManager.disposeTarget(this._url, this);
                }
                if (this._url != value && value) {
                    fairui.LoaderManager.loadImageRes(value, this, function loadComplete(texture) {
                        var tempValue = fairui.LoaderManager.getRes(value, this);
                        this.texture = tempValue;
                        this.dispatchEvent(new egret.Event(egret.Event.COMPLETE));
                    }, null);
                }
                else if (!value) {
                    this._iconObject.texture = null;
                }
                this._url = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EImage.prototype, "texture", {
            /**
             * 设置图片纹理
             */
            get: function () {
                return this._iconObject.texture;
            },
            set: function (value) {
                this._iconObject.texture = value;
                this.width = value ? value.textureWidth : 1;
                this.height = value ? value.textureHeight : 1;
            },
            enumerable: true,
            configurable: true
        });
        EImage.prototype.dispose = function () {
            if (this._url) {
                fairui.LoaderManager.disposeTarget(this._url, this);
                this._url = null;
            }
            if (this._iconObject != null) {
                this._iconObject.dispose();
                this._iconObject = null;
            }
            _super.prototype.dispose.call(this);
        };
        return EImage;
    }(fairygui.GButton));
    fairui.EImage = EImage;
    __reflect(EImage.prototype, "fairui.EImage");
})(fairui || (fairui = {}));
//# sourceMappingURL=EImage.js.map