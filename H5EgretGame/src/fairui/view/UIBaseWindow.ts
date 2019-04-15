module fairui {

	/**
	 * 界面基类
	 * @author clong 2019.2.20
	 */
	export class UIBaseWindow extends View {

		protected view: fairygui.GComponent = null;
		/**背景 */
		protected bg: fairygui.GImage | fairygui.GLoader | fairui.ELoader;
		/**关闭按钮:取这个名字的按钮,会根据屏幕大小调整位置 */
		protected btn_close: fairygui.GButton | fairui.EButton;

		private resource: Resource;

		protected IsLoaded: boolean;

		protected viewStruct: ViewStruct;

		/**对应建筑表中的点击打开方式参数 */
		protected _cfgParam: any;

		/**背景遮罩点击是否关闭 */
		public maskClick: boolean = true;
		/**包名 */
		protected _pkgName: string = "";
		/**类名 */
		protected _resName: string = "";

		/**是否释放资源 */
		public isDisposeRes: boolean = false;

		/**界面显示是否完成，打开界面会有特效，特效没放完则显示还没结束 */
		public isShowComplete: boolean = false;

		/**
		 * 面板基类
		 * @param pkgName 包名
		 * @param resName 对应面板名字
		 */
		public constructor(pkgName: string = "", resName: string = "") {

			super();

			this._pkgName = pkgName;
			this._resName = resName;

			this.SetViewStruct();
		}

		public LoadAtlas(cfgParam: any): void {
			this._cfgParam = cfgParam;
			if (this._pkgName) {
				LoadQueue.Inst.loadGroup(this._pkgName, this.OnComplete, this, null, LoadLevel.UI_MODEL);
			} else {
				this.IsLoaded = true;
				this.InitComplete();
			}
		}

		/**
		 * 当加载完对应包时注册面板需要用到的对应编辑器中的类
		 */
		protected registerClasses(): void {

			// fairui.PanelRegister.registerClass( "pkgName" , "resName" , cls );
		}

		protected OnComplete(resource: GroupResource): void {

			let _self: UIBaseWindow = this;

			if (!_self.IsLoaded) {
				_self.resource = resource;
				resource.Res();
			}
			_self.IsLoaded = true;

			this.registerClasses();
			//注册类需要一定延时才生效！
			KeyFrameJugger.delayFrame(1, utils.Handler.Create(complete, this));
			function complete(): void {
				if (_self._pkgName != resource.name) {
					Logger.error(_self, "UI模块图集加载完成不一致：	" + _self._pkgName + "			" + name);
					return;
				}
				_self.InitComplete();
			}
		}

		public Init(param: any, cfgParam: any = null): void {

			if (cfgParam) {
				this._cfgParam = cfgParam;
			}

			this.maskClick = true;

			super.Init(param);
		}

		public InitChange(param: any): void {
			this.param = param;
			if (!this.IsComplyed) return;
			this.InitData(param);
		}

		public InitComplete(): boolean {

			if (!this.IsInited()) {
				return false;
			}
			if (!this.IsCreateObject()) {
				if (this._pkgName && !fairygui.UIPackage.getById(this._pkgName)) {
					fairygui.UIPackage.addPackage(this._pkgName);
				}
				if (this._pkgName && this._resName) {
					let obj: any = fairygui.UIPackage.createObject(this._pkgName, this._resName);
					this.view = obj.asCom;
					this._buttonController = this.view.getController("button");
					this.addChild(this.view);
					fairui.FairyUtils.setVar(this.view, this);
				}
			}

			//检测初始化是否完成
			if (!super.InitComplete()) {
				return false;
			}

			this.OnResize();

			if (this.viewStruct.isShowEffect) {
				this.playOpenEffect();
			} else {
				this.playEffectComplete();
			}
			return true;
		}

		public IsInited(): boolean {
			return super.IsInited() && this.IsLoaded;
		}

		public IsCreateObject(): boolean {

			return this.view != null;
		}

		public get buildInfo(): scene.BuildInfo {
			let buildInfo: scene.BuildInfo = this._cfgParam instanceof Array ? this._cfgParam[this._cfgParam.length - 1] : null;
			return buildInfo;
		}

		/**
		 * 建筑是否可升星
		 */
		protected canLevelUp(buildInfo: scene.BuildInfo = null): boolean {

			buildInfo = buildInfo || this.buildInfo;
			let isAllRight: boolean = false;
			if (!buildInfo) return false;
			let buildRes: BuildResource = BuildResource.getItemByKey(buildInfo.resId);
			if (buildRes) {
				let build_level: number = scene.MapModel.Inst.GetBuildLevel(buildInfo.buildId);
				let buildlu: BuildingLevelUpResource = null;
				for (let data of BuildingLevelUpResource.items) {
					if (data.build_lv == build_level && buildRes.build_type == data.build_type) {
						buildlu = data;
						break;
					}
				}
				isAllRight = buildlu ? ConsumeUtils.Check(buildlu.up_cost, false) : true;
			}
			return isAllRight;
		}

		public InitUI(): void {

			super.InitUI();
		}

		/**
		 * 添加事件函数
		 */
		public AddRootListener(): void {

			super.AddRootListener();

			if (this.btn_close) {
				this.AddGameListener(egret.TouchEvent.TOUCH_TAP, this.closeHandler, this, this.btn_close);
			}

			this.AddGameListener( UIGameEvent.GUIDE_SEARCH_TARGET , this.searchGuideTarget , this );
		}

		/**
		 * 移除事件函数,在Reset的时候调用就可以了，通过AddGameListener监听的事件会自动移除监听!不用再手动去写
		 */
		public RemoveRootListener(): void {

			// if (this.btn_close) {
			// 	this.RemoveGameListener(egret.TouchEvent.TOUCH_TAP, this.closeHandler, this, this.btn_close);
			// }

			super.RemoveRootListener(); //已在底层移除对应事件
		}

		/**
		 * 寻找引导对象
		 */
		protected searchGuideTarget( e:UIGameEvent ):void{

			if( !this.isShowComplete ){
				return;
			}
			let gvo:vo.GuideVo = e.data;						
		}

		/**播放打开界面特效 */
		protected playOpenEffect(): void {

			this.touchChildren = false;
			EffectUtil.openWindowEffect(this, this.playEffectComplete, this, null, true);
		}

		/**
		 * 播放界面动画完成
		 */
		public playEffectComplete(): void {

			let buildInfo: scene.BuildInfo = this._cfgParam instanceof Array ? this._cfgParam[this._cfgParam.length - 1] : null;
			if (buildInfo != null) {
				//TODO 建筑信息
			}
			this.isShowComplete = true;
			this.touchChildren = true;
		}

		/**关闭面板 */
		public close(): void {

			this.closeHandler(null);
		}

		/**关闭事件 */
		protected closeHandler(e: egret.TouchEvent): void {

			UISystem.Inst.RemoveWindowClass(this.getCls());
		}

		/**
		 * 播放关闭特效,方便扩展
		 */
		public playCloseEffect(complete: Function, params: Array<any> = null, thisObj: any = null): void {

			this.touchChildren = false;
			EffectUtil.closeWindowEffect(this, complete, thisObj || this, params, true);
		}

		/**是否正在播放界面特效 */
		public get isPlayWindowEffect():boolean{

			return this["isWindowEffect"];
		}

		//ui9宫格布局 自适应
		public OnResize(): void {

			UILayout.SetWindowLayout(this);
		}

		/**设置视图结构 */
		public SetViewStruct(): void {
			if (this.viewStruct == null) {
				this.viewStruct = new ViewStruct();
				let key: string = egret.getQualifiedClassName(this);
				this.viewStruct.window = Windows.getItemByKey(key);
				if (this.viewStruct.window) {
					this.viewStruct.layerType = this.viewStruct.window.layer;
				}
				if (this._pkgName == "common" || this._pkgName == "main" || this._pkgName == "scene" || this.viewStruct.isAlert) {
					this.isDisposeRes = false;
				} else {
					this.isDisposeRes = this.viewStruct.isFirst;
				}
			}
		}

		/**获取界面数据结构 */
		public GetViewStruct(): ViewStruct {

			return this.viewStruct;
		}

		/**面板ID */
		public get panelId(): number {

			return this.viewStruct.panelId;
		}

		public get isQueue(): boolean {

			return this.viewStruct && this.viewStruct.isQueue;
		}

		public get isShowMask(): boolean {

			return this.viewStruct && this.viewStruct.isShowMask;
		}

		public get isNotDo(): boolean {

			return this.viewStruct && this.viewStruct.isNotDo;
		}

		public get isFirst(): boolean {

			return this.viewStruct && this.viewStruct.isFirst;
		}

		public get isTwo(): boolean {

			return this.viewStruct && this.viewStruct.isTwo;
		}

		public get canDispose(): boolean {

			return true;
		}

		/**互斥界面列表 */
		public get mutexViews(): Array<number> {
			let arr: Array<any> = [];
			if (this.viewStruct.window == null || !this.viewStruct.window.mutex_views) {
				return [];
			}
			arr = this.viewStruct.window.mutex_views.split(",");
			for (let i: number = 0; i < arr.length; i++) {
				arr[i] = parseFloat(arr[i]);
			}
			return arr;
		}

		/**
		 * 置于顶层
		 */
		public toTop(): void {

			if (this.parent != null) {
				this.parent.setChildIndex(this, this.parent.numChildren - 1);
			}
		}

		/**
		 * 改变界面尺寸，以自适应
		 */
		public setSize(vw: number, vh: number): void {

			if (this.view) {
				this.view.setSize(vw, vh);
			}
			if (this.viewStruct) {
				this.viewStruct.window.width = vw;
				this.viewStruct.window.height = vh;
			}
		}

		public get width(): number {

			return this.view ? this.view.width : 0;
		}

		public get height(): number {

			return this.view ? this.view.height : 0;
		}

		public Reset(): void {

			super.Reset();

			this.isShowComplete = false;
		}

		public Destroy(): void {

			super.Destroy();

			if (this.resource != null && this.isDisposeRes) {
				fairygui.UIPackage.removePackage(this.resource.name);
				this.resource.Dispose();
				AssetsCache.Destroy(this.resource);
			}
			this.resource = null;
			this.viewStruct = null;
			this.IsLoaded = false;
			this._cfgParam = null;
			this.param = null;

			if (this.view) {
				this.view.dispose();
			}
			this.view = null;

		}
	}
}