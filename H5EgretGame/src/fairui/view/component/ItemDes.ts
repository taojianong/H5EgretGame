module fairui {

	/**
	 * 条件物品提示
	 * @author qingyang 2019-02-22 15:08:03
	 */
	export class ItemDes extends fairui.UIBaseTip{

		private lbl_item:fairygui.GTextField;
		private lbl_des:fairygui.GTextField;

		public constructor() {

			super();
		}

		public InitData( param:Object ):void{

			super.InitData( param );

			this.setItem( param);
		}

		public setItem( item:any){
			if (item.data.id == 103){
				let name = Global.lang.getLang("66");
				let des = Global.lang.getLang("10026_1003", item.data.total);
				this.settext(name, des);
			}else{
				let name = ItemResource.getItemByKey(item.data.id).name;
				let des = ItemResource.getItemByKey(item.data.id).desc;
				this.settext(name, des);
			}
		}

		private settext( name:string, des:string){
			this.lbl_item.text = name;
			this.lbl_des.text = des;
		}
	}
}