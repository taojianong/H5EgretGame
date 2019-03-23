module com.manager {
	export class AssetManager {
		/**图片资源*/
		public imgMap: flash.Dictionary;
		/**XLL动画资源*/
		public resMap: flash.Dictionary;
		/**二进制资源*/
		public byteMap: flash.Dictionary;
		/**文本资源*/
		public txtMap: flash.Dictionary;

		public constructor() {
			this.imgMap = new flash.Dictionary();
			this.resMap = new flash.Dictionary();
			this.byteMap = new flash.Dictionary();
			this.txtMap = new flash.Dictionary();
		}
		/**
		 * 缓存图片资源
		 * @param name 资源url
		 */
		public setImgAsset(name: string, data: egret.Texture) {
			this.imgMap.setItem(name, data);
		}
		/**
		 * 获得图片资源缓存
		 * @param name 资源url
		 * @return Texture
		 */
		public getImgAsset(name: string): egret.Texture {
			return this.imgMap.getItem(name);
		}
		/**
		 * 缓存图片资源
		 * @param name 资源url
		 * @return boolean
		 */
		public deleteImgAsset(name: string): boolean {
			let bitmapData: egret.Texture = this.imgMap.getItem(name);
			if (bitmapData) {
				bitmapData.dispose();
				this.imgMap.delItem(name);
				return true;
			}
			return false;
		}
		/**
		 * 缓存动画资源
		 * @param name 资源url
		 * @return Animator
		 */
		public setResAsset(name: string, data: base.Animator | base.AysncAnimator) {
			this.resMap.setItem(name, data);
		}
		/**
		 * 获得动画资源缓存
		 * @param name 资源url
		 * @return Animator
		 */
		public getResAsset(name: string): base.Animator {
			return this.resMap.getItem(name);
		}
		/**
		 * 删除指定的动画资源
		 * @param name 资源url
		 * @return boolean
		 */
		public deleteResAsset(name: string): boolean {
			let animator: base.Animator = this.getResAsset(name);
			if (animator) {
				animator.dispose();
				this.resMap.delItem(name);
				return true;
			}
			return false;
		}
		/**删除所有的动画资源*/
		public deleteAllResAsset() {
			this.resMap.forEach(function (key, data: base.Animator) {
				if (!data.isCache) {
					data.dispose();
					this.resMap.delItem(key);
				}
			}, this);
			//this.resMap.destroy();
		}
		/**
		 * 缓存二进制资源
		 * @param name 资源url
		 * @return ByteArray
		 */
		public setByteAsset(name: string, data: egret.ByteArray) {
			this.byteMap.setItem(name, data);
		}
		/**
		 * 获得二进制资源
		 * @param name 资源url
		 * @return ByteArray
		 */
		public getByteAsset(name: string): egret.ByteArray {
			return this.byteMap.getItem(name);
		}
		/**
		 * 缓存文本资源
		 * @param name 资源url
		 * @return ByteArray
		 */
		public setTxtAsset(name: string, data: string) {
			this.txtMap.setItem(name, data);
		}
		/**
		 * 获得文本资源
		 * @param name 资源url
		 * @return any
		 */
		public getTxtAsset(name: string): any {
			return this.txtMap.getItem(name);
		}
		/**
		 * 根据资源类型获得该资源缓存
		 * @param type 资源类型 EnumLoader
		 * @param name 资源url
		 * @return any
		 */
		public getTypeAsset(type: number, name: string): any {
			let data: any;
			switch (type) {
				case EnumLoader.BYTE:
					data = this.getByteAsset(name);
					break;
				case EnumLoader.RES:
					data = this.getResAsset(name);
					break;
				case EnumLoader.IMG:
					data = this.getImgAsset(name);
					break;
				case EnumLoader.TXT:
					data = this.getTxtAsset(name);
					break;
			}
			return data;
		}

		public hasClass(name: string): boolean {
			return RES.hasRes(name);
		}

		public getAsset(name: string): any {
			return RES.getRes(name);
		}
	}
}