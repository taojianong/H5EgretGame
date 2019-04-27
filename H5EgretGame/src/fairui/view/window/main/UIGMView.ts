module fairui {

	/**
	 * GM主界面
	 * @author clong 2019.4.21
	 */
	export class UIGMView extends UIBaseWindow{

		private btn_play:EButton;
		private btn_play2:EButton;
		private btn_log:EButton;
		private btn_load:EButton;
		private btn_unload:EButton;
		private img_icon:UIBitmapIcon;
		private input_url:fairygui.GTextField;
		private txt_time:fairygui.GTextField;

		private img_icon2:UIBitmapIcon;
		private btn_load2:EButton;

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
			this.addGameListener( egret.TouchEvent.TOUCH_TAP , this.touchLoadHandler , this , this.btn_load );
			this.addGameListener( egret.TouchEvent.TOUCH_TAP , this.touchLoadHandler2 , this , this.btn_load2 );
			this.addGameListener( egret.TouchEvent.TOUCH_TAP , this.touchUnLoadHandler , this , this.btn_unload );
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

		/**
		 * 加载资源
		 */
		private touchLoadHandler( e:egret.TouchEvent ):void{

			this.img_icon.loadImage( this.input_url.text );
		}

		/**
		 * 加载资源
		 */
		private touchLoadHandler2( e:egret.TouchEvent ):void{

			this.img_icon2.loadImage( this.input_url.text );
		}

		private time:number = 0;
		/**
		 * 销毁资源
		 */
		private touchUnLoadHandler( e:egret.TouchEvent ):void{

			let _self:UIGMView = this;

			load.LoaderCache.destroyRes( this.input_url.text , true );

			this.time = load.LoaderCache.GC_TIME;
			this.txt_time.text = this.time + "";			
			Global.timer.doTimeLoop( 1000 , flash.bind( this.timeHander , this ) );
		}

		private timeHander():void{

			this.time--;
			this.txt_time.text = this.time + "";
			if( this.time <= 0 ){
				Global.timer.clearTimer( flash.bind( this.timeHander , this ) );
			}
		}
	}
}