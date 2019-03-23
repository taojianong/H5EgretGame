module fairui {

    import ResPathUtil = com.utils.ResPathUtil;
    import ObjectUtils = com.utils.ObjectUtils;
    import GGroup = fairygui.GGroup;
    import GList = fairygui.GList;
    import GLoader = fairygui.GLoader;

    /**
     * 基类按钮
     * @author cl 2018.3.22
     */
    export class BaseButton extends fairygui.GButton {

        /**是否已经释放 */
        public isDispose: boolean = false;

        /**显示特效 */
        protected _flowEffect: AssetEffect;

        /**额外数据 */
        protected _tag: any;

        protected _enabled: boolean = true;
        /**是否初始化 */
        protected isInit: boolean = false;

        /**按钮绑定的type 用于注册小红点显示和隐藏的事件 */
        protected _noticeType: Array<number>;
        /** 按钮绑定的type的状态*/
        protected _noticeState: flash.Dictionary;

        public constructor() {

            super();
        }

        protected constructFromXML(xml: any): void {

            super.constructFromXML(xml);

            FairyUtils.setVar(this, this);

            this.init();

            this._noticeType = [];
            this._noticeState = new flash.Dictionary();
        }

        protected init(): void {

            this.isInit = true;
        }

        /**增加Type */
        public addNoticeType(value: number) {
            if (this._noticeType.indexOf(value) == -1) {
                this._noticeType.push(value);
            }
            this._noticeState.setItem(value, false);
        }

        /**移除Type */
        public removeNoticeType(value: number) {
            let i: number = this._noticeType.indexOf(value);
            if (i != -1) {
                this._noticeType.splice(i, 1);
            }
        }

        /**赋值type */
        public set noticeType(value: Array<number>) {
            this._noticeType = value;
            if (value == null || value.length <= 0) {
                this._noticeState = new flash.Dictionary();
            } else {
                for (let i: number = 0; i < value.length; i++) {
                    this._noticeState.setItem(value[i], false);
                }
            }      
        }
        /**用于监听红点显示类型 [EnumButtonDotType] */
        public get noticeType():Array<number>{

            return this._noticeType || [];
        }

        public set tag(value: any) {

            this._tag = value;
        }
        /**其他数据 */
        public get tag(): any {

            return this._tag;
        }

        public show(value: any): void {

        }

        public hide(): void {


        }

        /**
		 * 流光特效 
		 * @return 
		 * 
		 */
        public get flowEffect(): AssetEffect {

            return this._flowEffect;
        }

        public set touchable(value: boolean) {

            egret.superSetter(BaseButton, this, "touchable", value);
        }
        /**触摸 */
        public get touchable(): boolean {

            return egret.superGetter(BaseButton, this, "touchable");
        }

        public set enabled(value: boolean) {

            this._enabled = value;
            this.touchable = value;
            this.grayed = !value
            // ObjectUtils.gray(this, !value);
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
		 * 遍历所有子元件
		 */
        public ergodicChildren(parent: fairygui.GComponent = null, func: Function = null, funcParams: Array<any> = null, thisObject: any = null): void {

            thisObject = thisObject || this;
            parent = parent || this;
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
         * 获取面板图片等资源 cl 2018.3.15
         * @param subPackage 	子目录
         * @param name 			资源名字
         * @param suffix		后缀名
         */
        public getPanelResUrl(subPackage: string = "", name: string, suffix: string = ".png"): string {

            return ResPathUtil.getPanelRes(name, subPackage, suffix);
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
         * 设置FairyGui资源地址
         * @param url FairyGui资源地址
         */
        public setFairyUrl(url: string, disObj: fairygui.GLoader = null): void {

            if (disObj != null && url) {
                disObj.texture = FairyTextureUtils.getTexture(url, this);
            } else {
                disObj.texture = null;
            }
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
		 * 是否包含全局坐标点
		 * @param gx 全局X坐标
		 * @param gy 全局Y坐标
		 */
        public containsGlobalPoint(gx: number, gy: number): boolean {

            let lp: egret.Point = this.globalToLocal(gx, gy);
            let bounds: egret.Rectangle = new egret.Rectangle(0, 0, this.width, this.height);
            return bounds.contains(lp.x, lp.y);
        }

		/**
		 * 清理数据
		 */
        public clear(): void {

            this.removeAllListeners();
        }

        public dispose(): void {
            // EventManager.removeEventListener( EventType.ShowOrHideButtonDot, this.showOrHideDot, this);

            this.clear();
            let child: any;
            while (this.numChildren > 0) {
                child = this.removeChildAt(0);
                //是否对应资源
                if (egret.is(child, "fairygui.GLoader")) {
                    LoaderManager.disposeTarget(child.url, child);
                }
                (<fairygui.GComponent>child).dispose();
                child = null;
            }

            this.removeFromParent();
            super.dispose();

            this._listenerList = null;
            this._flowEffect = null;
            this._tag = null;

            this.isDispose = true;
            this._noticeState = null;
            this._noticeType = null;
        }
    }
}