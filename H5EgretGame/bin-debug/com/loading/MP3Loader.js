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
     * 加载声音
     * @author clong 2019.4.27
     */
    var MP3Loader = (function (_super) {
        __extends(MP3Loader, _super);
        function MP3Loader() {
            return _super.call(this) || this;
        }
        return MP3Loader;
    }(load.LoaderItem));
    load.MP3Loader = MP3Loader;
    __reflect(MP3Loader.prototype, "load.MP3Loader");
})(load || (load = {}));
//# sourceMappingURL=MP3Loader.js.map