var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var load;
(function (load) {
    /**
     * 加载资源
     * @author clong 2019.4.27
     */
    var Resource = (function () {
        function Resource() {
            //------------------------------------------------------------------
            this.url = ""; //资源地址
            this.level = 0; //加载等级
            // public thisObj:any = null;//
            // public complete:Function= null;//加载资源完成事件
            this.isDisposed = false;
            this._data = null;
            /**使用计数 */
            this.useCount = 0;
            /**最后销毁时间,毫秒数 */
            this.lastTime = 0;
        }
        Resource.prototype.Resource = function (url, level) {
            if (url === void 0) { url = ""; }
            if (level === void 0) { level = 0; }
            this.create(url, level);
        };
        /**初始创建 */
        Resource.prototype.create = function (url, level) {
            if (url === void 0) { url = ""; }
            if (level === void 0) { level = 0; }
            this.url = url;
            // this.thisObj 	= thisObj;
            // this.complete 	= complete;
            this.level = level;
            this.isDisposed = false;
            this.lastTime = 0;
            this.useCount = 0;
        };
        /**回收资源 */
        Resource.prototype.recover = function () {
            ObjectPool.recoverObject(this);
        };
        /**清理资源 */
        Resource.prototype.clear = function () {
            this.url = "";
            this.level = 0;
        };
        Object.defineProperty(Resource.prototype, "data", {
            /**
             * 对应资源的数据
             */
            get: function () {
                return this._data;
            },
            set: function (value) {
                this._data = value;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 通过此方法获取可计数
         */
        Resource.prototype.getRes = function () {
            this.useCount++;
            if (this.useCount > 0 && this.isDisposed) {
                this.isDisposed = false;
            }
            return this._data;
        };
        Object.defineProperty(Resource.prototype, "hasCache", {
            /**
             * 是否已缓存
             * @return
             */
            get: function () {
                return this.data != null;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Resource.prototype, "isXML", {
            get: function () {
                return this.extension.toLowerCase() == "xml";
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Resource.prototype, "isJPG", {
            get: function () {
                return this.extension.toLowerCase() == "jpg";
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Resource.prototype, "isPNG", {
            get: function () {
                return this.extension.toLowerCase() == "png";
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Resource.prototype, "isMP3", {
            get: function () {
                return this.extension.toLowerCase() == "mp3";
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Resource.prototype, "isTXT", {
            get: function () {
                return this.extension.toLowerCase() == "txt";
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Resource.prototype, "isJOSN", {
            get: function () {
                return this.extension.toLowerCase() == "json";
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Resource.prototype, "isTFF", {
            /**字体 */
            get: function () {
                return this.extension.toLowerCase() == "tff";
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Resource.prototype, "extension", {
            /**
             * 文件后缀名
             */
            get: function () {
                if (!this.url) {
                    return "";
                }
                //切掉路径后面的参数
                var searchString = this.url.indexOf("?") > -1 ? this.url.substring(0, this.url.indexOf("?")) : this.url;
                //截取后缀
                var finalPart = searchString.substring(searchString.lastIndexOf("/"));
                return finalPart.substring(finalPart.lastIndexOf(".") + 1).toLowerCase();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Resource.prototype, "resType", {
            /**
             * 资源类型
             */
            get: function () {
                if (this.isJPG || this.isPNG) {
                    return load.LoaderStatus.TYPE_TEXTURE;
                }
                else if (this.isJOSN || this.isTXT) {
                    return load.LoaderStatus.TYPE_TEXT;
                }
                else if (this.isTFF) {
                    return load.LoaderStatus.TYPE_FONT;
                }
                else if (this.isMP3) {
                    return load.LoaderStatus.TYPE_SOUND;
                }
                return load.LoaderStatus.TYPE_BINARY; //二进制
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 强制销毁
         */
        Resource.prototype.forceDispose = function () {
            this.useCount = 0;
            this.dispose();
        };
        Resource.prototype.dispose = function () {
            if (!this.isDisposed) {
                this.useCount--;
                if (this.useCount <= 0) {
                    this.isDisposed = true;
                    this.lastTime = egret.getTimer() + load.LoaderCache.GC_TIME * 1000;
                }
            }
            else {
                this.clear();
                this.lastTime = 0;
                this.useCount = 0;
            }
        };
        return Resource;
    }());
    load.Resource = Resource;
    __reflect(Resource.prototype, "load.Resource", ["IPool", "IDispose"]);
})(load || (load = {}));
//# sourceMappingURL=Resource.js.map