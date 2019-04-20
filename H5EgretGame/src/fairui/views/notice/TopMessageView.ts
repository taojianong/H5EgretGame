module fairui {

    /**
	 * 屏幕上方居中显示的系统消息
	 * @author cl 2018.3.20
	 **/
    export class TopMessageView extends View {

        /**100毫秒*/
        private DELAYTIME: number = 100;
        private FRAME: number = 20; // 毫秒
        private TIME: number = 10; //总共需要这个时间完成滚动消息

        private _labelSprite: BaseSprite;
        // private _bg: BaseImage;
        private _showIndex: number = 0;
        private _count: number = 0;
        private _msgAry: Array<any> = [];
        private _colorAry: Array<any> = [];
        private _textFieldAry: Array<any> = [];
        private _clearIdAry: Array<any> = [];
        private _preLabel: fairygui.GTextField;
        private _textFieldPool: Array<fairygui.GTextField> = new Array<fairygui.GTextField>();

        public constructor() {

            super();

            this.touchable = false;

            // if (this._bg == null) {
            //     this._bg = new BaseImage();
            //     this._bg.setFairySource("common", "img_notice_01");
            //     this._bg.height = this.height;
            //     this.addChild(this._bg);
            // }
            this._labelSprite = new BaseSprite();
            this.addChild(this._labelSprite);
            this.mask = new egret.Rectangle(5,0,this.width,this.height);
            EventManager.addEventListener(GameEvent.STGAE_RESIZE, this.setPos, this);
            if (!FairyUIManager.tipLayer.contains(this))
                FairyUIManager.tipLayer.addChild(this);
        }

        /**
		 * 系统公告广播(位置在中间顶部)
		 * @param content
		 * @param color
		 */
        public showTopMessage(content: string, color: number): void {
            if (!FairyUIManager.tipLayer.contains(this)) {
                FairyUIManager.tipLayer.addChild(this); //直接显示
                EventManager.addEventListener(GameEvent.STGAE_RESIZE, this.setPos, this);
            }
            this.setPos();

            if (this._msgAry.length > 10) //@TODO 公告BUG
                this.removeAllLabelItem();

            this._msgAry.push(content);
            this._colorAry.push(color);
            Global.timer.doTimeOnce(this.DELAYTIME, this.addLabelItem,[this]);
        }

        private removeAllLabelItem(): void {
            this._msgAry.splice(0, this._msgAry.length);
            this._colorAry.splice(0, this._colorAry.length);
            let len: number = this._clearIdAry.length;
            for (let i: number = 0; i < len; i++)
                Global.timer.clearTimer(this._clearIdAry.shift() as Object);
            this._textFieldAry.splice(0, this._textFieldAry.length);
            let num: number = this._labelSprite.numChildren;
            for (let k: number = 0; k < num; k++)
                this._labelSprite.removeChildAt(0);
            this._showIndex = 0;
            this._count = 0;
            this._msgAry = [];
            this._colorAry = [];
            this._preLabel = null;
        }

        private addLabelItem( thisObject:TopMessageView = null ): void {

            thisObject = thisObject || this;
            let str: string = thisObject._msgAry[thisObject._showIndex];
            if (str != null) {
                let label: fairygui.GTextField = thisObject.getBaseTextField();
                label.alpha = 1;
                label.color = thisObject._colorAry[thisObject._showIndex] == null ? Notice.TOP_COLOR : thisObject._colorAry[thisObject._showIndex];
                label.autoSize = fairygui.AutoSizeType.Both;// TextFieldAutoSize.CENTER;
                label.fontSize = 18;
                label.align = fairygui.AlignType.Center;
                label.singleLine = true;
                label.touchable = false;
                label.text = str;
                label.width = label.textWidth;
                label.filters = [new egret.GlowFilter(0x370000, 1, 2, 2, 5, 1)];
                label.y = (thisObject.height - label.height) * 0.5 + 3;                
                if (thisObject._preLabel == null)
                    label.x = thisObject.width;
                else
                    label.x = thisObject._preLabel.x + thisObject._preLabel.width < thisObject.width ? thisObject.width : thisObject._preLabel.x + thisObject._preLabel.width + 20;
                thisObject._preLabel = label;
                thisObject._labelSprite.addChild(label);
                ++thisObject._count;
                ++thisObject._showIndex;
                thisObject._textFieldAry.push(label);
                thisObject.showTime(label);
            }
        }

        private showTime(label: fairygui.GTextField): void {
            Global.timer.doTimeOnce(this.DELAYTIME, this.addLabelItem,[this]);
            let id: Object = Global.timer.doTimeLoop(this.FRAME, flash.bind( this.moveTo,this ), [label,this], false);
            this._clearIdAry.push(id);
        }

        private moveTo(txt: fairygui.GTextField,thisObject:any): void {
            txt.x -= thisObject.width / (1000 / thisObject.FRAME * thisObject.TIME);            
            if (txt.x <= -txt.width*2) {
                Global.timer.clearTimer(thisObject._clearIdAry.shift() as Object);
                // TweenLite.to(txt, 0.1, { alpha: 0.01, onComplete: thisObject.removeLabel, onCompleteParams: [txt,thisObject] });
                fairygui.GTween.to( 1 , 0.01 , 0.1 ).setTarget( txt )
                .onUpdate( function onUpdate(tw: fairygui.GTweener):void{
                    txt.alpha = tw.value.x;
                } , thisObject )
                .onComplete( function onComplete():void{
                    if( thisObject.removeLabel != null ){
                        (<Function>thisObject.removeLabel).apply( thisObject , [txt,thisObject] );
                    }
                } , thisObject );

            } else if (txt.x < (thisObject.width - txt.width)) {
                thisObject.addLabelItem();
            }
        }

        private removeLabel(textField: fairygui.GTextField,thisObject:TopMessageView): void {
            if (textField && textField.parent) {
                textField.parent.removeChild(textField);
                thisObject._textFieldPool.push(textField);
                textField = null;
                thisObject._textFieldAry.shift();
                --thisObject._count;
            } else { //正常情况不会走这里，走了说明有错误
                for (let i: number = 0; i < thisObject._textFieldAry.length; i++) {
                    textField = thisObject._textFieldAry[i] as fairygui.GTextField;
                    if (textField && textField.parent) {
                        textField.parent.removeChild(textField);
                        thisObject._textFieldPool.push(textField);
                        textField = null;
                        --thisObject._count;
                    }
                }
                thisObject._textFieldAry = thisObject._msgAry = thisObject._colorAry = [];
                thisObject._count = thisObject._showIndex = 0;
                return;
            }
            if (thisObject._count > 0) {
                Global.timer.doTimeOnce(thisObject.DELAYTIME, thisObject.addLabelItem,[thisObject]);
            }
            if (thisObject._count == 0) {
                thisObject._msgAry = [];
                thisObject._colorAry = [];
                thisObject._showIndex = 0;
                thisObject._preLabel = null;
                if (FairyUIManager.tipLayer.contains(thisObject)) {
                    FairyUIManager.tipLayer.removeChild(thisObject);
                }
            }
        }

        // private createShap(): BaseShape {

        //     let sh: BaseShape = new BaseShape();
        //     sh.graphics.clear();
        //     sh.graphics.beginFill(0);
        //     sh.graphics.drawRect(0, 0, this.width, this.height);
        //     sh.graphics.endFill();
        //     return sh;
        // }

        protected setPos(event: Event = null): void {
            this.y = 135;
            this.x = Global.stageWidth - this.width >> 1;
        }

        public get width(): number {

            return 790;
        }

        public get height(): number {

            return 60;
        }

        private getBaseTextField(): fairygui.GTextField {
            if (this._textFieldPool.length > 0) {
                return this._textFieldPool.pop();
            }
            return new fairygui.GTextField();
        }
    }
}