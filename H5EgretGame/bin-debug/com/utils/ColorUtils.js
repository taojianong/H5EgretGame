var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var com;
(function (com) {
    var utils;
    (function (utils) {
        /**
         * 颜色工具
         * @author cl 2018.1.10
         */
        var ColorUtils = (function () {
            function ColorUtils() {
            }
            /**
             * 颜色值转换,将0x格式转换为'#'格式
             * @param value 要转换的颜色值 ,默认为RED
             */
            ColorUtils.toString = function (value) {
                if (value === void 0) { value = 0xff0000; }
                return "#" + value.toFixed(16);
            };
            ColorUtils.toUint = function (color) {
                return parseInt(String(color).replace(/#/g, "0x"));
            };
            /**
             * 获取对应品质颜色
             * @param	quality	品质 0白色 , 1绿色 , 2蓝色 , 3紫色 , 4橙色 , 5红色
             * @return uint
             */
            ColorUtils.getColorUint = function (quality) {
                return ColorUtils.QualityColors[quality] == null || quality < 0 ? 0xffffff : ColorUtils.QualityColors[quality];
            };
            /**
             * 获取对应品质颜色
             * @param	quality	品质
             * @return String
             */
            ColorUtils.getColorHtml = function (quality) {
                var color = this.getColorUint(quality);
                return this.toString(color);
            };
            /**
             * 品质颜色 [ 白色 , 绿色 , 蓝色 , 紫色 , 橙色 , 红色 ]
             */
            ColorUtils.QualityColors = [0xffffff, 0x00ff00, 0x00baff, 0xff00ff, 0xff9500, 0xff0000];
            /**白色**/
            ColorUtils.WHITE = 0xffffff;
            /**绿色**/
            ColorUtils.GREEN = 0x00ff00;
            /**文本绿 */
            ColorUtils.GREEN_TEXT = 0x22A131;
            /**红色**/
            ColorUtils.RED = 0xff0000;
            /**字体黄 */
            ColorUtils.YELLOW_FONT = 0xFBC56B;
            /**橘黄 */
            ColorUtils.YELLOW_ORG = 0xFFAD42;
            /**紫色 */
            ColorUtils.PURPLE = 0x844BF9;
            /**橙色 */
            ColorUtils.ORANGE = 0xFF6600;
            return ColorUtils;
        }());
        utils.ColorUtils = ColorUtils;
        __reflect(ColorUtils.prototype, "com.utils.ColorUtils");
    })(utils = com.utils || (com.utils = {}));
})(com || (com = {}));
//# sourceMappingURL=ColorUtils.js.map