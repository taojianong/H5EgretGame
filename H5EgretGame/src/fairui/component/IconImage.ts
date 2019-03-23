module fairui {

    import ResPathUtil = com.utils.ResPathUtil;
    
	/**
	 * 物品图标
	 * @author cl 2018.3.26
	 */
    export class IconImage extends fairui.BaseImage {

		/**
		 * 默认图标链接类名 
		 */
        //public static const DEFAULT_ICON:String = "png.common_v1.default_item_icon_common";

        protected _imageType:string;

        protected _callback:Function = null;

		/**
		 * icon资源没加载之前显示的默认图片 
		 */
        public static defaultBaseBitmapData:egret.Texture;
		
        public get imageType():string {

            return this._imageType;
        }
        /**
		 * 类型，EnumImageType常量
		 * @param value
		 */
        public set imageType(value:string) {

            this._imageType = value;
        }

		/**
		 * 构造函数 
		 * @param $imageType 类型，EnumImageType常量
		 */
        public constructor($imageType:string = null, callback:Function = null) {
            
            super();
            this._imageType = $imageType;
            this._callback = callback;
        }

        public set url(value:any) {

            egret.superSetter( IconImage , this , "url" , value );
        }

		/**
		 * 图标飞包袱时使用源IconImage的url生成一个新的IconImage时使用 
		 * @param url
		 * 
		 */
        public loadIcon(url:string): void {

            this._url = url;
            // this._src = url;
            // netLoad();
        }


		/**
		 * 传入配置表中的icon字段即可 
		 * @param value
		 */
        public set path(value:string) {
            var temp:string = ResPathUtil.getIcon( value , this._imageType);
            if ( this._url != temp) {
                this.clear();
                this.showDefault();
                if ( this._callback != null) {
                    this._callback.apply( this );
                }
                if (value != null && this._imageType != null) {
                   // this._url = temp;
                    //netLoad();
                    this.url = temp;
                }
            }
        }

        public showDefault(): void {
            // if (defaultBaseBitmapData == null) {
            //     var cls: Class = ClassUtil.getClass(DEFAULT_ICON) as Class;
            //     defaultBaseBitmapData = new cls();
            // }
            // bitmapData = defaultBaseBitmapData;

            this.texture = fairui.FairyTextureUtils.getTextureBy( "common" , "default_item_icon_common" );
        }

        public dispose():void{

            super.dispose();
        }
    }
}
