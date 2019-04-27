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
var load;
(function (load) {
    /**
     * 图片加载
     * @author clong 2019.4.27
     */
    var ImageLoader = (function (_super) {
        __extends(ImageLoader, _super);
        function ImageLoader() {
            return _super.call(this) || this;
        }
        ImageLoader.prototype.load = function (res) {
            _super.prototype.loadRes.call(this, res);
        };
        ImageLoader.prototype.loadDataComplete = function (data, url) {
            if (this.res.url == url) {
                this.res.data = data;
                EventManager.dispatchEvent(load.LoaderEvent.COMPLETE, this.res);
            }
        };
        return ImageLoader;
    }(load.LoaderItem));
    load.ImageLoader = ImageLoader;
    __reflect(ImageLoader.prototype, "load.ImageLoader");
})(load || (load = {}));
//# sourceMappingURL=ImageLoader.js.map