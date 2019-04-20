var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 数学工具类
 * @author clong 2019.4.20
 */
var MathUtil = (function () {
    function MathUtil() {
    }
    /**
     *	两点间距离
    * @param px1
    * @param py1
    * @param px2
    * @param py2
    * @return
    *
    */
    MathUtil.distance = function (px1, py1, px2, py2) {
        var dx = px1 - px2;
        var dy = py1 - py2;
        return Math.sqrt(dx * dx + dy * dy);
    };
    /**
     * 两点间距离，不开平方
     * @param sx 开始X坐标
     * @param sy 开始Y坐标
     * @param tx 目标X坐标
     * @param ty 目标Y坐标
     */
    MathUtil.distanceNS = function (sx, sy, tx, ty) {
        var dx = tx - sx;
        var dy = ty - sy;
        return dx * dx + dy * dy;
    };
    /** 几率*/
    MathUtil.random = function (jilv, maxJilv) {
        if (maxJilv === void 0) { maxJilv = MathUtil.max; }
        var base = Math.random() * maxJilv;
        return base <= jilv;
    };
    /**
     * 浮点数转换为整数
     * @param value 浮点数
     */
    MathUtil.toInt = function (value, wi) {
        if (wi === void 0) { wi = 1; }
        return value - value % wi;
    };
    /**
     * 生产 min ~ max 之间的随机整数
     */
    MathUtil.makeRandom = function (min, max) {
        var num = min + Math.random() * (max - min + 1);
        return num < max ? MathUtil.toInt(num) : max;
    };
    /**
     * 随机化数组
     * @param value 要混淆的原始数组
     * @param length 要返回混淆后对应长度的数组
     * **/
    MathUtil.randomArray = function (value, length) {
        if (length === void 0) { length = -1; }
        value = value || [];
        if (value.length == 0)
            return [];
        length = length == -1 ? value.length : length;
        if (length > (value.length - 1)) {
            length = value.length - 1;
        }
        var rnd;
        var temp;
        var len = value.length;
        for (var i = 0; i < len; i++) {
            temp = value[i];
            rnd = Math.ceil(Math.random() * len);
            value[i] = value[rnd];
            value[rnd] = temp;
        }
        value = value.slice(0, length);
        return value;
    };
    /**
     * 矩形碰撞检测
     */
    MathUtil.hitRect = function (displayObj1, displayObj2) {
        if (!displayObj1 || !displayObj2)
            return;
        var displayGlobal1 = displayObj1.parent.localToGlobal(displayObj1.x, displayObj1.y);
        var displayGlobal2 = displayObj2.parent.localToGlobal(displayObj2.x, displayObj2.y);
        var rect1 = new egret.Rectangle(displayGlobal1.x, displayGlobal1.y, displayObj1.width, displayObj1.height);
        var rect2 = new egret.Rectangle(displayGlobal2.x, displayGlobal2.y, displayObj2.width, displayObj2.height);
        if (rect1.x + rect1.width > rect2.x && rect2.x + rect2.width > rect1.x &&
            rect2.y + rect2.height > rect2.y && rect2.y + rect2.height > rect1.y) {
            return true;
        }
        return false;
    };
    MathUtil.max = 10000;
    return MathUtil;
}());
__reflect(MathUtil.prototype, "MathUtil");
//# sourceMappingURL=MathUtil.js.map