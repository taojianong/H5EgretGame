module fairui {

	/**
	 * 横向滑动条
	 * @author clong 2019.2.12
	 */
	export class HSlider extends fairygui.GSlider implements IComponent {

		//组件缓存池
		protected m_componentPool: Array<IComponent> = null;
		//组件缓存池
		protected m_componentDic: Dictionary = null;
		//事件缓存池
		protected m_eventPool: EventPool = null;

		protected _min: number = 0;

		public constructor() {

			super();

			this.m_componentPool = new Array<IComponent>();
			this.m_eventPool = new EventPool();
			this.m_componentDic = new Dictionary();
		}

		protected constructExtension(buffer: fairygui.ByteBuffer): void {

			super.constructExtension(buffer);

			this.Init(null);
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

		//初始化
		public Init(param: any): void {

			this.InitUI();
			this.AddRootListener();
		}

		//初始化UI
		public InitUI(): void {

			// this.titleTxt = this.getChild("title").asTextField;
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

			this.AddGameListener(fairygui.StateChangeEvent.CHANGED, this.onSliderChangedHandler, this, this);
		}

		//移除监听事件函数（自己在AddRootListener函数里监听的事件要在这里自己主动移除）
		public RemoveRootListener() {
			if (this.m_componentPool != null) {
				var length: number = this.m_componentPool.length;
				for (var i: number = 0; i < length; i++) {
					this.m_componentPool[i].RemoveRootListener();
				}
			}
			this.RemoveGameListener(fairygui.StateChangeEvent.CHANGED, this.onSliderChangedHandler, this, this);
		}

		//全局监听事件函数（GameDispatcher.Inst派发的事件，关闭界面时会帮助移除事件）
		public AddGameListener(type: string, listener: Function, thisObject: any, target?: any) {
			this.m_eventPool.AddListenerInPool(type, listener, thisObject, target);
			if (target) {
				target.addEventListener(type, listener, thisObject);
			} else {
				GameDispatcher.Inst.addEventListener(type, listener, thisObject);
			}
		}

		public RemoveGameListener(type: string, listener: Function, thisObject: any, target?: any) {
			this.m_eventPool.RemoveListenerFromPool(type, listener, target);
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

			if (component.GetHashCode() in this.m_componentDic) {
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

			var pool: IComponent = this.m_componentDic[component.GetHashCode()];
			if (pool == null) return;

			delete this.m_componentDic[component.GetHashCode()];
			let index: number = this.m_componentPool.indexOf(component);
			if (index != -1) {
				this.m_componentPool.splice(index, 1);
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
			var length: number = this.m_componentPool.length;
			for (var i: number = 0; i < length; i++) {
				this.m_componentPool[i].Destroy();
			}
		}

		/**
		 * 销毁，完全销毁对象和资源
		 */
		public Destroy(): void {

			this.DestroyComponent();
			if (this.m_eventPool) {
				this.m_eventPool.Dispose();
			}
			this.m_componentPool = null;
			this.m_componentDic = null;
			this.m_eventPool = null;

			this.dispose();
		}

		public GetHashCode(): number {

			return this.hashCode;
		}
	}
}