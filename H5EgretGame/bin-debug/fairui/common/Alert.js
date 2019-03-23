var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var fairui;
(function (fairui) {
    /**
     * Alert 弹框
     * @author clong 2019.3.23
     */
    var Alert = (function (_super) {
        __extends(Alert, _super);
        function Alert() {
            return _super.call(this, "common", "AlertView") || this;
        }
        /**
         * 显示弹出框
         * @param content   要显示的提示文本
         * @param title     标题文字
         * @param flag      显示按钮状态 Alert.OK | Alert.CANCEL
         * @param data      其他参数(方法要使用flash.bind) okFunc,okFuncParams,cancelFunc,cancelFuncParams,showMask,showText
         */
        Alert.show = function (content, title, flag, data) {
            if (title === void 0) { title = ""; }
            if (flag === void 0) { flag = 1; }
            if (data === void 0) { data = null; }
            data = data || {};
            data["content"] = App.lang.getLang(content);
            data["title"] = title;
            data["flag"] = flag;
            fairui.FairyUIManager.openPanel(EnumPanelID.ALERT, data);
        };
        /**隐藏弹出框*/
        Alert.hide = function () {
            fairui.FairyUIManager.closePanel(EnumPanelID.ALERT);
        };
        Alert.prototype.init = function () {
            _super.prototype.init.call(this);
            // this.showCloseBtn = false; //关闭按钮没有绑定到按钮上的逻辑，所以不能显示关闭按钮，如果要显示一定要显示，必须绑定对应按钮的逻辑才行 不然会有很多BUG
            this.addPanelEventListener(egret.TouchEvent.TOUCH_TAP, this.touchOkHandler, this.btn_ok);
            this.addPanelEventListener(egret.TouchEvent.TOUCH_TAP, this.touchCancelHandler, this.btn_cancel);
            this.addPanelEventListener(egret.TouchEvent.TOUCH_TAP, this.close, this.btn_close);
        };
        /**点击确定*/
        Alert.prototype.touchOkHandler = function (e) {
            this.close(false);
            if (this.data != null && this.data.hasOwnProperty("okFunc")) {
                var okParams = this.data.hasOwnProperty("okFuncParams") ? this.data["okFuncParams"] : [];
                this.data["okFunc"].apply(this.data["okFunc"]["owner"], okParams);
            }
        };
        /**点击确定*/
        Alert.prototype.touchCancelHandler = function (e) {
            this.close(false);
            if (this.data != null && this.data.hasOwnProperty("cancelFunc")) {
                var cancelParams = this.data.hasOwnProperty("cancelFuncParams") ? this.data["cancelFuncParams"] : [];
                this.data["cancelFunc"].apply(this.data["cancelFunc"]["owner"], cancelParams);
            }
        };
        /**显示数据*/
        Alert.prototype.show = function (data) {
            if (data && data.hasOwnProperty("showMask")) {
                this.openTapMask = data["showMask"];
            }
            _super.prototype.show.call(this, data);
            if (data != null) {
                this.title = data["title"];
                this.content = data["content"];
                if (data["okTitle"]) {
                    this.btn_ok.text = data["okTitle"];
                }
                else {
                    this.btn_ok.text = App.lang.getLang("login_ui_txt1");
                }
                this.showBtn(data["flag"]);
                //关闭按钮没有绑定到按钮上的逻辑，所以不能显示关闭按钮，如果要显示一定要显示，必须绑定对应按钮的逻辑才行 不然会有很多BUG
                if (data.hasOwnProperty("showCloseBtn") && data["showCloseBtn"] == true) {
                    this.btn_close.visible = true;
                }
                else {
                    this.btn_close.visible = false; //隐藏关闭按钮
                }
                if (data.hasOwnProperty("showText")) {
                    this.btn_ok.text = data["showText"][0];
                    if (data["showText"].length > 1)
                        this.btn_cancel.text = data["showText"][1];
                }
                else {
                    this.btn_ok.text = App.lang.getLang("login_ui_txt1");
                    this.btn_cancel.text = App.lang.getLang("cancel");
                }
            }
        };
        Alert.prototype.hide = function () {
            _super.prototype.hide.call(this);
            this.hideMask();
        };
        Object.defineProperty(Alert.prototype, "title", {
            /**
             * 设置标题
             */
            get: function () {
                return this.txt_title.text;
            },
            set: function (value) {
                this.txt_title.text = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Alert.prototype, "content", {
            /**
             * 显示内容
             */
            get: function () {
                return this.txt_content.text;
            },
            set: function (value) {
                this.txt_content.text = value || "";
            },
            enumerable: true,
            configurable: true
        });
        //显示确定取消按钮
        Alert.prototype.showBtn = function (flag) {
            if (flag === void 0) { flag = 1; }
            if (this.btn_ok != null) {
                this.btn_ok.removeFromParent();
            }
            if (this.btn_cancel != null) {
                this.btn_cancel.removeFromParent();
            }
            if (flag & Alert.OK) {
                this.view.addChild(this.btn_ok);
            }
            if (flag & Alert.CANCEL) {
                this.view.addChild(this.btn_cancel);
            }
            this.setBtnXY();
        };
        /**
         * 设置按钮坐标
         */
        Alert.prototype.setBtnXY = function () {
            //当只有确定按钮或取消按钮时，居中显示确定按钮或取消按钮
            if (this.btn_ok.parent != null && this.btn_cancel.parent != null) {
                this.btn_ok.x = this.img_bg.x + 297; //this.img_bg.x + 55;
                this.btn_cancel.x = this.img_bg.x + 63; //this.img_bg.x + 219;
            }
            else if (this.btn_ok.parent != null && this.btn_cancel.parent == null) {
                this.btn_ok.x = (this.width - this.btn_ok.width) * 0.5 - 10;
            }
        };
        /**
         * 调整关闭按钮位置
         */
        Alert.prototype.adjustBtnClosePos = function () {
            // if (this.btn_close != null) {
            //     this.btn_close.x = this.img_bg.x + this.img_bg.width - this.btn_close.width * 0.5 - 10;
            //     this.btn_close.y = this.img_bg.y - this.btn_close.height * 0.5 + 5;
            // }
        };
        Alert.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
            this.hideMask();
            this._data = null;
        };
        /**都不显示 */
        Alert.NULL = 0;
        /**确定 */
        Alert.OK = 1;
        /**取消 */
        Alert.CANCEL = 2;
        return Alert;
    }(fairui.BasePanel));
    fairui.Alert = Alert;
    __reflect(Alert.prototype, "fairui.Alert");
})(fairui || (fairui = {}));
//# sourceMappingURL=Alert.js.map