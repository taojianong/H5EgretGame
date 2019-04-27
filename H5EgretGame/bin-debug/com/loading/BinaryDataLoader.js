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
     * 二进制资源加载器
     * @author clong 2019.4.27
     */
    var BinaryDataLoader = (function (_super) {
        __extends(BinaryDataLoader, _super);
        function BinaryDataLoader() {
            return _super.call(this) || this;
        }
        return BinaryDataLoader;
    }(load.LoaderItem));
    load.BinaryDataLoader = BinaryDataLoader;
    __reflect(BinaryDataLoader.prototype, "load.BinaryDataLoader");
})(load || (load = {}));
//# sourceMappingURL=BinaryDataLoader.js.map