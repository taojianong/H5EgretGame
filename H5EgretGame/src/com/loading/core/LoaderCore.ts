module load {

	/**
	 * 加载基类
	 * @author clong 2019.4.26
	 */
	export class LoaderCore extends egret.EventDispatcher implements IPool,IDispose{

		public static readonly version: Number = 0.1;

		//-------------------------------------------------------
		/**加载类型 */
		public type:number = LoaderStatus.TYPE_TEXTURE;
		/**加载地址 */
		public url:string = "";
		/**加载等级 */
		public level:number = 0;
		/**加载状态 */
		public state:number = LoaderStatus.READY;
		/**是否已经释放 */
		public isDisposed:boolean = false;

		public constructor(){

			super();
		}

		/**初始创建 */
		public create( url:string , type:number , level:number = 0 , state:number = 0 ):void{

			this.url = url;
			this.type = type;
			this.level = level;
			this.state = state;
		}

		/**释放资源 */
		public recover():void{

			ObjectPool.recoverObject( this );
		}

		/**清理资源 */
		public clear():void{

			this.url = "";
			this.type = 0;
			this.level = 0 ;
			this.state = 0;
		}

		public dispose():void{

			this.clear();

			this.isDisposed = true;
		}
	}
}