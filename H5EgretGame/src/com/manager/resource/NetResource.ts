module fairui {

	import ResPathUtil = com.utils.ResPathUtil;
	import INetResourceElement = com.interfaces.INetResourceElement;

	export class NetResource implements INetResourceElement, IDispose {

		public type: number = 0;
		private _url: string;
		private _hash: flash.Dictionary;
		private _resource: any = null;
		private _isLoading: boolean = false;
		private _delayDisposeTime: number = 0;
		private _isDispose: boolean = false;

		private _isCache: boolean = true;
		public get isCache(): boolean {
			return this._isCache;
		}
		public set isCache(value: boolean) {
			this._isCache = value;
		}

		public constructor() {
			this._hash = new flash.Dictionary();
		}

		public get delayDisposeTime(): number {

			return this._delayDisposeTime;
		}

		public set delayDisposeTime(value: number) {

			this._delayDisposeTime = value;
		}

		public addRequest(element: INetResourceElement) {

			if (this._hash) {
				this._hash.setItem(element, element);
			}
		}

		public deleteRequest(element: INetResourceElement) {

			if (this._hash) {
				this._hash.delItem(element);
			}
		}

		public get requestLength(): number {

			if (this._hash) {
				return this._hash.length;
			}
			return 0;
		}

		public get url(): any {

			return this._url;
		}

		public set url(value: any) {

			this._url = value;
		}

		public get resType(): number {
			let ext: string = ResPathUtil.getFileExtension(this._url);
			if (ext == "xll") {
				return EnumLoader.RES;
			} else if (ext == "jpg" || ext == "png" || ext == "jepg") {
				return EnumLoader.IMG;
			} else if (ext == "json" || ext == "txt") {
				return EnumLoader.TXT;
			} else {
				return EnumLoader.RES;
			}
			// return this.type;
		}

		public set resType(value: number) {

		}

		public netComplete(res: any) {

			this.data = res;
			this.unNetLoad();
		}

		public netProgress(value: number) {
			this._hash.forEach(function (key: any, data: INetResourceElement, _value: any) {
				data.netProgress(_value);
			}, this, value);
		}

		public netError(value: any) {
			this._hash.forEach(function (key: any, data: INetResourceElement, _value: any) {
				data.netError(_value);
			}, this, value);
		}

		public get data(): any {
			return this._resource;
		}

		public set data(value: any) {
			this._resource = value;
			if (this._hash != null) {
				this._hash.forEach(function (key: any, data: INetResourceElement) {
					data.netComplete(this._resource);
				}, this);
			}
		}

		public netLoad() {
			this._isLoading = true;
		}

		public unNetLoad() {
			this._isLoading = false;
		}

		public clear() {
			this.unNetLoad();
		}

		public get isLoading(): boolean {
			return this._isLoading;
		}

		public get isDispose(): boolean {
			return this._isDispose;
		}

		public dispose() {
			this.unNetLoad();
			// if (flash.As3is(this._resource, egret.Bitmap)) {
			// 	(<egret.Bitmap>(this._resource)).texture.dispose();
			// }
			// else if (flash.As3is(this._resource, null, "isDispose")) {
			// 	(<IDispose>(this._resource)).dispose();
			// }
			// else if (flash.As3is(this._resource, egret.ByteArray)) {
			// 	(<egret.ByteArray>(this._resource)).clear();
			// }
			// else if (flash.As3is(this._resource, egret.Texture)) {
			// 	(<egret.Texture>(this._resource)).dispose();
			// }
			// else if (flash.As3is(this._resource, egret.DisplayObject)) {
			// 	if (this._resource.loaderInfo.loader) {
			// 		this._resource.loaderInfo.loader.unloadAndStop(false);
			// 	}
			// }
			if (egret.is(this._resource, "AysncAnimator")) {
				App.asset.deleteResAsset(this.url);
			}
			if (this._hash)
				this._hash.destroy();
			this._hash = null;
			this._resource = null;
			this._delayDisposeTime = 0;
			this._isDispose = true;
			this._isCache = true;
		}
	}
}