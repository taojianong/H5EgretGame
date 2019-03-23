var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * Created by chenpeng on 2015/10/21.
 */
var flash;
(function (flash) {
    var uint = (function () {
        function uint() {
        }
        /**
         *[静态] 可表示的最大 32 位无符号整数为 4,294,967,295。
         * @type {number}
         */
        uint.MAX_VALUE = 4294967295;
        /**
         *[静态] 可表示的最小无符号整数为 0。
         * @type {number}
         */
        uint.MIN_VALUE = 0;
        return uint;
    }());
    flash.uint = uint;
    __reflect(uint.prototype, "flash.uint");
})(flash || (flash = {}));
//# sourceMappingURL=uint.js.map