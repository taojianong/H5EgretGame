/**
 * yanfaqiang
 * 数组操作类
 */
class ArrayUtil {

	/**降序 desc*/
	public static readonly DESCENDING:string = "desc";
	/**升序 asc*/
	public static readonly NUMERIC :string = "asc";

	/**
	 * 对象数组排序
	 * @param arr 	要排序的数组
	 * @param props 要排序的属性 [{ "name": "asc"},{ "value": "desc" }]  asc 为升序，desc为降序
	 * 参考：https://segmentfault.com/a/1190000005717963
	 * 
	 */
	public static sortOn( arr:Array<any> , props:Array<Object> ):Array<any>{

		return arr.sort( function(a,b){
			let arr:Array<any> = [a,b];
			arr = arr.concat( props );
			return ArrayUtil.sortByProps.apply( null , arr );
		} );
	}

	private static sortByProps( item1 , item2 , ...params): number {
		"use strict";
		let props = [];
		for (let _i = 2; _i < arguments.length; _i++) {
			props[_i - 2] = arguments[_i];
		}

		let cps = []; // 存储排序属性比较结果。
		// 如果未指定排序属性，则按照全属性升序排序。    
		let asc = true;
		if (props.length < 1) {
			for (let p in item1) {
				if (item1[p] > item2[p]) {
					cps.push(1);
					break; // 大于时跳出循环。
				} else if (item1[p] === item2[p]) {
					cps.push(0);
				} else {
					cps.push(-1);
					break; // 小于时跳出循环。
				}
			}
		} else {
			for (let i = 0; i < props.length; i++) {
				let prop = props[i];
				for (let o in prop) {
					asc = prop[o] === ArrayUtil.NUMERIC;// "asc";
					if (item1[o] > item2[o]) {
						cps.push(asc ? 1 : -1);
						break; // 大于时跳出循环。
					} else if (item1[o] === item2[o]) {
						cps.push(0);
					} else {
						cps.push(asc ? -1 : 1);
						break; // 小于时跳出循环。
					}
				}
			}
		}

		for (let j = 0; j < cps.length; j++) {
			if (cps[j] === 1 || cps[j] === -1) {
				return cps[j];
			}
		}
		return 0;
	}

	/**
	 * 移除数组对象（不要求数组里对象顺序的移除操作可以用此函数）
	 * @value	数组
	 * @i		移除某下标对象
	 */
	public static Remove(value: Array<any>, i: number): void {
		value[i] = value[value.length - 1];
		value.pop();
	}

	/**
	 * 随机化数组
	 * @param value 要混淆的原始数组
	 * @param length 要返回混淆后对应长度的数组
	 * **/
	public static randomArray(value: Array<any>, length: number = 6): Array<any> {
		let arr: Array<any> = value.slice(); //克隆数组,只能克隆非引用数组
		if (arr != null) {
			let rnd: number;
			let temp: any;
			let len: number = arr.length;
			for (let i: number = 0; i < len; i++) {
				temp = arr[i];
				rnd = Math.floor(Math.random() * len);
				arr[i] = arr[rnd];
				arr[rnd] = temp;
			}
			arr = arr.slice(0, length);
		}
		return arr;
	}

	/**
	 * 获取分页页数
	 * @param	arr   要分页的数组
	 * @param	items 分页条目数
	 * @return
	 */
	public static getPages(arr: Array<any>, items: number = 5): number {

		let pages: number = 0;
		if (arr && arr.length > 0) {
			pages = (arr.length % items) > 0 ? parseInt("" + (arr.length / items)) + 1 : parseInt("" + (arr.length / items));
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
	public static getPageList(arr: Array<any>, page: number = 1, items: number = 5): Array<any> {

		let newArr: Array<any> = new Array;
		/*
		* 根据当前数组长度得到总页数
		*/
		let pages: number = 0;
		if (arr.length > 0) {
			pages = (arr.length % items) > 0 ? parseInt("" + (arr.length / items)) + 1 : parseInt("" + (arr.length / items));
		} else {
			pages = 0;
			return newArr;
		}
		if (page > pages) {
			return null;
		}

		let min: number = (page - 1) * items;
		let max: number = page * items;
		if (parseInt("" + (arr.length % items)) == 0) {
			max = page * items;
		} else {
			max = page == pages ? (page - 1) * items + parseInt("" + (arr.length % items)) : page * items;
		}

		for (let i: number = min; i < max; i++) {
			newArr.push(arr[i]);
		}
		return newArr;
	}
	/**
	 * 数组排序
	 * @param propertyName scdName 属性层级
	 * @param reverse 顺序还是倒叙（1或-1）
	 */
	public static createComparisonFunction(propertyName: string[], scdName: string[], reverse: number = 1) {
		return function (object1, object2) {
			let value1: any;
			let value2: any;
			for (let i = 0; i < propertyName.length; i++) {
				if (value1 == null) value1 = object1[propertyName[i]];
				else value1 = value1[propertyName[i]];
				if (value2 == null) value2 = object2[propertyName[i]];
				else value2 = value2[propertyName[i]];
			}

			let val: any;
			let val2: any;
			for (let i = 0; i < scdName.length; i++) {
				if (val == null) val = object1[scdName[i]];
				else val = val[scdName[i]];
				if (val2 == null) val2 = object2[scdName[i]];
				else val2 = val2[scdName[i]];
			}
			if (!val || value1 < value2) {
				return -1 * reverse;
			} else if (!val2 || value1 > value2) {
				return 1 * reverse;
			} else {
				if (val < val2) {
					return -1 * reverse;
				} else if (val > val2) {
					return 1 * reverse;
				}
				return 0;
			}
		};
	}

}