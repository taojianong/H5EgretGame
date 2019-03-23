var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * Created by huitao on 2015/5/8.
 */
var flash;
(function (flash) {
    /**
     * 日期类
     */
    var As3Date = (function () {
        function As3Date(yearOrTimevalue, month, date, hour, minute, second, millisecond) {
            if (date === void 0) { date = 1; }
            if (hour === void 0) { hour = 0; }
            if (minute === void 0) { minute = 0; }
            if (second === void 0) { second = 0; }
            if (millisecond === void 0) { millisecond = 0; }
            if (yearOrTimevalue != null) {
                this._date = new Date(yearOrTimevalue);
            }
            else {
                this._date = new Date();
            }
            //    yearOrTimevalue, month, date, hour, minute, second, millisecond
            //    if((yearOrTimevalue != null || yearOrTimevalue != undefined) && month == undefined && date == 1 &&  hour == 0 && minute == 0 && second == 0 && millisecond == 0 )
            //    {
            //        this._date.setTime(<number>yearOrTimevalue);
            //    }
            //    if(yearOrTimevalue > -1 && yearOrTimevalue < 100)
            //    {
            //    	this._date.setFullYear(1900+yearOrTimevalue,month,date);
            // 	}
            //    if()
            //    {
            //    }
            // this._date.setHours(hour,minute,second)
        }
        Object.defineProperty(As3Date.prototype, "date", {
            /**按照本地时间返回 Date 对象所指定的表示月中某天的值（1 到 31 之间的一个整数）。 Date*/
            //date : number
            get: function () {
                return this._date.getDate();
            },
            set: function (val) {
                this._date.setDate(val);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(As3Date.prototype, "dateUTC", {
            /**    按照通用时间 (UTC) 返回 Date 对象中的日期值（1 到 31 之间的一个整数）。 Date*/
            //dateUTC : number
            get: function () {
                return this._date.getUTCDate();
            },
            set: function (val) {
                this._date.setUTCDate(val);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(As3Date.prototype, "day", {
            /** [read-only] 按照本地时间返回该 Date 所指定的星期值（0 代表星期日，1 代表星期一，依此类推）。 Date*/
            //day : number
            get: function () {
                return this._date.getDay();
            },
            set: function (val) {
                this._date.setDate(val);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(As3Date.prototype, "dayUTC", {
            /**  [read-only] 按照通用时间 (UTC) 返回该 Date 中的星期值（0 代表星期日，1 代表星期一，依此类推）。 Date*/
            //dayUTC : number
            get: function () {
                return this._date.getUTCDay();
            },
            set: function (val) {
                this._date.setUTCDate(val);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(As3Date.prototype, "fullYear", {
            /**按照本地时间返回 Date 对象中的完整年份值（一个 4 位数，例如 2000）。 Date*/
            //fullYear : number
            get: function () {
                return this._date.getFullYear();
            },
            set: function (val) {
                this._date.setFullYear(val);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(As3Date.prototype, "fullYearUTC", {
            /**按照通用时间 (UTC) 返回 Date 对象中的四位数年份值。 Date*/
            //fullYearUTC : number
            get: function () {
                return this._date.getUTCFullYear();
            },
            set: function (val) {
                this._date.setUTCFullYear(val);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(As3Date.prototype, "hours", {
            /**按照本地时间返回 Date 对象中一天的小时值（0 到 23 之间的一个整数）。 Date*/
            //hours : number
            get: function () {
                return this._date.getHours();
            },
            set: function (val) {
                this._date.setHours(val);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(As3Date.prototype, "hoursUTC", {
            /**按照通用时间 (UTC) 返回 Date 对象中一天的小时值（0 到 23 之间的一个整数）。 Date*/
            //hoursUTC : number
            get: function () {
                return this._date.getUTCHours();
            },
            set: function (val) {
                this._date.setUTCHours(val);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(As3Date.prototype, "milliseconds", {
            /**按照本地时间返回 Date 对象中的毫秒值（0 到 999 之间的一个整数）部分。 Date*/
            //milliseconds : number
            get: function () {
                return this._date.getMilliseconds();
            },
            set: function (val) {
                this._date.setMilliseconds(val);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(As3Date.prototype, "millisecondsUTC", {
            /**按照通用时间 (UTC) 返回 Date 对象中的毫秒值（0 到 999 之间的一个整数）部分。 Date*/
            //millisecondsUTC : number
            get: function () {
                return this._date.getUTCMilliseconds();
            },
            set: function (val) {
                this._date.setUTCMilliseconds(val);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(As3Date.prototype, "minutes", {
            /**按照本地时间返回 Date 对象的分钟值（0 到 59 之间的一个整数）部分。 Date*/
            //minutes : number
            get: function () {
                return this._date.getMinutes();
            },
            set: function (val) {
                this._date.setMinutes(val);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(As3Date.prototype, "minutesUTC", {
            /**按照通用时间 (UTC) 返回的 Date 对象的分钟值（0 到 59 之间的一个整数）部分。 Date*/
            //minutesUTC : Number
            get: function () {
                return this._date.getUTCMinutes();
            },
            set: function (val) {
                this._date.setUTCMinutes(val);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(As3Date.prototype, "month", {
            /**按照本地时间返回 Date 对象的月份值（0 代表一月，1 代表二月，依此类推）。 Date*/
            //month : number
            get: function () {
                return this._date.getMonth();
            },
            set: function (val) {
                this._date.setMonth(val);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(As3Date.prototype, "monthUTC", {
            /**按照通用时间 (UTC) 返回的 Date 对象的月份值（0 [1 月] 到 11 [12 月]）部分。 Date*/
            //monthUTC : number
            get: function () {
                return this._date.getUTCMonth();
            },
            set: function (val) {
                this._date.setUTCMonth(val);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(As3Date.prototype, "seconds", {
            /**按照本地时间返回 Date 对象的秒值（0 到 59 之间的一个整数）。 Date*/
            //seconds : number
            get: function () {
                return this._date.getSeconds();
            },
            set: function (val) {
                this._date.setSeconds(val);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(As3Date.prototype, "secondsUTC", {
            /**按照通用时间 (UTC) 返回的 Date 对象的秒值（0 到 59 之间的一个整数）部分。 Date*/
            //secondsUTC : number
            get: function () {
                return this._date.getUTCMonth();
            },
            set: function (val) {
                this._date.setUTCSeconds(val);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(As3Date.prototype, "time", {
            /**Date 对象中自 1970 年 1 月 1 日午夜（通用时间）以来的毫秒数。 Date*/
            //time : number
            get: function () {
                return this._date.getTime();
            },
            set: function (val) {
                this._date.setTime(val);
            },
            enumerable: true,
            configurable: true
        });
        /**[read-only] 计算机的本地时间和通用时间 (UTC) 之间的差值（以分钟为单位）。*/
        //        timezoneOffset : number
        As3Date.prototype.timezoneOffset = function () {
            return 0;
        };
        As3Date.prototype.getDate = function () {
            return this._date.getDate();
        };
        /**
         * 按照本地时间返回该 Date 所指定的星期值（0 代表星期日，1 代表星期一，依此类推）。 Date
         * @returns {number}
         */
        As3Date.prototype.getDay = function () {
            return this._date.getDay();
        };
        /**
         * 按照本地时间返回 Date 对象中的完整年份值（一个 4 位数，如 2000）。 Date
         * @returns {number}
         */
        As3Date.prototype.getFullYear = function () {
            return this._date.getFullYear();
        };
        /**
         * 按照本地时间返回 Date 对象中一天的小时值（0 到 23 之间的一个整数）部分。 Date
         * @returns {number}
         */
        As3Date.prototype.getHours = function () {
            return this._date.getHours();
        };
        /**
         * 按照本地时间返回 Date 对象中的毫秒值（0 到 999 之间的一个整数）部分。 Date
         * @returns {number}
         */
        As3Date.prototype.getMilliseconds = function () {
            return this._date.getMilliseconds();
        };
        /**
         * 按照本地时间返回 Date 对象中的分钟值（0 到 59 之间的一个整数）部分。 Date
         */
        As3Date.prototype.getMinutes = function () {
            return this._date.getMinutes();
        };
        /**
         * 按照本地时间返回该 Date 中的月份值（0 代表一月，1 代表二月，依此类推）部分。 Date
         */
        As3Date.prototype.getMonth = function () {
            return this._date.getMonth();
        };
        /**
         * 按照本地时间返回 Date 对象中的秒值（0 到 59 之间的一个整数）部分。 Date
         */
        As3Date.prototype.getSeconds = function () {
            return this._date.getSeconds();
        };
        /**
         * 按照通用时间返回 Date 对象中自 1970 年 1 月 1 日午夜以来的毫秒数。 Date
         */
        As3Date.prototype.getTime = function () {
            return this._date.getTime();
        };
        /**
         *  以分钟为单位，返回计算机的本地时间和通用时间 (UTC) 之间的差值。 Date
         */
        As3Date.prototype.getTimezoneOffset = function () {
            return 0;
        };
        /**
         * 按照通用时间 (UTC) 返回 Date 对象中表示月中某天的值（1 到 31 之间的一个整数）。 Date
         * @returns {number}
         */
        As3Date.prototype.getUTCDate = function () {
            return this._date.getUTCDate();
        };
        /**
         * 按照通用时间 (UTC) 返回该 Date 中表示星期的值（0 代表星期日，1 代表星期一，依此类推）。 Date
         */
        As3Date.prototype.getUTCDay = function () {
            return this._date.getUTCDate();
        };
        /**
         * 按照通用时间 (UTC) 返回 Date 对象中的四位数年份值。 Date
         * @returns {number}
         */
        As3Date.prototype.getUTCFullYear = function () {
            return this._date.getUTCFullYear();
        };
        /**
         * 按照通用时间 (UTC) 返回 Date 对象中一天的小时值（0 到 23 之间的一个整数）。 Date
         */
        As3Date.prototype.getUTCHours = function () {
            return this._date.getUTCHours();
        };
        /**
         * 按照通用时间 (UTC) 返回 Date 对象中的毫秒值（0 到 999 之间的一个整数）部分。 Date
         * @returns {number}
         */
        As3Date.prototype.getUTCMilliseconds = function () {
            return this._date.getUTCMilliseconds();
        };
        /**
         * 按照通用时间 (UTC) 返回 Date 对象中的分钟值（0 到 59 之间的一个整数）部分。 Date
         */
        As3Date.prototype.getUTCMinutes = function () {
            return this._date.getUTCMinutes();
        };
        /**
         * 按照通用时间 (UTC) 返回 Date 对象中的月份值（0 [一月] 到 11 [十二月]）部分。 Date
         * @returns {number}
         */
        As3Date.prototype.getUTCMonth = function () {
            return this._date.getUTCMonth();
        };
        /**
         * 按照通用时间 (UTC) 返回 Date 对象中的秒值（0 到 59 之间的一个整数）部分。 Date
         */
        As3Date.prototype.getUTCSeconds = function () {
            return this._date.getUTCSeconds();
        };
        /**
         * [static] 按照 UTC 将表示日期的字符串转换为一个数字，它等于自 1970 年 1 月 1 日起已经过的毫秒数。 Date
         * @param date
         */
        As3Date.parse = function (date) {
            //RegExp.exec()
            return 0;
        };
        /**
         * 按照本地时间设置月中的某天，并以毫秒为单位返回新时间。 Date
         * @param day
         */
        As3Date.prototype.setDate = function (day) {
            this._date.setDate(day);
            return this.date;
        };
        /**
         * 按照本地时间设置年份值，并以毫秒为单位返回新时间。 Date
         * @param year
         * @param month
         * @param day
         */
        As3Date.prototype.setFullYear = function (year, month, day) {
            this._date.setFullYear(year, month, day);
            return this.fullYear;
        };
        /**
         * 按照本地时间设置小时值，并以毫秒为单位返回新时间。 Date
         * @param hour
         * @param minute
         * @param second
         * @param millisecond
         * @returns {number}
         */
        As3Date.prototype.setHours = function (hour, minute, second, millisecond) {
            this._date.setHours(hour, minute, second, millisecond);
            return this.hours;
        };
        /**
         * 按照本地时间设置毫秒值，并以毫秒为单位返回新时间。 Date
         * @param millisecond
         * @returns {number}
         */
        As3Date.prototype.setMilliseconds = function (millisecond) {
            this._date.setMilliseconds(millisecond);
            return this.milliseconds;
        };
        /**
         * 按照本地时间设置分钟值，并以毫秒为单位返回新时间。 Date
         * @param minute
         * @param second
         * @param millisecond
         * @returns {number}
         */
        As3Date.prototype.setMinutes = function (minute, second, millisecond) {
            this._date.setMinutes(minute, second, millisecond);
            return this.minutes;
        };
        /**
         * 按照本地时间设置月份值以及（可选）日期值，并以毫秒为单位返回新时间。 Date
         * @param month
         * @param day
         */
        As3Date.prototype.setMonth = function (month, day) {
            this._date.setMonth(month, day);
            return this.month;
        };
        /**
         * 按照本地时间设置秒值，并以毫秒为单位返回新时间。 Date
         * @param second
         * @param millisecond
         * @returns {number}
         */
        As3Date.prototype.setSeconds = function (second, millisecond) {
            this._date.setSeconds(second, millisecond);
            return this.seconds;
        };
        /**
         * 以毫秒为单位设置自 1970 年 1 月 1 日午夜以来的日期，并以毫秒为单位返回新时间。 Date
         * @param millisecond
         */
        As3Date.prototype.setTime = function (millisecond) {
            this.time = millisecond;
            return this.time;
        };
        /**
         * 按照通用时间 (UTC) 设置日期值，并以毫秒为单位返回新时间。 Date
         * @param day
         */
        As3Date.prototype.setUTCDate = function (day) {
            this._date.setUTCDate(day);
            return this.dateUTC;
        };
        /**
         * 按照通用时间 (UTC) 设置年份值，并以毫秒为单位返回新时间。 Date
         * @param year
         * @param month
         * @param day
         */
        As3Date.prototype.setUTCFullYear = function (year, month, day) {
            this._date.setUTCFullYear(year, month, day);
            return this.fullYearUTC;
        };
        /**
         * 按照通用时间 (UTC) 设置小时值，并以毫秒为单位返回新时间。 Date
         * @param hour
         * @param minute
         * @param second
         * @param millisecond
         */
        As3Date.prototype.setUTCHours = function (hour, minute, second, millisecond) {
            this._date.setUTCHours(hour, minute, second, millisecond);
            return this.hoursUTC;
        };
        As3Date.prototype.setUTCMilliseconds = function (millisecond) {
            this._date.setUTCMilliseconds(millisecond);
            return this.millisecondsUTC;
        };
        /**
         * 按照通用时间 (UTC) 设置分钟值，并以毫秒为单位返回新时间。 Date
         * @param minute
         * @param second
         * @param millisecond
         */
        As3Date.prototype.setUTCMinutes = function (minute, second, millisecond) {
            this._date.setUTCMinutes(minute, second, millisecond);
            return this.minutesUTC;
        };
        /**
         * 按照通用时间 (UTC) 设置月份值及（可选）日期值，并以毫秒为单位返回新时间。 Date
         * @param month
         * @param day
         * @returns {number}
         */
        As3Date.prototype.setUTCMonth = function (month, day) {
            this._date.setUTCMonth(month, day);
            return this.minutesUTC;
        };
        /**
         * 按照通用时间 (UTC) 设置秒值以及（可选）毫秒值，并以毫秒为单位返回新时间。 Date
         * @param second
         * @param millisecond
         */
        As3Date.prototype.setUTCSeconds = function (second, millisecond) {
            this._date.setUTCSeconds(second, millisecond);
            return this.secondsUTC;
        };
        /**
         * 仅返回星期值和日期值的字符串表示形式，而不返回时间或时区。 Date
         */
        As3Date.prototype.toDateString = function () {
            return this._date.toDateString();
        };
        /**
         * 仅返回星期值和日期值的字符串表示形式，而不返回时间或时区。 Date
         */
        As3Date.prototype.toLocaleDateString = function () {
            return this._date.toLocaleDateString();
        };
        /**
         * 按本地时间返回星期值、日期值以及时间的字符串表示形式。 Date
         */
        As3Date.prototype.toLocaleString = function () {
            return this._date.toLocaleString();
        };
        /**
         * 仅返回时间的字符串表示形式，而不返回星期值、日期值、年份或时区。 Date
         */
        As3Date.prototype.toLocaleTimeString = function () {
            return this._date.toLocaleTimeString();
        };
        /**
         * 返回星期值、日期值、时间和时区的字符串表示形式。 Date
         * @returns {string}
         */
        As3Date.prototype.toString = function () {
            return this._date.toString();
        };
        /**
         * 仅返回时间和时区的字符串表示形式，而不返回星期值和日期值。 Date
         */
        As3Date.prototype.toTimeString = function () {
            return this._date.toTimeString();
        };
        /**
         * 按照通用时间 (UTC) 返回星期值、日期值以及时间的字符串表示形式。 Date
         */
        As3Date.prototype.toUTCString = function () {
            return this._date.toUTCString();
        };
        /**
         * [static] 返回 1970 年 1 月 1 日午夜（通用时间）与参数中指定的时间之间相差的毫秒数。 Date
         * @param year
         * @param month
         * @param date
         * @param hour
         * @param minute
         * @param second
         * @param millisecond
         * @constructor
         */
        As3Date.UTC = function (year, month, date, hour, minute, second, millisecond) {
            if (date === void 0) { date = 1; }
            if (hour === void 0) { hour = 0; }
            if (minute === void 0) { minute = 0; }
            if (second === void 0) { second = 0; }
            if (millisecond === void 0) { millisecond = 0; }
            //Date.UTC();
            return "";
        };
        /**
         * 按照通用时间返回 Date 对象中自 1970 年 1 月 1 日午夜以来的毫秒数。
         */
        As3Date.prototype.valueOf = function () {
            return this._date.valueOf();
        };
        return As3Date;
    }());
    flash.As3Date = As3Date;
    __reflect(As3Date.prototype, "flash.As3Date");
})(flash || (flash = {}));
//# sourceMappingURL=As3Date.js.map