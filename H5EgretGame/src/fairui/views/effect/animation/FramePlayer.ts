module fairui {

	import Animator = base.Animator;

	export class FramePlayer extends egret.HashObject implements IDispose {

		private _parent: any;
		private _father: any;
		private _aniLength: number = -1;
		private _ani: Animator;
		private _bitmap: base.GBitmap;
		private _scaleX: number = 1;
		private _scaleY: number = 1;
		private _x: number = 0;
		private _y: number = 0;
		private _alpha: number = 1;
		private _visible: boolean = true;
		private _isDisposed: boolean = false;
		protected _currentIndex: number = 0;

		public constructor() {
			super();			
			this.init();
		}

		public get father(): any {
			return this._father;
		}

		public set father(value: any) {
			this._father = value;
		}

		protected init() {
			this._bitmap = this.makeBitmap();
			this._isDisposed = false;
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

		public addAnimatior(ani: Animator) {
			if (ani == null) {
				this.deleteAnimator();
			}
			else {
				this._ani = ani;
				this._aniLength = this._ani.length;
				this._bitmap.blendMode = this._ani.blendMode;
				this.updateViewBmd();
			}
		}

		public get animator(): Animator {
			return this._ani;
		}

		public get view(): egret.DisplayObject {
			return this._bitmap;
		}

		public restart() {
			this._currentIndex = 0;
		}

		public updateViewBmd() {
			if (this._ani && this._ani.isDispose == false) {
				let image: base.SingleImage = this._ani.getImage(this._currentIndex);
				if (image && this._bitmap && image.bitmapData) {
					this._bitmap.texture = image.bitmapData;
					this._bitmap.x = image.offsetX * this._scaleX + this._x;
					this._bitmap.y = image.offsetY * this._scaleY + this._y;
				}
			}
		}

		public get isDispose(): boolean {
			return this._isDisposed;
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

		public resetAndClear() {
			this.removeParent();
			this.deleteAnimator();
			this._x = 0;
			this._y = 0;
			this._scaleX = 1;
			this._scaleY = 1;
			this.view.scaleX = 1;
			this.view.scaleY = 1;
			this.alpha = 1;
			this.visible = true;
			this._father = null;
		}

		public dispose() {
			this.resetAndClear();
			this._bitmap = null;
			this._isDisposed = true;
		}
	}
}