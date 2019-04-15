module fairui {
	/**
	 * yanfaqiang
	 * UI显示代理类
	 */
	export class UIComponent extends BaseSprite {

		/**是否已初始化界面 */
		// protected isInit: boolean;
		/**是否打开过界面 */
		protected IsOpened: boolean;
		/**是否初始化执行结束 */
		protected IsComplyed: boolean;
		/**参数 */
		public param: any;		

		public constructor() {

			super();
		}

		protected constructFromXML(xml: any): void {

			super.constructFromXML(xml);
			
			this.InitComplete();
		}

		public IsInited(): boolean {
			return !this.IsComplyed;
		}

		public InitComplete(): boolean {			

			//检测初始化是否完成
			if (!this.IsInited()) {
				return false;
			}
			
			if (!this.IsOpened) {
				this.IsOpened = true;
				this.InitUI();
			}

			this.InitData(this.param);
			this.AddRootListener();

			this.IsComplyed = true;
			return true;
		}

		/**
		 * 外部不要调用
		 */
		public Init(param: any): void {
			this.param = param;
			this.InitComplete();
		}

		/**
		 * 初始化UI界面
		 */
		public InitUI(): void {

		}

		/**
		 * 初始化参数
		 */
		public InitData(param: any = null): void {

		}

		/**
		 * 关闭界面时调用
		 */
		public Reset():void{

			super.Reset();

			this.param = null;
			this.IsComplyed = false;
		}

		public Destroy():void{

			super.Destroy();

			// this.isInit = false;
			this.param = null;
		}
	}
}