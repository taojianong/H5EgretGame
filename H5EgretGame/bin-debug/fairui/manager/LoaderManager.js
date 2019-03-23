var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var fairui;
(function (fairui) {
    /**
     * 外部资源管理器 cl 2018.3.12
     */
    var LoaderManager = (function () {
        function LoaderManager() {
        }
        /**
         * 加载外部图片资源
         * @param url 资源地址
         * @param callback 回调方法
         * @param callbackParams 回调方法参数
         */
        LoaderManager.loadImageRes = function (url, thisObj, callback, callbackParams) {
            if (thisObj === void 0) { thisObj = null; }
            if (callback === void 0) { callback = null; }
            if (callbackParams === void 0) { callbackParams = null; }
            thisObj = thisObj || this;
            var _this = this;
            var texture = this.getRes(url);
            if (texture != null) {
                if (callback != null) {
                    callbackParams = callbackParams || [];
                    callbackParams.unshift(texture);
                    callback.apply(thisObj, callbackParams);
                }
            }
            else {
                RES.getResByUrl(url, function loadJobImg(texture, index) {
                    if (callback != null) {
                        _this.sourceMap.setItem(url, texture);
                        callbackParams = callbackParams || [];
                        callbackParams.unshift(texture);
                        callback.apply(thisObj, callbackParams);
                    }
                }, thisObj, RES.ResourceItem.TYPE_IMAGE);
            }
        };
        /**
         * 获取资源
         * @param url 资源地址
         * @param target 引用对象
         */
        LoaderManager.getRes = function (url, target) {
            if (target === void 0) { target = null; }
            var res = this.sourceMap.getItem(url);
            if (res != null) {
                var arr = this.targetMap.getItem(url);
                if (arr == null) {
                    arr = new Array();
                    this.targetMap.setItem(url, arr);
                }
                if (arr.indexOf(target) == -1) {
                    arr.push(target);
                }
            }
            return res;
        };
        /**
         * 释放对应引用对象
         * @param url    地址
         * @param target url使用对象
         * @param isMust 是否强制释放
         */
        LoaderManager.disposeTarget = function (url, target, isMust) {
            if (isMust === void 0) { isMust = false; }
            var arr = this.targetMap.getItem(url);
            if (arr && arr.length > 0) {
                var index = arr.indexOf(target);
                if (index != -1) {
                    arr.splice(index, 1);
                }
            }
            if (arr == null || arr.length <= 0 || isMust) {
                this.targetMap.delItem(url);
                this.disposeRes(url);
                arr = null;
            }
        };
        /**
         * 释放资源
         */
        LoaderManager.disposeRes = function (url) {
            var texture = this.getRes(url);
            if (texture != null) {
                this.sourceMap.delItem(url);
                texture.dispose();
                texture = null;
                //清除缓存
                // delete RES.config.config.alias[ url ];
                // delete (<any>RES.fileSystem).fsData[url];
                // delete RES.host.state["resource/"+url];
                // delete RES.host.state[url];
                RES.destroyRes(url);
            }
        };
        /**
         * 是否所有资源组都加载完毕了
         * @param groups 资源组 如：login,main
         */
        LoaderManager.hasLoadAllGroups = function (groups) {
            var arr = groups.split(",");
            var group = "";
            for (var _i = 0, arr_1 = arr; _i < arr_1.length; _i++) {
                group = arr_1[_i];
                if (group && !RES.isGroupLoaded(group)) {
                    return false;
                }
            }
            return true;
        };
        /**
         * 加载多个组资源
         * @param groups 资源组 如：login,main
         * @param loadComplete 加载完成方法
         * @param params 加载完成方法参数
         * @param reporte 加载进度
         * @param thisObj
         */
        LoaderManager.loadGroups = function (groups, loadComplete, params, reporte, thisObj) {
            if (loadComplete === void 0) { loadComplete = null; }
            if (params === void 0) { params = null; }
            if (reporte === void 0) { reporte = null; }
            if (thisObj === void 0) { thisObj = null; }
            var arr = groups.split(",");
            loadNext();
            function loadGroup(group) {
                RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, function loadComplete(event) {
                    if (event.groupName == group) {
                        loadNext();
                    }
                }, this);
                RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, function loadComplete(event) {
                    if (event.groupName == group) {
                        loadNext();
                    }
                }, this);
                RES.loadGroup(group, 0, reporte);
            }
            //加载下一个
            function loadNext() {
                if (arr.length <= 0) {
                    loadComplete.apply(thisObj, params);
                }
                else {
                    var group = arr.shift();
                    if (!RES.isGroupLoaded(group)) {
                        loadGroup(group); //加载下一个
                    }
                    else {
                        loadNext();
                    }
                }
            }
        };
        /**
         * 资源池
         */
        LoaderManager.sourceMap = new flash.Dictionary();
        /**
         * 引用对象池 {url:[target]}
         */
        LoaderManager.targetMap = new flash.Dictionary();
        return LoaderManager;
    }());
    fairui.LoaderManager = LoaderManager;
    __reflect(LoaderManager.prototype, "fairui.LoaderManager");
})(fairui || (fairui = {}));
//# sourceMappingURL=LoaderManager.js.map