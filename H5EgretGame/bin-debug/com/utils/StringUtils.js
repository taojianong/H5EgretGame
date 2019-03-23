var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var com;
(function (com) {
    var utils;
    (function (utils) {
        /**
         * 字符串处理工具
         * @author cl 2018.4.11
         */
        var StringUtils = (function () {
            function StringUtils() {
            }
            /**
             * 获取字符串字节长度
             * @param char 字符串
             * @return
             */
            StringUtils.getStringBytesLength = function (char) {
                if (!char) {
                    return 0;
                }
                var len = 0;
                for (var i = 0; i < char.length; i++) {
                    var c = char.charCodeAt(i);
                    //单字节加1
                    if ((c >= 0x0001 && c <= 0x007e) || (0xff60 <= c && c <= 0xff9f)) {
                        len++;
                    }
                    else if (char.charCodeAt(i) > 127 || char.charCodeAt(i) == 94) {
                        len += 2;
                    }
                    else {
                        len += 3;
                    }
                }
                return len;
            };
            StringUtils.fillArray = function (arr, str, type) {
                if (type === void 0) { type = null; }
                var temp = arr;
                if (flash.Boolean(str)) {
                    var a = str.split(",");
                    for (var i = flash.checkInt(0), n = flash.checkInt(Math.min(temp.length, a.length)); i < n; i++) {
                        var value = a[i];
                        temp[i] = (value == "true" ? true : (value == "false" ? false : value));
                        if (type != null) {
                            temp[i] = value;
                        }
                    }
                }
                return temp;
            };
            StringUtils.rectToString = function (rect) {
                if (rect) {
                    return rect.x + "," + rect.y + "," + rect.width + "," + rect.height;
                }
                return null;
            };
            StringUtils.getColorHtmlText = function (str, color) {
                if (color === void 0) { color = "#00ff00"; }
                return "<font color=\'" + color + "\'>" + str + "</font>";
            };
            StringUtils.isEmail = function (char) {
                if (char == null) {
                    return false;
                }
                char = StringUtils.trim(char);
                var pattern = /(\w|[_.\-])+@((\w|-)+\.)+\w{2,4}/;
                var result = pattern.exec(char);
                if (result == null) {
                    return false;
                }
                return true;
            };
            StringUtils.trim = function (char) {
                if (char == null) {
                    return null;
                }
                return StringUtils.rtrim(StringUtils.ltrim(char));
            };
            StringUtils.ltrim = function (char) {
                if (char == null) {
                    return null;
                }
                var pattern = /^\s*/;
                return char.replace(pattern, "");
            };
            StringUtils.rtrim = function (char) {
                if (char == null) {
                    return null;
                }
                var pattern = /\s*$/;
                return char.replace(pattern, "");
            };
            /**
             * 删除HTML标签
             *
             */
            StringUtils.removeHTMLTag = function (text) {
                if (text == null)
                    return text;
                return text.replace(/<.*?>/g, "");
            };
            StringUtils.fromString = function (value) {
                var num;
                if (value) {
                    var cdnum = GLong.fromString(value);
                    num = { "low": cdnum["low"], "high": cdnum["high"], "unsigned": cdnum["unsigned"] };
                }
                return num;
            };
            return StringUtils;
        }());
        utils.StringUtils = StringUtils;
        __reflect(StringUtils.prototype, "com.utils.StringUtils");
    })(utils = com.utils || (com.utils = {}));
})(com || (com = {}));
//# sourceMappingURL=StringUtils.js.map