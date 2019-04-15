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
		protected m_componentPool: Array<IComponent> = null;
		//组件缓存池
		protected m_componentDic: Dictionary = null;
		//事件缓存池
		protected m_eventPool: EventPool = null;

		protected _currentState:string = "";

		protected _buttonController:fairygui.Controller;

		public constructor(comp: fairygui.GComponent = null) {

			super();

			this.ower = comp;

			this.m_componentPool = new Array<IComponent>();
			this.m_eventPool = new EventPool();
			this.m_componentDic = new Dictionary();
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

		public IsInited(): boolean {
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
				this.AddComponent(<any>child);
			}
			return super.addChild(child);
		}

		public addChildAt(child: fairygui.GObject, index: number): fairygui.GObject {

			if (egret.is(child, "IComponent")) {
				this.AddComponent(<any>child);
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

		//初始化
		public Init(param: any): void {

		}

		//初始化UI
		public InitUI(): void {

		}

		//初始传递参数
		public InitData(param: any): void {

		}

		public InitComplete(): boolean {

			return true;
		}

		//增加监听事件函数
		public AddRootListener() {
			if (this.m_componentPool != null) {
				var length: number = this.m_componentPool.length;
				for (var i: number = 0; i < length; i++) {
					let obj: any = this.m_componentPool[i];
					this.m_componentPool[i].AddRootListener();
				}
			}
		}

		//移除监听事件函数（自己在AddRootListener函数里监听的事件要在这里自己主动移除）
		public RemoveRootListener() {
			if (this.m_componentPool != null) {
				var length: number = this.m_componentPool.length;
				for (var i: number = 0; i < length; i++) {
					this.m_componentPool[i].RemoveRootListener();
				}
			}
		}

		//全局监听事件函数（GameDispatcher.Inst派发的事件，关闭界面时会帮助移除事件）
		public AddGameListener(type: string, listener: Function, thisObject: any, target?: any) {
			if( this.m_eventPool.hasEventListener( type , listener , target ) ){
				return;
			}
			this.m_eventPool.AddListenerInPool(type, listener, thisObject, target);
			if (target) {
				target.addEventListener(type, listener, thisObject  );//, target instanceof egret.Stage
			} else {
				GameDispatcher.Inst.addEventListener(type, listener, thisObject);
			}
		}

		public RemoveGameListener(type: string, listener: Function, thisObject: any, target?: any) {
			if(this.m_eventPool){
				this.m_eventPool.RemoveListenerFromPool(type, listener, target);
			}
			if (target) {
				target.removeEventListener(type, listener, thisObject);
			} else {
				GameDispatcher.Inst.removeEventListener(type, listener, thisObject);
			}
		}

		/**
		 * 添加组件
		 */
		public AddComponent(component: IComponent): any {

			if ( component == null || component.GetHashCode() in this.m_componentDic) {
				//console.log("已有相同组件");
				return component;
			}

			this.m_componentPool.push(component);
			this.m_componentDic[component.GetHashCode()] = component;
			return component;
		}

		/**
		 * 移除组件
		 */
		public removeComponent(component: IComponent): void {

			if( component == null ) return;
			var pool: IComponent = this.m_componentDic[component.GetHashCode()];
			if (pool == null) return;

			delete this.m_componentDic[component.GetHashCode()];
			let index: number = this.m_componentPool.indexOf(component);
			if (index != -1) {
				this.m_componentPool.splice(index, 1);
			}
		}

		/**
		 * 移除所有组件
		 */
		public removeAllComponent():void{

			while( this.m_componentPool && this.m_componentPool.length > 0 ){
				let comp:IComponent = this.m_componentPool.shift();
				if( comp ){
					delete this.m_componentDic[ comp.GetHashCode() ];
				}
			}
		}

		/**
		 * 重置
		 */
		public Reset(): void {

			if (this.m_eventPool != null) {
				this.m_eventPool.ClearListenerFromPool(GameDispatcher.Inst);
			}
			if (this.m_componentPool != null) {
				var length: number = this.m_componentPool.length;
				for (var i: number = 0; i < length; i++) {
					this.m_componentPool[i].Reset();
				}
			}
		}

		protected DestroyComponent(): void {
			if( this.m_componentPool ){
				var length: number = this.m_componentPool.length;
				for (var i: number = 0; i < length; i++) {
					this.m_componentPool[i].Destroy();
				}
			}			
		}

		/**
		 * 销毁，完全销毁对象和资源
		 */
		public Destroy(): void {

			this.dispose();
		}

		public dispose():void{

			super.dispose();

			this.DestroyComponent();
			if (this.m_eventPool) {
				this.m_eventPool.Dispose();
			}
			this.m_componentPool = null;
			this.m_componentDic = null;
			this.m_eventPool = null;
		}

		public GetHashCode(): number {

			return this.hashCode;
		}
	}
}
