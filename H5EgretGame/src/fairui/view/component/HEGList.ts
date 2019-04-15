module fairui {

	/**
	 * 横向滚动列表
	 * @author clong 2019.3.22
	 */
	export class HEGList extends BaseSprite{

		private list:fairygui.GList;

		protected _array: Array<any>;
		protected _elements: Array<fairygui.GObject> = null;
		protected _thisObject: any;

		/**分页组件 */
		protected currentpage: number = 0;
		/**向左按钮 */
		protected _btn_left: EButton | fairygui.GButton;
		/**向右按钮 */
		protected _btn_right: EButton | fairygui.GButton;

		protected _selectedPage: Function = null;//分页选中某一页触发的事件

		public constructor() {

			super();
		}

		protected constructFromXML(xml: any): void {

			super.constructFromXML(xml);

			this.InitUI();
		}

		public InitUI():void{

			super.InitUI();

			this.callbackThisObj = this;
			this.list.callbackThisObj = this;
			this.list.itemRenderer = this.listItemRender;
			// this.list.addEventListener(fairygui.ItemEvent.CLICK, this.clickItem, this);
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
			
			if( egret.is( obj , "IComponent" ) ){
				this.AddComponent( <any>obj );
			}			
		}

		/**列表渲染所有条目  虚拟列表不可以这样取*/
		public get elements(): Array<any> {
			return this._elements;
			//转换项目索引为显示对象索引。
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

		/**更新列表 */
		private updateList():void{

			if (this.list != null) {
				this.list.numItems = this._array.length;
			}
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
        * 上一页
        */
		private touchLeftBtnHandler(e: egret.TouchEvent): void {
			if (this.currentpage > 0) {
				let index: number = this.currentpage - 1;
				this.toPage(index);
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
		 * 滚动到
		 * @params index
		 * @params ani
		 * @params setFirst
		 */
		public scrollToView(index: number, ani: boolean = false, setFirst: boolean = false): void {

			this.list.scrollToView(index, ani, setFirst);
		}

		public set columnGap( value:number ){

			this.list.columnGap = value;
		}

		/**列距 */
		public get columnGap():number{

			return this.list.columnGap;
		}

		/**是否溢出 */
		public get isOverflow():boolean{

			let len:number = this.elements.length;
			let w:number = 0;
			for( let i=0;i<len;i++ ){
				w += this.elements[i] ? this.elements[i].width : 0;
			}
			w += len > 0 ? (len - 1) * this.columnGap : 0;
			return w > this.list.width;
		}

		public scrollLeft(ratio?: number, ani?: boolean):void{

			if( this.list && this.list.scrollPane ){
				this.list.scrollPane.scrollLeft(ratio,ani);
			}
		}

		public scrollRight(ratio?: number, ani?: boolean):void{

			if( this.list && this.list.scrollPane ){
				this.list.scrollPane.scrollRight(ratio,ani);
			}
		}

		/**
		 * 释放
		 */
		public dispose(): void {

			super.dispose();

			this.clearData();

			if (this.list != null) {
				// this.list.removeEventListener(fairygui.ItemEvent.CLICK, this.clickItem, this);
				// if (this.list.scrollPane) {
				// 	this.list.scrollPane.removeEventListener(fairygui.ScrollPane.SCROLL, flash.bind(this.scrollListPage, this), this.list.scrollPane);
				// }
				this.list.dispose();
				this.list = null;
			}
			this._btn_left = null;
			this._btn_right = null;
			this._thisObject = null;
			this._selectedPage = null;
			this._array = null;			
			this._elements = null;
		}

		public Destory():void{

			super.Destroy();
		}
	}
}