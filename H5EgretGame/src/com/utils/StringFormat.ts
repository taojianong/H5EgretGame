class StringFormat {


	public static toString(value: number = 0x000000): string {
		return "#" + value.toFixed(16);
	}

	public static toUint(color: string): number {
		return flash.tranint(String(color).replace(/#/g, "0x"));
	}

	public static getColorHtmlText(str: string, color: string = "#00ff00", size: number = 18): string {
		return "<font size=\'" + size + "\' color=\'" + color + "\'>" + str + "</font>";
	}

	public static getHtmlImage(url: string, width: number = 0, height: number = 0): string {
		return "<img src= \'" + url + "\' width=\'" + width + "\' height=\'" + height + "\'></img>";
	}

	/**
	 * 转换下html文本 cl 2018.4.3
	 * @param htmlTxt html文本
	 */
	public static switchHtmlString(htmlTxt: string): string {

		let str: string = htmlTxt.toLocaleLowerCase();
		// str = com.center.DynamicsScript.getInstance().replaceStringDynamicsValue(str);
		str = str.replace(/(\<\/p\>$)/gi, ""); //去掉最后一个</p>标签,避免多一个换行符
		str = str.replace(/\<p align="left"\>/gi, "");//fairygui不支持p标签
		//str = str.replace(/face="simsun"/gi , "");//去掉 face="simsun" 这个是宋体的意思
		str = str.replace(/\<\/p\>/gi, "\n");
		str = str.replace(/face=/gi, 'fontfamily=');
		str = str.replace(/kerning=/gi, '');
		str = str.replace(/letterspacing=/gi, '');
		return str;
	}

	public static replacJosnStr(str: string): string {
		let myPattern: RegExp = /\'/g;
		str = str.replace(myPattern, "\"");
		return str;
	}

	public static formatMoney(value: number, str: string = "", rate: number = 10000): string {
		if (<any>!str || str.length <= 0) {
			str = Global.lang.getLang("lang_client_398");
		}
		if (value >= rate) {
			return flash.tranint(value / rate) + str;
		}
		return value + "";
	}

	public static strToTime(Str: string): number {
		//$_FunctionStackLog.intoStack("com.components.utils::StringFormat/strToTime()");
		let tpArr: Array<any> = Str.split(":");
		let result: number = flash.trannumber(tpArr[0]) * 3600000 + flash.trannumber(tpArr[1]) * 60000;
		return result;
	}

	public static formatNum(value: number, useFormat: boolean = true): string {
		//$_FunctionStackLog.intoStack("com.components.utils::StringFormat/formatNum()");
		let pix: string = "";
		if (useFormat && value >= 1000000000) {
			value = flash.tranint(value / 100000000);
			pix = Global.lang.getLang("lang_client_404");//亿
		}
		else if (useFormat && value >= 1000000) {
			value = flash.tranint(value / 10000);
			pix = Global.lang.getLang("lang_client_405");//万
		}
		let strNum: string = value.toString();
		if (strNum.length > 3) {
			let arr: Array<any> = [];
			let start: number = 0;
			let end: number = strNum.length;
			while (end > 0) {
				start = Math.max(end - 3, 0);
				arr.unshift(strNum.slice(start, end));
				end = start;
			}
			strNum = arr.join(",");
		}
		return strNum + pix;
	}

	public static formatNumberToString(value: number, useFormat: boolean = true): string {
		//$_FunctionStackLog.intoStack("com.components.utils::StringFormat/formatNum()");
		let pix: string = "";
		if (useFormat && value >= 1000000000) {
			value = flash.tranint(value / 100000000);
			pix = "" + Global.lang.getLang("lang_client_404");//亿
		}
		else if (useFormat && value >= 1000000) {
			value = flash.tranint(value / 10000);
			pix = "" + Global.lang.getLang("lang_client_403");//万
		}
		else if (useFormat && value >= 10000) {
			value = flash.tranint(value / 10000);
			pix = "" + Global.lang.getLang("lang_client_403");//万
		}
		let strNum: string = value.toString();
		if (strNum.length > 3) {
			let arr: Array<any> = [];
			let start: number = 0;
			let end: number = strNum.length;
			while (end > 0) {
				start = Math.max(end - 3, 0);
				arr.unshift(strNum.slice(start, end));
				end = start;
			}
			strNum = arr.join(",");
		}
		return strNum + pix;
	}

	public static formatNumberToStringV2(value: number, useFormat: boolean = true): string {
		//$_FunctionStackLog.intoStack("com.components.utils::StringFormat/formatNum()");
		let pix: string = "";
		if (useFormat && value >= 100000000) {
			value = flash.tranint(value / 100000000);
			pix = "" + Global.lang.getLang("lang_client_404");//亿
		}
		else if (useFormat && value >= 10000) {
			value = flash.tranint(value / 10000);
			pix = "" + Global.lang.getLang("lang_client_405");//万
		}
		let strNum: string = value.toString();
		return strNum + pix;
	}

	public static getWeekDay($num: number): string {
		//$_FunctionStackLog.intoStack("com.components.utils::StringFormat/getWeekDay()");
		let arr: Array<any> = ["" + Global.lang.getLang("lang_client_406"), "" + Global.lang.getLang("lang_client_407"), "" + Global.lang.getLang("lang_client_408"), "" + Global.lang.getLang("lang_client_409"), "" + Global.lang.getLang("lang_client_410"), "" + Global.lang.getLang("lang_client_411"), "" + Global.lang.getLang("lang_client_412")];
		return arr[$num];
	}

	public static getChieseNum($num: number): string {
		//$_FunctionStackLog.intoStack("com.components.utils::StringFormat/getChieseNum()");
		let arr: Array<any> = ["" + Global.lang.getLang("lang_client_413"), "" + Global.lang.getLang("lang_client_407"), "" + Global.lang.getLang("lang_client_408"), "" + Global.lang.getLang("lang_client_409"), "" + Global.lang.getLang("lang_client_410"), "" + Global.lang.getLang("lang_client_411"), "" + Global.lang.getLang("lang_client_412"), "" + Global.lang.getLang("lang_client_420"), "" + Global.lang.getLang("lang_client_421"), "" + Global.lang.getLang("lang_client_422"), "" + Global.lang.getLang("lang_client_423")];
		return arr[$num];
	}

	public static numberToChinese(num: number): string {
		let arr: Array<any> = ["" + Global.lang.getLang("lang_client_413"), "" + Global.lang.getLang("lang_client_407"), "" + Global.lang.getLang("lang_client_408"), "" + Global.lang.getLang("lang_client_409"), "" + Global.lang.getLang("lang_client_410"), "" + Global.lang.getLang("lang_client_411"), "" + Global.lang.getLang("lang_client_412"), "" + Global.lang.getLang("lang_client_420"), "" + Global.lang.getLang("lang_client_421"), "" + Global.lang.getLang("lang_client_422"), "" + Global.lang.getLang("lang_client_423")];
		let nums: Array<any> = ["" + Global.lang.getLang("lang_client_435"), "" + Global.lang.getLang("lang_client_436"), "" + Global.lang.getLang("lang_client_437"), "" + Global.lang.getLang("lang_client_438"), "" + Global.lang.getLang("lang_client_439"), "" + Global.lang.getLang("lang_client_436"), "" + Global.lang.getLang("lang_client_437"), "" + Global.lang.getLang("lang_client_438"), "" + Global.lang.getLang("lang_client_404"), "" + Global.lang.getLang("lang_client_436")];
		let str: string = "";
		let numStr: string = num.toString();
		for (let i: number = 0; i < numStr.length; i++) {
			let n: number = flash.tranint(numStr.charAt(i));
			if (numStr.length <= 1) {
				str += arr[n];
			}
			else {
				let w: number = numStr.length - i - 1;
				if (n > 0) {
					if (w > 0) {
						str += (numStr.length == 2 && n == 1 ? "" : arr[n]) + nums[w];
					}
					else {
						str += arr[n];
					}
				}
				else if (numStr.length > 2 && w == 1) {
					if (flash.tranint(numStr.charAt(numStr.length - 1)) == 0 && flash.tranint(numStr.charAt(numStr.length - 2)) == 0)
					{ }
					else if (i == (numStr.length - 1))
					{ }
					else {
						str += arr[n];
					}
				}
			}
		}
		return str;
	}

	/**
	 * 转化时间格式
	 * @param time 时间
	 * @return 格式化为00:00:00格式
	 */
	public static formatToTime(time: number): string {
		time = Number(time.toFixed(0));
		let second: number = time % 60;
		let minute: number = ((time - second) / 60) % 60;
		let hour: number = (time - 60 * minute - second) / 3600;
		let strSecond: string = <any>second < 10 ? "0" + second.toString() : second.toString();
		let strMinute: string = <any>minute < 10 ? "0" + minute.toString() : minute.toString();
		let strHour: string = <any>hour < 10 ? "0" + hour.toString() : hour.toString();
		return strHour + ":" + strMinute + ":" + strSecond;
	}

	/**
	 * 将一个整数的时间值格式化为 0小时00分00秒 格式的时间值
	 * @param time 秒数
	 * @return 0小时00分00秒
	 */
	public static formatToTime_V2(time: number, showHour: boolean = true): string {
		let second: number = time % 60;
		let minute: number = ((time - second) / 60) % 60;
		let hour: number = (time - 60 * minute - second) / 3600;
		let strMinute: string = <any>minute == 0 ? "" : minute.toString() + Global.lang.getLang("lang_client_479");//分
		let strHour: string = <any>hour == 0 ? "" : hour.toString() + Global.lang.getLang("lang_client_455");//小时
		if (showHour) {
			return strHour + strMinute + second + Global.lang.getLang("lang_client_480");//秒
		}
		return strMinute + second + Global.lang.getLang("lang_client_480");//秒
	}

	/**
	 * 将一个整数的时间值格式化为 00小时00分 格式的时间值
	 * @param time 秒数
	 * @return {0}小时{0}分
	 */
	public static formatToTime_V3(time: number): string {
		let second: number = time % 60;
		let minute: number = ((time - second) / 60) % 60;
		let hour: number = (time - 60 * minute - second) / 3600;
		let strMinute: string = <any>minute == 0 ? "" : minute.toString() + Global.lang.getLang("lang_client_479");//分
		let strHour: string = <any>hour == 0 ? "" : hour.toString() + Global.lang.getLang("lang_client_455");//小时
		return strHour + strMinute;
	}

	/**
	 * 将一个整数的时间值格式化为 0天0小时0分 格式的时间值
	 * @param time 秒数
	 * @return {0}天{1}小时{2}分
	 */
	public static formatToTime_V4(time: number): string {
		let tian: number = flash.tranint(time / (24 * 3600));
		let hour: number = flash.tranint(time % (24 * 3600) / 3600);
		let min: number = flash.tranint(time % 3600 / 60);

		return tian + Global.lang.getLang("lang_client_454") + hour + Global.lang.getLang("lang_client_455") + min + Global.lang.getLang("lang_client_479");
	}

	/**
	 * 将一个整数的时间值格式化为 大于1天：  xx"天；	小于一"天：  NN小时；	小于1小时：MM分钟；	小于1分钟：1分钟；
	 * @param time 秒数
	 * @return 
	 */
	public static formatToTime_V5(time: number): string {
		let tian: number = flash.tranint(time / (24 * 3600));
		let hour: number = flash.tranint(time / 3600);
		let min: number = flash.tranint(time % 3600 / 60);
		if (tian > 0) {
			return tian + Global.lang.getLang("lang_client_454");//天
		}
		else if (hour > 0) {
			return hour + Global.lang.getLang("lang_client_455");//小时
		}
		else if (min > 0) {
			return min + Global.lang.getLang("lang_client_456");//分钟
		}
		else {
			return "" + Global.lang.getLang("lang_client_457");//1分钟
		}
	}

	public static formatToTime_V6(utc: number): string {

		let date: flash.As3Date = new flash.As3Date(utc * 1000);
		let hour: string = <any>date.hoursUTC < 10 ? '0' + date.hoursUTC : '' + date.hoursUTC;
		let minute: string = <any>date.millisecondsUTC < 10 ? '0' + date.millisecondsUTC : '' + date.millisecondsUTC;
		let second: string = <any>date.secondsUTC < 10 ? '0' + date.secondsUTC : '' + date.secondsUTC;
		//{0}月{1}日
		return date.monthUTC + 1 + Global.lang.getLang("lang_client_476") + date.dateUTC + Global.lang.getLang("lang_client_477") + hour + ':' + minute + ':' + second;
	}

	public static formatToTime_V7(utc: number): string {

		let date: flash.As3Date = new flash.As3Date(utc * 1000);
		let minute: number = date.minutes;
		let hour: number = date.hours;
		let strMinute: string = <any>minute == 0 ? "00" : minute.toString();
		let strHour: string = <any>hour == 0 ? "00" : hour.toString();
		return strHour + ':' + strMinute;
	}

	public static formatToTime_V8(time: number): string {

		let second: number = time % 60;
		let minute: number = ((time - second) / 60) % 60;
		let hour: number = (time - 60 * minute - second) / 3600;
		let strSecond: string = <any>second < 10 ? "0" + second + Global.lang.getLang("lang_client_480") : second + Global.lang.getLang("lang_client_480");//秒
		let strMinute: string = <any>minute < 10 ? "0" + minute + Global.lang.getLang("lang_client_456") : minute + Global.lang.getLang("lang_client_456");//分钟
		let strHour: string = <any>hour < 10 ? "0" + hour + Global.lang.getLang("lang_client_455") : hour + Global.lang.getLang("lang_client_455");//小时
		return strHour + strMinute + strSecond;
	}

	public static formatToTime_V9(time: number): string {

		if (time < 0) {
			return "" + Global.lang.getLang("lang_client_464");//已过期
		}
		let tian: number = flash.tranint(time / (24 * 3600));
		let hour: number = flash.tranint(time % (24 * 3600) / 3600);
		let min: number = flash.tranint(time % 3600 / 60);
		let sec: number = flash.tranint(time % 60);
		//天|小时|分钟
		return (tian > 0 ? tian + Global.lang.getLang("lang_client_454") : "") + (hour > 0 ? hour + Global.lang.getLang("lang_client_455") : "") + (min > 0 ? min + Global.lang.getLang("lang_client_456") : "") + (sec + Global.lang.getLang("lang_client_468"));
	}

	public static formatToTime_V10(time: number): string {

		let date: flash.As3Date = new flash.As3Date(time * 1000);
		let hour: string = <any>date.hours < 10 ? '0' + date.hours : '' + date.hours;
		let minute: string = <any>date.minutes < 10 ? '0' + date.minutes : '' + date.minutes;
		let second: string = <any>date.seconds < 10 ? '0' + date.seconds : '' + date.seconds;
		return date.month + 1 + Global.lang.getLang("lang_client_476") + date.date + Global.lang.getLang("lang_client_477") + " " + hour + ':' + minute + ':' + second;
	}

	public static formatToTime_V11(time: number): string {

		let tian: number = flash.tranint(time / (24 * 3600));
		let hour: number = flash.tranint(time % (24 * 3600) / 3600);
		let min: number = flash.tranint(time % 3600 / 60);
		let sec: number = flash.tranint(time % 60);
		//天|时|分|秒
		return (tian > 0 ? tian + Global.lang.getLang("lang_client_454") : "") + (hour > 0 ? hour + Global.lang.getLang("lang_client_478") : "") + (min > 0 ? min + Global.lang.getLang("lang_client_479") : "") + (sec + Global.lang.getLang("lang_client_480"));
	}

	public static formatToTime_V12(time: number): string {

		let date: flash.As3Date = new flash.As3Date(time * 1000);
		let hour: string = <any>date.hours < 10 ? '0' + date.hours : '' + date.hours;
		//月|日|时
		return date.month + 1 + Global.lang.getLang("lang_client_476") + date.date + Global.lang.getLang("lang_client_477") + hour + Global.lang.getLang("lang_client_478");
	}

	public static formatToTime_V13(time: number): string {

		let tian: number = flash.tranint(time / (24 * 3600));
		let hour: number = flash.tranint(time % (24 * 3600) / 3600);
		let min: number = flash.tranint(time % 3600 / 60);
		//天|小时
		return tian + Global.lang.getLang("lang_client_454") + hour + Global.lang.getLang("lang_client_455");
	}

	public static formatToTime_V14(time: number): string {

		let date: flash.As3Date = new flash.As3Date(time * 1000);
		let hour: string = <any>date.hours < 10 ? '0' + date.hours : '' + date.hours;
		let minute: string = <any>date.minutes < 10 ? '0' + date.minutes : '' + date.minutes;
		let second: string = <any>date.seconds < 10 ? '0' + date.seconds : '' + date.seconds;
		//月|日
		return date.month + 1 + Global.lang.getLang("lang_client_476") + date.date + Global.lang.getLang("lang_client_477") + " " + hour + ':' + minute;
	}

	public static formatToTime_V15(time: number): string {

		let date: flash.As3Date = new flash.As3Date(time * 1000);
		let hour: string = <any>date.hours < 10 ? '0' + date.hours : '' + date.hours;
		let minute: string = <any>date.minutes < 10 ? '0' + date.minutes : '' + date.minutes;
		let second: string = <any>date.seconds < 10 ? '0' + date.seconds : '' + date.seconds;
		return hour + ':' + minute;
	}

	/**
	 * 将秒数转化为01:18:56格式
	 * @param   time 		秒数
	 * @return  separator 	返回格式：01:08:56
	 **/
	public static convertTime(time: number, separator: string = ":"): string {
		let hour: number = flash.tranint(time / 3600);
		let min: number = flash.tranint(time % 3600 / 60);
		let sec: number = flash.tranint(time % 60);
		return (hour < 10 ? "0" + hour : "" + hour) + separator + (min < 10 ? "0" + min : "" + min) + separator + (sec < 10 ? "0" + sec : "" + sec);
	}

	/**
	 * 获取当天最大的UTC时间
	 * @return  utc	
	 */
	public static getTodayMaxUtc(): number {
		let date: flash.As3Date = new flash.As3Date(com.time.ServerTime.serverTime);
		date.setHours(23, 59, 59, 999);
		return flash.tranint(date.getTime() * 0.001);
	}

	/**
	 * 获取当天最小的UTC时间
	 * @return  utc	
	 */
	public static getTodayMinUtc(): number {
		let date: flash.As3Date = new flash.As3Date(com.time.ServerTime.serverTime);
		date.setHours(0, 0, 0, 0);
		return flash.tranint(date.getTime() * 0.001);
	}

	/**
	 * 解析时间间成当前时间间
	 * @param time
	 */
	public static resloveFormatLastLoginTime(time: number): string {
		let t: string = "";
		let d: flash.As3Date = new flash.As3Date(time * 1000);
		t = d.fullYear + Global.lang.getLang("lang_client_475") + (d.month + 1) + Global.lang.getLang("lang_client_476") + d.date + Global.lang.getLang("lang_client_477") +
			d.hours + Global.lang.getLang("lang_client_478") + d.minutes + Global.lang.getLang("lang_client_479") + d.seconds + Global.lang.getLang("lang_client_480");
		return t;
	}

	public static formatTimeToLog(time: number): string {

		let t: string;
		let d: flash.As3Date = new flash.As3Date(time);
		let hour: number = d.hours;
		let min: number = d.minutes;
		let sec: number = d.seconds;
		t = d.fullYear + "-" + (d.month + 1) + "-" + d.date + " " + (hour < 10 ? "0" + hour : "" + hour) + ":" + (min < 10 ? "0" + min : "" + min) + ":" + (sec < 10 ? "0" + sec : "" + sec) + ":" + d.milliseconds;
		return t;
	}

	public static resloveFormatHMS(time: number): string {

		let d: flash.As3Date = new flash.As3Date(time * 1000);
		let hour: number = d.hours;
		let min: number = d.minutes;
		let sec: number = d.seconds;
		return (hour < 10 ? "0" + hour : "" + hour) + ":" + (min < 10 ? "0" + min : "" + min) + ":" + (sec < 10 ? "0" + sec : "" + sec);
	}

	public static formatTimeToDay(time: number): string {

		let t: string = "";
		let d: flash.As3Date = new flash.As3Date(time * 1000);
		t = d.fullYear + Global.lang.getLang("lang_client_475") + (d.month + 1) + Global.lang.getLang("lang_client_476") + d.date + Global.lang.getLang("lang_client_477");//{0}年{1}月{2}日
		return t;
	}

	public static formatTimeToMin(time: number): string {

		let t: string = "";
		let d: flash.As3Date = new flash.As3Date(time * 1000);
		t = d.fullYear + Global.lang.getLang("lang_client_475") + (d.month + 1) + Global.lang.getLang("lang_client_476") + d.date + Global.lang.getLang("lang_client_477") + d.hours + Global.lang.getLang("lang_client_478") + d.minutes + Global.lang.getLang("lang_client_479");
		return t;
	}

	public static formatTimeToMin2(time: number): string {

		let t: string = "";
		let d: flash.As3Date = new flash.As3Date(time * 1000);
		t = d.fullYear + Global.lang.getLang("lang_client_475") + (d.month + 1) + Global.lang.getLang("lang_client_476") + d.date + Global.lang.getLang("lang_client_477") + (d.hours < 10 ? "0" + d.hours : "" + d.hours) + ":" + (d.minutes < 10 ? "0" + d.minutes : "" + d.minutes);
		return t;
	}

	public static formatTimeToSec2(time: number): string {

		let t: string = "";
		let d: flash.As3Date = new flash.As3Date(time * 1000);
		t = d.fullYear + Global.lang.getLang("lang_client_475") + (d.month + 1) + Global.lang.getLang("lang_client_476") + d.date + Global.lang.getLang("lang_client_477") + (d.hours < 10 ? "0" + d.hours : "" + d.hours) + ":" + (d.minutes < 10 ? "0" + d.minutes : "" + d.minutes) + ":" + (d.seconds < 10 ? "0" + d.seconds : "" + d.seconds);
		return t;
	}

	/**
	 * 00:00
	 * @param value 时间，秒
	 */
	public static formatTimeToMinSec(value: number): string {

		if (value < 0) return "00:00";
		let min: number = parseInt("" + (value / 60));
		let sec: number = parseInt("" + (value % 60));
		let t: string = (min >= 10 ? min : "0" + min) + ":" + (sec >= 10 ? sec : "0" + sec);
		return t;
	}

	/**
	 * {min}分{sec}秒:{min}分钟
	 * @param value 时间，秒
	 */
	public static formatTimeToMinSec2(value: number): string {
		let min: number = value / 60;
		let sec: number = value % 60;
		//{min}分{sec}秒:{min}分钟
		let t: string = <any>sec > 0 ? min + Global.lang.getLang("lang_client_479") + sec + Global.lang.getLang("lang_client_480") : min + Global.lang.getLang("lang_client_479") + Global.lang.getLang("lang_client_481");
		return t;
	}

	public static format(date: flash.As3Date = null, formatStr: string = "Y-M-D h:m:s"): string {

		if (date == null) {
			date = new flash.As3Date();
		}
		let year: number = date.fullYear;
		let month: number = date.month + 1;
		let day: number = date.date;
		let hours: string = <any>((date.hours > 9) ? "" : "0") + date.hours;
		let minutes: string = <any>((date.minutes > 9) ? "" : "0") + date.minutes;
		let seconds: string = <any>((date.seconds > 9) ? "" : "0") + date.seconds;
		return year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds
		//return formatStr.replace("Y", year).replace("M", month).replace("D", day).replace("h", hours).replace("m", minutes).replace("s", seconds);
	}

	public static formatV2(time: number, formatStr: string = "Y-M-D h:m:s"): string {

		let date: flash.As3Date = new flash.As3Date(time * 1000);
		let year: number = date.fullYear;
		let month: string = <any>(date.month + 1) < 10 ? "0" + String(date.month + 1) : String(date.month + 1);
		let day: string = <any>date.date < 10 ? "0" + date.date.toString() : date.date.toString();
		let hours: string = <any>((date.hours > 9) ? "" : "0") + date.hours;
		let minutes: string = <any>((date.minutes > 9) ? "" : "0") + date.minutes;
		let seconds: string = <any>((date.seconds > 9) ? "" : "0") + date.seconds;
		return year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;
		//return formatStr.replace("Y", year).replace("M", month).replace("D", day).replace("h", hours).replace("m", minutes).replace("s", seconds);
	}

	/**
	 * 多少秒(分钟|小时|天)前
	 * @param startTime 开始时间,毫秒
	 */
	public static timeBackTo(startTime: number): string {

		let nowTime: number = com.time.ServerTime.getServerTime() * 1000; //new flash.As3Date().time;
		let t: number = parseInt("" + (nowTime - startTime) / 1000);//秒
		let str: string = "";
		if (t < 60) {
			str = parseInt("" + t) + Global.lang.getLang("lang_client_480");//秒
		} else if (t < 3600) {
			str = parseInt("" + (t / 60)) + Global.lang.getLang("lang_client_456"); //分钟
		} else if (t < 86400) {//24 * 3600
			str = parseInt("" + (t / 3600)) + Global.lang.getLang("lang_client_455");//小时
		} else {
			str = parseInt("" + (t / 86400)) + Global.lang.getLang("lang_client_454");//天
		}
		return Global.lang.getLang("lang_panel_63", str);//{0}前
	}

	public static getSubstitute(str: string, ...rest): string {

		if (<any>!str) {
			return "";
		}
		let len: number = rest.length;
		let args: Array<any>;
		if (len == 1 && flash.As3is(rest[0], Array)) {
			args = rest[0];
			len = args.length;
		}
		else {
			args = rest;
		}
		for (let i: number = 0; i < len; i++) {
			str = str.replace(new RegExp("\\{" + i + "\\}", "g"), args[i]);
		}
		return str;
	}

	public static getIndexStr(str: string, index: number, sign: string = ';', start: number = 0, end: number = 0): string {

		if (str == null || str == "" || index <= 0) {
			return "";
		}
		let arr: Array<any> = str.split(sign);
		if (arr != null) {
			let tempStr: string = <any>arr[index - 1];
			return tempStr;
		}
		return "";
	}

	// public static getAttributeByFormat(attribute: string): flash.Dictionary {
	// 	let baseBean: com.game.data.common.BaseAttributeDataBean = new com.game.data.common.BaseAttributeDataBean();
	// 	baseBean.convert(attribute);
	// 	let dic: flash.Dictionary = new flash.Dictionary();
	// 	dic.setItem("dc", baseBean.dcMin + "-" + baseBean.dcMax);
	// 	dic.setItem("mc", baseBean.mcMin + "-" + baseBean.mcMax);
	// 	dic.setItem("sc", baseBean.scMin + "-" + baseBean.scMax);
	// 	dic.setItem("ac", baseBean.acMin + "-" + baseBean.acMax);
	// 	dic.setItem("mac", baseBean.macMin + "-" + baseBean.macMax);
	// 	dic.setItem("maxHp", baseBean.maxHp);
	// 	dic.setItem("holyAtk", baseBean.holyAtk);
	// 	dic.setItem("hit", baseBean.hit);
	// 	return dic;
	// }

	// public static getAllAttributeByFormat(attribute: string): flash.Dictionary {
	// 	let baseBean: com.game.data.common.BaseAttributeDataBean = new com.game.data.common.BaseAttributeDataBean();
	// 	baseBean.convert(attribute);
	// 	let dic: flash.Dictionary = new flash.Dictionary();
	// 	dic.setItem("dcMin", baseBean.dcMin);
	// 	dic.setItem("dcMax", baseBean.dcMax);
	// 	dic.setItem("mcMin", baseBean.mcMin);
	// 	dic.setItem("mcMax", baseBean.mcMax);
	// 	dic.setItem("scMin", baseBean.scMin);
	// 	dic.setItem("scMax", baseBean.scMax);
	// 	dic.setItem("acMin", baseBean.acMin);
	// 	dic.setItem("acMax", baseBean.acMax);
	// 	dic.setItem("macMin", baseBean.macMin);
	// 	dic.setItem("macMax", baseBean.macMax);
	// 	dic.setItem("maxHp", baseBean.maxHp);
	// 	dic.setItem("holyAtk", baseBean.holyAtk);
	// 	dic.setItem("hit", baseBean.hit);
	// 	return dic;
	// }

	// public static getAllAttributeFormat(attr: string): Array<any> {
	// 	let dic: flash.Dictionary = StringFormat.getAllAttributeByFormat(attr);
	// 	let arr: Array<any> = [];
	// 	for (let forinvar__ in dic.map) {
	// 		let key = dic.map[forinvar__][0];
	// 		if (dic.getItem(key) == 0) {
	// 			continue;
	// 		}
	// 		let k: string = key.replace("Min", "");
	// 		k = key.replace("Max", "");
	// 		let o: any = {};
	// 		if (k == "dc")
	// 			o["name"] = "" + Global.lang.getLang("lang_client_503") ;
	// 		if (k == "mc")
	// 			o["name"] = "" + Global.lang.getLang("lang_client_504") ;
	// 		if (k == "ac")
	// 			o["name"] = "" + Global.lang.getLang("lang_client_505") ;
	// 		if (k == "mac")
	// 			o["name"] = "" + Global.lang.getLang("lang_client_506") ;
	// 		if (k == "maxHp")
	// 			o["name"] = "" + Global.lang.getLang("lang_client_507") ;
	// 		if (k == "holyAtk")
	// 			o["name"] = "" + Global.lang.getLang("lang_client_508") ;
	// 		if (k == "hit")
	// 			o["name"] = "" + Global.lang.getLang("lang_client_509") ;
	// 		if (k == "sc")
	// 			o["name"] = "" + Global.lang.getLang("lang_client_510") ;
	// 		if (<any>!o["name"]) {
	// 			continue;
	// 		}
	// 		if (key.indexOf("Min") != -1 || key.indexOf("Max") != -1) {
	// 			o["min"] = dic.getItem(k + "Min");
	// 			if (dic.getItem("hasOwnProperty")(k + "Max")) {
	// 				o["max"] = dic.setItem(k + "Max", dic.getItem(k + "Max"));
	// 			}
	// 			delete o[k + "Min"];
	// 			delete o[k + "Max"];
	// 		}
	// 		else {
	// 			o["min"] = dic.getItem(k);
	// 		}
	// 		o["key"] = k;
	// 		arr.push(o);
	// 	}
	// 	return arr;
	// }

	public static getDictionaryByJson(jsonStr: string): flash.Dictionary {
		if (jsonStr == null || jsonStr.length <= 0) {
			return null;
		}
		let reg: RegExp = /([{,，])\s*([0-9a-zA-Z一-龟]+)\s*:/g;
		let temp: string = jsonStr.replace(reg, "$1\"$2\":");
		let tempJson: string = temp;
		let tempObj: any = <any>JSON.parse(tempJson);
		let dic: flash.Dictionary = new flash.Dictionary();
		for (let i in tempObj) {
			dic.setItem(String(i), tempObj[i]);
		}
		return dic;
	}

	public static formatToJson(txt: string): string {
		txt = "{" + txt.substring(1, txt.length - 1) + "}";
		let reg: RegExp = /([{,，])\s*([0-9a-zA-Z一-龟]+)\s*:/g;
		let temp: string = txt.replace(reg, "$1\"$2\":");
		return temp;
	}

	public static getArrayByJson(jsonStr: string): Array<any> {
		if (jsonStr == null || jsonStr.length <= 0) {
			return [];
		}
		let reg: RegExp = /([{,，])\s*([0-9a-zA-Z一-龟]+)\s*:/g;
		let temp: string = jsonStr.replace(reg, "$1\"$2\":");
		let tempJson: string = temp;
		//tempJson = tempJson.replace(/\'/g,"\"");//cl 2018.6.16
		let tempObj: any = <any>JSON.parse(tempJson);
		let arr: Array<any> = new Array();
		for (let i in tempObj) {
			arr.push(tempObj[i]);
		}
		return arr;
	}

	public static getObjectByJson(jsonStr: string): any {
		if (jsonStr == null || jsonStr.length <= 0) {
			return null;
		}
		let reg: RegExp = /([{,，])\s*([0-9a-zA-Z一-龟]+)\s*:/g;
		let temp: string = jsonStr.replace(reg, "$1\"$2\":");
		let tempJson: string = temp;
		let tempObj: any = <any>JSON.parse(tempJson);
		return tempObj;
	}

	public static getTipStrByAattribute(str: string): string {
		str = str.replace("[", "").replace("]", "").replace(/\,/g, "\n");
		return str;
	}
}