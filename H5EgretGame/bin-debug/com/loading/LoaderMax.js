var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var load;
(function (load) {
    /**
     * 主加载器
     * @author clong 2019.4.26
     */
    var LoaderMax = (function (_super) {
        __extends(LoaderMax, _super);
        function LoaderMax(value) {
            if (value === void 0) { value = 5; }
            var _this = _super.call(this) || this;
            /**加载数量上限 */
            _this.loadThreadLimit = 1;
            /**加载队列 */
            _this.loadMap = new flash.Dictionary();
            /**完成事件字典 */
            _this.completeMap = new flash.Dictionary();
            //------------------------------------------
            _this.groupId = 0;
            _this.groupMap = new flash.Dictionary();
            _this.loadThreadLimit = value;
            //加载上限
            RES.setMaxLoadingThread(value);
            EventManager.addEventListener(load.LoaderEvent.COMPLETE, _this.loadResComplete, _this);
            return _this;
        }
        /**
         * 加载资源列表
         * @param urls 资源列表
         * @param handler 资源加载完成调用方法
         * @param level 加载等级
         */
        LoaderMax.prototype.loadList = function (urls, handler, level) {
            if (level === void 0) { level = 0; }
            var group = new ResGroup(this.groupId++, urls, handler, level);
            this.groupMap.setItem(group.id, group);
            var url;
            for (var i = 0; i < urls.length; i++) {
                url = urls[i];
                this.load(url, null, level);
            }
        };
        /**
         * 加载单个资源
         * @param url 加载地址
         * @param handler 加载完成Handler
         * @param level 加载等级
         */
        LoaderMax.prototype.load = function (url, handler, level) {
            if (handler === void 0) { handler = null; }
            if (level === void 0) { level = 0; }
            var data = load.LoaderCache.getData(url, false);
            if (data != null) {
                if (handler != null) {
                    handler.execute();
                }
                return;
            }
            //加载资源完成方法回调
            var map = this.completeMap.getItem(url);
            if (map == null) {
                map = new flash.Dictionary();
                this.completeMap.setItem(url, map);
            }
            map.setItem(handler, handler);
            //添加资源
            var res = load.LoaderCache.getRes(url);
            if (res != null) {
                return;
            }
            else {
                res = ObjectPool.getObject(load.Resource, url, level); //Resource将在资源回收时回收
            }
            if (res && res.resType == load.LoaderStatus.TYPE_TEXTURE) {
                var imgLoader = new load.ImageLoader();
                imgLoader.loadRes(res);
                this.addToLoadList(imgLoader);
                load.LoaderCache.put(res);
            }
        };
        LoaderMax.prototype.addToLoadList = function (loadItem) {
            this.loadMap.setItem(loadItem.url, loadItem);
        };
        /**是否在加载队列中 */
        LoaderMax.prototype.isInLoadList = function (url) {
            return this.loadMap.getItem(url) != null;
        };
        /**
         * 加载资源完成
         */
        LoaderMax.prototype.loadResComplete = function (res) {
            var _self = this;
            var url = res.url;
            //执行加载完成事件
            var map = this.completeMap.getItem(url);
            map.forEach(function (key, handler) {
                if (handler instanceof utils.Handler) {
                    handler.execute();
                }
            }, this);
            map.reset();
            this.completeMap.delItem(url);
            //判断一组资源是否加载完成
            this.groupMap.forEach(function (id, group) {
                if (group.urls.indexOf(url) != -1 && group.allLoaded) {
                    if (group.handler != null) {
                        group.handler.execute();
                    }
                    _self.groupMap.delItem(id);
                    EventManager.dispatchEvent(load.LoaderEvent.LOAD_LIST_COMPLETE, group.urls);
                    group.dispose();
                    return;
                }
            }, this);
            //从加载字典中移除
            this.loadMap.delItem(url);
        };
        LoaderMax.getInst = function () {
            return this._inst = this._inst || new LoaderMax();
        };
        return LoaderMax;
    }(egret.EventDispatcher));
    load.LoaderMax = LoaderMax;
    __reflect(LoaderMax.prototype, "load.LoaderMax");
    /**
     * 资源组
     * @author clong 2019.4.27
     */
    var ResGroup = (function () {
        function ResGroup(id, urls, handler, level) {
            this.id = 0;
            this.urls = [];
            this.handler = null;
            this.level = 0;
            this.id = id;
            this.urls = urls;
            this.handler = handler;
            this.level = level;
        }
        Object.defineProperty(ResGroup.prototype, "allLoaded", {
            /**
             * 所有资源已加载完
             */
            get: function () {
                if (this.urls) {
                    var url = void 0;
                    for (var _i = 0, _a = this.urls; _i < _a.length; _i++) {
                        url = _a[_i];
                        if (!load.LoaderCache.getData(url, false)) {
                            return false;
                        }
                    }
                }
                return true;
            },
            enumerable: true,
            configurable: true
        });
        ResGroup.prototype.dispose = function () {
            this.id = 0;
            this.urls = null;
            this.handler = null;
            this.level = 0;
        };
        return ResGroup;
    }());
    __reflect(ResGroup.prototype, "ResGroup");
})(load || (load = {}));
//# sourceMappingURL=LoaderMax.js.map