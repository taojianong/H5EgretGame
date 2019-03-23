module fairui {

	import ResPathUtil = com.utils.ResPathUtil;
	import GGroup = fairygui.GGroup;
	import GList = fairygui.GList;
	import GLoader = fairygui.GLoader;
	import ObjectUtils = com.utils.ObjectUtils;

    /**
     * 容器基类
     * @author cl 2018.3.17
     */
	export class BaseSprite extends fairygui.GComponent {
		/**事件列表 */
		protected _eventVec: Array<EventObj>;
		/**数据 */
		protected _data: any = null;
		/**是否变灰 */
		protected _isGray: boolean = false;

		/**
		 * 用传入的fairyui.GComponent转化为BaseSprite TODO cl 2018.4.9
		 */
		protected ower: fairygui.GComponent = null;

		public constructor(comp: fairygui.GComponent = null) {

			super();

			this.ower = comp;
		}

		protected constructFromXML(xml: any): void {

			super.constructFromXML(xml);

			FairyUtils.setVar(this, this);
		}

		/**
		* 设置FairyGui资源
		* @param pkgName 包名
		* @param resName 资源名
		*/
		public setFairySource(pkgName: string, resName: string, disObj: fairygui.GLoader = null): void {

			let url: string = fairygui.UIPackage.getItemURL(pkgName, resName);
			if (url) {
				if (url.indexOf("ui://") == 0) {
					FairyTextureUtils.disposeTexture(url, this);//如果这里释放了，不可能重新加载，所以不能释放，除非整包资源都被卸载了!
					disObj.texture = null;
				} else if (url) {
					LoaderManager.disposeTarget(url, this);
				}
			}

			this.setFairyUrl(url, disObj);
		}

		/**
         * 加载外部图片资源
         * @param url 资源地址 
         * @param disObj 显示图片对象
         * @param callback 回调方法
         * @param callbackParams 回调方法参数
         */
		public loadResByUrl(url: string, disObj: fairygui.GLoader = null, callback: Function = null, callbackParams: Array<any> = null): void {

			if (LoaderManager.getRes(url, disObj)) {
				disObj.texture = LoaderManager.getRes(url, disObj);
				return;
			}

			let thisObj: any = this;

			LoaderManager.loadImageRes(url, this, function loadComplete(texture: egret.Texture): void {
				if (disObj != null) {
					let texture: egret.Texture = LoaderManager.getRes(url, disObj);// texture;
					disObj.texture = texture;
					// disObj.width = texture.textureWidth;
					// disObj.height = texture.textureHeight;
				}
				if (callback != null) {
					callbackParams = callbackParams || [];
					callbackParams.unshift(texture);
					callback.apply(thisObj, callbackParams);
				}
			}, null);
		}

		/**
         * 获取面板图片等资源 cl 2018.3.15
         * @param subPackage 	子目录
         * @param name 			资源名字
         * @param suffix		后缀名
         */
		public getPanelResUrl(subPackage: string = "", name: string, suffix: string = ".png"): string {

			return ResPathUtil.getPanelRes(name, subPackage, suffix);
		}

        /**
         * 获取面板特效资源地址
         * @param packName      包名
         * @param effectName    特效名字a (a.xll)
         */
		public getMenuEffectUrl(packName: string, effectName: string): string {

			return AssetPathManager.getInstance().getMenuEffect(packName, effectName);
		}

        /**
         * 设置FairyGui资源地址
         * @param url FairyGui资源地址
         */
		public setFairyUrl(url: string, disObj: fairygui.GLoader = null): void {

			if (disObj != null && url) {
				disObj.texture = FairyTextureUtils.getTexture(url, this);
				disObj.width = disObj.texture.textureWidth;
				disObj.height = disObj.texture.textureHeight;
			} else {
				disObj.texture = null;
			}
		}

        /**
		 * 至于顶层 cl 2017.1.6
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
		 * 遍历所有子元件
		 */
		public ergodicChildren(parent: fairygui.GComponent = null, func: Function = null, funcParams: Array<any> = null, thisObject: any = null): void {

			thisObject = thisObject || this.ower || this;
			parent = parent || this.ower || this;
			if (parent.numChildren > 0) {
				let child: fairygui.GObject = null;
				for (let i: number = 0; i < parent.numChildren; i++) {
					child = parent.getChildAt(i);
					if (child != null) {
						if (func != null) {
							let args: Array<any> = funcParams || [];
							args.unshift(child);
							func.apply(thisObject, args);
						}
						if (child instanceof fairygui.GComponent) {
							this.ergodicChildren(<fairygui.GComponent>child, func, funcParams, thisObject);
						}
					}
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

		/**
		 * 至于底部 cl 2017.7.17
		 */
		public toBottom(): void {

			if (this.parent != null) {
				this.parent.setChildIndex(this, 0);
			}
		}

		/**
		 * json转成Array
		 * @param json
		 * @return 
		 * 
		 */
		public json2Array(json: string): Array<any> {
			return StringFormat.getArrayByJson(json);
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
				if (obj["type"] == type && (obj["listener"] == listener || listener == null)) {
					return true;
				}
			}
			return false;
		}

		/**
		* 事件构造函数
		* @param eventKey 事件Key
		* @param fun 			事件响应处理函数
		* @param source 	事件绑定的控件  非对象绑定传null
		*/
		public addPanelEventListener(eventKey: string, fun: Function, source: egret.EventDispatcher = null, thisObj: any = null): void {

			this._eventVec = this._eventVec || [];
			var eObj: EventObj = new EventObj(eventKey, fun, source, thisObj, null);
			this._eventVec.push(eObj);
		}

		/**
         * 注册面板事件
         */
		protected registerPanelEventListeners(): void {

			if (this._eventVec != null) {
				let eObj: EventObj = null;
				let i: number = 0;
				for (i = 0; i < this._eventVec.length; i++) {
					eObj = this._eventVec[i];
					if (eObj.source != null) {
						eObj.source.addEventListener(eObj.eventKey, eObj.fun, eObj.thisObj || this);
					} else {
						EventManager.addEventListener(eObj.eventKey, eObj.fun, eObj.thisObj || this);
					}
				}
			}
		}

		/**
		* 移除所有面板事件
		*/
		protected removePanelEventListeners(): void {

			if (this._eventVec != null) {
				let eObj: EventObj = null;
				let i: number = 0;
				for (i = 0; i < this._eventVec.length; i++) {
					eObj = this._eventVec[i];
					if (eObj.source != null) {
						eObj.source.removeEventListener(eObj.eventKey, eObj.fun, eObj.thisObj || this);
					} else {
						EventManager.removeEventListener(eObj.eventKey, eObj.fun, eObj.thisObj || this);
					}
				}
			}
		}

        /**
         * 获取条目
         * @param name 组件名字
         */
		public getElement(name: string): any {

			return this.getChild(name);
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

		public show(value: any = null): void {
			this._data = value;
			this.visible = true;
			this.registerPanelEventListeners();
		}

		public set data(value: any) {
			this._data = value;
		}
		/**获取数据*/
		public get data(): any {
			return this._data;
		}

		public hide(): void {
			this.visible = false;
			this.removePanelEventListeners();
		}

		public set isGray(value: boolean) {
			this._isGray = value;
			// ObjectUtils.gray(this, !value);
			this.grayed = value;
		}

		/**
         * 是否置灰
         */
		public get isGray(): boolean {

			return this._isGray;
		}

		public set opaque(value: boolean) {

			egret.superSetter(BaseSprite, this, "opaque", value);
		}
		/**是否可穿透空白区域 */
		public get opaque(): boolean {

			return egret.superGetter(BaseSprite, this, "opaque");
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

		/**清理根据name值自动生成的变量 */
		private clearObjectName(): void {

			let disObj: fairygui.GObject;
			for (let i: number = 0; i < this.numChildren; i++) {
				disObj = this.getChildAt(i);
				this[disObj.name] = null;
			}
		}

		/**
		 * 移除Group中所有元素
		 */
		public removeGroupElements( group:GGroup ):void{

			let _self:BaseSprite = this;
			if( group && group.parent != null ){
				let cnt:number = group.parent.numChildren;
				let i:number = 0;
				let child:fairygui.GObject;
				for (i = cnt - 1; i >=0; i--) {
                    child = group.parent.getChildAt(i);
					if(child == null ) continue;
                    if (child.group != group )
                        continue;
					if( child instanceof fairygui.GGroup ){
						//不要移除有子GGroup的Group
						//_self.removeGroupElements( child );
					}else{
						child.dispose();
						child = null;
					}					
                }
			}
		}

		/**替换字符串中的参数 */
		// protected getSubstitute(str: string, ...rest): string {
		// 	if (<any>!str) {
		// 		return "";
		// 	}
		// 	let len: number = rest.length;
		// 	let args: Array<any>;
		// 	if (len == 1 && flash.As3is(rest[0], Array)) {
		// 		args = rest[0];
		// 		len = args.length;
		// 	}
		// 	else {
		// 		args = rest;
		// 	}
		// 	for (let i: number = 0; i < len; i++) {
		// 		str = str.replace(new RegExp("\\{" + i + "\\}", "g"), args[i]);
		// 	}
		// 	return str;
		// }

		/**
		 * 清理数据
		 */
		public clear(): void {

			this.removeAllListeners();

			this.removePanelEventListeners();

			let disObj: fairygui.GObject;
			for (let i: number = 0; i < this.numChildren; i++) {
				disObj = this.getChildAt(i);
				if (disObj instanceof BaseSprite) {
					disObj.clear();
				} else if (disObj instanceof BaseButton) {
					disObj.clear();
				}
			}
		}

		public dispose(): void {
			this.clear();
			this.clearObjectName();
			super.dispose();
			this._data = null;
			this._eventVec = null;
			this.ower = null;
			this._listenerList = null;
		}
	}
}