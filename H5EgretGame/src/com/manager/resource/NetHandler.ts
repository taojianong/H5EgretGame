module fairui {
	export class NetHandler implements IDispose {

		private _isDispose: boolean = false;
		private _errorDict: flash.Dictionary;
		private _progressDict: flash.Dictionary;
		private _completeDict: flash.Dictionary;

		public constructor() {

			this.clear();
		}

		public netComplete() {
			this.foEach(this._completeDict);
		}

		public netProgress() {
			this.foEach(this._progressDict);
		}

		public netError() {
			this.foEach(this._errorDict);
		}

		private foEach(dict: flash.Dictionary) {
			dict.forEach(function (key, cont) {
				key.apply(key["owner"], cont);
			}, this);
			// for (let forinvar__ in dict.map) {
			// 	let fun:Function = dict.map[forinvar__];
			// 	//let fun: Function = fuc;
			// 	fun.apply(fun["owner"], dict.getItem(fun));
			// }
		}

		public addCompleteHandler(fuc: Function, vo: Array<any> = null) {
			this._completeDict.setItem(fuc, (vo ? vo : [true]));
		}

		public addProgressHandler(fuc: Function, vo: Array<any> = null) {
			this._progressDict.setItem(fuc, (vo ? vo : [true]));
		}

		public addErrorHandler(fuc: Function, vo: Array<any> = null) {
			this._errorDict.setItem(fuc, (vo ? vo : [true]));
		}

		public removeCompleteHandler(fuc: Function) {
			this._completeDict.delItem(fuc);
		}

		public removeProgressHandler(fuc: Function) {
			this._progressDict.delItem(fuc);
		}

		public removeErrorHandler(fuc: Function) {
			this._errorDict.delItem(fuc);
		}

		public deleteFuc(fuc: Function) {
			this._completeDict.delItem(fuc);
			this._progressDict.delItem(fuc);
			this._errorDict.delItem(fuc);
		}

		public clear() {
			this._errorDict = new flash.Dictionary();
			this._progressDict = new flash.Dictionary();
			this._completeDict = new flash.Dictionary();
		}

		public get isDisposed(): boolean {
			return this._isDispose;
		}

		public dispose() {
			this._errorDict = null;
			this._progressDict = null;
			this._completeDict = null;
			this._isDispose = true;
		}
	}
}