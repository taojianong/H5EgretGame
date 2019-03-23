module com.utils{

    export class ObjectUtils{

        /**灰色滤镜 */
        //private static grayFilter:egret.ColorMatrixFilter = new egret.ColorMatrixFilter([0.3086, 0.6094, 0.082, 0, 0, 0.3086, 0.6094, 0.082, 0, 0, 0.3086, 0.6094, 0.082, 0, 0, 0, 0, 0, 1, 0]);
        private static grayFilter:egret.ColorMatrixFilter = new egret.ColorMatrixFilter([
																0.3,0.6,0,0,0,
																0.3,0.6,0,0,0,
																0.3,0.6,0,0,0,
																0,0,0,1,0
															]);
		
        /**
         * 添加滤镜
         * @param targe 
         * @param filter 如egret.ColorMatrixFilter
        */
		public static addFilter(target:fairygui.GObject | egret.DisplayObject, filter:any ):void 
		{
			let filters:Array<any> = target.filters || [];
			filters.push(filter);
			target.filters = filters;
		}

		/**让显示对象变成灰色*/
		public static gray(traget:fairygui.GObject | egret.DisplayObject, isGray:Boolean = true):void 
		{
			
			if (isGray) {
				this.addFilter(traget, this.grayFilter);
			} else {
				this.clearFilter(traget, egret.ColorMatrixFilter);
			}
		}

        /**清除滤镜*/
		public static clearFilter(target:fairygui.GObject | egret.DisplayObject, filterType:any=null):void 
		{
			var filters:Array<any> = target.filters;
			if (filters != null && filters.length > 0) {
				for (var i:number = filters.length - 1; i > -1; i--) {
					var filter:any = filters[i];
					if ( filterType == null || filter instanceof filterType) {
						filters.splice(i, 1);
					}
				}
				target.filters = filters;
			}
		}
    }
}