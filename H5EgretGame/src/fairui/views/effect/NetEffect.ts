module fairui {

	import Animator = base.Animator;
	import INetResourceElement = com.interfaces.INetResourceElement;

	export class NetEffect extends Effect implements INetResourceElement {
		//private _data: Animator;
		private _netHandler: NetHandler;
		private _url: string = "NetEffect";
		private _vo: any;
		private _extendData: any;
		public get extendData(): any {
			return this._extendData;
		}

		public set extendData(value: any) {
			this._extendData = value;
		}

		protected _isLoading: boolean = false;
		private _resourceID: number = 0;
		public get resourceID(): number {
			return this._resourceID;
		}

		public set resourceID(value: number) {
			this._resourceID = value;
		}

		private _ownerid: string;
		public get ownerid(): string {
			return this._ownerid;
		}

		public set ownerid(value: string) {
			this._ownerid = value;
		}

		public constructor() {
			super();
		}

		public get url(): any {
			return this._url;
		}

		public set url(value: any) {
			if (this._url != value) {
				this.clear();
				this._url = (value == null ? "NetEffect" : value);
				if (value && value != "" && flash.As3is(value, "string"))
					this.netLoad();
			}
		}

		public get resType(): number {
			return EnumLoader.RES;
		}

		// public set resType(value: number) {
		// }

		public clear() {

			this.unNetLoad();
			//this._data = null;
		}

		public get data(): any {
			return this._vo;
		}

		public set data(value: any) {
			this._vo = value;
		}

		public netLoad() {
			if (this._isLoading == false) {
				if (this._url != "NetEffect" && this._url != null) {
					this._isLoading = true;
					NetResourceManager.getInstance().getResource(this);
				}
				else {
					Global.log.error( "加载路径有问题" );//NetEffect >> 加载路径有问题
				}
			}
		}

		public unNetLoad() {
			this._isLoading = false;
			NetResourceManager.getInstance().delResource(this);
		}

		public get isLoading(): boolean {
			return this._isLoading;
		}

		public netComplete(value: any) {
			if (value instanceof Animator) {//flash.As3is(value, Animator)
				//this._data = value;
				this._isLoading = false;
				this.addAnimatior(value);//flash.As3As(value, Animator)
			}
		}

		public netProgress(value: number) {
			if (this._netHandler)
				this._netHandler.netProgress();
		}

		public netError(value: any) {
			if (this._netHandler)
				this._netHandler.netError();
		}

		public get netHandler(): NetHandler {
			if (this._netHandler == null)
				this._netHandler = new NetHandler();
			return this._netHandler;
		}

		public resetAndClear() {
			this._vo = null;
			if (this._netHandler)
				this._netHandler.clear();
			this.clear();
			this._url = "NetEffect";
			super.resetAndClear();
		}

		public dispose() {
			//yr_engine.core.utils.debug.stack.$_FunctionStackLog.intoStack("yr_engine.compoments.netcomps::NetEffect /dispose()");
			this._vo = null;
			this.clear();
			if (this._netHandler) {
                com.loader.GLoaderManager.getInstance().unLoad(this._url, this, this._netHandler.netComplete);
                this._netHandler.dispose();
            }
			this._netHandler = null;
			super.dispose();
		}
	}
}
// flash.extendsClass("yr_engine.compoments.netcomps.NetEffect", "yr_engine.scene.effect.Effect")
// flash.implementsClass("yr_engine.compoments.netcomps.NetEffect", ["INetResourceElement"]);