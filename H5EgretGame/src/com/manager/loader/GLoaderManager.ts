module com.loader {
	import AvatarResDecode2 = com.loader.AvatarResDecode2;
	export class GLoaderManager {

		private static instance: GLoaderManager = null;

		private _urlLoader: base.GLoader;
		private _jsonLoader: base.GLoader;
		private _loadMap: flash.Dictionary;
		private _loadType: boolean = false;
		private _url: string;
		private _type: number;
		private _isCache: boolean = false;
		private _httpStatus: string = "";
		private _resDecode: AvatarResDecode2;
		public constructor() {
			if (GLoaderManager.instance) {
				egret.error("GLoaderManager an only use getInstance() to get an instance!");
				return;
			}
			this._loadMap = new flash.Dictionary();
			this._resDecode = new AvatarResDecode2();
		}

		public load(url: string, type: number, thisObject: any, complete: Function, progress: Function, error: Function, argArray?: any, isCache: boolean = false) {
			let loadData: LoaderData = new LoaderData();
			loadData.url = url;
			loadData.type = type;
			loadData.complete = complete;
			loadData.progress = progress;
			loadData.error = error;
			loadData.isCache = isCache;
			loadData.thisObject = thisObject;
			loadData.argArray = argArray;
			let cache: any;
			if (App.asset)
				cache = App.asset.getTypeAsset(type, url);
			if (cache && complete) {
				loadData.data = cache;
				complete.apply(thisObject, [loadData]);
				loadData.dispose();
				return;
			}
			let loadDataList: LoaderData[] = this._loadMap.getItem(url);
			if (loadDataList) {
				for (let index in loadDataList) {
					if (loadDataList[index].thisObject == thisObject && loadDataList[index].complete == complete)
						return;
				}
				loadDataList.push(loadData);
			}
			else {
				this._loadMap.setItem(url, [loadData]);
			}
			this.starLoad();
		}

		private starLoad() {
			if (!this._loadType) {
				this._loadType = true;
				let loadData: LoaderData;
				let loadDataList: LoaderData[];
				for (let key in this._loadMap.map) {
					loadDataList = this._loadMap.getItem(key);
					loadData = loadDataList[0];
					this.doLoad(loadData.type, loadData.url, loadData.isCache);
					return;
				}
				this._loadType = false;
			}
		}

		protected doLoad(type: number, url: string, isCache: boolean) {
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
			let request: egret.URLRequest
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
					this._jsonLoader.load(new egret.URLRequest(AssetPathManager.getInstance().getVersionUrl(
						this._url + AssetPathManager.JSON_SFX)));
					request = new egret.URLRequest(AssetPathManager.getInstance().getVersionUrl(
						this._url + AssetPathManager.PNG_SFX));
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
		}

		private onComplete(event: egret.Event) {
			let content: any = this._urlLoader.data;
			let loadDataList: LoaderData[] = this._loadMap.getItem(this._url);
			if (loadDataList && loadDataList.length > 0) {
				//let loadData: LoaderData = loadDataList[0];
				let valueData: any;
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
		}

		private onJsonComplete(event: egret.Event) {
			let content: any = this._jsonLoader.data;
			let loadDataList: LoaderData[] = this._loadMap.getItem(this._url);
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
		}

		private loadDataCompleteHandler(data: any) {
			let loadData: LoaderData;
			let loadDataList: LoaderData[] = this._loadMap.getItem(this._url);
			this._loadMap.delItem(this._url);
			if (loadDataList) {
				for (let index in loadDataList) {
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
		}

		// private resDecodeCompleteHandler(data: base.AysncAnimator) {
		// 	//if (this._isCache)
		// 	App.asset.setResAsset(this._url, data);
		// 	this.loadDataCompleteHandler(data);
		// }

		// protected onStatus(e: egret.HTTPStatusEvent) {

		// }

		private onLoadError(event: egret.Event) {
			egret.warn("GLoaderManager.onLoadError：" + this._url, "httpStatus", this._httpStatus, event);//yr_engine.core.utils.debug.log.logWarn("加载错误:",e,this._url,"_httpStatus",this._httpStatus);
			let loadData: LoaderData;
			let loadDataList: LoaderData[] = this._loadMap.getItem(this._url);
			this._loadMap.delItem(this._url);
			if (loadDataList) {
				if (this._type == EnumLoader.RES) {
					if (!loadDataList[0].data) {
						return;
					}
				}
				for (let index in loadDataList) {
					loadData = loadDataList[index];
					if (loadData.error)
						loadData.error.apply(loadData.thisObject, [loadData]);
					loadData.dispose();
				}
			}

			//this._loadMap.delItem(this._url);
			this._loadType = false;
			egret.callLater(this.starLoad, this);
		}

		protected onProgress(event: egret.ProgressEvent) {
			let loadDataList: LoaderData[] = this._loadMap.getItem(this._url);
			if (loadDataList && loadDataList.length > 0) {
				for (let index in loadDataList) {
					if (loadDataList[index].progress)
						loadDataList[index].progress.apply(loadDataList[index].thisObject, [event]);
				}
			}
		}

		public unLoad(url: string, thisObject: any, complete: Function) {
			let loadDataList: LoaderData[] = this._loadMap.getItem(url);
			let loadData: LoaderData;
			if (loadDataList) {
				for (let index in loadDataList) {
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
		}
		/**获取静态实例*/
		public static getInstance(): GLoaderManager {
			if (!GLoaderManager.instance) {
				GLoaderManager.instance = new GLoaderManager();
			}
			return GLoaderManager.instance;
		}
	}
}