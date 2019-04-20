module fairui {

	/**
	 * 下拉列表
	 * @author cl 2018.11.2
	 */
	export class UIDropDownList extends fairygui.GComboBox implements IComponent {

		private _dataList: Array<any> = null;
		//选择事件
		private _selectHandler: utils.Handler;

		//组件缓存池
		protected m_componentDic: flash.Dictionary = null;
		//事件缓存池
		protected m_eventPool: EventPool = null;

		public constructor() {

			super();

			this.m_eventPool = new EventPool();
			this.m_componentDic = new flash.Dictionary();
		}

		protected constructExtension(buffer: fairygui.ByteBuffer): void {

			super.constructExtension(buffer);

			this.init( null );
		}

		protected constructFromXML(xml: any): void {

			super.constructFromXML(xml);
		}

		public IsInited(): boolean {
			return true;
		}

		public setup_afterAdd(buffer: fairygui.ByteBuffer, beginPos: number): void{

			super.setup_afterAdd( buffer , beginPos );

			this.visibleItemCount = fairygui.UIConfig.defaultComboBoxVisibleItemCount;
		}

		public set array(value: Array<any>) {

			this._dataList = value;			
			let strs: Array<string> = [];
			if (this._dataList != null) {
				for (let i: number = 0; i < this._dataList.length; i++) {
					let o: any = this._dataList[i];
					if ( egret.is(o,"string") ) {
						strs.push( o );
					}else if( o.hasOwnProperty("label") ){
						strs.push(o["label"]);
					}
				}
			}
			this.items = strs;
		}
		/**
		 * 数据列表
		 * {"label":"全部","index":0}
		 */
		public get array(): Array<any> {

			return this._dataList;
		}

		public set selectHandler(value: utils.Handler) {

			this._selectHandler = value;
			value.isImmediatelyGc = false;
		}

		public get selectHandler(): utils.Handler {

			return this._selectHandler;
		}

		/**
		 * 选择列表条目
		 */
		private onItemTapHandler(e:fairygui.StateChangeEvent): void {

			let index:number = this.selectedIndex;
			let item:any = this._dataList[ index ];
			if (item) {
				if (this._selectHandler != null) {
					this._selectHandler.executeWith([item]);
				}
			}
		}		

		//-------------------------------------------------------

		//初始化
		public init(param: any): void {
            
            this.initUI();

            this.addAllListener();
		}

        //初始化UI
		public initUI(): void {

		}

		//增加监听事件函数
		public addAllListener():void {
			this.m_componentDic.forEach( function( key:any , data:any ):void{
				if( egret.is( data , "IComponent" ) ){
					(<IComponent>data).addAllListener();
				}
			} , this );
		}

		//移除监听事件函数
		public removeAllListener():void {
			this.m_componentDic.forEach( function( key:any , data:any ):void{
				if( egret.is( data , "IComponent" ) ){
					(<IComponent>data).removeAllListener();
				}
			} , this );
		}

		/**
		 * 添加事件监听
		 */
		public addGameListener(type: string, listener: Function, thisObject: any, target?: any) {
			if( this.m_eventPool != null ){
				this.m_eventPool.addListener( type , listener , target , thisObject );
			}
		}

		/**
		 * 移除事件监听
		 */
		public removeGameListener(type: string, listener: Function, thisObject: any, target?: any) {
			if( this.m_eventPool != null ){
				this.m_eventPool.removeListener( type , listener , target , thisObject );
			}
		}

		/**
		 * 添加组件
		 */
		public addComponent(component: IComponent): any {

			if ( component == null || this.m_componentDic.hasOwnProperty( component.getHashCode() ) ) {
				//console.log("已有相同组件");
				return component;
			}

			this.m_componentDic.setItem( component.getHashCode(), component );
			return component;
		}

		/**
		 * 移除组件
		 */
		public removeComponent(component: IComponent): void {

			if( component == null ) return;
			var pool: IComponent = this.m_componentDic[component.getHashCode()];
			if (pool == null) return;

			delete this.m_componentDic[component.getHashCode()];
		}

		/**
		 * 移除所有组件
		 */
		public removeAllComponent():void{

			this.m_componentDic.reset();
		}

		/**
		 * 重置界面
		 */
		public clear(): void {

			if (this.m_eventPool != null) {
				this.m_eventPool.removeAllListener();
			}
			this.m_componentDic.forEach( function( key:any , data:any ):void{
				if( egret.is( data , "IComponent" ) ){
					(<IComponent>data).clear();
				}
			} , this );
		}

		protected destroyComponent(): void {
			this.m_componentDic.forEach( function( key:any , data:any ):void{
				if( egret.is( data , "IComponent" ) ){
					(<IComponent>data).dispose();
				}
			} , this );		
		}

		/**
		 * 获取唯一hashCode
		 */
		public getHashCode(): number {

			return this.hashCode;
		}

        public get isDisposed(): boolean {
            return this["_disposed"];
        }

		/**
		 * 释放所有资源
		 */
		public dispose():void{

            if (this["_disposed"])
                return;

			super.dispose();

			this.clear();

			if (this.m_eventPool) {
				this.m_eventPool.dispose();
			}
			this.m_componentDic = null;
			this.m_eventPool = null;
		}

	}
}