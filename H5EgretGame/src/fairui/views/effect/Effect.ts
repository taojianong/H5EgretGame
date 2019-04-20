module fairui {

	import SingleImage = base.SingleImage;
	// import RantionDisplayObjectUtil = com.utils.RantionDisplayObjectUtil;
	import MathUnit = com.utils.MathUnit;
	import ListenerHandlers = com.utils.ListenerHandlers;

	export class Effect extends FramePlayer {

		private _frameHandler: ListenerHandlers;
		private _matrix: egret.Matrix = new egret.Matrix();
		private _currentPasstime: number = 0;
		private _angle: number = 0;
		private _speed: number = 1;
		protected _isPlaying: boolean = false;
		
		private _isCache: boolean = true;
		public get isCache(): boolean {
			return this._isCache;
		}
		public set isCache(value: boolean) {
			this._isCache = value;
		}

		public constructor() {
			super();
		}

		protected init() {
			super.init();
		}

		protected makeBitmap(): base.GBitmap {

			return new EffectBitmap(this);
		}

		public setTo(value1: number, value2: number) {
			egret.superSetter(Effect, this, "x", value1);
			egret.superSetter(Effect, this, "y", value2);
			if (this.animator) {
				let image: SingleImage = this.animator.getImage(this._currentIndex);
				if (image) {
					this.view.x = (image.offsetX * this.view.scaleX + this.x);
					this.view.y = (image.offsetY + this.y);
				}
			}
		}

		public set x(value: number) {
			egret.superSetter(Effect, this, "x", value);
			if (this.animator) {
				let image: SingleImage = this.animator.getImage(this._currentIndex);
				if (image)
					this.view.x = (image.offsetX * this.view.scaleX + this.x);
			}
		}

		public get x(): number {
			return egret.superGetter(Effect, this, "x");
		}

		public set y(value: number) {
			egret.superSetter(Effect, this, "y", value);
			if (this.animator) {
				let image: SingleImage = this.animator.getImage(this._currentIndex);
				if (image)
					this.view.y = (image.offsetY + this.y);
			}
		}

		public get y(): number {
			return egret.superGetter(Effect, this, "y");
		}

		public get degrees(): number {
			return MathUnit.radinToDegrees(this._angle);
		}

		public set degrees(value: number) {
			this.angle = MathUnit.degreesToRadin(value);
		}

		public get angle(): number {
			return this._angle;
		}

		public set angle(value: number) {
			if (value != this._angle) {
				this._angle = value;
				if (value == 0) {
					this._matrix.identity();
					this.view.matrix = this._matrix;
				}
				else {
					this.rantionView();
				}
			}
		}

		public rantionView() {
			if (this._angle != 0 && this.isDisposed == false && this.animator) {
				let image: SingleImage = this.animator.getImage(this._currentIndex);
				if (image) {
					this._matrix.tx = this.x + image.offsetX;
					this._matrix.ty = this.y + image.offsetY;
					MathUnit.toPoint(this.view, this._matrix, image.offsetX, image.offsetY, this._angle);
				}
			}
		}

		public get isPlaying(): boolean {
			return this._isPlaying;
		}

		public play() {
			this._isPlaying = true;
		}

		public stop() {
			this._isPlaying = false;
		}

		public restart() {
			this._currentPasstime = 0;
			super.restart();
		}

		private updateFrame(passtime: number) {
			this._currentPasstime += passtime;
			if (this.animator == null || this.animator.isDispose)
				return;
			let num: number = Math.floor(this._currentPasstime / this.animator.totalMovieTime);
			this._currentPasstime = this._currentPasstime % this.animator.totalMovieTime;
			let frame: number = this.currentIndex;
			let image: SingleImage = this.animator.getImage(frame);
			while (image && this._currentPasstime >= image.delayTime * this._speed) {
				this._currentPasstime -= image.delayTime * this._speed;
				frame++;
				if (frame >= this.aniLength) {
					frame = 0;
					num++;
				}
				image = this.animator.getImage(frame);
			}
			if (num > 0 && this.aniLength > 0) {
				for (let i: number = 0; i < num; i++)
					this.lastFrameHandler();
			}
			if (this.isPlaying) {
				this.currentIndex = frame;
			}
		}

		protected lastFrameHandler() {
		}

		public get speed(): number {
			return this._speed;
		}

		public set speed(value: number) {
			if (this._speed != value) {
				this._speed = (value <= 0.1 ? 0.1 : value);
			}
		}

		public updateViewBmd() {
			super.updateViewBmd();
			this.rantionView();
		}

		public addvanceTime(passtime: number) {
			if (this._isPlaying)
				this.updateFrame(passtime);
		}

		public get frameHandler(): ListenerHandlers {
			if (this._frameHandler == null)
				this._frameHandler = new ListenerHandlers();
			return this._frameHandler;
		}

		public resetAndClear() {
			super.resetAndClear();
			this._currentPasstime = 0;
			this._speed = 1;
			this._angle = 0;
			this.stop();
			if (this._matrix) {
				this._matrix.identity();
				this.view.matrix = this._matrix;
			}
			// if(this.animator) {
			// 	this.animator.resetAndClear();
			// }
		}

		public dispose() {
			//yr_engine.core.utils.debug.stack.$_FunctionStackLog.intoStack("yr_engine.scene.effect::Effect /dispose()");
			super.dispose();
			this._matrix = null;
		}
	}
}
