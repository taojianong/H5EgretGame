var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var fairui;
(function (fairui) {
    /**
     * 消息提示
     * @author cl 2018.3.19
     **/
    var Notice = (function () {
        function Notice() {
        }
        /**
         *
         * @param type		提示类型
         * @param text			提示内容
         * @param count		（type=TOP）提示次数（大于1次，提示间隔是10秒左右）
         * @param inPanel	（type=RIGHT）是否在信息面板中提示
         *
         */
        Notice.showNoticeTypeMsg = function (type, text, count, inPanel, parent, bottomIcon) {
            if (count === void 0) { count = 1; }
            if (inPanel === void 0) { inPanel = true; }
            if (parent === void 0) { parent = null; }
            if (bottomIcon === void 0) { bottomIcon = 0; }
            if ((type & this.RIGHT) != 0) {
                //this.showCornerMessage(text, this.CORNER_COLOR, inPanel);
            }
            if ((type & this.TOP) != 0) {
                this.showTopMessage(text, this.TOP_COLOR, count);
            }
            if ((type & this.MIDDLE) != 0) {
                this.showMiddleMessage(text);
            }
            if ((type & this.MOUSE) != 0) {
                this.showMousePosMessage(text, this.MOUSE_COLOR, parent);
            }
            if ((type & this.BOTTOM) != 0) {
                this.showBottomMessage(text, Notice.BOTTOM_COLOR, 0, bottomIcon);
            }
        };
        /**
         * 客户端提示语言
         * @param id    Q_notifyExpandBean中数据
         * @param color 默认-1表示读取表里的配置颜色值
         * @param args 	动态参数
         *
         */
        Notice.show = function (id) {
            // var bean: com.game.data.bean.Q_notifyExpandBean = com.Application.clientDataConfig.q_notify_clientContainer.getDataBean(id);
            // if (bean == null) {
            //     Alert.show(Global.lang.getLang("lang_client_54") + id + Global.lang.getLang("lang_client_55"));//在客户端信息表q_notify_client.json中找不到id={0}的数据
            //     return;
            // }
            // var tip: string = bean.q_foreign;
            // if (tip == null || tip == "") {
            //     tip = bean.q_Desc;
            // }
            // var bottomIcon: number = bean.q_bottom_icon; //默认0，蓝色icon
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            // if (args != null && args.length > 0) {
            //     tip = StringFormat.getSubstitute(tip, args);
            // }
            // this.showTip(tip, bean.q_type, bean.q_color, bottomIcon);
        };
        Notice.showTip = function (str, type, color, bottomIcon) {
            if (bottomIcon === void 0) { bottomIcon = 0; }
            var c = this.getContentColor(color);
            switch (type) {
                case this.TOP: {
                    this.showTopMessage(str, c);
                    break;
                }
                case this.MIDDLE: {
                    this.showMiddleMessage(str, c);
                    break;
                }
                case this.BOTTOM: {
                    this.showBottomMessage(str, c, 0, bottomIcon);
                    break;
                }
                case this.MOUSE: {
                    // this.showMousePosMessage(str, c);
                    this.showMiddleMessage(str, c);
                    break;
                }
            }
        };
        /**
         * 获取颜色值
         * @param color	（0红色，1绿色，2蓝色，3白色，4灰色）
         * @return
         */
        Notice.getContentColor = function (color) {
            if (color === void 0) { color = 0; }
            if (this._colorJsonAry == null) {
                // var getGlobalConfigData: com.game.data.bean.Q_globalExpandBean = GameUtils.getGlobalConfigData(51);
                // var colorJson: string = getGlobalConfigData.q_string_value;
                this._colorJsonAry = JSON.parse('[{"type":0,"color":"#ff0000"},{"type":1,"color":"#7dff4f"},{"type":2,"color":"#00C8FA"},{"type":3,"color":"#ffffff"},{"type":4,"color":"#cccccc"},{"type":5,"color":"#ffff00"}]');
            }
            if (this._colorHash.hasOwnProperty(color)) {
                return this._colorHash.getItem(color);
            }
            else {
                for (var i = 0; i < this._colorJsonAry.length; i++) {
                    if (color == this._colorJsonAry[i].type) {
                        var c = this._colorJsonAry[i].color;
                        this._colorHash.setItem(color, parseInt("0x" + c.substr(1)));
                        break;
                    }
                }
            }
            return this._colorHash.getItem(color);
        };
        /**
         * 主菜单上方的指引提示
         * @param str
         */
        Notice.showGuideMessage = function (str) {
            // if ( this._guideMessage == null) {
            //     this._guideMessage = new GuideMessageView();
            // }
            // this._guideMessage.showGuideMessage(str);
        };
        /**
         * 主菜单上方的指引提示
         * @param str
         */
        Notice.showNoticeMessage = function (str) {
            if (this._noticeMessage == null) {
                this._noticeMessage = new fairui.GuideMessageView();
            }
            this._noticeMessage.showNoticeMessage(str);
        };
        /**
         * 顶部、系统公告广播
         * @param str
         * @param color
         * @param count	提示次数,间隔10秒提示
         *
         */
        Notice.showTopMessage = function (str, color, count) {
            if (color === void 0) { color = 0xF5C84D; }
            if (count === void 0) { count = 1; }
            if (this._topMessage == null) {
                this._topMessage = new fairui.TopMessageView();
            }
            if (count == 1) {
                this._topMessage.showTopMessage(str, color);
            }
            else {
                var crt = egret.getTimer();
                var id = Global.timer.doTimeLoop(30000, flash.bind(this.showTop, this), [crt, str, color, this], false); //30秒,这是个大概的时间，要改.
                this._topCountHash.setItem(crt, count);
                this._clearIdHash.setItem(crt, id);
                this.showTop(crt, str, color);
            }
        };
        Notice.showTop = function (crt, str, color, thisObject) {
            if (thisObject === void 0) { thisObject = null; }
            thisObject = thisObject || this;
            var count = Notice._topCountHash.getItem(crt);
            if (count == 0) {
                Global.timer.clearTimer(Notice._clearIdHash.getItem(crt));
                Notice._clearIdHash.delItem(crt);
            }
            else {
                Notice._topMessage.showTopMessage(str, color);
                Notice._topCountHash.setItem(crt, count - 1);
                count = Notice._topCountHash.getItem(crt);
            }
        };
        /**
         * 中上部、系统提示广播
         * @param str
         * @param color
         */
        Notice.showMiddleMessage = function (str, color) {
            if (color === void 0) { color = 0xF1C600; }
            if (this._middleMessage == null) {
                this._middleMessage = new fairui.MiddleMessageView();
            }
            this._middleMessage.showMiddleMessage(str, color);
        };
        /**
         * 检查是否底部已经有相同的msg了
         * @param msg
         * @return
         *
         */
        Notice.checkHasBottomMessage = function (msg) {
            if (this._bottomMessage == null) {
                return false;
            }
            return this._bottomMessage.heightLightSameMsg(msg);
        };
        /**
         * 底部、个人操作广播
         * @param str
         * @param color
         * @param gap 	单位ms
         * @param bottomIcon 	icon，默认0,蓝色icon
         */
        Notice.showBottomMessage = function (str, color, gap, bottomIcon) {
            if (color === void 0) { color = 0xFF3300; }
            if (gap === void 0) { gap = 0; }
            if (bottomIcon === void 0) { bottomIcon = 0; }
            if (str == null || str.length <= 0) {
                return;
            }
            str = Global.lang.getLang(str);
            if (gap > 0) {
                var lastT = parseInt("" + this._tempHash.getItem(str));
                var ct = egret.getTimer();
                if (lastT > 0) {
                    var gapT = ct - lastT;
                    if (gapT < gap) {
                        return;
                    }
                }
                this._tempHash.setItem(str, ct);
            }
            //@TODO 已经有的就不再显示了
            if (this.checkHasBottomMessage(str)) {
                //return;
                this._bottomAry.push([str, color, bottomIcon, true]);
            }
            else {
                this._bottomAry.push([str, color, bottomIcon, false]);
            }
            var leng = this._bottomAry.length;
            if (this._bottomMessage == null) {
                this._bottomMessage = new fairui.BottomMessageView();
            }
            if (leng > 3) {
                this._bottomMessage.show2();
            }
            else {
                this._bottomMessage.show();
            }
        };
        Object.defineProperty(Notice, "bottomAry", {
            get: function () {
                return this._bottomAry;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Notice, "cornerAry", {
            get: function () {
                return this._cornerAry;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Notice, "message", {
            /**
             * 保存信息面板中的信息（100条）
             */
            get: function () {
                return this._message;
            },
            enumerable: true,
            configurable: true
        });
        Notice.setMessage = function (value) {
            while (this._message.length >= this.MESSAGELENGTH) {
                this._message.shift();
            }
            var time = StringFormat.resloveFormatHMS(com.time.ServerTime.serverTime * 0.001);
            var str = time + "    " + value;
            this._message.push(str);
            EventManager.dispatchEvent(GameEvent.ADD_MESSAGE, str); //用于消息面板显示消息
        };
        /**
         * 显示对应语言ID的数据
         * @param lang 语言包ID
         * @param params 语言包对应参数
         * @param args	对应的showMousePosMessage方法参数
         */
        Notice.showMouseMessageById = function (lang, params) {
            if (params === void 0) { params = null; }
            var args = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                args[_i - 2] = arguments[_i];
            }
            params = params || [];
            params.unshift(lang);
            var str = Global.lang.getLang.apply(Global.lang, params);
            args = args || [];
            args.unshift(str);
            this.showMousePosMessage.apply(this, args);
        };
        /**
         * 鼠标位置的提示
         * @param str
         * @param color
         * @param target		默认为父容器 | 指向的对象
         * @param gp            对应全局坐标,不填为默认鼠标点击位置
         * @param continuous	是否不断的提示，默认true
         * @param ignoreSame    是否忽略相同的文本显示,如果忽略在3s内则提示一次，否则可以显示多次
         * @param delay         延迟时间，秒
         */
        Notice.showMousePosMessage = function (str, color, target, gp, continuous, ignoreSame, delay) {
            if (color === void 0) { color = Notice.MOUSE_COLOR; }
            if (target === void 0) { target = null; }
            if (gp === void 0) { gp = null; }
            if (continuous === void 0) { continuous = true; }
            if (ignoreSame === void 0) { ignoreSame = true; }
            if (delay === void 0) { delay = 0; }
            if (this._oldStr == str && egret.getTimer() - this._oldStrTime <= 3000 && ignoreSame) {
                //需要3s提示一次
                return;
            }
            this._oldStrTime = egret.getTimer();
            this._oldStr = str;
            if (continuous) {
                this._mouseMsgAry.push([str, color, target, gp, delay]);
                if (this._loopId == null) {
                    this.loopShowMouseMsg(target, this, gp, delay);
                    this._loopId = Global.timer.doTimeLoop(200, flash.bind(this.loopShowMouseMsg, this), [target, this, gp, delay]);
                }
            }
            else {
                if (this._mousePosMessage == null) {
                    this._mousePosMessage = new fairui.MousePosMessageView();
                }
                this._mousePosMessage.showMousePosMessage(str, color, target, gp, delay);
            }
        };
        Notice.loopShowMouseMsg = function (parent, thisObject, gp, delay) {
            if (thisObject === void 0) { thisObject = null; }
            if (gp === void 0) { gp = null; }
            if (delay === void 0) { delay = 0; }
            thisObject = thisObject || this;
            if (Notice._mouseMsgAry.length == 0) {
                if (Notice._loopId) {
                    Global.timer.clearTimer(thisObject._loopId);
                    thisObject._loopId = null;
                }
            }
            else {
                var ary = Notice._mouseMsgAry.shift();
                var str = ary[0], color = ary[1];
                parent = ary[2] || parent;
                gp = ary[3] || gp;
                delay = ary[4] || delay;
                var mousePosMessage = fairui.MousePosMessageView.create(); // fairui.Notice.getMousePosMessage();
                mousePosMessage.showMousePosMessage(str, color, parent, gp, delay);
            }
        };
        /**
         * 测试提示文字信息:主要用于在测试环境下给出提示,正式环境下不给提示
         * @param notice
         *
         */
        Notice.debugMousePosNotice = function (notice) {
            if (Config.isDebug) {
                Notice.showMousePosMessage(notice);
            }
        };
        /**
         * 测试提示文字信息:主要用于在测试环境下给出提示,正式环境下不给提示
         * @param notice
         * @param color
         *
         */
        Notice.debugBottomNotice = function (notice, color) {
            if (color === void 0) { color = 0xFF3300; }
            if (Config.isDebug) {
                Notice.showBottomMessage(notice, color);
            }
        };
        /**
         * 测试提示文字信息:主要用于在测试环境下给出提示,正式环境下不给提示
         * @param notice
         * @param color
         *
         */
        Notice.debugTopNotice = function (notice, color) {
            if (color === void 0) { color = 0xFF3300; }
            if (Config.isDebug) {
                Notice.showTopMessage(notice, color);
            }
        };
        /**
         * 测试提示文字信息:主要用于在测试环境下给出提示,正式环境下不给提示
         * @param notice
         * @param color
         *
         */
        Notice.debugShow = function (noticeId) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            if (Config.isDebug) {
                Notice.show(noticeId, args);
            }
        };
        /*** 主菜单上方的指引提示 */
        Notice.GUIDE = 0;
        /** 聊天框中的系统提示消息 */
        Notice.LEFT = 1;
        /** 右下角的消息 */
        Notice.RIGHT = 2;
        /** 顶部广播的消息 */
        Notice.TOP = 4;
        /** 频幕中间的消息 */
        Notice.MIDDLE = 8;
        /** 鼠标位置的消息 */
        Notice.MOUSE = 16;
        /** 频幕底部的消息 */
        Notice.BOTTOM = 32;
        /** 频幕底部BUFF的消息 */
        Notice.BUFF = 64;
        /** gm命令返回的信息（显示到聊天框-喇叭） */
        Notice.GMCMD = 128;
        /** 帮会 */
        Notice.GUILD = 0x100;
        /** 组队 */
        Notice.TEAM = 0x200;
        /** 弹窗提示 */
        Notice.ALERT = 0x400;
        /*** 顶部、系统公告广播颜色 */
        Notice.TOP_COLOR = 0xF5C84D;
        /*** 中上部、系统提示广播颜色 */
        Notice.MIDDLE_COLOR = 0xF1C600;
        /*** 底部、个人操作广播颜色 */
        Notice.BOTTOM_COLOR = 0xFF3300;
        /*** 鼠标位置的提示颜色 */
        Notice.MOUSE_COLOR = 0xFF3300;
        /*** 右下角的提示颜色 */
        Notice.CORNER_COLOR = 0xDED8C7;
        /*** BUFF提示颜色 */
        Notice.BUFF_COLOR = 0x00FF00;
        Notice._colorHash = new flash.Dictionary();
        Notice._clearIdHash = new flash.Dictionary();
        Notice._topCountHash = new flash.Dictionary();
        Notice._tempHash = new flash.Dictionary();
        Notice._curTime = 0;
        Notice._bottomAry = [];
        Notice._cornerAry = [];
        Notice._message = [];
        /**
         * 信息面板中的信息最多100条
         */
        Notice.MESSAGELENGTH = 100;
        Notice.dieMessageAry = [];
        Notice._mouseMsgAry = [];
        return Notice;
    }());
    fairui.Notice = Notice;
    __reflect(Notice.prototype, "fairui.Notice");
})(fairui || (fairui = {}));
//# sourceMappingURL=Notice.js.map