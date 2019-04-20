/**
 * UI管理类
 * @author clong 2019.4.20
 */
class UISystem {
	
	private static _Inst: UISystem;
	public static get Inst(): UISystem {
		if (this._Inst == null) this._Inst = new UISystem();
		return this._Inst;
	}
	//------------------------------------------------------

	//显示对象缓存
	private m_view: flash.Dictionary = new flash.Dictionary();
	//等待回收显示对象缓存
	private m_gc_view: flash.Dictionary = new flash.Dictionary();

	/**需要队列显示的窗口 */
	private queueWindows: Array<Object> = [];

	public constructor() {

		let loopTime: number = 2 * 60 * 1000;
		if (DEBUG) {//如果为调试模式
			loopTime = 5000;
		}
		Global.timer.doTimeLoop(loopTime, this.checkCache);
	}

	/**
	 * 检测缓存界面并清理
	 */
	private checkCache(): void {

		let viewDic:flash.Dictionary = this.getGcViewCache();		
		viewDic.forEach( function check( key:any , view:any ):void{
			if( view instanceof fairui.View && view.isCanGc() ){
				view.dispose();
				viewDic.delItem( key );
			}
		} , this );
	}

	private getGcViewCache(): flash.Dictionary {
		return this.m_gc_view;
	}

	/**
	 * 是否已打开该界面
	 * @param view 界面
	 */
	public hasOpenView(cls: any): boolean {

		return cls != null && this.m_view[cls] != null && this.m_view[cls].parent != null;
	}

	/**
	 * 是否打开过界面
	 * @cls		创建类名
	 * @param	参数 
	 */
	public getOpenWindow(cls: any): any {
		let view: fairui.UIBaseWindow = <fairui.UIBaseWindow>this.m_view[cls];
		if (view == null || view.parent == null) {
			return null;
		}
		return view;
	}

	/**
	 * 根据界面ID打开对应界面
	 * @param panelId 面板ID
	 * @param params 对应参数
	 * @param cfgParam 配置对应参数
	 */
	public openWindow(panelId: any, params: any = null, cfgParam: any = null): void {

		if (egret.is(panelId, "string")) {
			panelId = parseInt(panelId);
		}
		// let window: Windows;
		// let key: any;
		// for (key in Windows.itemsDic) {
		// 	window = Windows.itemsDic[key];
		// 	if (window && window.id == panelId) {
		// 		this.CreateWindowView(egret.getDefinitionByName(window.clsName), params, cfgParam);
		// 		break;
		// 	}
		// }
	}

	/**
	 * 待回收里获取对象
	 */
	private getViewByGc(cls: any): fairui.View {
		let view = this.m_gc_view[cls];

		if (view != null) {
			delete this.m_gc_view[cls];
			return view;
		}
		return null;
	}

	/**
	 * 打开窗口界面
	 */
	private openWindowView( cls:any , param: any = null, cfgParam: any = null): any {

		let view: fairui.UIBaseWindow = this.m_view[cls];
		if (view == null) {
			view = <fairui.UIBaseWindow>this.getViewByGc(cls);
			if (view == null) {
				view = new cls();
				view.cls = cls;
			}
			this.m_view[cls] = view;
		}
		view.init(param, cfgParam);

		if (view.parent == null) {
			UILayout.setWindowLayer(view);
		} else {
			Global.log.error(this, "已打开该界面");
		}
		return view;
	}

	/**
	 * 统一创建界面窗口类接口，不要其它地方创建
	 * @cls		创建类名
	 * @param	参数 
	 */
	public createWindowView(cls: any, param: any = null, cfgParam: any = null): any {
		
		return this.openWindowView( cls , param , cfgParam );
	}

	/**
	 * 统一创建view类接口，不要其它地方创建
	 * @cls		创建类名
	 * @param	参数 
	 */
	public createView(cls: any, param: any = null): any {
		let view: fairui.View = new cls();
		view.cls = cls;
		view.init(param);
		return view;
	}

	/**
	 * 移除传入的窗口界面类
	 */
	public removeWindowClass(cls: any): void {

		this.removeWindowView(this.m_view[cls]);
	}

	/**
	 * 移除传入的窗口界面对象,并从缓存中清除
	 */
	public removeWindowView(view: fairui.UIBaseWindow): void {

		if (view == null) {
			return null;
		}

		let _self:UISystem = this;
		let isShowMask: boolean = view.isShowMask;
		let isQueue: boolean = view.isQueue;
		let isShowEffect:boolean = view.getViewStruct() ? view.getViewStruct().isShowEffect : false;

		if( isShowEffect ){
			view.playCloseEffect( complete , null , this );
		}else{
			complete();
		}		
		function complete():void{
			_self.removeView(view);
			//移除遮罩
			if (isShowMask) {
				UILayout.removeMsk();
			}
		}	
	}

	/**
	 * 移除但不清除对应缓存
	 */
	public removeView(view: fairui.View): void {

		if (view.parent != null) {
			view.parent.removeChild(view);
		}
		view.removeAllListener();
		view.clear();
		if (view.cls in this.m_view) {
			delete this.m_view[view.cls];
			this.m_gc_view[view.cls] = view;
		}
	}

	//--------------------------------------------------

	/**
	 * 打开TIP界面 
	 * @param cls 		界面类，tip类继承自UIBaseTip 
	 * @param param 	界面参数,target为当前tip点击的对象,showMask显示遮罩自动居中了
	 * @param pkgName 	对应资源包名字
	 */
	public openTipView(cls: any, param: Object = null , pkgName:string = "" ): void {

		let _self:UISystem = this;
		if (cls == null) {
			return;
		}
		this.closeAllTip();

		let tipView: fairui.UIBaseTip = this.m_view[cls];
		if (tipView == null) {

			tipView = <fairui.UIBaseTip>this.getViewByGc(cls);

			if (tipView == null) {				
				let clsName:string = egret.getQualifiedClassName( cls );
				if( clsName.lastIndexOf(".") != -1 ){
					clsName = clsName.substr( clsName.lastIndexOf(".") + 1 );
				}
				fairui.PanelRegister.registerClass( pkgName , clsName , cls );
				Global.timer.doTimeOnce( 100 , function init():void{
					tipView = fairui.PanelRegister.createGObject( pkgName , clsName );
					tipView.init( param );
					tipView.cls = cls;
					
					complete();
				} );
			}else{
				complete();
			}			
		}else{
			complete();
		}
		function complete():void{
			
			tipView.init(param);
			let showMask: boolean = param && param.hasOwnProperty("showMask") && param["showMask"];
			if (showMask) {
				UILayout.showMsk(fairui.FairyUIManager.topLayer);
			}

			if (tipView.parent == null) {
				fairui.FairyUIManager.topLayer.addChild(tipView);
			}
			_self.m_view[cls] = tipView;
		}	
	}

	/**
	 * 关闭TipView
	 * @param cls 		Tip界面类
	 */
	public closeTipView(cls: any): void {

		let _self: UISystem = this;
		let tipView: fairui.UIBaseTip = this.m_view[cls] || this.getViewByGc(cls);;
		if (tipView != null) {
			let isShowMask: boolean = tipView.isShowMask;
			if (isShowMask) {
				EffectUtil.closeWindowEffect(tipView, function complete(): void {
					_self.removeView(tipView);
					UILayout.removeMsk();
				}, _self, null , true );
			} else {
				_self.removeView(tipView);
			}
		}
	}

	/**
	 * 移除所有TIP界面
	 */
	public closeAllTip(): void {

		let len: number = fairui.FairyUIManager.topLayer.numChildren;
		let view = null;
		for (let i: number = len - 1; i >= 0; i--) {
			view = fairui.FairyUIManager.topLayer.getChildAt(i);
			if (view instanceof fairui.UIBaseTip) {
				let isShowMask: boolean = view.isShowMask;
				this.removeView(view);
				if (isShowMask) {
					UILayout.removeMsk();
				}
			}
		}
	}
}