module fairui {

	import Animator = base.Animator;
	import SingleImage = base.SingleImage;
	
	export class AbstractSimpleEffect {

		private _currentPasstime: number = 0;
		private _speed: number = 1;
		private _parent: any;
		private _aniLength: number = -1;
		private _ani: Animator;
		private _x: number = 0;
		private _y: number = 0;
		private _isDisposed: boolean = false;
		protected _view: any;
		protected _isPlaying: boolean = false;
		protected _currentIndex: number = 0;

		public constructor() {
			this.init();
		}

		protected init() {
		}

		public deleteAnimator() {
			this._ani = null;
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
				this.updateViewBmd();
			}
		}

		public get animator(): Animator {
			return this._ani;
		}

		public get view(): any {
			return this._view;
		}

		public restart() {
			this._currentIndex = 0;
		}

		public updateViewBmd() {
			if (this._ani && this._ani.isDispose == false) {
				let image: SingleImage = flash.As3As(this._ani.getImage(this._currentIndex), SingleImage);
				if (image && this._view && image.bitmapData) {
					this.setViewSingleImage(image);
				}
			}
		}

		protected setViewSingleImage(image: SingleImage) {

		}

		public get isDispose(): boolean {
			return this._isDisposed;
		}

		public get currentIndex(): number {
			return this._currentIndex;
		}

		public set currentIndex(value: number) {
			//value = value);
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

		public get parent(): any {
			return this._parent;
		}

		public removeParent() {
			if (this.view && this.view.parent)
				this.view.parent.removeChild(this.view);
			this._parent = null;
		}

		public setTo(value1: number, value2: number) {
			this._x = value1;
			this._y = value2;
			if (this.animator) {
				let image: SingleImage = this.animator.getImage(this._currentIndex);
				if (image) {
					this.view["x"] = (image.offsetX * this.view["scaleX"] + this.x);
					this.view["y"] = (image.offsetY + this.y);
				}
			}
		}

		public get x(): number {
			return this._x;
		}

		public set x(value: number) {
			if (this._x != value) {
				this._x = value;
				if (this.animator) {
					let image: SingleImage = this.animator.getImage(this._currentIndex);
					if (image)
						this.view["x"] = (image.offsetX * this.view["scaleX"] + this.x);
				}
			}
		}

		public get y(): number {
			return this._y;
		}

		public set y(value: number) {
			if (this._y != value) {
				this._y = value;
				if (this.animator) {
					let image: SingleImage = this.animator.getImage(this._currentIndex);
					if (image) {
						this.view["y"] = (image.offsetY + this.y);
					}
				}
			}
		}

		public set alpha(value: number) {
			if (this.view)
				this.view["alpha"] = value;
		}

		public get alpha(): number {
			if (this.view)
				return this.view["alpha"];
			return 1;
		}

		public play() {
			this._isPlaying = true;
		}

		public stop() {
			this._isPlaying = false;
		}

		private updateFrame(passtime: number) {
			this._currentPasstime += passtime;
			if (this.animator == null || this.animator.isDispose)
				return;
			let num: number = this._currentPasstime / this.animator.totalMovieTime;
			this._currentPasstime = this._currentPasstime % this.animator.totalMovieTime;
			let frame: number = this.currentIndex;
			let image: SingleImage = this.animator.getImage(frame);
			while (image && this._currentPasstime >= image.delayTime * this.speed) {
				this._currentPasstime -= image.delayTime * this.speed;
				frame++;
				if (frame >= this.aniLength) {
					frame = 0;
					num++;
				}
				image = this.animator.getImage(frame);
			}
			this.currentIndex = frame;
			if (num > 0 && this.aniLength > 0) {
				for (let i: number = 0; i < num; i++)
					this.lastFrameHandler();
			}
		}

		protected lastFrameHandler() {

		}

		public get speed(): number {
			return this._speed;
		}

		public set speed(value: number) {
			if (this._speed != value) {
				this._speed = value;
			}
		}

		public addvanceTime(passtime: number) {
			if (this._isPlaying)
				this.updateFrame(passtime);
		}

		public resetAndClear() {
			this.removeParent();
			this.deleteAnimator();
			this._x = 0;
			this._y = 0;
			this._currentPasstime = 0;
			this._speed = 1;
			this.stop();
		}

		public dispose() {
			this.resetAndClear();
			this._view = null;
			this._isDisposed = true;
		}

	}
}

