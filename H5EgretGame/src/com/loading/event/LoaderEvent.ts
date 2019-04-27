module load {

	/**
	 * 加载事件
	 * @author clong 2019.4.26
	 */
	export class LoaderEvent extends egret.Event{
		
		public static readonly COMPLETE:string="complete";
		public static readonly PROGRESS:string="progress";		
		public static readonly ERROR:string="error";
		public static readonly IO_ERROR:string="ioError";

		/**加载一组资源完成 */
		public static LOAD_LIST_COMPLETE:string = "loadListComplete";

		/**释放资源 */
		public static DISPOSE_RESOURCE:string = "disposeResource";

		protected _thisObject:any;

		public constructor( type:string , thisObject:any , data:any=null ){

			super(type);
			this._thisObject = thisObject;
			this.data = data;
		}

		public get thisObject():Object {

			return this._thisObject;
		}
	}
}