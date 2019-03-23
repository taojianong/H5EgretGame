module base {
	export class AysncAnimator extends Animator {
		
		public constructor() {
			super();
		}

		public getImage(index: number): SingleImage {
			let image: SingleImage
			if (this.isDispose == false) {
				image = super.getImage(index);
				if (!image.bitmapData)
					image.bitmapData = this.createTexture(image.imageName, image.x, image.y, image.width, image.height);
			}
			return image;
		}
		
		public dispose() {
			super.dispose();
		}
	}
}