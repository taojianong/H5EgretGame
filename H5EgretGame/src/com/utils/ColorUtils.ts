module com.utils {

	/**
	 * 颜色工具
	 * @author cl 2018.1.10
	 */
    export class ColorUtils {

		/**
		 * 品质颜色 [ 白色 , 绿色 , 蓝色 , 紫色 , 橙色 , 红色 ]
		 */
        public static QualityColors: Array<any> = [0xffffff, 0x00ff00, 0x00baff, 0xff00ff, 0xff9500, 0xff0000];

        /**白色**/
        public static WHITE:number = 0xffffff;

        /**绿色**/
        public static GREEN:number = 0x00ff00;

        /**文本绿 */
        public static GREEN_TEXT:number = 0x22A131;

        /**红色**/
        public static RED:number = 0xff0000;

        /**字体黄 */
        public static YELLOW_FONT:number = 0xFBC56B;

        /**橘黄 */
        public static YELLOW_ORG:number = 0xFFAD42;

        /**紫色 */
        public static PURPLE:number = 0x844BF9;

        /**橙色 */
        public static ORANGE:number = 0xFF6600;

		/**
		 * 颜色值转换,将0x格式转换为'#'格式
		 * @param value 要转换的颜色值 ,默认为RED
		 */
        public static toString(value:number = 0xff0000 ):string {
			
            return "#" + value.toFixed(16);
        }

        public static toUint(color:String):number {
			
            return parseInt(String(color).replace(/#/g, "0x"));
        }

		/**
		 * 获取对应品质颜色
		 * @param	quality	品质 0白色 , 1绿色 , 2蓝色 , 3紫色 , 4橙色 , 5红色 
		 * @return uint
		 */
        public static getColorUint(quality:number):number {
			
            return ColorUtils.QualityColors[quality] == null || quality < 0 ? 0xffffff : ColorUtils.QualityColors[quality];
        }

		/**
		 * 获取对应品质颜色
		 * @param	quality	品质
		 * @return String
		 */
        public static getColorHtml(quality:number):string {
			
            var color:number = this.getColorUint(quality);			
            return this.toString(color);
        }
    }
}