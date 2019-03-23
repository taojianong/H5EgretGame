module fairui {

	/**
	 * 灵子特效
	 * @author cl 2018.6.28
	 */
	export class SpringEffect {

		public constructor() {
		}

		/**
		 * 经验飞翔特效 
		 * @param startPos	起始点，如果不传则为鼠标处
		 * @param targetPos	目标点
		 * @param complete  完成事件
		 * @param parent	容器
		 */
		public static play( startPos: egret.Point = null , targetPos: egret.Point = null , complete:Function = null , completeParams:Array<any> = null , parent:BaseSprite = null ): void {
			
			if (targetPos == null) {
				return;
			}

			let _star:Array<number> = [5, 2, 6, 4, 1, 2, 2, 5, 3, 1, 5, 4, 6, 3, 1];
			let _self:fairui.SpringEffect = this;
			if (startPos == null) {
				startPos = new egret.Point(App.stageX, App.stageY);
			}

			if (parent == null) {
				parent = FairyUIManager.tipLayer;
			}
			var area: number = 60;
			let img:ELoader = null;
			for (var i: number = 0; i < _star.length; i++) {
				img = new ELoader();
				img.setFairySource( "common" , "img_particle_" + _star[i] );
				if (_star[i] == 2 || _star[i] == 3 || _star[i] == 4) {
					img.scaleX = 0.6;
					img.scaleY = 0.6;
				}
				img.x = startPos.x - img.width * 0.5;
				img.y = startPos.y - img.height * 0.5;
				parent.addChild(img.displayObject);

				//TweenLite.to(img, 0.2, { x: startPos.x + (area - Math.random() * area * 2), y: startPos.y + (area - Math.random() * area * 2), ease: Linear.easeInOut, onComplete:onStartOver, onCompleteParams: [img, i, targetPos] });
			}

			function onStartOver(img: ELoader, i: number, targetPos: egret.Point ): void {

				if (targetPos != null) {
					var offset: number = 50 * img.scaleX;
					//TweenLite.to(img, 0.5, { delay: i * 0.01, x: targetPos.x - offset, y: targetPos.y - offset, onComplete: onFlyOver, onCompleteParams: [img, i], ease: Linear.easeOut });
				}
			}

			function onFlyOver(img: ELoader, i: number ): void {
				if (i == _star.length - 1) {
					if( complete != null ){
						complete.apply( complete["owner"] , completeParams );
					}
				}
				if( img != null ){
					img.dispose();
					img = null;
				}			
			}
		}
	}
}