module fairui {
	/**
	 * 容器基类
	 * @author cl 2019.1.29
	 */
	export class BaseSprite extends fairygui.GComponent implements IComponent {

		/**数据 */
		protected _data: any = null;
		/**是否变灰 */
		protected _isGray: boolean = false;
		/**
		 * 用传入的fairyui.GComponent转化为BaseSprite
		 */
		protected ower: fairygui.GComponent = null;

		protected _iconLoader:fairygui.GLoader;

		/**是否已初始化界面 */
		protected isInit: boolean;
		//组件缓存池
		protected m_componentDic: flash.Dictionary = null;
		//事件缓存池
		protected m_eventPool: EventPool = null;

		protected _currentState:string = "";

		protected _buttonController:fairygui.Controller;

		public constructor(comp: fairygui.GComponent = null) {

			super();

			this.ower = comp;

			this.m_eventPool = EventPool.create();
			this.m_componentDic = new flash.Dictionary();
		}

		protected constructExtension(buffer: fairygui.ByteBuffer): void {

			super.constructExtension(buffer);
			
        }

		public set icon( value:string ){

			if( this._iconLoader != null ){
				this._iconLoader.url = value;
			}
		}
		/**图标 */
		public get icon():string{

			return this._iconLoader ? this._iconLoader.url : "";
		}

		protected constructFromXML(xml: any): void {

			super.constructFromXML(xml);

			this.initController();
			
			FairyUtils.setVar(this, this);
		}

		/**初始化控制器 */
		protected initController():void{

			this._buttonController = this.getController("button");
			this._iconLoader = <fairygui.GLoader>this.getChild("icon");
		}

		public isInited(): boolean {
			return this.isInit;
		}

		public set currentState(value: string) {
			
			this._currentState = value;

			if( this._buttonController ){
				this._buttonController.selectedPage = value;
			}
		}
		/**当前状态 */
		public get currentState(): string {

			return this._currentState;
		}		

		/**
		 * 是否包含全局坐标点
		 * @param gx 全局X坐标
		 * @param gy 全局Y坐标
		 */
		public containsGlobalPoint(gx: number, gy: number): boolean {

			let lp: egret.Point = this.globalToLocal(gx, gy);
			let bounds: egret.Rectangle = new egret.Rectangle(0, 0, this.width, this.height);
			return bounds.contains(lp.x, lp.y);
		}

		public addChild(child: fairygui.GObject): fairygui.GObject {

			if (egret.is(child, "IComponent")) {
				this.addComponent(<any>child);
			}
			return super.addChild(child);
		}

		public addChildAt(child: fairygui.GObject, index: number): fairygui.GObject {

			if (egret.is(child, "IComponent")) {
				this.addComponent(<any>child);
			}
			return super.addChildAt(child, index);
		}

		/**
         * 获取条目
         * @param name 组件名字
         */
		public getElement(name: string, container: fairygui.GComponent = null): any {

			container = container || this;
			return container.getChild(name);
		}

		/**
		 * 是否包含某个对象
		 */
		public contains(child: fairygui.GObject): boolean {

			return this.getChildIndex(child) != -1;
		}

		/**
		 * 添加白鹭原生元件
		 * @param child 白鹭原生显示对象
		 */
		public addEgretChild(child: egret.DisplayObject): void {

			this._rootContainer.addChild(child);
		}
		/**添加白鹭原生元件
		 * @param child 白鹭原生显示对象
		 */
		public addEgretChildAt(child: egret.DisplayObject, index: number): void {
			this._rootContainer.addChildAt(child, index);
		}
		/**
		 * 移除白鹭原生元件
		 */
		public removeEgretChild(child: egret.DisplayObject): void {

			if (child && this._rootContainer.contains(child)) {
				this._rootContainer.removeChild(child);
			} else if (child && child.parent != null) {
				child.parent.removeChild(child);
			}
		}

		public set touchEnabled(value: boolean) {

			this._rootContainer.touchEnabled = value;
		}

		public get touchEnabled(): boolean {

			return this._rootContainer.touchEnabled;
		}

		public set touchChildren(value: boolean) {

			this._rootContainer.touchChildren = value;
		}

		public get touchChildren(): boolean {

			return this._rootContainer.touchChildren;
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
		public addGameListener(type: string, listener: Function, thisObject: any , target?: any) {
			if( this.m_eventPool != null ){
				this.m_eventPool.addListener( type , listener , target , thisObject );
			}
		}

		/**
		 * 移除事件监听
		 */
		public removeGameListener(type: string, listener: Function, thisObject: any , target?: any) {
			if( this.m_eventPool != null ){
				this.m_eventPool.removeListener( type , listener , target , thisObject );
			}
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

			if (this["_disposed"]){ //fairygui 中的私有属性
				return;
			}

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
