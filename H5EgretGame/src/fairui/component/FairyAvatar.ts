module fairui {

    /**
	 * 基于Fairygui组件的Avatar
	 * @author cl 2018.4.24
	 */
	export class FairyAvatar extends BaseSprite{

		/**动画 */
		protected _avatar: view.fight.RoleAvatar;

		public constructor() {

			super();

			this._avatar = new view.fight.RoleAvatar();
			this._avatar.aniDirType = EnumAvatarPart.FIVE_DIR;
			this._avatar.addPart(EnumAvatarPart.BODY);
			this.addEgretChild( this._avatar );
			this.opaque = true;
			this.addEventListener( egret.Event.ADDED_TO_STAGE , this.addToStageHandler , this );
			this.addEventListener( egret.Event.REMOVED_FROM_STAGE , this.removeFromStageHandler , this );
		}

		private addToStageHandler( e:Event ):void{

			this._lastTime = egret.getTimer();
			App.timer.doFrameLoop( 1 , flash.bind( this.enterFrameHandler , this ));
		}

		private removeFromStageHandler( e:Event ):void{

			App.timer.clearTimer( flash.bind( this.enterFrameHandler , this ) );
		}

		/**
		 * 改变挂件动画资源
		 * @param  resId 资源名字
		 * @param  resType 资源类型 1-role 2-pet 3-monster
		 */
		public changePartPath( resId:string , resType:number = 2) {
            let path: string;
			switch (resType) {
				case 1:
                    path = AssetPathManager.getInstance().getFightHeroPartPath(parseInt(resId), EnumAvatarPart.BODY);
					break;
				case 2:
                	path = AssetPathManager.getInstance().getPetPartPath( resId );
                	break;				
				case 3:
					path = AssetPathManager.getInstance().getFightMonsterPartPath( resId );
					break;
			}
			this.avatar.getPart(EnumAvatarPart.BODY).path = path;
		}

		/**
		 * 改变方向
		 * 
		 */
		public changeDirAction(action: string, dir: number = -1, loop: boolean = true, reset: boolean = false, startFrame: number = 0) {
			this._avatar.dir = dir == -1 ? this._avatar.dir : dir;
			this._avatar.changeAction(action, loop, reset, startFrame);
			this._avatar.play();
		}

		public set playEndHanlder( value:Function ){

			this._avatar.playEndHanlder = value;
		}
		/**
		 * 结束时调用
		 */
		public get playEndHanlder():Function{

			return this._avatar.playEndHanlder;
		}

		/**动画动作 */
		public get action():string{

			return this._avatar.action;
		}

		private _lastTime:number = 0;
		private enterFrameHandler(event: egret.Event) {

			let nowTime: number = egret.getTimer();
			let passtime = nowTime - this._lastTime;
			this.addvanceTime( passtime );
			this._lastTime = nowTime;
		}

		public addvanceTime(passtime: number) {
			if (this._avatar){
				this._avatar.addvanceTime(passtime);
			}				
		}

		/**纸娃娃*/
		protected get avatar(): base.Avatar {
			
			return this._avatar;
		}

		/**停止播放 */
		public stop():void{

			this._avatar.stop();
		}

		/**清理 */
		public clear():void{

			this._avatar.clear();
		}

		public dispose( isAll:boolean = true ):void{

			App.timer.clearTimer( flash.bind( this.enterFrameHandler , this ) );
			this.removeEventListener( egret.Event.ADDED_TO_STAGE , this.addToStageHandler , this );
			this.removeEventListener( egret.Event.REMOVED_FROM_STAGE , this.removeFromStageHandler , this );

			super.dispose();

			if( this._avatar != null ){
				this._avatar.dispose();
				this._avatar = null;
			}

			if( isAll ){
				App.asset.deleteAllResAsset();
			}			
		}
	}
}