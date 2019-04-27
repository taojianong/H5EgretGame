module load {

	/**
	 * 加载条目
	 * @author clong 2019.4.27
	 */
	export class LoaderItem extends LoaderCore {

		// public readonly onFinish: Array<Function> = new Array<Function>();
		// public readonly thisObject: Array<any> = new Array<any>();
		// public readonly param: Array<any> = new Array<any>();

		protected res:Resource = null;

		public constructor() {

			super();
		}

		public create( url:string , type:number , level:number = 0 , state:number = 0  ):void{

			super.create( url , type , level , state );
		}

		public loadRes( res:Resource ):void{

			this.res = res;
			this.state = LoaderStatus.LOADING;

			let type:string = "";
			if( res.resType == LoaderStatus.TYPE_TEXTURE ){
				type = LoaderStatus.IMAGE;
			}else if( res.resType == LoaderStatus.TYPE_TEXT ){
				type = LoaderStatus.TEXT;
			}else if( res.resType == LoaderStatus.TYPE_BINARY ){
				type = LoaderStatus.BIN;
			}else if( res.resType == LoaderStatus.TYPE_SOUND ){
				type = LoaderStatus.SOUND;
			}else if( res.resType == LoaderStatus.TYPE_FONT ){
				type = LoaderStatus.FONT;
			}

			this.url = res.url;
			RES.getResByUrl( res.url , this.loadDataComplete , this , type );
		}

		protected loadDataComplete(data: any, url:string ): void {


		}

		public get resType():number{

			return this.res.resType;
		}

		// protected onComplete(asset: any, isCallAsset:boolean): void {
		// 	if (asset == null){
		// 		console.log(this, "加载失败 url:" + this.url);
		// 	}
		// 	this.state = LoaderStatus.COMPLETED;
		// 	var leng: number = this.onFinish.length;
		// 	if (leng == 0) return;
		// 	var func: Function;
		// 	for (var i = 0; i < leng; i++) {
		// 		func = this.onFinish[i];
		// 		if (func) {
		// 			if (isCallAsset) {
		// 				if (this.param[i] != null) func.call(this.thisObject[i], asset, this.param[i]);
		// 				else func.call(this.thisObject[i], asset);
		// 			} else {
		// 				func.call(this.thisObject[i]);
		// 			}
		// 		}

		// 	}
		// 	//Logger.log(this,"回调次数：" + this.onFinish.length + "\nurl:" + this.url);
		// 	this.onFinish.length = 0;
		// 	this.thisObject.length = 0;
		// }

		public clear():void{

			super.clear();

			this.res = null;
			// this.onFinish.length = 0;
			// this.thisObject.length = 0;
			// this.param.length = 0;
		}
	}
}