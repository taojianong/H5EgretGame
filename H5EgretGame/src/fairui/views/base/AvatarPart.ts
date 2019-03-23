module base {
	export class AvatarPart extends base.FramePlayer {

		private _action: string;
		protected get action(): string {
			return this._action;
		}

		private _dir: number = 0;
		protected get dir(): number {
			return this._dir;
		}

		private _partType: number = -1;

		public set partType(value: number) {
			this._partType = value;
		}

		public get partType(): number {
			return this._partType;
		}

		public constructor(type: number) {
			super();
			this._partType = type;
		}

		protected init() {
			super.init();
		}

		public checkContainPoint(): boolean {
			return false;//(flash.As3As(this.view, yr_engine.core.display.InteractiveBitmap)).checkMousePoint();
		}

		public changeAnimator(action: string, dir: number): boolean {
			if (this._action != action || this._dir != dir) {
				this._action = action;
				this._dir = dir;
				return true;
			}
			return false;
		}

		public clearActionAndDir() {
			this._dir = -1;
			this._action = null;
			this.resetAndClear();
		}

		public dispose() {
			this._partType = -1;
			super.dispose();
		}
	}
}