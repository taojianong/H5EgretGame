module fairui {

	import UIContainer = fairygui.UIContainer;
	import GButton = fairygui.GButton;

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

		/**生产界面种子TIP */
		public static recipeTipView:UIComTipsView = null;

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
			UIContainer.prototype.$hitTest = function (stageX: number, stageY: number):egret.DisplayObject {
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
			fairui.PanelRegister.registerClass("common", "UIMoneyComp", fairui.UIMoneyComp);
			fairui.PanelRegister.registerClass("common", "UIBitmapIcon", fairui.UIBitmapIcon);
			fairui.PanelRegister.registerClass("common", "UIBitmapIcon2", fairui.UIBitmapIcon2);
			fairui.PanelRegister.registerClass("common", "UIHeadItem", fairui.UIHeadItem);	
			fairui.PanelRegister.registerClass("common", "UIDropDownList", fairui.UIDropDownList);	
			fairui.PanelRegister.registerClass("common", "UILabel", fairui.UILabel);
			fairui.PanelRegister.registerClass("common", "HSlider", fairui.HSlider);
			fairui.PanelRegister.registerClass("common", "HEGList", fairui.HEGList);
			fairui.PanelRegister.registerClass("common", "ProgressBar", fairui.ProgressBar);
			fairui.PanelRegister.registerClass("common", "ECheckBox", fairui.ECheckbox);
			fairui.PanelRegister.registerClass("common", "ExpStar", fairui.ExpStar);
			fairui.PanelRegister.registerClass("common", "UIPackageItem", fairui.UIPackageItem);
			fairui.PanelRegister.registerClass("common", "UITextInput", fairui.UITextInput);
			fairui.PanelRegister.registerClass("common", "UIComItem", fairui.UIComItem);
			fairui.PanelRegister.registerClass("common", "UIItemRenderView", UIItemRenderView);
			fairui.PanelRegister.registerClass( "common" , "UINumberItemComp" , fairui.UINumberItemComp );
			fairui.PanelRegister.registerClass( "common" , "LabButton" , fairui.LabButton );
			fairui.PanelRegister.registerClass( "common" , "UIComRollView" , UIComRollView );	
			fairui.PanelRegister.registerClass( "common" , "ReverseMask" , fairui.ReverseMask );	
			fairui.PanelRegister.registerClass( "common" , "UIComTipsView" , UIComTipsView );		
			fairui.PanelRegister.registerClass( "common" , "UIComTipsItemView" , UIComTipsItemView );
			fairui.PanelRegister.registerClass( "common" , "UIScoreItemView" , UIScoreItemView );
			fairui.PanelRegister.registerClass( "common" , "UIMainProduceOperationView" , ui.UIMainProduceOperation );
			fairui.PanelRegister.registerClass( "common" , "UIMainMakeTroubleBuffView" , ui.UIMainMakeTroubleBuffView );
			fairygui.UIPackage.addPackage("scene");
			fairui.PanelRegister.registerClass( "scene", "BUIprogress", scene.BUIprogressView );
			fairui.PanelRegister.registerClass( "scene", "UIComArrowView", scene.UIComArrowView );
			fairui.PanelRegister.registerClass( "scene", "UIMainRebuildView", UIMainRebuildView );
			fairui.PanelRegister.registerClass( "scene" , "SeedUIWaterEffectView" , scene.SeedUIWaterEffectView );
			fairui.PanelRegister.registerClass( "scene", "RecipeUIComponent", scene.RecipeUIComponentView );
			fairui.PanelRegister.registerClass( "scene", "BUIFarmState", scene.SeedUIStateView );

			FairyUIManager.recipeTipView = fairui.PanelRegister.createGObject( "common" , "UIComTipsView" );
		}
	}
}
