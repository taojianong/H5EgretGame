module fairui {

	/**
	 * 面板注册 clong 2019.1.30
	 */
	export class PanelRegister {
		
		/**
		 * 注册组件类与fairygui编辑器中类对应
		 * @param pkgName 包名
		 * @param resName 资源名
		 * @param cls	  对应包中类名	
		 */
		public static registerClass(pkgName: string, resName: string, cls: any): void {

			if (pkgName && !fairygui.UIPackage.getById(pkgName)) {
				fairygui.UIPackage.addPackage(pkgName);
			}
			let url: string = fairygui.UIPackage.getItemURL(pkgName, resName);
			fairygui.UIObjectFactory.setPackageItemExtension(url, cls);
		}
		
		/**
		 * 创建自定义fairygui组件，必须用此方式,与以上方法对应使用,不能直接使用new cls()的方式创建一个绑定fairygui的类！
		 * @param pkgName 包名
		 * @param resName 资源名
		 */
		public static createGObject(pkgName: string, resName: string): any {
			return fairygui.UIPackage.createObjectFromURL(fairygui.UIPackage.getItemURL(pkgName, resName));
		}

		//-------------------------------------------
		/**注册的面板类 */
		private static dmap: flash.Dictionary = new flash.Dictionary();

		/**注册界面 */
		public static registerPanels(): void {

			//主界面注册
			//PanelRegister.register(EnumPanelID.MAIN_MENU, new PanelInfo(EnumPanelID.MAIN_MENU, EnumPanel.TYPE_MAIUI, "main", "", fairui.MenuPanel, false, true));
			
			//Alert层界面注册 警示类的面板定义为Alert层
			// PanelRegister.register(EnumPanelID.DEBUG_VIEW, new PanelInfo(EnumPanelID.DEBUG_VIEW, EnumPanel.TYPE_ALERT, "", App.lang.getLang("uiload_txt_1"), DebugPanel));//正在加载错误日志面板资源
			PanelRegister.register(EnumPanelID.MAIN_LOADING, new PanelInfo(EnumPanelID.MAIN_LOADING, EnumPanel.TYPE_ALERT, "", "", fairui.LoadingPanel, false, true));
			
		}

		/**
		 * 注册面板
		 * @param id 	面板ID
		 * @param panel PanelInfo
		 */
		public static register(id: number, panel: PanelInfo ): void {

			PanelRegister.dmap.setItem(id, panel);
			PanelRegister.dmap.setItem( panel , id );
		}

		/**
		 * 获取对应面板
		 * @param idOrCls 面板ID
		 * @return id => PanelInfo , cls => panelid
		 */
		public static getPanel( idOrCls: any ): any {
			return this.dmap.getItem( idOrCls );
		}

		/**
		 * 获取对应面板的panelid
		 * @param panel fairui.BasePanel
		 * @return 面板ID
		 */
		public static getPanelId(panel: any): number {
			let thisObj: any = this;
			let index: number = -1;
			if ( panel instanceof fairui.BasePanel && panel.panelInfo ) {
				index = PanelRegister.getPanel( panel.panelInfo );
			}
			return index;
		}

		/**
		 * 移除注册
		 * @param panelid 面板ID
		 */
		public static removeRegister(panelid: number): void {

			if (PanelRegister.dmap.hasOwnProperty(panelid)) {
				let panelinfo: PanelInfo = PanelRegister.dmap.getItem(panelid);
				if (panelinfo != null) {
					PanelRegister.dmap.delItem(panelid);
					panelinfo = null;
				}
			}
		}
	}
}
