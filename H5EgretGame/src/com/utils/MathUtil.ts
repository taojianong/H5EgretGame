/**
 * 数学工具类
 * @author clong 2019.4.20
 */
class MathUtil {

    public static max: number = 10000;

    public constructor() {
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
    public static distance(px1: number, py1: number, px2: number, py2: number): number {

        let dx: number = px1 - px2;
        let dy: number = py1 - py2;
        return Math.sqrt(dx * dx + dy * dy);
    }

    /**
     * 两点间距离，不开平方
     * @param sx 开始X坐标
     * @param sy 开始Y坐标
     * @param tx 目标X坐标
     * @param ty 目标Y坐标
     */
    public static distanceNS(sx: number, sy: number, tx: number, ty: number): number {

        let dx: number = tx - sx;
        let dy: number = ty - sy;
        return dx * dx + dy * dy;
    }

    /** 几率*/
    public static random(jilv: number, maxJilv: number = MathUtil.max): Boolean {
        let base: number = Math.random() * maxJilv;
        return base <= jilv;
    }

    /**
     * 浮点数转换为整数
     * @param value 浮点数
     */
    public static toInt(value: number, wi: number = 1): number {

        return value - value % wi;
    }

    /**
     * 生产 min ~ max 之间的随机整数
     */
    public static makeRandom(min: number, max: number): number {
        let num: number = min + Math.random() * (max - min + 1);
        return num < max ? MathUtil.toInt(num) : max;
    }

    /**
     * 随机化数组
     * @param value 要混淆的原始数组
     * @param length 要返回混淆后对应长度的数组
     * **/
    public static randomArray(value: Array<any>, length: number = -1): Array<any> {

        value = value || [];
        if (value.length == 0) return [];
        length = length == -1 ? value.length : length;
        if (length > (value.length - 1)) {
            length = value.length - 1;
        }
        let rnd: number;
        let temp: any;
        let len: number = value.length;
        for (let i: number = 0; i < len; i++) {
            temp = value[i];
            rnd = Math.ceil(Math.random() * len);
            value[i] = value[rnd];
            value[rnd] = temp;
        }
        value = value.slice(0, length);
        return value;
    }

    /**
     * 矩形碰撞检测
     */
    public static hitRect(displayObj1: egret.DisplayObject, displayObj2: egret.DisplayObject): boolean {
        if (!displayObj1 || !displayObj2) return;
        let displayGlobal1 = displayObj1.parent.localToGlobal(displayObj1.x, displayObj1.y);
        let displayGlobal2 = displayObj2.parent.localToGlobal(displayObj2.x, displayObj2.y);
        let rect1: egret.Rectangle = new egret.Rectangle(displayGlobal1.x, displayGlobal1.y, displayObj1.width, displayObj1.height);
        let rect2: egret.Rectangle = new egret.Rectangle(displayGlobal2.x, displayGlobal2.y, displayObj2.width, displayObj2.height);
        if (rect1.x + rect1.width > rect2.x && rect2.x + rect2.width > rect1.x &&
            rect2.y + rect2.height > rect2.y && rect2.y + rect2.height > rect1.y) {
            return true;
        }
        return false;
    }
}
