module flash {
	export class ObjectPool {
		private _cls: any;
		private _pool: Array<any> = [];
		private _poolDict: flash.Dictionary = null;
		private _numCount: number = 0;
		private _checkDuplicate: boolean = true;

		public constructor(cls: any, checkDuplicate: boolean = true) {
			this._cls = cls;
			this._checkDuplicate = checkDuplicate;
			if (this._checkDuplicate) {
				this._poolDict = new flash.Dictionary();
			}
		}

		public get numCount(): number {
			return this._numCount;
		}

		public getObject(): any {
			let eft: any;
			if (this._pool.length > 0) {
				eft = this._pool.pop();
				if (this._checkDuplicate) {
					this._poolDict.delItem(eft);
				}
			}
			else {
				eft = new this._cls();
				this._numCount++;
			}
			return eft;
		}

		public push(data: any) {
			if (this._checkDuplicate) {
				if (this._poolDict.getItem(data) == null) {
					this._pool.push(data);
					this._poolDict.setItem(data, data);
				}
				else {
					egret.error("有重复的对象入池", data.toString());
				}
			}
			else {
				this._pool.push(data);
			}
		}

		public pushArr(datas: Array<any>) {
			for (let da_key_a in datas) {
				let da: Object = datas[da_key_a];
				this.push(da);
			}
		}
	}
}