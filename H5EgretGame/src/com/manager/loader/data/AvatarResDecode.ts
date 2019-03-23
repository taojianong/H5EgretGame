module com.loader {
	export class AvatarResDecode {
		private _ani: base.AysncAnimator;
		private _isDispose: boolean = false;
		private _onFinish: Function;
		private _onFail: Function;
		private _isCache: boolean = false;
		public constructor() {
		}

		public get ani(): base.Animator {
			return this._ani;
		}

		public parser(bytes: egret.ByteArray, url: any, onFinish: Function, onFail: Function, isCache: boolean) {
			egret.callLater(function callParse(bytes: egret.ByteArray, url: any, onFinish: Function, onFail: Function, isCache: boolean) {
				try {
					this._isDispose = false;
					this._onFinish = onFinish;
					this._onFail = onFail;
					this._isCache = isCache;
					if (bytes) {
						let _zip: JSZip = new JSZip(bytes.buffer);
						let strList: string[] = url.split("/");
						let fileName: string = strList[strList.length - 1].split(".")[0];
						let jsonTxt: string = _zip.file(fileName + ".json").asText();
						// let test:egret.ByteArray = new egret.ByteArray();
						//  bytes.readBytes(test,test.position,test.length - test.position);
						let buffer: ArrayBuffer = _zip.file(fileName + ".png").asArrayBuffer();
						egret.BitmapData.create("arraybuffer", buffer, (value: egret.BitmapData) => {
							if (!this.isDispose) { //因为这个方法是异步的，所以该对象有可能被释放了
								let texture: egret.Texture = new egret.Texture();
								texture.bitmapData = value;
								let movieClipDataSet: any = JSON.parse(jsonTxt);
								this._ani = this.getAnimator();
								this._ani.findFromCache(movieClipDataSet, texture);
								this._ani.isCache = this._isCache;
								this.onComplete();
							}
						});
						// let texture: egret.Texture = new egret.Texture();
						// texture.bitmapData = egret.BitmapData.create("arraybuffer", buffer);
						// let movieClipDataSet: any = JSON.parse(jsonTxt);
						// this._ani = this.getAnimator();
						// this._ani.findFromCache(movieClipDataSet, texture);
						// this.onComplete();
					}
					else
						this.onError();
				}
				catch (e) {
					App.log.error("AvatarResDecode.parser:", e)
					this.onError();
				}
			}, this, bytes, url, onFinish, onFail, isCache);
			// try {
			// 	this._isDispose = false;
			// 	this._onFinish = onFinish;
			// 	this._onFail = onFail;
			// 	this._isCache = isCache;
			// 	if (bytes) {
			// 		let _zip: JSZip = new JSZip(bytes.buffer);
			// 		let strList: string[] = url.split("/");
			// 		let fileName: string = strList[strList.length - 1].split(".")[0];
			// 		let jsonTxt: string = _zip.file(fileName + ".json").asText();
			// 		// let test:egret.ByteArray = new egret.ByteArray();
			// 		//  bytes.readBytes(test,test.position,test.length - test.position);
			// 		let buffer: ArrayBuffer = _zip.file(fileName + ".png").asArrayBuffer();
			// 		egret.BitmapData.create("arraybuffer", buffer, (value: egret.BitmapData) => {
			// 			if (!this.isDispose) { //因为这个方法是异步的，所以该对象有可能被释放了
			// 				let texture: egret.Texture = new egret.Texture();
			// 				texture.bitmapData = value;
			// 				let movieClipDataSet: any = JSON.parse(jsonTxt);
			// 				this._ani = this.getAnimator();
			// 				this._ani.findFromCache(movieClipDataSet, texture);
			// 				this._ani.isCache = this._isCache;
			// 				this.onComplete();
			// 			}
			// 		});
			// 		// let texture: egret.Texture = new egret.Texture();
			// 		// texture.bitmapData = egret.BitmapData.create("arraybuffer", buffer);
			// 		// let movieClipDataSet: any = JSON.parse(jsonTxt);
			// 		// this._ani = this.getAnimator();
			// 		// this._ani.findFromCache(movieClipDataSet, texture);
			// 		// this.onComplete();
			// 	}
			// 	else
			// 		this.onError();
			// }
			// catch (e) {
			// 	App.log.error("AvatarResDecode.parser:", e)
			// 	this.onError();
			// }
		}

		private onError() {
			//yr_engine.core.utils.debug.stack.$_FunctionStackLog.intoStack("com.core.loader.decode::AvatarResDecode /onError()");
			if (this._onFail)
				this._onFail.apply(this._onFail["owner"]);
			this.dispose();
		}

		private onComplete() {
			if (this._onFinish)
				this._onFinish.apply(this._onFinish["owner"], [this.ani]);
			this.dispose();
		}

		protected getAnimator(): base.AysncAnimator {
			return new base.AysncAnimator();
		}

		public get isDispose(): boolean {
			return this._isDispose;
		}

		public dispose() {
			this._isDispose = true;
			this._onFinish = null;
			this._onFail = null;
			this._ani = null;
		}
	}
}