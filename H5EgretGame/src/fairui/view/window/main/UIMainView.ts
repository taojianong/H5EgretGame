module fairui {

	/**
	 * 主界面
	 * @author clong 2019.4.21
	 */
	export class UIMainView extends UIBaseWindow{

		private btn_gm:EButton;

		public constructor() {

			super( "main" , "UIMainView" );
		}

		public initUI():void{

			super.initUI();
		}

		public addAllListener():void{

			super.addAllListener();

			this.addGameListener( egret.TouchEvent.TOUCH_TAP , this.touchGmHandler , this , this.btn_gm );
		}

		public removeAllListener():void{

			super.removeAllListener();
		}

		private touchGmHandler( e:egret.TouchEvent ):void{

			UISystem.Inst.createWindowView( UIGMView );
		}

		public onResize():void{

			super.onResize();

		}

		public clear():void{

			super.clear();
		}

		public dispose():void{

			super.dispose();
		}
	}
}