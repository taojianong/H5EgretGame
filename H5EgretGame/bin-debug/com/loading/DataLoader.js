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
     * 文本数据加载
     * @author clong 2019.4.27
     */
    var DataLoader = (function (_super) {
        __extends(DataLoader, _super);
        function DataLoader() {
            return _super.call(this) || this;
        }
        return DataLoader;
    }(load.LoaderItem));
    load.DataLoader = DataLoader;
    __reflect(DataLoader.prototype, "load.DataLoader");
})(load || (load = {}));
//# sourceMappingURL=DataLoader.js.map