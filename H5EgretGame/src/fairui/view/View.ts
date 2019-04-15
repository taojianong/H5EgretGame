module fairui {
	
	export class View extends fairui.UIComponent {

		public cls: any = null;
		//释放时间
		protected gcTime: number = 0;
		
		public constructor() {

			super();
		}

		public Init(param: any): void {
			super.Init(param);
			this.gcTime = Number.MAX_VALUE;
		}

		/**获取当前组件Class类 */
		public getCls(): any {

			return this.cls;
		}

		/**
		 * 重置,每次关闭界面调用
		 */
		public Reset(): void {

			super.Reset();
			this.gcTime = GlobalJugger.timeMS + Resource.CACHE_TIME;
		}

		public IsCanGc(): boolean {
			return GlobalJugger.timeMS >= this.gcTime;
		}
		/**
		 * 销毁，完全销毁对象和资源
		 * 接口除了组件你们其它地方不要调用这个接口
		 * 只有回收资源的时候会调用一次
		 */
		public Destroy(): void {

			super.Destroy();
			this.cls = null;
		}
	}
}