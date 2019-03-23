module fairui {

	import UIContainer = fairygui.UIContainer;
	import GButton = fairygui.GButton;
	/**FairyUI管理器 cl 2018.3.5*/
	export class FairyUIManager {
		//底层
		public static bottomLayer: BaseSprite = null;
		//ui层
		public static uiLayer: BaseSprite = null;
		//顶层
		public static topLayer: BaseSprite = null;
		//主UI层
		public static mainuiLayer: BaseSprite = null;
		//弹框层
		public static alertLayer: BaseSprite = null;
		//tip层
		public static tipLayer: BaseSprite = null;
		//引导层
		public static guideLayer: BaseSprite = null;
		/**缓存所有打开的面板 */
		private static cachePanelMap: flash.Dictionary = new flash.Dictionary();

		public constructor() {

		}
		/**初始化*/
		public static init(container: egret.DisplayObjectContainer): void {

			container.addChild(fairygui.GRoot.inst.displayObject);
			//console.log("clientWidth: " + document.body.clientWidth + " clientHeight: " + document.body.clientHeight);
			//fairygui.GRoot.inst.setSize( document.body.clientWidth , document.body.clientHeight );
			this.bottomLayer = new BaseSprite();
			this.uiLayer = new BaseSprite();
			this.topLayer = new BaseSprite();
			this.mainuiLayer = new BaseSprite();
			this.alertLayer = new BaseSprite();
			this.tipLayer = new BaseSprite();
			this.guideLayer = new BaseSprite();

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
		}


		/**
		 * 根据面板Id打开对应的面板
		 * @param panelId 	面板id 参考
		 * @param data 		面板对应数据里
		 * @param x  		面板X坐标
		 * @param y 		面板Y坐标
		 * @param complete  完成事件
		 */
		public static openPanel(panelId: number, data: any = null, x: number = NaN, y: number = NaN, complete: Function = null): void {
			try {

				let panel: fairui.BasePanel = this.cachePanelMap.getItem(panelId);
				let panelInfo: any;
				// if (this.isLoading(panelId)) {
				// 	// Notice.showBottomMessage( "-----" + panelInfo.loadingTip + " panelId: " + panelId );
				// 	return;
				// }
				let container: BaseSprite = this.getPanelTypeLayer(panel.panelType);
				if (panel == null) {
					if (panelInfo) {
						panelInfo.callback = this.loadCompeteAndOpenPanel;
						panelInfo.callbackParams = [panelId, data, container, x, y, complete];
						if (panelInfo.res && !LoaderManager.hasLoadAllGroups(panelInfo.res)) {
							// App.log.debug("加载资源组: " + panelInfo.res);
							//打开加载界面
							this.openPanel(EnumPanelID.MAIN_LOADING, { "text": panelInfo.loadingTip, "panelId": panelId });
							//加载资源组
							LoaderManager.loadGroups(panelInfo.res, panelInfo.callback, panelInfo.callbackParams, panelInfo, this);
						} else {
							this.loadCompeteAndOpenPanel(panelId, data, container, x, y, complete);
						}

					}
					else
						Alert.show(App.lang.getLang("panel_error_1", panelId));//面板打开错误：面板ID[{0}]还未注册！
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
		}

		public static getPanelTypeLayer(type: number): BaseSprite {
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
		}
		/**加载完成并打开面板*/
		private static loadCompeteAndOpenPanel(panel: any, data: any, container: fairygui.GComponent = null, x: number = NaN, y: number = NaN, complete: Function = null): void {
			if (panel != EnumPanelID.MAIN_LOADING) {
				this.closePanel(EnumPanelID.MAIN_LOADING);//关闭加载界面
			}
			let panelid: number;
			if (egret.is(panel, "fairui.BasePanel")) {
				// panelid = PanelRegister.getPanelId(panel);
			} else {
				panelid = panel;
			}
			let pinfo: PanelInfo = null;// PanelRegister.getPanel(panelid);
			panel = this.cachePanelMap.getItem(panelid);
			//没有缓存则重新创建
			if (panel == null) {
				let cls: any = pinfo.className;
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
		}

		/**
		 * 关闭面板
		 * @param panel 			面板id|fairui.BasePanel
		 * @param isDispose 		是否释放资源
		 * @param disposeRegsiter	是否释放面板注册表
		 */
		public static closePanel(panel: any, isDispose: boolean = false, disposeRegsiter: boolean = false, sameLevel: boolean = false): void {
			try {
				let panelid: number;
				if (egret.is(panel, "fairui.BasePanel")) {
					// panelid = PanelRegister.getPanelId(panel);
				} else {
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
			} catch (e) {
				App.log.error("FairyUIManager.closePanel Id[" + panel + "] Error.", e);
			}
		}
		/**
		 * 根据面板类型关闭所有该类型的面板
		 * @param type 
		 */
		public static closeAllTypePanel(type: number) {
			let layer: BaseSprite = this.getPanelTypeLayer(type);
			let oldPenel: fairui.BasePanel;
			let len: number = layer.numChildren;
			for (let i: number = 0; i < len; i++) {
				if (!egret.is(layer.getChildAt(0), "fairygui.GGraph")) {
					oldPenel = <fairui.BasePanel>layer.getChildAt(0);
					// this.closePanel(oldPenel.panelInfo.panelid, oldPenel.panelInfo.canDispose, false, true);
				}
				else {
					layer.removeChildAt(0);
					//oldPenel.close();
				}
			}
		}
		/**
		 * 关闭所有面板
		 * @param isDispose 是否释放所有面板
		 */
		public static closeAllPanel(isDispose: boolean = false): void {
			for (let i: number = this.cachePanelMap.keys.length - 1; i >= 0; i--) {
				let panelid: number = this.cachePanelMap.keys[i];
				let pinfo: PanelInfo = null;// PanelRegister.getPanel(panelid);
				if (pinfo) {
					if (pinfo.canDispose) {
						this.closePanel(panelid, true);
					} else {
						this.closePanel(panelid, isDispose);
					}
				}
			}
		}
		/**
		 * 根据面板ID获取正在显示中的对应面板
		 * @param panel
		 */
		public static getShowPeanl(panelid: number): fairui.BasePanel {
			let panel: fairui.BasePanel = this.cachePanelMap.getItem(panelid);
			if (panel && panel.parent)
				return panel;
		}
		/**
		 * 根据面板ID获取对应面板
		 * @param id 面板ID 参考EnumPanelID
		 * @return PanelInfo
		 */
		public static getPanel(id: number): fairui.BasePanel {
			return this.cachePanelMap.getItem(id);
		}
		/**
		 * 是否正在显示某个面板
		 * @param panelid 面板ID 
		 */
		public static isShow(panelid: number): boolean {
			let panel: fairui.BasePanel = this.cachePanelMap.getItem(panelid);
			return panel && panel.parent != null && panel.visible;
		}

	}

}
