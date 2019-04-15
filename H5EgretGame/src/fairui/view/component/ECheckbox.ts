module fairui {
	export class ECheckbox extends fairui.BaseButton {

		protected _function: Function;
		protected _thisObj: any;

		public constructor() {

			super();
		}

		public selectFunction(func: Function, thisObj: any) {
			this._function = func;
			this._thisObj = thisObj;
		}

		public set selected(value: boolean) {
			egret.superSetter(fairui.ECheckbox, this, "selected", value);
			if (this._function && this._thisObj) {
				this._function.call(this._thisObj, this.selected);
			}
		}

		public get selected(): boolean {

			return egret.superGetter(fairui.ECheckbox, this, "selected");
		}
	}
}