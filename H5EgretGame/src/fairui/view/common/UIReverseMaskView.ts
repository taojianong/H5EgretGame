module fairui {

	/**
	 * 反向遮罩界面
	 * @author clong 2019.3.25
	 */
	export class UIReverseMaskView extends UIBaseWindow {

		private rmsk:ReverseMask;
		private circle: fairui.EButton;
		private up: fairygui.GGraph;
		private down: fairygui.GGraph;
		private left: fairygui.GGraph;
		private right: fairygui.GGraph;
		private img_arrow:fairygui.GImage;

		private btn_center:fairui.EButton;
		private sp:fairygui.GGraph;
		private eloader_icon:ELoader;

		/**对应引导的显示对象 */
		private _target: any = null;
		/**箭头方向 */
		private _dir:number = 2;
		/**其他数据 */
		private _other:Object = null;

		public constructor() {

			super("common", "UIReverseMaskView");
		}

		public initUI(): void {

			super.initUI();
			this.circle.downScaled = false;
			this.maskClick = false;

			this.eloader_icon.touchable = true;
			this.rmsk = fairui.PanelRegister.createGObject("common","ReverseMask");
			fairui.FairyUtils.setVar( this.rmsk , this );
			this.rmsk.setTarget( this.eloader_icon , this.onUpdate , this.onComplete , this );	
		}

		public initData( param:any ):void{

			super.initData( param );

			if( param == "msk" ){
				this.currentState = "msk";
				this.onResize();
				return;
			}

			let target:any = param[0];
			this._dir = param[1];//箭头方向
			let isMust:boolean = param[2];//是否为强制引导			
			this._other = param[3];//其他参数

			this.currentState = isMust ? "must" :"nomust";

			this.img_arrow.visible = false;
			if( this._dir == 2 || this._dir == 0 ){//下
				this.img_arrow.scaleX = 1
				this.img_arrow.scaleY = -1;
				this.img_arrow.rotation = 0;
			}else if( this._dir == 8 ){//上
				this.img_arrow.scaleX = this.img_arrow.scaleY = 1;
				this.img_arrow.rotation = 0;
			}else if( this._dir == 4 ){//左
				this.img_arrow.scaleX = 1
				this.img_arrow.scaleY = -1;
				this.img_arrow.rotation = 50;
			}else if( this._dir == 6 ){//右
				this.img_arrow.scaleX = 1
				this.img_arrow.scaleY = 1;
				this.img_arrow.rotation = 50;
			}

			this.onResize();
			
			this.setTarget( target );
		}

		public addAllListener():void{
			
			super.addAllListener();

			this.addGameListener( egret.TouchEvent.TOUCH_BEGIN , this.beginGuide , this , Global.stage );
		}

		public RemoveRootListener():void{

			
			super.removeAllListener();

			this.removeGameListener( egret.TouchEvent.TOUCH_BEGIN , this.beginGuide , this , Global.stage );
		}

		private beginGuide( e:egret.TouchEvent):void{
			
			e.stopPropagation();	
			if( this.btn_center.containsGlobalPoint(e.stageX,e.stageY) && !this.rmsk.isMoving ){
				EventManager.dispatchEvent( GameEvent.GUIDE_END );//结束引导
			}	
		}

		/**
		 * 设置显示中心对象
		 */
		public setTarget(target: any): void {

			this._target = target;

			this.updateCirclePoint();
		}

		/**更新引导中心坐标 */
		private updateCirclePoint():void{
			
			let _self:UIReverseMaskView = this;
			_self.img_arrow.visible = false;
			let offsetX:number = this._other && this._other.hasOwnProperty("offsetX") ? this._other["offsetX"] : 0;
			let offsetY:number = this._other && this._other.hasOwnProperty("offsetY") ? this._other["offsetY"] : 0;

			if (this._target instanceof fairygui.GObject) {
				let gp: egret.Point = this._target.localToGlobal(0,0);
				let lp: egret.Point = this.globalToLocal(gp.x, gp.y);
				lp.x += this._target.width * (this._target.scaleX - 1 ) * 0.5;
				lp.y += this._target.height * (this._target.scaleY - 1 ) * 0.5;
				if( !this._target.pivotAsAnchor ){//如果不是锚点
					lp.x += this._target.width * 0.5;
					lp.y += this._target.height * 0.5;
				}
				this.show( lp.x + offsetX , lp.y + offsetY );		
			}
		}

		/**移动中心点刷新 */
		private onUpdate():void{

			this.btn_center.visible = true;			
		}

		/**移动中心点完成 */
		private onComplete():void{

			if( this._dir == 2 ){//下
				this.img_arrow.x = this.sp.x;
				this.img_arrow.y = this.sp.y - this.sp.height * 0.5 - this.img_arrow.height * 0.5;
			}else if( this._dir == 8 ){//上
				this.img_arrow.x = this.sp.x;
				this.img_arrow.y = this.sp.y + this.sp.height * 0.5 + this.img_arrow.height * 0.5;
			}else if( this._dir == 4 ){//左
				this.img_arrow.x = this.sp.x - this.sp.width * 0.5 - this.img_arrow.height * 0.5;
				this.img_arrow.y = this.sp.y;
			}else if( this._dir == 6 ){//右
				this.img_arrow.x = this.sp.x + this.sp.width * 0.5 + this.img_arrow.height * 0.5;
				this.img_arrow.y = this.sp.y;
			}
			this.img_arrow.visible = true;

			this.btn_center.visible = false;
			this.btn_center.setXY( this.sp.x , this.sp.y );
			this.btn_center.setSize( this.sp.width , this.sp.height );			
		}

		/**
		 * 显示中心坐标
		 * @param  	x 		中心全局X坐标
		 * @param  	y 		中心全局Y坐标
		 * @param 	width 	中心宽度
		 * @param 	height 	中心高度
		 */
		private show(x: number, y: number, width: number = 100, height: number = 100): void {

			this.rmsk.setSize( Global.stageWidth , Global.stageHeight );
			this.rmsk.moveTo( x , y ,width , height );
		}

		/**更新除中心点其他模块坐标及高宽度 */
		private updateOtherPoint():void{

			this.up.height 	= this.circle.y - this.circle.height * 0.5;
			this.down.y 	= this.circle.y + this.circle.height * 0.5;
			this.down.height= (this.height - this.down.y)||0;
			
			this.left.width = this.circle.x - this.circle.width * 0.5;
			this.left.y 	= this.right.y = this.circle.y - this.circle.height * 0.5;
			this.right.x	= this.circle.x + this.circle.width * 0.5;
			this.right.width= (this.width - this.right.x ) || 0;
		}

		/**关闭事件 */
		protected closeHandler(e: egret.TouchEvent): void {

			super.closeHandler(e);
		}

		public clear(): void {

			super.clear();
			
			this._target = null;
			this._other = null;
		}

		public onResize(): void {

			this.setSize(Global.stageWidth, Global.stageHeight);

			super.onResize();		

			this.updateCirclePoint();
		}

		public dispose(): void {

			super.dispose();

			if( this.rmsk ){
				this.rmsk.dispose();
				this.rmsk = null;
			}
		}
	}
}