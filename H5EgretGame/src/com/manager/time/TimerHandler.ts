module com.time {
	export class TimerHandler {
		public delay: number = 0;
		public repeat: boolean = false;
		public userFrame: boolean = false;
		public exeTime: number = NaN;
		public method: Function;
		public args: Array<any>;
		public callbackThisObj: any;
		public clear() {
			this.method = null;
			this.args = null;
			this.callbackThisObj = null;
		}
	}
}