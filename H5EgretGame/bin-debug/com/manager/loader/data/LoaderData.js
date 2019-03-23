var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var com;
(function (com) {
    var loader;
    (function (loader) {
        var LoaderData = (function () {
            function LoaderData() {
            }
            LoaderData.prototype.dispose = function (type) {
                var _self = this;
                _self.type = null;
                _self.url = null;
                _self.complete = null;
                _self.progress = null;
                _self.error = null;
                _self.isCache = null;
                _self.thisObject = null;
                _self.argArray = null;
                _self.data = null;
            };
            return LoaderData;
        }());
        loader.LoaderData = LoaderData;
        __reflect(LoaderData.prototype, "com.loader.LoaderData");
    })(loader = com.loader || (com.loader = {}));
})(com || (com = {}));
//# sourceMappingURL=LoaderData.js.map