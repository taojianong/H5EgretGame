/**
 * 掌阅播放器复写
 * @author clong 2019.4.24
 */
class ZYVideo extends zyMedia.MediaPlayer{

	private _video:HTMLVideoElement;
	private divEle:HTMLDivElement;

	private eventObj:egret.EventDispatcher = new egret.EventDispatcher();

	/**总时长,秒 */
	private _totalTime:number = 0;

	public constructor( media,option? ) {

		super( media , option  );

		if( media instanceof HTMLVideoElement ){
			this._video = media;
		}
		this.divEle = <HTMLDivElement>document.getElementsByClassName("zy_media")[0];
	}

	public init():void{

		super.init();
	}
	
	public buildTotalTime():void{

		// this._totalTime = this._video.duration;
		// t.durationDuration = time;
		// this.eventObj.dispatchEvent( new egret.Event( egret.Event.COMPLETE ) );
	}

	public loadComplete():void{

		if( this._video ){
			this._totalTime = parseInt(""+ this._video.duration);
			this.eventObj.dispatchEvent( new egret.Event( egret.Event.COMPLETE ) );
		}
	}

	public get totalTime():number{

		return this._totalTime;
	}

	public buildContainer():void{

		var t = this;
		t["container"] = t._video.parentNode;
		t["container"].style.overflow = 'hidden';

		t["width"] = t["options"].videoWidth;
		t["height"] = t["options"].videoHeight;

		if ( t["width"] == '100%' && t["height"] == 'auto') {
			t["enableAutoSize"] = true
		}
		t.setPlayerSize( t["width"] , t["height"] );
	}

	public updateTime():void{

		if( this._video ){
			this.eventObj.dispatchEvent( new GameEvent(GameEvent.RENDER , this._video.currentTime )  );
		}
	}

	public load( url:string ):void{

		if( this._video ){
			this._video.src = url;
		}
	}

	public play():void{

		if( this._video ){
			this._video.play();
			this.eventObj.dispatchEvent( new GameEvent(GameEvent.PLAY_AD) );
		}
	}

	public stop():void{

		if( this._video ){
			this._video.pause();
			this._video.src = "";
		}
	}

	public addVideoEventListener( type:string , listener:Function , thisObject:any ):void{

		if( this._video ){
			this._video.addEventListener( type , flash.bind( listener , thisObject ) );
		}
	}

	public removeVideoEventListener( type:string , listener:Function , thisObject:any ):void{

		if( this._video ){
			this._video.removeEventListener( type , flash.bind( listener , thisObject ) );
		}
	}

	public addEventListener( type:string , listener:Function , thisObject:any ):void{

		if( this.eventObj ){
			this.eventObj.addEventListener( type , listener , thisObject );
		}
	}

	public removeEventListener( type:string , listener:Function , thisObject:any ):void{

		if( this.eventObj ){
			this.eventObj.removeEventListener( type , listener , thisObject );
		}
	}


	public setMediaTitle( title:string ):void{

		if( this.options ){
			this.options["mediaTitle"] = title;
		}
	}

	public showControls():void{


	}

	public hideControls():void{


	}

	/**
	 * 进入全屏
	 */
	public enterFullScreen():void{

		super.exitFullScreen();
	}

	/**
	 * 退出全屏
	 */
	public exitFullScreen():void{

		super.exitFullScreen();
	}

	public get videoWidth():number{

		return this._video.videoWidth;
	}

	public get videoHeight():number{

		return this._video.videoHeight;
	}

	/**
	 * 设置距离顶部距离
	 */
	public set top(value:number){

		this._video.style.top = value + "px";
	}

	/**
	 * 自适应
	 */
	public resize():void{

		let gap:number = 100;
		var bodyHeight = document.documentElement.clientHeight;
		var bodyWidth = document.documentElement.clientWidth;
		if( this._video ){
			var scale = ( bodyWidth - gap ) / this._video.videoWidth ;
			var h = this._video.videoHeight * scale;
			var cy = Math.floor( bodyHeight - h ) * 0.5;

			this._video.style.width = (bodyWidth - gap ) + "px";
			this._video.style.height = h + "px";
			this._video.style.left = Math.floor(gap*0.5) + "px";
			this._video.style.top = cy + "px";
		}
	}

	public dispose():void{

		this.stop();

		this._video = null;
	}
}