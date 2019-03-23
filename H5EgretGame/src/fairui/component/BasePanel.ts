module fairui {

    import GTextField = fairygui.GTextField;
    import GGroup = fairygui.GGroup;
    import GList = fairygui.GList;
    import GLoader = fairygui.GLoader;
    import GComponent = fairygui.GComponent;
    import GButton = fairygui.GButton;
    import ResPathUtil = com.utils.ResPathUtil;
    import superGetter = egret.superGetter;

    /**
     * 面板基类
     * @author cl 2018.3.17
     */
    export class BasePanel extends BaseSprite {

        protected view: fairygui.GComponent = null;
        /**背景 */
        protected bg: fairygui.GImage | fairygui.GLoader | ELoader;
        /**标题栏 */
        protected titleBar: TitleBar;
        /**关闭按钮:取这个名字的按钮,会根据屏幕大小调整位置 */
        protected btn_close: fairygui.GButton | EButton;
        /**关闭按钮:取这个名字的关闭按钮,不会调整位置 */
        protected btn_close_2: fairygui.GButton | EButton;
        /**背景遮罩 */
        public static msk: fairygui.GGraph;
        /**是否需要调整closeBtn位置*/
        private needAdjustClose: boolean = false;
        /**传 false 表示不绑定点击遮罩关闭面板事件 */
        protected openTapMask: boolean;


        /**包名 */
        protected _pkgName: string = "";
        /**类名 */
        protected _resName: string = "";

        /**
         * 面板基类
         * @param pkgName 包名
         * @param resName 对应面板名字
         */
        public constructor(pkgName: string = "", resName: string = "") {

            super();

            if (pkgName && !fairygui.UIPackage.getById(pkgName)) {
                fairygui.UIPackage.addPackage(pkgName);
            }
            this._pkgName = pkgName;
            this._resName = resName;

            this.init();
        }

        protected constructFromXML(xml: any): void {

            super.constructFromXML(xml);
        }

        protected init(): void {
            this.openTapMask = true;

            if (this._pkgName && this._resName) {
                let obj: any = fairygui.UIPackage.createObject(this._pkgName, this._resName);
                this.view = obj.asCom;
                this.addChild(this.view);
            }

            FairyUtils.setVar(this.view, this);

            //关闭按钮
            if (this.titleBar != null) {
                this.btn_close = this.titleBar.btn_close;
            } else if (this.btn_close != null) {
                this.addPanelEventListener(egret.TouchEvent.TOUCH_TAP, this.closeHandler, this.btn_close);
            }

            if (this.btn_close_2 != null) {
                this.addPanelEventListener(egret.TouchEvent.TOUCH_TAP, this.closeHandler, this.btn_close_2);
            }

            this.addPanelEventListener(GameEvent.STGAE_RESIZE, this.resize);

            this.resize();
        }

        /**
		 * 关闭面板ID
		 */
        // public getClosePanelId(bean: Q_automaticExpandBean): number {

        //     let jsonArr: Array<Object> = bean && bean.q_conditions ? com.utils.StringFormat.getArrayByJson(bean.q_conditions) : null;
        //     let obj: Object = null;
        //     let _id: number = 0;
        //     if (jsonArr && jsonArr.length > 0) {
        //         for (obj of jsonArr) {
        //             if (obj.hasOwnProperty("closepanel_id")) {
        //                 _id = obj["closepanel_id"];
        //                 break;
        //             }
        //         }
        //     }
        //     return _id;
        // }

        /**
         * 设置背景资源 resource\res\image\panel\路径下
         * @param pkgName 包名
         * @param resname 资源名
         * @param suffix  后缀名
         */
        public setBgSource(pkgName: string, resname: string, suffix: string = ".jpg", loader: any = null): void {

            let _self: any = this;
            loader = loader || this.bg;
            let index: number = resname.lastIndexOf(".");
            suffix = index != -1 ? resname.substring(index) : suffix;
            resname = index != -1 ? resname.substring(0, index) : resname;
            if (loader instanceof ELoader) {
                loader.url = this.getPanelResUrl(pkgName, resname, suffix);
                if (!loader.hasEventListener(egret.Event.COMPLETE)) {
                    loader.addEventListener(egret.Event.COMPLETE, loadBgComplete, this);
                }
            } else if (loader instanceof fairygui.GLoader) {
                this.loadResByUrl(this.getPanelResUrl(pkgName, resname, suffix), loader, loadBgComplete);
            }

            function loadBgComplete(e: any = null): void {

                if (e instanceof egret.Event) {
                    loader.removeEventListener(egret.Event.COMPLETE, loadBgComplete, this);
                }
                loader.x = (_self.width - loader.width) * 0.5;
                loader.y = (_self.height - loader.height) * 0.5;
            }
        }

        /**
         * 设置标题皮肤
         * @author pkgName 包名
         * @author resName 资源名
         */
        public setTitleSkin(pkgName: string, resName: string): void {

            if (this.titleBar != null) {
                this.titleBar.setTitleSkin(pkgName, resName);
            }
        }

        /**
         * 获取界面子元件
         */
        public getViewChild(name: string): any {

            return this.view ? this.view.getChild(name) : null;
        }

        /**
        * 渲染列表条目方法
        * @param index  对应条目索引
        * @param obj    渲染对象
        */
        protected renderListItem(index: number, obj: fairygui.GObject): void {

        }

        /**
         * 显示关闭按钮
         */
        public set showCloseBtn(value: boolean) {

            if (value) {
                if (this.btn_close == null) {
                    this.btn_close = fairygui.UIPackage.createObject("common", "btn_close04").asButton;
                    this.adjustCloseBtnPos();
                    this.needAdjustClose = true;
                }
                if (this.btn_close.parent == null) {
                    this.addChild(this.btn_close);
                }
                this.addPanelEventListener(egret.TouchEvent.TOUCH_END, this.closeHandler, this.btn_close);

            } else if (this.btn_close != null) {
                if (this.btn_close.parent != null) {
                    this.btn_close.parent.removeChild(this.btn_close);
                }
            }
        }

        /**
		 * 调整关闭按钮位置
		 */
        protected adjustCloseBtnPos(): void {
            if (this.btn_close != null) {
                this.btn_close.x = this.width - this.btn_close.width - 15;
                this.btn_close.y = 16;
            }
        }

        /**关闭事件 */
        protected closeHandler(): void {

            this.close();
        }

        /**
         * 关闭面板
         */
        public close(isHideGuide: boolean = true): void {

            FairyUIManager.closePanel(this, this.canDispose);
        }

        /**
         * 界面是否可释放
         */
        private get canDispose(): boolean {

            return true;
        }

        /**点击Mask层,关闭面板 */
        protected tapMask(e: egret.TouchEvent): void {

            this.close();
        }

        /**
         * 显示
         */
        public show(data: any): void {
            this.visible = true;
            super.show(data);//这句话一定要放在this.visible = true之后执行,不然面板事件注册不了          
            //显示遮罩
            this.showMask();
        }

        /**
         * 隐藏
         */
        public hide(): void {
            super.hide();
            if (this.visible) {
                this.clear();
            }
            this.visible = false;
            this.hideMask();
        }

        /**界面类型 */
        public get panelType(): number {

            return EnumPanel.TYPE_WINDOW1;
        }

        /**
         * 显示遮罩
         */
        public showMask(): void {
            if (BasePanel.msk) {
                BasePanel.msk.removeEventListener(egret.TouchEvent.TOUCH_TAP, flash.bind(this.tapMask, this), this);
            }
            if (
                (this.panelType == EnumPanel.TYPE_ALERT || this.panelType == EnumPanel.TYPE_WINDOW2)
                || (this.data && this.data.hasOwnProperty("showMask") && this.data["showMask"])
            ) {
                if (this.data && this.data.hasOwnProperty("showMask") && this.data["showMask"] == false) {
                    this.hideMask();
                    return;
                }
                if (!BasePanel.msk) {
                    BasePanel.msk = new fairygui.GGraph();
                    BasePanel.msk.graphics.clear();
                    BasePanel.msk.graphics.beginFill(0x000000, 0.8);
                    BasePanel.msk.graphics.drawRect(0, 0, App.stageWidth, App.stageHeight);
                    BasePanel.msk.graphics.endFill();
                }
                BasePanel.msk.touchable = true;

                if (this.openTapMask && !BasePanel.msk.hasEventListener(egret.TouchEvent.TOUCH_TAP)) {
                    if (this.parent != null && BasePanel.msk.parent == null) {
                        if (this.parent.numChildren > 1) {
                            this.parent.addChildAt(BasePanel.msk, this.parent.numChildren - 1);
                        } else {
                            this.parent.addChildAt(BasePanel.msk, 0);
                        }
                    }
                    BasePanel.msk.addEventListener(egret.TouchEvent.TOUCH_TAP, flash.bind(this.tapMask, this), this);
                } else {
                    BasePanel.msk.removeEventListener(egret.TouchEvent.TOUCH_TAP, flash.bind(this.tapMask, this), this);
                }
            } else {
                this.hideMask();
            }
        }

        /**
         * 隐藏遮罩
         */
        public hideMask(): void {
            if (BasePanel.msk && this.openTapMask) {
                BasePanel.msk.removeFromParent();
                BasePanel.msk.removeEventListener(egret.TouchEvent.TOUCH_TAP, flash.bind(this.tapMask, this), this);
            }
            //这里不能重复绘制，在runtime上会出现涨内存现象    
            // if (this.msk != null) {
            //     this.msk.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.tapMask, this);
            //     this.msk.graphics.clear();
            //     // this.msk.dispose();
            //     this.msk = null;
            // }
        }

        /**
         * 转化为对应的类
         */
        // public toClass(): any {

        //     let clsName: string = egret.getQualifiedClassName(this);
        //     return egret.getDefinitionByName(clsName);
        // }

        // private _panelInfo: PanelInfo = null;
        /**面板信息*/
        // public set panelInfo(value: PanelInfo) {
        //     this._panelInfo = value;
        // }
        // /**面板信息*/
        // public get panelInfo(): PanelInfo {
        //     return this._panelInfo;
        // }

        public get width(): number {

            return this.bg ? this.bg.width : 1136;
        }

        public get height(): number {

            return this.bg ? this.bg.height : 640;
        }

        /**
         * 自适应
         */
        public resize(): void {
            // if (this.panelInfo && this.panelInfo.panelType == com.enums.EnumPanel.TYPE_BOTTOM) {
            //     this.x = App.stageWidth - this.width >> 1;
            //     this.y = App.stageHeight - this.height;
            // }
            // else {
            //     this.x = (App.stageWidth - this.width) * 0.5;
            //     this.y = (App.stageHeight - this.height) * 0.5 + 1;
            //     //this.showMask();
            //     if (this.btn_close != null && this.needAdjustClose) {
            //         this.btn_close.x = this.x < 0 ? App.stageWidth - this.btn_close.width - this.x : 1035;
            //         this.btn_close.y = this.y < 0 ? -this.y : 0;
            //     }
            // }
            // if (BasePanel.msk && BasePanel.msk.parent) {
            //     BasePanel.msk.setScale(App.stageWidth / 1136, App.stageHeight / 640);
            // }
        }

        /**
         * 清理数据
         */
        public clear(): void {

            this.hideMask();

            super.clear();
        }

        /**
         * 释放资源,不允许外部直接调用这个方法
         */
        public dispose(): void {
            //this.close();

            let comp: any;
            let child: any;
            while (this.view && this.view.numChildren > 0) {
                child = this.view.removeChildAt(0);
                if (child.name && child.name.indexOf("tab_") == 0 && child instanceof GGroup) {
                    comp = <ETab>this[child.name];
                    if (comp != null) {
                        // tab.dispose();
                    }
                }
                if (child.name && child.name.indexOf("eglist_") == 0 && child instanceof fairygui.GList) {
                    comp = <EGList>this[child.name];
                    if (comp != null) {
                        (<EGList>comp).dispose();
                        comp = null;
                    }
                }
                if (child.name && child.name.indexOf("eloader_") == 0 && child instanceof fairygui.GLoader) {
                    comp = <ELoader>this[child.name];
                    if (comp != null) {
                        (<ELoader>comp).dispose();
                        comp = null;
                    }
                } else if (egret.is(child, "fairygui.GLoader")) { //是否对应资源                
                    LoaderManager.disposeTarget(child.url, child);
                }

                if (child != null) {
                    (<fairygui.GComponent>child).dispose();
                }
                child = null;
            }

            this.removeChildren(0, this.numChildren, true);
            if (this.parent != null) {
                this.parent.removeChild(this, true);
            }

            super.dispose();

            this.hideMask();

            this.view = null;
            this._data = null;
            // this._panelInfo = null;
        }
    }
}