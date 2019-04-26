module fairui {

	/**
	 * 掌阅Video播放器
	 * @author clong 2019.4.24
	 */
	export class UIZYPlayerView extends UIBaseWindow{

		private btn_play:fairui.EButton;
		private txt_name:fairygui.GTextField;
		private txt_time:fairygui.GTextField;

		private _video:ZYVideo;

		private url: string = "";
		private fullscreenUrl: string = "";
		private inlineUrl: string = "";

		/**是否为错误播放  */
		private isError:boolean = false;

		public constructor() {
			super("common","UIZYPlayerView");
		}

		public initUI():void{

			super.initUI();
		}

		public initData( data:any ):void{

			super.initData( data );

			if( this._video == null ){
				let video = document.querySelector('video');
				this._video = new ZYVideo( video );
			}

			this.url = UrlUtil.getVideoAdUrl("trailer");
			this.fullscreenUrl = UrlUtil.getVideoAdImgUrl("posterfullscreen");
			this.inlineUrl = UrlUtil.getVideoAdImgUrl("posterinline");

			this.play();
		}

		public addAllListener():void{

			super.addAllListener();

			this._video.addVideoEventListener( "ended" ,  this.videoPlayEnd , this );
			this._video.addVideoEventListener( "canplay" , this.videoCanPlay , this );
			this._video.addEventListener( GameEvent.RENDER , this.updateVideoTime , this );
			this._video.addEventListener( egret.Event.COMPLETE , this.loadVideoComplete , this );

			this.addGameListener( egret.TouchEvent.TOUCH_TAP , this.touchPlayHandler , this , this.btn_play );
		}

		public removeAllListener():void{

			super.removeAllListener();

			this._video.removeVideoEventListener( "ended" ,  this.videoPlayEnd , this );
			this._video.removeVideoEventListener( "canplay" , this.videoCanPlay , this );
			this._video.removeEventListener( egret.Event.COMPLETE , this.loadVideoComplete , this );
			this._video.removeEventListener( GameEvent.RENDER , this.updateVideoTime , this );
		}

		private touchPlayHandler():void{

			let div:HTMLDivElement = <HTMLDivElement>document.getElementsByClassName("zy_media")[0];
			div.style['display'] = "";

			this._video.play();
		}

		public play():void{

			this._video.load( this.url );
			this.btn_play.enabled = false;
		}
		
		/**
		 * 视频加载完成
		 */
		private videoCanPlay():void{

			this.onResize();

			//this._video.play();
		}

		/**
		 * 加载视频完成
		 */
		private loadVideoComplete( e:egret.TouchEvent ):void{

			// this._video.play();

			this.btn_play.enabled = true;
			this.txt_time.text = this._video.totalTime + "秒";
		}
		
		/**
		 * 视频播放完成
		 */
		private videoPlayEnd( e ):void{

			this.isError = false;

			// UISystem.Inst.removeWindowClass(this.getCls());
			let div:HTMLDivElement = <HTMLDivElement>document.getElementsByClassName("zy_media")[0];
			div.style['display'] = "none";
		}

		/**
		 * 更新播放时间
		 */
		private updateVideoTime( e:GameEvent ):void{


		}

		public onResize():void{

			super.onResize();

			if( this._video ){
				this._video.resize();
			}  
		}

		protected closeHandler( e: egret.TouchEvent ):void{

			this.isError = true;

			super.closeHandler( e );
		}

		public clear():void{

			super.clear();

			this._video.stop();

			let div:HTMLDivElement = <HTMLDivElement>document.getElementsByClassName("zy_media")[0];
			div.style['display'] = "none";

			EventManager.dispatchEvent( GameEvent.END_PLAY_AD , this.isError );
		}

		public dispose():void{

			super.dispose();
			if( this._video != null ){
				this._video.dispose();
				this._video = null;
			}
		}
	}
}