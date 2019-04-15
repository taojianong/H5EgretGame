module fairui{

    /**
     * FairyGUI纹理集处理工具类
     * @author cl 2019.2.20
     */
    export class FairyTextureUtils{

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
         */
        public static getTextureBy(pkgName:string , resName:string ):egret.Texture{

            let url:string = fairygui.UIPackage.getItemURL( pkgName , resName );
            return this.getTexture( url );
        }

        /**
         * 根据Fairygui的URL地址获取对应纹理
         * @param uiUrl     如ui://q4evlwcjdmoc2i
         */
        public static getTexture( url:string ):egret.Texture{

            let item:fairygui.PackageItem = fairygui.UIPackage.getItemByURL( url );
            if( item ){
                item.load();
            }
            return item ? item.texture : null;
        }
    }
}