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

		/**
		 * 加载图片
		 * @param url 			图片地址
		 * @param callback 		加载完成调用方法
		 * @param thisObject
		 */
		public loadImage(url: string, callback: Function = null, thisObject: any = null ): void {

			super.loadImage( url , callback , thisObject );
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
		
		public dispose(): void {

			this.dispose();
		}
	}

}