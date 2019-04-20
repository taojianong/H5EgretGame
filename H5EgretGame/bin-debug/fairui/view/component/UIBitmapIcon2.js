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
     * 通用icon资源加载,可资源缩放的
     * @author clong 2019.3.18
     */
    var UIBitmapIcon2 = (function (_super) {
        __extends(UIBitmapIcon2, _super);
        function UIBitmapIcon2() {
            var _this = _super.call(this) || this;
            _this.touchable = false;
            return _this;
        }
        /**
         * 加载图片
         * @param url 			图片地址
         * @param callback 		加载完成调用方法
         * @param thisObject
         */
        UIBitmapIcon2.prototype.loadImage = function (url, callback, thisObject) {
            if (callback === void 0) { callback = null; }
            if (thisObject === void 0) { thisObject = null; }
            _super.prototype.loadImage.call(this, url, callback, thisObject);
        };
        Object.defineProperty(UIBitmapIcon2.prototype, "texture", {
            /**
             * 设置图片纹理
             */
            get: function () {
                return this._iconObject.texture;
            },
            set: function (value) {
                if (this._iconObject) {
                    this._iconObject.texture = value;
                }
            },
            enumerable: true,
            configurable: true
        });
        UIBitmapIcon2.prototype.dispose = function () {
            this.dispose();
        };
        return UIBitmapIcon2;
    }(fairui.UIBitmapIcon));
    fairui.UIBitmapIcon2 = UIBitmapIcon2;
    __reflect(UIBitmapIcon2.prototype, "fairui.UIBitmapIcon2");
})(fairui || (fairui = {}));
//# sourceMappingURL=UIBitmapIcon2.js.map