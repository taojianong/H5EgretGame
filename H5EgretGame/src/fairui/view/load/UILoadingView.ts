module fairui {

    /**
     * 主加载界面
     * @author cl 2018.10.29
     */
    export class UILoadingView extends fairui.UIBaseWindow {

        private btn_start: fairygui.GImage;
        private img_start:fairygui.GLoader;
        private eloader_bg:fairui.ELoader;
        private lab_pro:fairygui.GTextField;
        private lab_tip:fairygui.GTextField;
        private proBar:fairui.ProgressBar;

        private group_start:fairygui.GGroup;
        
        public constructor() {

            super("load", "UILoadingView");
        }


        protected registerClasses(): void {

			fairui.PanelRegister.registerClass( "load" , "ProgressBar" , fairui.ProgressBar );
		}

        public InitUI(): void {

            super.initUI();

            this.lab_tip.visible = false;
            this.lab_tip.text = "";
        }

        protected setViewStruct(): void {

            super.setViewStruct();
            this.viewStruct.isWindow = false;
            this.viewStruct.layerType = UILayout.TYPE_TOP;
        }

        /**
         * 外部不要调用
         */
        public initData(param: any): void {

            super.initData(param);

            this.proBar.progress = 0;
            this.proBar.isPlayTween = true;

            this.lab_tip.text = "";         

            //改变背景图片
            this.changeBgImg();
            Global.timer.doTimeLoop(6000, flash.bind(this.changeBgImg, this));

            if( param instanceof utils.Handler ){
                param.execute();
            }
            // GlobalJugger.add(this);
        }

        private labelFunction( value:number , max:number ):string{

            return "";
        }

        public advanceTime(time: number): void {
            // var lq: LoadQueue = LoadQueue.Inst;
            // this.onImitateProgress(lq.itemsLoaded, lq.itemsTotal);
        }

        private index: number = 1;
        private changeBgImg(): void {

            let num: number = 0;
            while (num = MathUtil.makeRandom(1, 3)) {
                if (num != this.index) {
                    this.index = num;
                    break;
                }
            }
            //加载对应背景图片
            this.eloader_bg.loadImage( UrlUtil.getPanelUrl("loading" + num, "loading") , null );
        }

        /**
         * 添加事件函数
         */
        public addAllListener() {

            super.addAllListener();

            this.addGameListener(egret.TouchEvent.TOUCH_TAP, this.clickBtnStartHandler, this, this);
        }

        /**
         * 移除事件函数
         */
        public removeAllListener() {

            super.removeAllListener();

            this.removeGameListener(egret.TouchEvent.TOUCH_TAP, this.clickBtnStartHandler, this, this);
        }

        /**
         * 加载完成
         */
        private onComplete(): void {
            // var lq: LoadQueue = LoadQueue.Inst;
            // Global.log.log(this, lq.itemsLoaded + "  /  " + lq.itemsTotal);
            // if (lq.itemsLoaded < lq.itemsTotal){
            //     return;
            // }
            // KeyFrameJugger.delayFrame(1, utils.Handler.Create(this.OnDelayFrameComplete, this));

            if( this.proBar.progress >= 1 ) {
                Global.timer.doFrameOnce( 1 , flash.bind( this.OnDelayFrameComplete , this ) );
            }
        }

        private OnDelayFrameComplete(): void {

            this.btn_start.touchable = true;
            this.proBar.progress = 1;
            this.lab_pro.text = "100%";
            this.currentState = "loaded";

            // GlobalJugger.remove(this); 
            EventManager.dispatchEvent( GameEvent.MAIN_LOAD_COMPLETE );       
        }

        /**
         * 模拟进度
         */
        private onImitateProgress(itemsLoaded: number, itemsTotal: number): void {

             let progress = itemsLoaded / itemsTotal;

            this.proBar.setVal( itemsLoaded , itemsTotal , 0 , true , this.onComplete , this );
            this.proBar.setLabel( "" );
            this.lab_pro.text = MathUtil.toInt( progress * 100 ) + "%";
        }

        /**
         * 点击开始游戏
         */
        private clickBtnStartHandler(e: egret.TouchEvent): void {

            if (this.btn_start.touchable) {
                EventManager.dispatchEvent( GameEvent.START_GAME );
            }
        }

        public onResize(): void {

            super.onResize();
            this.btn_start.width = Global.stageWidth;
            this.group_start.y = Global.stageHeight - this.group_start.height;

            let scaleX:number = Global.stageWidth / this.width;
            let scaleY:number = Global.stageHeight / this.height;
            this.eloader_bg.scaleX = scaleX;
            this.eloader_bg.scaleY = scaleY;      
        }

        public clear(): void {

            super.clear();

            Global.timer.clearTimer(flash.bind(this.changeBgImg, this));
            // GlobalJugger.remove(this);
        }
    }
}