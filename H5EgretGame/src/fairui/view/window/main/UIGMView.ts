module fairui {

	/**
	 * GM主界面
	 * @author clong 2019.4.21
	 */
	export class UIGMView extends UIBaseWindow{

		private btn_play:EButton;
		private btn_play2:EButton;
		private btn_log:EButton;

		public constructor() {

			super( "common" , "UIGMView" );
		}
		
		public initUI():void{

			super.initUI();
		}

		public initData( data:any ):void{

			super.initData( data );

			this.currentState = "normal";
		}

		public addAllListener():void{

			super.addAllListener();

			this.addGameListener( egret.TouchEvent.TOUCH_TAP , this.touchPlayHandler , this , this.btn_play );
			this.addGameListener( egret.TouchEvent.TOUCH_TAP , this.touchPlay2Handler , this , this.btn_play2 );
			this.addGameListener( egret.TouchEvent.TOUCH_TAP , this.touchLogHandler , this , this.btn_log );
		}

		public removeAllListener():void{

			super.removeAllListener();
		}

		private touchPlayHandler( e:egret.TouchEvent ):void{

			UISystem.Inst.createWindowView( UIAdVideoView );
		}

		private touchPlay2Handler( e:egret.TouchEvent ):void{

			UISystem.Inst.createWindowView( UIZYPlayerView );
		}

		private touchLogHandler( e:egret.TouchEvent ):void{

			if( this.currentState == "normal" ){
				this.currentState = "log";
			}else{
				this.currentState = "normal";
			}
		}
	}
}