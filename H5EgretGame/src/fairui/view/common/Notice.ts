module fairui {

	/**
	 * 消息提示
	 * @author cl 2018.3.19
	 **/
    export class Notice {
        /*** 主菜单上方的指引提示 */
        public static GUIDE: number = 0;

        /** 聊天框中的系统提示消息 */
        public static LEFT: number = 1;
        /** 右下角的消息 */
        public static RIGHT: number = 2;
        /** 顶部广播的消息 */
        public static TOP: number = 4;
        /** 频幕中间的消息 */
        public static MIDDLE: number = 8;
        /** 鼠标位置的消息 */
        public static MOUSE: number = 16;
        /** 频幕底部的消息 */
        public static BOTTOM: number = 32;
        /** 频幕底部BUFF的消息 */
        public static BUFF: number = 64;
        /** gm命令返回的信息（显示到聊天框-喇叭） */
        public static GMCMD: number = 128;
        /** 帮会 */
        public static GUILD: number = 0x100;
        /** 组队 */
        public static TEAM: number = 0x200;
        /** 弹窗提示 */
        public static ALERT: number = 0x400;

        /*** 顶部、系统公告广播颜色 */
        public static TOP_COLOR: number = 0xF5C84D;
        /*** 中上部、系统提示广播颜色 */
        public static MIDDLE_COLOR: number = 0xF1C600;
        /*** 底部、个人操作广播颜色 */
        public static BOTTOM_COLOR: number = 0xFF3300;
        /*** 鼠标位置的提示颜色 */
        public static MOUSE_COLOR: number = 0xFF3300;
        /*** 右下角的提示颜色 */
        public static CORNER_COLOR: number = 0xDED8C7;
        /*** BUFF提示颜色 */
        public static BUFF_COLOR: number = 0x00FF00;

        private static _topMessage: TopMessageView;
        private static _middleMessage: MiddleMessageView;
        private static _bottomMessage: BottomMessageView;
        private static _mousePosMessage: MousePosMessageView;
        /**提示信息*/
        private static _noticeMessage: GuideMessageView;

		/**
		 *
		 * @param type		提示类型
		 * @param text			提示内容
		 * @param count		（type=TOP）提示次数（大于1次，提示间隔是10秒左右）
		 * @param inPanel	（type=RIGHT）是否在信息面板中提示
		 *
		 */
        public static showNoticeTypeMsg(type: number, text: string, count: number = 1, inPanel: boolean = true, parent: fairygui.GComponent = null, bottomIcon: number = 0): void {
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
        }

		/**
		 * 客户端提示语言
		 * @param id    Q_notifyExpandBean中数据
		 * @param color 默认-1表示读取表里的配置颜色值
		 * @param args 	动态参数
		 *
		 */
        public static show(id: number, ...args): void {

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

            // if (args != null && args.length > 0) {
            //     tip = StringFormat.getSubstitute(tip, args);
            // }

            // this.showTip(tip, bean.q_type, bean.q_color, bottomIcon);
        }

        private static showTip(str: string, type: number, color: number, bottomIcon: number = 0): void {

            var c: number = this.getContentColor(color);
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
        }

		/**
		 * 获取颜色值
		 * @param color	（0红色，1绿色，2蓝色，3白色，4灰色）
		 * @return
		 */
        private static getContentColor(color: number = 0): number {

            if (this._colorJsonAry == null) {
                // var getGlobalConfigData: com.game.data.bean.Q_globalExpandBean = GameUtils.getGlobalConfigData(51);
                // var colorJson: string = getGlobalConfigData.q_string_value;
                this._colorJsonAry = JSON.parse('[{"type":0,"color":"#ff0000"},{"type":1,"color":"#7dff4f"},{"type":2,"color":"#00C8FA"},{"type":3,"color":"#ffffff"},{"type":4,"color":"#cccccc"},{"type":5,"color":"#ffff00"}]');
            }
            if (this._colorHash.hasOwnProperty(color)) {
                return this._colorHash.getItem(color);
            } else {
                for (var i: number = 0; i < this._colorJsonAry.length; i++) {
                    if (color == this._colorJsonAry[i].type) {
                        var c: string = this._colorJsonAry[i].color;
                        this._colorHash.setItem(color, parseInt("0x" + c.substr(1)));
                        break;
                    }
                }
            }
            return this._colorHash.getItem(color);
        }

        private static _colorJsonAry: Array<any>;
        private static _colorHash: flash.Dictionary = new flash.Dictionary();

		/**
		 * 主菜单上方的指引提示
		 * @param str
		 */
        public static showGuideMessage(str: string): void {

            // if ( this._guideMessage == null) {
            //     this._guideMessage = new GuideMessageView();
            // }
            // this._guideMessage.showGuideMessage(str);
        }

		/**
		 * 主菜单上方的指引提示
		 * @param str
		 */
        public static showNoticeMessage(str: string): void {

            if (this._noticeMessage == null) {
                this._noticeMessage = new GuideMessageView();
            }
            this._noticeMessage.showNoticeMessage(str);
        }

		/**
		 * 顶部、系统公告广播
		 * @param str
		 * @param color
		 * @param count	提示次数,间隔10秒提示
		 *
		 */
        public static showTopMessage(str: string, color: number = 0xF5C84D, count: number = 1): void {

            if (this._topMessage == null) {
                this._topMessage = new TopMessageView();
            }
            if (count == 1) {
                this._topMessage.showTopMessage(str, color);
            } else {
                var crt: number = egret.getTimer();
                var id: Object = Global.timer.doTimeLoop(30000, flash.bind(this.showTop, this), [crt, str, color, this], false); //30秒,这是个大概的时间，要改.
                this._topCountHash.setItem(crt, count);
                this._clearIdHash.setItem(crt, id);
                this.showTop(crt, str, color);
            }
        }
        private static _clearIdHash: flash.Dictionary = new flash.Dictionary();
        private static _topCountHash: flash.Dictionary = new flash.Dictionary();

        private static showTop(crt: number, str: string, color: number, thisObject: Notice = null): void {
            thisObject = thisObject || this;
            var count: number = Notice._topCountHash.getItem(crt);
            if (count == 0) {
                Global.timer.clearTimer(Notice._clearIdHash.getItem(crt));
                Notice._clearIdHash.delItem(crt);
            } else {
                Notice._topMessage.showTopMessage(str, color);
                Notice._topCountHash.setItem(crt, count - 1);
                count = Notice._topCountHash.getItem(crt);
            }
        }

		/**
		 * 中上部、系统提示广播
		 * @param str
		 * @param color
		 */
        public static showMiddleMessage(str: string, color: number = 0xF1C600): void {

            if (this._middleMessage == null) {
                this._middleMessage = new MiddleMessageView();
            }
            this._middleMessage.showMiddleMessage(str, color);
        }

		/**
		 * 检查是否底部已经有相同的msg了
		 * @param msg
		 * @return 
		 * 
		 */
        private static checkHasBottomMessage(msg: string): boolean {

            if (this._bottomMessage == null) {
                return false;
            }
            return this._bottomMessage.heightLightSameMsg(msg);
        }

		/**
		 * 底部、个人操作广播
		 * @param str
		 * @param color
		 * @param gap 	单位ms
		 * @param bottomIcon 	icon，默认0,蓝色icon
		 */
        public static showBottomMessage(str: string, color: number = 0xFF3300, gap: number = 0, bottomIcon: number = 0): void {
            if (str == null || str.length <= 0) {
                return;
            }

            str = Global.lang.getLang(str);

            if (gap > 0) {
                var lastT: number = parseInt("" + this._tempHash.getItem(str));
                var ct: number = egret.getTimer();
                if (lastT > 0) {
                    var gapT: number = ct - lastT;
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

            var leng: number = this._bottomAry.length;
            if (this._bottomMessage == null) {
                this._bottomMessage = new BottomMessageView();
            }
            if (leng > 3) {
                this._bottomMessage.show2();
            } else {
                this._bottomMessage.show();
            }
        }
        private static _tempHash: flash.Dictionary = new flash.Dictionary();
        private static _curTime: number = 0;
        private static _bottomAry: Array<any> = [];

        public static get bottomAry(): Array<any> {

            return this._bottomAry;
        }

        private static _cornerAry: Array<any> = [];

        public static get cornerAry(): Array<any> {

            return this._cornerAry;
        }

        private static _message: Array<any> = [];
		/**
		 * 信息面板中的信息最多100条
		 */
        public static MESSAGELENGTH: number = 100;

		/**
		 * 保存信息面板中的信息（100条）
		 */
        public static get message(): Array<any> {

            return this._message;
        }

        public static setMessage(value: string): void {

            while (this._message.length >= this.MESSAGELENGTH) {
                this._message.shift();
            }
            var time: string = StringFormat.resloveFormatHMS(com.time.ServerTime.serverTime * 0.001);
            var str: string = time + "    " + value;
            this._message.push(str);
            EventManager.dispatchEvent(GameEvent.ADD_MESSAGE, str);//用于消息面板显示消息
        }

        public static dieMessageAry: Array<any> = [];

        private static _loopId: Object;
        private static _mouseMsgAry: Array<any> = [];
        private static _oldStr: string;
        private static _oldStrTime: number;

		/**
		 * 显示对应语言ID的数据
		 * @param lang 语言包ID
		 * @param params 语言包对应参数
		 * @param args	对应的showMousePosMessage方法参数
		 */
        public static showMouseMessageById(lang: string, params: Array<any> = null, ...args): void {

            params = params || [];
            params.unshift(lang);
            var str: string = Global.lang.getLang.apply(Global.lang, params);
            args = args || [];
            args.unshift(str);
            this.showMousePosMessage.apply(this, args);
        }

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
        public static showMousePosMessage(str: string, color: number = Notice.MOUSE_COLOR, target: fairygui.GComponent = null, gp: egret.Point = null, continuous: boolean = true, ignoreSame: boolean = true, delay: number = 0): void {

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
                    this._loopId = Global.timer.doTimeLoop(200, flash.bind( this.loopShowMouseMsg , this ) , [target, this, gp, delay]);
                }
            }
            else {
                if (this._mousePosMessage == null) {
                    this._mousePosMessage = new MousePosMessageView();
                }
                this._mousePosMessage.showMousePosMessage(str, color, target, gp, delay);
            }
        }

        private static loopShowMouseMsg(parent: fairygui.GComponent, thisObject: any = null, gp: egret.Point = null, delay: number = 0): void {
            thisObject = thisObject || this;
            if (Notice._mouseMsgAry.length == 0) {
                if (Notice._loopId) {
                    Global.timer.clearTimer(thisObject._loopId);
                    thisObject._loopId = null;
                }
            } else {
                var ary: Array<any> = Notice._mouseMsgAry.shift();
                var str: string = ary[0], color: number = ary[1];
                parent = ary[2] || parent;
                gp = ary[3] || gp;
                delay = ary[4] || delay;
                var mousePosMessage: MousePosMessageView = MousePosMessageView.create();// fairui.Notice.getMousePosMessage();
                mousePosMessage.showMousePosMessage(str, color, parent, gp, delay);
            }
        }

		/**
		 * 测试提示文字信息:主要用于在测试环境下给出提示,正式环境下不给提示
		 * @param notice
		 * 
		 */
        public static debugMousePosNotice(notice: string): void {
            if (Config.isDebug) {
                Notice.showMousePosMessage(notice);
            }
        }

		/**
		 * 测试提示文字信息:主要用于在测试环境下给出提示,正式环境下不给提示
		 * @param notice
		 * @param color
		 * 
		 */
        public static debugBottomNotice(notice: string, color: number = 0xFF3300): void {
            if (Config.isDebug) {
                Notice.showBottomMessage(notice, color);
            }
        }

		/**
		 * 测试提示文字信息:主要用于在测试环境下给出提示,正式环境下不给提示
		 * @param notice
		 * @param color
		 * 
		 */
        public static debugTopNotice(notice: string, color: number = 0xFF3300): void {
            if (Config.isDebug) {
                Notice.showTopMessage(notice, color);
            }
        }

		/**
		 * 测试提示文字信息:主要用于在测试环境下给出提示,正式环境下不给提示
		 * @param notice
		 * @param color
		 * 
		 */
        public static debugShow(noticeId: number, ...args): void {
            if (Config.isDebug) {
                Notice.show(noticeId, args);
            }
        }
    }
}





