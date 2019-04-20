module fairui {
    
    /**
     * CD，支持圆形和矩形，注意CD的注册点在中心
     * @author cl 2018.4.9
     */
    export class CDSprite extends BaseSprite {

        /**画布 */
        protected canvas: fairygui.GGraph;
        /**特效容器 */
        protected effectCont:BaseSprite;

        protected _color: number = 0;
        protected _callback: Function;
        protected _callbackParam: Array<any>;
        protected _isCircle: boolean = false;
        protected _isShowEffect: boolean = false;
        protected _effect: CEffect;
        protected _circleMask: egret.Sprite;

        protected botSp: fairygui.GObject = null;
        /**是否反向 */
        protected _isReverse:boolean;

        /**
		 * 构造函数
		 * @param width			宽度
		 * @param height		高度
		 * @param callback		CD结束后的回调函数
		 * @param callbackParam	回调函数参数
		 * @param isCircle		是否为圆形CD
		 * @param showText		是否显示倒计时数字
		 */
        public constructor(width: number, height: number, color: number = 0, isShowEffect: boolean = false, callback: Function = null, callbackParam: Array<any> = null, isCircle: boolean = false, showText: boolean = false) {

            super();

            this.canvas = new fairygui.GGraph();
            this.addChild(this.canvas);

            this.effectCont = new BaseSprite();
            this.addChild( this.effectCont );

            this.touchEnabled = false;
            this.touchChildren = false;
            this.setCDSize(width, height, color, isShowEffect, callback, callbackParam, isCircle, showText);
        }

        public get circleMask(): egret.Sprite {

            return this._circleMask;
        }

        protected _timeTxt: fairygui.GRichTextField;
        protected _leftTime: number = NaN;
        protected _totalTime: number = NaN;
        protected _prevTime: number = NaN;
        protected _playing: boolean = false;
        protected _showText: boolean = false;

        public set showText(value: boolean) {

            this._showText = value;
        }

        public setCDSize(width: number, height: number, color: number = 0, isShowEffect: boolean = false, callback: Function = null, callbackParam: Array<any> = null, isCircle: boolean = false, showText: boolean = false) {
            this._width = width * 0.5;
            this._height = height * 0.5;
            this._callback = callback;
            this._callbackParam = callbackParam;
            this._isCircle = isCircle;
            this._showText = showText;
            this._color = flash.checkUint(color);
            this._isShowEffect = isShowEffect;
            this.x = this._width;
            this.y = this._height;
            this.setMask();
        }

        protected setMask() {
            let _self__: any = this;
            if (this._isCircle) {
                if (this._circleMask == null) {
                    this._circleMask = new egret.Sprite();
                }
                this._circleMask.graphics.clear();
                this._circleMask.graphics.beginFill(this._color, 0);
                this._circleMask.graphics.drawCircle(0, 0, this._width);
                this._circleMask.graphics.endFill();
                _self__.addChild(this._circleMask);
                this.mask = this._circleMask;
            }
            else {
                if (this._circleMask != null) {
                    this._circleMask.graphics.clear();
                    _self__.removeChild(this._circleMask);
                    this._circleMask = null;
                    this.mask = null;
                }
            }
        }

        /**
         * 设置字体
         */
        public setTextFormat(size: number = 18, color: number = 0xffffff, bold: boolean = true, font: string = "") {
            let _self__: any = this;
            if (<any>!font || font.length <= 0) {
                font = Global.lang.getLang("lang_client_75");//宋体
            }
            if (Config.isDebug || this._showText) {
                if (this._timeTxt == null) {
                    this._timeTxt = new fairygui.GRichTextField();
                    this._timeTxt.fontSize = size;
                    this._timeTxt.color = color;
                    this._timeTxt.bold = bold;
                    this._timeTxt.font = font;
                    this._timeTxt.width = this.width;
                    this._timeTxt.align = fairygui.AlignType.Center;
                    _self__.addChild(this._timeTxt);
                }
            }
        }

        public setValue(leftTime: number, totalTime: number) {

            this._leftTime = leftTime;
            this._totalTime = totalTime;
            this.setText((leftTime * 0.001).toFixed(1));
            this.draw((this._totalTime - this._leftTime) / this._totalTime * 360);
        }

        public setValue2(leftTime: number, totalTime: number) {

            this._leftTime = leftTime;
            this._totalTime = totalTime;
            if (this._leftTime > this._totalTime)
                this._leftTime = this._totalTime;
            this.draw((this._totalTime - this._leftTime) / this._totalTime * 180);
        }

        public setValue3(leftTime: number, totalTime: number) {

            this._leftTime = leftTime;
            this._totalTime = totalTime;
            if (this._leftTime > this._totalTime)
                this._leftTime = this._totalTime;
            this.draw(360 - (this._totalTime - this._leftTime) / this._totalTime * 180);
        }

        /**
		 * 开始播放
		 * @param leftTime	剩余时间，单位毫秒
		 * @param totalTime	总时间，单位毫秒
		 * @param isReverse	是否反向
		 */
        public play(leftTime: number, totalTime: number , isReverse:boolean = false ) {

            this._isReverse = isReverse;

            this.setValue(leftTime, totalTime);
            if (this._leftTime == this._totalTime) {
                // let cur_trans:egret.ColorTransform = this["transform"].colorTransform;
                // cur_trans.redOffset = 0xff;
                // cur_trans.greenOffset = 0xff;
                // cur_trans.blueOffset = 0xff;
                // this["transform"].colorTransform = cur_trans;

                Global.timer.doTimeOnce(100, flash.bind(this.onComp, this));
            }
            this._prevTime = egret.getTimer();
            Global.timer.doTimeLoop(50, flash.bind(this.onEnterFrame, this));
            this._playing = true;
        }

        private onComp() {
            // let cur_trans:flash.ColorTransform = this["transform"].colorTransform;
            // cur_trans.redOffset = 0;
            // cur_trans.greenOffset = 0;
            // cur_trans.blueOffset = 0;
            // this["transform"].colorTransform = cur_trans;
        }

        public stop() {

            if (this._playing) {
                Global.timer.clearTimer(flash.bind(this.onEnterFrame, this));
                this._playing = false;
                this.setText("");
                if (this._isCircle) {
                    this._circleMask.graphics.clear();
                }
                else {
                    this.canvas.graphics.clear();
                }
            }
        }

        protected setText(text: string) {
            let _self__: any = this;
            if (Config.isDebug || this._showText) {
                if (this._timeTxt == null) {
                    this._timeTxt = new fairygui.GRichTextField();
                    this._timeTxt.autoSize = fairygui.AutoSizeType.Both;
                    this._timeTxt.font = Global.lang.getLang("lang_client_75");//宋体
                    this._timeTxt.fontSize = 18;
                }
                this._timeTxt.text = text;
                this._timeTxt.x = (this._width * 2 - this._timeTxt.textWidth >> 1) - this._width;
                this._timeTxt.y = (this._height * 2 - this._timeTxt.height >> 1) - this._height;
            }
        }

        private onEnterFrame() {
            let _self__: CDSprite = this;
            let postTime: number = egret.getTimer() - this._prevTime;
            if (postTime <= this._leftTime) {
                this.setText(((this._leftTime - postTime) * 0.001).toFixed(1));
                this.draw((this._totalTime - this._leftTime + postTime) / this._totalTime * 360);
                if ((this._leftTime - postTime) * 0.001 <= 10) {
                    if (<any>!this._effect && this._isShowEffect) {
                        this._isShowEffect = false;
                        this._effect = new CEffect();
                        this._effect.url = AssetPathManager.getInstance().getMenuEffect("liuguang", "skillGridFlow");
                        _self__.effectCont.addEgretChild(this._effect.view);
                        this._effect.play();
                    }
                }
            }
            else {
                this.stop();
                if (this._effect) {
                    this._effect.dispose();
                    this._effect = null;
                }
                if (this._callback != null) {
                    if (this._callbackParam == null) {
                        this._callbackParam = [];
                    }
                    this._callback.apply(null, this._callbackParam);
                }
            }
        }

        protected draw(angle: number) {

            this.canvas.graphics.clear();
            if (angle < 0 || angle >= 360) {
                if (angle == 0) {
                    this.canvas.graphics.clear();
                    this.canvas.graphics.lineStyle(0, 0, 1);
                    this.canvas.graphics.beginFill(this._color, 1);
                    this.canvas.graphics.drawCircle(0, 0, Math.sqrt((this._width * this._width) + (this._height * this._height)));
                    this.canvas.graphics.endFill();
                }
            }
            else {
                let tanA: number = Math.tan(angle * Math.PI / 180);
                this.canvas.graphics.clear();
                this.canvas.graphics.lineStyle(0, 0, 0);
                this.canvas.graphics.beginFill(this._color, 0.5);
                this.canvas.graphics.moveTo(0, 0);
                if (angle >= 0 && angle < 45) {
                    this.canvas.graphics.lineTo(this._width * tanA, -this._height);
                    this.canvas.graphics.lineTo(this._width, -this._height);
                    this.canvas.graphics.lineTo(this._width, this._height);
                    this.canvas.graphics.lineTo(-this._width, this._height);
                    this.canvas.graphics.lineTo(-this._width, -this._height);
                }
                else {
                    if (angle >= 45 && angle < 135) {
                        this.canvas.graphics.lineTo(this._width, -this._width / tanA);
                        this.canvas.graphics.lineTo(this._width, this._height);
                        this.canvas.graphics.lineTo(-this._width, this._height);
                        this.canvas.graphics.lineTo(-this._width, -this._height);
                    }
                    else {
                        if (angle >= 135 && angle < 225) {
                            this.canvas.graphics.lineTo(-this._height * tanA, this._height);
                            this.canvas.graphics.lineTo(-this._width, this._height);
                            this.canvas.graphics.lineTo(-this._width, -this._height);
                        }
                        else {
                            if (angle >= 225 && angle < 315) {
                                this.canvas.graphics.lineTo(-this._width, this._width / tanA);
                                this.canvas.graphics.lineTo(-this._width, -this._height);
                            }
                            else {
                                if (angle >= 315 && angle < 360) {
                                    this.canvas.graphics.lineTo(this._width * tanA, -this._height);
                                }
                            }
                        }
                    }
                }
                this.canvas.graphics.lineTo(0, -this._height);
                this.canvas.graphics.lineTo(0, 0);
                this.canvas.graphics.endFill();
            }
        }

        public addDisplayObject( sp: fairygui.GObject ): void {
            if (this.botSp != null && this.botSp.parent != null) {
                this.botSp.parent.removeChild(this.botSp);
                this.botSp = null;
            }
            if (sp != null && sp.parent != null) {
                sp.parent.removeChild(sp);
            }
            this.botSp = sp;
            if (this.botSp) {
                this.botSp.x = -this.botSp.width * 0.5;
                this.botSp.y = -this.botSp.height * 0.5;
                this.addChildAt( this.botSp , 1);
            }
        }

        public dispose(): void {

            super.dispose();

            if( this._effect != null ){
                this._effect.dispose();
                this._effect = null;
            }
            if( this.effectCont != null ){
                this.effectCont.dispose();
                this.effectCont = null;
            }
            if( this._circleMask != null ){
                this._circleMask.removeChildren();
                this._circleMask = null;
            }
            if( this.botSp != null ){
                this.botSp.dispose();
                this.botSp = null;
            }
            this._callback = null;
            this._callbackParam = null;
        }
    }
}