module fairui {

	/**
	 * 掌阅播放器
	 * @author clong 2019.4.23
	 */
	export class UIAdVideoView2 extends fairui.UIBaseWindow {

		private btn_play:fairui.EButton;

		private _video:HTMLVideoElement;

		private url: string = "";
		private fullscreenUrl: string = "";
		private inlineUrl: string = "";

		public constructor() {

			super( "common" , "UIAdVideoView2" );
		}

		public initUI():void{

			super.initUI();

			this._video = document.querySelector('video');
		}

		public addAllListener():void{

			super.addAllListener();

			this.addGameListener(egret.TouchEvent.TOUCH_TAP, this.touchPlayHandler, this, this.btn_play);

			this._video.addEventListener("ended",flash.bind(this.onPlayEnd , this ) );
		}

		public removeAllListener():void{

			super.removeAllListener();

			this._video.removeEventListener("ended",flash.bind(this.onPlayEnd , this ) );
		}

		/**点击播放按钮 */
		private touchPlayHandler(e: egret.TouchEvent): void {

			this.btn_play.visible = false;
			if( this._video ){
				this.url = UrlUtil.getVideoAdUrl("trailer");
				this.fullscreenUrl = UrlUtil.getVideoAdImgUrl("posterfullscreen");
				this.inlineUrl = UrlUtil.getVideoAdImgUrl("posterinline");

				let div = <HTMLDivElement>document.getElementsByClassName("zy_media")[0];
				div.style['display'] = "";
				div.style['top'] = "10px";

				this._video.poster = this.inlineUrl;
				this._video.setAttribute("mediaTitle","test");
				this._video.src = this.url;
				this._video.play();
			}
		}

		/**
		 * 播放完成
		 */
		private onPlayEnd( e:any ):void{

			this.close();
		}

		public onResize():void{

			super.onResize();

			let scale:number = Global.stageWidth / this._video.videoWidth;
			let h:number = this._video.videoHeight * scale;
			let y:number = Math.floor( ( Global.stageHeight - h ) * 0.25 );
			let div = <HTMLDivElement>document.getElementsByClassName("zy_media")[0];
			div.style['top'] = y + "px";
		}

		public clear():void{

			super.clear();

			if( this._video != null ){
				this._video.pause();
				this._video.src = "";

				let div = <HTMLDivElement>document.getElementsByClassName("zy_media")[0];
				div.style['display'] = "none";
			}
		}

		public dispose():void{

			super.dispose();
		}
	}
}