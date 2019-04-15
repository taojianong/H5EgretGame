module fairui {

	/**
	 * 数字组件
	 * @author clong 2018.11.2
	 */
	export class UINumberItemComp extends fairui.BaseButton {

		private lab_num:fairygui.GTextField;
		private btn_add:fairui.EButton;
		private btn_red:fairui.EButton;

		private _minVal:number = 0;
		private _maxVal:number = 100;
		private _add:number = 1;

		private _addHandler:utils.Handler;
		private _redHandler:utils.Handler;
		private _changeHandler:utils.Handler;

		public constructor() {

			super();
		}

		public InitUI():void{

			super.InitUI();

			this.lab_num = this.getChild("title").asTextField;			
			this.lab_num.touchable = true;
		}

		public AddRootListener():void{

			super.AddRootListener();

			this.AddGameListener( egret.TouchEvent.TOUCH_TAP , this.touchAddHandler , this , this.btn_add );
			this.AddGameListener( egret.TouchEvent.TOUCH_TAP , this.touchRedHandler , this , this.btn_red );
			this.AddGameListener( egret.TouchEvent.TOUCH_TAP , this.touchLabHandler , this , this.lab_num );
			this.AddGameListener( UIGameEvent.CLICK_COUNTER , this.clickCounterHandler , this );
			
		}

		public RemoveRootListener():void{

			super.RemoveRootListener();

			this.RemoveGameListener( egret.TouchEvent.TOUCH_TAP , this.touchAddHandler , this , this.btn_add );
			this.RemoveGameListener( egret.TouchEvent.TOUCH_TAP , this.touchRedHandler , this , this.btn_red );
			this.RemoveGameListener( egret.TouchEvent.TOUCH_TAP , this.touchLabHandler , this , this.lab_num );
			this.RemoveGameListener( UIGameEvent.CLICK_COUNTER , this.clickCounterHandler , this );

		}

		private touchAddHandler( e:egret.TouchEvent ):void{

			let num:number = this.value;
			if( num + this._add > this._maxVal ){
				this.lab_num.text = this._maxVal +"";
			}else{
				this.lab_num.text = ""+( num + this._add );
			}
			if( this._addHandler != null ){
				this._addHandler.executeWith( [this.value] );
			}
			if( this._changeHandler != null ){
				this._changeHandler.executeWith( [this.value] );
			}
		}

		private touchRedHandler( e:egret.TouchEvent ):void{

			let num:number = this.value;
			if( num - this._add < this._minVal ){
				this.lab_num.text = this._minVal +"";
			}else{
				this.lab_num.text = "" + ( num - this._add );
			}
			if( this._redHandler != null ){
				this._redHandler.executeWith( [this.value] );
			}
			if( this._changeHandler != null ){
				this._changeHandler.executeWith( [this.value] );
			}
		}

		/**获取点击计算器的值 */
		private clickCounterHandler( e:UIGameEvent ):void{

			let item:any = e.data["item"];
			if( item != this ){
				return;
			}
			let index:number = e.data["index"];
			let str:string = this.lab_num.text;
			if( index < 10 ){
				str = str + index;
				if( parseInt(str) > this._maxVal ){
					str = this._maxVal.toString();
				}else if( parseInt(str) < this._minVal ){
					str = this._minVal.toString();
				}
				this.lab_num.text = str;
			}else if( index == 10 ){//确定
				if( !str ){
					str = this._minVal.toString();
				}
				this.lab_num.text = str;
			}else if( index == 11 ){//删除
				str = str.length > 0 ? str.substr( 0 , str.length -1 ) : "";
				if( parseInt(str) > this._maxVal ){
					str = this._maxVal.toString();
				}else if( parseInt(str) < this._minVal ){
					str = this._minVal.toString();
				}
				this.lab_num.text = str;
			}else if( index == 12 ){//最大
				this.lab_num.text = this._maxVal.toString();
			}			

			if( this._changeHandler != null ){
				this._changeHandler.executeWith( [this.value] );
			}
		}

		/**打开计算器 */
		private touchLabHandler( e:egret.TouchEvent ):void{

			UISystem.Inst.CreateWindowView( ui.UIStoreCounterView , {"min":this._minVal,"max":this._maxVal,"item":this} );
		}

		public set addValue( value:number ){

			this._add = value;
		}
		/**添加的值 */
		public get addValue():number{

			return this._add;
		}

		public set minVal( value:number ){

			this._minVal = value;
			if( this.value < this._minVal ){
				this.lab_num.text = this._minVal +"";
			}
		}
		/**最小值 */
		public get minVal():number{

			return this._minVal;
		}

		public set maxVal( value:number ){

			this._maxVal = value;
			if( this.value > this._maxVal ){
				this.lab_num.text = this._maxVal +"";
			}
		}
		/**最大值 */
		public get maxVal():number{

			return this._maxVal;
		}

		/**
		 * 设置默认值
		 * @param num 默认值
		 */
		public setDefault( num:number ):void{

			this.lab_num.text = num.toString();
		}

		public set addHandler( value:utils.Handler ){

			this._addHandler = value;
			value.isImmediatelyGc = false;
		}
		/**
		 * 按加按钮触发
		 */
		public get addHandler():utils.Handler{

			return this._addHandler;
		}

		public set redHandler( value:utils.Handler ){

			this._redHandler = value;
			value.isImmediatelyGc = false;
		}
		/**
		 * 按减按钮触发
		 */
		public get redHandler():utils.Handler{

			return this._redHandler;
		}

		public set changeHandler( value:utils.Handler ){

			this._changeHandler = value;
			value.isImmediatelyGc = false;
		}

		public get changeHandler():utils.Handler{

			return this._changeHandler;
		}

		public get value():number{

			let num:number = this.lab_num ? parseInt( this.lab_num.text ) : 0;
			return num;
		}

		public Destroy():void{

			super.Destroy();

			if( this._addHandler != null ){
				this._addHandler.gc();
			}
			if( this._redHandler != null ){
				this._redHandler.gc();
			}
			if( this._changeHandler != null ){
				this._changeHandler.gc();
			}
			this._addHandler = null;
			this._redHandler = null;
			this._changeHandler = null;
			this._maxVal = 0;
			this._minVal = 0;
		}
	}
}