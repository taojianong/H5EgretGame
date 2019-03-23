module fairui {

    /**
     * Alert 弹框
     * @author clong 2019.3.23
     */
    export class Alert extends BasePanel {

        /**都不显示 */
        public static NULL: number = 0;
        /**确定 */
        public static OK: number = 1;
        /**取消 */
        public static CANCEL: number = 2;

        /**
         * 显示弹出框
         * @param content   要显示的提示文本
         * @param title     标题文字
         * @param flag      显示按钮状态 Alert.OK | Alert.CANCEL
         * @param data      其他参数(方法要使用flash.bind) okFunc,okFuncParams,cancelFunc,cancelFuncParams,showMask,showText
         */
        public static show(content: string, title: string = "", flag: number = 1, data: Object = null): void {
            data = data || {};
            data["content"] = App.lang.getLang(content);
            data["title"] = title;
            data["flag"] = flag;
            FairyUIManager.openPanel(EnumPanelID.ALERT, data);
        }
        /**隐藏弹出框*/
        public static hide(): void {
            FairyUIManager.closePanel(EnumPanelID.ALERT);
        }
        //------------------------------------------------------------------------------
        private txt_title: fairygui.GTextField;
        private txt_content: fairygui.GTextField;
        private btn_ok: EButton;
        private btn_cancel: EButton;
        private img_bg: fairygui.GImage;

        public constructor() {

            super("common", "AlertView");
        }

        public init(): void {
            super.init();
            // this.showCloseBtn = false; //关闭按钮没有绑定到按钮上的逻辑，所以不能显示关闭按钮，如果要显示一定要显示，必须绑定对应按钮的逻辑才行 不然会有很多BUG
            this.addPanelEventListener(egret.TouchEvent.TOUCH_TAP, this.touchOkHandler, this.btn_ok);
            this.addPanelEventListener(egret.TouchEvent.TOUCH_TAP, this.touchCancelHandler, this.btn_cancel);
            this.addPanelEventListener(egret.TouchEvent.TOUCH_TAP, this.close, this.btn_close);
        }

        /**点击确定*/
        private touchOkHandler(e: egret.TouchEvent): void {
            this.close(false);
            if (this.data != null && this.data.hasOwnProperty("okFunc")) {
                let okParams: any = this.data.hasOwnProperty("okFuncParams") ? this.data["okFuncParams"] : [];
                this.data["okFunc"].apply(this.data["okFunc"]["owner"], okParams);
            }
        }

        /**点击确定*/
        private touchCancelHandler(e: egret.TouchEvent): void {
            this.close(false);
            if (this.data != null && this.data.hasOwnProperty("cancelFunc")) {
                let cancelParams: any = this.data.hasOwnProperty("cancelFuncParams") ? this.data["cancelFuncParams"] : [];
                this.data["cancelFunc"].apply(this.data["cancelFunc"]["owner"], cancelParams);
            }
        }

        /**显示数据*/
        public show(data: Object): void {

            if (data && data.hasOwnProperty("showMask")) {
                this.openTapMask = data["showMask"];
            }
            super.show(data);
            if (data != null) {
                this.title = data["title"];
                this.content = data["content"];
                if (data["okTitle"]) {
                    this.btn_ok.text = data["okTitle"];
                } else {
                    this.btn_ok.text = App.lang.getLang("login_ui_txt1");
                }
                this.showBtn(data["flag"]);
                //关闭按钮没有绑定到按钮上的逻辑，所以不能显示关闭按钮，如果要显示一定要显示，必须绑定对应按钮的逻辑才行 不然会有很多BUG
                if (data.hasOwnProperty("showCloseBtn") && data["showCloseBtn"] == true) {
                    this.btn_close.visible = true;
                } else {
                    this.btn_close.visible = false;//隐藏关闭按钮
                }
                if (data.hasOwnProperty("showText")) {
                    this.btn_ok.text = data["showText"][0];
                    if (data["showText"].length > 1)
                        this.btn_cancel.text = data["showText"][1];
                }
                else {
                    this.btn_ok.text = App.lang.getLang("login_ui_txt1");
                    this.btn_cancel.text = App.lang.getLang("cancel");
                }
            }
        }

        public hide(): void {

            super.hide();
            this.hideMask();
        }

        public set title(value: string) {

            this.txt_title.text = value;
        }
        /**
         * 设置标题
         */
        public get title(): string {

            return this.txt_title.text;
        }

        public set content(value: string) {

            this.txt_content.text = value || "";
        }
        /**
         * 显示内容
         */
        public get content(): string {

            return this.txt_content.text;
        }

        //显示确定取消按钮
        protected showBtn(flag: number = 1): void {

            if (this.btn_ok != null) {
                this.btn_ok.removeFromParent();
            }
            if (this.btn_cancel != null) {
                this.btn_cancel.removeFromParent();
            }

            if (flag & Alert.OK) {
                this.view.addChild(this.btn_ok);
            }

            if (flag & Alert.CANCEL) {
                this.view.addChild(this.btn_cancel);
            }

            this.setBtnXY();
        }

        /**
         * 设置按钮坐标
         */
        protected setBtnXY(): void {

            //当只有确定按钮或取消按钮时，居中显示确定按钮或取消按钮
            if (this.btn_ok.parent != null && this.btn_cancel.parent != null) {
                this.btn_ok.x = this.img_bg.x + 297;//this.img_bg.x + 55;
                this.btn_cancel.x = this.img_bg.x + 63;//this.img_bg.x + 219;
            } else if (this.btn_ok.parent != null && this.btn_cancel.parent == null) {
                this.btn_ok.x = (this.width - this.btn_ok.width) * 0.5 - 10;
            }
        }

        /**
		 * 调整关闭按钮位置
		 */
        protected adjustBtnClosePos(): void {
            // if (this.btn_close != null) {
            //     this.btn_close.x = this.img_bg.x + this.img_bg.width - this.btn_close.width * 0.5 - 10;
            //     this.btn_close.y = this.img_bg.y - this.btn_close.height * 0.5 + 5;
            // }
        }

        public dispose(): void {

            super.dispose();
            this.hideMask();
            this._data = null;
        }
    }
}