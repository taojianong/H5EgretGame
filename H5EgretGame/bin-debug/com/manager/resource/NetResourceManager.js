var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var fairui;
(function (fairui) {
    var NetResourceManager = (function () {
        function NetResourceManager() {
            this.init();
        }
        NetResourceManager.getInstance = function () {
            return this.resoureCenter = this.resoureCenter || new NetResourceManager();
        };
        Object.defineProperty(NetResourceManager.prototype, "resoureCenter", {
            set: function (value) {
                NetResourceManager.resoureCenter = value;
            },
            enumerable: true,
            configurable: true
        });
        NetResourceManager.prototype.init = function () {
            this._resourceTypeDict = new flash.Dictionary();
            this._resourceHash = new flash.Dictionary();
            this._delayDisposeHash = new flash.Dictionary();
        };
        NetResourceManager.prototype.getResourceLength = function () {
            return this._resourceHash.length;
        };
        NetResourceManager.prototype.getDelayResourceLength = function () {
            return this._delayDisposeHash.length;
        };
        NetResourceManager.prototype.getResource = function (request) {
            var resource = this._resourceHash.getItem(request.url);
            if (resource && this._delayDisposeHash.hasOwnProperty(resource)) {
                resource.delayDisposeTime = 0;
                this._delayDisposeHash.delItem(resource);
            }
            if (resource == null || resource.isDispose) {
                resource = this.makeResource(request.resType);
                resource.type = request.resType;
                resource.url = request.url;
                resource.isCache = request.isCache;
                this._resourceHash.setItem(request.url, resource);
            }
            resource.addRequest(request);
            if (resource.data) {
                request.netComplete(resource.data);
            }
            else if (resource.isLoading == false) {
                resource.netLoad();
                this.loadResource(resource);
            }
        };
        NetResourceManager.prototype.delErrorResource = function (request) {
            var resource = this._resourceHash.getItem(request.url);
            if (resource) {
                if (resource.isLoading) {
                    this.stopLoadResource(resource);
                    resource.unNetLoad();
                }
                this.disposeResource(resource);
            }
        };
        NetResourceManager.prototype.delResource = function (request) {
            var resource = this._resourceHash.getItem(request.url);
            if (resource) {
                resource.deleteRequest(request);
                if (resource.requestLength == 0) {
                    if (resource.isLoading) {
                        this.stopLoadResource(resource);
                        resource.unNetLoad();
                    }
                    if (resource.data && this.getDisposeDelayTime() > 0) {
                        this.delayDisposeResource(resource);
                    }
                    else {
                        this.disposeResource(resource);
                    }
                }
            }
        };
        NetResourceManager.prototype.delayDisposeResource = function (resource) {
            this._delayDisposeHash.setItem(resource, resource);
            resource.delayDisposeTime = 0;
        };
        NetResourceManager.prototype.addvancetime = function (passtime) {
            var delay = this.getDisposeDelayTime();
            this._delayDisposeHash.forEach(function a(key, resource) {
                resource.delayDisposeTime += passtime;
                if (resource.delayDisposeTime >= delay)
                    this.disposeResource(resource);
            }, this);
            // for (let resource_key_a in this._delayDisposeHash.dict) {
            // 	let resource: NetResource = this._delayDisposeHash.dict[resource_key_a];
            // 	resource.delayDisposeTime += passtime;
            // 	if (resource.delayDisposeTime >= delay)
            // 		this.disposeResource(resource);
            // }			
        };
        NetResourceManager.prototype.disposeResource = function (resource) {
            resource.dispose();
            this._resourceHash.delItem(resource.url);
            this._delayDisposeHash.delItem(resource);
        };
        NetResourceManager.prototype.addResourceParser = function (type, res) {
            //type = type);
            this._resourceTypeDict.setItem(type, res);
        };
        NetResourceManager.prototype.makeResource = function (resType) {
            //resType = resType);
            var cls = this._resourceTypeDict.getItem(resType);
            if (cls)
                return new cls();
            return new fairui.NetResource();
        };
        NetResourceManager.prototype.getDisposeDelayTime = function () {
            return 0;
        };
        /**这里被NetResourceCenter.loadResource重写实现*/
        NetResourceManager.prototype.loadResource = function (element) {
            com.loader.GLoaderManager.getInstance().load(element.url, element.resType, this, flash.bind(this.loadSourceComplete, this), null, flash.bind(this.loadSourceError, this), [element], element.isCache);
        };
        /**
         * 加载资源完成
         */
        NetResourceManager.prototype.loadSourceComplete = function (loadData) {
            var element = loadData.argArray[0];
            if (element != null) {
                element.data = loadData.data;
                element.netComplete(element.data);
            }
            // this.getResource( element );
        };
        /**
         * 加载资源错误
         */
        NetResourceManager.prototype.loadSourceError = function (loadData) {
            App.log.error("加载资源错误,url:" + loadData.url);
        };
        /**
         * 停止加载资源
         */
        NetResourceManager.prototype.stopLoadResource = function (element) {
            com.loader.GLoaderManager.getInstance().unLoad(element.url, this, element.netComplete);
        };
        NetResourceManager.prototype.getResouceData = function (url) {
            if (this._resourceHash.hasOwnProperty(url)) {
                return this._resourceHash.getItem(url).data;
            }
            return null;
        };
        NetResourceManager.prototype.clear = function () {
            this._delayDisposeHash.forEach(function a(key, resource) {
                this.disposeResource(resource);
            }, this);
            // for (let resource_key_a in this._delayDisposeHash.dict) {
            // 	let resource: NetResource = this._delayDisposeHash.dict[resource_key_a];
            // 	this.disposeResource(resource);
            // }
        };
        NetResourceManager.prototype.dispose = function () {
            var element_key_a;
            var _self = this;
            while (this._resourceHash.length > 0) {
                this._resourceHash.forEach(function a(key, element) {
                    element.dispose();
                    _self._resourceHash.delItem(key);
                }, this);
            }
            while (this._delayDisposeHash.length > 0) {
                this._delayDisposeHash.forEach(function a(key, element) {
                    element.dispose();
                    _self._delayDisposeHash.delItem(key);
                }, this);
            }
            // for (element_key_a in this._resourceHash.dict) {
            // 	element = this._resourceHash.dict[element_key_a];
            // 	element.dispose();
            // }
            // this._resourceHash = null;
            // for (element_key_a in this._delayDisposeHash.dict) {
            // 	element = this._delayDisposeHash.dict[element_key_a];
            // 	element.dispose();
            // }
            this._delayDisposeHash = null;
            this._resourceTypeDict = null;
        };
        return NetResourceManager;
    }());
    fairui.NetResourceManager = NetResourceManager;
    __reflect(NetResourceManager.prototype, "fairui.NetResourceManager");
})(fairui || (fairui = {}));
//# sourceMappingURL=NetResourceManager.js.map