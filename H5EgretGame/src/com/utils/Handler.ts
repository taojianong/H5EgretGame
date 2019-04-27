module utils {

	/**
	 * Handler方法
	 * @author cl 2018.10.25
	 */
	export class Handler {

		private static readonly pool: Array<Handler> = new Array<Handler>();

		/**
		 * 静态创建Hander
		 * @param method 执行方法
		 * @param thisObj 
		 * @param args 方法执行参数 
		 */
		public static create(method: Function = null, thisObj: any, args: Array<any> = null, isImmediatelyGc: boolean = true): Handler {
			if (method == null) {
				egret.error(this, "参数method为null");
				return null;
			}
			if (Handler.pool.length > 0) {
				let handler: Handler = Handler.pool.pop();
				handler.method = method;
				handler.thisObject = thisObj;
				handler.args = args;
				handler.isImmediatelyGc = isImmediatelyGc;
				return handler;
			}
			return new Handler(method, thisObj, args, isImmediatelyGc);
		}

		//------------------------------------------------------------------

		public method: Function;
		public args: Array<any>;
		public thisObject: any;
		/**是否默认回收 */
		public isImmediatelyGc: boolean;

		public constructor(method: Function = null, thisObj: any, args: Array<any> = null, isImmediatelyGc: boolean = true) {

			this.method = method;
			this.args = args;
			this.thisObject = thisObj || this;
			this.isImmediatelyGc = isImmediatelyGc;
		}

		/**
		 * 执行方法
		 */
		public execute(): void {
			try {
			if (this.method != null) {
				this.method.apply(this.thisObject, this.args);
				if (this.isImmediatelyGc) {
					this.gc();
				}
			}
			}
			catch(e){
				egret.error( this ,  "handler.execute调用出错" + e);
			}
		}

		/**
		 * 带参数执行方法
		 */
		public executeWith(data: Array<any>): void {

			if (data == null) {
				this.execute();
				return;
			}
			try {
				if (this.method != null) {
					this.method.apply(this.thisObject, this.args ? this.args.concat(data) : data);
					if (this.isImmediatelyGc){
						this.gc();
					} 
				}
			}
			catch (e) {
				egret.error(this, "handler.executeWith调用出错" + e);
			}
		}

		/**
		 * 回收
		 */
		public gc(): void {

			this.method = null;
			this.thisObject = null;
			this.args = null;

			Handler.pool.push(this);
		}
	}
}