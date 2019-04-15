module fairui {

    /**
     * 封装fairygui按钮
     * @author clong 2019.3.4
     */
    export class EButton extends BaseButton {

        /**普通绿色 */
        public static BUTTON_NORMAL_GREEN: string = "button.normal.green";
        /**普通红色 */
        public static BUTTON_NORMAL_RED: string = "button.normal.red";
        /**普通黄色 */
        public static BUTTON_NORMAL_YELLOW: string = "button.normal.yellow";
        /**普通蓝色 */
        public static BUTTON_NORMAL_BLUE: string = "button.normal.blue";
        /**普通金色 */
        public static BUTTON_NORMAL_GOLDEN: string = "button.normal.golden";
        /**小绿色 */
        public static BUTTON_TINNY_GREEN: string = "button.tinny.green";
        /**普通红色 */
        public static BUTTON_TINNY_RED: string = "button.tinny.red";
        /**普通黄色 */
        public static BUTTON_TINNY_YELLOW: string = "button.tinny.yellow";
        /**普通蓝色 */
        public static BUTTON_TINNY_BLUE: string = "button.tinny.blue";
        /**普通金色 */
        public static BUTTON_TINNY_GOLDEN: string = "button.tinny.golden";

        //--------------------------------------------------------------------

        protected _data: any = null;

        private _custom_downEffect: number = 2;

        public constructor() {

            super();
        }

        protected constructFromXML(xml: any): void {

            super.constructFromXML(xml);
        }

        public setup_afterAdd(buffer: fairygui.ByteBuffer, beginPos: number): void {

            super.setup_afterAdd(buffer, beginPos);
        }

        protected setState(val: string): void {

            super.setState(val);
        }

        public set label(value: string) {

            this.text = value;
        }

        public get label(): string {

            return this.text;
        }

        /**
         * 设置按钮文本标签
         * @param value 按钮标签文本，可为多语言表标签
         */
        public setLabel(value: string): void {

            this.text = Global.lang.getLang(value);
        }

        public setScale(sx: number, sy: number): void {

            if (this._custom_downEffect == 2) {
                super.setScale(sx, sy);
            }
        }

        public set downScaled(value: boolean) {

            this._custom_downEffect = value ? 2 : 0;
        }
        /**是否允许按钮缩放 */
        public get downScaled(): boolean {

            return this._custom_downEffect == 2;
        }

        protected _buttonType: string;
        public set buttonType(value: string) {

            if (value) {
                let bgUrl: string = "";
                switch (this._buttonType) {
                    case EButton.BUTTON_NORMAL_RED:
                        bgUrl = fairui.FairyTextureUtils.getUrl("common", "common_anniu002");
                        break;
                    case EButton.BUTTON_NORMAL_YELLOW:
                        bgUrl = fairui.FairyTextureUtils.getUrl("common", "common_anniu005");//"common_json.common_anniu005";
                        break;
                    case EButton.BUTTON_NORMAL_GREEN:
                        bgUrl = fairui.FairyTextureUtils.getUrl("common", "common_anniu001");//"common_json.common_anniu001";
                        break;
                    case EButton.BUTTON_NORMAL_GOLDEN:
                        bgUrl = fairui.FairyTextureUtils.getUrl("common", "common_anniu006");//"common_json.common_anniu006";
                        break;
                    case EButton.BUTTON_NORMAL_BLUE:
                        bgUrl = fairui.FairyTextureUtils.getUrl("common", "common_anniu003");//"common_json.common_anniu003";
                        break;
                    case EButton.BUTTON_TINNY_RED:
                        bgUrl = fairui.FairyTextureUtils.getUrl("common", "common_anniu02");//"common_json.common_anniu02";
                        break;
                    case EButton.BUTTON_TINNY_YELLOW:
                        bgUrl = fairui.FairyTextureUtils.getUrl("common", "common_anniu05");//"common_json.common_anniu05";
                        break;
                    case EButton.BUTTON_TINNY_GREEN:
                        bgUrl = fairui.FairyTextureUtils.getUrl("common", "common_anniu01");//"common_json.common_anniu01";
                        break;
                    case EButton.BUTTON_TINNY_GOLDEN:
                        bgUrl = fairui.FairyTextureUtils.getUrl("common", "common_anniu06");//"common_json.common_anniu06";
                        break;
                    case EButton.BUTTON_TINNY_BLUE:
                        bgUrl = fairui.FairyTextureUtils.getUrl("common", "common_anniu03");//"common_json.common_anniu03";
                        break;
                }
                if (bgUrl) {
                    this.icon = this.selectedIcon = bgUrl;
                }
            }
        }
        /**几种公用按钮类型 */
        public get buttonType():string{

            return this._buttonType;
        }

        public dispose(): void {

            super.dispose();
        }
    }
}
