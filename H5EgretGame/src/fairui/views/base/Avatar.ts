module base {
	export class Avatar extends base.GSprite {

		private _partHash: flash.Dictionary;
		protected get partHash(): flash.Dictionary {
			return this._partHash;
		}

		private _isDispose: boolean = false;
		public get isDispose(): boolean {
			return this._isDispose;
		}

		private _action: string;
		public get action(): string {
			return this._action;
		}

		private _aniDirType: number = 0;
		/**动画的方向类型， 一般是0:八方向, 1:五方向 */
		public get aniDirType(): number {
			return this._aniDirType;
		}
		public set aniDirType(value: number) {
			this._aniDirType = value;
		}

		private _dir: number = -1;
		public get dir(): number {
			return this._dir;
		}

		public set dir(value: number) {
			if (this._dir != value) {
				this._dir = value;
				this._isChangeDir = true;
			}
		}
		/**是否已改变方向*/
		private _isChangeDir: boolean = false;

		private _partVisible: boolean = true;
		/**是否显示挂件*/
		public get partVisible(): boolean {
			return this._partVisible;
		}

		public set partVisible(value: boolean) {
			if (value != this._partVisible) {
				this._partVisible = value;
				this._partHash.forEach(function (key: number, part: base.AvatarPart) {
					part.visible = value;
				}, this);
			}
		}
		private _partAlpha: number = 1;
		public get partAlpha(): number {
			return this._partAlpha;
		}

		public set partAlpha(value: number) {
			if (value != this._partAlpha) {
				this._partAlpha = value;
				this._partHash.forEach(function (key: any, part: base.AvatarPart) {
					part.alpha = value;
				}, this);
			}
		}

		protected _isPlaying: boolean = false;
		private _isChangeAction: boolean = false;

		private _isLoop: boolean = false;
		public get isLoop(): boolean {
			return this._isLoop;
		}

		private _isChangeUpdatePartDepth: boolean = false;
		protected _endFrame: number = -1;
		private _currentFrame: number = 0;
		/**当前动作经过时间*/
		private _currentActionPasstime: number = 0;
		private _frameCount: number = -1;
		private _fiveDir: number = -1;

		private _playEndHanlder: Function;
		public get playEndHanlder(): Function {
			return this._playEndHanlder;
		}

		public set playEndHanlder(value: Function) {
			this._playEndHanlder = value;
		}

		private _speed: number = 1;
		public get speed(): number {
			return this._speed;
		}
		public set speed(value: number) {
			if (this._speed != value) {
				this._speed = (value <= 0.1 ? 0.1 : value);
			}
		}
		/**角色等待加载资源所需待图*/
		protected _waitAvatar: base.GBitmap;

		public constructor() {
			super();
			this.init();
			this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
		}

		protected onAddToStage(event: egret.Event) {
			this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
		}

		protected init() {
			this.touchEnabled = false;
			this.touchChildren = false;
			this._partHash = new flash.Dictionary();
		}
		/**
		 * 增加一个挂件。<br>1、注意，body也是挂件。<br>2、如佩刀，坐骑、翅膀等都是挂件。<br>
		 * @param partType
		 * @param path
		 * @return base.AvatarPart
		 */
		public addPart(partType: number): base.AvatarPart {
			let part: base.AvatarPart = this._partHash.getItem(partType);
			if (part == null) {
				part = this.makePart(partType);
				this._partHash.setItem(partType, part);
				part.addParent(this);
				//part.changeAnimator(this.action, this.dir);
				//this.setupPartAnimator(part);
				this._isChangeUpdatePartDepth = true;
			}
			return part;
		}
		/**
		 * 增加挂件时，new一个挂件对象。 
		 * @param partType
		 * @return 
		 */
		protected makePart(partType: number): base.AvatarPart {
			return new base.AvatarPart(partType);
		}

		public removePart(partType: number) {
			let part: base.AvatarPart = this._partHash.getItem(partType);
			if (part) {
				part.dispose();
				this._partHash.delItem(partType);
			}
		}

		public getPart(partType: number): base.AvatarPart {
			return this._partHash.getItem(partType);
		}
		/**
		 * 设置动画的缩放
		 * @param sX
		 * @param sY
		 */
		public scaleXY(sX: number, sY: number) {
			if (!this._isDispose) {
				this._partHash.forEach(function (key: number, part: base.AvatarPart) {
					part.scaleX = sX;
					part.scaleY = sX;
				}, this);
			}
		}
		/**
		 * 是否点中任一挂件或指定的挂件。 
		 * @param partType
		 * @return
		 */
		public checkHitPoint(partType: number = -1): boolean {
			let bool: boolean = false;
			if (partType == -1) {
				this._partHash.forEach(function (key: any, part: base.AvatarPart) {
					if (part.checkContainPoint()) {
						bool = true;
						return;
					}
				}, this);
			}
			else {
				if (this.getPart(partType)) {
					bool = this.getPart(partType).checkContainPoint();
				}
			}
			return bool;
		}
		/**开始播放*/
		public play() {
			this._isPlaying = true;
			this._endFrame = -1;
		}

		protected playEnd() {
			if (this._playEndHanlder != null)
				this._playEndHanlder.apply(this._playEndHanlder["owner"]);
		}
		/**停止播放*/
		public stop() {
			this._isPlaying = false;
		}
		/**
		 * 停止在第几帧
		 * @param frame
		 */
		public gotoAndStop(endFrame: number, startFrame: number = 0) {
			this._isLoop = false;
			this._currentFrame = startFrame;
			this.play();
			this._endFrame = endFrame;
		}
		/**
		 * 从第几帧开始播放
		 * @param frame
		 */
		public gotoAndPlay(frame: number, loop: boolean = false) {
			this._isLoop = loop;
			this._currentFrame = frame;
			this.play();
		}

		public changeAction(action: string, loop: boolean = false, reset: boolean = false, startFrame: number = 0) {
			this._isLoop = loop;
			this.setAction(action, reset, startFrame);
		}

		private setAction(action: string, reset: boolean = false, startFrame: number = 0) {
			if (this._action != action || reset) {
				this._action = action;
				this._currentFrame = startFrame;
				this._currentActionPasstime = 0;
				this._isChangeAction = true;
				// com.center.FightCenter.getInstance().autoSortType = true;
			}
		}
		/**
		 * 在帧事件中每帧调用 
		 * @param passtime
		 */
		public addvanceTime(passtime: number) {
			if (!this._isPlaying || this.isDispose)
				return;
			this._currentActionPasstime += passtime;
			this.changeAnimator();
			let body: base.AvatarPart = this.getPart(EnumAvatarPart.BODY);
			if (body == null || body.animator == null) {
				return;
			}
			if (this._frameCount != body.aniLength) {
				this._frameCount = body.aniLength;
				if (this._currentFrame >= this._frameCount) {
					this._currentFrame = 0;
				}
			}
			if (this._currentFrame == -1) {
				this._currentFrame = this._frameCount - 1;
				this.setCurrentFrame();
				this.playEnd();
			}
			else {
				this.update();
			}
		}
		/**改变动画数据后的处理。 <br>1、现在的资源组织方式是方向和动作放在不同的资源包中。2、所以方向或动作任一一个变化都是要加载对应的资源。*/
		private changeAnimator() {
			if (this._isChangeDir || this._isChangeAction) {
				if (this._aniDirType == EnumAvatarPart.EIGHT_DIR) {//8方向
					this._partHash.forEach(function (key: number, part: base.AvatarPart) {
						if (part.changeAnimator(this._action, this._dir))
							this.setupPartAnimator(part);
					}, this);
					this.changePartDepth();
				}
				else if (this._aniDirType == EnumAvatarPart.FIVE_DIR) {//五方向
					let fiveDir: number = EnumAvatarPart.getFiveDir(this, this.dir);
					if (fiveDir != this._fiveDir || this._isChangeAction) {
						this._fiveDir = fiveDir;
						this._partHash.forEach(function (key: number, part: base.AvatarPart) {
							if (part.changeAnimator(this._action, this._fiveDir))
								this.setupPartAnimator(part);
						}, this);
						this.changePartDepth();
					}
					else {
						if (this._isChangeAction) {
							this.changePartDepth();
						}
					}
				}
			}
			if (this._isChangeUpdatePartDepth) {
				this.changePartDepth();
			}
			this._isChangeAction = false;
			this._isChangeDir = false;
		}
		/**设置当前帧*/
		public setCurrentFrame() {
			this._partHash.forEach(function (key: number, part: base.AvatarPart) {
				part.currentIndex = this._currentFrame;
				this._isChangeUpdatePartDepth = true;
			}, this);
		}

		private update() {
			let animator: Animator = this.getPart(EnumAvatarPart.BODY).animator;
			if (animator == null || animator.isDispose) {
				return;
			}
			let totalTime: number = Math.floor(animator.totalMovieTime * this.speed);
			let ct: number = this._currentActionPasstime;
			let num: number = Math.floor(this._currentActionPasstime / totalTime);
			this._currentActionPasstime = this._currentActionPasstime % totalTime;
			let frame: number = this._currentFrame;
			let image: SingleImage = animator.getImage(frame);
			while (image && this._currentActionPasstime >= image.delayTime * this.speed) {
				this._currentActionPasstime -= image.delayTime * this.speed;
				frame++;
				if (frame >= this._frameCount - 1) {
					num++;
				}
				if (frame >= this._frameCount) {
					frame = 0;
				}
				image = animator.getImage(frame);
			}
			if (frame != this._currentFrame || num > 0) {
				this._currentFrame = frame;
				this.setCurrentFrame();
				if (this._endFrame == this._currentFrame) {
					this.stop();
				}
				if (num > 0) {
					num = this._isLoop ? num : 1;
					while (num > 0) {
						this.playEnd();
						num--;
					}
				}
			}
		}

		protected changePartDepth() {
			//@TODO
		}

		protected setupPartAnimator(part: base.AvatarPart): boolean {
			let url: string = AssetPathManager.getInstance().getFightRoleRes(part.path, this.action, this._fiveDir);
			let animaor: Animator = App.asset.getResAsset(url);
			if (animaor) {
				this.showWaitAvatar(false);
				part.deleteAnimator();
				part.addAnimatior(animaor);
				return true;
			}
			else {
				this.showWaitAvatar(true);
				part.deleteAnimator();
				this.getAnimationNetPath(url, part.partType);
				return false;
			}
		}

		protected getAnimationNetPath(url: string, type: number) {
			com.loader.GLoaderManager.getInstance().load(url, EnumLoader.RES, this, this.resLoadComleteHandler, null, null,
				[type, this.action, this.dir], false);
		}

		private resLoadComleteHandler(data: com.loader.LoaderData) {
			if (this.action == data.argArray[1] && this.dir == data.argArray[2]) {
				let part: base.AvatarPart = this.getPart(data.argArray[0]);
				part.addAnimatior(data.data);
				this.showWaitAvatar(false);
			}
		}
		/**制造等待加载资源所需待图*/
		protected makeWaitAvatar() {
			if (!this._waitAvatar) {
				this._waitAvatar = new base.GBitmap();
			}
			//this._waitAvatar.texture = RES.getRes("heiying_png");
			// this._waitAvatar.x = -this._waitAvatar.measuredWidth * 0.5;
			// this._waitAvatar.y = -this._waitAvatar.measuredHeight;
		}

		private showWaitAvatar(showType: boolean) {
			if (this._waitAvatar && this.contains(this._waitAvatar)) {
				this._waitAvatar.visible = showType;
			}
		}
		/**移除等待加载资源所需待图*/
		protected removeWaitAvatar() {
			if (this._waitAvatar && this.contains(this._waitAvatar)) {
				this.removeChild(this._waitAvatar)
			}
		}

		public clear() {
			if (this._waitAvatar)
				this._waitAvatar.texture = null;
			this._partHash.forEach(function (key: number, part: base.AvatarPart) {
				part.clearActionAndDir();
			}, this);
			this.scaleX = 1;
			this._action = null;
			this._fiveDir = -1;
			this._dir = -1;
			this._isChangeAction = false;
			this._isChangeUpdatePartDepth = false;
			this._isChangeDir = false;
			this._speed = 1;
			this._frameCount = -1;
			this._currentFrame = 0;
			this._currentActionPasstime = 0;
			this._isLoop = false;
			this.alpha = 1;
		}

		public dispose(type?: boolean) {
			super.dispose(type);
			//this.removeWaitAvatar();
			//this._isDispose = true;
			this.stop();
			this.clear();
			if (type) {
				this._partHash.forEach(function (key: number, part: base.AvatarPart) {
					part.dispose();
				}, this);
				this._partHash = null;
			}
		}
	}
}