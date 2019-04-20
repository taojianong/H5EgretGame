var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var StringFormat = (function () {
    function StringFormat() {
    }
    StringFormat.toString = function (value) {
        if (value === void 0) { value = 0x000000; }
        return "#" + value.toFixed(16);
    };
    StringFormat.toUint = function (color) {
        return flash.tranint(String(color).replace(/#/g, "0x"));
    };
    StringFormat.getColorHtmlText = function (str, color, size) {
        if (color === void 0) { color = "#00ff00"; }
        if (size === void 0) { size = 18; }
        return "<font size=\'" + size + "\' color=\'" + color + "\'>" + str + "</font>";
    };
    StringFormat.getHtmlImage = function (url, width, height) {
        if (width === void 0) { width = 0; }
        if (height === void 0) { height = 0; }
        return "<img src= \'" + url + "\' width=\'" + width + "\' height=\'" + height + "\'></img>";
    };
    /**
     * 转换下html文本 cl 2018.4.3
     * @param htmlTxt html文本
     */
    StringFormat.switchHtmlString = function (htmlTxt) {
        var str = htmlTxt.toLocaleLowerCase();
        // str = com.center.DynamicsScript.getInstance().replaceStringDynamicsValue(str);
        str = str.replace(/(\<\/p\>$)/gi, ""); //去掉最后一个</p>标签,避免多一个换行符
        str = str.replace(/\<p align="left"\>/gi, ""); //fairygui不支持p标签
        //str = str.replace(/face="simsun"/gi , "");//去掉 face="simsun" 这个是宋体的意思
        str = str.replace(/\<\/p\>/gi, "\n");
        str = str.replace(/face=/gi, 'fontfamily=');
        str = str.replace(/kerning=/gi, '');
        str = str.replace(/letterspacing=/gi, '');
        return str;
    };
    StringFormat.replacJosnStr = function (str) {
        var myPattern = /\'/g;
        str = str.replace(myPattern, "\"");
        return str;
    };
    StringFormat.formatMoney = function (value, str, rate) {
        if (str === void 0) { str = ""; }
        if (rate === void 0) { rate = 10000; }
        if (!str || str.length <= 0) {
            str = Global.lang.getLang("lang_client_398");
        }
        if (value >= rate) {
            return flash.tranint(value / rate) + str;
        }
        return value + "";
    };
    StringFormat.strToTime = function (Str) {
        //$_FunctionStackLog.intoStack("com.components.utils::StringFormat/strToTime()");
        var tpArr = Str.split(":");
        var result = flash.trannumber(tpArr[0]) * 3600000 + flash.trannumber(tpArr[1]) * 60000;
        return result;
    };
    StringFormat.formatNum = function (value, useFormat) {
        if (useFormat === void 0) { useFormat = true; }
        //$_FunctionStackLog.intoStack("com.components.utils::StringFormat/formatNum()");
        var pix = "";
        if (useFormat && value >= 1000000000) {
            value = flash.tranint(value / 100000000);
            pix = Global.lang.getLang("lang_client_404"); //亿
        }
        else if (useFormat && value >= 1000000) {
            value = flash.tranint(value / 10000);
            pix = Global.lang.getLang("lang_client_405"); //万
        }
        var strNum = value.toString();
        if (strNum.length > 3) {
            var arr = [];
            var start = 0;
            var end = strNum.length;
            while (end > 0) {
                start = Math.max(end - 3, 0);
                arr.unshift(strNum.slice(start, end));
                end = start;
            }
            strNum = arr.join(",");
        }
        return strNum + pix;
    };
    StringFormat.formatNumberToString = function (value, useFormat) {
        if (useFormat === void 0) { useFormat = true; }
        //$_FunctionStackLog.intoStack("com.components.utils::StringFormat/formatNum()");
        var pix = "";
        if (useFormat && value >= 1000000000) {
            value = flash.tranint(value / 100000000);
            pix = "" + Global.lang.getLang("lang_client_404"); //亿
        }
        else if (useFormat && value >= 1000000) {
            value = flash.tranint(value / 10000);
            pix = "" + Global.lang.getLang("lang_client_403"); //万
        }
        else if (useFormat && value >= 10000) {
            value = flash.tranint(value / 10000);
            pix = "" + Global.lang.getLang("lang_client_403"); //万
        }
        var strNum = value.toString();
        if (strNum.length > 3) {
            var arr = [];
            var start = 0;
            var end = strNum.length;
            while (end > 0) {
                start = Math.max(end - 3, 0);
                arr.unshift(strNum.slice(start, end));
                end = start;
            }
            strNum = arr.join(",");
        }
        return strNum + pix;
    };
    StringFormat.formatNumberToStringV2 = function (value, useFormat) {
        if (useFormat === void 0) { useFormat = true; }
        //$_FunctionStackLog.intoStack("com.components.utils::StringFormat/formatNum()");
        var pix = "";
        if (useFormat && value >= 100000000) {
            value = flash.tranint(value / 100000000);
            pix = "" + Global.lang.getLang("lang_client_404"); //亿
        }
        else if (useFormat && value >= 10000) {
            value = flash.tranint(value / 10000);
            pix = "" + Global.lang.getLang("lang_client_405"); //万
        }
        var strNum = value.toString();
        return strNum + pix;
    };
    StringFormat.getWeekDay = function ($num) {
        //$_FunctionStackLog.intoStack("com.components.utils::StringFormat/getWeekDay()");
        var arr = ["" + Global.lang.getLang("lang_client_406"), "" + Global.lang.getLang("lang_client_407"), "" + Global.lang.getLang("lang_client_408"), "" + Global.lang.getLang("lang_client_409"), "" + Global.lang.getLang("lang_client_410"), "" + Global.lang.getLang("lang_client_411"), "" + Global.lang.getLang("lang_client_412")];
        return arr[$num];
    };
    StringFormat.getChieseNum = function ($num) {
        //$_FunctionStackLog.intoStack("com.components.utils::StringFormat/getChieseNum()");
        var arr = ["" + Global.lang.getLang("lang_client_413"), "" + Global.lang.getLang("lang_client_407"), "" + Global.lang.getLang("lang_client_408"), "" + Global.lang.getLang("lang_client_409"), "" + Global.lang.getLang("lang_client_410"), "" + Global.lang.getLang("lang_client_411"), "" + Global.lang.getLang("lang_client_412"), "" + Global.lang.getLang("lang_client_420"), "" + Global.lang.getLang("lang_client_421"), "" + Global.lang.getLang("lang_client_422"), "" + Global.lang.getLang("lang_client_423")];
        return arr[$num];
    };
    StringFormat.numberToChinese = function (num) {
        var arr = ["" + Global.lang.getLang("lang_client_413"), "" + Global.lang.getLang("lang_client_407"), "" + Global.lang.getLang("lang_client_408"), "" + Global.lang.getLang("lang_client_409"), "" + Global.lang.getLang("lang_client_410"), "" + Global.lang.getLang("lang_client_411"), "" + Global.lang.getLang("lang_client_412"), "" + Global.lang.getLang("lang_client_420"), "" + Global.lang.getLang("lang_client_421"), "" + Global.lang.getLang("lang_client_422"), "" + Global.lang.getLang("lang_client_423")];
        var nums = ["" + Global.lang.getLang("lang_client_435"), "" + Global.lang.getLang("lang_client_436"), "" + Global.lang.getLang("lang_client_437"), "" + Global.lang.getLang("lang_client_438"), "" + Global.lang.getLang("lang_client_439"), "" + Global.lang.getLang("lang_client_436"), "" + Global.lang.getLang("lang_client_437"), "" + Global.lang.getLang("lang_client_438"), "" + Global.lang.getLang("lang_client_404"), "" + Global.lang.getLang("lang_client_436")];
        var str = "";
        var numStr = num.toString();
        for (var i = 0; i < numStr.length; i++) {
            var n = flash.tranint(numStr.charAt(i));
            if (numStr.length <= 1) {
                str += arr[n];
            }
            else {
                var w = numStr.length - i - 1;
                if (n > 0) {
                    if (w > 0) {
                        str += (numStr.length == 2 && n == 1 ? "" : arr[n]) + nums[w];
                    }
                    else {
                        str += arr[n];
                    }
                }
                else if (numStr.length > 2 && w == 1) {
                    if (flash.tranint(numStr.charAt(numStr.length - 1)) == 0 && flash.tranint(numStr.charAt(numStr.length - 2)) == 0) { }
                    else if (i == (numStr.length - 1)) { }
                    else {
                        str += arr[n];
                    }
                }
            }
        }
        return str;
    };
    /**
     * 转化时间格式
     * @param time 时间
     * @return 格式化为00:00:00格式
     */
    StringFormat.formatToTime = function (time) {
        time = Number(time.toFixed(0));
        var second = time % 60;
        var minute = ((time - second) / 60) % 60;
        var hour = (time - 60 * minute - second) / 3600;
        var strSecond = second < 10 ? "0" + second.toString() : second.toString();
        var strMinute = minute < 10 ? "0" + minute.toString() : minute.toString();
        var strHour = hour < 10 ? "0" + hour.toString() : hour.toString();
        return strHour + ":" + strMinute + ":" + strSecond;
    };
    /**
     * 将一个整数的时间值格式化为 0小时00分00秒 格式的时间值
     * @param time 秒数
     * @return 0小时00分00秒
     */
    StringFormat.formatToTime_V2 = function (time, showHour) {
        if (showHour === void 0) { showHour = true; }
        var second = time % 60;
        var minute = ((time - second) / 60) % 60;
        var hour = (time - 60 * minute - second) / 3600;
        var strMinute = minute == 0 ? "" : minute.toString() + Global.lang.getLang("lang_client_479"); //分
        var strHour = hour == 0 ? "" : hour.toString() + Global.lang.getLang("lang_client_455"); //小时
        if (showHour) {
            return strHour + strMinute + second + Global.lang.getLang("lang_client_480"); //秒
        }
        return strMinute + second + Global.lang.getLang("lang_client_480"); //秒
    };
    /**
     * 将一个整数的时间值格式化为 00小时00分 格式的时间值
     * @param time 秒数
     * @return {0}小时{0}分
     */
    StringFormat.formatToTime_V3 = function (time) {
        var second = time % 60;
        var minute = ((time - second) / 60) % 60;
        var hour = (time - 60 * minute - second) / 3600;
        var strMinute = minute == 0 ? "" : minute.toString() + Global.lang.getLang("lang_client_479"); //分
        var strHour = hour == 0 ? "" : hour.toString() + Global.lang.getLang("lang_client_455"); //小时
        return strHour + strMinute;
    };
    /**
     * 将一个整数的时间值格式化为 0天0小时0分 格式的时间值
     * @param time 秒数
     * @return {0}天{1}小时{2}分
     */
    StringFormat.formatToTime_V4 = function (time) {
        var tian = flash.tranint(time / (24 * 3600));
        var hour = flash.tranint(time % (24 * 3600) / 3600);
        var min = flash.tranint(time % 3600 / 60);
        return tian + Global.lang.getLang("lang_client_454") + hour + Global.lang.getLang("lang_client_455") + min + Global.lang.getLang("lang_client_479");
    };
    /**
     * 将一个整数的时间值格式化为 大于1天：  xx"天；	小于一"天：  NN小时；	小于1小时：MM分钟；	小于1分钟：1分钟；
     * @param time 秒数
     * @return
     */
    StringFormat.formatToTime_V5 = function (time) {
        var tian = flash.tranint(time / (24 * 3600));
        var hour = flash.tranint(time / 3600);
        var min = flash.tranint(time % 3600 / 60);
        if (tian > 0) {
            return tian + Global.lang.getLang("lang_client_454"); //天
        }
        else if (hour > 0) {
            return hour + Global.lang.getLang("lang_client_455"); //小时
        }
        else if (min > 0) {
            return min + Global.lang.getLang("lang_client_456"); //分钟
        }
        else {
            return "" + Global.lang.getLang("lang_client_457"); //1分钟
        }
    };
    StringFormat.formatToTime_V6 = function (utc) {
        var date = new flash.As3Date(utc * 1000);
        var hour = date.hoursUTC < 10 ? '0' + date.hoursUTC : '' + date.hoursUTC;
        var minute = date.millisecondsUTC < 10 ? '0' + date.millisecondsUTC : '' + date.millisecondsUTC;
        var second = date.secondsUTC < 10 ? '0' + date.secondsUTC : '' + date.secondsUTC;
        //{0}月{1}日
        return date.monthUTC + 1 + Global.lang.getLang("lang_client_476") + date.dateUTC + Global.lang.getLang("lang_client_477") + hour + ':' + minute + ':' + second;
    };
    StringFormat.formatToTime_V7 = function (utc) {
        var date = new flash.As3Date(utc * 1000);
        var minute = date.minutes;
        var hour = date.hours;
        var strMinute = minute == 0 ? "00" : minute.toString();
        var strHour = hour == 0 ? "00" : hour.toString();
        return strHour + ':' + strMinute;
    };
    StringFormat.formatToTime_V8 = function (time) {
        var second = time % 60;
        var minute = ((time - second) / 60) % 60;
        var hour = (time - 60 * minute - second) / 3600;
        var strSecond = second < 10 ? "0" + second + Global.lang.getLang("lang_client_480") : second + Global.lang.getLang("lang_client_480"); //秒
        var strMinute = minute < 10 ? "0" + minute + Global.lang.getLang("lang_client_456") : minute + Global.lang.getLang("lang_client_456"); //分钟
        var strHour = hour < 10 ? "0" + hour + Global.lang.getLang("lang_client_455") : hour + Global.lang.getLang("lang_client_455"); //小时
        return strHour + strMinute + strSecond;
    };
    StringFormat.formatToTime_V9 = function (time) {
        if (time < 0) {
            return "" + Global.lang.getLang("lang_client_464"); //已过期
        }
        var tian = flash.tranint(time / (24 * 3600));
        var hour = flash.tranint(time % (24 * 3600) / 3600);
        var min = flash.tranint(time % 3600 / 60);
        var sec = flash.tranint(time % 60);
        //天|小时|分钟
        return (tian > 0 ? tian + Global.lang.getLang("lang_client_454") : "") + (hour > 0 ? hour + Global.lang.getLang("lang_client_455") : "") + (min > 0 ? min + Global.lang.getLang("lang_client_456") : "") + (sec + Global.lang.getLang("lang_client_468"));
    };
    StringFormat.formatToTime_V10 = function (time) {
        var date = new flash.As3Date(time * 1000);
        var hour = date.hours < 10 ? '0' + date.hours : '' + date.hours;
        var minute = date.minutes < 10 ? '0' + date.minutes : '' + date.minutes;
        var second = date.seconds < 10 ? '0' + date.seconds : '' + date.seconds;
        return date.month + 1 + Global.lang.getLang("lang_client_476") + date.date + Global.lang.getLang("lang_client_477") + " " + hour + ':' + minute + ':' + second;
    };
    StringFormat.formatToTime_V11 = function (time) {
        var tian = flash.tranint(time / (24 * 3600));
        var hour = flash.tranint(time % (24 * 3600) / 3600);
        var min = flash.tranint(time % 3600 / 60);
        var sec = flash.tranint(time % 60);
        //天|时|分|秒
        return (tian > 0 ? tian + Global.lang.getLang("lang_client_454") : "") + (hour > 0 ? hour + Global.lang.getLang("lang_client_478") : "") + (min > 0 ? min + Global.lang.getLang("lang_client_479") : "") + (sec + Global.lang.getLang("lang_client_480"));
    };
    StringFormat.formatToTime_V12 = function (time) {
        var date = new flash.As3Date(time * 1000);
        var hour = date.hours < 10 ? '0' + date.hours : '' + date.hours;
        //月|日|时
        return date.month + 1 + Global.lang.getLang("lang_client_476") + date.date + Global.lang.getLang("lang_client_477") + hour + Global.lang.getLang("lang_client_478");
    };
    StringFormat.formatToTime_V13 = function (time) {
        var tian = flash.tranint(time / (24 * 3600));
        var hour = flash.tranint(time % (24 * 3600) / 3600);
        var min = flash.tranint(time % 3600 / 60);
        //天|小时
        return tian + Global.lang.getLang("lang_client_454") + hour + Global.lang.getLang("lang_client_455");
    };
    StringFormat.formatToTime_V14 = function (time) {
        var date = new flash.As3Date(time * 1000);
        var hour = date.hours < 10 ? '0' + date.hours : '' + date.hours;
        var minute = date.minutes < 10 ? '0' + date.minutes : '' + date.minutes;
        var second = date.seconds < 10 ? '0' + date.seconds : '' + date.seconds;
        //月|日
        return date.month + 1 + Global.lang.getLang("lang_client_476") + date.date + Global.lang.getLang("lang_client_477") + " " + hour + ':' + minute;
    };
    StringFormat.formatToTime_V15 = function (time) {
        var date = new flash.As3Date(time * 1000);
        var hour = date.hours < 10 ? '0' + date.hours : '' + date.hours;
        var minute = date.minutes < 10 ? '0' + date.minutes : '' + date.minutes;
        var second = date.seconds < 10 ? '0' + date.seconds : '' + date.seconds;
        return hour + ':' + minute;
    };
    /**
     * 将秒数转化为01:18:56格式
     * @param   time 		秒数
     * @return  separator 	返回格式：01:08:56
     **/
    StringFormat.convertTime = function (time, separator) {
        if (separator === void 0) { separator = ":"; }
        var hour = flash.tranint(time / 3600);
        var min = flash.tranint(time % 3600 / 60);
        var sec = flash.tranint(time % 60);
        return (hour < 10 ? "0" + hour : "" + hour) + separator + (min < 10 ? "0" + min : "" + min) + separator + (sec < 10 ? "0" + sec : "" + sec);
    };
    /**
     * 获取当天最大的UTC时间
     * @return  utc
     */
    StringFormat.getTodayMaxUtc = function () {
        var date = new flash.As3Date(com.time.ServerTime.serverTime);
        date.setHours(23, 59, 59, 999);
        return flash.tranint(date.getTime() * 0.001);
    };
    /**
     * 获取当天最小的UTC时间
     * @return  utc
     */
    StringFormat.getTodayMinUtc = function () {
        var date = new flash.As3Date(com.time.ServerTime.serverTime);
        date.setHours(0, 0, 0, 0);
        return flash.tranint(date.getTime() * 0.001);
    };
    /**
     * 解析时间间成当前时间间
     * @param time
     */
    StringFormat.resloveFormatLastLoginTime = function (time) {
        var t = "";
        var d = new flash.As3Date(time * 1000);
        t = d.fullYear + Global.lang.getLang("lang_client_475") + (d.month + 1) + Global.lang.getLang("lang_client_476") + d.date + Global.lang.getLang("lang_client_477") +
            d.hours + Global.lang.getLang("lang_client_478") + d.minutes + Global.lang.getLang("lang_client_479") + d.seconds + Global.lang.getLang("lang_client_480");
        return t;
    };
    StringFormat.formatTimeToLog = function (time) {
        var t;
        var d = new flash.As3Date(time);
        var hour = d.hours;
        var min = d.minutes;
        var sec = d.seconds;
        t = d.fullYear + "-" + (d.month + 1) + "-" + d.date + " " + (hour < 10 ? "0" + hour : "" + hour) + ":" + (min < 10 ? "0" + min : "" + min) + ":" + (sec < 10 ? "0" + sec : "" + sec) + ":" + d.milliseconds;
        return t;
    };
    StringFormat.resloveFormatHMS = function (time) {
        var d = new flash.As3Date(time * 1000);
        var hour = d.hours;
        var min = d.minutes;
        var sec = d.seconds;
        return (hour < 10 ? "0" + hour : "" + hour) + ":" + (min < 10 ? "0" + min : "" + min) + ":" + (sec < 10 ? "0" + sec : "" + sec);
    };
    StringFormat.formatTimeToDay = function (time) {
        var t = "";
        var d = new flash.As3Date(time * 1000);
        t = d.fullYear + Global.lang.getLang("lang_client_475") + (d.month + 1) + Global.lang.getLang("lang_client_476") + d.date + Global.lang.getLang("lang_client_477"); //{0}年{1}月{2}日
        return t;
    };
    StringFormat.formatTimeToMin = function (time) {
        var t = "";
        var d = new flash.As3Date(time * 1000);
        t = d.fullYear + Global.lang.getLang("lang_client_475") + (d.month + 1) + Global.lang.getLang("lang_client_476") + d.date + Global.lang.getLang("lang_client_477") + d.hours + Global.lang.getLang("lang_client_478") + d.minutes + Global.lang.getLang("lang_client_479");
        return t;
    };
    StringFormat.formatTimeToMin2 = function (time) {
        var t = "";
        var d = new flash.As3Date(time * 1000);
        t = d.fullYear + Global.lang.getLang("lang_client_475") + (d.month + 1) + Global.lang.getLang("lang_client_476") + d.date + Global.lang.getLang("lang_client_477") + (d.hours < 10 ? "0" + d.hours : "" + d.hours) + ":" + (d.minutes < 10 ? "0" + d.minutes : "" + d.minutes);
        return t;
    };
    StringFormat.formatTimeToSec2 = function (time) {
        var t = "";
        var d = new flash.As3Date(time * 1000);
        t = d.fullYear + Global.lang.getLang("lang_client_475") + (d.month + 1) + Global.lang.getLang("lang_client_476") + d.date + Global.lang.getLang("lang_client_477") + (d.hours < 10 ? "0" + d.hours : "" + d.hours) + ":" + (d.minutes < 10 ? "0" + d.minutes : "" + d.minutes) + ":" + (d.seconds < 10 ? "0" + d.seconds : "" + d.seconds);
        return t;
    };
    /**
     * 00:00
     * @param value 时间，秒
     */
    StringFormat.formatTimeToMinSec = function (value) {
        if (value < 0)
            return "00:00";
        var min = parseInt("" + (value / 60));
        var sec = parseInt("" + (value % 60));
        var t = (min >= 10 ? min : "0" + min) + ":" + (sec >= 10 ? sec : "0" + sec);
        return t;
    };
    /**
     * {min}分{sec}秒:{min}分钟
     * @param value 时间，秒
     */
    StringFormat.formatTimeToMinSec2 = function (value) {
        var min = value / 60;
        var sec = value % 60;
        //{min}分{sec}秒:{min}分钟
        var t = sec > 0 ? min + Global.lang.getLang("lang_client_479") + sec + Global.lang.getLang("lang_client_480") : min + Global.lang.getLang("lang_client_479") + Global.lang.getLang("lang_client_481");
        return t;
    };
    StringFormat.format = function (date, formatStr) {
        if (date === void 0) { date = null; }
        if (formatStr === void 0) { formatStr = "Y-M-D h:m:s"; }
        if (date == null) {
            date = new flash.As3Date();
        }
        var year = date.fullYear;
        var month = date.month + 1;
        var day = date.date;
        var hours = ((date.hours > 9) ? "" : "0") + date.hours;
        var minutes = ((date.minutes > 9) ? "" : "0") + date.minutes;
        var seconds = ((date.seconds > 9) ? "" : "0") + date.seconds;
        return year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;
        //return formatStr.replace("Y", year).replace("M", month).replace("D", day).replace("h", hours).replace("m", minutes).replace("s", seconds);
    };
    StringFormat.formatV2 = function (time, formatStr) {
        if (formatStr === void 0) { formatStr = "Y-M-D h:m:s"; }
        var date = new flash.As3Date(time * 1000);
        var year = date.fullYear;
        var month = (date.month + 1) < 10 ? "0" + String(date.month + 1) : String(date.month + 1);
        var day = date.date < 10 ? "0" + date.date.toString() : date.date.toString();
        var hours = ((date.hours > 9) ? "" : "0") + date.hours;
        var minutes = ((date.minutes > 9) ? "" : "0") + date.minutes;
        var seconds = ((date.seconds > 9) ? "" : "0") + date.seconds;
        return year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;
        //return formatStr.replace("Y", year).replace("M", month).replace("D", day).replace("h", hours).replace("m", minutes).replace("s", seconds);
    };
    /**
     * 多少秒(分钟|小时|天)前
     * @param startTime 开始时间,毫秒
     */
    StringFormat.timeBackTo = function (startTime) {
        var nowTime = com.time.ServerTime.getServerTime() * 1000; //new flash.As3Date().time;
        var t = parseInt("" + (nowTime - startTime) / 1000); //秒
        var str = "";
        if (t < 60) {
            str = parseInt("" + t) + Global.lang.getLang("lang_client_480"); //秒
        }
        else if (t < 3600) {
            str = parseInt("" + (t / 60)) + Global.lang.getLang("lang_client_456"); //分钟
        }
        else if (t < 86400) {
            str = parseInt("" + (t / 3600)) + Global.lang.getLang("lang_client_455"); //小时
        }
        else {
            str = parseInt("" + (t / 86400)) + Global.lang.getLang("lang_client_454"); //天
        }
        return Global.lang.getLang("lang_panel_63", str); //{0}前
    };
    StringFormat.getSubstitute = function (str) {
        var rest = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            rest[_i - 1] = arguments[_i];
        }
        if (!str) {
            return "";
        }
        var len = rest.length;
        var args;
        if (len == 1 && flash.As3is(rest[0], Array)) {
            args = rest[0];
            len = args.length;
        }
        else {
            args = rest;
        }
        for (var i = 0; i < len; i++) {
            str = str.replace(new RegExp("\\{" + i + "\\}", "g"), args[i]);
        }
        return str;
    };
    StringFormat.getIndexStr = function (str, index, sign, start, end) {
        if (sign === void 0) { sign = ';'; }
        if (start === void 0) { start = 0; }
        if (end === void 0) { end = 0; }
        if (str == null || str == "" || index <= 0) {
            return "";
        }
        var arr = str.split(sign);
        if (arr != null) {
            var tempStr = arr[index - 1];
            return tempStr;
        }
        return "";
    };
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
    StringFormat.getDictionaryByJson = function (jsonStr) {
        if (jsonStr == null || jsonStr.length <= 0) {
            return null;
        }
        var reg = /([{,，])\s*([0-9a-zA-Z一-龟]+)\s*:/g;
        var temp = jsonStr.replace(reg, "$1\"$2\":");
        var tempJson = temp;
        var tempObj = JSON.parse(tempJson);
        var dic = new flash.Dictionary();
        for (var i in tempObj) {
            dic.setItem(String(i), tempObj[i]);
        }
        return dic;
    };
    StringFormat.formatToJson = function (txt) {
        txt = "{" + txt.substring(1, txt.length - 1) + "}";
        var reg = /([{,，])\s*([0-9a-zA-Z一-龟]+)\s*:/g;
        var temp = txt.replace(reg, "$1\"$2\":");
        return temp;
    };
    StringFormat.getArrayByJson = function (jsonStr) {
        if (jsonStr == null || jsonStr.length <= 0) {
            return [];
        }
        var reg = /([{,，])\s*([0-9a-zA-Z一-龟]+)\s*:/g;
        var temp = jsonStr.replace(reg, "$1\"$2\":");
        var tempJson = temp;
        //tempJson = tempJson.replace(/\'/g,"\"");//cl 2018.6.16
        var tempObj = JSON.parse(tempJson);
        var arr = new Array();
        for (var i in tempObj) {
            arr.push(tempObj[i]);
        }
        return arr;
    };
    StringFormat.getObjectByJson = function (jsonStr) {
        if (jsonStr == null || jsonStr.length <= 0) {
            return null;
        }
        var reg = /([{,，])\s*([0-9a-zA-Z一-龟]+)\s*:/g;
        var temp = jsonStr.replace(reg, "$1\"$2\":");
        var tempJson = temp;
        var tempObj = JSON.parse(tempJson);
        return tempObj;
    };
    StringFormat.getTipStrByAattribute = function (str) {
        str = str.replace("[", "").replace("]", "").replace(/\,/g, "\n");
        return str;
    };
    return StringFormat;
}());
__reflect(StringFormat.prototype, "StringFormat");
//# sourceMappingURL=StringFormat.js.map