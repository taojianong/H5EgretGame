module fairui {

    /**
     * 基类按钮
     * @author cl 2019.1.29
     */
    export class BaseButton extends fairygui.GButton implements IComponent {

        /**是否已经释放 */
        public isDispose: boolean = false;

        /**额外数据 */
        protected __data: any = null;

        protected _enabled: boolean = true;
        /**是否初始化 */
        protected isInit: boolean = false;

        protected _currentState: string = "";
        protected _btnController: fairygui.Controller;

        //组件缓存池
        protected m_componentPool: Array<IComponent> = null;
        //组件缓存池
        protected m_componentDic: Dictionary = null;
        //事件缓存池
        protected m_eventPool: EventPool = null;

        public constructor() {

            super();

            this.m_componentPool = new Array<IComponent>();
            this.m_eventPool = new EventPool();
            this.m_componentDic = new Dictionary();
        }

        protected constructFromXML(xml: any): void {

            super.constructFromXML(xml);

            FairyUtils.setVar(this, this);

            this._btnController = this["_buttonController"];

            this.Init(null);
        }

        public IsInited(): boolean {
            return this.isInit;
        }

        public set currentState(value: string) {

            this._currentState = value;

            if (this._btnController) {
                this._btnController.selectedPage = value;
            }
        }
        /**当前状态 */
        public get currentState(): string {

            return this._currentState;
        }

        public show(value: any): void {

            this.__data = value;
        }

        public hide(): void {

            this.__data = null;
        }

        public set enabled(value: boolean) {

            this._enabled = value;
            this.touchable = value;
            if( this._iconObject ){
                this._iconObject.grayed = !value;
            }
        }
        /**
         * 是否可点击,不可点击置灰
         */
        public get enabled(): boolean {

            return this._enabled;
        }

        /**
		 * 添加白鹭原生元件
		 * @param child 白鹭原生显示对象
		 */
        public addEgretChild(child: egret.DisplayObject): void {

            this._rootContainer.addChild(child);
        }

        /**
		 * 至于顶层
		 */
        public toTop(): void {
            if (this.parent != null) {
                if (this.parent.numChildren > 0) {
                    this.parent.setChildIndex(this, this.parent.numChildren - 1);
                } else {
                    this.parent.setChildIndex(this, 0);
                }
            }
        }

        /**
         * 改变元件深度索引
         * @param index 索引
         */
        public indexTo(index: number): void {

            if (this.parent != null) {
                if (index > (this.parent.numChildren - 1)) {
                    index = this.parent.numChildren - 1;
                } else if (index < 0) {
                    index = 0;
                }
                this.parent.setChildIndex(this, index);
            }
        }

        /**在父容器中的索引 */
        public getIndex():number{

            return this.parent ? this.parent.getChildIndex( this ) : -1;
        } 

        /**
		 * 至于底部 
		 */
        public toBottom(): void {

            if (this.parent != null) {
                this.parent.setChildIndex(this, 0);
            }
        }

        protected _listenerList: Array<any> = []; //监听事件列表

		/******************************************移除所有监听*********************************************
		 * 重载的 addEventListener方法，在添加事件侦听时将其存在一个数组中，以便记录所有已添加的事件侦听
		 */
        public addEventListener(type: string, listener: Function, thisObject: any): void {

            var obj: Object = new Object();
            obj["type"] = type;
            obj["listener"] = listener;
            obj["thisObject"] = thisObject;
            this._listenerList = this._listenerList || [];
            this._listenerList.push(obj);
            super.addEventListener(type, listener, thisObject);
        }

        public removeEventListener(type: string, listener: Function, thisObject: any): void {

            var obj: Object;
            if (this._listenerList != null) {
                this._listenerList.forEach((obj) => {
                    if (obj.type == type && obj.listener == listener) {
                        this._listenerList.splice(this._listenerList.indexOf(obj), 1);
                        return;
                    }
                });
            }
            super.removeEventListener(type, listener, thisObject);
        }

		/**
		 * 自我毁灭，删除所有事件侦听器以及从父显示对象中移除，等待垃圾回收
		 */
        public removeAllListeners(): void {
            var obj: Object;
            while (this._listenerList && this._listenerList.length > 0) {
                obj = this._listenerList.shift();
                if (obj) {
                    this.removeEventListener(obj["type"], obj["listener"], obj["thisObject"]);
                }
            }
        }

        /**
		 * 监听事件列表
		 *
		 **/
        public get listenerList(): Array<any> {

            return this._listenerList;
        }

		/**
		 * 是否有对应事件的监听事件
		 * @param	type      事件类型
		 * @param	listener  事件方法
		 * @return
		 */
        public hasListenerOf(type: string, listener: Function = null): boolean {

            var obj: Object;
            for (obj of this._listenerList) {
                if (obj && obj["type"] == type && (obj["listener"] == listener || listener == null)) {
                    return true;
                }
            }
            return false;
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

        /**
         * 设置FairyGui资源
         * @param pkgName 包名
         * @param resName 资源名
         */
        public setFairySource(pkgName: string, resName: string, disObj: fairygui.GLoader = null): void {

            disObj = disObj || <fairygui.GLoader>this._iconObject;
            let url: string = fairygui.UIPackage.getItemURL(pkgName, resName);
            this.setFairyUrl(url, disObj);
        }

        /**
         * 设置FairyGui资源地址
         * @param url FairyGui资源地址
         */
        public setFairyUrl(url: string, disObj: fairygui.GLoader = null): void {

            if (disObj != null) {
                disObj.texture = url ? FairyTextureUtils.getTexture(url) : null;
            }
        }

        /**
		 * 是否包含全局坐标点
		 * @param gx 全局X坐标
		 * @param gy 全局Y坐标
		 */
        public containsGlobalPoint(gx: number, gy: number): boolean {

            let lp: egret.Point = this.globalToLocal(gx, gy);
            let bounds: egret.Rectangle = new egret.Rectangle(0, 0, this.width, this.height);
            if( this.pivotAsAnchor ){//是否中心点为锚点
                bounds.x = -this.width * 0.5;
                bounds.y = -this.height * 0.5;
            }
            return bounds.contains(lp.x, lp.y);
        }

        /**
         * 像素穿透
         */
        public set pixelHitTest(val: boolean) {
            if( this._iconObject ){
                let loader: fairygui.GLoader = this._iconObject.asLoader;
                if (loader.content instanceof egret.Bitmap) {
                    loader.content.pixelHitTest = val;
                }
            }            
        }

		/**
		 * 清理数据
		 */
        public clear(): void {

            this.removeAllListeners();
        }

        public dispose(): void {

            this.clear();

            super.dispose();

            this._listenerList = null;
            this.__data = null;
            if (this._iconObject) {
                this._iconObject.dispose();
            }
            this._iconObject = null;
            this.isDispose = true;
        }

        //--------------------------------------

        //初始化
        public Init(param: any): void {

            this.isInit = true;
            this.InitUI();
            this.InitData(param);
            this.AddRootListener();
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
            this.addEventListener(egret.TouchEvent.TOUCH_END, this.onBtnEnd, this);
            this.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onBtnReleaseOutsidEnd, this);
        }

        //移除监听事件函数（自己在AddRootListener函数里监听的事件要在这里自己主动移除）
        public RemoveRootListener() {
            if (this.m_componentPool != null) {
                var length: number = this.m_componentPool.length;
                for (var i: number = 0; i < length; i++) {
                    this.m_componentPool[i].RemoveRootListener();
                }
            }
            this.removeEventListener(egret.TouchEvent.TOUCH_END, this.onBtnEnd, this);
            this.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onBtnReleaseOutsidEnd, this);
        }

        //释放后也触发点击事件 2019.3.15
        private onBtnReleaseOutsidEnd( e:egret.TouchEvent ):void{

            this.dispatchEvent( new egret.TouchEvent( egret.TouchEvent.TOUCH_TAP ) );
            this.dispatchEvent( new egret.TouchEvent( egret.TouchEvent.TOUCH_END ) );
        }

        private onBtnEnd(event: egret.TouchEvent): void {
            
            sound.SoundManager.Inst.playSound(10010);
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