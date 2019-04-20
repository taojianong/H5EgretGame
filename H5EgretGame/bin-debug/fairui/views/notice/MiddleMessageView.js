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
     * 系统提示广播(位置在中上部)
     * @author cl 2018.3.20
     **/
    var MiddleMessageView = (function (_super) {
        __extends(MiddleMessageView, _super);
        function MiddleMessageView() {
            var _this = _super.call(this) || this;
            _this.TOTALNUM = 4;
            _this.DELAYTIME = 300;
            _this.H = 40;
            _this._showIndex = 0;
            _this._count = 0; //计数
            _this._msgAry = [];
            _this._imageAry = [];
            _this._clearIdAry = [];
            _this.touchable = false;
            return _this;
        }
        /**
         * @param str
         * @param color
         */
        MiddleMessageView.prototype.showMiddleMessage = function (str, color) {
            if (!fairui.FairyUIManager.tipLayer.contains(this)) {
                fairui.FairyUIManager.tipLayer.addChild(this); //直接显示
                EventManager.addEventListener(GameEvent.STGAE_RESIZE, this.setPos, this);
            }
            this.setPos();
            this._msgAry.push(str);
            Global.timer.doTimeOnce(this.DELAYTIME, this.addLabelItem, [this]);
        };
        MiddleMessageView.prototype.addLabelItem = function (thisObject) {
            if (thisObject === void 0) { thisObject = null; }
            thisObject = thisObject || this;
            if (thisObject._count < thisObject.TOTALNUM) {
                var str = thisObject._msgAry[thisObject._showIndex];
                if (str) {
                    var item_1 = fairui.TipBottomItem.create();
                    item_1.show(str);
                    thisObject.addChild(item_1);
                    thisObject._showIndex++;
                    ++thisObject._count;
                    thisObject._imageAry.push(item_1);
                    thisObject.refreshPos();
                    // TweenLite.to(item, 0.1, {
                    //     x: (thisObject.width - 1.5 * item.width) / 2,
                    //     scaleX: 1.5, scaleY: 1.5, onComplete: thisObject.scale2Time, onCompleteParams: [item, thisObject]
                    // });//增加字体放大特效
                    var toX = (thisObject.width - 1.5 * item_1.width) / 2;
                    fairygui.GTween.to3(item_1.x, item_1.scaleX, item_1.scaleY, toX, 1.5, 1.5, 0.1).setTarget(item_1)
                        .onUpdate(function onUpdate(tw) {
                        item_1.x = tw.value.x;
                        item_1.scaleX = tw.value.y;
                        item_1.scaleY = tw.value.z;
                    }, this)
                        .onComplete(function onComplete() {
                        thisObject.scale2Time(item_1, thisObject);
                    }, this);
                }
            }
        };
        //0.5秒后恢复到正常字体
        MiddleMessageView.prototype.scale2Time = function (img, thisObject) {
            // TweenLite.to(img, 0.1, { x: (thisObject.width - img.width) / 2, y: thisObject._count * thisObject.H, scaleX: 1, scaleY: 1, onComplete: thisObject.showTime, onCompleteParams: [img, thisObject], delay: 0.5 });
            var toX = (thisObject.width - img.width) / 2;
            var toY = thisObject._count * thisObject.H;
            fairygui.GTween.to4(img.x, img.y, img.scaleX, img.scaleY, toX, toY, 1, 1, 0.1).setTarget(img)
                .setDelay(0.5)
                .onUpdate(function onUpdate(tw) {
                img.x = tw.value.x;
                img.y = tw.value.y;
                img.scaleX = tw.value.z;
                img.scaleY = tw.value.w;
            }, thisObject)
                .onComplete(function onComplete() {
                thisObject.showTime(img, thisObject);
            }, thisObject);
        };
        //正常显示4秒后
        MiddleMessageView.prototype.showTime = function (img, thisObject) {
            thisObject.refreshPos();
            Global.timer.doTimeOnce(thisObject.DELAYTIME, thisObject.addLabelItem);
            var id = Global.timer.doTimeOnce(4000, flash.bind(thisObject.scale1Time, this), [img, thisObject], false);
            thisObject._clearIdAry.push(id);
        };
        //文字1秒内渐弱至消失
        MiddleMessageView.prototype.scale1Time = function (img, thisObject) {
            if (thisObject === void 0) { thisObject = null; }
            thisObject = thisObject || this;
            Global.timer.clearTimer(thisObject._clearIdAry.shift());
            // TweenLite.to(img, 1, { alpha: 0.01, onComplete: thisObject.removeImage, onCompleteParams: [img, thisObject] });
            fairygui.GTween.to(img.alpha, 0.01, 1).setTarget(img)
                .onUpdate(function onUpdate(tw) {
                img.alpha = tw.value.x;
            }, thisObject)
                .onComplete(function onComplete() {
                thisObject.removeImage(img, thisObject);
            }, thisObject);
        };
        MiddleMessageView.prototype.removeImage = function (img, thisObject) {
            if (thisObject === void 0) { thisObject = null; }
            thisObject.removeLabelChild(img);
            thisObject.refreshPos();
            if (thisObject._count < thisObject.TOTALNUM && thisObject._count > 0) {
                Global.timer.doTimeOnce(thisObject.DELAYTIME, thisObject.addLabelItem, [thisObject]);
            }
            if (thisObject._count == 0) {
                thisObject._imageAry = [];
                thisObject._msgAry = [];
                thisObject._showIndex = 0;
                if (fairui.FairyUIManager.tipLayer.contains(thisObject)) {
                    fairui.FairyUIManager.tipLayer.removeChild(thisObject);
                    EventManager.removeEventListener(GameEvent.STGAE_RESIZE, thisObject.setPos, thisObject);
                }
            }
        };
        MiddleMessageView.prototype.removeLabelChild = function (image) {
            if (image && image.parent) {
                image.recover();
                image = null;
                this._imageAry.shift();
                --this._count;
            }
            else {
                this._imageAry = this._msgAry = [];
                this._count = this._showIndex = 0;
                if (fairui.FairyUIManager.tipLayer.contains(this)) {
                    EventManager.removeEventListener(GameEvent.STGAE_RESIZE, this.setPos, this);
                    fairui.FairyUIManager.tipLayer.removeChild(this);
                }
            }
        };
        MiddleMessageView.prototype.setPos = function (event) {
            if (event === void 0) { event = null; }
            this.x = (Global.stageWidth - this.width) / 2;
            this.y = Global.stageHeight * 0.18;
        };
        /**
         * 来新的消息要重新刷新位置
         */
        MiddleMessageView.prototype.refreshPos = function () {
            var _loop_1 = function (i) {
                var item = this_1._imageAry[i];
                // TweenLite.to(item, 0.3, { y: i * this.H });
                fairygui.GTween.to(item.y, i * this_1.H, 0.3).setTarget(item)
                    .onUpdate(function onUpdate(tw) {
                    item.y = tw.value.x;
                }, this_1);
            };
            var this_1 = this;
            for (var i = 0; i < this._imageAry.length; i++) {
                _loop_1(i);
            }
        };
        Object.defineProperty(MiddleMessageView.prototype, "width", {
            get: function () {
                return 790;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MiddleMessageView.prototype, "height", {
            get: function () {
                return 40;
            },
            enumerable: true,
            configurable: true
        });
        return MiddleMessageView;
    }(fairui.BaseSprite));
    fairui.MiddleMessageView = MiddleMessageView;
    __reflect(MiddleMessageView.prototype, "fairui.MiddleMessageView");
})(fairui || (fairui = {}));
//# sourceMappingURL=MiddleMessageView.js.map