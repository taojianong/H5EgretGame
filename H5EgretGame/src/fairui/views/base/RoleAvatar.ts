module view.fight {

	/**
	 * 角色avatar,默认显示黑影
	 * @author clong 2019.3.23
	 */
	export class RoleAvatar extends base.Avatar {

		private _camps: number;
		public set camps(value: number) {
			this._camps = value;
			this._waitAvatar.texture = RES.getRes("heiying_png");
			this._waitAvatar.x = -this._waitAvatar.measuredWidth * 0.5;
			this._waitAvatar.y = -this._waitAvatar.measuredHeight;
		}

		public constructor() {
			super();
		}

		public init() {
			super.init();
			this.makeWaitAvatar();
		}

		protected onAddToStage(event: egret.Event) {
			super.onAddToStage(event);
			if (this._waitAvatar && !this._waitAvatar.parent)
				this.addChild(this._waitAvatar);
		}

		public dispose(type?: boolean) {
			super.dispose(type);
		}
	}
}