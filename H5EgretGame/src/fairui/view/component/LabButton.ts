module fairui {

	/**
	 * 标签按钮
	 * @author clong 2019.2.25
	 */
	export class LabButton extends BaseButton{

		private lab:fairygui.GTextField;

		public constructor() {

			super();
		}

		public initUI():void{

			super.initUI();

			this.lab = this.getChild("title").asTextField;
		}
	}
}