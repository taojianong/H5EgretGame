module fairui {
	/**
	 * 通用icon资源加载,不可自由缩放
	 * @author clong 2019.2.20
	 */
	export class UIBitmapIcon extends BaseButton implements IDispose {

		protected _iconUrl: string;
		protected _source: any;

		public constructor() {

			super();
			this.touchable = false;
		}
		
		protected constructExtension(buffer: fairygui.ByteBuffer): void {

			super.constructExtension(buffer);
		}

		public setup_afterAdd(buffer: fairygui.ByteBuffer, beginPos: number): void {

			super.setup_afterAdd(buffer, beginPos);
		}

		public set source(value: any) {

			this._source = value;
			if (value instanceof egret.Texture) {
				this.texture = value;
			} else {
				this.url = value;
			}
		}

		public get source(): any {

			return this._source;
		}

		public set url(value: string) {

			if( value && value.indexOf("ui://") == 0 ){
				this.icon = value;
				return;
			}
			
			if (this._iconUrl != value && value) {
				LoaderManager.loadImageRes( this._iconUrl , this , function loadComplete(texture:egret.Texture):void{
					this.texture = texture;
					this.dispatchEvent(new egret.Event(egret.Event.COMPLETE));
				} );

			} else if (!value) {
				(<fairygui.GLoader>this._iconObject).texture = null;
			}

			this._iconUrl = value;
		}

		public set texture(value: egret.Texture) {

			if (this._iconObject) {
				(<fairygui.GLoader>this._iconObject).texture = value;
				this.width = value ? value.textureWidth : 1;
				this.height = value ? value.textureHeight : 1;
			}
		}
		/**
		 * 设置图片纹理
		 */
		public get texture(): egret.Texture {

			return (<fairygui.GLoader>this._iconObject).texture;
		}

		public get url(): string {

			return this._iconUrl;
		}

		public setIcon(url: string, callback: Function = null, thisObject: any = null ): void {
			
			if (!url) {
				if (callback != null && thisObject != null) {
					callback.call(thisObject);
				}
				this.clear();
			}else if( url && url.indexOf("ui://") == 0 ){
				this.icon = url;
				if (callback != null && thisObject != null) {
					callback.call(thisObject);
				}
			}else if ( url.indexOf("/") < 0 ) {
				this.texture = RES.getRes(url);
			} else {
				this.loadImage(url, callback, thisObject );
			}
			this._iconUrl = url;
		}

		/**
		 * 加载图片
		 * @param url 			图片地址
		 * @param callback 		加载完成调用方法
		 * @param thisObject
		 */
		public loadImage(url: string, callback: Function = null, thisObject: any = null ): void {

			var sel: UIBitmapIcon = this;
			if (sel._iconUrl == url) return;
			sel.clear();
			sel._iconUrl = url;
			if (url != null) {
				LoaderManager.loadImageRes( this._iconUrl , this , onComplete );
			}			
			function onComplete(value: egret.Texture, param: string): void {
				if (value && url == param) {
					sel.texture = value;
					if (callback != null && thisObject != null) {
						callback.call(thisObject);
					}
				}
			}
		}

		public LoadRes(resName: string, atlas: string, callback: Function = null, thisObject: any = null ): void {
			var sel: UIBitmapIcon = this;
			if (sel._iconUrl == resName) return;
			sel.dispose();
			sel._iconUrl = resName;
			if (atlas != null){
				LoaderManager.loadGroups( atlas , onComplete );
			}
			function onComplete(): void {
				sel.texture = RES.getRes(resName);
				if (callback != null && thisObject != null) {
					callback.call(thisObject);
				}
			}
		}

		public hasUrl(url: string): boolean {

			return this._iconUrl == url;
		}

		public show( data:string ):void{

			super.show( data );
			
			this.loadImage( data );
		}

		public hide():void{

			super.hide();

			this.clear();
		}

		public clear(): void {

			this.texture = null;
			this._iconUrl = null;
			this._source = null;
		}

		public dispose(): void {

			super.dispose();

			this._iconUrl = null;
		}
	}

}