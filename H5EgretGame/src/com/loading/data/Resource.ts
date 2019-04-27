module load {

	/**
	 * 加载资源
	 * @author clong 2019.4.27
	 */
	export class Resource implements IPool,IDispose{

		//------------------------------------------------------------------
		
		public url:string= "";//资源地址
		public level:number = 0;//加载等级
		// public thisObj:any = null;//
		// public complete:Function= null;//加载资源完成事件

		public isDisposed:boolean = false;

		private _data:any = null;

		/**使用计数 */
		private useCount:number = 0;
		/**最后销毁时间,毫秒数 */
		public lastTime:number = 0;

		/**添加引用对象列表 */
		private targetList:Array<any> = [];
		
		public Resource( url:string= "" , level:number=0) {
			
			this.create( url , level );
		}

		/**初始创建 */
		public create( url:string= "" , level:number=0 ):void{
			
			this.url 		= url;
			// this.thisObj 	= thisObj;
			// this.complete 	= complete;
			this.level = level;
			this.isDisposed = false;
			this.lastTime = 0;
			this.useCount = 0;
			this.targetList = [];
		}

		/**回收资源 */
		public recover():boolean{

			if( this.targetList.length <= 0 ){
				ObjectPool.recoverObject( this );
				return true;
			}			
			return false;
		}

		/**清理资源 */
		public clear():void{

			this.url   = "";
			this.level = 0;
		}

		public set data( value:any ){

			this._data = value;
		}
		
		/**
		 * 对应资源的数据
		 */
		public get data():any{
			
			return this._data;
		}

		/**
		 * 通过此方法获取可计数
		 * @param target 引用资源的对象
		 */
		public getRes( target:any = null ):any{

			if( target ){
				if( this.targetList.indexOf( target ) == -1  ){
					this.targetList.push( target );
				}else{
					return;
				}				
			}
			this.useCount++;
			if( this.useCount > 0 && this.isDisposed ){
				this.isDisposed = false;
			}
			return this._data;
		}
		
		/**
		 * 是否已缓存
		 * @return
		 */
		public get hasCache():Boolean {
			
			return this.data != null;
		}
		
		public get isXML():Boolean {
			
			return this.extension.toLowerCase() == "xml";
		}
		
		public get isJPG():Boolean {
			
			return this.extension.toLowerCase() == "jpg";
		}
		
		public get isPNG():Boolean {
			
			return this.extension.toLowerCase() == "png";
		}
		
		public get isMP3():Boolean {
			
			return this.extension.toLowerCase() == "mp3";
		}
		
		public get isTXT():Boolean {
			
			return this.extension.toLowerCase() == "txt";
		}

		public get isJOSN():Boolean {
			
			return this.extension.toLowerCase() == "json";
		}

		/**字体 */
		public get isTFF():Boolean {
			
			return this.extension.toLowerCase() == "tff";
		}
		
		/**
		 * 文件后缀名
		 */
		public get extension():string{
			
			if( !this.url ){
				return "";
			}
			//切掉路径后面的参数
			let searchString:string= this.url.indexOf("?") > -1 ? this.url.substring(0, this.url.indexOf("?")) : this.url;
			
			//截取后缀
			let finalPart:string= searchString.substring(searchString.lastIndexOf("/"));
			return finalPart.substring(finalPart.lastIndexOf(".") + 1).toLowerCase();
		}

		/**
		 * 资源类型
		 */
		public get resType():number{

			if( this.isJPG || this.isPNG ){
				return LoaderStatus.TYPE_TEXTURE;
			}else if( this.isJOSN || this.isTXT ){
				return LoaderStatus.TYPE_TEXT;
			}else if( this.isTFF ){
				return LoaderStatus.TYPE_FONT;
			}else if( this.isMP3 ){
				return LoaderStatus.TYPE_SOUND;
			}
			return LoaderStatus.TYPE_BINARY;//二进制
		}

		/**
		 * 移除引用对象
		 * @param target 引用对象
		 */
		public removeTarget( target:any ):void{

			let index:number = this.targetList.indexOf(target);
			if( target && index != -1 ){
				this.targetList.splice(  index , 1 );
			}
		}

		/**
		 * 强制销毁
		 */
		public forceDispose():void{

			this.useCount = 0;
			this.targetList.length = 0;
			this.dispose();
		}

		public dispose():void{
			
			if( !this.isDisposed ){
				this.useCount--;
				if( this.useCount <= 0 ){					
					this.isDisposed = true;
					this.lastTime = egret.getTimer() + LoaderCache.GC_TIME * 1000;
				}
			}else{
				if( this.targetList.length > 0 ){//如果资源还有引用对象则不移除
					return;
				}
				this.clear();
				this.lastTime = 0;
				this.useCount = 0;
			}			
		}
	}
}