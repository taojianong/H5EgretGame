module fairui{

	/**
	 * 标题栏
	 * @author cl 2018.4.2
	 */
	export class TitleBar extends BaseSprite{

		protected img_bar:fairygui.GImage;
		protected eloader_title:ELoader;
		public btn_close:fairygui.GButton;

		public constructor(){

			super();
		}

		 protected constructFromXML(xml: any): void {

            super.constructFromXML(xml);

			this.eloader_title.addEventListener( egret.Event.COMPLETE , this.loadTitleComplete , this );
			this.btn_close.addEventListener( egret.TouchEvent.TOUCH_END , this.close , this );

			try {
				let json:Object = JSON.parse( this.data );
				if( json && json.hasOwnProperty("title") && json.hasOwnProperty("pkg")){
					this.setTitleSkin( json["pkg"] , json["title"] );
				}
			} catch (error) {
				
			}			
        }

		/**
         * 设置标题皮肤
         * @author pkgName 包名
         * @author resName 资源名
         */
        public setTitleSkin( pkgName:string , resName:string ):void{

            // this.eloader_title.texture = fairui.FairyTextureUtils.getTextureBy( pkgName , resName );
			let url:string  = fairui.FairyTextureUtils.getUrl( pkgName , resName );
			if( url == null ){
				Global.log.error( this , "没有对应标题资源 " + pkgName + "_" + resName + "!");
			}else{
				this.eloader_title.setFairySource( pkgName , resName );
			}			
        }

		/**
         * 加载标题文字图片完成
         */
        private loadTitleComplete( e:egret.Event ):void{

            this.eloader_title.x = ( this.width - this.eloader_title.width ) * 0.5;
			this.eloader_title.y = ( this.height - this.eloader_title.height ) * 0.5;
        }

		public clear():void{

			super.clear();
			
		}

		private close():void{

			if( this.parent instanceof BasePanel ){
				(this.parent as BasePanel).close();
			}else if( this.parent && this.parent.parent instanceof BasePanel ){
				(this.parent.parent as BasePanel).close();
			}
		}

		public dispose():void{

			this.eloader_title.removeEventListener( egret.Event.COMPLETE , this.loadTitleComplete , this );

			super.dispose();

			if( this.eloader_title != null ){
				this.eloader_title.dispose();
			}
			this.eloader_title = null;
			this.img_bar = null;
			this.btn_close = null;

		}
	}
}