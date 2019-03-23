var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var EnumLoader = (function () {
    function EnumLoader() {
    }
    /**图片资源-0*/
    EnumLoader.IMG = 0;
    /**动画资源-1*/
    EnumLoader.RES = 1;
    /**文本资源-2*/
    EnumLoader.TXT = 2;
    /**二进制资源-3*/
    EnumLoader.BYTE = 3;
    return EnumLoader;
}());
__reflect(EnumLoader.prototype, "EnumLoader");
//# sourceMappingURL=EnumLoader.js.map