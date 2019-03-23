module fairui {

	import GList = fairygui.GList;

	/**
	 * 封装FairyGui列表
	 * @author cl 2018.4.18
	 */
	export class EGList extends egret.EventDispatcher {

		private list: GList;
		private _array: Array<any>;
		private _thisObject: any;
		private _itemRenderer: Function = null;
		private _clickHandler: Function = null;//点击事件
		private _selectedPage: Function = null;//分页选中某一页触发的事件
		private _elements: Array<fairygui.GObject> = null;
		private _lastclickItem: fairygui.GObject = null;
		private _isShowDoSpecialEffect: boolean = false;

		/**分页组件 */
		private currentpage: number = 0;
		private isFirst: boolean = false;
		/**向左按钮 */
		private _btn_left: EButton | fairygui.GButton | LoaderButton;
		/**向右按钮 */
		private _btn_right: EButton | fairygui.GButton | LoaderButton;

		/**这个变量主要是来标识List是否滚动,滚动后由于item复用会导致list的点击bug */
		private _isRenderData: boolean = false;

		public constructor(list: GList, thisObject: any = null) {
			super();
			this.list = list;
			if (this.list != null) {
				this.callbackThisObj = thisObject || this;
				this.list.callbackThisObj = this;
				this.list.itemRenderer = this.listItemRender;
				this.list.addEventListener(fairygui.ItemEvent.CLICK, this.clickItem, this);
			}
		}

		/**设置上一页按钮 */
		public set btn_left(value: EButton | fairygui.GButton | LoaderButton) {
			if (value) {
				this._btn_left = value;
				this._btn_left.addEventListener(egret.TouchEvent.TOUCH_TAP, flash.bind(this.touchLeftBtnHandler, this), this);
			} else {
				if (this._btn_left) {
					this._btn_left.removeEventListener(egret.TouchEvent.TOUCH_TAP, flash.bind(this.touchLeftBtnHandler, this), this);
				}
			}
		}

		/**
        * 上一页
        */
		private touchLeftBtnHandler(e: egret.TouchEvent): void {
			if (this.currentpage > 0) {
				let index: number = this.currentpage - 1;
				this.toPage(index);
			}
		}

		/**设置下一页按钮 */
		public set btn_right(value: EButton | fairygui.GButton | LoaderButton) {
			if (value) {
				this._btn_right = value;
				this._btn_right.addEventListener(egret.TouchEvent.TOUCH_TAP, flash.bind(this.touchRightBtnHandler, this), this);
			} else {
				if (this._btn_right) {
					this._btn_right.removeEventListener(egret.TouchEvent.TOUCH_TAP, flash.bind(this.touchRightBtnHandler, this), this);
				}
			}
		}

		/**
         * 下一页
         */
		private touchRightBtnHandler(e: egret.TouchEvent): void {
			if (this.currentpage < this.array.length - 1) {
				let index: number = this.currentpage + 1;
				this.toPage(index);
			}
		}

		/**跳转到某一页 0~n*/
		private toPage(index: number): void {
			index = index < 0 ? 0 : index;
			if (this._selectedPage) {
				this._selectedPage.apply(this.callbackThisObj, 0);
			}
			this.scrollToView(index, true);//滚动到某一个item
		}

		/**滑动list */
		private scrollListPage(): void {

			let index: number = ((this.list.getFirstChildInView()) % this.list.numItems);//获取页数

			this.currentpage = index;

			if (this._btn_left) {
				this._btn_left.enabled = this.currentpage > 0;
			}

			if (this._btn_right) {
				this._btn_right.enabled = this.currentpage < (this.array.length - 1);
			}

			if (this._selectedPage) {
				this._selectedPage.apply(this.callbackThisObj, 0);
			}
		}

		public set isShowDoSpecialEffect(bool: boolean) {
			this._isShowDoSpecialEffect = bool;
			if (this._isShowDoSpecialEffect) {
				this.list.scrollPane.addEventListener(fairygui.ScrollPane.SCROLL, this.doSpecialEffect, this);
			} else {
				this.list.scrollPane.removeEventListener(fairygui.ScrollPane.SCROLL, this.doSpecialEffect, this);
			}
		}

		/**
		 * 滑动list
		 */
		private doSpecialEffect(): void {
			var midX: number = this.list.scrollPane.posX + this.list.viewWidth / 2;
			var cnt: number = this.list.numChildren;
			for (var i: number = 0; i < cnt; i++) {
				var obj: fairygui.GObject = this.list.getChildAt(i);
				var dist: number = Math.abs(midX - obj.x - obj.width / 2);
				if (dist <= obj.width * 0.5) //此条目在中间
				{
					if (this._lastclickItem && obj && this._lastclickItem == obj) {
						continue;
					}
					this.clickIndex = this.getShowItemIndex(obj);
					return;
				}
			}
		}

		public getShowItem(index: number): any {
			return this.list.getChildAt(index);
		}

		/** 更具条目 获取索引，是否为条目索引*/
		public getShowItemIndex(item: fairygui.GObject, isChindIndex: boolean = true): number {
			if (isChindIndex) {
				return this.list.getChildIndex(item);
			} else {
				return this.list.childIndexToItemIndex(this.list.getChildIndex(item));
			}
		}

		/**转换到显示对象索引*/
		public itemIndexToChildIndex(index: number): number {
			let newIndex: number = this.list.itemIndexToChildIndex(index);
			return newIndex;
		}

		/**转换显示对象索引为项目索引。*/
		public childIndexToItemIndex(index: number): number {
			let newIndex: number = this.list.childIndexToItemIndex(index);
			return newIndex;
		}

		/**设置虚拟列表 */
		public setVirtual(): void {
			this.list.setVirtual();
			this.setScroll();
		}

		public setScroll(): void {
			if( this.list.scrollPane ){
				this.list.scrollPane.addEventListener(fairygui.ScrollPane.SCROLL, flash.bind(this.scrollListPage, this), this);//这个函数主要是来处理滚动分页
			}			
		}

		/**
		 * 设置List是否能够滚动
		 */
		public set isDragged(value: boolean) {
			if ( this.list.scrollPane ) {
				this.list.scrollPane.touchEffect = value;
			}
		}

		public sync(): void {
			this.list.ensureBoundsCorrect();
		}

		/**默认选择第几个 */
		public set clickIndex(index: number) {
			let newIndex: number = this.itemIndexToChildIndex(index);
			if (newIndex < 0) {
				newIndex = 0;
			}
			if (this.list.numChildren > 0) {
				let item: fairygui.GObject = this.list.getChildAt(newIndex);
				let ie: fairygui.ItemEvent = new fairygui.ItemEvent(fairygui.ItemEvent.CLICK, item);
				this.list.dispatchEvent(ie);
			}
		}

		public set callbackThisObj(value: any) {

			this._thisObject = value;
		}
		/**This */
		public get callbackThisObj(): any {

			return this._thisObject;
		}

		/**
		 * 设置渲染条目
		 */
		public setRenderItem(pkgName: string, resName: string): void {

			this.list.defaultItem = FairyTextureUtils.getUrl(pkgName, resName);
		}

		public set itemProvider(value: Function) {

			if (this.list != null) {
				this.list.itemProvider = value;
			}
		}

		public set itemRenderer(value: Function) {

			this._itemRenderer = value;
			if (this.list != null) {
				this.list.itemRenderer = value;
			}
		}
		/**渲染方法 */
		public get itemRenderer(): Function {

			return this._itemRenderer;
		}

		public set clickHandler(value: Function) {

			this._clickHandler = value;
		}
		/**点击事件 */
		public get clickHandler(): Function {

			return this._clickHandler;
		}

		/**设置分页事件 */
		public set selectedPage(value: Function) {

			this._selectedPage = value;
		}
		/**获取分页事件 */
		public get selectedPage(): Function {

			return this._selectedPage;
		}

		public get selectionMode(): fairygui.ListSelectionMode {
			return this.list.selectionMode;
		}
		/**选择模式 */
		public set selectionMode(value: fairygui.ListSelectionMode) {
			this.list.selectionMode = value;
		}
		/**每次数值改变之前会触发每个显示中子组件的data=null的方法，重写set data自己处理数据引用,某些情况如果显示中的子组件需要数据更新，
		 * 请使用elements属性自行进行组件更新，不要给array赋值，可以提升效率*/
		public set array(value: Array<any>) {
			this._array = value || [];
			this.clearData();
			this._elements = [];
			if (this.list != null) {
				this.list.numItems = this._array.length;
			}
		}
		/**
		 * 设置对应数据
		 */
		public get array(): Array<any> {

			return this._array;
		}

		public set numItems(value: number) {

			this._array = [];
			this.clearData();
			this._elements = [];
			this._array.length = value;
			if (this.list != null) {
				this.list.numItems = this._array.length;
			}
		}
		/**设置条目 */
		public get numItems(): number {

			return this.list.numItems;
		}

		/**
		 * 点击条目
		 */
		private clickItem(e: fairygui.ItemEvent): void {
			this.selectItem(e.itemObject);
		}

		/**选择条目 */
		public selectItem(item: any): void {

			//复选可选择多个可重复选择
			if ((this.selectionMode == fairygui.ListSelectionMode.Single)
				&& this._lastclickItem
				&& item
				&& this._lastclickItem == item
				&& (this._lastclickItem["listIndex"] == item["listIndex"] && !this._isRenderData)
			) {
				return;
			}

			this._isRenderData = false;

			if (this._lastclickItem) {
				this._lastclickItem["select"] = false;
			}
			if (item) {
				item["select"] = true;
			}
			this._lastclickItem = item;

			if (this._clickHandler) {
				this._clickHandler.apply(this.callbackThisObj, [item]);
			}
		}

		/**获取选择的条目 */
		public get lastClickItem(): fairygui.GObject {
			return this._lastclickItem;
		}

		/**
		 * 渲染条目
		 */
		private listItemRender(index: number, obj: fairygui.GObject): void {

			if (index == 0) {
				this._elements = [];
			}

			this._isRenderData = true;

			let item: any = obj;
			if (item && item["show"] != undefined) {
				item.show(this._array[index]);
			}
			if (this.elements.indexOf(item) == -1) {
				this.elements.push(item);
			}
			//列表渲染单个条目
			let evt: GameEvent = new GameEvent(GameEvent.RENDER);
			evt.data = { "index":index , "obj":obj , "thisObject":this._thisObject };
			this.dispatchEvent(evt);
			//列表渲染完成
			if (index == (this._array.length - 1)) {

				let completeEvt: GameEvent = new GameEvent(GameEvent.COMPLETE);
				completeEvt.thisObject = this._thisObject;
				this.dispatchEvent(completeEvt);
			}

			if (this._selectedPage) {
				//处理分页的时候
				if (index == 0 && !this.isFirst) {
					this.isFirst = true;
					this._selectedPage.apply(this.callbackThisObj, 0);
				}
			}
		}

		/**列表渲染所有条目  虚拟列表不可以这样取*/
		public get elements(): Array<fairygui.GObject> {
			return this._elements;
			//转换项目索引为显示对象索引。
		}

		public set selectedIndex(value: number) {

			this.list.selectedIndex = value;
		}
		/**当前选择条目索引 */
		public get selectedIndex(): number {

			return this.list.selectedIndex;
		}

		/**添加选择 */
		public addSelection(index: number, scrollItToView?: boolean): void {

			this.list.addSelection(index, scrollItToView);
		}

		/**移除选择 */
		public removeSelection(index: number): void {

			this.list.removeSelection(index);
		}

		/**全选 */
		public selectAll(): void {

			this.list.selectAll();
		}

		/**不选择 */
		public selectNone(): void {

			this.list.selectNone();
		}

		/**反选 */
		public selectReverse(): void {

			this.list.selectReverse();
		}

		/**
		 * 滚动到
		 * @params index
		 * @params ani
		 * @params setFirst
		 */
		public scrollToView(index: number, ani: boolean = false, setFirst: boolean = false): void {

			this.list.scrollToView(index, ani, setFirst);
		}

		public get scrollPane(): fairygui.ScrollPane {

			return this.list.scrollPane;
		}

		public getFirstChildInView(): number {

			return this.list.getFirstChildInView();
		}

		/**
		 * 滚动到底部
		 */
		public scrollToBottom(): void {

			this.list.scrollToView(this._array.length - 1);
		}

		public set touchEnabled(value: boolean) {

			this.list._rootContainer.touchEnabled = value;
		}

		public get touchEnabled(): boolean {

			return this.list._rootContainer.touchEnabled;
		}

		public get enabled(): boolean {
			return this.list.enabled;
		}

        public set enabled(val:boolean) {
            this.list.enabled = val;
        }

		public set touchChildren(value: boolean) {

			this.list._rootContainer.touchChildren = value;
		}

		public get touchChildren(): boolean {

			return this.list._rootContainer.touchChildren;
		}

		public getChildAt(index: number): fairygui.GObject {

			return this.list.getChildAt(index)
		}

		public get numChildren(): number {

			return this.list.numChildren;
		}

		public set visible( value:boolean ){

			this.list.visible = value;
		}

		public get visible():boolean{

			return this.list.visible;
		}

		public set x(value: number) {

			this.list.x = value;
		}

		public get x(): number {

			return this.list.x;
		}

		public set y(value: number) {

			this.list.y = value;
		}

		public get y(): number {

			return this.list.y;
		}

		public get width(): number {
			return this.list.width;
		}

		public set width(value: number) {
			this.list.width = value;
		}

		public get height(): number {
			return this.list.height;
		}

		public set height(value: number) {
			this.list.height = value;
		}

		public get viewWidth(): number {
			return this.list.viewWidth;
		}

		public get viewHeight(): number {
			return this.list.viewHeight;
		}

		public set grayed(value: boolean) {

			this.list.grayed = value;
		}
		/**置灰 */
		public get grayed(): boolean {

			return this.list.grayed;
		}

		public set columnCount(value: number) {
			this.list.columnCount = value;
		}

		public localToGlobal(ax?: number, ay?: number, resultPoint?: egret.Point): egret.Point {
			return this.list.localToGlobal(ax, ay, resultPoint);
		}

		public clearData() {
			if (this.elements) {
				for (let index in this.elements) {
					if (this.elements[index] instanceof BaseSprite) {
						this.elements[index]["hide"]();
					}
				}
			}
			if (this._lastclickItem) {
				this._lastclickItem["select"] = false;
				this._lastclickItem = null;
			}
		}
		/**
		 * 释放
		 */
		public dispose(): void {
			if (this.list != null) {
				this.list.removeEventListener(fairygui.ItemEvent.CLICK, this.clickItem, this);
				if (this.list.scrollPane) {
					this.list.scrollPane.removeEventListener(fairygui.ScrollPane.SCROLL, flash.bind(this.scrollListPage, this), this.list.scrollPane);
				}
				this.list.dispose();
				this.list = null;
			}
			this._btn_left = null;
			this._btn_right = null;
			this._thisObject = null;
			this._itemRenderer = null;
			this._clickHandler = null;
			this._selectedPage = null;
			this._array = null;
			this.clearData();
			this._elements = null;
			this._lastclickItem = null;

			if (this._btn_left) {
				this._btn_left.removeEventListener(egret.TouchEvent.TOUCH_TAP, flash.bind(this.touchLeftBtnHandler, this), this);
			}
			if (this._btn_right) {
				this._btn_right.removeEventListener(egret.TouchEvent.TOUCH_TAP, flash.bind(this.touchRightBtnHandler, this), this);
			}
		}
	}
}