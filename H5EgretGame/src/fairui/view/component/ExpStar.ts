module fairui {

	/**
	 * 经验星星
	 * @author clong 2019.2.2
	 */
	export class ExpStar extends fairui.BaseSprite{

		private img_star:fairygui.GImage;
		private lab_level:fairygui.GTextField;

		public constructor() {

			super();
		}

		public set text( value:string ){

			this.lab_level.text = value;
		}

		public get text():string{

			return this.lab_level.text;
		}
	}
}