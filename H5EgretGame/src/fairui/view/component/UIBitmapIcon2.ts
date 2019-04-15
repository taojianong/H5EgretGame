module fairui {
	/**
	 * 通用icon资源加载,可资源缩放的
	 * @author clong 2019.3.18
	 */
	export class UIBitmapIcon2 extends UIBitmapIcon {

		protected _iconUrl: string;
		protected _source: any;

		public constructor() {

			super();
			this.touchable = false;
		}

		public LoadImage(url: string, callback: Function = null, thisObject: any = null, level: number = LoadLevel.DEFAULT, IsClearTexture: boolean = false): void {

			super.LoadImage( url , callback , thisObject , level , IsClearTexture );
		}

		public set texture(value: egret.Texture) {

			if (this._iconObject) {
				(<fairygui.GLoader>this._iconObject).texture = value;
			}
		}
		/**
		 * 设置图片纹理
		 */
		public get texture(): egret.Texture {

			return (<fairygui.GLoader>this._iconObject).texture;
		}

		/**设置高宽 */
		// public setSize( wv: number, hv: number, ignorePivot?: boolean ):void{

		// 	if( this._iconObject ) {
		// 		(<fairygui.GLoader>this._iconObject).setSize( wv , hv , ignorePivot );
		// 	}			
		// }

		public dispose(): void {

			this.Reset();
		}
	}

}