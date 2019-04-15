module fairui {

	/**
	 * 封装FairyGui列表,需编辑器中fairygui.GList命名为eglist_开头
	 * @author clong 2019.1.30
	 */
	export class EGList extends BaseSprite {

		protected list:fairygui.GList;
		protected _array: Array<any>;
		protected _thisObject: any;
		protected _itemRenderer: Function = null;
		protected _clickHandler: Function = null;//点击事件
		protected _selectedPage: Function = null;//分页选中某一页触发的事件
		protected _elements: Array<fairygui.GObject> = null;
		protected _lastclickItem: fairygui.GObject = null;
		private _isShowDoSpecialEffect: boolean = false;

		/**分页组件 */
		protected currentpage: number = 0;
		protected isFirst: boolean = false;
		/**向左按钮 */
		protected _btn_left: EButton | fairygui.GButton;
		/**向右按钮 */
		protected _btn_right: EButton | fairygui.GButton;

		/**是否自动滑动到底部 */
		public isAutoBottom:boolean = false;

		public constructor(list: fairygui.GList, thisObject: any = null) {
			super();
			this.list = list;
			if (this.list != null) {
				this.callbackThisObj = thisObject || this;
				this.list.callbackThisObj = this;
				this.list.itemRenderer = this.listItemRender;
				this.list.addEventListener(fairygui.ItemEvent.CLICK, this.clickItem, this);
			}
		}

		 public IsInited(): boolean {
			return true;
		}

		public AddRootListener() {

			super.AddRootListener();
		}

		/**设置上一页按钮 */
		public set btn_left(value: EButton | fairygui.GButton) {
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
		public set btn_right(value: EButton | fairygui.GButton) {
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
			if (this.list.scrollPane) {
				this.list.scrollPane.addEventListener(fairygui.ScrollPane.SCROLL, flash.bind(this.scrollListPage, this), this);//这个函数主要是来处理滚动分页
			}
		}

		/**
		 * 设置List是否能够滚动
		 */
		public set isDragged(value: boolean) {
			if (this.list.scrollPane) {
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

		/**是否为单选模式 */
		public get isSingleSelect():boolean{

			return this.selectionMode == fairygui.ListSelectionMode.Single;
		}

		/**是否为多选模式 */
		public get isMultSelect():boolean{

			return this.selectionMode == fairygui.ListSelectionMode.Multiple;
		}
		
		/**每次数值改变之前会触发每个显示中子组件的data=null的方法，重写set data自己处理数据引用,某些情况如果显示中的子组件需要数据更新，
		 * 请使用elements属性自行进行组件更新，不要给array赋值，可以提升效率*/
		public set array(value: Array<any>) {

			this.removeAllComponent();
			
			this.clearData();			
			this._array = value || [];			
			this.updateList();
		}
		/**
		 * 设置对应数据
		 */
		public get array(): Array<any> {

			return this._array;
		}

		public addItem( value:any , isUnshift:boolean = false ):void{

			if( this._array && this._array.indexOf(value) == -1 ){
				if( isUnshift ){
					this._array.unshift( value );
				}else{
					this._array.push( value );
				}	
				this.updateList();				
			}	
		}

		/**移除条目 */
		public removeItem( value:any ):void{

			let item:any = null;
			let index:number = this._array.indexOf( value );
			if( this._array && index != -1 ){				
				item = this._array.splice( index , 1 );
				this.updateList();
			}
			return item;
		}


		/**更新列表 */
		private updateList():void{

			if (this.list != null) {
				this.list.numItems = this._array.length;
				if( this.isAutoBottom ){
					this.scrollToBottom();
				}
			}
		}

		public addItemList( list:Array<any> ):void{

			if( this._array != null && list && list.length > 0 ){
				this._array = this._array.concat( list );								
			}
			this.updateList();
		}

		public replaceAll( list:Array<any> ):void{

			this._array = list;
			this.updateList();
		}

		public set numItems(value: number) {

			// this._array = [];
			this.clearData();
			this._array.length = value;
			this.updateList();
		}
		/**设置条目 */
		public get numItems(): number {

			return this.list.numItems;
		}

		/**
		 * 点击条目
		 */
		protected clickItem(e: fairygui.ItemEvent): void {
			this.selectItem(e.itemObject);
		}

		/**选择条目 */
		public selectItem(item: any): void {

			//复选可选择多个可重复选择
			if ((this.selectionMode == fairygui.ListSelectionMode.Single)
				&& this._lastclickItem
				&& item
				&& this._lastclickItem == item				
			) {
				return;
			}

			if (this._lastclickItem) {
				this._lastclickItem["select"] = false;
			}
			if (item) {
				item["select"] = true;
			}
			this._lastclickItem = item;

			if(item.data) this._selectIndex = this._array.indexOf( item.data );
			else this._selectIndex = parseInt(item.name);

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
		protected listItemRender(index: number, obj: fairygui.GObject): void {

			if (index == 0) {
				this._elements = [];
			}

			let item: any = obj;
			if (item && item["show"] != undefined) {
				item.show(this._array[index]);
			}
			if (this.elements.indexOf(item) == -1) {
				this.elements.push(item);
			}
			//列表渲染单个条目
			let evt: UIGameEvent = new UIGameEvent(UIGameEvent.EGLIST_RENDER);
			evt.data = { "index": index, "obj": obj };
			evt.thisObject = this._thisObject;
			this.dispatchEvent(evt);
			//列表渲染完成
			if (index == (this._array.length - 1)) {

				let completeEvt: UIGameEvent = new UIGameEvent(UIGameEvent.EGLIST_COMPLETE);
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

			if( egret.is( obj , "IComponent" ) ){
				this.AddComponent( <any>obj );
			}			
		}

		/**列表渲染所有条目  虚拟列表不可以这样取*/
		public get elements(): Array<any> {
			return this._elements;
			//转换项目索引为显示对象索引。
		}

		private _selectIndex:number = 0;

		public set selectedIndex(value: number) {

			if( this.isSingleSelect ){

				this.list.selectedIndex = value;//坑，有时取 this.list.selectedIndex有问题
				this._selectIndex = value;
				//clong 2019.2.12
				let item:any = value < this.list.numChildren ? this.list.getChildAt(value) : null;
				if( item instanceof fairui.UIEListRenderItem || item instanceof fairui.BaseButton){
					this.selectItem( item );
				}
			}else{
				this._selectIndex = -1;
			}			
		}
		/**当前选择条目索引 */
		public get selectedIndex(): number {

			return this._selectIndex;// this.list.selectedIndex;
		}

		/**当前选择数据 */
		public get selectedItem():any{

			return this._selectIndex < 0 ? null : this._array[ this._selectIndex ];
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
		 * 当前进度条滚动百分比
		 */
		public get progress():number{

			if( this.isHorizontal ){
				return this.list.scrollPane.percX;
			}else{
				return this.list.scrollPane.percY;
			}
		}

		// public set isHorizontal(value:boolean){
		// 	if( value ){
		// 		this.list.scrollPane.scr
		// 	}
		// }

		/**横向滚动条 */
		public get isHorizontal():boolean{

			return this.list.scrollPane ? this.list.scrollPane["_scrollType"] == fairygui.ScrollType.Horizontal : false;
		}

		/**
		 * 滑动到
		 * @param progress 0 ~ 1
		 */
		public sliderTo( progress:number , ani: boolean = true ):void{

			// this.list.scrollPane.scrollDown( progress , ani );
			if( this.list.scrollPane ){
				if( this.isHorizontal ){
					this.list.scrollPane.setPercX( progress , ani );
				}else{
					this.list.scrollPane.setPercY( progress , ani );
				}
			}			
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

		public getListComponet():fairygui.GList{

			return this.list;
		}

		/**
		 * 滑动到顶部
		 */
		public scrollToTop( ani:boolean = false ):void{

			this.list.scrollPane.scrollTop( ani );
		}

		/**
		 * 滚动到底部
		 */
		public scrollToBottom( ani:boolean = false ): void {

			this.list.scrollPane.scrollBottom( ani );
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

		public set enabled(val: boolean) {
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
		
		public set lineCount( value:number ){

			this.list.lineCount = value;
		}
		/**设置行数 */
		public get lineCount():number{

			return this.list.lineCount;
		}

		public set columnCount(value:number){

			this.list.columnCount = value;
		}
		/**设置列数 */
		public get columnCount():number{

			return this.list.columnCount;
		}

		public set visible(value: boolean) {

			this.list.visible = value;
		}

		public get visible(): boolean {

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

		public set scrollType( value:fairygui.ScrollType ){

			if( this.list.scrollPane ){
				this.list.scrollPane["_scrollType"] = value;
			}			
		}
		/**列表滚动模式 */
		public get scrollType():fairygui.ScrollType{

			return this.list.scrollPane ? this.list.scrollPane["_scrollType"] : false;
		}
		
		public set layout(value: fairygui.ListLayoutType) {

			this.list.layout = value;
		}

		public set align( value: fairygui.AlignType ){

			this.list.align = value;
		}
		/**左右布局 */
		public get align():fairygui.AlignType{

			return this.list.align;
		}

		public set verticalAlign( value: fairygui.VertAlignType ){

			this.list.verticalAlign = value;
		}
		/**上下 */
		public get verticalAlign(): fairygui.VertAlignType {
            return this.list.verticalAlign;
        }

		public set columnGap( value:number ){

			this.list.columnGap = value;
		}

		/**列距 */
		public get columnGap():number{

			return this.list.columnGap;
		}

		public set lineGap(gap:number){

			this.list.lineGap = gap;
		}

		/**行距 */
		public get lineGap():number{

			return this.list.lineGap;
		}
		
		public setSize( width:number , height:number , ignorePivot: boolean = false ):void{

			this.list.setSize( width , height , ignorePivot );
		}

		public superSetSize(width:number , height:number , ignorePivot: boolean = false ):void{

			super.setSize( width , height , ignorePivot);
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

		/**父容器 */
		public get parent():fairygui.GComponent{

			return this.list.parent;
		}

		public localToGlobal(ax?: number, ay?: number, resultPoint?: egret.Point): egret.Point {
			return this.list.localToGlobal(ax, ay, resultPoint);
		}

		/**清理数据 */
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
			if (this._btn_left) {
				this._btn_left.removeEventListener(egret.TouchEvent.TOUCH_TAP, flash.bind(this.touchLeftBtnHandler, this), this);
			}
			if (this._btn_right) {
				this._btn_right.removeEventListener(egret.TouchEvent.TOUCH_TAP, flash.bind(this.touchRightBtnHandler, this), this);
			}
			this._btn_left = null;
			this._btn_right = null;
			this._elements = [];
			this._array = [];
		}
		/**
		 * 释放
		 */
		public dispose(): void {

			super.dispose();

			this.clearData();

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
			this._elements = null;
			this._lastclickItem = null;
		}

		//------------------------------------------------
		/**
		 * 重置
		 */
		public Reset(): void {

			super.Reset();

			this.sliderTo(0,false);

			this.clearData();
		}

		/**
		 * 销毁，完全销毁对象和资源
		 */
		public Destroy(): void {

			super.Destroy();
		}
	}
}