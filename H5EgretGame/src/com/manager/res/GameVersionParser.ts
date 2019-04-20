module com.manager {
	/**资源解析器 */
	export class GameVersionParser {
		private _versonListLeng: number = 0;
		private _resVerList: Array<any>;
		private _crtIndex: number = 0;
		private _resVerHash: flash.Dictionary;
		private _resVerToOrgenHash: flash.Dictionary;
		private _resVersionObj: any;
		private _callBack: Function;
		private _parmas: Array<any>;
		public constructor() {
			this._resVerHash = new flash.Dictionary();
			this._resVerToOrgenHash = new flash.Dictionary();
		}

		/**获取版本号 */
		public getVersionPath(url: string): string {
			let versonUrl: string = <string>this._resVerHash.getItem(url);
			if (versonUrl) {
				return versonUrl;
			}
			return url;
		}

		public getOrigenPath(versonUrl: string): string {
			let oUrl: string = <string>this._resVerToOrgenHash.getItem(versonUrl);
			if (oUrl) {
				return oUrl;
			}
			return versonUrl;
		}

		public start(packDataBuffer: ArrayBuffer, callBack: Function = null, parmas: Array<any> = null) {
			let packData: egret.ByteArray = new egret.ByteArray(packDataBuffer);
			this._callBack = callBack;
			this._parmas = parmas;
			if (packData) {
				packData.position = 0;
				egret.log(packData.length);
				let length_type: number = flash.checkInt(packData.readInt());
				if (length_type <= 0 || length_type >= 0x0000ffff) {
					let configVer_1: string = packData.readUTFBytes(20);
					egret.log("游戏资源版本打包(java)：resourceCfg\n版本号:" + configVer_1);
					EventManager.dispatchEvent(LoginEvent.SHOW_INIT_GAME_PROGRESS, Global.lang.getLang("lang_client_732") + configVer_1);

					let configData_1: egret.ByteArray = new egret.ByteArray();
					packData.readBytes(configData_1, 0, 0);

					var inflate1: Zlib.Inflate = new Zlib.Inflate(configData_1.bytes);
					var outbuffer1: Uint8Array = inflate1.decompress();
					var outBytes1: egret.ByteArray = new egret.ByteArray(outbuffer1.buffer);
					this._resVersionObj = outBytes1.readUTFBytes(outBytes1.length);

					this.readFileVersionData();
				}
				else {
					let leng: number = flash.checkInt(length_type);
					let configVer_2: string = packData.readUTFBytes(leng);
					egret.log("游戏资源版本打包：resourceCfg\n版本号:" + configVer_2);
					EventManager.dispatchEvent(LoginEvent.SHOW_INIT_GAME_PROGRESS, Global.lang.getLang("lang_client_735") + configVer_2);

					let configData_2: egret.ByteArray = new egret.ByteArray();
					packData.readBytes(configData_2, 0, 0);

					var inflate2: Zlib.Inflate = new Zlib.Inflate(configData_2.bytes);
					var outbuffer2: Uint8Array = inflate2.decompress();
					var outBytes2: egret.ByteArray = new egret.ByteArray(outbuffer2.buffer);
					this._resVersionObj = outBytes2.readUTFBytes(outBytes2.length);

					this.readFileVersionData();
				}
			}
			else {
				if (!Config.isDebug) {
					EventManager.dispatchEvent(LoginEvent.SHOW_INIT_GAME_PROGRESS, Global.lang.getLang("lang_client_736"));
				}
				else {
					this.readFinish();
				}
			}
		}

		private readDirVersionData() {
			this._resVerList = [];
			for (let versonData_key_a in this._resVersionObj) {
				let versonData: string = this._resVersionObj[versonData_key_a];
				let list: Array<any> = versonData.split(/\n/gi);
				this._resVerList = this._resVerList.concat(list);
			}
			this._versonListLeng = this._resVerList.length;
			this.startRead();
		}

		private readFileVersionData() {
			this._resVerList = [];
			let versonData: string = <string>this._resVersionObj;
			let list: Array<any> = versonData.split(/\n/gi);
			this._resVerList = this._resVerList.concat(list);
			this._versonListLeng = this._resVerList.length;
			this.startRead();
		}

		private startRead() {
			this.readVersion();
		}

		private readVersion(e: egret.Event = null) {
			var leng: number = this._versonListLeng;
			this._crtIndex = 0;
			while (this._crtIndex < leng) {
				let version: string = <string>this._resVerList[this._crtIndex];
				let verList: Array<any> = version.split("|");
				let name: string = <string>verList[0];
				let verNum: string = <string>verList[1];
				let verName: string = <string>this.getVersonName(name, verNum);
				this._resVerHash.setItem(name, verName);
				this._resVerToOrgenHash.setItem(verName, name);
				this._crtIndex++;
			}
			if (this._crtIndex >= this._versonListLeng) {
				this.readFinish();
			}
		}

		private getVersonName(name: string, verNum: string): any {
			if (name.indexOf(".") != -1) {
				return name.replace(".", "_" + verNum + ".");
			}
			else {
				let index: number = flash.checkInt(name.lastIndexOf("/"));
				let nName: string = name.slice(0, index);
				return nName + "_" + verNum + "/";
			}
		}

		private readFinish() {
			if (this._callBack && this._callBack instanceof Function) {
				this._callBack.apply(null, this._parmas);
			}
		}
	}
}