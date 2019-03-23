module base {

	/**
	 * 粒子效果
	 */
	export class GParticle extends GSprite {

		private _texture: egret.Texture;
		private _config: any;
		private system: particle.GravityParticleSystem;
		private _url1: string;
		private _url2: string;
		private _playType: boolean = true;
		public constructor(imgPath: string, jsonPath: string) {
			super();
			this.init(imgPath, jsonPath);
		}
		//创建
		private init(imgPath: string, jsonPath: string): void {
			this._url1 = imgPath;
			this._url2 = jsonPath;
			if (Config.useParticleType) {
				RES.getResByUrl(imgPath, function (texture: egret.Texture): void {
					this._texture = texture;
					this.create();
				}, this, RES.ResourceItem.TYPE_IMAGE);
				RES.getResByUrl(jsonPath, function (data: any): void {
					this._config = data;
					this.create();
				}, this, RES.ResourceItem.TYPE_JSON);
			}
		}

		private create(): void {
			if (this._texture && this._config) {
				this.system = new particle.GravityParticleSystem(this._texture, this._config);
				this.addChild(this.system);
				if (this._playType)
					this.system.start();
			}
		}

		public play() {
			if (this.system)
				this.system.start();
			this._playType = true;
		}

		public stop() {
			if (this.system)
				this.system.stop();
			this._playType = false;
		}

		public dispose(type?: boolean) {
			super.dispose(type);
			this._texture = null;
			this._config = null;
			this.system = null;
			if (type) {
				RES.destroyRes(this._url1);
				RES.destroyRes(this._url2);
			}		
		}
	}
}