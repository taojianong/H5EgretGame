module fairui {

	/**
	 * 横向滑动条
	 * @author clong 2019.2.12
	 */
	export class HSlider extends fairygui.GSlider implements IComponent {

		//组件缓存池
		protected m_componentDic: flash.Dictionary = null;
		//事件缓存池
		protected m_eventPool: EventPool = null;

		protected _min: number = 0;

		public constructor() {

			super();

			this.m_eventPool = new EventPool();
			this.m_componentDic = new flash.Dictionary();
		}

		protected constructExtension(buffer: fairygui.ByteBuffer): void {

			super.constructExtension(buffer);

			this.init(null);
		}

		protected constructFromXML(xml: any): void {

			super.constructFromXML(xml);
		}

		public IsInited(): boolean {
			return true;
		}

		/**
		 * 滑动改变
		 */
		private onSliderChangedHandler(e: fairygui.StateChangeEvent): void {


		}

		public set min(value: number) {

			this._min = value;
		}
		/**最小值 */
		public get min(): number {

			return this._min;
		}

		//-------------------------------------------------------

		/**
		 * 增加监听事件函数
		 */
		public addAllListener():void {

			if( this.m_eventPool != null ){
				this.m_eventPool.relistenerAll();
				this.m_componentDic.forEach( function( key:any , data:any ):void{
					if( egret.is( data , "IComponent" ) ){
						(<IComponent>data).addAllListener();
					}
				} , this );
			}			
		}

		/**
		 * 移除监听事件函数
		 */
		public removeAllListener():void {

			if( this.m_eventPool != null ){
				this.m_eventPool.removeAllListener();
				this.m_componentDic.forEach( function( key:any , data:any ):void{
					if( egret.is( data , "IComponent" ) ){
						(<IComponent>data).removeAllListener();
					}
				} , this );
			}			
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

		//初始化
		public init(param: any): void {

			this.initUI();
			this.addAllListener();
		}

		//初始化UI
		public initUI(): void {

			// this.titleTxt = this.getChild("title").asTextField;
		}

		/**
		 * 添加组件
		 */
		public addComponent(component: IComponent): any {

			if( component ){
				let hashCode:number = component.getHashCode();
				this.m_componentDic.setItem( hashCode , component );
			}
			return component;
		}

		/**
		 * 移除组件
		 */
		public removeComponent(component: IComponent): void {

			if( component != null ){
				let hashCode:number = component.getHashCode();
				this.m_componentDic.delItem( hashCode  );
			}
		}

		/**
		 * 移除所有组件
		 */
		public removeAllComponent():void{

			this.m_componentDic.reset();
		}

		/**
		 * 获取唯一hashCode
		 */
		public getHashCode(): number {

			return this.hashCode;
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
		 * 销毁，完全销毁对象和资源
		 */
		public dispose(): void {

			this.destroyComponent();
			if (this.m_eventPool) {
				this.m_eventPool.dispose();
			}
			this.m_componentDic = null;
			this.m_eventPool = null;

			this.dispose();
		}

		public GetHashCode(): number {

			return this.hashCode;
		}
	}
}