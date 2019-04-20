module fairui {

    /**
	 * 鼠标位置的提示
	 * @author cl 2018.3.27
	 **/
    export class MousePosMessageView extends BaseSprite {

        /**鼠标消息组件池 */
        private static pool: Array<MousePosMessageView> = [];

        public static recover(view: MousePosMessageView): void {

            if( this.pool.indexOf(view) == -1 ){
                this.pool.push(view);
            }
        }

        public static create(): MousePosMessageView {

            if (this.pool.length > 0) {
                return this.pool.pop();
            }
            return new MousePosMessageView();
        }

        //------------------------------------------------------

        private thisParent: fairygui.GComponent;
        private _isLoading: Boolean;//只出现一条信息
        private _prePosY: number = 0;//鼠标起始Y坐标
        private FRAME: number = 2;
        /**向上飘的时间,秒 */
        private TIME: number = 1;
        private UPHEIGHT: number = 40;//向上飘的高度
        private _pChild: fairygui.GComponent;

        //自定义全局坐标
        private _gp: egret.Point = null;

        public constructor() {

            super();
        }

        /**
		 * 鼠标位置的提示
		 * @param str
		 * @param color
		 * @param parent		提示消息的父容器
         * @param gp            对应全局坐标,不填为默认鼠标点击位置
         * @param delay         延迟时间，秒
		 */
        public showMousePosMessage(str: string, color: number = 0xFF3300, parent: fairygui.GComponent = null, gp: egret.Point = null, delay: number = 0): void {

            let _self: MousePosMessageView = this;
            this._gp = gp;
            if (this._isLoading)
                return;
            this._isLoading = true;
            if (parent == null) {
                this.thisParent = FairyUIManager.tipLayer;
            }
            else {
                this.thisParent = parent.parent;
                this._pChild = parent;
                if (this.thisParent == null) {
                    this.thisParent = FairyUIManager.tipLayer;
                }
            }
            let label: BaseTextField = new BaseTextField();
            label.singleLine = true;
            label.autoSize = fairygui.AutoSizeType.Both;// TextFieldAutoSize.CENTER;
            label.align = fairygui.AlignType.Center;
            label.fontSize = 18;
            label.color = color;
            label.stroke = 1;
            label.strokeColor = 0x000000;//添加描边
            label.text = Global.lang.getLang(str);
            label.bold = true;
            this.addChild(label);
            this.thisParent.addChild(this);//直接显示
            this.width = label.width;
            this.setPos();
            if (delay > 0) {
                this.alpha = 0;
                // TweenLite.to(this, delay , {"alpha":1 , ease:Sine.easeInOut , onComplete:function(){
                //      TweenLite.to(_self, _self.TIME, { y: _self._prePosY - _self.UPHEIGHT, onComplete: flash.bind( _self.moveOver , _self ) , onCompleteParams: [label], ease: Linear.easeNone });
                // }});

                fairygui.GTween.to(_self.alpha, 1, delay).setTarget(this, this)
                    .setEase(fairygui.EaseType.SineInOut)
                    .onUpdate(function onUpdate(tw: fairygui.GTweener): void {
                        _self.alpha = tw.value.x;
                    }, _self)
                    .onComplete(function onComplete1(): void {

                        fairygui.GTween.to(_self.y, _self._prePosY - _self.UPHEIGHT, _self.TIME)
                            .setEase(fairygui.EaseType.Linear)
                            .onUpdate(function onUpdate(tw: fairygui.GTweener): void {
                                _self.alpha = tw.value.x;
                            }, _self)
                            .onComplete(function onComplete2(): void {
                                _self.moveOver.apply(_self, [label]);
                            }, _self);

                    }, _self);

            } else {
                //  TweenLite.to(this, this.TIME, { y: this._prePosY - this.UPHEIGHT, onComplete: flash.bind( this.moveOver , this ) , onCompleteParams: [label], ease: Linear.easeNone });

                fairygui.GTween.to(_self.y, _self._prePosY - _self.UPHEIGHT, _self.TIME).setTarget(this, this)
                    .setEase(fairygui.EaseType.Linear)
                    .onUpdate(function onUpdate(tw: fairygui.GTweener): void {
                        _self.y = tw.value.x;
                    }, _self)
                    .onComplete(function onComplete(): void {
                        _self.moveOver.apply(_self, [label]);
                    }, _self);
            }
        }

        private moveOver(label: BaseTextField): void {
            if (label != null) {
                label.removeFromParent();
            }
            if ( this.parent != null ) {

                this._isLoading = false;
                this.removeFromParent();                
                this.setPos();

                MousePosMessageView.recover( this );
            }
        }

        private setPos(event: Event = null): void {

            let gp: egret.Point = this._gp || new egret.Point(fairygui.GRoot.mouseX, fairygui.GRoot.mouseY);
            if (this.thisParent == FairyUIManager.tipLayer) {
                this.x = gp.x - (this.width * 0.5);
                if (this.x < 0) {
                    this.x = 0;
                }
                if (gp.x > Global.stageWidth - this.width) {
                    this.x = Global.stageWidth - this.width;
                }
                this._prePosY = this.y = gp.y - 10.0;
            }
            else {
                this.x = this._pChild.x + (this._pChild.width - this.width >> 1);
                this._prePosY = this.y = this._pChild.y - 10;
            }
        }
    }

}