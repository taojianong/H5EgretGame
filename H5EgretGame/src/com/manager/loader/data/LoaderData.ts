module com.loader {
	export class LoaderData {

		public type: number;
		public url: string;
		public complete: Function;
		public progress: Function;
		public error: Function;
		public isCache: boolean;
		public thisObject: any;
		public argArray: any[];
		public data: any;

		public dispose(type?: boolean) {
			let _self: LoaderData = this;
			_self.type = null;
			_self.url = null;
			_self.complete = null;
			_self.progress = null;
			_self.error = null;
			_self.isCache = null;
			_self.thisObject = null;
			_self.argArray = null;
			_self.data = null;
		}
	}
}