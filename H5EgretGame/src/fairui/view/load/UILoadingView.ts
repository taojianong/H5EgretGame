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
        private lab_tip0:fairygui.GTextField;
        private proBar:fairui.ProgressBar;

        private group_start:fairygui.GGroup;
        
        public constructor() {

            super("load", "UILoadingView");
        }


        protected registerClasses(): void {

			fairui.PanelRegister.registerClass( "load" , "ProgressBar" , fairui.ProgressBar );
		}

        public InitUI(): void {

            super.InitUI();

            this.lab_tip.visible = false;
            this.lab_tip0.visible = false;
            this.lab_tip.text = "";
            this.lab_tip0.text = Global.lang.getLang("lang_43");//此版本为封测版本
        }

        public SetViewStruct(): void {

            super.SetViewStruct();
            this.viewStruct.IsWindow = false;
            this.viewStruct.layerType = LayerType.TYPE_TOP;
        }

        /**
         * 外部不要调用
         */
        public InitData(param: any): void {

            super.InitData(param);

            this.proBar.progress = 0;
            this.proBar.isPlayTween = true;

            this.lab_tip.text = "";         

            //改变背景图片
            this.changeBgImg();
            Global.timer.doTimeLoop(6000, flash.bind(this.changeBgImg, this));

            let handler = <utils.Handler>param;
            handler.execute();
            GlobalJugger.add(this);
        }

        private labelFunction( value:number , max:number ):string{

            return "";
        }

        public advanceTime(time: number): void {
            var lq: LoadQueue = LoadQueue.Inst;
            this.onImitateProgress(lq.itemsLoaded, lq.itemsTotal);
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
            this.eloader_bg.LoadImage( UrlUtil.getPanelUrl("loading" + num, "loading") , null, null, LoadLevel.VIP );
        }

        /**
         * 添加事件函数
         */
        public AddRootListener() {

            super.AddRootListener();

            this.AddGameListener(egret.TouchEvent.TOUCH_TAP, this.clickBtnStartHandler, this, this);
        }

        /**
         * 移除事件函数
         */
        public RemoveRootListener() {

            super.RemoveRootListener();

            this.RemoveGameListener(egret.TouchEvent.TOUCH_TAP, this.clickBtnStartHandler, this, this);
        }

        /**
         * 加载完成
         */
        private onComplete(): void {
            var lq: LoadQueue = LoadQueue.Inst;
            Logger.log(this, lq.itemsLoaded + "  /  " + lq.itemsTotal);
            if (lq.itemsLoaded < lq.itemsTotal){
                return;
            }
            KeyFrameJugger.delayFrame(1, utils.Handler.Create(this.OnDelayFrameComplete, this));
        }

        private OnDelayFrameComplete(): void {

            this.btn_start.touchable = true;
            this.proBar.progress = 1;
            this.lab_pro.text = "100%";
            this.currentState = "loaded";

            GameDispatcher.Inst.DispatchGameEvent(UIGameEvent.MAIN_LOAD_COMPLETE);
            GlobalJugger.remove(this);        
        }

        /**
         * 模拟进度
         */
        private onImitateProgress(itemsLoaded: number, itemsTotal: number): void {

             let progress = itemsLoaded / itemsTotal;

            this.proBar.setVal( itemsLoaded , itemsTotal , 0 , true , this.onComplete , this );
            this.proBar.setLabel( "" );
            this.lab_pro.text = NumberUtil.toInt( progress * 100) + "%";
        }

        /**
         * 点击开始游戏
         */
        private clickBtnStartHandler(e: egret.TouchEvent): void {

            if (this.btn_start.touchable) {
                GameDispatcher.Inst.DispatchGameEvent(UIGameEvent.START_GAME);
            }
        }

        public OnResize(): void {

            super.OnResize();
            this.btn_start.width = Global.stageWidth;
            this.group_start.y = Global.stageHeight - this.group_start.height;

            let scaleX:number = Global.stageWidth / this.width;
            let scaleY:number = Global.stageHeight / this.height;
            this.eloader_bg.scaleX = scaleX;
            this.eloader_bg.scaleY = scaleY;      
        }

        public Reset(): void {

            super.Reset();
            this.eloader_bg.Dispose();

            Global.timer.clearTimer(flash.bind(this.changeBgImg, this));
            GlobalJugger.remove(this);
        }
    }
}