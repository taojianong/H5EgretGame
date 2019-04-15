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
				LoadQueue.Inst.loadTexture( value , function loadComplete(value: TextureResource, param: string): void {					
					this.texture = value.Res();
					this.dispatchEvent(new egret.Event(egret.Event.COMPLETE));
				}, this,null);
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

		public setIcon(url: string, callback: Function = null, thisObject: any = null, level: number = LoadLevel.DEFAULT, IsClearTexture: boolean = false): void {
			
			if (!url) {
				if (callback != null && thisObject != null) {
					callback.call(thisObject);
				}
				this.Reset();
			}else if( url && url.indexOf("ui://") == 0 ){
				this.icon = url;
				if (callback != null && thisObject != null) {
					callback.call(thisObject);
				}
			}else if ( url.indexOf("/") < 0 ) {
				this.texture = RES.getRes(url);
			} else {
				this.LoadImage(url, callback, thisObject, level, IsClearTexture);
			}
			this._iconUrl = url;
		}

		public LoadImage(url: string, callback: Function = null, thisObject: any = null, level: number = LoadLevel.DEFAULT, IsClearTexture: boolean = false): void {

			var sel: UIBitmapIcon = this;
			if (sel._iconUrl == url) return;
			sel.Reset();//IsClearTexture ? sel.Dispose() : sel.Reset();
			sel._iconUrl = url;
			if (url != null) {
				LoadQueue.Inst.loadTexture(url, onComplete, sel, url, level);
			}			
			function onComplete(value: TextureResource, param: string): void {
				if (value && url == param) {
					sel.texture = value.Res();
					if (callback != null && thisObject != null) {
						callback.call(thisObject);
					}
				}
			}
		}

		public LoadRes(resName: string, atlas: string, callback: Function = null, thisObject: any = null, level: number = LoadLevel.DEFAULT): void {
			var sel: UIBitmapIcon = this;
			if (sel._iconUrl == resName) return;
			sel.Dispose();
			sel._iconUrl = resName;
			if (atlas != null) LoadQueue.Inst.loadGroup(atlas, onComplete, sel, resName, level);
			function onComplete(value: GroupResource, param: string): void {
				if (value.name == atlas && resName == param) {
					this.resource = value;
					sel.texture = value.ResByName(resName);
					if (callback != null && thisObject != null) {
						callback.call(thisObject);
					}
				}
			}
		}

		public HasUrl(url: string): boolean {

			return this._iconUrl == url;
		}

		public show( data:string ):void{

			super.show( data );
			
			this.LoadImage( data );
		}

		public hide():void{

			super.hide();

			this.Reset();
		}

		public Reset(): void {

			this.texture = null;
			this._iconUrl = null;
			this._source = null;
		}

		public Dispose(): void {

			this.dispose();
		}

		public dispose(): void {

			this.Reset();

			super.dispose();

			this._iconUrl = null;
		}
	}

}