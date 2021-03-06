module fairui {

	/**
	 * 列表渲染条目
	 * @author cl 2019.1.30
	 */
	export class UIEListRenderItem extends UIComponent {
		
		/**是否有可选中状态 */
		public canSelect:boolean = false;

		protected __data:any = null;

		protected _select:boolean = false;

		public constructor() {

			super();
		}

		protected constructFromXML(xml: any): void {

			super.constructFromXML(xml);
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
			// this.AddRootListener();//此方法在show方法的时候调用

			this.isComplyed = true;
			return true;
		}		

		/**
		 * 是否包含全局坐标点
		 * @param gx 全局X坐标
		 * @param gy 全局Y坐标
		 */
		public containsGlobalPoint(gx: number, gy: number): boolean {

			let lp: egret.Point = this.globalToLocal(gx, gy);
			let bounds: egret.Rectangle = new egret.Rectangle(0, 0, this.width, this.height);
			return bounds.contains(lp.x, lp.y);
		}

		public set select( value:boolean ){

			if( this.canSelect ){
				this.currentState = value ? "down" : "up";
			}
		}

		public get select():boolean{

			return this.canSelect ? this.currentState == "down" : false;
		}

		public show( data:any ):void{

			this.data = this._data = data;
			this.addAllListener();
		}

		public hide():void{

			this.clear();
		}

		/**
		 * 重置
		 */
		public clear(): void {

			super.clear();
			this.removeAllListener();
		}

		/**
		 * 释放资源
		 */
		public dispose(): void {

			super.dispose();
		}
	}
}