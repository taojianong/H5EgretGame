module base {
	export class Animator {

		private _totalMovieTime: number = 1;
		private _isDispose: boolean = false;
		private _blendMode: string = egret.BlendMode.NORMAL;
		private _url: string;
		//private _currentFrame: number = -1;
		private _spriteSheet: egret.SpriteSheet;
		private _list: Array<SingleImage>;
		private _width: number = -1;
		private _height: number = -1;
		private _hash: flash.Dictionary;
		public isCache: boolean = false;

		public constructor() {
		}
		/**Create an egret.SpriteSheet object 创建并缓存一个 egret.SpriteSheet 对象*/
		public findFromCache(movieClipDataSet?: any, texture?: egret.Texture) {
			let _self: Animator = this;
			_self._list = [];
			_self._width = texture.textureWidth;
			_self._height = texture.textureHeight;
			_self._spriteSheet = new egret.SpriteSheet(texture);
			_self._blendMode = movieClipDataSet.blendMode;
			let img: SingleImage;
			let dataList: Array<any> = movieClipDataSet.data;
			let length: number = dataList.length;
			for (let i: number = 0; i < length; i++) {
				img = _self.getSingleImage();
				img.offsetX = dataList[i].offx;
				img.offsetY = dataList[i].offy;
				img.width = dataList[i].width;
				img.height = dataList[i].height;
				img.x = dataList[i].x;
				img.y = dataList[i].y;
				img.delayTime = dataList[i].delay;
				img.imageName = dataList[i].imgName;
				_self._totalMovieTime += img.delayTime;
				_self._list.push(img);
			}
			this._isDispose = false;
		}
		/**Create a new Texture object for the specified area on SpriteSheet and cache it 为 SpriteSheet 上的指定区域创建一个新的 Texture 对象并缓存它 */
		protected createTexture(name: string, bitmapX: number, bitmapY: number, bitmapWidth: number, bitmapHeight: number, offsetX?: number, offsetY?: number, textureWidth?: number, textureHeight?: number): egret.Texture {
			return this._spriteSheet.createTexture(name, bitmapX, bitmapY, bitmapWidth, bitmapHeight, offsetX, offsetY, textureWidth, textureHeight);
		}

		public getImage(index: number): SingleImage {
			if (this._list)
				return this._list[index];
			return null;
		}

		protected getSingleImage(): SingleImage {
			return new SingleImage();
		}

		public get width(): number {
			return this._width;
		}

		public get height(): number {
			return this._height;
		}

		public get totalMovieTime(): number {
			return this._totalMovieTime;
		}

		public get length(): number {
			return this._list.length;
		}

		public get url(): string {
			return this._url;
		}

		public set url(value: string) {
			this._url = value;
		}

		public get blendMode(): string {
			return this._blendMode;
		}

		public set blendMode(value: string) {
			this._blendMode = value;
		}

		public get isDispose(): boolean {
			return this._isDispose;
		}

		public dispose() {
			if (this._list) {
				let leng: number = this._list.length;
				for (let i: number = 0; i < leng; i++) {
					this._list[i].dispose();
				}
				this._list.slice(0, leng);
			}
			this._list = null;
			if (this._spriteSheet)
				this._spriteSheet.dispose();
			this._spriteSheet = null;
			this._url = null;
			this._totalMovieTime = 0;
			this._isDispose = true;
		}
	}
}
