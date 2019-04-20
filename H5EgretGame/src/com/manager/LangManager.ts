/**
 * 多语言管理类
 * @author clong 2019.3.23
 */
class LangManager {

	private data: Object;

	public constructor() {
		this.data = new Object();
	}
	/**
	 * 获取多语言
	 * @param code 对应json键值
	 * @param ...args 对应占位符参数
	 */
	public getLang(code: string, ...args): string {
		let str: string = <any>this.data[code] || code;
		if (args.length > 0) {
			for (let i: number = 0, n: number = args.length; i < n; i++) {
				str = str.replace("{" + i + "}", args[i]);
			}
		}
		return str;
	}

	/**
	 * 获取多语言
	 * @param code 对应json键值
	 * @param args 对应占位符参数 [string]
	 */
	public getLangBy(code: string, args: Array<string>): string {
		let str: string = <any>this.data[code] || code;
		if (args.length > 0) {
			for (let i: number = 0, n: number = args.length; i < n; i++) {
				str = str.replace("{" + i + "}", args[i]);
			}
		}
		return str;
	}
}