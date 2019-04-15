module fairui {

	/**
	 * 头像信息
	 */
	export class UIHeadItem extends BaseButton{

		private eloader_icon:ELoader;

		/**头像ID */
		private _faceId:number = 0;

		private _headIcon:string = "";

		public constructor() {

			super();

			this.touchEnabled = true;
			this.touchChildren = false;
		}

		protected constructFromXML(xml: any): void {

            super.constructFromXML(xml);
        }

		public InitUI():void{

			super.InitUI();

			let gloader:fairygui.GLoader = this.getChild("icon").asLoader;
			this.eloader_icon = new ELoader( gloader );
			this.AddComponent( this.eloader_icon );
		}

		public set data( value:any ){

			this._faceId = value;

			let roleRes:RoleResource = RoleResource.getItemByKey( this._faceId );
			if( roleRes ){
				this._headIcon = roleRes.head;
				this.url = UrlUtil.getHeadUrl( this._headIcon , this._headIcon.indexOf(".png") ? "" : ".png" );//头像地址				
			}
		}

		public get data():any{

			return this._faceId;
		}

		public get headIcon():string{

			return this._headIcon;
		}

		public set texture( value:egret.Texture ){

			this.eloader_icon.texture = value;
		}

		public get texture():egret.Texture{

			return this.eloader_icon.texture;
		}

		public set url( value:string ){

			if( this.eloader_icon.url != value && value ){
				this.eloader_icon.LoadImage( value , this.loadComplete , this );
			}else if( !value ){
				this.eloader_icon.Reset();
			}
		}

		public get url():string{

			return this.eloader_icon.url;
		}

		private loadComplete():void{

			if( this.eloader_icon && this.eloader_icon.texture ){
				this.eloader_icon.x = ( this.width - this.eloader_icon.texture.textureWidth ) * 0.5;
			}			
		}

		public Reset():void{

			super.Reset();
		}

		public Destroy():void{

			super.Destroy();
		}
	}
}