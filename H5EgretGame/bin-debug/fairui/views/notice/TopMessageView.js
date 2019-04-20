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
     * 屏幕上方居中显示的系统消息
     * @author cl 2018.3.20
     **/
    var TopMessageView = (function (_super) {
        __extends(TopMessageView, _super);
        function TopMessageView() {
            var _this = _super.call(this) || this;
            /**100毫秒*/
            _this.DELAYTIME = 100;
            _this.FRAME = 20; // 毫秒
            _this.TIME = 10; //总共需要这个时间完成滚动消息
            // private _bg: BaseImage;
            _this._showIndex = 0;
            _this._count = 0;
            _this._msgAry = [];
            _this._colorAry = [];
            _this._textFieldAry = [];
            _this._clearIdAry = [];
            _this._textFieldPool = new Array();
            _this.touchable = false;
            // if (this._bg == null) {
            //     this._bg = new BaseImage();
            //     this._bg.setFairySource("common", "img_notice_01");
            //     this._bg.height = this.height;
            //     this.addChild(this._bg);
            // }
            _this._labelSprite = new fairui.BaseSprite();
            _this.addChild(_this._labelSprite);
            _this.mask = new egret.Rectangle(5, 0, _this.width, _this.height);
            EventManager.addEventListener(GameEvent.STGAE_RESIZE, _this.setPos, _this);
            if (!fairui.FairyUIManager.tipLayer.contains(_this))
                fairui.FairyUIManager.tipLayer.addChild(_this);
            return _this;
        }
        /**
         * 系统公告广播(位置在中间顶部)
         * @param content
         * @param color
         */
        TopMessageView.prototype.showTopMessage = function (content, color) {
            if (!fairui.FairyUIManager.tipLayer.contains(this)) {
                fairui.FairyUIManager.tipLayer.addChild(this); //直接显示
                EventManager.addEventListener(GameEvent.STGAE_RESIZE, this.setPos, this);
            }
            this.setPos();
            if (this._msgAry.length > 10)
                this.removeAllLabelItem();
            this._msgAry.push(content);
            this._colorAry.push(color);
            Global.timer.doTimeOnce(this.DELAYTIME, this.addLabelItem, [this]);
        };
        TopMessageView.prototype.removeAllLabelItem = function () {
            this._msgAry.splice(0, this._msgAry.length);
            this._colorAry.splice(0, this._colorAry.length);
            var len = this._clearIdAry.length;
            for (var i = 0; i < len; i++)
                Global.timer.clearTimer(this._clearIdAry.shift());
            this._textFieldAry.splice(0, this._textFieldAry.length);
            var num = this._labelSprite.numChildren;
            for (var k = 0; k < num; k++)
                this._labelSprite.removeChildAt(0);
            this._showIndex = 0;
            this._count = 0;
            this._msgAry = [];
            this._colorAry = [];
            this._preLabel = null;
        };
        TopMessageView.prototype.addLabelItem = function (thisObject) {
            if (thisObject === void 0) { thisObject = null; }
            thisObject = thisObject || this;
            var str = thisObject._msgAry[thisObject._showIndex];
            if (str != null) {
                var label = thisObject.getBaseTextField();
                label.alpha = 1;
                label.color = thisObject._colorAry[thisObject._showIndex] == null ? fairui.Notice.TOP_COLOR : thisObject._colorAry[thisObject._showIndex];
                label.autoSize = fairygui.AutoSizeType.Both; // TextFieldAutoSize.CENTER;
                label.fontSize = 18;
                label.align = fairygui.AlignType.Center;
                label.singleLine = true;
                label.touchable = false;
                label.text = str;
                label.width = label.textWidth;
                label.filters = [new egret.GlowFilter(0x370000, 1, 2, 2, 5, 1)];
                label.y = (thisObject.height - label.height) * 0.5 + 3;
                if (thisObject._preLabel == null)
                    label.x = thisObject.width;
                else
                    label.x = thisObject._preLabel.x + thisObject._preLabel.width < thisObject.width ? thisObject.width : thisObject._preLabel.x + thisObject._preLabel.width + 20;
                thisObject._preLabel = label;
                thisObject._labelSprite.addChild(label);
                ++thisObject._count;
                ++thisObject._showIndex;
                thisObject._textFieldAry.push(label);
                thisObject.showTime(label);
            }
        };
        TopMessageView.prototype.showTime = function (label) {
            Global.timer.doTimeOnce(this.DELAYTIME, this.addLabelItem, [this]);
            var id = Global.timer.doTimeLoop(this.FRAME, flash.bind(this.moveTo, this), [label, this], false);
            this._clearIdAry.push(id);
        };
        TopMessageView.prototype.moveTo = function (txt, thisObject) {
            txt.x -= thisObject.width / (1000 / thisObject.FRAME * thisObject.TIME);
            if (txt.x <= -txt.width * 2) {
                Global.timer.clearTimer(thisObject._clearIdAry.shift());
                // TweenLite.to(txt, 0.1, { alpha: 0.01, onComplete: thisObject.removeLabel, onCompleteParams: [txt,thisObject] });
                fairygui.GTween.to(1, 0.01, 0.1).setTarget(txt)
                    .onUpdate(function onUpdate(tw) {
                    txt.alpha = tw.value.x;
                }, thisObject)
                    .onComplete(function onComplete() {
                    if (thisObject.removeLabel != null) {
                        thisObject.removeLabel.apply(thisObject, [txt, thisObject]);
                    }
                }, thisObject);
            }
            else if (txt.x < (thisObject.width - txt.width)) {
                thisObject.addLabelItem();
            }
        };
        TopMessageView.prototype.removeLabel = function (textField, thisObject) {
            if (textField && textField.parent) {
                textField.parent.removeChild(textField);
                thisObject._textFieldPool.push(textField);
                textField = null;
                thisObject._textFieldAry.shift();
                --thisObject._count;
            }
            else {
                for (var i = 0; i < thisObject._textFieldAry.length; i++) {
                    textField = thisObject._textFieldAry[i];
                    if (textField && textField.parent) {
                        textField.parent.removeChild(textField);
                        thisObject._textFieldPool.push(textField);
                        textField = null;
                        --thisObject._count;
                    }
                }
                thisObject._textFieldAry = thisObject._msgAry = thisObject._colorAry = [];
                thisObject._count = thisObject._showIndex = 0;
                return;
            }
            if (thisObject._count > 0) {
                Global.timer.doTimeOnce(thisObject.DELAYTIME, thisObject.addLabelItem, [thisObject]);
            }
            if (thisObject._count == 0) {
                thisObject._msgAry = [];
                thisObject._colorAry = [];
                thisObject._showIndex = 0;
                thisObject._preLabel = null;
                if (fairui.FairyUIManager.tipLayer.contains(thisObject)) {
                    fairui.FairyUIManager.tipLayer.removeChild(thisObject);
                }
            }
        };
        // private createShap(): BaseShape {
        //     let sh: BaseShape = new BaseShape();
        //     sh.graphics.clear();
        //     sh.graphics.beginFill(0);
        //     sh.graphics.drawRect(0, 0, this.width, this.height);
        //     sh.graphics.endFill();
        //     return sh;
        // }
        TopMessageView.prototype.setPos = function (event) {
            if (event === void 0) { event = null; }
            this.y = 135;
            this.x = Global.stageWidth - this.width >> 1;
        };
        Object.defineProperty(TopMessageView.prototype, "width", {
            get: function () {
                return 790;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TopMessageView.prototype, "height", {
            get: function () {
                return 60;
            },
            enumerable: true,
            configurable: true
        });
        TopMessageView.prototype.getBaseTextField = function () {
            if (this._textFieldPool.length > 0) {
                return this._textFieldPool.pop();
            }
            return new fairygui.GTextField();
        };
        return TopMessageView;
    }(fairui.View));
    fairui.TopMessageView = TopMessageView;
    __reflect(TopMessageView.prototype, "fairui.TopMessageView");
})(fairui || (fairui = {}));
//# sourceMappingURL=TopMessageView.js.map