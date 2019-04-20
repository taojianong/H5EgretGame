module fairui {

    /**
	 * 底部信息提示(位置在中下部)
	 * @author cl 2018.3.19
	 **/
    export class BottomMessageView extends BaseSprite {

        /**底部提示框高度位置*/
        private MSGHEIGHT: number = 260;
        private DELAYTIME: number = 400;
        private DELAYTIME2: number = 100;
        private H: number = 60;
        private TOTALNUM: number = 4;

        // private _defaultFormat:TextFormat;
        private _showIndex: number = 0;
        private _count: number = 0; //计数
        private _msgAry: Array<any> = []; //存信息
        // private _colorAry: Array<any> = []; //存信息的颜色值
        // private _bottomIconAry: Array<any> = []; //存底部icon的类型，0：蓝色，1：黄色，2：红色
        private _bgImageAry: Array<any> = [];
        // private _iconImageAry: Array<any> = [];
        // private _textFieldAry: Array<any> = [];
        private _clearIdDic: flash.Dictionary = new flash.Dictionary();//存储计时器
        private _alphaIdDic: flash.Dictionary = new flash.Dictionary();//存储计时器
        private _begin:boolean = true;

        private _msgContainer: BaseSprite;

        public constructor() {

            super();

            this._msgContainer = new BaseSprite();
            this.addChild(this._msgContainer);
            this.touchable = false;
        }

        public show(): void {
            let thisObject = this;
            if (this._begin) {
                this._begin = false;
               Global.timer.clearTimer( this.showBottomMessage);
               Global.timer.doTimeLoop( this.DELAYTIME , flash.bind( this.showBottomMessage , thisObject ), [thisObject]);
                EventManager.addEventListener( GameEvent.STGAE_RESIZE, this.setPos , this );
                this.setPos();
            }
        }

        public show2(): void {
            let thisObject = this;
            if (!this._begin) {
                this._begin = true;
               Global.timer.clearTimer(this.showBottomMessage);
               Global.timer.doTimeLoop(this.DELAYTIME2, flash.bind( this.showBottomMessage , thisObject ), [thisObject]);
            }
        }

        private showBottomMessage( thisObject:any ): void {

            var arr: Array<any> = Notice.bottomAry.shift();
            if (arr == null) {
               Global.timer.clearTimer(thisObject.showBottomMessage);
                thisObject._begin = true;
                return;
            }
            var str:string = arr[0];
            var color:number = arr[1];
            var bottomIcon:number = arr[2];
            var isHeightLight: boolean = arr[3];//是否高亮

            if( !FairyUIManager.tipLayer.contains(thisObject) ){
                FairyUIManager.tipLayer.addChild( thisObject );
            }
            thisObject._msgAry.push(str);
            // thisObject._colorAry.push(color);
            // thisObject._bottomIconAry.push(bottomIcon);
            thisObject.addLabelItem(isHeightLight);
        }

		/**
		 * 添加提示组件
		 * @param isHeightLight 是否高亮
		 * 
		 */
        private addLabelItem(isHeightLight: boolean): void {

            var str:string = this._msgAry[this._showIndex];
            if (str != null && str.length > 0) {
                if (this._count >= this.TOTALNUM) {
                    this.removeBaseSpriteChild( this._bgImageAry[0] as TipBottomItem );
                }
                // var iconIndex:number = this._bottomIconAry[this._showIndex];
                // var bgUrl:string = "";
                // var iconVis: boolean = false;
                // if (iconIndex == -1) {
                //     bgUrl = fairygui.UIPackage.getItemURL("common","img_notice_01");//notice_bg1
                //     iconIndex = 0;
                //     iconVis = false;
                // } else {
                //     bgUrl = fairygui.UIPackage.getItemURL("common","img_notice_02");//notice_bg1
                //     iconVis = true;
                // }

                // var bgImg: BaseImage = this.getImage();
                // bgImg.alpha = 1;
                // bgImg.url = bgUrl;
                // bgImg.height = this.H;
                // bgImg.y = -this._count * bgImg.height;
                // //bgImg.sizeGrid = "90,2,90,2";
                // bgImg.width = 373;
                // this._msgContainer.addChild(bgImg);

                // var icon: BaseImage = this.getIconImage();
                // icon.alpha = 1;
                // icon.url = fairygui.UIPackage.getItemURL("common","bottom_icon_"+iconIndex);
                // icon.x = icon.width * 0.5;
                // icon.y = (bgImg.height-icon.height)>>1;
                // icon.visible = iconVis;
                // icon.name = "msgIcon";
                // bgImg.addChild(icon);

                // var label:BaseTextField = new BaseTextField();
                // label.color = this._colorAry[this._showIndex];
                // label.align = fairygui.AlignType.Left;
                // label.autoSize = fairygui.AutoSizeType.Both;
                // label.fontSize = 24;
                // label.width = 200;
                // label.text = str;
                // label.name = "msgLabel";
                // label.filters = [new egret.GlowFilter(0x000000, 1, 2, 2, 5, 1)];
                // bgImg.addChild(label);
                // if (icon.visible) {
                //     label.x = icon.width * 0.5; //bgImg.width - label.textWidth >> 1;
                //     let w:number = label.x + label.textWidth + 30;
                //     bgImg.width = w > 250 ? label.x + label.textWidth + 30 : 250;
                // } else {
                //     label.x = bgImg.width - label.textWidth >> 1;
                // }
                // label.y = bgImg.height - label.textHeight >> 1;                
                // bgImg.x = (this.width - bgImg.width) * 0.5 + 35;
                // icon.x = -icon.width * 0.5;
                // this._textFieldAry.push(label);

                let item:TipBottomItem = this.getImage();
                item.alpha = item.scaleX = item.scaleY = 1;
                item.show(str);
                this._msgContainer.addChild(item);

                ++this._count;
                ++this._showIndex;
                this._bgImageAry.push(item);
                // this._iconImageAry.push(icon);

                this.refreshPos();
                this.showTime(item);
            }
        }

		/**
		 * 去除重复的提示文字,高亮显示已经有的提示文字(现在是出现了重复的就把原来的移除,添加最新的)
		 */
        public heightLightSameMsg(msg:string): boolean {
            // var bg: BaseImage = null;
            var item: TipBottomItem = null;
            // var icon: BaseImage = null;
            for (var i:number = 0; i < this._bgImageAry.length; i++) {
                item = this._bgImageAry[i] as TipBottomItem;
                if (item.text == msg) {
                    // bg = this._bgImageAry[i] as TipBottomItem;
                    this.removeBaseSpriteChildNew( item );
                    return true;
                }
            }
            return false;
        }

        //正常显示4秒后
        private showTime(image: TipBottomItem): void 
        {
            let thisObject:any = this;
            let id: Object =Global.timer.doTimeOnce(4000, flash.bind( this.scale1Time , this) ,  [image,thisObject], false);
            //_clearIdAry.push(id);
            this._clearIdDic.setItem( image , id );
            //trace("showTime:"+image);
        }

        //文字1秒内渐弱至消失
        private scale1Time(image: TipBottomItem,thisObject:any): void 
        {   
            let id: Object =Global.timer.doFrameLoop(1, flash.bind( thisObject.resumeAlpha , this ),  [image,thisObject ], false);
            // this._alphaIdDic[image] = id;
            thisObject._alphaIdDic.setItem( image , id );
            //trace("scale1Time:"+image);
        }

		/**
		 * 改变透明度
		 * @param image
		 * 
		 */
        private resumeAlpha(image: TipBottomItem,thisObject:any): void {
            
            image.alpha -= 0.03;
            if (image.alpha <= 0.01) {
                thisObject.removeBaseSpriteChildNew(image);
            }
        }

		/**
		 * 移除定时器
		 * @param image
		 * 
		 */
        private clearTimerDic(image: TipBottomItem): void {
            if (image == null) {
                return;
            }
            if (this._alphaIdDic.hasOwnProperty(image)) {
               Global.timer.clearTimer( this._alphaIdDic.getItem(image) );
                this._alphaIdDic.setItem(image,null);
                this._alphaIdDic.delItem( image );
            }
            if (this._clearIdDic.hasOwnProperty(image)) {
               Global.timer.clearTimer(this._clearIdDic.getItem(image) as Object);
                this._clearIdDic.setItem(image,null);
                this._clearIdDic.delItem( image );
            }
        }

		/**
		 * 移除所有定时器
		 * @param image
		 * 
		 */
        private clearAllTimerDic(): void {

            this._alphaIdDic.forEach( ( key , data )=>{
               Global.timer.clearTimer(data);
            } , this );            
            this._alphaIdDic = new flash.Dictionary();

            this._clearIdDic.forEach( ( key , data )=>{
               Global.timer.clearTimer(data);
            } , this );  
            this._clearIdDic = new flash.Dictionary();
        }

		/**
		 * 移除底部通知组件
		 * @param image
		 * 
		 */
        private removeBaseSpriteChildNew(image: TipBottomItem): void {
            
            var index:number = this._bgImageAry.indexOf(image);
            if (index == -1) {
                if (image != null && image.parent != null) {
                    image.parent.removeChild(image);
                    //--_count;
                    this.refreshPos();
                }
                this.clearTimerDic(image);
                image = null;
            }
            else {
                // var label: BaseTextField = null;
                // var labArr: Array<any> = this._textFieldAry.splice(index, 1);
                // if (labArr != null && labArr.length > 0) {
                //     label = labArr[0];
                // }
                // if (label != null && label.parent != null) {
                //     label.parent.removeChild(label);
                //     label = null;
                // }

                // var icon: BaseImage = null;
                // var iconArr: Array<any> = this._iconImageAry.splice(index, 1);
                // if (iconArr != null && iconArr.length > 0) {
                //     icon = iconArr[0];
                // }
                // if (icon != null && icon.parent != null) {
                //     icon.parent.removeChild(icon);
                //     icon = null;
                // }

                if (image != null && image.parent != null) {
                    this.clearTimerDic(image);
                    image.parent.removeChild(image);
                    image = null;
                    this._bgImageAry.splice(index, 1);

                    --this._count;
                    this.refreshPos();
                }
            }

            if (this._count == 0) {
                this.removeAll();
            }
        }

		/**
		 * 移除底部通知组件[弃用]
		 * @param image
		 * 
		 */
        private removeBaseSpriteChild( image: TipBottomItem ): void {
            
            // var label: BaseTextField = this._textFieldAry.shift() as BaseTextField;
            // if (label && label.parent) {
            //     label.parent.removeChild(label);
            //     label = null;
            // }
            // var icon: TipBottomItem = this._iconImageAry.shift() as TipBottomItem;
            // if (icon && icon.parent) {
            //     //_iconImagePool.push(icon);
            //     icon.parent.removeChild(icon);
            //     icon = null;
            // }
            if (image && image.parent) {
                image.alpha = 1;
                //_bgImagePool.push(image);
                this.clearTimerDic(image);
                image.parent.removeChild(image);
                image = null;
                this._bgImageAry.shift();

                --this._count;
                this.refreshPos();
            } else {
                var image2: TipBottomItem = this._bgImageAry.shift() as TipBottomItem;
                if (image2 && image2.parent) {
                    image2.alpha = 1;
                    //_bgImagePool.push(image2);
                    image2.parent.removeChild(image2);
                    image2 = null;
                    --this._count;
                    this.refreshPos();
                } else {
                    //异常
                    let i:number = 0;
                    // for (var i:number = 0; i < this._textFieldAry.length; i++) {
                    //     label = this._textFieldAry[i] as BaseTextField;
                    //     if (label && label.parent) {
                    //         label.parent.removeChild(label);
                    //         //_labelPool.push(label);
                    //         label = null;
                    //     }
                    // }
                    for (i = 0; i < this._bgImageAry.length; i++) {
                        image2 = this._bgImageAry[i];
                        if (image2 && image2.parent) {
                            image2.parent.removeChild(image2);
                            image2.alpha = 1;
                            //_bgImagePool.push(image2);
                            image2 = null;
                        }
                    }
                    this._count = 0;
                }
            }

            if (this._count == 0) {
                this.removeAll();
            }
        }

        private removeAll(): void {

            this._count = 0;
            this._bgImageAry = [];
            // this._iconImageAry = [];
            // this._textFieldAry = [];
            this._msgAry = [];
            // this._colorAry = [];
            // this._bottomIconAry = [];
            this._showIndex = 0;
            this.clearAllTimerDic();

            if( FairyUIManager.tipLayer.contains( this ) ){
                EventManager.removeEventListener( GameEvent.STGAE_RESIZE , this.setPos , this );
                FairyUIManager.tipLayer.removeChild( this );
            }
        }

		/**
		 * 设置底部提示框位置
		 */
        private setPos(): void {

            this.x = (Global.stageWidth - this.width) * 0.5;
            this.y =Global.stageHeight - this.MSGHEIGHT - 12;
        }

		/**
		 * 来新的消息要重新刷新位置
		 */
        private refreshPos(): void {

            var count:number = this._bgImageAry.length;
            for (var i:number = 0; i < count; i++) {
                var img: TipBottomItem = this._bgImageAry[i];
                if (img) {
                    // TweenLite.to(img, 0.1, { y: -i * this.H, delay: 0.05 * i });
                    fairygui.GTween.to( img.y , -i * this.H , 0.1 ).setDelay( 0.05 * i )
                    .onUpdate( function onUpdate(tw:fairygui.GTweener):void{
                        img.y = tw.value.x;
                    } , this )
                }
            }
        }

        public get width(): number {
            return 790;
        }

        public get height(): number {
            return 60;
        }

        private getImage(): TipBottomItem {
            return PanelRegister.createGObject("tip", "TipBottomItem");
        }

        // private getIconImage(): BaseImage {

        //     return new BaseImage();
        // }

        private getBaseTextField():BaseTextField {
            
            return new BaseTextField();
        }
    }
}