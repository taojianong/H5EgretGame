module fairui {

    /**
	 * 主菜单上方的指引提示
	 * @author cl 2018.3.19
	 */
    export class GuideMessageView extends fairygui.GTextField {

        private _obj:Object;
        private _type:number = 1;

        public constructor() {

            super();

            this.filters = [new egret.GlowFilter(0xff0000, 1, 16, 16, 2, 1, false)];
            this.autoSize = fairygui.AutoSizeType.None;
            this.fontSize = 30;
            EventManager.addEventListener( GameEvent.STGAE_RESIZE, this.reSetPos, this);
        }

        /**
		 * 显示引导消息
		 * @param str 提示文字,支持语言包字段名
		 */
        public showGuideMessage(str: string): void {
            if (parent == null) {
                FairyUIManager.tipLayer.addChild( this );
            }
            this._type = 1;
            this.text = Global.lang.getLang(str);
            this.setPos();

            this.clear();
            this._obj = Global.timer.doTimeOnce(4000, this.dispose1,[this]);
        }

        /**
         * 显示提示信息
         * @param str
         * 
         */
        public showNoticeMessage(str: string): void {
            if (parent == null) {
                FairyUIManager.tipLayer.addChild( this );
            }
            this._type = 2;
            this.text = str;
            this.setNoticePos();

            this.clear();
            this._obj = Global.timer.doTimeOnce(4000, this.dispose1,[this]);
        }

        private dispose1( thisObject:GuideMessageView = null ):void{

            thisObject = thisObject || this;
            thisObject.dispose();
        }

        public dispose(): void {

            EventManager.removeEventListener( GameEvent.STGAE_RESIZE, this.reSetPos,this);

            this.clear();

            super.dispose();
        }

        private clear(): void {
            if (this._obj != null) {
                Global.timer.clearTimer(this._obj);
                this._obj = null;
            }
        }

        /**
         * 重新刷新位置
         */
        private reSetPos(): void {
            if (this._type == 1) {
                this.setPos();
            } else if (this._type == 2) {
                this.setNoticePos();
            } else {
                this.setPos();
            }
        }

        /**
         * 引导信息位置
         */
        private setPos(): void {

            this.x = Global.stageWidth - this.width >> 1;
            this.y = Global.stageHeight - 200;
        }

        /**
         * 提示文字信息位置
         */
        private setNoticePos(): void {
            this.x = Global.stageWidth - this.width >> 1;
            this.y = Global.stageHeight - this.height >> 1;
        }
    }
}