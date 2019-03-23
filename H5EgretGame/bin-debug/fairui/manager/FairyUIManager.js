var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var fairui;
(function (fairui) {
    /**FairyUI管理器 cl 2018.3.5*/
    var FairyUIManager = (function () {
        function FairyUIManager() {
        }
        /**初始化*/
        FairyUIManager.init = function (container) {
            container.addChild(fairygui.GRoot.inst.displayObject);
            //console.log("clientWidth: " + document.body.clientWidth + " clientHeight: " + document.body.clientHeight);
            //fairygui.GRoot.inst.setSize( document.body.clientWidth , document.body.clientHeight );
            this.bottomLayer = new fairui.BaseSprite();
            this.uiLayer = new fairui.BaseSprite();
            this.topLayer = new fairui.BaseSprite();
            this.mainuiLayer = new fairui.BaseSprite();
            this.alertLayer = new fairui.BaseSprite();
            this.tipLayer = new fairui.BaseSprite();
            this.guideLayer = new fairui.BaseSprite();
            fairygui.GRoot.inst.addChild(this.bottomLayer);
            fairygui.GRoot.inst.addChild(this.uiLayer);
            fairygui.GRoot.inst.addChild(this.mainuiLayer);
            fairygui.GRoot.inst.addChild(this.topLayer);
            fairygui.GRoot.inst.addChild(this.alertLayer);
            fairygui.GRoot.inst.addChild(this.tipLayer);
            fairygui.GRoot.inst.addChild(this.guideLayer);
            //重写fairygui UIContainer hitTest 方法
            // UIContainer.prototype.$hitTest = function (stageX: number, stageY: number): DisplayObject {
            // 	let ret: egret.DisplayObject = egret.DisplayObjectContainer.prototype.$hitTest.apply(this, [stageX, stageY]);
            // 	if (ret == this) {
            // 		if (!this.touchEnabled || this._hitArea == null)
            // 			return null;
            // 	}
            // 	return ret;
            // }
            fairygui.UIPackage.addPackage("common");
            fairui.PanelRegister.registerClass("common", "LoaderButton", fairui.LoaderButton);
            fairui.PanelRegister.registerClass("common", "BaseSprite", fairui.BaseSprite);
            fairui.PanelRegister.registerClass("common", "BaseTextField", fairui.BaseTextField);
            fairui.PanelRegister.registerClass("common", "EButton", fairui.EButton);
            fairui.PanelRegister.registerClass("common", "ExternalImage", fairui.EImage);
            fairui.PanelRegister.registerClass("common", "ProgressBar", fairui.ProgressBar);
            fairui.PanelRegister.registerClass("common", "PageButton", fairui.PageButton);
            fairui.PanelRegister.registerClass("common", "ECheckBox", fairui.ECheckbox);
            fairui.PanelRegister.registerClass("common", "ELinkButton", fairui.ELinkButton);
        };
        /**
         * 根据面板Id打开对应的面板
         * @param panelId 	面板id 参考
         * @param data 		面板对应数据里
         * @param x  		面板X坐标
         * @param y 		面板Y坐标
         * @param complete  完成事件
         */
        FairyUIManager.openPanel = function (panelId, data, x, y, complete) {
            if (data === void 0) { data = null; }
            if (x === void 0) { x = NaN; }
            if (y === void 0) { y = NaN; }
            if (complete === void 0) { complete = null; }
            try {
                var panel = this.cachePanelMap.getItem(panelId);
                var panelInfo = void 0;
                // if (this.isLoading(panelId)) {
                // 	// Notice.showBottomMessage( "-----" + panelInfo.loadingTip + " panelId: " + panelId );
                // 	return;
                // }
                var container = this.getPanelTypeLayer(panel.panelType);
                if (panel == null) {
                    if (panelInfo) {
                        panelInfo.callback = this.loadCompeteAndOpenPanel;
                        panelInfo.callbackParams = [panelId, data, container, x, y, complete];
                        if (panelInfo.res && !fairui.LoaderManager.hasLoadAllGroups(panelInfo.res)) {
                            // App.log.debug("加载资源组: " + panelInfo.res);
                            //打开加载界面
                            this.openPanel(EnumPanelID.MAIN_LOADING, { "text": panelInfo.loadingTip, "panelId": panelId });
                            //加载资源组
                            fairui.LoaderManager.loadGroups(panelInfo.res, panelInfo.callback, panelInfo.callbackParams, panelInfo, this);
                        }
                        else {
                            this.loadCompeteAndOpenPanel(panelId, data, container, x, y, complete);
                        }
                    }
                    else
                        fairui.Alert.show(App.lang.getLang("panel_error_1", panelId)); //面板打开错误：面板ID[{0}]还未注册！
                }
                else if (panel.parent == null) {
                    this.loadCompeteAndOpenPanel(panelId, data, container, x, y, complete);
                }
                else {
                    // panelInfo.callbackParams = [panelId, data, container, x, y, complete];
                    // if (panelInfo.callback != null) {
                    // 	panelInfo.callback.apply(this, panelInfo.callbackParams);
                    // }
                }
            }
            catch (e) {
                App.log.error("FairyUIManager.openPanel Id[" + panelId + "] Error.", e);
            }
        };
        FairyUIManager.getPanelTypeLayer = function (type) {
            switch (type) {
                case EnumPanel.TYPE_WINDOW1:
                    return this.uiLayer;
                case EnumPanel.TYPE_WINDOW2:
                    return this.topLayer;
                case EnumPanel.TYPE_BOTTOM:
                    return this.bottomLayer;
                case EnumPanel.TYPE_ALERT:
                    return this.alertLayer;
                case EnumPanel.TYPE_TIPS:
                    return this.tipLayer;
                case EnumPanel.TYPE_MAIUI:
                    return this.mainuiLayer;
                case EnumPanel.TYPE_Guide:
                    return this.guideLayer;
                default:
                    return null;
            }
        };
        /**加载完成并打开面板*/
        FairyUIManager.loadCompeteAndOpenPanel = function (panel, data, container, x, y, complete) {
            if (container === void 0) { container = null; }
            if (x === void 0) { x = NaN; }
            if (y === void 0) { y = NaN; }
            if (complete === void 0) { complete = null; }
            if (panel != EnumPanelID.MAIN_LOADING) {
                this.closePanel(EnumPanelID.MAIN_LOADING); //关闭加载界面
            }
            var panelid;
            if (egret.is(panel, "fairui.BasePanel")) {
                // panelid = PanelRegister.getPanelId(panel);
            }
            else {
                panelid = panel;
            }
            var pinfo = null; // PanelRegister.getPanel(panelid);
            panel = this.cachePanelMap.getItem(panelid);
            //没有缓存则重新创建
            if (panel == null) {
                var cls = pinfo.className;
                panel = new cls();
                panel["panelInfo"] = pinfo;
                //可释放的面板才加入到缓存面板中
                this.cachePanelMap.setItem(panelid, panel);
            }
            switch (pinfo.panelType) {
                case EnumPanel.TYPE_BOTTOM:
                    this.closeAllTypePanel(EnumPanel.TYPE_BOTTOM);
                    this.closeAllTypePanel(EnumPanel.TYPE_WINDOW1);
                    this.closeAllTypePanel(EnumPanel.TYPE_WINDOW2);
                    // EventManager.dispatchEvent(fairui.PanelEvent.SHOW_MAINUI, pinfo.panelid);
                    break;
                case EnumPanel.TYPE_WINDOW1:
                    this.closeAllTypePanel(EnumPanel.TYPE_WINDOW1);
                    this.closeAllTypePanel(EnumPanel.TYPE_WINDOW2);
                    // EventManager.dispatchEvent(fairui.PanelEvent.HIDE_MAINUI, pinfo.panelid);
                    break;
            }
            container.addChild(panel);
            if (isNaN(x) && isNaN(y)) {
                if (pinfo.panelType == EnumPanel.TYPE_BOTTOM) {
                    panel.x = App.stageWidth - panel.width >> 1;
                    panel.y = App.stageHeight - panel.height;
                }
                else {
                    panel.x = App.stageWidth - panel.width >> 1;
                    panel.y = App.stageHeight - panel.height >> 1;
                }
            }
            else {
                panel.x = x;
                panel.y = y;
            }
            panel.show(data);
            //cl 2018.7.10
            if (complete != null) {
                complete();
            }
        };
        /**
         * 关闭面板
         * @param panel 			面板id|fairui.BasePanel
         * @param isDispose 		是否释放资源
         * @param disposeRegsiter	是否释放面板注册表
         */
        FairyUIManager.closePanel = function (panel, isDispose, disposeRegsiter, sameLevel) {
            if (isDispose === void 0) { isDispose = false; }
            if (disposeRegsiter === void 0) { disposeRegsiter = false; }
            if (sameLevel === void 0) { sameLevel = false; }
            try {
                var panelid = void 0;
                if (egret.is(panel, "fairui.BasePanel")) {
                    // panelid = PanelRegister.getPanelId(panel);
                }
                else {
                    panelid = panel;
                }
                if (panel) {
                    if (panel.parent != null) {
                        panel.parent.removeChild(panel);
                        panel.hide();
                    }
                    if (isDispose) {
                        panel.dispose();
                        panel = null;
                        this.cachePanelMap.delItem(panelid);
                    }
                }
            }
            catch (e) {
                App.log.error("FairyUIManager.closePanel Id[" + panel + "] Error.", e);
            }
        };
        /**
         * 根据面板类型关闭所有该类型的面板
         * @param type
         */
        FairyUIManager.closeAllTypePanel = function (type) {
            var layer = this.getPanelTypeLayer(type);
            var oldPenel;
            var len = layer.numChildren;
            for (var i = 0; i < len; i++) {
                if (!egret.is(layer.getChildAt(0), "fairygui.GGraph")) {
                    oldPenel = layer.getChildAt(0);
                    // this.closePanel(oldPenel.panelInfo.panelid, oldPenel.panelInfo.canDispose, false, true);
                }
                else {
                    layer.removeChildAt(0);
                    //oldPenel.close();
                }
            }
        };
        /**
         * 关闭所有面板
         * @param isDispose 是否释放所有面板
         */
        FairyUIManager.closeAllPanel = function (isDispose) {
            if (isDispose === void 0) { isDispose = false; }
            for (var i = this.cachePanelMap.keys.length - 1; i >= 0; i--) {
                var panelid = this.cachePanelMap.keys[i];
                var pinfo = null; // PanelRegister.getPanel(panelid);
                if (pinfo) {
                    if (pinfo.canDispose) {
                        this.closePanel(panelid, true);
                    }
                    else {
                        this.closePanel(panelid, isDispose);
                    }
                }
            }
        };
        /**
         * 根据面板ID获取正在显示中的对应面板
         * @param panel
         */
        FairyUIManager.getShowPeanl = function (panelid) {
            var panel = this.cachePanelMap.getItem(panelid);
            if (panel && panel.parent)
                return panel;
        };
        /**
         * 根据面板ID获取对应面板
         * @param id 面板ID 参考EnumPanelID
         * @return PanelInfo
         */
        FairyUIManager.getPanel = function (id) {
            return this.cachePanelMap.getItem(id);
        };
        /**
         * 是否正在显示某个面板
         * @param panelid 面板ID
         */
        FairyUIManager.isShow = function (panelid) {
            var panel = this.cachePanelMap.getItem(panelid);
            return panel && panel.parent != null && panel.visible;
        };
        //底层
        FairyUIManager.bottomLayer = null;
        //ui层
        FairyUIManager.uiLayer = null;
        //顶层
        FairyUIManager.topLayer = null;
        //主UI层
        FairyUIManager.mainuiLayer = null;
        //弹框层
        FairyUIManager.alertLayer = null;
        //tip层
        FairyUIManager.tipLayer = null;
        //引导层
        FairyUIManager.guideLayer = null;
        /**缓存所有打开的面板 */
        FairyUIManager.cachePanelMap = new flash.Dictionary();
        return FairyUIManager;
    }());
    fairui.FairyUIManager = FairyUIManager;
    __reflect(FairyUIManager.prototype, "fairui.FairyUIManager");
})(fairui || (fairui = {}));
//# sourceMappingURL=FairyUIManager.js.map