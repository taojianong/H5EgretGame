module fairui {

	import INetResourceElement = com.interfaces.INetResourceElement;

	export class NetResourceManager {

		public static resoureCenter: NetResourceManager;
		public static getInstance(): NetResourceManager {
			return this.resoureCenter = this.resoureCenter || new NetResourceManager();
		}

		private _resourceHash: flash.Dictionary;
		private _delayDisposeHash: flash.Dictionary;
		private _resourceTypeDict: flash.Dictionary;

		protected set resoureCenter(value: NetResourceManager) {

			NetResourceManager.resoureCenter = value;
		}

		public constructor() {

			this.init();
		}

		protected init() {
			this._resourceTypeDict = new flash.Dictionary();
			this._resourceHash = new flash.Dictionary();
			this._delayDisposeHash = new flash.Dictionary();
		}

		public getResourceLength(): number {
			return this._resourceHash.length;
		}

		public getDelayResourceLength(): number {
			return this._delayDisposeHash.length;
		}

		public getResource(request: INetResourceElement) {
			let resource: NetResource = <NetResource>this._resourceHash.getItem(request.url);
			if (resource && this._delayDisposeHash.hasOwnProperty(resource)) {
				resource.delayDisposeTime = 0;
				this._delayDisposeHash.delItem(resource);
			}
			if (resource == null || resource.isDisposed) {
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
		}

		public delErrorResource(request: INetResourceElement) {
			let resource: NetResource = this._resourceHash.getItem(request.url);
			if (resource) {
				if (resource.isLoading) {
					this.stopLoadResource(resource);
					resource.unNetLoad();
				}
				this.disposeResource(resource);
			}
		}

		public delResource(request: INetResourceElement) {
			let resource: NetResource = this._resourceHash.getItem(request.url);
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
		}

		private delayDisposeResource(resource: NetResource) {

			this._delayDisposeHash.setItem(resource, resource);
			resource.delayDisposeTime = 0;
		}

		protected addvancetime(passtime: number) {

			let delay: number = this.getDisposeDelayTime();

			this._delayDisposeHash.forEach(function a(key: any, resource: NetResource): void {
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
		}

		protected disposeResource(resource: NetResource) {

			resource.dispose();
			this._resourceHash.delItem(resource.url);
			this._delayDisposeHash.delItem(resource);
		}

		protected addResourceParser(type: number, res: any) {
			//type = type);
			this._resourceTypeDict.setItem(type, res);
		}

		private makeResource(resType: number): NetResource {
			//resType = resType);
			let cls: any = <any>this._resourceTypeDict.getItem(resType);
			if (cls)
				return new cls();
			return new NetResource();
		}

		protected getDisposeDelayTime(): number {
			return 0;
		}
		/**这里被NetResourceCenter.loadResource重写实现*/
		protected loadResource(element: INetResourceElement) {
			com.loader.GLoaderManager.getInstance().load(element.url, element.resType, this, flash.bind(this.loadSourceComplete, this), null, flash.bind(this.loadSourceError, this), [element], element.isCache);
		}

		/**
		 * 加载资源完成
		 */
		private loadSourceComplete(loadData: com.loader.LoaderData): void {

			let element: INetResourceElement = loadData.argArray[0];
			if (element != null) {
				element.data = loadData.data;
				element.netComplete(element.data);
			}
			// this.getResource( element );
		}

		/**
		 * 加载资源错误
		 */
		private loadSourceError(loadData: com.loader.LoaderData): void {

			egret.error("加载资源错误,url:" + loadData.url);
		}

		/**
		 * 停止加载资源
		 */
		protected stopLoadResource(element: INetResourceElement) {

			com.loader.GLoaderManager.getInstance().unLoad(element.url, this, element.netComplete);
		}

		public getResouceData(url: any): any {
			if (this._resourceHash.hasOwnProperty(url)) {
				return this._resourceHash.getItem(url).data;
			}
			return null;
		}

		public clear() {

			this._delayDisposeHash.forEach(function a(key: any, resource: NetResource): void {
				this.disposeResource(resource);
			}, this);

			// for (let resource_key_a in this._delayDisposeHash.dict) {
			// 	let resource: NetResource = this._delayDisposeHash.dict[resource_key_a];
			// 	this.disposeResource(resource);
			// }
		}

		public dispose() {

			let element_key_a;
			let _self: NetResourceManager = this;

			while (this._resourceHash.length > 0) {
				this._resourceHash.forEach(function a(key: any, element: NetResource): void {
					element.dispose();
					_self._resourceHash.delItem(key);
				}, this);
			}

			while (this._delayDisposeHash.length > 0) {
				this._delayDisposeHash.forEach(function a(key: any, element: NetResource): void {
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
		}
	}
}