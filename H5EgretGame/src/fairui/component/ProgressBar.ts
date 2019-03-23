module fairui {

    import GLoader = fairygui.GLoader;

    /**
     * 进度条
     * @author cl 2018.3.31
     */
    export class ProgressBar extends BaseButton {
        private fullEffect: AssetEffect = null;
        protected bar: fairygui.GLoader;
        protected titleTxt: fairygui.GTextField;
        /**背景 */
        protected bg: GLoader;

        protected _progress: number = 0;
        protected _barWidth: number = 0;

        public constructor() {

            super();
            this.touchable = false;
        }

        protected constructFromXML(xml: any): void {

            super.constructFromXML(xml);
        }


        //public setup_beforeAdd(xml: any): void {
			// super.setup_beforeAdd(xml);
		public setup_beforeAdd(buffer: fairygui.ByteBuffer, beginPos: number): void {
			super.setup_beforeAdd( buffer , beginPos );

            this.bg = this.getElement("bg");
            this.bar = this.getElement("icon");
            this.titleTxt = this.getElement("title");

            this._barWidth = this.bar.width;
            // super.setup_afterAdd(xml);
            super.setup_beforeAdd( buffer , beginPos );

            if (this.selectedIcon && this.selectedIcon.length > 0) {
                this.bg.url = this.selectedIcon;
            }
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

            if( !value ){
                value = 0;
            }
            if( max == 0 ){
                this.progress = 0;
            }else{
                this.progress = value / max;
            }
            //this.progress = max == 0 ? 0 : value / max;
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

        public playUpEffect(once: boolean = true): void {
            let _self: ProgressBar = this;
            if (_self.fullEffect) {
                _self.fullEffect.stop();
                _self.fullEffect.removeFromParent();
                // _self.activeEffect.dispose();
                _self.fullEffect = null;
            }
            if (_self.fullEffect == null) {
                _self.fullEffect = new AssetEffect();
                _self.fullEffect.url = AssetPathManager.getInstance().getMenuEffect("main", "effect_01");
                _self.fullEffect.setScale(this.width / 295, 1.09);
                _self.fullEffect.move(this.width * 0.5 - 8, 5);
                _self.addChild(_self.fullEffect);
                if (once) {
                    _self.fullEffect.playOnce(playComplete);
                } else {
                    _self.fullEffect.play();
                }
            }

            function playComplete(): void {
                if (_self.fullEffect) {
                    _self.fullEffect.stop();
                    _self.fullEffect.removeFromParent();
                    // _self.activeEffect.dispose();
                    _self.fullEffect = null;
                }
            }
        }

        public stopUpEffect(): void {
            let _self: ProgressBar = this;
            if (_self.fullEffect) {
                _self.fullEffect.stop();
                _self.fullEffect.removeFromParent();
                _self.fullEffect.dispose();
                _self.fullEffect = null;
            }
        }

        public get isPlayingEffect(): boolean {
            return this.fullEffect != null;
        }
    }
}