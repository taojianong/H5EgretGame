module fairui {
	/**
	 * 背包道具类
	 * David
	 */
	export class UIPackageItem extends fairui.UIEListRenderItem {

		private img_icon: UIBitmapIcon;
		private txt_name: fairygui.GTextField;
		private img_gou: fairygui.GLoader;

		private resUrl: string = "";
		private bl_num: fairygui.GTextField;
		/**是否需要拖动事件 */
		private event: boolean;

		public constructor(data: ItemVO = null, event: boolean = true) {

			super();
			if (data) {
				// this.data = data;
				this.show(data);
			}
			this.event = event;
		}

		protected constructExtension(buffer: fairygui.ByteBuffer): void {

			super.constructExtension(buffer);

			if (this.data && this.img_icon) {
				this.resUrl = UrlUtil.getItemIconUrl(this.data.clientItem.icon);
				this.img_icon.LoadImage(this.resUrl);
			}
		}

		public show(value: any): void {

			super.show(value);
			this.data = value;
			if (value instanceof ItemVO) {
				this.iconUrl = UrlUtil.getItemIconUrl(this.data.clientItem.icon);
				this.bl_num.text = "x" + (this.data.serverItem.stock || 0);
			} else if (value instanceof vo.OrderNeedVo) {
				this.iconUrl = value.bean ? UrlUtil.getItemIconUrl(value.bean.icon) : "";
				let count: number = ItemModel.getInstance().getItemCountById(value.itemId);
				this.setLabel(count + "/" + value.num, count >= value.num ? 0xffffff : 0xff0000);
				this.img_gou.visible = count >= value.num;
			} else if (value instanceof vo.CostVo) {
				this.iconUrl = value.bean ? UrlUtil.getItemIconUrl(value.bean.icon) : "";
				let count: number = ItemModel.getInstance().getItemCountById(value.type);
				this.setLabel(count + "/" + value.num, count >= value.num ? 0xffffff : 0xff0000);
				this.img_gou.visible = count >= value.num;
			}
		}

		public set iconUrl(value: string) {

			this.resUrl = value;
			this.img_icon.LoadImage(this.resUrl);
		}
		/**设置图标地址 */
		public get iconUrl(): string {

			return this.resUrl;
		}

		public setData(data: ItemVO = null, event: boolean = true): void {
			if (data) {
				this.show(data);
			}
			this.event = event;
		}

		protected dataChanged(): void {

			// super.dataChanged();
			if (!this.data || !(this.data instanceof ItemVO)) {
				return;
			}
			this.resUrl = UrlUtil.getItemIconUrl(this.data.clientItem.icon);
			this.img_icon.LoadImage(this.resUrl);

			this.bl_num.text = "x" + this.data.serverItem.stock;
		}

		/**
		 * 显示标签
		 */
		public setLabel(value: string, color: number = 0xffffff): void {

			this.txt_name.text = value;
			this.txt_name.color = color;
			utils.ObjectUtils.dropShadow(this.txt_name);
		}

		/*public Destroy():void{
	
			super.Destroy();
	
			this.img_icon.Dispose();
	
			this.RemoveGameListener(egret.TouchEvent.TOUCH_BEGIN,this.registDragEvent,this,this);
		}*/

		public Reset(): void {
			utils.ObjectUtils.clearFilter(this.txt_name);
		}

	}
}