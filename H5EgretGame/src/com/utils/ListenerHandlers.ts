module com.utils {

	export class ListenerHandlers implements IDispose {

		private _isDispose: boolean = false;
		private _handlerDict: flash.Dictionary;

		public constructor() {
			//super();
			this._handlerDict = new flash.Dictionary();
		}

		public addListnerHandler(key: any, fuc: Function, data: Array<any> = null) {
			let dict: flash.Dictionary = <any>this._handlerDict.getItem(key);
			if (dict) {
				let handler: CHandler = <any>dict.getItem(fuc);
				if (handler) {
					if (handler.params != data)
						handler.params = data;
				}
				else {
					dict.setItem(fuc, new CHandler(fuc, data));
				}
			}
			else {
				dict = new flash.Dictionary();
				dict.setItem(fuc, new CHandler(fuc, data));
				this._handlerDict.setItem(key, dict);
			}
		}

		public removeListnerHandler(key: any, fuc: Function) {
			let dict: flash.Dictionary = <any>this._handlerDict.getItem(key);
			if (dict)
				dict.delItem(fuc);
		}

		public execute(key: any, data: Array<any> = null) {
			let dict: flash.Dictionary = <any>this._handlerDict.getItem(key);
			if (dict) {
				for (let handler_key_a in dict.map) {
					let handler: CHandler = dict.map[handler_key_a][1];
					handler.executeWith(data);
				}
			}
		}

		public get isDisposed(): boolean {
			return this._isDispose;
		}

		public dispose() {
			this._handlerDict = null;
			this._isDispose = true;
		}
	}
}