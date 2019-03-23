module fairui {

    import ResPathUtil = com.utils.ResPathUtil;
    
    export class EImage extends fairygui.GButton {
        /**保存的图片路径*/
        private _url: string;
        // public setup_afterAdd(xml: any): void {
        //     //App.log.debug(xml);
        //     super.setup_afterAdd(xml);
        // }

        public set icon(value: any) {
            //这里要覆盖父类的setup_afterAdd,不然要去加载绝对路径的本地的资源文件
            App.log.debug(value);
        }

        //public setup_beforeAdd(xml: any): void {
			// super.setup_beforeAdd(xml);
		public setup_beforeAdd(buffer: fairygui.ByteBuffer, beginPos: number): void {
			super.setup_beforeAdd( buffer , beginPos );

            if (this.data && this.data != undefined && this.data.length > 0) {
                let tmpArr: Array<string> = this.data.split(",");

                //this.url = ResPathUtil.getImageRes(tmpArr[0].replace("\\",""), tmpArr[1].replace("\\",""), tmpArr[2].replace("\\",""));
                this.url = ResPathUtil.getImageRes(tmpArr[0].replace(/(\\r|\\n|\\)/g, ""), tmpArr[1].replace(/(\\r|\\n|\\)/g, ""), tmpArr[2].replace(/(\\r|\\n|\\)/g, ""));
            }
        }

        public set url(value: string) {
            if (this._url != value && this._url) {
                LoaderManager.disposeTarget(this._url, this);
            }

            if (this._url != value && value) {
                LoaderManager.loadImageRes(value, this, function loadComplete(texture: egret.Texture): void {
                    let tempValue = LoaderManager.getRes(value, this);
                    this.texture = tempValue;
                    this.dispatchEvent(new egret.Event(egret.Event.COMPLETE));
                }, null);
            } else if (!value) {
                (<fairygui.GLoader>this._iconObject).texture = null;
            }

            this._url = value;
        }

        public set texture(value: egret.Texture) {

            (<fairygui.GLoader>this._iconObject).texture = value;
            this.width = value ? value.textureWidth : 1;
            this.height = value ? value.textureHeight : 1;
        }
        /**
         * 设置图片纹理
         */
        public get texture(): egret.Texture {

            return (<fairygui.GLoader>this._iconObject).texture;
        }

        public get url(): string {

            return this._url;
        }

        public dispose(): void {

            if (this._url) {
                LoaderManager.disposeTarget(this._url, this);
                this._url = null;
            }

            if (this._iconObject != null) {
                this._iconObject.dispose();
                this._iconObject = null;
            }

            super.dispose();
        }
    }

}