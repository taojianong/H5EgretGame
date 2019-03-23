module fairui {
	export class GameEffect extends egret.Sprite {
		private _effect: CEffect;
		public get effect(): CEffect {
			return this._effect;
		}

		private _playing: boolean = false;
		/**是否允许资源缓存：默认值true-该动画资源会一直缓存再内存中，除非手动删除该资源；false-会在下次动画资源回收时被释放*/
		public get isCache(): boolean {
			return this._effect.isCache;
		}
		public set isCache(value: boolean) {
			this._effect.isCache = value;
		}

		public constructor() {
			super()
			let _self__: GameEffect = this;
			_self__._effect = new CEffect();
			_self__._effect.father = _self__;
			_self__.addChild(_self__._effect.view);
			_self__.touchEnabled = false;
			_self__.touchChildren = false;
		}

		public get lastFrameHanderCallBack(): Function {
			return this._effect.lastFrameHanderCallBack;
		}

		public set lastFrameHanderCallBack(value: Function) {
			this._effect.lastFrameHanderCallBack = value;
		}

		public set lastFrameParams(value: Array<any>) {

			this._effect.lastFrameParams = value;
		}
		/**最后一帧执行方法参数 */
		public get lastFrameParams(): Array<any> {

			return this._effect.lastFrameParams;
		}

		public set url(value: string) {
			this._effect.url = value;
		}

		public get url(): string {
			return this._effect.url;
		}

		public palyOnceStop() {
			this._effect.lastFrameHanderCallBack = this.onPlayComplete;// new Handler("game::GameEffect /palyOnceStop()", flash.bind(this.onPlayComplete, this));
			this.restart();
		}

		private onPlayComplete() {
			this.stop();
			App.timer.doTimeOnce(2000, flash.bind(this.onEnterFrame, this));
		}

		private onEnterFrame() {
			this.palyOnceStop();
		}

		public play(): void {
			if (!this._playing) {
				this._playing = true;
				this._effect.play();
			}
		}

		public stop(): void {
			if (this._playing) {
				this._playing = false;
				this._effect.stop();
			}
		}

		public restart() {
			this._effect.restart();
			this.play();
		}

		public move($x: number, $y: number, $parent: egret.DisplayObjectContainer = null) {
			this.x = $x;
			this.y = $y;
			if ($parent != null) {
				$parent.addChild(this);
			}
		}

		public playOnce(fun: Function = null, params: Array<any> = null) {
			this._effect.lastFrameParams = params;
			this._effect.lastFrameHanderCallBack = fun || flash.bind(this.onComplete, this);// new Handler("GameEffect/playOnce()", (fun != null ? fun : flash.bind(this.onComplete, this)));
			this.restart();
		}

		private onComplete() {

			this.dispose();
		}

		public get currentIndex(): number {
			return this._effect.currentIndex;
		}

		public clear() {
			App.timer.clearTimer(flash.bind(this.onEnterFrame, this));
			this.stop();
			this._effect.restart();
			this._effect.url = "";
		}

		public dispose() {

			App.timer.clearTimer(flash.bind(this.onEnterFrame, this));
			this.stop();
			if (this.parent != null) {
				this.parent.removeChild(this);
			}
			if (this._effect) {
				this._effect.dispose();
				this._effect = null;
			}
		}

		public get width(): number {
			return this._effect.view.width;
		}

		public get height(): number {
			return this._effect.view.height;
		}
	}
}