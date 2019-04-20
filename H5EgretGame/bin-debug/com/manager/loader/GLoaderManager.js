var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var com;
(function (com) {
    var loader;
    (function (loader) {
        var AvatarResDecode2 = com.loader.AvatarResDecode2;
        var GLoaderManager = (function () {
            function GLoaderManager() {
                this._loadType = false;
                this._isCache = false;
                this._httpStatus = "";
                if (GLoaderManager.instance) {
                    egret.error("GLoaderManager an only use getInstance() to get an instance!");
                    return;
                }
                this._loadMap = new flash.Dictionary();
                this._resDecode = new AvatarResDecode2();
            }
            GLoaderManager.prototype.load = function (url, type, thisObject, complete, progress, error, argArray, isCache) {
                if (isCache === void 0) { isCache = false; }
                var loadData = new loader.LoaderData();
                loadData.url = url;
                loadData.type = type;
                loadData.complete = complete;
                loadData.progress = progress;
                loadData.error = error;
                loadData.isCache = isCache;
                loadData.thisObject = thisObject;
                loadData.argArray = argArray;
                var cache;
                if (App.asset)
                    cache = App.asset.getTypeAsset(type, url);
                if (cache && complete) {
                    loadData.data = cache;
                    complete.apply(thisObject, [loadData]);
                    loadData.dispose();
                    return;
                }
                var loadDataList = this._loadMap.getItem(url);
                if (loadDataList) {
                    for (var index in loadDataList) {
                        if (loadDataList[index].thisObject == thisObject && loadDataList[index].complete == complete)
                            return;
                    }
                    loadDataList.push(loadData);
                }
                else {
                    this._loadMap.setItem(url, [loadData]);
                }
                this.starLoad();
            };
            GLoaderManager.prototype.starLoad = function () {
                if (!this._loadType) {
                    this._loadType = true;
                    var loadData = void 0;
                    var loadDataList = void 0;
                    for (var key in this._loadMap.map) {
                        loadDataList = this._loadMap.getItem(key);
                        loadData = loadDataList[0];
                        this.doLoad(loadData.type, loadData.url, loadData.isCache);
                        return;
                    }
                    this._loadType = false;
                }
            };
            GLoaderManager.prototype.doLoad = function (type, url, isCache) {
                this._type = type;
                this._url = url;
                this._isCache = isCache;
                if (!this._urlLoader) {
                    this._urlLoader = new base.GLoader();
                    //this._urlLoader.addEventListener(egret.ProgressEvent.PROGRESS, this.onProgress, this);
                    this._urlLoader.addEventListener(egret.Event.COMPLETE, this.onComplete, this);
                    this._urlLoader.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onLoadError, this);
                    //this._urlLoader.addEventListener(egret.HTTPStatusEvent.HTTP_STATUS, this.onStatus, this);
                }
                this._urlLoader.data = null;
                var request;
                switch (this._type) {
                    case EnumLoader.BYTE:
                        this._urlLoader.dataFormat = egret.URLLoaderDataFormat.BINARY;
                        break;
                    case EnumLoader.RES:
                        this._urlLoader.dataFormat = egret.URLLoaderDataFormat.TEXTURE;
                        if (!this._jsonLoader) {
                            this._jsonLoader = new base.GLoader();
                            //this._urlLoader.addEventListener(egret.ProgressEvent.PROGRESS, this.onProgress, this);
                            this._jsonLoader.addEventListener(egret.Event.COMPLETE, this.onJsonComplete, this);
                            this._jsonLoader.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onLoadError, this);
                        }
                        this._jsonLoader.data = null;
                        this._jsonLoader.dataFormat = egret.URLLoaderDataFormat.TEXT;
                        this._jsonLoader.load(new egret.URLRequest(AssetPathManager.getInstance().getVersionUrl(this._url + AssetPathManager.JSON_SFX)));
                        request = new egret.URLRequest(AssetPathManager.getInstance().getVersionUrl(this._url + AssetPathManager.PNG_SFX));
                        this._urlLoader.load(request);
                        return;
                    //break;
                    case EnumLoader.IMG:
                        this._urlLoader.dataFormat = egret.URLLoaderDataFormat.TEXTURE;
                        break;
                    case EnumLoader.TXT:
                        this._urlLoader.dataFormat = egret.URLLoaderDataFormat.TEXT;
                        break;
                }
                request = new egret.URLRequest(this._url);
                this._urlLoader.load(request);
                //egret.warn("GLoaderManager.onLoad：" + this._url);
            };
            GLoaderManager.prototype.onComplete = function (event) {
                var content = this._urlLoader.data;
                var loadDataList = this._loadMap.getItem(this._url);
                if (loadDataList && loadDataList.length > 0) {
                    //let loadData: LoaderData = loadDataList[0];
                    var valueData = void 0;
                    switch (this._type) {
                        case EnumLoader.BYTE:
                            valueData = new egret.ByteArray(content);
                            if (this._isCache)
                                App.asset.setByteAsset(this._url, valueData);
                            this.loadDataCompleteHandler(valueData);
                            break;
                        case EnumLoader.RES:
                            if (!loadDataList[0].data) {
                                loadDataList[0].data = { "res": content };
                            }
                            else {
                                loadDataList[0].data["res"] = content;
                                if (loadDataList[0].data.hasOwnProperty("json"))
                                    this.loadDataCompleteHandler(this._resDecode.parser(loadDataList[0].data, this._url, this._isCache));
                            }
                            break;
                        case EnumLoader.IMG:
                            if (this._isCache && App.asset)
                                App.asset.setImgAsset(this._url, content);
                            this.loadDataCompleteHandler(content);
                            break;
                        case EnumLoader.TXT:
                            if (this._isCache)
                                App.asset.setTxtAsset(this._url, content);
                            this.loadDataCompleteHandler(content);
                            break;
                    }
                    // for (let index in loadDataList) {
                    // 	loadData = loadDataList[index];
                    // 	loadData.complete.apply(loadData.thisObject, [loadData]);
                    // 	loadData.dispose();
                    // }
                }
                //this.starLoad();
            };
            GLoaderManager.prototype.onJsonComplete = function (event) {
                var content = this._jsonLoader.data;
                var loadDataList = this._loadMap.getItem(this._url);
                if (loadDataList && loadDataList.length > 0) {
                    if (!loadDataList[0].data) {
                        loadDataList[0].data = { "json": content };
                    }
                    else {
                        loadDataList[0].data["json"] = content;
                        if (loadDataList[0].data.hasOwnProperty("res"))
                            this.loadDataCompleteHandler(this._resDecode.parser(loadDataList[0].data, this._url, this._isCache));
                    }
                }
                else
                    this.loadDataCompleteHandler(null);
            };
            GLoaderManager.prototype.loadDataCompleteHandler = function (data) {
                var loadData;
                var loadDataList = this._loadMap.getItem(this._url);
                this._loadMap.delItem(this._url);
                if (loadDataList) {
                    for (var index in loadDataList) {
                        loadData = loadDataList[index];
                        if (loadData.complete) {
                            loadData.data = data;
                            loadData.complete.apply(loadData.thisObject, [loadData]);
                        }
                        loadData.dispose();
                    }
                }
                this._loadType = false;
                //this.starLoad();
                egret.callLater(this.starLoad, this);
            };
            // private resDecodeCompleteHandler(data: base.AysncAnimator) {
            // 	//if (this._isCache)
            // 	App.asset.setResAsset(this._url, data);
            // 	this.loadDataCompleteHandler(data);
            // }
            // protected onStatus(e: egret.HTTPStatusEvent) {
            // }
            GLoaderManager.prototype.onLoadError = function (event) {
                egret.warn("GLoaderManager.onLoadError：" + this._url, "httpStatus", this._httpStatus, event); //yr_engine.core.utils.debug.log.logWarn("加载错误:",e,this._url,"_httpStatus",this._httpStatus);
                var loadData;
                var loadDataList = this._loadMap.getItem(this._url);
                this._loadMap.delItem(this._url);
                if (loadDataList) {
                    if (this._type == EnumLoader.RES) {
                        if (!loadDataList[0].data) {
                            return;
                        }
                    }
                    for (var index in loadDataList) {
                        loadData = loadDataList[index];
                        if (loadData.error)
                            loadData.error.apply(loadData.thisObject, [loadData]);
                        loadData.dispose();
                    }
                }
                //this._loadMap.delItem(this._url);
                this._loadType = false;
                egret.callLater(this.starLoad, this);
            };
            GLoaderManager.prototype.onProgress = function (event) {
                var loadDataList = this._loadMap.getItem(this._url);
                if (loadDataList && loadDataList.length > 0) {
                    for (var index in loadDataList) {
                        if (loadDataList[index].progress)
                            loadDataList[index].progress.apply(loadDataList[index].thisObject, [event]);
                    }
                }
            };
            GLoaderManager.prototype.unLoad = function (url, thisObject, complete) {
                var loadDataList = this._loadMap.getItem(url);
                var loadData;
                if (loadDataList) {
                    for (var index in loadDataList) {
                        loadData = loadDataList[index];
                        if (loadData.thisObject == thisObject && loadData.complete == complete) {
                            loadData.dispose();
                            loadDataList.slice(parseInt(index), 1);
                            break;
                        }
                    }
                    if (loadDataList.length == 0) {
                        this._loadMap.delItem(url);
                    }
                }
            };
            /**获取静态实例*/
            GLoaderManager.getInstance = function () {
                if (!GLoaderManager.instance) {
                    GLoaderManager.instance = new GLoaderManager();
                }
                return GLoaderManager.instance;
            };
            GLoaderManager.instance = null;
            return GLoaderManager;
        }());
        loader.GLoaderManager = GLoaderManager;
        __reflect(GLoaderManager.prototype, "com.loader.GLoaderManager");
    })(loader = com.loader || (com.loader = {}));
})(com || (com = {}));
//# sourceMappingURL=GLoaderManager.js.map