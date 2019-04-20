module fairui {

	/**
	 * TIP基类
	 * @author clong 2019.2.20
	 */
	export class UIBaseTip extends View {

		/**背景遮罩点击是否关闭 */
		public maskClick: boolean = true;

		public constructor() {

			super();
		}

		protected constructFromXML(xml: any): void {

			// super.constructFromXML( xml );
			fairui.FairyUtils.setVar(this, this);
		}

		public init(param: any): void {

			// super.init(param);
			this.param = param;

			this.initUI();
			this.addAllListener();
			this.initData(param);
			this.onResize();

			if (this.maskClick) {
				EffectUtil.openWindowEffect(this);
			}
		}

		public addAllListener(): void {

			super.addAllListener();

			this.addGameListener(egret.TouchEvent.TOUCH_END, this.stageHandler, this, Global.stage);
		}

		public removeAllListener(): void {

			super.removeAllListener();

			this.removeGameListener(egret.TouchEvent.TOUCH_END, this.stageHandler, this, Global.stage);
		}

		private stageHandler(e: egret.TouchEvent): void {

			let item: egret.DisplayObject = this.param ? this.param["target"] : null;
			if (!this.containsGlobalPoint(e.stageX, e.stageY)) {
				if ( item instanceof fairui.UIEListRenderItem ) {
					if( !item.containsGlobalPoint(e.stageX, e.stageY) ){
						this.close();
					}					
				}else{
					this.close();
				}				
			}
		}


		/**关闭TIP */
		public close(): void {

			let _self:UIBaseTip = this;
			UISystem.Inst.closeTipView(_self.getCls());
		}

		/**是否显示遮罩 */
		public get isShowMask(): boolean {

			let showMask: boolean = this.param && this.param.hasOwnProperty("showMask") && this.param["showMask"];
			return showMask;
		}

		/**
		 * UI 9宫格布局 自适应
		 */
		public onResize(): void {

			super.onResize();

			let showMask: boolean = this.param && this.param.hasOwnProperty("showMask") && this.param["showMask"];
			if (showMask) {
				this.x = (Global.stageWidth - this.width) * 0.5;
				this.y = (Global.stageHeight - this.height) * 0.5;
			} else {
				let target: egret.DisplayObject = this.param && this.param.hasOwnProperty("target") ? this.param["target"] : null;
				if (target) {
					let gp: egret.Point = target.parent.localToGlobal(target.x, target.y);
					this.x = gp.x + target.width;
					this.y = gp.y - this.height * 0.5;
					if (this.x < 0) {
						this.x = 0;
					} else if ((this.x + this.width) > Global.stageWidth) {
						this.x = Global.stageWidth - this.width;
					}
					if (this.y < 0) {
						this.y = 0;
					} else if ((this.y + this.height) > Global.stageHeight) {
						this.y = Global.stageHeight - this.height;
					}
				}
			}
		}

		public dispose(): void {

			super.dispose();
		}
	}
}