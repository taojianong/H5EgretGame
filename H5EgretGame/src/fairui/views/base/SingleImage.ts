module base {
	export class SingleImage {
		public bitmapData: egret.Texture;
		public width: number = 0;
		public height: number = 0;
		public offsetX: number = 0;
		public offsetY: number = 0;
		public frameNum: number = 0;
		public imageName: string;
		public delayTime: number = 0;
		public x: number = 0;
		public y: number = 0;
		protected _isDispose: boolean = false;

		public constructor(bitmapdata?: egret.Texture) {
			this.bitmapData = bitmapdata;
			if (this.bitmapData) {
				this.width = this.bitmapData.textureWidth;
				this.height = this.bitmapData.textureHeight;
			}
		}

		public get isDispose(): boolean {
			return this._isDispose;
		}

		public dispose() {
			if (this.bitmapData) {
				this.bitmapData.dispose();
			}
			this.bitmapData = null;
			this.width = 0;
			this.height = 0;
			this.offsetX = 0;
			this.offsetY = 0;
			this.frameNum = 0;
			this.imageName = null;
			this._isDispose = true;
		}
	}
}