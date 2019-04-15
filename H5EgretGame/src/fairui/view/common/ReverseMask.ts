module fairui {

	/**
	 * 反向遮罩
	 * @author clong 2019.3.28
	 */
	export class ReverseMask extends BaseSprite {

		private bg: fairygui.GImage;
		private sp: fairygui.GGraph;

		/**目标对象 */
		private _target: any = null;
		private _onUpdate: Function = null;
		private _onComplete: Function = null;
		private _thisObj: any = null;
		/**正在移动 */
		private _isMoving:boolean = false;

		public constructor() {

			super();
		}

		protected constructFromXML(xml: any): void {

			super.constructFromXML(xml);

			this.InitUI();
		}

		public InitUI(): void {

			super.InitUI();

			this.sp.blendMode = egret.BlendMode.ERASE;
		}

		/**
		 * 设置目标对象
		 * @param target  	对应接受对象ELoader
		 * @param onUpdate	刷新方法
		 * @param onComplete完成方法
		 * @param thisObj	
		 */
		public setTarget(target: any, onUpdate: Function, onComplete: Function, thisObj: any): void {

			this._target = target;
			this._onUpdate = onUpdate;
			this._onComplete = onComplete;
			this._thisObj = thisObj;
		}

		/**
		 * 移动中心点到目标位置
		 * @param x 		中心点x坐标
		 * @param y 		中心点y坐标
		 * @param width 	中心点宽度
		 * @param height	中心点高度
		 */
		public moveTo(x: number, y: number, width: number, height: number): void {

			let _self: ReverseMask = this;

			if( this._target && !this._target.parent ){
				this.moveCircle( x , y , width , height);
				if (_self._onComplete) {
					_self._onComplete.apply(_self._thisObj);
				}
				return;
			}
			this.sp.width = width * 2;
			this.sp.height = height * 2;
			this._isMoving = true;
			fairygui.GTween.to2(this.sp.width, this.sp.height, width, height, 0.4).setTarget(this.sp, this).onUpdate(onUpdate, this).onComplete(onComplete, this);
			function onUpdate(tw: fairygui.GTweener): void {
				_self.moveCircle(x, y, tw.value.x, tw.value.y);
				if (_self._target instanceof fairui.ELoader) {
					_self._target.texture = _self.texture;
				}
				if (_self._onUpdate) {
					_self._onUpdate.apply(_self._thisObj);
				}
			}
			function onComplete(): void {
				_self.moveCircle(x, y, width, height);
				if (_self._target instanceof fairui.ELoader) {
					_self._target.pixelHitTest = true;
					_self._target.texture = _self.texture;
				}
				_self._isMoving = false;
				if (_self._onComplete) {
					_self._onComplete.apply(_self._thisObj);
				}				
			}
		}

		private moveCircle(x: number, y: number, w: number, h: number): void {

			x = parseInt("" + x);
			y = parseInt("" + y);
			w = parseInt(w + "");
			h = parseInt(h + "");
			x = x % 2 == 1 ? x + 1 : x;
			y = y % 2 == 1 ? y + 1 : y;
			w = w % 2 == 1 ? w + 1 : w;
			h = h % 2 == 1 ? h + 1 : h;

			this.sp.setXY(x, y);
			this.sp.setSize(w, h);
		}

		private _texture: egret.RenderTexture = null;
		/**最后渲染纹理 */
		public get texture(): egret.RenderTexture {

			if (this._texture == null) {
				this._texture = new egret.RenderTexture();
			}
			this._texture.drawToTexture(this._container);
			return this._texture;
		}

		/**正在移动 */
		public get isMoving():boolean{

			return this._isMoving;
		}

		public Reset():void{

			super.Reset();

			this._isMoving = false;
		}

		public dispose(): void {

			super.dispose();

			if (this._texture) {
				this._texture.dispose();
			}
			this._texture = null;
			this._target = null;
			this._onUpdate = null;
			this._onComplete = null;
			this._thisObj = null;
			this.sp = null;
			this.bg = null;
			this._isMoving = false;
		}

		public Destroy(): void {

			super.Destroy();
		}
	}
}