module fairui {

    /**
	 * 系统提示广播(位置在中上部)
	 * @author cl 2018.3.20
	 **/
    export class MiddleMessageView extends BaseSprite {

        private TOTALNUM: number = 4;
        private DELAYTIME: number = 300;
        private H: number = 60;

        private _showIndex: number = 0;
        private _count: number = 0; //计数
        private _msgAry: Array<any> = [];
        private _imageAry: Array<any> = [];     
        private _clearIdAry: Array<any> = [];
        // private _imagePool: Array<TipBottomItem> = new Array<TipBottomItem>();

        public constructor() {

            super();

            this.touchable = false;
        }

        /**
		 * @param str
		 * @param color
		 */
        public showMiddleMessage(str: string, color: number): void {
            if (!FairyUIManager.tipLayer.contains(this)) {
                FairyUIManager.tipLayer.addChild(this); //直接显示
                EventManager.addEventListener(GameEvent.STGAE_RESIZE, this.setPos, this);
            }
            this.setPos();
            this._msgAry.push(str);
            Global.timer.doTimeOnce(this.DELAYTIME, this.addLabelItem, [this]);
        }

        private addLabelItem(thisObject: MiddleMessageView = null): void {

            thisObject = thisObject || this;
            if (thisObject._count < thisObject.TOTALNUM) {
                let str: string = thisObject._msgAry[thisObject._showIndex];
                if (str) {

                    let item: TipBottomItem = TipBottomItem.create();                    
                    item.show(str);
                    thisObject.addChild(item);
                    thisObject._showIndex++;
                    ++thisObject._count;
                    thisObject._imageAry.push(item);

                    thisObject.refreshPos();
                    // TweenLite.to(item, 0.1, {
                    //     x: (thisObject.width - 1.5 * item.width) / 2,
                    //     scaleX: 1.5, scaleY: 1.5, onComplete: thisObject.scale2Time, onCompleteParams: [item, thisObject]
                    // });//增加字体放大特效
                }
            }
        }

        //0.5秒后恢复到正常字体
        private scale2Time(img: TipBottomItem, thisObject: MiddleMessageView): void {
            // TweenLite.to(img, 0.1, { x: (thisObject.width - img.width) / 2, y: thisObject._count * thisObject.H, scaleX: 1, scaleY: 1, onComplete: thisObject.showTime, onCompleteParams: [img, thisObject], delay: 0.5 });
        }

        //正常显示4秒后
        private showTime(img: TipBottomItem, thisObject: MiddleMessageView): void {
            thisObject.refreshPos();
            Global.timer.doTimeOnce(thisObject.DELAYTIME, thisObject.addLabelItem);
            let id: Object = Global.timer.doTimeOnce(4000, flash.bind(thisObject.scale1Time, this), [img, thisObject], false);
            thisObject._clearIdAry.push(id);
        }

        //文字1秒内渐弱至消失
        private scale1Time(img: TipBottomItem, thisObject: MiddleMessageView = null): void {
            thisObject = thisObject || this;
            Global.timer.clearTimer(thisObject._clearIdAry.shift() as Object);
            // TweenLite.to(img, 1, { alpha: 0.01, onComplete: thisObject.removeImage, onCompleteParams: [img, thisObject] });
        }

        private removeImage(img: TipBottomItem, thisObject: MiddleMessageView = null): void {

            thisObject.removeLabelChild(img);
            thisObject.refreshPos();
            if (thisObject._count < thisObject.TOTALNUM && thisObject._count > 0) {
                Global.timer.doTimeOnce(thisObject.DELAYTIME, thisObject.addLabelItem, [thisObject]);
            }
            if (thisObject._count == 0) {
                thisObject._imageAry = [];
                thisObject._msgAry = [];
                thisObject._showIndex = 0;
                if (FairyUIManager.tipLayer.contains(thisObject)) {
                    FairyUIManager.tipLayer.removeChild(thisObject);
                    EventManager.removeEventListener(GameEvent.STGAE_RESIZE, thisObject.setPos, thisObject);
                }
            }
        }

        private removeLabelChild(image: TipBottomItem): void {            
            if (image && image.parent) {
                // image.parent.removeChild(image);
                // this._imagePool.push(image);
                image.recover();
                image = null;
                this._imageAry.shift();
                --this._count;
            }
            else { //正常情况不会走这里，走了说明有错误
                this._imageAry = this._msgAry = [];
                this._count = this._showIndex = 0;
                if (FairyUIManager.tipLayer.contains(this)) {
                    EventManager.removeEventListener(GameEvent.STGAE_RESIZE, this.setPos, this);
                    FairyUIManager.tipLayer.removeChild(this);
                }
            }
        }

        private setPos(event: Event = null): void {
            this.x = (Global.stageWidth - this.width) / 2;
            this.y = Global.stageHeight * 0.18;
        }

		/**
		 * 来新的消息要重新刷新位置
		 */
        private refreshPos(): void {
            for (let i: number = 0; i < this._imageAry.length; i++) {
                // let label: BaseImage = this._imageAry[i] as BaseImage;
                // TweenLite.to(label, 0.3, { y: i * this.H });
            }
        }

        public get width(): number {

            return 790;
        }

        public get height(): number {

            return 60;
        }

        // private getImage(): TipBottomItem {
        //     if (this._imagePool.length > 0) {
        //         return this._imagePool.pop();
        //     }
        //     return PanelRegister.createGObject("common", "TipBottomItem");
        // }
    }
}