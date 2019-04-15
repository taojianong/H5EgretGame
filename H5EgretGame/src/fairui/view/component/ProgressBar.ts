module fairui {

    /**
     * 进度条
     * @author cl 2019.1.29
     */
    export class ProgressBar extends BaseButton {

        protected bar: fairygui.GLoader;
        protected titleTxt: fairygui.GTextField;
        /**背景 */
        protected bg: fairygui.GLoader;

        protected _progress: number = 0;
        protected _barWidth: number = 0;

        protected _maximum: number = 100;
        protected _minimum: number = 0;

        protected _slideDuration2: number = 500;
        protected _isPlayTween: boolean = false;
        protected tweenObj: Object = null

        public constructor() {

            super();

            this["_slideDuration"] = 0;
            this.touchable = false;
        }

        protected constructFromXML(xml: any): void {

            super.constructFromXML(xml);
        }

        public setup_afterAdd(buffer: fairygui.ByteBuffer, beginPos: number): void {

            this.bg = this.getElement("bg");
            this.bar = this.getElement("icon");
            this.titleTxt = this.getElement("title");

            this._barWidth = this.bar.width;
            super.setup_afterAdd(buffer, beginPos);

            if (this.selectedIcon && this.selectedIcon.length > 0) {
                this.bg.url = this.selectedIcon;
            }

            this.InitUI();
        }

        //初始化UI
        public InitUI():void{
            
            this.maximum = this._maximum > 0 ? this._maximum : this.width;
        };

        /**
         * 设置标签
         * @param text 文本
         * @param color 文本颜色
         */
        public setLabel( text:string , color:number = -1 ):void{

            this.text = text;
            if( color >= 0 ){
                this.textColor = color;
            }           
        }

        public set textColor( value:number ){

            this.titleTxt.color = value;
        }
        /**设置文本颜色 */
        public get textColor():number{

            return this.titleTxt.color;
        }

        public set slideDuration2(value: number) {

            this._slideDuration2 = value;
        }
        /**滑动时间，毫秒 */
        public get slideDuration2(): number {

            return this._slideDuration2;
        }

        public set isPlayTween(value: boolean) {

            this._isPlayTween = value;
            if (value) {
                this.tweenObj = this.tweenObj || {};
            } else if (this.tweenObj != null) {
                fairygui.GTween.kill( this.tweenObj );
                this.tweenObj = null;
            }
        }
        /**是否播放缓动动画 */
        public get isPlayTween(): boolean {

            return this._isPlayTween;// this.slideDuration != 0;
        }

        /**
         * 设置进度值
         * @param value 当前值
         * @param max 最大值
         * @param min 最小值,默认为0
         * @param needTween 是否需要缓动
         */
        public setVal(value: number, max: number = -1, min: number = 0, needTween: boolean = true , complete:Function=null , thisObj:any=null ): void {

            let _self: ProgressBar = this;

            if (max >= 0) {
                this._maximum = max;
                this.maximum = max;
            }

            if (min >= 0) {
                this.minimum = min;
            }

            this._slideDuration2 = ( this.width - this.width * this.progress ) * 0.0005;//这里单位是秒           
            if (this._isPlayTween && needTween) {
                
                this.tweenObj["value"] = this.value;//原来的值
                fairygui.GTween.kill( this.tweenObj );
                fairygui.GTween.to( this.value , value , this.slideDuration2 ).setTarget( this.tweenObj )
                .onUpdate( this.onUpdate , this  )
                .onComplete( function complete2():void{
                    let tw:fairygui.GTweener = fairygui.GTween.getTween( _self.tweenObj );
                    if( tw && complete != null ){
                        complete.apply( thisObj );
                    }
                } , this );

            } else {
                this.value = value;
            }
        }

        private onUpdate( tw:fairygui.GTweener ):void{

            this.value = this.tweenObj["value"] = tw.value.x;
        }

        public set minimum(value: number) {

            this._minimum = value;
        }

        public get minimum(): number {

            return this._minimum;
        }

        public set maximum(value: number) {

            this._maximum = value;
        }

        public get maximum(): number {

            return this._maximum;
        }

        public set value(val: number) {

            this.progress = (val - this._minimum) / (this._maximum - this._minimum);
        }

        public get value(): number {

            return this._minimum + (this._maximum - this._minimum) * this._progress;
        }

        public set progress(value: number) {

            this._progress = value > 1 ? 1 : (value < 0 ? 0 : value);

            if (this.bar) {
                this.bar.width = this._barWidth * this._progress;
            }
        }
        /**
         * 进度条
         */
        public get progress(): number {

            return this._progress;
        }

        /**
         * 显示进度
         * @param value 当前值
         * @param max   最大值
         * @param isPer 是否显示百分比
         */
        public showProgress(value: number, max: number, isPer: boolean = false): void {

            this.progress = max == 0 ? 0 : value / max;
            if (!isPer) {
                this.text = parseInt(value.toString()) + "/" + parseInt(max.toString());
            } else {
                this.text = parseInt("" + (this.progress * 100)) + "%";
            }
        }

        public set text(value: string) {

            this.titleTxt.text = value;
        }
        /**进度显示文本 */
        public get text(): string {

            return this.titleTxt.text;
        }

        public dispose(): void {

            super.dispose();

            this.bar = null;
            this.titleTxt = null;
            this.bg = null;
        }
    }
}