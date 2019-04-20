module fairui {

	/**
	 * 输入文本框
	 * @author clong 2018.12.10
	 */
	export class UITextInput extends fairui.BaseButton  {

		private rect_bg: fairygui.GGraph;
		private titleTxt:fairygui.GTextInput;

		private _textColor:number = NaN;
		private _fillColor:number = NaN;
		private _fillAlpha:number = NaN;
		private _strokeColor:number = NaN;
		private _strokeAlpha:number = NaN;
		private _strokeWeight:number = NaN;

		public constructor() {

			super();
		}

		public setup_afterAdd( buffer: fairygui.ByteBuffer, beginPos: number ): void{

			super.setup_afterAdd( buffer , beginPos );

			if( this.rect_bg ){
				if( !isNaN(this._textColor) ){
					this.textColor = this._textColor;
				}
				this._fillColor = isNaN( this._fillColor ) ? this.rect_bg.color : this._fillColor;
				this._fillAlpha = isNaN( this._fillAlpha ) ? this.rect_bg["_fillAlpha"] : this._fillAlpha;
				this._strokeColor = isNaN( this._strokeColor ) ? this.rect_bg["_lineColor"] : this._strokeColor;
				this._strokeAlpha = isNaN( this._strokeAlpha ) ? this.rect_bg["_lineAlpha"] : this._strokeAlpha;
				this._strokeWeight = isNaN( this._strokeWeight ) ? this.rect_bg["_lineSize"] : this._strokeWeight;
				
				this.drawBg();
			}	
		}

		public initUI():void{

			super.initUI();

			this.rect_bg  = <fairygui.GGraph>this.getChild("icon");
			this.titleTxt = <fairygui.GTextInput>this.getChild("title");
		}

		public set textColor(value:number) {
			this._textColor = value;
			this.titleTxt.color = value;
		}
		/**设置文字颜色 */
		public get textColor():number {

			return isNaN( this._textColor ) ? 0x00ff00 : 0xffffff;
		}

		public set prompt(value:string) {
			this.titleTxt.promptText = value;
		}
		/**设置默认文字 */
		public get prompt():string {
			return this.titleTxt.promptText;
		}

		public set text( value:string ){

			this.titleTxt.text = value;
		}
		/**文本 */
		public get text():string{

			return this.titleTxt.text;
		}

		public set align( value:number ){

			this.titleTxt.align = value;
		}
		/**fairygui.AlignType */
		public get align():number{

			return this.titleTxt.align;
		}

		public set verticalAlign( value:number ){

			this.titleTxt.verticalAlign = value;
		}
		/**fairygui.VertAlignType */
		public get verticalAlign():number{
			
			return this.titleTxt.verticalAlign;
		}

		/**设置焦点 */
		public setFocus():void{

			fairygui.GRoot.inst.focus = this.titleTxt;
			let tf:egret.TextField = (<egret.TextField>this.titleTxt.displayObject);
			if( tf ){
				tf.$setSelection( tf.selectionEndIndex ,tf.selectionEndIndex );//焦点到文本最后
			}			
		}

		public set fillColor(value: number) {

			this._fillColor = value;
			if( this.rect_bg ){
				this.rect_bg.color = value;
			}			
		}
		/**填充颜色 */
		public get fillColor():number{

			return this._fillColor;
		}

		public set fillAlpha( value:number ){

			this._fillAlpha = value;
			if( this.rect_bg ){
				this.rect_bg.alpha = value;
			}
		}
		/**填充透明度 */
		public get fillAlpha():number{

			return this._fillAlpha;
		}

		public set strokeColor( value:number ){

			this._strokeColor = value;
			if(this.rect_bg){
				this.drawBg();
			}
		}
		/**边框颜色 */
		public get strokeColor():number{

			return this._strokeColor;
		}

		public set strokeAlpha( value:number ){

			this._strokeAlpha = value;
			if( this.rect_bg ){
				this.drawBg();
			}
		}
		/**边框线条透明度 */
		public get strokeAlpha():number{

			return this._strokeAlpha;
		}

		public set strokeWeight( value:number ){

			this._strokeWeight = value;
			if(this.rect_bg){
				this.drawBg();
			}			
		}
		/**线条粗细 */
		public get strokeWeight():number{

			return this._strokeWeight;
		}

		private drawBg():void{

			// this.rect_bg.graphics.clear();
			// this.rect_bg.graphics.lineStyle( this._strokeWeight  , this._strokeColor , this._strokeAlpha );
			// this.rect_bg.graphics.drawRect( 0 , 0 , this.width , this.height );
			// this.rect_bg.graphics.endFill();

			this.rect_bg["drawCommon"]();
		}
	}
}