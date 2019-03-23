module fairui{

    /**
     * FairyGUI纹理集处理工具类
     * @author cl 2018.3.19
     */
    export class FairyTextureUtils{

        /**
         * 纹理集字典
         */
        private static textureMap:flash.Dictionary = new flash.Dictionary();

        /**
         * 获取资源地址
         * @param pkgName   包名
         * @param resName   资源名
         */
        public static getUrl( pkgName:string , resName:string ):string{

            let url:string = fairygui.UIPackage.getItemURL( pkgName , resName );
            return url;
        }

        /**
         * 获取Fairy资源包里的图片资源
         * @param pkgName   包名
         * @param resName   资源名
         * @param target    使用对象
         */
        public static getTextureBy(pkgName:string , resName:string , target:any = null ):egret.Texture{

            let url:string = fairygui.UIPackage.getItemURL( pkgName , resName );
            return this.getTexture( url , target );
        }

        /**
         * 根据Fairygui的URL地址获取对应纹理
         * @param uiUrl     如ui://q4evlwcjdmoc2i
         * @param target    使用对象
         */
        public static getTexture( uiUrl:string , target:any = null ):egret.Texture{

            let obj:Object = uiUrl ? this.textureMap.getItem( uiUrl ) : null;
            let texture:egret.Texture = obj ? obj[ "texture" ] : null;
            let targetList:Array<any> = obj ? obj["targetlist"] : [];
            if( texture == null ){
                let gObj:fairygui.GObject = fairygui.UIPackage.createObjectFromURL( uiUrl );
                let img:fairygui.GImage = gObj != null ? gObj.asImage : null;
                texture = img ? img.texture : null;
                if( texture != null ){
                    obj = obj || {"texture":texture,"targetlist":[]};
                    obj[ "texture" ] = texture;
                    targetList = obj[ "targetlist" ];
                    this.textureMap.setItem( uiUrl , obj );
                }
            }
            if( target && targetList.indexOf( target ) == -1 ){
                targetList.push( target );
            }
            return texture;
        }

        /**
         * 释放资源
         * @param pkgName   包名
         * @param resName   资源名
         * @param target    使用对象
         */
        public static disposeTextureBy( pkgName:string , resName:string , target:any = null ):void{

            let url:string = fairygui.UIPackage.getItemURL( pkgName , resName );
            this.disposeTexture( url , target );
        }

        /**
         * 释放纹理
         * @param uiUrl     如ui://q4evlwcjdmoc2i
         * @param target    使用对象
         */
        public static disposeTexture( uiUrl:string , target:any = null ):void{

            let obj:Object = uiUrl ? this.textureMap.getItem( uiUrl ) : null;
            let targetList:Array<any> = obj ? obj["targetlist"] : null;
            if( targetList != null ){
                if( target != null && targetList.indexOf( target ) != -1 ){
                    targetList.splice( targetList.indexOf(target) , 1 );
                }else if( target == null ){
                    for( let i:number=targetList.length-1;i>=0;i-- ){
                        targetList.splice( i , 1 );
                    }
                }
                if( targetList.length <= 0 ){
                    let texture:egret.Texture = obj["texture"];
                    if( texture != null ){
                        // texture.dispose();
                        texture = null;
                    }
                    obj = null;
                    this.textureMap.delItem( uiUrl );                   
                }
            }
        }

        /**
         * 释放所有资源
         */
        public static disposeAll():void{

            let len:number = this.textureMap.keys.length;
            let obj:Object;
            let key:any;
            for( let i:number = len - 1;i>=0;i-- ){
                key = this.textureMap.keys[i];
                if(!key) continue;
                obj = this.textureMap.getItem( key );
                if( obj != null ){
                    this.disposeTexture( key );
                }else{
                    this.textureMap.delItem( key );
                }
            }
        }
    }
}