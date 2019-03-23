var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 纸娃娃部位
 * @author clong 2019.3.23
 */
var EnumAvatarPart = (function () {
    function EnumAvatarPart() {
    }
    EnumAvatarPart.getFiveDir = function (disObject, dir) {
        var newDire = dir;
        var scalex = 1;
        switch (dir) {
            case EnumAvatarPart.LEFTTOP:
                newDire = EnumAvatarPart.RIGHTTOP;
                scalex = -1;
                break;
            case EnumAvatarPart.LEFT:
                newDire = EnumAvatarPart.RIGHT;
                scalex = -1;
                break;
            case EnumAvatarPart.LEFTBOTTOM:
                newDire = EnumAvatarPart.RIGHTBOTTOM;
                scalex = -1;
                break;
        }
        if (disObject)
            disObject.scaleX = scalex;
        return newDire;
    };
    EnumAvatarPart.getPartName = function (partType) {
        return this._partNameList[partType];
    };
    /**身体*/
    EnumAvatarPart.BODY = 1;
    /**主武器 , 右手武器*/
    EnumAvatarPart.WEAPON = 2;
    /**马*/
    EnumAvatarPart.HORSE = 3;
    /**马头*/
    EnumAvatarPart.HORSE_HEAD = 4;
    /**翅膀*/
    EnumAvatarPart.WING = 5;
    /**副武器， 左手武器*/
    EnumAvatarPart.SUB_WEAPON = 6;
    /**头盔*/
    EnumAvatarPart.HEAD = 7;
    /**无方向-0*/
    EnumAvatarPart.NO_DIR = 0;
    /**5方向-1*/
    EnumAvatarPart.FIVE_DIR = 1;
    /**8方向-2*/
    EnumAvatarPart.EIGHT_DIR = 2;
    /**上-0*/
    EnumAvatarPart.TOP = 0;
    /**下-4*/
    EnumAvatarPart.BOTTOM = 4;
    /**左-6*/
    EnumAvatarPart.LEFT = 6;
    /**右-2*/
    EnumAvatarPart.RIGHT = 2;
    /**右下-3*/
    EnumAvatarPart.RIGHTBOTTOM = 3;
    /**左下-5*/
    EnumAvatarPart.LEFTBOTTOM = 5;
    /**右上-1*/
    EnumAvatarPart.RIGHTTOP = 1;
    /**左上-7*/
    EnumAvatarPart.LEFTTOP = 7;
    /**无-1*/
    EnumAvatarPart.ACTION_TYPE_NO = "0";
    /**待机-1*/
    EnumAvatarPart.ACTION_TYPE_STAND = "1";
    /**移动-2 */
    EnumAvatarPart.ACTION_TYPE_MOVE = "2";
    /**冲刺-3*/
    EnumAvatarPart.ACTION_TYPE_SPRINT = "3";
    /**防御-4*/
    EnumAvatarPart.ACTION_TYPE_DEF = "4";
    /**技能攻击1-5*/
    EnumAvatarPart.ACTION_TYPE_ACTSKILL1 = "5";
    /**普通攻击1-8*/
    EnumAvatarPart.ACTION_TYPE_ACT1 = "8";
    /**受伤-10*/
    EnumAvatarPart.ACTION_TYPE_BEINJURED = "10";
    /**倒地-11*/
    EnumAvatarPart.ACTION_TYPE_DIE = "11";
    /**起身-15*/
    EnumAvatarPart.ACTION_TYPE_GETUP = "15";
    /**眩晕-16*/
    EnumAvatarPart.ACTION_TYPE_VERTIGO = "16";
    /**击飞-17*/
    EnumAvatarPart.ACTION_TYPE_JIFEI = "17";
    EnumAvatarPart._partNameList = [null, "body"];
    return EnumAvatarPart;
}());
__reflect(EnumAvatarPart.prototype, "EnumAvatarPart");
//# sourceMappingURL=EnumAvatarPart.js.map