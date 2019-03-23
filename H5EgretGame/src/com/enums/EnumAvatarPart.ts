/**
 * 纸娃娃部位
 * @author clong 2019.3.23
 */
class EnumAvatarPart {
	/**身体*/
	public static BODY: number = 1;
	/**主武器 , 右手武器*/
	public static WEAPON: number = 2;
	/**马*/
	public static HORSE: number = 3;
	/**马头*/
	public static HORSE_HEAD: number = 4;
	/**翅膀*/
	public static WING: number = 5;
	/**副武器， 左手武器*/
	public static SUB_WEAPON: number = 6;
	/**头盔*/
	public static HEAD: number = 7;

	/**无方向-0*/
	public static NO_DIR: number = 0;
	/**5方向-1*/
	public static FIVE_DIR: number = 1;
	/**8方向-2*/
	public static EIGHT_DIR: number = 2;

	/**上-0*/
	public static TOP: number = 0;
	/**下-4*/
	public static BOTTOM: number = 4;
	/**左-6*/
	public static LEFT: number = 6;
	/**右-2*/
	public static RIGHT: number = 2;
	/**右下-3*/
	public static RIGHTBOTTOM: number = 3;
	/**左下-5*/
	public static LEFTBOTTOM: number = 5;
	/**右上-1*/
	public static RIGHTTOP: number = 1;
	/**左上-7*/
	public static LEFTTOP: number = 7;

	/**无-1*/
	public static ACTION_TYPE_NO: string = "0";
	/**待机-1*/
	public static ACTION_TYPE_STAND: string = "1";
	/**移动-2 */
	public static ACTION_TYPE_MOVE: string = "2";
	/**冲刺-3*/
	public static ACTION_TYPE_SPRINT: string = "3";
	/**防御-4*/
	public static ACTION_TYPE_DEF: string = "4";
	/**技能攻击1-5*/
	public static ACTION_TYPE_ACTSKILL1: string = "5";
	/**普通攻击1-8*/
	public static ACTION_TYPE_ACT1: string = "8";
	/**受伤-10*/
	public static ACTION_TYPE_BEINJURED: string = "10";
	/**倒地-11*/
	public static ACTION_TYPE_DIE: string = "11";
	/**起身-15*/
	public static ACTION_TYPE_GETUP: string = "15";
	/**眩晕-16*/
	public static ACTION_TYPE_VERTIGO: string = "16";
	/**击飞-17*/
	public static ACTION_TYPE_JIFEI: string = "17";

	public static getFiveDir(disObject: any, dir: number): number {
		let newDire: number = dir;
		let scalex: number = 1;
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


	}

	private static _partNameList: string[] = [null, "body"];
	public static getPartName(partType: number): string {
		return this._partNameList[partType];
	}
}
