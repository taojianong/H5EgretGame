module fairui {

    import GLoader = fairygui.GLoader;
    import Bitmap = egret.Bitmap;
    import Texture = egret.Texture;
    import GButton = fairygui.GButton;
    import ServerTimeData = com.time.ServerTimeData;
    import Transition = fairygui.Transition;

    export class EButton extends BaseButton {
        protected _data: any = null;
        private _iconArr: Array<string> = null;
        private _selectedState: boolean;
        /**是否是三种状态的按钮*/
        private _isThreeStateBtn: boolean = true;
        /**是否是加载的外部图片*/
        private _isExternalImgRes: boolean = false;
        /**暂存加载的texture*/
        private _textures: Array<Texture> = new Array<Texture>();
        /**解锁特效*/
        private unlockEffect: AssetEffect = null;

        private _custom_downEffect: number = 0;

        /**2为缩放 */
        public set downEffect(val: number) {
            this._custom_downEffect = val;
        }

        private _custom_downScaled: boolean = false;
        private _custom_downEffectValue: number = 0.8;

        public set downEffectValue(val: number) {
            this._custom_downEffectValue = val;
        }

        private org_dot_x: number;

        public constructor() {
            super();
        }

        //public setup_beforeAdd(xml: any): void {
			// super.setup_beforeAdd(xml);
		public setup_beforeAdd(buffer: fairygui.ByteBuffer, beginPos: number): void {
			super.setup_beforeAdd( buffer , beginPos );

            if ( this.data ) {
                this._data = this.data;
                if (this._data && this._data.length > 0) {
                    this._iconArr = this._data.split(",");
                }
            } else {
                this._isThreeStateBtn = false;
                if (!this._iconArr) {
                    this._iconArr = new Array<string>(2);
                }
                this._iconArr[0] = this.resourceURL;
                this._iconArr[1] = this.resourceURL;
            }
        }

        protected setState(val: string): void {
            super.setState(val);
            switch (val) {
                case EButton.UP:
                    {
                        if (!this._selectedState) {
                            if (this._iconObject) {
                                if (!this._isExternalImgRes) {
                                    this._iconObject.asLoader.url = this.icon;
                                }
                                else {
                                    this._iconObject.asLoader.texture = this._textures[0];
                                }
                            }
                        }
                        break;
                    }
                case EButton.DOWN:
                    {
                        if (this._iconObject) {
                            if (!this._isExternalImgRes) {
                                if (this._iconArr[0] == "") {
                                    this._iconArr[0] = this.icon;
                                }
                                this._iconObject.asLoader.url = this._iconArr[0].replace(/(\\r|\\n|\\)/g, "");
                            }
                            else {
                                this._iconObject.asLoader.texture = this._textures[1];
                            }
                        }
                        break;
                    }
                case EButton.OVER:
                    {
                        if (this._iconObject) {
                            if (!this._isExternalImgRes) {
                                if (this._iconArr[1] == "") {
                                    this._iconArr[1] = this.icon;
                                }
                                this._iconObject.asLoader.url = this._iconArr[1].replace(/(\\r|\\n|\\)/g, "");
                            }

                            else {
                                this._iconObject.asLoader.texture = this._textures[2];
                            }
                        }
                    }
            }
            //主动设置downEffect
            if (this._custom_downEffect == 2) {
                if (val == GButton.DOWN || val == GButton.SELECTED_OVER || val == GButton.SELECTED_DISABLED) {
                    if (!this._custom_downScaled) {
                        this._custom_downScaled = true;
                        this.setScale(this.scaleX * this._custom_downEffectValue, this.scaleY * this._custom_downEffectValue);
                    }
                }
                else {
                    if (this._custom_downScaled) {
                        this._custom_downScaled = false;
                        this.setScale(this.scaleX / this._custom_downEffectValue, this.scaleY / this._custom_downEffectValue);
                    }
                }
            }
        }
        
        /**
         * 设置按钮选中状态
         */
        public set selected(value: boolean) {
            if (value) {
                this._selectedState = true;
                this.setState(EButton.DOWN);
            } else {
                this._selectedState = false;
                this.setState(EButton.UP);
            }
        }
        protected constructFromXML(xml: any): void {
            super.constructFromXML(xml);
        }

        /**
         * 设置三种状态的图片url
         * */
        public btnUrl(val: string, isThreeStateBtn: boolean = true): void {
            this._isThreeStateBtn = isThreeStateBtn;
            if (val && val.indexOf("ui:") != -1) {
                this._isExternalImgRes = false;
                if (val != this.icon) {
                    this.icon = val;
                    if (!this._iconArr) {
                        this._iconArr = new Array<string>(2);
                    }
                    if (isThreeStateBtn) {
                        this._iconArr[0] = val.replace(/1$/g, "2") || this.icon;
                        this._iconArr[1] = val.replace(/1$/g, "3") || this.icon;
                    } else {
                        this._iconArr[0] = this.icon;
                        this._iconArr[1] = this.icon;
                    }
                }
            }
            else { //加载外部图片
                this._isExternalImgRes = true;
                if (this.icon != val && this.icon && this.icon.indexOf("ui:") == -1) {
                    LoaderManager.disposeTarget(this.icon, this);
                    if (isThreeStateBtn) {
                        LoaderManager.disposeTarget(this._iconArr[0], this);
                        LoaderManager.disposeTarget(this._iconArr[1], this);
                    }
                }
                if (!this._iconArr) {
                    this._iconArr = new Array<string>(2);
                }
                if (isThreeStateBtn) {
                    this._iconArr[0] = val.replace(/1\./g, "2.");
                    this._iconArr[1] = val.replace(/1\./g, "3.");
                } else {
                    this._iconArr[0] = this.icon;
                    this._iconArr[1] = this.icon;
                }
                if (this.icon != val && val != "") {
                    LoaderManager.loadImageRes(val, this, function loadComplete(texture: egret.Texture): void {
                        let tempValue: any = LoaderManager.getRes(val, this);
                        this._textures = this._textures || new Array<Texture>();
                        this._textures[0] = tempValue;
                        this.selected = this._selectedState;
                    }, null);
                    this.icon = val;
                }
                if (isThreeStateBtn) {
                    for (let i: number = 0; i < 2; i++) {
                        LoaderManager.loadImageRes(this._iconArr[i], this, function loadComplete(texture: egret.Texture): void {
                            let tempValue: any = LoaderManager.getRes(this._iconArr[i], this);
                            this._textures = this._textures || new Array<Texture>();
                            this._textures[i + 1] = tempValue;
                            this.selected = this._selectedState;
                        }, null);
                    }
                }
            }
        }

        public set pixelHitTest(val: boolean) {
            let loader: GLoader = this._iconObject.asLoader;
            if (loader.content instanceof Bitmap) {
                loader.content.pixelHitTest = val;
            }
        }

        public dispose(): void {

            super.dispose();

            this._textures = null;

            if (this.icon && this.icon.indexOf("ui:") == -1) {
                LoaderManager.disposeTarget(this.icon, this);
                LoaderManager.disposeTarget(this._iconArr[0], this);
                LoaderManager.disposeTarget(this._iconArr[1], this);
            }
        }

        public playUnlockEffect(func: Function): void {
            let _self: EButton = this;
            if (_self.unlockEffect == null) {
                _self.unlockEffect = new AssetEffect();
                _self.unlockEffect.url = AssetPathManager.getInstance().getMenuEffect("main", "effect_05");
                _self.unlockEffect.move(this.width * 0.5, this.height * 0.5);
                _self.addChild(_self.unlockEffect);
                _self.unlockEffect.playOnce(playComplete);
            }

            function playComplete(): void {
                if (_self.unlockEffect) {
                    _self.unlockEffect.stop();
                    _self.unlockEffect.removeFromParent();
                    // _self.activeEffect.dispose();
                    _self.unlockEffect = null;
                    if (func != null) {
                        func.apply(this);
                    }
                }
            }
        }

        public set y(value: number) {

            egret.superSetter(EButton, this, "y", value);
        }

        public get y(): number {

            return egret.superGetter(EButton, this, "y");
        }

        // public swing(val: boolean): void {
        //     if (val) {
        //         TweenLite.killTweensOf(this.dot);
        //         TweenLite.to(this.dot, 0.2, { rotation: -10 });
        //         TweenLite.to(this.dot, 0.5, { rotation: 13, delay: 0.2 });
        //         TweenLite.to(this.dot, 0.6, { rotation: -14, delay: 0.7 });
        //         TweenLite.to(this.dot, 0.4, { rotation: 18, delay: 1.3 });
        //         TweenLite.to(this.dot, 0.3, { rotation: 0, delay: 1.7 });
        //         App.timer.doTimeOnce(Math.round(3500 + Math.random() * 3000), flash.bind(this.swing, this), [true]);
        //     } else {
        //         TweenLite.killTweensOf(this.dot);
        //         App.timer.clearTimer(this.swing);
        //     }
        // }
    }
}
