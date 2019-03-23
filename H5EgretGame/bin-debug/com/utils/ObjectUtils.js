var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var com;
(function (com) {
    var utils;
    (function (utils) {
        var ObjectUtils = (function () {
            function ObjectUtils() {
            }
            /**
             * 添加滤镜
             * @param targe
             * @param filter 如egret.ColorMatrixFilter
            */
            ObjectUtils.addFilter = function (target, filter) {
                var filters = target.filters || [];
                filters.push(filter);
                target.filters = filters;
            };
            /**让显示对象变成灰色*/
            ObjectUtils.gray = function (traget, isGray) {
                if (isGray === void 0) { isGray = true; }
                if (isGray) {
                    this.addFilter(traget, this.grayFilter);
                }
                else {
                    this.clearFilter(traget, egret.ColorMatrixFilter);
                }
            };
            /**清除滤镜*/
            ObjectUtils.clearFilter = function (target, filterType) {
                if (filterType === void 0) { filterType = null; }
                var filters = target.filters;
                if (filters != null && filters.length > 0) {
                    for (var i = filters.length - 1; i > -1; i--) {
                        var filter = filters[i];
                        if (filterType == null || filter instanceof filterType) {
                            filters.splice(i, 1);
                        }
                    }
                    target.filters = filters;
                }
            };
            /**灰色滤镜 */
            //private static grayFilter:egret.ColorMatrixFilter = new egret.ColorMatrixFilter([0.3086, 0.6094, 0.082, 0, 0, 0.3086, 0.6094, 0.082, 0, 0, 0.3086, 0.6094, 0.082, 0, 0, 0, 0, 0, 1, 0]);
            ObjectUtils.grayFilter = new egret.ColorMatrixFilter([
                0.3, 0.6, 0, 0, 0,
                0.3, 0.6, 0, 0, 0,
                0.3, 0.6, 0, 0, 0,
                0, 0, 0, 1, 0
            ]);
            return ObjectUtils;
        }());
        utils.ObjectUtils = ObjectUtils;
        __reflect(ObjectUtils.prototype, "com.utils.ObjectUtils");
    })(utils = com.utils || (com.utils = {}));
})(com || (com = {}));
//# sourceMappingURL=ObjectUtils.js.map