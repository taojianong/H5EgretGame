/**
 * 日志管理类
 * @author clong 2019.3.23
 */
class LogManager {

	/**是否强制在控制台输出日志信息*/
	public isShowLogType: boolean = false;

	public constructor() {
	}

	public log( thisObj:any , ...args ):void {

		let clsName:string = this.getClassName( thisObj );
		args.unshift("[console.log][" + clsName + "] "  );
		console.log.apply( thisObj , args );
	}

	/**在Debug模式下输出一个日志信息到控制台。 LogManager.isShowLogType控制是否强制输出日志*/
	public debug( thisObj:any , ...args ):void {

		if (this.isShowLogType || Global.isDebug) {

			let clsName:string = this.getClassName( thisObj );
			args.unshift( "[debug][" + clsName + "] " );
			egret.log.apply(null, args);
		}
	}

	public error( thisObj:any , ...args ):void {

		try {
			
			let clsName:string = this.getClassName( thisObj );
			args.unshift("[error][" + clsName + "] "  );
			egret.error.apply(null, args);

			let str: string = "Error Start.\n";
			if (args instanceof Array) { //如果是数组
				for (let index in args) {
					if (typeof args[index] === "object" && args[index]["stack"]) { //如果是标准的Egret报错
						str += "Error Stack:" + args[index].stack + "\n";
					}
					else {
						str += "Error TXT:" + args[index] + "\n";
					}
				}
			} else {
				str = args;
			}

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

	/**
	 * 警告日志
	 */
	public warn(thisObj: any, ...args):void {

		if (Global.isDebug) {

			let clsName:string = this.getClassName( thisObj );
			args.unshift("[warn][" + clsName + "] ");
			egret.warn.apply(null, args);
		}
	}

	private getClassName( thisObj: any ): string {
		
		if( thisObj == null ){
			return "";
		}
		if (typeof (thisObj) == "string") {
			return String(thisObj);
		}
		var fullNames: string[] = egret.getQualifiedClassName(thisObj).split("::");
		return fullNames[fullNames.length - 1];
	}
}