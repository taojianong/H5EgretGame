module fairui{

    /**
     * 图片基类
     * @author cl 2018.3.19
     */
    export class BaseImage extends BaseSprite{

        protected img:fairygui.GImage;
        protected _url:string;

        public constructor(){

            super();

            this.img = new fairygui.GImage();
            this.addChild( this.img );
        }

        /**
         * 设置FairyGui资源
         * @param pkgName 包名
         * @param resName 资源名
         */
        public setFairySource( pkgName:string , resName:string , disObj:fairygui.GLoader = null):void{

            if( this._url ){
                if( this._url.indexOf("ui://") == 0 ){
                    //FairyTextureUtils.disposeTexture( this._url , this );//如果这里释放了，不可能重新加载，所以不能释放，除非整包资源都被卸载了!
                    this.texture = null;
                }else if( this._url ){
                    LoaderManager.disposeTarget( this._url , this );
                }                
                this._url = null;
            }

            let url:string = fairygui.UIPackage.getItemURL( pkgName , resName );
            this.setFariyUrl( url );
        }

        /**
         * 设置FairyGui资源地址
         * @param url FairyGui资源地址
         */
        public setFariyUrl( url:string, disObj:fairygui.GLoader = null):void{

            this._url = url;
            this.texture = FairyTextureUtils.getTexture( url , this );
        }

        public set url( value:string ){

            if( value && value.indexOf("ui://") == 0 ){
                this.setFariyUrl( value );
                return;
            }else if( this._url != value && this._url ){
                LoaderManager.disposeTarget( this._url , this );
            }
            
            if( this._url != value && value ){
                LoaderManager.loadImageRes( value , this , function loadComplete(texture:egret.Texture):void{
                    value = LoaderManager.getRes( value , this ) ;
                    this.texture = value;
                    this.dispatchEvent( new egret.Event( egret.Event.COMPLETE ) );
                } , null );
            }else if( !value ){
                this.texture = null;
            }

            this._url = value;
        }
        /**
         * 设置图片加载地址,绝对路径地址
         */
        public get url():string{

            return this._url;
        }

        /**
         * 设置九宫格数据
         * @param value 如 90,2,90,2
         */
        public set sizeGrid( value:string ){

            let rect:egret.Rectangle = new egret.Rectangle();
            let arr:string[] = value.split(",");
            rect.x = parseInt( arr[0] );
            rect.y = parseInt( arr[1] );
            rect.width = parseInt( arr[0] );
            rect.height = parseInt( arr[0] );
            this.scale9Grid = rect;
        }

        public set scale9Grid( value:egret.Rectangle ){

            let content:egret.DisplayObjectContainer = this.img.displayObject as egret.DisplayObjectContainer;
            let bmp:egret.Bitmap = content.getChildAt(0) as egret.Bitmap;
            if( bmp ){
                bmp.scale9Grid = value;
            }            
        }
        /**
         * 设置九宫格
         */
        public get scale9Grid():egret.Rectangle{

            let content:egret.DisplayObjectContainer = this.displayObject as egret.DisplayObjectContainer;
            let bmp:egret.Bitmap = content.getChildAt(0) as egret.Bitmap;
            return bmp.scale9Grid;
        }

        public set texture( value:egret.Texture ){

            this.img.texture = value;

            this.width = value ? value.textureWidth : 1;
            this.height = value ? value.textureHeight : 1;
        }
        /**
         * 设置图片纹理
         */
        public get texture():egret.Texture{

            return this.img.texture;
        }

        public set width( value:number ){

            this.img.width = value;
        }

        public get width():number{

            return this.img.width;
        }

        public set height( value:number ){

            this.img.height = value;
        }

        public get height():number{

            return this.img.height;
        }

        public clear():void{

            //super.clear();

            if( this._url.indexOf("ui://") == 0 ){
                FairyTextureUtils.disposeTexture( this._url , this );
            }else if( this._url ){
                LoaderManager.disposeTarget( this._url , this );
            }

            this._url = null;

            this.texture = null;
        }

        /**
         * 释放资源
         */
        public dispose():void{

            this.removeAllListeners();
            
            this.clear();
            
            super.dispose();

            if( this.img != null ){
                this.img.dispose();
                this.img = null;
            }
        }
    }
}