var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var load;
(function (load) {
    /**
     * 资源缓存
     * @param clong 2019.4.27
     */
    var LoaderCache = (function () {
        function LoaderCache() {
        }
        /**
         * 加入资源
         * */
        LoaderCache.put = function (res) {
            if (res) {
                LoaderCache.sourcePool.setItem(res.url, res);
                if (LoaderCache.sourcePool.keys.length > 0) {
                    Global.timer.doTimeLoop(1000, flash.bind(LoaderCache.checkAndDestroyRes, this));
                }
            }
        };
        /**
         * 获取对应URL资源
         * @param url 资源地址
         * @param isCount 是否计数，正常是要计数的，只是用于一般逻辑不计数
         * */
        LoaderCache.getData = function (url, isCount) {
            if (isCount === void 0) { isCount = true; }
            var res = LoaderCache.getRes(url);
            if (res) {
                return isCount ? res.getRes() : res.data;
            }
            return null;
        };
        LoaderCache.getRes = function (url) {
            return LoaderCache.sourcePool.getItem(url);
        };
        LoaderCache.hasRes = function (url) {
            return LoaderCache.getRes(url) != null;
        };
        /**
         * 销毁资源
         * @param url 		资源地址
         * @param isMust 	是否强制销毁
         */
        LoaderCache.destroyRes = function (url, isMust) {
            if (isMust === void 0) { isMust = false; }
            var res = LoaderCache.getRes(url);
            if (res) {
                var url_1 = res.url;
                if (isMust) {
                    res.forceDispose();
                }
                else {
                    res.dispose();
                }
            }
        };
        /**
         * 检测并销毁资源
         */
        LoaderCache.checkAndDestroyRes = function () {
            var time = egret.getTimer();
            LoaderCache.sourcePool.forEach(function a(key, data) {
                if (data instanceof load.Resource && data.lastTime > 0 && time > data.lastTime) {
                    var url = data.url;
                    if (data.isDisposed) {
                        data.recover(); //回收Resource到池中
                        LoaderCache.sourcePool.delItem(url);
                        RES.destroyRes(url);
                        EventManager.dispatchEvent(load.LoaderEvent.DISPOSE_RESOURCE, url);
                        Global.log.log(this, "-------资源管理器释放资源 url:" + url);
                        fairui.Notice.showMiddleMessage("释放资源【" + url + "】成功");
                    }
                }
            }, this);
            if (LoaderCache.sourcePool.keys.length <= 0) {
                Global.timer.clearTimer(flash.bind(LoaderCache.checkAndDestroyRes, this));
            }
        };
        /**回收间隔时间，秒 */
        LoaderCache.GC_TIME = 10;
        /**资源池**/
        LoaderCache.sourcePool = new flash.Dictionary();
        return LoaderCache;
    }());
    load.LoaderCache = LoaderCache;
    __reflect(LoaderCache.prototype, "load.LoaderCache");
})(load || (load = {}));
//# sourceMappingURL=LoaderCache.js.map