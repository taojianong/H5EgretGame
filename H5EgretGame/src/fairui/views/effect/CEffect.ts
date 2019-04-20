module fairui {

	export class CEffect extends NetEffect {

		private _lastFrameHanderCallBack: Function;
		private _lastFrameParams: Array<any> = null;

		public initY: number = 0;

		public constructor() {
			super();
		}

		public checkMousePoint(): boolean {
			let bool: boolean = <any>false;
			//@TODO 未实现
			// if(this.view)
			// {
			// 	let color:number = flash.checkUint(this.view.getPixel32(this.view["mouseX"],this.view["mouseY"]));
			// 	if(color > 0)
			// 		bool = flash.tranint(color & 0xFF000000) > 30?true:false;
			// }
			return bool;
		}

		public get lastFrameHanderCallBack(): Function {
			return this._lastFrameHanderCallBack;
		}

		public set lastFrameHanderCallBack(value: Function) {
			this._lastFrameHanderCallBack = value;
		}

		public set lastFrameParams(value: Array<any>) {

			this._lastFrameParams = value;
		}
		/**最后一帧调用方法参数 */
		public get lastFrameParams(): Array<any> {

			return this._lastFrameParams;
		}

		public get resType(): number {
			return EnumLoader.RES;
		}

		// public set resType(value: number) {
		// 	egret.superSetter(CEffect, this, "resType", value);
		// }

		public play() {
			if (this._isPlaying == false)
				this.addToFrameController();
			super.play();
		}

		public stop() {
			this.removeToFrameController();
			super.stop();
		}

		protected addToFrameController() {
			EffectAdvanceTimeCenter.instance.addEffect(this);
		}

		protected removeToFrameController() {
			EffectAdvanceTimeCenter.instance.deleteEffect(this);
		}

		protected lastFrameHandler() {
			if (this._lastFrameHanderCallBack != null) {
				this._lastFrameHanderCallBack.apply(this, this._lastFrameParams);
			}
		}

		public resetAndClear() {
			this.removeToFrameController();
			this._lastFrameHanderCallBack = null;
			super.resetAndClear();
		}
	}

	class EffectAdvanceTimeCenter {
		public static _instance: EffectAdvanceTimeCenter;
		public static get instance(): EffectAdvanceTimeCenter {
			if (EffectAdvanceTimeCenter._instance == null)
				EffectAdvanceTimeCenter._instance = new EffectAdvanceTimeCenter();
			return EffectAdvanceTimeCenter._instance;
		}

		private _effectHash: flash.Dictionary = new flash.Dictionary();
		private _isStart: boolean = false;
		private _gapTime: number = 0;

		public constructor() {
		}

		public addEffect(data: NetEffect) {

			this._effectHash.setItem(data, data);
			if (this._isStart == false) {
				Global.timer.doFrameLoop(1, flash.bind(this.onEnterFrame, this));
				this._isStart = true;
			}
		}

		private onEnterFrame() {

			let time: number = Global.timer.frametime;
			this._gapTime += time;
			if (this._gapTime > 50) {
				this._effectHash.forEach(function (key: any, data: NetEffect) {
					data.addvanceTime(this._gapTime);
				}, this);
				// for (let data_key_a in this._effectHash.dict) {
				// 	let data: NetEffect = this._effectHash.dict[data_key_a];
				// 	data.addvanceTime(this._gapTime);
				// }
				this._gapTime = 0;
			}
		}

		public deleteEffect(data: NetEffect) {

			this._effectHash.delItem(data);
		}

	}
}
