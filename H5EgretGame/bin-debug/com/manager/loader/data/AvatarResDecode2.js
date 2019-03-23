var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var com;
(function (com) {
    var loader;
    (function (loader) {
        var AvatarResDecode2 = (function () {
            function AvatarResDecode2() {
            }
            AvatarResDecode2.prototype.parser = function (resObject, url, isCache) {
                var ani = this.getAnimator();
                ani.findFromCache(JSON.parse(resObject["json"]), resObject["res"]);
                ani.isCache = isCache;
                ani.url = url;
                App.asset.setResAsset(url, ani);
                return ani;
            };
            AvatarResDecode2.prototype.getAnimator = function () {
                return new base.AysncAnimator();
            };
            return AvatarResDecode2;
        }());
        loader.AvatarResDecode2 = AvatarResDecode2;
        __reflect(AvatarResDecode2.prototype, "com.loader.AvatarResDecode2");
    })(loader = com.loader || (com.loader = {}));
})(com || (com = {}));
//# sourceMappingURL=AvatarResDecode2.js.map