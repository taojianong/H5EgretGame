module fairui {
	/**
	 * yanfaqiang
	 * UI显示代理类
	 */
	export class UIComponent extends BaseSprite {

		/**是否打开过界面 */
		protected isOpened: boolean = false;
		/**是否初始化执行结束 */
		protected isComplyed: boolean = false;
		/**参数 */
		public param: any;		

		public constructor() {

			super();
		}

		protected constructFromXML(xml: any): void {

			super.constructFromXML(xml);
			
			this.init( null );
		}

		public isInited(): boolean {
			return !this.isComplyed;
		}

		public initComplete(): boolean {			

			//检测初始化是否完成
			if (!this.isInited()) {
				return false;
			}
			
			if (!this.isOpened) {
				this.isOpened = true;
				this.initUI();
			}

			this.initData(this.param);
			this.addAllListener();

			this.isComplyed = true;
			return true;
		}

		/**
		 * 外部不要调用
		 */
		public init(param: any): void {
			this.param = param;
			this.initComplete();
		}

		/**
		 * 初始化UI界面
		 */
		public initUI(): void {

		}

		/**
		 * 初始化参数
		 */
		public initData(param: any = null): void {

		}

		/**
		 * 关闭界面时调用
		 */
		public clear():void{

			super.clear();

			this.param = null;
			this.isComplyed = false;
		}

		public dispose():void{

			super.dispose();

			this.param = null;
		}
	}
}