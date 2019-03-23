module fairui {

	import Animator = base.Animator;
	
	export class Animation implements IDispose {

		public constructor() {
			this.init();
		}

		protected init() {
			this._animatorDict = new flash.Dictionary();
		}

		public getAnimator(action: string, fiveDir: number): Animator {
			if (this._animatorDict.getItem(action))
				return (flash.As3As(this._animatorDict.getItem(action), flash.Dictionary)).getItem(fiveDir);
			return null;
		}

		public addAnimator(action: string, fiveDir: number, animator: Animator) {
			let dict: flash.Dictionary = flash.As3As(this._animatorDict.getItem(action), flash.Dictionary);
			if (dict == null)
				this._animatorDict.setItem(action, dict = new flash.Dictionary());
			dict.setItem(fiveDir, animator);
		}

		public get isDispose(): boolean {
			return this._isDispose;
		}

		public dispose() {
			for (let dict_key_a in this._animatorDict.map) {
				let dict: flash.Dictionary = this._animatorDict.map[dict_key_a][1];
				for (let animator_key_a in dict.map) {
					let animator: Animator = dict.map[animator_key_a][1];
					animator.dispose();
				}
			}
			this._animatorDict = null;
			this._isDispose = true;
		}

		private _isDispose: boolean = false;
		private _animatorDict: flash.Dictionary;
	}
}