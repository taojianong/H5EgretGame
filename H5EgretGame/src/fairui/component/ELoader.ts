module fairui {

    import GLoader = fairygui.GLoader;
    import Bitmap = egret.Bitmap;

    /**
     * 加载图片
     * @author cl 2018.3.17
     */
    export class ELoader extends egret.EventDispatcher {

        public img: fairygui.GLoader;

        protected _url: string;
        protected _texture: egret.Texture;

        public constructor(loader: fairygui.GLoader = null) {

            super();

            this.img = loader || new fairygui.GLoader();
        }

        addEventListener(type: string, listener: Function, thisObject: any, useCapture?: boolean, priority?: number): void {
            super.addEventListener(type, listener, thisObject, useCapture, priority);
        }

        /**
         * 设置FairyGui资源
         * @param pkgName 包名
         * @param resName 资源名
         */
        public setFairySource(pkgName: string, resName: string): void {

            // if (this._url) {
            //     if (this._url.indexOf("ui://") == 0) {
            //         FairyTextureUtils.disposeTexture(this._url, this);//如果这里释放了，不可能重新加载，所以不能释放，除非整包资源都被卸载了!
            //         this.texture = null;
            //     } else if (this._url) {
            //         LoaderManager.disposeTarget(this._url, this);
            //     }
            //     this._url = null;
            // }
            let url: string = fairygui.UIPackage.getItemURL(pkgName, resName);
            this.setFariyUrl(url);
        }

        /**
         * 设置FairyGui资源地址
         * @param url FairyGui资源地址
         */
        public setFariyUrl(url: string): void {
            if (this._url != url) {
                if (this._url && this._url.indexOf("ui://") == -1) { //释放之前的外部加载的URL资源
                    LoaderManager.disposeTarget(this._url, this);
                }
                this._url = url;
                this.texture = FairyTextureUtils.getTexture(url, this);
            }
        }

        public set url(value: string) {

            let _self: ELoader = this;
            if (_self._url != value && _self._url) {
                LoaderManager.disposeTarget(_self._url, _self);//这里释放有问题,后面再加载释放的图片有问题
            }

            let oldurl: string = _self._url;
            _self._url = value;
            if (oldurl != value && value) {
                _self.texture = null;
                LoaderManager.loadImageRes(value, _self, function loadComplete(texture: egret.Texture): void {
                    if (_self._url == value) {
                        let tempValue: any = LoaderManager.getRes(value, _self);
                        _self.texture = tempValue;
                    }
                }, null);
            } else if (!value) {
                _self.texture = null;
            }

            // _self._url = value;
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

        public set rotation(value: number) {

            this.img.rotation = value;
        }

        public get rotation(): number {

            return this.img.rotation;
        }

        public get displayObject(): fairygui.GObject {

            return this.img;
        }

        public dispose(): void {

            if (this._url) {
                LoaderManager.disposeTarget(this._url, this);
                this._url = null;
            }
            if (this.img != null) {
                this.img.dispose();
                this.img = null;
            }
            this._texture = null;
            this._url = null;
        }

        public set pixelHitTest(val: boolean) {
            let loader: GLoader = this.img
            if (loader.content instanceof Bitmap) {
                loader.content.pixelHitTest = val;
            }
        }

    }
}