module fairui {

    import GGroup = fairygui.GGroup;
    import GComponent = fairygui.GComponent;

    /**
     * @author Xjy
     * @date 2018/4/2
     * @Description: 自定义选择标签
     */
    export class ETab {
        /**选中的Index*/
        private _selectedIndex: number = -1;
        /**按钮数组*/
        private _buttonArray: Array<EButton> = new Array<EButton>();
        /**总条目数*/
        private _itemNum: number = 0;
        /**选择处理函数*/
        private _selectedHandler: Function;
        /**使用者的this对象 */
        private callbackThisObj: any;

        private group: GGroup;
        /**初始XY坐标 */
        private initX:number = 0;
        private initY:number = 0;

        //tab按钮中最大层级
        private maxIndex:number = 0;

        public constructor(group: GGroup, callbackThisObjValue: any) {

            this.group = group;
            //初始化Tab
            let tabParent: GComponent = group.parent;
            let cnt = tabParent.numChildren;
            let btn:EButton;
            for (let i: number = 0; i < cnt; i++) {
                if (tabParent.getChildAt(i).group == group) {
                    btn = <EButton>tabParent.getChildAt(i);
                    this._buttonArray.push( btn );
                    btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTabButtonClick, this);
                    btn.data = this._buttonArray.length - 1;
                    ++this._itemNum;
                    if( this._buttonArray.length == 1 ){
                        this.initX = btn.x;
                        this.initY = btn.y;
                    }
                    this.maxIndex = Math.max( this.maxIndex , i );
                }
            }
            this.callbackThisObj = callbackThisObjValue;
        }

        public setButtonArray( btns:Array<EButton> ):void{

            this._buttonArray = btns;
            let i:number = 0;
            let btn:EButton = null;
            for( i=0;i<this._buttonArray.length;i++ ){
                btn = this._buttonArray[i];
                btn.data = i;
                if( i == 0 ){
                    this.initX = btn.x;
                    this.initY = btn.y;
                }
            }
        }

        /**
         * 排列按钮坐标
         * @param gap 间隔
         * @param dir 0为竖向，1为横向
         */
        public sortBtnPoint( gap:number = 5 , dir:number = 0  ):void{

            let i:number = 0;
            let btn:EButton = null;
            let prev:EButton = null;
            for( i=0;i<this._buttonArray.length;i++ ){
                btn = this._buttonArray[i];
                if( btn && btn.visible ){
                    if( dir == 0 ){
                        btn.y = prev == null ? this.initY : prev.y + prev.height + gap;
                    }else if( dir == 1 ){
                        btn.x = prev == null ? this.initX : prev.x + prev.width + gap;
                    }
                    prev = btn;
                }
            }
        }

        /**按钮数组 */
        public get buttonArray():Array<EButton>{

            return this._buttonArray;
        }

        public set selectedIndex(val: number) {
            if (val > this._itemNum) {
                return;
            }
            if (this._selectedIndex >= 0) {
                this._buttonArray[this._selectedIndex].selected = false;
            }
            this._buttonArray[val].selected = true;
            if( this._buttonArray[val] instanceof EButton ){
                this._buttonArray[val].indexTo( this.maxIndex );// toTop();
            }
            this._selectedIndex = val;
            if (this._selectedHandler != null) {
                this._selectedHandler.call(this.callbackThisObj, this._selectedIndex);
            }
        }

        public set clickHandler(handler: Function) {
            this._selectedHandler = handler;
        }

        public get selectedIndex(): number {
            return this._selectedIndex;
        }

        /**
         * 按钮点击事件
         * @author xjy
         * @date 2018/4/3
         * @param index 按钮索引
         */
        private onTabButtonClick(evt: egret.TouchEvent): void {

            this.selectedIndex = (evt.target).data;            
        }

        public set x( value:number ){

            this.group.x = value;
        }

        public get x():number{

            return this.group.x;
        }

        public set y( value:number ){

            this.group.y = value;
        }

        public get y():number{

            return this.group.y;
        }
    }
}