module base {
	export class FramePlayer {

		private _parent: any;
		private _aniLength: number = -1;

		private _ani: Animator;
		public get animator() {
			return this._ani;
		}
		public path: string;
		private _bitmap: GBitmap;
		private _scaleX: number = 1;
		private _scaleY: number = 1;
		private _x: number = 0;
		private _y: number = 0;
		private _alpha: number = 1;
		private _visible: boolean = true;

		protected _currentIndex: number = 0;

		public constructor() {
			this.init();
		}

		protected init() {
			this._bitmap = this.makeBitmap();
		}

		protected makeBitmap(): base.GBitmap {
			return new base.GBitmap();
		}

		public setTo(value1: number, value2: number) {
			this._x = value1;
			this._y = value2;
		}

		public seToPoint(p: egret.Point) {
			this.setTo(p.x, p.y);
		}

		public get x(): number {
			return this._x;
		}

		public set x(value: number) {
			this._x = value;
		}

		public get y(): number {
			return this._y;
		}

		public set y(value: number) {
			this._y = value;
		}

		public get scaleX(): number {
			return this._scaleX;
		}

		public set scaleX(value: number) {
			if (this._scaleX != value) {
				this._scaleX = value;
				this.view.scaleX = value;
			}
		}

		public get scaleY(): number {
			return this._scaleY;
		}

		public set scaleY(value: number) {
			if (this._scaleY != value) {
				this._scaleY = value;
				this.view.scaleY = value;
			}
		}

		public get visible(): boolean {
			return this._visible;
		}

		public set visible(value: boolean) {
			if (this._visible != value) {
				this._visible = value;
				if (this.view) {
					this.view.visible = value;
				}
			}
		}

		public get alpha(): number {
			return this._alpha;
		}

		public set alpha(value: number) {
			if (this._alpha != value) {
				this._alpha = value;
				if (this.view) {
					this.view.alpha = value;
				}
			}
		}

		public deleteAnimator() {
			if (this._bitmap)
				this._bitmap.texture = null;
			if (this._ani) {
				this._ani = null;
			}
			this._aniLength = 0;
			this._currentIndex = 0;
		}

		public get aniLength(): number {
			return this._aniLength;
		}
		/**给动画播放器添加动画数据*/
		public addAnimatior(ani: Animator) {
			if (ani == null) {
				this.deleteAnimator();
			}
			else {
				this._ani = ani;
				this._aniLength = this._ani.length;
				this._bitmap.blendMode = this._ani.blendMode;
				this._currentIndex = 0;
				this.updateViewBmd();
			}
		}


		public get view(): GBitmap {
			return this._bitmap;
		}

		public restart() {
			this._currentIndex = 0;
		}

		public updateViewBmd() {
			if (this._ani && this._ani.isDispose == false) {
				let image: SingleImage = this._ani.getImage(this._currentIndex);
				if (image && image.bitmapData) {
					this._bitmap.texture = image.bitmapData;
					this._bitmap.x = image.offsetX * this._scaleX + this._x;
					this._bitmap.y = image.offsetY * this._scaleY + this._y - 152;
				}
				else
					this._bitmap.texture = null;
			}
			else
				this._bitmap.texture = null;
		}

		public get currentIndex(): number {
			return this._currentIndex;
		}

		public set currentIndex(value: number) {
			value = Math.floor(value);
			if (this._currentIndex != value) {
				this._currentIndex = value;
				this.updateViewBmd();
			}
		}

		public addParent(parent: any) {
			if (this._parent != parent) {
				this._parent = parent;
				this._parent.addChild(this.view);
			}
		}

		public addParentAt(parent: any, idx: number) {
			if (this._parent != parent) {
				this._parent = parent;
				this._parent.addChildAt(this.view, idx);
			}
		}

		public get parent(): any {
			return this._parent;
		}

		public removeParent() {
			if (this.view && this.view.parent)
				this.view.parent.removeChild(this.view);
			this._parent = null;
		}

		public resetAndClear(type?: boolean) {
			if (type)
				this.removeParent();
			this.deleteAnimator();
			this.x = 0;
			this.y = 0;
			this.scaleX = 1;
			this.scaleY = 1;
			this.alpha = 1;
			this.visible = true;
			this._bitmap.x = 0;
			this._bitmap.y = 0;
			this._currentIndex = 0;
		}

		public dispose(type?: boolean) {
			this.resetAndClear(type);
		}
	}
}