var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var fairui;
(function (fairui) {
    /**
     * FairyUI管理器
     * @author clong 2019.2.20
     * */
    var FairyUIManager = (function () {
        function FairyUIManager() {
        }
        /**初始化*/
        FairyUIManager.init = function (container) {
            if (!this.parent) {
                FairyUIManager.mainLayer = new fairui.BaseSprite();
                FairyUIManager.windowLayer = new fairui.BaseSprite();
                FairyUIManager.promptLayer = new fairui.BaseSprite();
                FairyUIManager.topLayer = new fairui.BaseSprite();
                FairyUIManager.alertLayer = new fairui.BaseSprite();
                FairyUIManager.tipLayer = new fairui.BaseSprite();
                FairyUIManager.guideLayer = new fairui.BaseSprite();
            }
            else {
                this.parent.removeChild(fairygui.GRoot.inst.displayObject);
            }
            container.addChild(fairygui.GRoot.inst.displayObject);
            this.parent = container;
            fairygui.GRoot.inst.addChild(FairyUIManager.mainLayer);
            fairygui.GRoot.inst.addChild(FairyUIManager.windowLayer);
            fairygui.GRoot.inst.addChild(FairyUIManager.promptLayer);
            fairygui.GRoot.inst.addChild(FairyUIManager.alertLayer);
            fairygui.GRoot.inst.addChild(FairyUIManager.topLayer);
            fairygui.GRoot.inst.addChild(FairyUIManager.tipLayer);
            fairygui.GRoot.inst.addChild(FairyUIManager.guideLayer);
            //重写fairygui UIContainer hitTest 方法
            fairygui.UIContainer.prototype.$hitTest = function (stageX, stageY) {
                var ret = egret.DisplayObjectContainer.prototype.$hitTest.apply(this, [stageX, stageY]);
                if (ret == this) {
                    if (!this.touchEnabled || this._hitArea == null)
                        return null;
                }
                return ret;
            };
        };
        /**
         * 初始化common资源
         */
        FairyUIManager.initCommon = function () {
            fairygui.UIConfig.defaultFont = Global.defaultFont;
            fairygui.UIConfig.defaultComboBoxVisibleItemCount = 5; //下拉条默认显示条数为5
            fairygui.UIPackage.addPackage("common");
            fairui.PanelRegister.registerClass("common", "BaseSprite", fairui.BaseSprite);
            fairui.PanelRegister.registerClass("common", "BaseTextField", fairui.BaseTextField);
            fairui.PanelRegister.registerClass("common", "EButton", fairui.EButton);
            fairui.PanelRegister.registerClass("common", "ECButton", fairui.ECButton);
            fairui.PanelRegister.registerClass("common", "ESButton", fairui.ESButton);
            fairui.PanelRegister.registerClass("common", "ESCButton", fairui.ESCButton);
            fairui.PanelRegister.registerClass("common", "UIBitmapIcon", fairui.UIBitmapIcon);
            fairui.PanelRegister.registerClass("common", "UIBitmapIcon2", fairui.UIBitmapIcon2);
            fairui.PanelRegister.registerClass("common", "UIDropDownList", fairui.UIDropDownList);
            fairui.PanelRegister.registerClass("common", "UILabel", fairui.UILabel);
            fairui.PanelRegister.registerClass("common", "HSlider", fairui.HSlider);
            fairui.PanelRegister.registerClass("common", "HEGList", fairui.HEGList);
            fairui.PanelRegister.registerClass("common", "ProgressBar", fairui.ProgressBar);
            fairui.PanelRegister.registerClass("common", "ECheckBox", fairui.ECheckbox);
            fairui.PanelRegister.registerClass("common", "ExpStar", fairui.ExpStar);
            fairui.PanelRegister.registerClass("common", "UITextInput", fairui.UITextInput);
            fairui.PanelRegister.registerClass("common", "UINumberItemComp", fairui.UINumberItemComp);
            fairui.PanelRegister.registerClass("common", "LabButton", fairui.LabButton);
            fairui.PanelRegister.registerClass("common", "ReverseMask", fairui.ReverseMask);
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
                var panelInfo = fairui.PanelRegister.getPanel(panelId);
                if (panelInfo == null) {
                    Global.log.error("没有对应面板 panelId:" + panelId);
                    if (complete != null)
                        complete();
                    return;
                }
                if (this.isLoading(panelId)) {
                    // Notice.showBottomMessage( "-----" + panelInfo.loadingTip + " panelId: " + panelId );
                    return;
                }
                var container = this.getPanelTypeLayer(panelInfo.panelType);
                if (panel == null) {
                    if (panelInfo) {
                        panelInfo.callback = this.loadCompeteAndOpenPanel;
                        panelInfo.callbackParams = [panelId, data, container, x, y, complete];
                        if (panelInfo.res && !fairui.LoaderManager.hasLoadAllGroups(panelInfo.res)) {
                            // Global.log.debug("加载资源组: " + panelInfo.res);
                            //打开加载界面
                            this.openPanel(EnumPanelID.MAIN_LOADING, { "text": panelInfo.loadingTip, "panelId": panelId });
                            //加载资源组
                            fairui.LoaderManager.loadGroups(panelInfo.res, panelInfo.callback, this, panelInfo.callbackParams);
                        }
                        else {
                            this.loadCompeteAndOpenPanel(panelId, data, container, x, y, complete);
                        }
                    }
                    else {
                        fairui.Alert.show(Global.lang.getLang("panel_error_1", panelId)); //面板打开错误：面板ID[{0}]还未注册！
                    }
                }
                else if (panel.parent == null) {
                    this.loadCompeteAndOpenPanel(panelId, data, container, x, y, complete);
                }
                else {
                    panelInfo.callbackParams = [panelId, data, container, x, y, complete];
                    if (panelInfo.callback != null) {
                        panelInfo.callback.apply(this, panelInfo.callbackParams);
                    }
                }
            }
            catch (e) {
                Global.log.error("FairyUIManager.openPanel Id[" + panelId + "] Error.", e);
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
            if (panel instanceof fairui.BasePanel) {
                panelid = fairui.PanelRegister.getPanelId(panel);
            }
            else {
                panelid = panel;
            }
            var pinfo = fairui.PanelRegister.getPanel(panelid);
            panel = this.cachePanelMap.getItem(panelid);
            //没有缓存则重新创建
            if (panel == null) {
                var cls = pinfo.className;
                panel = new cls();
                panel["panelInfo"] = pinfo;
                //可释放的面板才加入到缓存面板中
                this.cachePanelMap.setItem(panelid, panel);
            }
            container.addChild(panel);
            if (isNaN(x) && isNaN(y)) {
                if (pinfo.panelType == EnumPanel.TYPE_BOTTOM) {
                    panel.x = Global.stageWidth - panel.width >> 1;
                    panel.y = Global.stageHeight - panel.height;
                }
                else {
                    panel.x = Global.stageWidth - panel.width >> 1;
                    panel.y = Global.stageHeight - panel.height >> 1;
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
        FairyUIManager.getPanelTypeLayer = function (type) {
            switch (type) {
                case EnumPanel.TYPE_BOTTOM:
                    return this.mainLayer;
                case EnumPanel.TYPE_WINDOW1:
                    return this.windowLayer;
                case EnumPanel.TYPE_WINDOW2:
                    return this.topLayer;
                case EnumPanel.TYPE_ALERT:
                    return this.alertLayer;
                case EnumPanel.TYPE_TIPS:
                    return this.tipLayer;
                case EnumPanel.TYPE_MAIUI:
                    return this.windowLayer;
                case EnumPanel.TYPE_Guide:
                    return this.guideLayer;
                default:
                    return null;
            }
        };
        /**
         * 是否正在加载某个界面
         * @param panelId 面板ID
         */
        FairyUIManager.isLoading = function (panelId) {
            // let panel: LoadingUI = <LoadingUI>this.getPanel(EnumPanelID.MAIN_LOADING);
            // if (panel != null && panel.parent != null && panel.data && panel.data.hasOwnProperty("panelId") && panel.data["panelId"] == panelId) {
            // 	return true;
            // }
            return false;
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
                    panelid = fairui.PanelRegister.getPanelId(panel);
                }
                else {
                    panelid = panel;
                    panel = this.cachePanelMap.getItem(panelid);
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
                if (disposeRegsiter) {
                    fairui.PanelRegister.removeRegister(panelid);
                }
            }
            catch (e) {
                Global.log.error("FairyUIManager.closePanel Id[" + panel + "] Error.", e);
            }
        };
        /**缓存所有打开的面板 */
        // private static cachePanelMap: Dictionary = new Dictionary();	
        /**装载 */
        FairyUIManager.parent = null;
        /**tip层 */
        FairyUIManager.tipLayer = null;
        /**引导层 */
        FairyUIManager.guideLayer = null;
        //-----------------------------------------------------------		
        /**缓存所有打开的面板 */
        FairyUIManager.cachePanelMap = new flash.Dictionary();
        return FairyUIManager;
    }());
    fairui.FairyUIManager = FairyUIManager;
    __reflect(FairyUIManager.prototype, "fairui.FairyUIManager");
})(fairui || (fairui = {}));
//# sourceMappingURL=FairyUIManager.js.map