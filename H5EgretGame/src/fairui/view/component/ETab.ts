module fairui {

    /**
     * @author clong 2019.1.29
     * @Description: 自定义选择标签
     */
    export class ETab extends BaseSprite {

        /**选中的Index*/
        private _selectedIndex: number = -1;
        /**按钮数组*/
        private _buttonArray: Array<ESButton> = new Array<ESButton>();
        /**总条目数*/
        private _itemNum: number = 0;
        /**选择处理函数*/
        private _selectedHandler: Function;
        /**使用者的this对象 */
        private callbackThisObj: any;

        private tabGroup: fairygui.GGroup;
        /**初始XY坐标 */
        private initX: number = 0;
        private initY: number = 0;

        //tab按钮中最大层级
        private maxIndex: number = 0;

        /**按钮所在最低层级 */
        private minLayer:number = -1;

        public constructor(group: fairygui.GGroup, callbackThisObjValue: any) {

            super();
            this.tabGroup = group;
            //初始化Tab
            let tabParent: fairygui.GComponent = group.parent;
            let cnt = tabParent.numChildren;
            let btn: ESButton;
            for (let i: number = 0; i < cnt; i++) {
                if (tabParent.getChildAt(i).group == group) {
                    btn = <ESButton>tabParent.getChildAt(i);
                    this._buttonArray.push(btn);
                    btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTabButtonClick, this);
                    btn.data = this._buttonArray.length - 1;
                    ++this._itemNum;
                    if (this._buttonArray.length == 1) {
                        this.initX = btn.x;
                        this.initY = btn.y;
                    }
                    this.maxIndex = Math.max(this.maxIndex, i);
                    if( this.minLayer == -1 ){
                        this.minLayer = i;
                    }
                }                
            }
            this.callbackThisObj = callbackThisObjValue;
        }

        public IsInited(): boolean {
            return true;
        }

        public set isReverse(value: boolean) {

            if (value) {
                this._buttonArray = this._buttonArray.reverse();
                for (let i: number = 0; i < this._buttonArray.length; i++) {
                    this._buttonArray[i].data = i;
                }
                this.tabIndex = 0;
            }
        }

        public setButtonArray(btns: Array<ESButton>): void {

            this._buttonArray = btns;
            let i: number = 0;
            let btn: ESButton = null;
            for (i = 0; i < this._buttonArray.length; i++) {
                btn = this._buttonArray[i];
                btn.data = i;
                if (i == 0) {
                    this.initX = btn.x;
                    this.initY = btn.y;

                    this.minLayer = btn.getIndex();
                }else{
                    this.minLayer = Math.min( this.minLayer , btn.getIndex() );
                }
            }
        }

        /**
         * 排列按钮坐标
         * @param gap 间隔
         * @param dir 0为竖向，1为横向
         */
        public sortBtnPoint(gap: number = 5, dir: number = 0): void {

            let i: number = 0;
            let btn: ESButton = null;
            let prev: ESButton = null;
            for (i = 0; i < this._buttonArray.length; i++) {
                btn = this._buttonArray[i];
                if (btn && btn.visible) {
                    if (dir == 0) {
                        btn.y = prev == null ? this.initY : prev.y + prev.height + gap;
                    } else if (dir == 1) {
                        btn.x = prev == null ? this.initX : prev.x + prev.width + gap;
                    }
                    prev = btn;
                }
            }
        }

        /**按钮数组 */
        public get buttonArray(): Array<ESButton> {

            return this._buttonArray;
        }

        public set tabIndex(value: number) {

            this.selectedIndex = value;
        }

        public get tabIndex(): number {

            return this._selectedIndex;
        }

        public set clickHandler(handler: Function) {
            this._selectedHandler = handler;
        }

        public set selectedIndex(val: number) {
            if (val > this._itemNum) {
                return;
            }
            if (this._selectedIndex >= 0) {
                this._buttonArray[this._selectedIndex].selected = false;
            }
            this._buttonArray[val].selected = true;
            this.sortBtnLayers( val );

            this._selectedIndex = val;
            if (this._selectedHandler != null) {
                this._selectedHandler.call(this.callbackThisObj, this._selectedIndex);
            }
        }

        public get selectedIndex(): number {
            return this._selectedIndex;
        }

        /**
         * 标签按钮层级排序
         * @param except 当前选中按钮索引
         */
        private sortBtnLayers( except:number ):void{

            let btn:ESButton = null;
            let len:number = this._buttonArray.length;
            for( let i =0;i<len;i++ ){
				btn = this._buttonArray[i]; 
                if( btn ){
                    btn.parent.setChildIndex( btn , this.minLayer + len - i - 1 );
                }				
			}
			btn = this._buttonArray[except];
            if( btn ){
                btn.indexTo( this.minLayer + len - 1 );
            }
        }

        /**
         * 按钮点击事件
         * @param index 按钮索引
         */
        private onTabButtonClick(evt: egret.TouchEvent): void {

            this.selectedIndex = (evt.target).data;
        }

        public set x(value: number) {

            this.tabGroup.x = value;
        }

        public get x(): number {

            return this.tabGroup.x;
        }

        public set y(value: number) {

            this.tabGroup.y = value;
        }

        public get y(): number {

            return this.tabGroup.y;
        }

        public get parent():fairygui.GComponent{

            return this.tabGroup.parent;
        }

        //---------------------------------------------------
        public clear(): void {

            super.clear();           
        }

        public dispose(): void {

            super.dispose();
            if (this.tabGroup != null) {
                this.tabGroup.dispose();
            }
            this.tabGroup = null;
            this._buttonArray = null;
            this._selectedHandler = null;
            this.callbackThisObj = null;

            this._selectedIndex = -1;
            this.minLayer = -1;
            this.maxIndex = 0;
            this.initX = 0;
            this.initY = 0;            
            this._itemNum = 0;
        }        
    }
}