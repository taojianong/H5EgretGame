enum ComItemType {
	/**背包 */
	package,
	/**仓库 */
	warehouse
}
module fairui {

	export class UIComItem extends fairui.UIEListRenderItem {
		private img_icon: UIBitmapIcon;
		// private img_bg: UIBitmapIcon;
		private txt_name: fairygui.GLabel;
		private tb_num: fairygui.GLabel;
		private resUrl: string;

		private resource: any;
		private _numVisible: boolean;
		private _goodsName: boolean;
		public constructor() {
			super();
		}

		private _type: ComItemType;

		protected constructFromXML(xml: any): void {

			super.constructFromXML(xml);
		}

		public show(data: any): void {

			super.show(data);

			this.resource = data;

			this.initView();
		}

		private initView(): void {
			if (this.resource instanceof ItemResource) {
				this.resUrl = UrlUtil.getItemIconUrl(this.resource.icon);
			} else if (this.resource instanceof BuildResource) {
				this.resUrl = UrlUtil.getBuildingIconUrl(this.resource.build_icon);
			} else if (this.resource instanceof SeedResource) {
				this.resUrl = UrlUtil.getSeedIconUrl(this.resource.icon);
			}
			this.img_icon.LoadImage(this.resUrl);
			// this.img_bg.texture = RES.getRes("common_json.shengji_29");
			this.txt_name.text = this.getItemName();
			utils.ObjectUtils.dropShadow(this.txt_name);
		}

		private getItemName(): string {
			if (this.resource instanceof ItemResource) {
				return this.resource.name;
			} else if (this.resource instanceof BuildResource) {
				return this.resource.name;
			} else if (this.resource instanceof SeedResource) {
				return this.resource.name;
			}
		}

		private getItemNum(): string {
			let item;
			if (this.resource instanceof ItemResource) {
				return "X" + ItemModel.getInstance().getItemCountById(this.resource.id);
			} else if (this.resource instanceof BuildResource) {
				return "";
			} else if (this.resource instanceof SeedResource) {
				return "";
			}
		}

		public set numVisible(value: boolean) {
			this._numVisible = value;
			if (this._numVisible) {
				this.tb_num.text = this.getItemNum();;
			} else {
				this.tb_num.text = "";
			}
			this.tb_num.visible = this._numVisible;
		}
		/**道具数量 */
		public get numVisible(): boolean {
			return this._numVisible;
		}

		public set nameVisible(value: boolean) {
			this._goodsName = value;
			if (this._goodsName) {
				this.txt_name.text = this.getItemName();
			} else {
				this.txt_name.text = "";
			}
			this.txt_name.visible = this._goodsName;
		}
		/**名称 */
		public get nameValue(): string {
			return this.getItemName();
		}

		public set iconUrl(value: string) {
			this.resUrl = value;
			this.img_icon.LoadImage(this.resUrl);
			// this.img_icon.width = this.width;
		}
		/**图标 */
		public get iconUrl(): string {
			return this.resUrl;
		}

		/**设置背景图类型 */
		public get type(): ComItemType {
			return this._type;
		}
		public set type(value: ComItemType) {
			this._type = value;
			switch (this._type) {

			}
		}

		public setLabel(value: string, color: number = 0xffffff): void {

			this.txt_name.text = value;
			this.txt_name.color = color;
		}

		public Reset(): void {
			// if (this.img_bg) this.img_bg.Dispose();
			if (this.img_icon) this.img_icon.Reset();
			if (this.txt_name) utils.ObjectUtils.clearFilter(this.txt_name);
		}
	}
}