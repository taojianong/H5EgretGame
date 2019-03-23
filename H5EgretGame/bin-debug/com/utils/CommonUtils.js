var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var com;
(function (com) {
    var utils;
    (function (utils) {
        /**
         * 公用类
         * @author cl 2018.4.27
         */
        var CommonUtils = (function () {
            function CommonUtils() {
            }
            /**
             * 获取分页页数
             * @param	arr   要分页的数组
             * @param	items 分页条目数
             * @return
             */
            CommonUtils.getPages = function (arr, items) {
                if (items === void 0) { items = 5; }
                var pages = 0;
                if (arr && arr.length > 0) {
                    pages = (arr.length % items) > 0 ? parseInt("" + (arr.length / items)) + 1 : parseInt("" + (arr.length / items));
                }
                else {
                    pages = 0;
                }
                return pages || 1;
            };
            /*************************************************
             * 按照arr的数组进行分页处理
             * arr = [0,1,2,3,4,5,6],page为当前页，items为每页的条数
             * 页数从1开始
             * @param arr   要分割的数组
             * @param page  当前页数
             * @param items 每页页数条目
             */
            CommonUtils.getPageList = function (arr, page, items) {
                if (page === void 0) { page = 1; }
                if (items === void 0) { items = 5; }
                var newArr = new Array;
                /*
                * 根据当前数组长度得到总页数
                */
                var pages = 0;
                if (arr.length > 0) {
                    pages = (arr.length % items) > 0 ? parseInt("" + (arr.length / items)) + 1 : parseInt("" + (arr.length / items));
                }
                else {
                    pages = 0;
                    return newArr;
                }
                if (page > pages) {
                    return null;
                }
                var min = (page - 1) * items;
                var max = page * items;
                if (parseInt("" + (arr.length % items)) == 0) {
                    max = page * items;
                }
                else {
                    max = page == pages ? (page - 1) * items + parseInt("" + (arr.length % items)) : page * items;
                }
                for (var i = min; i < max; i++) {
                    newArr.push(arr[i]);
                }
                return newArr;
            };
            return CommonUtils;
        }());
        utils.CommonUtils = CommonUtils;
        __reflect(CommonUtils.prototype, "com.utils.CommonUtils");
    })(utils = com.utils || (com.utils = {}));
})(com || (com = {}));
//# sourceMappingURL=CommonUtils.js.map