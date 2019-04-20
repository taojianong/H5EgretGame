module fairui {
	
	export class View extends fairui.UIComponent implements IView {

		/**资源可释放后缓存时间,毫秒 */
		public static readonly CACHE_TIME: number = 5000;

		public cls: any = null;
		//释放时间
		protected gcTime: number = 0;
		
		public constructor() {

			super();
		}

		/**获取当前组件Class类 */
		public getCls(): any {

			return this.cls;
		}

		//------------------------------------------------

		public init(param: any): void {
			super.init(param);
			this.gcTime = Number.MAX_VALUE;
		}
		
		//初始化UI
		public initUI(): void {

		}

		/**
		 * 自适应接口
		 */
		public onResize():void{


		}

		/**
		 * 是否可回收
		 */
		public isCanGc(): boolean {

			return Global.timer.currFrame >= this.gcTime;
		}

		/**
		 * 重置,每次关闭界面调用
		 */
		public clear(): void {

			super.clear();
			this.gcTime = Global.timer.currFrame + View.CACHE_TIME;
		}		

		/**
		 * 销毁，完全销毁对象和资源
		 * 接口除了组件你们其它地方不要调用这个接口
		 * 只有回收资源的时候会调用一次
		 */
		public dispose(): void {

			super.dispose();
			this.cls = null;
		}
	}
}