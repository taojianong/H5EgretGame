module fairui {
	/**
	 * 视频广告界面
	 * @author clong 2019.4.18
	 */
	export class UIAdVideoView extends fairui.UIBaseWindow {

		private cont: fairui.BaseSprite;
		private img_icon: fairui.UIBitmapIcon;
		private txt_time: fairygui.GTextField;
		private btn_detail: fairui.EButton;
		private btn_play: fairui.EButton;
		private btn_exit: fairui.EButton;
		private pro: fairygui.GGraph;

		private _video: ADVideo;// egret.Video;
		private _totalTime: number = 0;//视频时间总长,秒
		private _playTime: number = 0;
		private _isLoaded: boolean = false;//视频是否加载完成
		private _videoWidth: number = 0;
		private _videoHeight: number = 0;
		private proTime: number = 0;//进度毫秒数

		private url: string = "";
		private fullscreenUrl: string = "";
		private inlineUrl: string = "";

		public constructor() {

			super("common", "UIAdVideoView");
		}

		public initUI(): void {

			super.initUI();

			this.pro.width = 0;
		}

		public initData(data: any): void {

			super.initData(data);

			this.currentState = "normal";

			this._playTime = 0;
			this._isLoaded = false;
			this.btn_play.visible = false;
			this.btn_exit.visible = false;

			this.url = UrlUtil.getVideoAdUrl("trailer");
			this.fullscreenUrl = UrlUtil.getVideoAdImgUrl("posterfullscreen");
			this.inlineUrl = UrlUtil.getVideoAdImgUrl("posterinline");

			this.img_icon.loadImage(this.fullscreenUrl);

			let _self: UIAdVideoView = this;
			// LoadQueue.Inst.loadVideo( this.url , this.onVideoComplete , this );

			_self.loadVideo(_self.url, _self.fullscreenUrl, _self.inlineUrl);

			this.onResize();
		}

		public addAllListener(): void {

			super.addAllListener();

			this.addGameListener(egret.TouchEvent.TOUCH_TAP, this.touchDetailHandler, this, this.btn_detail);
			this.addGameListener(egret.TouchEvent.TOUCH_TAP, this.touchPlayHandler, this, this.btn_play);
			this.addGameListener(egret.TouchEvent.TOUCH_TAP, this.closeHandler, this, this.btn_exit);
		}

		/**
		 * 加载错误
		 */
		private onLoadErr(e: egret.Event): void {

			Notice.showMiddleMessage("---------------------------------加载视频错误------------------------------");
		}

		/**点击播放按钮 */
		private touchPlayHandler(e: egret.TouchEvent): void {

			this.btn_play.visible = false;
			this.play();
		}

		/**
		 * 加载视频
		 * @param url 视频地址
		 * @param fullscreenUrl 视频加载前全屏图片
		 * @param inlineUrl 视频截图图片
		 */
		private loadVideo(url: string, fullscreenUrl: string = "", inlineUrl: string = ""): void {

			if (this._video == null) {
				this._isLoaded = false;
				this._video = new ADVideo();// new egret.Video();
				// this._video.fullscreen = false;
				this.cont.addEgretChild(this._video);
				this._video.load(url, false);
				// this._video.addEventListener(egret.Event.COMPLETE, this.loadComplete, this);
				this._video.addEventListener(GameEvent.LOAD_COMPLETE, this.loadComplete, this);
				this._video.addEventListener(GameEvent.RENDER, this.renderPlayVideo, this);
				this._video.addEventListener(egret.Event.ENDED, this.videoPlayEnd, this);
				//监听视频加载失败
				this._video.once(egret.IOErrorEvent.IO_ERROR, this.onLoadErr, this);
			}
		}

		/**加载视频完成 */
		private loadComplete(e: any): void {//egret.Event

			this._isLoaded = true;
			this.img_icon.clear();
			this._video.removeEventListener(egret.Event.COMPLETE, this.loadComplete, this);
			this._video.removeEventListener(GameEvent.LOAD_COMPLETE, this.loadComplete, this);

			this._videoWidth = this._video.measuredWidth;
			this._videoHeight = this._video.measuredHeight;

			this.updateVideoXY();

			// this.play();
			this._video.videoCanplay();
			this.btn_play.visible = true;
			if (egret.Capabilities.isMobile) {//在桌面系统
				this.btn_exit.visible = true;
			}
		}

		/**
		 * 视频正在播放时
		 */
		private renderPlayVideo(e: GameEvent): void {

			let time: number = parseInt("" + e.data);

			this.setPlayTime(time);

			// Notice.showMiddleMessage("视频正在播放：" + time);
		}

		//播放
		private play(): void {

			// this._video.fullscreen = true;
			this._video.play(0, false);

			this.pro.width = 0;
			this._totalTime = this._playTime = parseInt("" + this._video.length);
			// this.setPlayTime( this._playTime );
			Global.timer.doTimeLoop(1000, flash.bind(this.updateTime, this));

			this.proTime = 0;
			Global.timer.doTimeLoop(1, flash.bind(this.updateProgress, this));
		}

		/**显示剩余时间 */
		private updateTime(): void {

			this._playTime--;

			// this.setPlayTime( this._playTime );

			if (this._playTime < 0) {
				fairygui.GTween.kill(this.pro, true);
				this.pro.width = this.bg.width;
				this.currentState = "complete";
				Global.timer.clearTimer(flash.bind(this.updateTime, this));
				Global.timer.clearTimer(flash.bind(this.updateProgress, this));

				this.onComplete();
			}
		}

		/**更新进度条 */
		private updateProgress(): void {

			let progress: number = this.proTime / (this._totalTime * 1000);
			progress = progress < 0 ? 0 : (progress > 1 ? 1 : progress);
			this.pro.width = this.bg.width * progress;
			this.proTime++;
		}

		private onUpdate(): void {

			let tw: fairygui.GTweener = fairygui.GTween.getTween(this.pro);
			if (tw != null) {
				this.pro.width = parseInt(tw.value.x + "");
			}
		}

		private setPlayTime(time: number): void {

			if (time >= 0) {
				this.txt_time.text = (this._totalTime - time) + "秒";
			} else {
				this.txt_time.text = "";
			}
		}

		/**视频播放完成 */
		private videoPlayEnd(): void {

			if (egret.Capabilities.isMobile) {
				if (egret.Capabilities.os == "Android") {
					Notice.showMiddleMessage("---------------------------------安卓播放完成------------------------------");
					this.onComplete();
				}
			}
		}

		//播放完成
		private onComplete(e: egret.Event = null): void {

			Notice.showMiddleMessage("---------------------------------播放完成------------------------------");

			this.currentState = "complete";
			//显示播放完成图片
			let fullscreenUrl: string = UrlUtil.getVideoAdImgUrl("posterfullscreen");
			this.img_icon.loadImage(fullscreenUrl);
			this.releaseVideo();
		}

		private releaseVideo(): void {

			if (this._video) {
				this._video.removeEventListener(egret.Event.COMPLETE, this.loadComplete, this);
				this._video.removeEventListener(egret.Event.ENDED, this.onComplete, this);
				this._video.close();
				this.cont.removeEgretChild(this._video);
				this._video = null;
			}
		}

		/**
		 * 点击详情按钮
		 */
		private touchDetailHandler(e: egret.TouchEvent): void {

			// TsToNative.sendToNative("showweb," + path);
		}

		/**更新视频坐标 */
		private updateVideoXY(): void {

			if (this._video != null && this._isLoaded) {

				let w: number = this._videoWidth;
				let h: number = this._videoHeight;
				let x: number = (this.bg.width - w) * 0.5;
				let y: number = (this.bg.height - h) * 0.5;
				x = parseInt("" + x);
				y = parseInt("" + y);
				this._video.setWH(w, h, x, y);

				this.updateProgress();
			}
		}

		public onResize(): void {

			super.onResize();

			this.bg.width = Global.stageWidth;
			this.bg.height = Global.stageHeight;
			this.updateVideoXY();
		}

		public clear(): void {

			super.clear();

			this.currentState = "normal";
			this.cont.removeChildren();
			// Notice.showMiddleMessage( "---------关闭视频广告播放界面." );
			this.releaseVideo();

			// this._pauseTime = 0;
			this._playTime = 0;
			this._totalTime = 0;
			this._isLoaded = false;
			this._videoWidth = 0;
			this._videoHeight = 0;
			this.pro.width = 0;
			this.proTime = 0;
			this.btn_play.visible = false;
			this.txt_time.text = "";

			Global.timer.clearTimer(flash.bind(this.updateTime, this));
			Global.timer.clearTimer(flash.bind(this.updateProgress, this));

			EventManager.dispatchEvent(GameEvent.END_PLAY_AD);
		}

		public dispose(): void {

			super.dispose();
		}
	}
}