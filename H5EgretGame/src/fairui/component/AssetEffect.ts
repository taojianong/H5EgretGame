module fairui{

    /**
     * FairyGui组件播放Asset特效
     * @author cl 2018.3.13
     */
    export class AssetEffect extends BaseSprite{

        protected gameEffect:GameEffect;

        public constructor(){

            super();

            this.gameEffect = new fairui.GameEffect();
            this.gameEffect.touchChildren = false;
			this.gameEffect.touchEnabled = false;
            this.touchable = false;
            this._rootContainer.addChild( this.gameEffect );
        }

        public set url(value:string){

            this.gameEffect.url = value;

            App.log.debug( App.lang.getLang("panel_debug_1",value) );//加载特效地址 url: {0}
        }
        /**
         * 特效地址
         */
        public get url():string{

            return this.gameEffect.url;
        }


        public get lastFrameHanderCallBack(): Function {

            return this.gameEffect.lastFrameHanderCallBack;
        }
        /**
         * 播放到最后一帧时的动画调用事件
         */
        public set lastFrameHanderCallBack(value: Function) {
            this.gameEffect.lastFrameHanderCallBack = value;
        }

        /**
         * 播放一次停止
         */
        public palyOnceStop():void {

            this.gameEffect.palyOnceStop();
        }

        /**
         * 播放
         */
        public play():void{

            this.gameEffect.play();
        }

        /**
         * 停止
         */
        public stop():void {

            this.gameEffect.stop();
        }

        /**
         * 重新播放
         */
        public restart() {

            this.gameEffect.restart();
        }

        /**
         * 移动
         * @param $x        x坐标
         * @param $y        y坐标
         * @param $parent   容器
         */
        public move($x: number, $y: number, $parent: fairygui.GComponent = null) {
            
            this.gameEffect.move( $x , $y , null );
            if( $parent != null ){          
                if( this.parent != null ){
                    this.removeFromParent();
                }      
                $parent.addChild( this );
            }
        }

        /**
         * 播放一次
         */
        public playOnce(fun: Function = null) {
            
            this.gameEffect.playOnce( fun );
        }

        /**
         * 当前帧
         */
        public get currentIndex(): number {

            return this.gameEffect.currentIndex;
        }

        public setScale(sx: number, sy: number):void
        {
            //super.setScale(sx,sy);//不能调用此函数,这样会导致特效放缩增大一倍
            this.gameEffect.scaleX=sx;
            this.gameEffect.scaleY=sy;
        }

        /**
         * 清理
         */
        public clear() 
        {
            if(this.gameEffect)
            {
                this.gameEffect.clear();
            }
        }

        public get height():number{

            return this.gameEffect.height;
        }

        public get width():number{

            return this.gameEffect.width;
        }

        /**设置 触摸是否开启或者关闭 */
        public set openTouch(value:boolean)
        {
            this.gameEffect.touchChildren = value;
			this.gameEffect.touchEnabled = value;
            this.touchable = value;
        }

        /**
         * 释放
         */
        public dispose() {
            
            this.stop();
            
            if( this.gameEffect != null ){
                this.gameEffect.dispose();
                this.gameEffect = null;
            }

            super.dispose();            
        }

    }
}