module fairui {

	export class EffectBitmap extends base.GBitmap {

		private _fatherEffect: Effect;
		public constructor(father: Effect) {
			super();
			this._fatherEffect = father;
		}

		public get father(): Effect {
			return this._fatherEffect;
		}

		public dispose() {
			this._fatherEffect = null;
		}
	}
}
