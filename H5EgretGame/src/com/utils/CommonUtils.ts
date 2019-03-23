module com.utils {

	/**
	 * 公用类
	 * @author cl 2018.4.27
	 */
	export class CommonUtils {
		
		/**
		 * 获取分页页数
		 * @param	arr   要分页的数组
		 * @param	items 分页条目数
		 * @return
		 */
		public static getPages(arr:Array<any>, items:number= 5):number{
			
			var pages:number= 0;
			if (arr && arr.length > 0) {				
				pages = (arr.length % items) > 0 ? parseInt(""+(arr.length / items)) + 1 : parseInt( "" + (arr.length / items) );				
			} else {				
				pages = 0;
			}
			return pages || 1;
		}
		
		/*************************************************
		 * 按照arr的数组进行分页处理
		 * arr = [0,1,2,3,4,5,6],page为当前页，items为每页的条数
		 * 页数从1开始
		 * @param arr   要分割的数组
		 * @param page  当前页数
		 * @param items 每页页数条目
		 */
		public static getPageList(arr:Array<any>, page:number= 1, items:number= 5):Array<any> {
			
			var newArr:Array<any> = new Array;
			/*
			* 根据当前数组长度得到总页数
			*/
			var pages:number= 0;
			if (arr.length > 0) {				
				pages = (arr.length % items) > 0 ? parseInt( "" + (arr.length / items)) + 1 : parseInt( "" + (arr.length / items) );				
			} else {				
				pages = 0;
				return newArr;
			}
			if (page > pages) {
				return null;
			}
			
			var min:number= (page - 1) * items;
			var max:number= page * items;
			if ( parseInt( "" + (arr.length % items) ) == 0) {				
				max = page * items;
			} else {				
				max = page == pages ? (page - 1) * items + parseInt( "" + (arr.length % items) ) : page * items;
			}
			
			for (var i:number= min; i < max; i++) {			
				newArr.push(arr[i]);
			}
			return newArr;
		}
	}
}