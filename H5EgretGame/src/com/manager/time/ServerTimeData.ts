module com.time {
	export class ServerTimeData {
		public static pool: flash.ObjectPool;
		public static getData(): com.time.ServerTimeData {
			return <com.time.ServerTimeData>com.time.ServerTimeData.pool.getObject();
		}

		public get args(): Array<any> {
			return this._args;
		}

		public set args(value: Array<any>) {
			this._args = value;
		}

		public get method(): Function {
			return this._method;
		}

		public set method(value: Function) {
			this._method = value;
		}
		public get callbackThisObj(): any {
			return this._callbackThisObj;
		}

		public set callbackThisObj(value: any) {
			this._callbackThisObj = value;
		}

		public get spuleTime(): number {
			return this._spuleTime;
		}
		/**
		 * 剩余时间，单位秒 
		 */
		public set spuleTime(value: number) {
			this._spuleTime = value;
		}

		public get endServerTime(): number {
			return this._endServerTime;
		}

		public get startServerTime(): number {
			return this._startServerTime;
		}

		public setTime(startTime: number, endTime: number) {
			this._startServerTime = startTime;
			this._endServerTime = endTime;
		}

		public dispose() {
			this._method = null;
			this._args = null;
			this._callbackThisObj = null;
			com.time.ServerTimeData.pool.push(this);
		}

		private _startServerTime: number = 0;
		private _endServerTime: number = 0;
		private _spuleTime: number = 0;
		private _method: Function;
		private _args: Array<any>;
		private _callbackThisObj: any;
	}
}
com.time.ServerTimeData.pool = new flash.ObjectPool(com.time.ServerTimeData);
