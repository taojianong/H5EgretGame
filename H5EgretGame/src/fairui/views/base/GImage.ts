module base {
	export class GImage extends GSprite {

		private _bitmap: GBitmap;

		private _url: string;
		public get url(): string {
			return this._url;
		}

		private _complete: Function;
		private _progress: Function;
		private _error: Function;
		private _thisObject: any;

		private _isCache: boolean = true;
		public set isChche(value: boolean) {
			this._isCache = value;
		}
		public get isChche(): boolean {
			return this._isCache;
		}

		public constructor() {
			super();
			this._bitmap = new GBitmap();
			this.addChild(this._bitmap);
			this.addEventListener(egret.Event.ADDED_TO_STAGE, this.addtoStageHandler, this);
		}

		private addtoStageHandler(event: egret.Event) {
			this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.addtoStageHandler, this);
		}

		/**作为内容加载的URL或texture的对象。*/
		public source(data: any, thisObject?: any, complete?: Function, progress?: Function, error?: Function) {
			let _self: GImage = this;
			if (data) {
				_self._thisObject = thisObject;
				_self._complete = complete;
				_self._progress = progress;
				_self._error = error;
				if (!_self._bitmap) {
					_self._bitmap = new GBitmap();
					_self.addChild(_self._bitmap);
				}
				if (typeof data === "string") {
					if (_self._url == data)
						return;
					_self._url = data;
					com.loader.GLoaderManager.getInstance().load(data, EnumLoader.IMG, _self, _self.onComplete, _self.onProgress, _self.onLoadError,
						null, _self._isCache);
				}
				else {
					if (_self._bitmap.texture == data)
						return;
					_self._url = null
					_self._bitmap.texture = data;
				}
			}
			else
				_self.dispose(false);
		}

		public scale9Grid(sx: number, sy: number, sw: number, sh: number) {
			this._bitmap.scale9Grid = new egret.Rectangle(sx, sy, sw, sh);
		}

		private onComplete(data: com.loader.LoaderData) {
			if (this._bitmap)
				this._bitmap.texture = data.data;
			if (this._complete)
				this._complete.apply(this._thisObject);
		}

		private onLoadError(data: com.loader.LoaderData) {
			if (this._error)
				this._error.apply(this._thisObject);
		}

		protected onProgress(event: egret.ProgressEvent) {
			if (this._progress)
				this._progress.apply(this._thisObject, [event]);
		}

		public set width(value: number) {
			this._bitmap.width = value;
		}
		public get width(): number {
			return this._bitmap.width;
		}
		public set height(value: number) {
			this._bitmap.height = value;
		}
		public get height(): number {
			return this._bitmap.height;
		}
		/**
		 * 释放资源
		 * @param type 是否释放资源
		 */
		public dispose(type?: boolean) {
			super.dispose(type);
			let _self: GImage = this;
			_self.removeAllEventListener();
			if (_self._bitmap) {
				_self._bitmap.texture = null;
				_self.removeChild(_self._bitmap);
			}
			_self._bitmap = null;
			if (_self._url) {
				com.loader.GLoaderManager.getInstance().unLoad(_self._url, _self, _self.onComplete);
				if (type) {
					App.asset.deleteImgAsset(_self._url);
					_self._url = null;
				}
			}
			_self._complete = null;
			_self._progress = null;
			_self._error = null;
			_self._thisObject = null;
		}
	}
}