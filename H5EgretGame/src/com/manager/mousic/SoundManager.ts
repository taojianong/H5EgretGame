module com.manager {
	export class SoundManager {

		private _playList: string[];

		private _playType: boolean = true;
		public set playType(value: boolean) {
			this._playType = value;
			if (this._playType) {
				App.timer.doFrameLoop(20, flash.bind(this.playSoundHandler, this));
			}
			else {
				App.timer.clearTimer(flash.bind(this.playSoundHandler, this));
			}
		}
		public get playType() {
			return this._playType;
		}
		
		public constructor() {
			this._playList = [];
			this.playType = true;
		}
		/**播放游戏音效*/
		
		public play(fileName: string) {
			if (this._playType && fileName && fileName != "") {
				if (this._playList.indexOf(fileName + ".mp3") == -1) {
					this._playList.push(fileName + ".mp3");
				}
			}
			//egret.ExternalInterface.call("playSound", fileName + ".mp3");
		}

		private playSoundHandler() {
			if (this._playList.length > 0) {
				let jsons:string = JSON.stringify(this._playList);
				egret.ExternalInterface.call("playSound", jsons);
				App.log.debug("开始播放音效" + jsons);
				this._playList = [];
			}
		}
	}
}