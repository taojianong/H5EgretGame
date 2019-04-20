module fairui {

    /**
     * 用于加载动态图片的按钮 
     * @author cl 2018.3.12
     * 按照mornui图片格式,一张三个状态的图片
     */
    export class LoaderButton extends BaseButton {
        /**边框 */
        protected img: fairygui.GImage;
        /**图片加载器 */
        protected img_loader: fairygui.GLoader;
        /**按钮Title */
        protected txt_title: fairygui.GTextField;
        /**图片地址 */
        protected _url: string;
        /**数据 */
        protected _data: any;

        /**按钮图标集 */
        protected _spriteSheet: egret.SpriteSheet;
        /**状态 */
        protected _state: string;

        /**当前选中状态 */
        protected _selected2: boolean;

        public constructor() {

            super();
        }

        protected constructFromXML(xml: any): void {
            super.constructFromXML(xml);

            this.img_loader = this.getElement("icon");
            this.txt_title = this.getElement("title");

            this.img = this.getElement("img");
            this.img.visible = false;
        }

        public set title(value: string) {

            value = Global.lang.getLang(value);
            egret.superSetter(LoaderButton, this, "title", value);
        }

        public set selected(val: boolean) {

            this._selected2 = val;

            egret.superSetter(LoaderButton, this, "selected", val);

            if (this.spriteSheet != null && this.img_loader) {
                this.img_loader.texture = this.spriteSheet.getTexture(val ? "down" : "up");
            }
        }

        /**
         * 覆写对应按钮
         */
        protected setState(value: string): void {

            this._state = value;

            if (this.spriteSheet != null && this.img_loader) {
                if (!this._selected2) {
                    if (value == fairygui.GButton.UP) {
                        this.img_loader.texture = this.spriteSheet.getTexture("up");
                    } else if (value == fairygui.GButton.DOWN || value == fairygui.GButton.SELECTED_DISABLED) {
                        this.img_loader.texture = this.spriteSheet.getTexture("down");
                    } else if (value == fairygui.GButton.OVER || value == fairygui.GButton.SELECTED_OVER) {
                        this.img_loader.texture = this.spriteSheet.getTexture("over");
                    }
                } else {
                    this.img_loader.texture = this.spriteSheet.getTexture("down");
                }

                super.setState(value);
            }
        }

        /**
         * 当前按钮状态
         */
        public get state(): string {

            return this._state;
        }

        public set skin(value: string) {

            this.url = value;
        }
        /**
         * 设置皮肤
         */
        public get skin(): string {

            return this._url;
        }

        public set url(value: string) {

            if (this._url != value && this._url) {
                LoaderManager.disposeTarget(this._url, this);
            }

            if (value) {
                LoaderManager.loadImageRes(value, this, function loadComplete(texture: egret.Texture): void {
                    let tempValue = LoaderManager.getRes(value, this);
                    this.setSpriteSheet(tempValue);
                }, null);
            } else {
                this.setState(this._state);
            }
            this._url = value;
        }
        /**
         * 设置皮肤加载地址
         */
        public get url(): string {

            return this._url;
        }

        /**
         * 设置纹理集
         */
        public setSpriteSheet(value: egret.Texture) {

            if (value) {

                this.width = value.textureWidth;
                this.height = parseInt("" + (value.textureHeight / 3));

                if (this._spriteSheet != null) {
                    this._spriteSheet.dispose();
                    this._spriteSheet = null;
                }
                //给加载器添加纹理
                if (this.img_loader && this.img_loader.texture != null) {
                    this.img_loader.texture.dispose();
                    this.img_loader.texture = null;
                }
                if (this.txt_title != null) {
                    this.txt_title.width = this.width;
                    this.txt_title.y = (this.height - this.txt_title.height) >> 1;
                }

                this._spriteSheet = new egret.SpriteSheet(value);

                this._spriteSheet.createTexture("up", 0, 0, this.width, this.height);
                this._spriteSheet.createTexture("over", 0, this.height, this.width, this.height);
                this._spriteSheet.createTexture("down", 0, this.height * 2, this.width, this.height);

                if (this._selected2) {
                    this.setState(fairygui.GButton.DOWN);
                } else {
                    this.setState(this._state || fairygui.GButton.UP);
                }
            }
        }

        /**
         * 按钮纹理集（只读）
         */
        public get spriteSheet(): egret.SpriteSheet {

            return this._spriteSheet;
        }

        public set data(value: any) {

            this._data = value;
        }
        /**
         * 获取数据
         */
        public get data(): any {

            return this._data;
        }

        /**
         * 获取条目
         * @param name 组件名字
         */
        public getElement(name: string): any {

            return this.getChild(name);
        }

        public dispose(): void {

            if (this._url) {
                LoaderManager.disposeTarget(this._url, this);
                this._url = null;
            }

            if (this._spriteSheet != null) {
                this._spriteSheet.dispose();
                this._spriteSheet = null;
            }

            if (this.img_loader != null) {
                this.img_loader.dispose();
                this.img_loader = null;
            }

            if (this.txt_title != null) {
                this.txt_title.dispose();
                this.txt_title = null;
            }

            this._data = null;

            super.dispose();
        }
    }
}