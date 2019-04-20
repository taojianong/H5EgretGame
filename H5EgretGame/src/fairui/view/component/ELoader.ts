module fairui {

    /**
     * 加载图片
     * @author cl 2019.1.29
     */
    export class ELoader extends BaseSprite {

        public img: fairygui.GLoader;

        protected _source: any;
        protected _url: string;
        protected _texture: egret.Texture;

        protected _pixelHitTest:boolean = false;

        public constructor(loader: fairygui.GLoader = null) {

            super();

            this.img = loader || new fairygui.GLoader();
            this.img.touchable = false;
        }

        public addEventListener(type: string, listener: Function, thisObject: any ): void {

            this.img.addEventListener(type, listener, thisObject );
        }

        public removeEventListener( type: string, listener: Function, thisObject: any ):void{

            this.img.removeEventListener( type, listener, thisObject );
        }

        public set fill( value:number ){

            this.img.fill = value;
        }

        public get fill():number{
            
            return this.img.fill;
        }

        public set autoSize( value:boolean ){

            this.img.autoSize = value;
        }      
        /**是否自动大小 */
        public get autoSize():boolean{

            return this.img.autoSize;
        }

        public set touchable(value: boolean) {

            this.img.touchable = value;
        }

        public get touchable(): boolean {

            return this.img.touchable;
        }

        public get parent(): fairygui.GComponent {

            return this.img ? this.img.parent : null;
        }

        public removeFromParent(): void {

            if ( this.img ) {
                this.img.removeFromParent();
            }
        }

        /**
         * 设置FairyGui资源
         * @param pkgName 包名
         * @param resName 资源名
         */
        public setFairySource(pkgName: string, resName: string): void {

            if (this._url) {
                this._url = null;
                this.texture = null;
            }

            let url: string = fairygui.UIPackage.getItemURL(pkgName, resName);
            this.setFariyUrl(url);
        }

        /**
         * 设置FairyGui资源地址
         * @param url FairyGui资源地址
         */
        public setFariyUrl(url: string): void {

            this._url = url;
            this.texture = FairyTextureUtils.getTexture(url);
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

        public loadImage(url: string, callback: Function = null, thisObject: any = null ): void {

            var sel: ELoader = this;
            if (sel._url == url) return;
            sel.clear();
            sel._url = url;
            if (url != null) {
                LoaderManager.loadImageRes( url , this , onComplete );
            }
            function onComplete(value:egret.Texture ): void {
               sel.texture = value;
                if (callback != null && thisObject != null) {
                    callback.call(thisObject);
                }
            }
        }

        public set url(value: string) {

            let _self: ELoader = this;
            let oldurl: string = _self._url;
            _self._url = value;
            if (oldurl != value && value) {
                _self.texture = null;
                if( value.indexOf("ui:") == 0 ){
                    _self.img.url = value;
                }else{
                    LoaderManager.loadImageRes(value,_self,  function loadComplete(value:egret.Texture): void {
                        _self.texture = value;
                    } );
                }                
            } else if (!value) {
                _self.texture = null;
            }
        }

        public get url(): string {

            return this._url;
        }

        public set texture(value: egret.Texture) {

            if (this.img != null) {
                this.img.texture = value;
            }
            if (value != null) {
                this.dispatchEvent(new egret.Event(egret.Event.COMPLETE));
            }
        }

        /**
         * 移动
         * @param $x        x坐标
         * @param $y        y坐标
         * @param $parent   容器
         */
        public move($x: number, $y: number, $parent: fairygui.GComponent = null) {

            this.img.x = $x;
            this.img.y = $y;
            if ($parent != null) {
                $parent.addChild(this.img);
            }
        }

        /**
         * 设置图片纹理
         */
        public get texture(): egret.Texture {

            return this.img.texture;
        }

        public set visible(value: boolean) {

            this.img.visible = value;
        }

        public get visible(): boolean {

            return this.img.visible;
        }

        public set grayed(val: boolean) {
            this.img.grayed = val;
        }

        public get grayed(): boolean {
            return this.img.grayed;
        }

        public set alpha(value: number) {
            this.img.alpha = value;
        }

        public set scaleX(value: number) {

            this.img.scaleX = value;
        }

        public get scaleX(): number {

            return this.img.scaleX;
        }

        public set scaleY(value: number) {

            this.img.scaleY = value;
        }

        public get scaleY(): number {

            return this.img.scaleY;
        }

        public setScale(sx: number, sy: number) {

            this.img.setScale(sx, sy);
        }

        public set x(value: number) {

            this.img.x = value;
        }

        public get x(): number {

            return this.img.x;
        }

        public set y(value: number) {

            this.img.y = value;
        }

        public get y(): number {

            return this.img.y;
        }

        public set width(value: number) {

            this.img.width = value;
        }

        public get width(): number {

            return this.img ? this.img.width : 0;
        }

        public set height(value: number) {

            this.img.height = value;
        }

        public get height(): number {

            return this.img ? this.img.height : 0;
        }

        public setSize( width:number , height:number ):void{

            if( this.img ){
                this.img.setSize( width , height );
            }
        }

        public set rotation(value: number) {

            this.img.rotation = value;
        }

        public get rotation(): number {

            return this.img.rotation;
        }
        
        public set pixelHitTest(val: boolean) {
            let loader: fairygui.GLoader = this.img;
            if (loader.content instanceof egret.Bitmap) {
                loader.content.pixelHitTest = val;
            }
            this._pixelHitTest = val;
        }
        /**
         * 像素碰撞
         */
        public get pixelHitTest():boolean{
            return this._pixelHitTest;
        }

        public get content():any{

            return this.img.content;
        }

        public clear(): void {
            super.clear();
            this._url = "";
            this.texture = null;
        }

        public dispose(): void {
            
            super.dispose();
            if (this.img != null) {
                this.img.dispose();
                this.img = null;
            }
            this._texture = null;
            this._url = null;
            this._source = null;
        }
    }
}