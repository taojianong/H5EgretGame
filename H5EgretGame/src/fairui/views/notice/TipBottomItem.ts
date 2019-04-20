module fairui {

	/**
	 * Tip条目显示
	 * @author cl 2018.5.17
	 */
	export class TipBottomItem extends BaseButton {

		private static pool:Array<TipBottomItem> = [];

		public static create():TipBottomItem{

			let item:TipBottomItem = TipBottomItem.pool.shift();
			if( item == null ){
				item = PanelRegister.createGObject("common", "TipBottomItem");
			}
			item.create();
			return item;
		}

		public static recover( item:TipBottomItem ):void{

			if( item && TipBottomItem.pool.indexOf(item) == -1 ){
				item.clear();
				TipBottomItem.pool.push( item );
			}
		}

		//----------------------------------------------

		public constructor() {

			super();
		}

		public create():void{

			this.alpha = this.scaleX = this.scaleY = 1;
		}

		public initUI(): void {

			super.initUI();
		}

		public show(value: any): void {

			super.show(value);

			if( this._titleObject != null ){
				this._titleObject.text = value;
			}
		}

		/**显示文本 */
		public get text(): string {

			return this._titleObject && this._titleObject.text;
		}

		public hide(): void {

			super.hide();

			this._titleObject.text = "";
		}

		public clear():void{

			super.clear();

			this.hide();
		}

		public recover():void{

			super.recover();
			if( this.parent != null ){
				this.parent.removeChild( this );
			}
			TipBottomItem.recover( this );
		}

		public dispose(): void {

			super.dispose();
		}
	}
}