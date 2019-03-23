/**
 * 日志管理类
 * @author clong 2019.3.23
 */
class LogManager {

	/**是否强制在控制台输出日志信息*/
	public isShowLogType: boolean = false;

	public constructor() {
	}

	public log(...args) {

		console.log(args);
	}

	/**在Debug模式下输出一个日志信息到控制台。 LogManager.isShowLogType控制是否强制输出日志*/
	public debug(...args) {

		if (this.isShowLogType || Global.isDebug)
			egret.log("Debug Log：", args);
	}

	public error(...args) {
		try {
			let str: string = "Error Start.\n";
			egret.error("Error Log：", args);
			if (args instanceof Array) { //如果是数组
				for (let index in args) {
					if (typeof args[index] === "object" && args[index]["stack"]) { //如果是标准的Egret报错
						str += "Error Stack:" + args[index].stack + "\n";
					}
					else {
						str += "Error TXT:" + args[index] + "\n";
					}
				}
			}
			else
				str = args;
			if (!Global.isDebug) {//Releas版的错误日志要上报
				// WebParams.setErrorLog(App.lang.getLang("lang_client_760"), str);
			}
			// fairui.OpenUIManager.getInstance().openDebugUI(str + "Error End.");
		}
		catch (e) {
			let txt: string = "LogManager.error() Error：" + e.toString();
			alert(txt);
			egret.error(txt);
		}
	}

	public warn(...args) {
		if (Global.isDebug)
			egret.warn("Warn Log：", args);
	}
	
}