module com.bean {
	export class DataConfigUtils {
		private static _instances: DataConfigUtils = null;
		/**获取静态实例*/
		public static instances(): DataConfigUtils {
			if (!DataConfigUtils._instances) {
				DataConfigUtils._instances = new DataConfigUtils();
			}
			return DataConfigUtils._instances;
		}

		public SUFIX_MIN: string = "_client_min.json";
		private sufix: string;
		private _beanConfigPropertyErrorDict: flash.Dictionary;
		private _jsonDataObj: Object;
		private _jsonDataObj1: Object;
		private _jsonDataObj2: Object;
		private _zip: JSZip;
		private _complete: Function;
		/**是否完成了策划配置文件解析*/
		public isComplete: boolean = false;

		public constructor() {
			if (DataConfigUtils._instances) {
				App.log.error("Error: DataConfigUtils an only use instances() to get an instance!");
				return;
			}
			this._beanConfigPropertyErrorDict = new flash.Dictionary();
			this.sufix = this.SUFIX_MIN;
		}

		public start(complete: Function) {
			// EventManager.dispatchEvent(LoginEvent.SHOW_INIT_GAME_PROGRESS, 95, 100, "Parse the game configuration file...");
			this._complete = complete;
			this._zip = new JSZip(RES.getRes("configCfg_map"));
			let jsonStr: string = this._zip.file("configCfg1.data").asText();
			egret.callLater(this.setupJsonData, this, jsonStr);
		}

		private setupJsonData(str: string) {
			this._jsonDataObj1 = <Object>JSON.parse(str);
			egret.callLater(this.setupJsonData2, this);
		}

		private setupJsonData2(str: string) {
			let jsonStr: string = this._zip.file("configCfg2.data").asText();
			this._jsonDataObj2 = <Object>JSON.parse(jsonStr);
			// this._jsonDataObj = <Object>Object.assign(this._jsonDataObj1, this._jsonDataObj2);
			this.clear();
			this.isComplete = true;
			this._complete.apply(this._complete["owner"]);
		}

		private clear() {
			this._zip = null;
			this._jsonDataObj1 = null;
			this._jsonDataObj2 = null;
		}

		public loadJsonFile(configName: string, onFinish: Function) {
			let jsonName: string = configName.replace("Bean", this.sufix);
			this.readJosnData(jsonName, onFinish);
		}

		private readJosnData(jsonName: string, onFinish: Function) {
			let str: string = <string>this._jsonDataObj[jsonName];
			if (str) {
				let strList: Array<any> = str.split(/\n/gi);
				if (strList) {
					let jsonStr: string, jsonObj: any, keyObj: any;
					let version: string = <any>strList[0];
					if (this.sufix == this.SUFIX_MIN) {
						let keyStr: string = <any>strList[1];
						jsonStr = <any>strList[2];
						jsonObj = <any>JSON.parse(jsonStr);
						keyObj = <any>JSON.parse(keyStr);
					}
					else {
						jsonStr = strList[1];
						jsonObj = JSON.parse(jsonStr);
					}
					onFinish(jsonName, jsonObj, keyObj);
				}
			}
		}

		public notHaveBean(configName: string, key: string) {
			let info: string = App.lang.getLang("lang_client_721", configName, key);//配置表里缺少条目，表名：{0}，主键Id：{1}
			App.log.error(info);
		}

		public beanConfigPropertyError(configName: string, key: any) {
			let dict: flash.Dictionary = <any>this._beanConfigPropertyErrorDict.getItem(configName);
			if (dict == null) {
				dict = new flash.Dictionary();
				this._beanConfigPropertyErrorDict.setItem(configName, dict);
			}
			if (!dict.getItem(key)) {
				dict.setItem(key, key);
			}
		}
	}
}