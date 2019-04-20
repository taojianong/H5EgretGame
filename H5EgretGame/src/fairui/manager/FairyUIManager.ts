module fairui {

	/**
	 * FairyUI管理器 
	 * @author clong 2019.2.20
	 * */
	export class FairyUIManager {

		/**缓存所有打开的面板 */
		// private static cachePanelMap: Dictionary = new Dictionary();	

		/**装载 */
		private static parent:egret.DisplayObjectContainer = null;	

		/**主界面层 */
		public static mainLayer: fairui.BaseSprite;  
		/**界面层 */  
		public static windowLayer: fairui.BaseSprite;
		/** */
		public static promptLayer: fairui.BaseSprite;
		/**弹框层 */
		public static alertLayer: fairui.BaseSprite;
		/**顶层 */
		public static topLayer: fairui.BaseSprite;
		/**tip层 */
		public static tipLayer: fairui.BaseSprite = null;
		/**引导层 */
		public static guideLayer: fairui.BaseSprite = null;

		public constructor() {

		}

		/**初始化*/
		public static init(container: egret.DisplayObjectContainer): void {
			
			if( !this.parent ){				
				FairyUIManager.mainLayer = new BaseSprite();
				FairyUIManager.windowLayer = new BaseSprite();
				FairyUIManager.promptLayer = new BaseSprite();
				FairyUIManager.topLayer = new BaseSprite();
				FairyUIManager.alertLayer = new BaseSprite();
				FairyUIManager.tipLayer = new BaseSprite();
				FairyUIManager.guideLayer = new BaseSprite();
			}else{
				this.parent.removeChild( fairygui.GRoot.inst.displayObject );
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
			fairygui.UIContainer.prototype.$hitTest = function (stageX: number, stageY: number):egret.DisplayObject {
				let ret: egret.DisplayObject = egret.DisplayObjectContainer.prototype.$hitTest.apply(this, [stageX, stageY]);
				if (ret == this) {
					if (!this.touchEnabled || this._hitArea == null)
						return null;
				}
				return ret;
			}			
		}

		/**
		 * 初始化common资源
		 */
		public static initCommon():void{

			fairygui.UIConfig.defaultFont = Global.defaultFont;
			fairygui.UIConfig.defaultComboBoxVisibleItemCount = 5;//下拉条默认显示条数为5

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
			fairui.PanelRegister.registerClass( "common" , "UINumberItemComp" , fairui.UINumberItemComp );
			fairui.PanelRegister.registerClass( "common" , "LabButton" , fairui.LabButton );
			fairui.PanelRegister.registerClass( "common" , "ReverseMask" , fairui.ReverseMask );
			fairui.PanelRegister.registerClass( "common" , "TipBottomItem" ,TipBottomItem)			
		}

		//-----------------------------------------------------------		

		/**缓存所有打开的面板 */
		private static cachePanelMap: flash.Dictionary = new flash.Dictionary();

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
				let panelInfo: fairui.PanelInfo = PanelRegister.getPanel(panelId);
				if (panelInfo == null) {
					Global.log.error( this , "没有对应面板 panelId:" + panelId);
					if (complete != null) complete();
					return;
				}
				if (this.isLoading(panelId)) {
					// Notice.showBottomMessage( "-----" + panelInfo.loadingTip + " panelId: " + panelId );
					return;
				}
				let container: BaseSprite = this.getPanelTypeLayer(panelInfo.panelType);
				if (panel == null) {
					if (panelInfo) {
						panelInfo.callback = this.loadCompeteAndOpenPanel;
						panelInfo.callbackParams = [panelId, data, container, x, y, complete];
						if (panelInfo.res && !LoaderManager.hasLoadAllGroups(panelInfo.res)) {
							// Global.log.debug("加载资源组: " + panelInfo.res);
							//打开加载界面
							this.openPanel(EnumPanelID.MAIN_LOADING, { "text": panelInfo.loadingTip, "panelId": panelId });
							//加载资源组
							LoaderManager.loadGroups(panelInfo.res, panelInfo.callback, this , panelInfo.callbackParams  );
						} else {
							this.loadCompeteAndOpenPanel(panelId, data, container, x, y, complete);
						}
					}else{
						Alert.show(Global.lang.getLang("panel_error_1", panelId));//面板打开错误：面板ID[{0}]还未注册！
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
				Global.log.error( this , "FairyUIManager.openPanel Id[" + panelId + "] Error.", e);
			}
		}

		/**加载完成并打开面板*/
		private static loadCompeteAndOpenPanel(panel: any, data: any, container: fairygui.GComponent = null, x: number = NaN, y: number = NaN, complete: Function = null): void {
			if (panel != EnumPanelID.MAIN_LOADING) {
				this.closePanel(EnumPanelID.MAIN_LOADING);//关闭加载界面
			}
			let panelid: number;
			if ( panel instanceof fairui.BasePanel ) {
				panelid = PanelRegister.getPanelId(panel);
			} else {
				panelid = panel;
			}
			let pinfo: PanelInfo = PanelRegister.getPanel(panelid);
			panel = this.cachePanelMap.getItem(panelid);
			//没有缓存则重新创建
			if (panel == null) {
				let cls: any = pinfo.className;
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
		}

		public static getPanelTypeLayer(type: number): BaseSprite {
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
		}

		/**
		 * 是否正在加载某个界面
		 * @param panelId 面板ID
		 */
		public static isLoading(panelId: number): boolean {

			// let panel: LoadingUI = <LoadingUI>this.getPanel(EnumPanelID.MAIN_LOADING);
			// if (panel != null && panel.parent != null && panel.data && panel.data.hasOwnProperty("panelId") && panel.data["panelId"] == panelId) {
			// 	return true;
			// }
			return false;
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
		 * 关闭面板
		 * @param panel 			面板id|fairui.BasePanel
		 * @param isDispose 		是否释放资源
		 * @param disposeRegsiter	是否释放面板注册表
		 */
		public static closePanel(panel: any, isDispose: boolean = false, disposeRegsiter: boolean = false, sameLevel: boolean = false): void {
			try {
				let panelid: number;
				if (egret.is(panel, "fairui.BasePanel")) {
					panelid = PanelRegister.getPanelId(panel);
				} else {
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
					PanelRegister.removeRegister(panelid);
				}
			} catch (e) {
				Global.log.error( this , "FairyUIManager.closePanel Id[" + panel + "] Error.", e);
			}
		}
	}
}
