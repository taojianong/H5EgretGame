module fairui {
	export class BaseGroup extends BaseSprite {

		protected view: fairygui.GComponent;
		/**包名 */
		protected _pkgName: string;
		/**类名 */
		protected _resName: string;

		public constructor(pkgName: string, resName: string) {
			super();
			this._pkgName = pkgName;
			this._resName = resName;
			this.init();
		}

		protected init() {
			let obj: any = fairygui.UIPackage.createObject(this._pkgName, this._resName);
			this.view = obj.asCom;
			this.addChild(this.view);
			FairyUtils.setVar(this.view, this);
		}
	}
}