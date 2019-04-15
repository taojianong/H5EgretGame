module fairui {

	/**
	 * 文本标签
	 * @author clong 2019.2.20
	 */
	export class UILabel extends fairui.BaseSprite{

		private _txt:fairygui.GTextField;

		public constructor() {

			super();
		}

		protected constructExtension(buffer: fairygui.ByteBuffer): void {

			super.constructExtension(buffer);
			
        }

		protected constructFromXML(xml: any): void {

			super.constructFromXML(xml);

			this._txt = <fairygui.GTextField>this.getChild("title");
		}

		/**设置文本，可为多语言标签 */
		public setText(text: string): void {
			
			this.text = Global.lang.getLang(text) || text;
		}

		/**原生组件 */
		public get txt():egret.TextField{

			return <egret.TextField>this._txt["_textField"];
		}

		public set htmlText(value: string) {

			this.text = value;
		}
		/**设置HTML文本 */
		public get htmlText(): string {

			return this._txt.text;
		}

		public set text( value:string ){

			this._txt.text = value;
		}

		public get text():string{

			return this._txt.text;
		}

		public set fontSize( value:number ){

			this._txt.fontSize = value;
		}

		public get fontSize():number{

			return this._txt.fontSize;
		}

		public set color( value:number ){

			this._txt.color = value;
		}

		public get color():number{

			return this._txt.color;
		}

		public set font( value:string ){

			this._txt.font = value;
		}

		public get font():string{

			return this._txt.font;
		}

		public set align( value:number ){

			this._txt.align = value;
		}

		public get align():number{

			return this._txt.align;
		}

		public set verticalAlign( value:number ){

			this._txt.verticalAlign = value;
		}
		
		public get verticalAlign():number{

			return this._txt.verticalAlign;
		}

		public set singleLine( value:boolean ){

			this._txt.singleLine = value;
		}	
		/**是否为多行 */
		public get singleLine():boolean{

			return this._txt.singleLine;
		}

		public get textWidth():number{

			return this._txt.textWidth;
		}

		public get textHeight():number{

			return this._txt.height;
		}
	}
}