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
     * 底部信息提示(位置在中下部)
     * @author cl 2018.3.19
     **/
    var BottomMessageView = (function (_super) {
        __extends(BottomMessageView, _super);
        function BottomMessageView() {
            var _this = _super.call(this) || this;
            /**底部提示框高度位置*/
            _this.MSGHEIGHT = 260;
            _this.DELAYTIME = 400;
            _this.DELAYTIME2 = 100;
            _this.H = 60;
            _this.TOTALNUM = 4;
            // private _defaultFormat:TextFormat;
            _this._showIndex = 0;
            _this._count = 0; //计数
            _this._msgAry = []; //存信息
            // private _colorAry: Array<any> = []; //存信息的颜色值
            // private _bottomIconAry: Array<any> = []; //存底部icon的类型，0：蓝色，1：黄色，2：红色
            _this._bgImageAry = [];
            // private _iconImageAry: Array<any> = [];
            // private _textFieldAry: Array<any> = [];
            _this._clearIdDic = new flash.Dictionary(); //存储计时器
            _this._alphaIdDic = new flash.Dictionary(); //存储计时器
            _this._begin = true;
            _this._msgContainer = new fairui.BaseSprite();
            _this.addChild(_this._msgContainer);
            _this.touchable = false;
            return _this;
        }
        BottomMessageView.prototype.show = function () {
            var thisObject = this;
            if (this._begin) {
                this._begin = false;
                Global.timer.clearTimer(this.showBottomMessage);
                Global.timer.doTimeLoop(this.DELAYTIME, flash.bind(this.showBottomMessage, thisObject), [thisObject]);
                EventManager.addEventListener(GameEvent.STGAE_RESIZE, this.setPos, this);
                this.setPos();
            }
        };
        BottomMessageView.prototype.show2 = function () {
            var thisObject = this;
            if (!this._begin) {
                this._begin = true;
                Global.timer.clearTimer(this.showBottomMessage);
                Global.timer.doTimeLoop(this.DELAYTIME2, flash.bind(this.showBottomMessage, thisObject), [thisObject]);
            }
        };
        BottomMessageView.prototype.showBottomMessage = function (thisObject) {
            var arr = fairui.Notice.bottomAry.shift();
            if (arr == null) {
                Global.timer.clearTimer(thisObject.showBottomMessage);
                thisObject._begin = true;
                return;
            }
            var str = arr[0];
            var color = arr[1];
            var bottomIcon = arr[2];
            var isHeightLight = arr[3]; //是否高亮
            if (!fairui.FairyUIManager.tipLayer.contains(thisObject)) {
                fairui.FairyUIManager.tipLayer.addChild(thisObject);
            }
            thisObject._msgAry.push(str);
            // thisObject._colorAry.push(color);
            // thisObject._bottomIconAry.push(bottomIcon);
            thisObject.addLabelItem(isHeightLight);
        };
        /**
         * 添加提示组件
         * @param isHeightLight 是否高亮
         *
         */
        BottomMessageView.prototype.addLabelItem = function (isHeightLight) {
            var str = this._msgAry[this._showIndex];
            if (str != null && str.length > 0) {
                if (this._count >= this.TOTALNUM) {
                    this.removeBaseSpriteChild(this._bgImageAry[0]);
                }
                // var iconIndex:number = this._bottomIconAry[this._showIndex];
                // var bgUrl:string = "";
                // var iconVis: boolean = false;
                // if (iconIndex == -1) {
                //     bgUrl = fairygui.UIPackage.getItemURL("common","img_notice_01");//notice_bg1
                //     iconIndex = 0;
                //     iconVis = false;
                // } else {
                //     bgUrl = fairygui.UIPackage.getItemURL("common","img_notice_02");//notice_bg1
                //     iconVis = true;
                // }
                // var bgImg: BaseImage = this.getImage();
                // bgImg.alpha = 1;
                // bgImg.url = bgUrl;
                // bgImg.height = this.H;
                // bgImg.y = -this._count * bgImg.height;
                // //bgImg.sizeGrid = "90,2,90,2";
                // bgImg.width = 373;
                // this._msgContainer.addChild(bgImg);
                // var icon: BaseImage = this.getIconImage();
                // icon.alpha = 1;
                // icon.url = fairygui.UIPackage.getItemURL("common","bottom_icon_"+iconIndex);
                // icon.x = icon.width * 0.5;
                // icon.y = (bgImg.height-icon.height)>>1;
                // icon.visible = iconVis;
                // icon.name = "msgIcon";
                // bgImg.addChild(icon);
                // var label:BaseTextField = new BaseTextField();
                // label.color = this._colorAry[this._showIndex];
                // label.align = fairygui.AlignType.Left;
                // label.autoSize = fairygui.AutoSizeType.Both;
                // label.fontSize = 24;
                // label.width = 200;
                // label.text = str;
                // label.name = "msgLabel";
                // label.filters = [new egret.GlowFilter(0x000000, 1, 2, 2, 5, 1)];
                // bgImg.addChild(label);
                // if (icon.visible) {
                //     label.x = icon.width * 0.5; //bgImg.width - label.textWidth >> 1;
                //     let w:number = label.x + label.textWidth + 30;
                //     bgImg.width = w > 250 ? label.x + label.textWidth + 30 : 250;
                // } else {
                //     label.x = bgImg.width - label.textWidth >> 1;
                // }
                // label.y = bgImg.height - label.textHeight >> 1;                
                // bgImg.x = (this.width - bgImg.width) * 0.5 + 35;
                // icon.x = -icon.width * 0.5;
                // this._textFieldAry.push(label);
                var item = this.getImage();
                item.alpha = item.scaleX = item.scaleY = 1;
                item.show(str);
                this._msgContainer.addChild(item);
                ++this._count;
                ++this._showIndex;
                this._bgImageAry.push(item);
                // this._iconImageAry.push(icon);
                this.refreshPos();
                this.showTime(item);
            }
        };
        /**
         * 去除重复的提示文字,高亮显示已经有的提示文字(现在是出现了重复的就把原来的移除,添加最新的)
         */
        BottomMessageView.prototype.heightLightSameMsg = function (msg) {
            // var bg: BaseImage = null;
            var item = null;
            // var icon: BaseImage = null;
            for (var i = 0; i < this._bgImageAry.length; i++) {
                item = this._bgImageAry[i];
                if (item.text == msg) {
                    // bg = this._bgImageAry[i] as TipBottomItem;
                    this.removeBaseSpriteChildNew(item);
                    return true;
                }
            }
            return false;
        };
        //正常显示4秒后
        BottomMessageView.prototype.showTime = function (image) {
            var thisObject = this;
            var id = Global.timer.doTimeOnce(4000, flash.bind(this.scale1Time, this), [image, thisObject], false);
            //_clearIdAry.push(id);
            this._clearIdDic.setItem(image, id);
            //trace("showTime:"+image);
        };
        //文字1秒内渐弱至消失
        BottomMessageView.prototype.scale1Time = function (image, thisObject) {
            var id = Global.timer.doFrameLoop(1, flash.bind(thisObject.resumeAlpha, this), [image, thisObject], false);
            // this._alphaIdDic[image] = id;
            thisObject._alphaIdDic.setItem(image, id);
            //trace("scale1Time:"+image);
        };
        /**
         * 改变透明度
         * @param image
         *
         */
        BottomMessageView.prototype.resumeAlpha = function (image, thisObject) {
            image.alpha -= 0.03;
            if (image.alpha <= 0.01) {
                thisObject.removeBaseSpriteChildNew(image);
            }
        };
        /**
         * 移除定时器
         * @param image
         *
         */
        BottomMessageView.prototype.clearTimerDic = function (image) {
            if (image == null) {
                return;
            }
            if (this._alphaIdDic.hasOwnProperty(image)) {
                Global.timer.clearTimer(this._alphaIdDic.getItem(image));
                this._alphaIdDic.setItem(image, null);
                this._alphaIdDic.delItem(image);
            }
            if (this._clearIdDic.hasOwnProperty(image)) {
                Global.timer.clearTimer(this._clearIdDic.getItem(image));
                this._clearIdDic.setItem(image, null);
                this._clearIdDic.delItem(image);
            }
        };
        /**
         * 移除所有定时器
         * @param image
         *
         */
        BottomMessageView.prototype.clearAllTimerDic = function () {
            this._alphaIdDic.forEach(function (key, data) {
                Global.timer.clearTimer(data);
            }, this);
            this._alphaIdDic = new flash.Dictionary();
            this._clearIdDic.forEach(function (key, data) {
                Global.timer.clearTimer(data);
            }, this);
            this._clearIdDic = new flash.Dictionary();
        };
        /**
         * 移除底部通知组件
         * @param image
         *
         */
        BottomMessageView.prototype.removeBaseSpriteChildNew = function (image) {
            var index = this._bgImageAry.indexOf(image);
            if (index == -1) {
                if (image != null && image.parent != null) {
                    image.parent.removeChild(image);
                    //--_count;
                    this.refreshPos();
                }
                this.clearTimerDic(image);
                image = null;
            }
            else {
                // var label: BaseTextField = null;
                // var labArr: Array<any> = this._textFieldAry.splice(index, 1);
                // if (labArr != null && labArr.length > 0) {
                //     label = labArr[0];
                // }
                // if (label != null && label.parent != null) {
                //     label.parent.removeChild(label);
                //     label = null;
                // }
                // var icon: BaseImage = null;
                // var iconArr: Array<any> = this._iconImageAry.splice(index, 1);
                // if (iconArr != null && iconArr.length > 0) {
                //     icon = iconArr[0];
                // }
                // if (icon != null && icon.parent != null) {
                //     icon.parent.removeChild(icon);
                //     icon = null;
                // }
                if (image != null && image.parent != null) {
                    this.clearTimerDic(image);
                    image.parent.removeChild(image);
                    image = null;
                    this._bgImageAry.splice(index, 1);
                    --this._count;
                    this.refreshPos();
                }
            }
            if (this._count == 0) {
                this.removeAll();
            }
        };
        /**
         * 移除底部通知组件[弃用]
         * @param image
         *
         */
        BottomMessageView.prototype.removeBaseSpriteChild = function (image) {
            // var label: BaseTextField = this._textFieldAry.shift() as BaseTextField;
            // if (label && label.parent) {
            //     label.parent.removeChild(label);
            //     label = null;
            // }
            // var icon: TipBottomItem = this._iconImageAry.shift() as TipBottomItem;
            // if (icon && icon.parent) {
            //     //_iconImagePool.push(icon);
            //     icon.parent.removeChild(icon);
            //     icon = null;
            // }
            if (image && image.parent) {
                image.alpha = 1;
                //_bgImagePool.push(image);
                this.clearTimerDic(image);
                image.parent.removeChild(image);
                image = null;
                this._bgImageAry.shift();
                --this._count;
                this.refreshPos();
            }
            else {
                var image2 = this._bgImageAry.shift();
                if (image2 && image2.parent) {
                    image2.alpha = 1;
                    //_bgImagePool.push(image2);
                    image2.parent.removeChild(image2);
                    image2 = null;
                    --this._count;
                    this.refreshPos();
                }
                else {
                    //异常
                    var i = 0;
                    // for (var i:number = 0; i < this._textFieldAry.length; i++) {
                    //     label = this._textFieldAry[i] as BaseTextField;
                    //     if (label && label.parent) {
                    //         label.parent.removeChild(label);
                    //         //_labelPool.push(label);
                    //         label = null;
                    //     }
                    // }
                    for (i = 0; i < this._bgImageAry.length; i++) {
                        image2 = this._bgImageAry[i];
                        if (image2 && image2.parent) {
                            image2.parent.removeChild(image2);
                            image2.alpha = 1;
                            //_bgImagePool.push(image2);
                            image2 = null;
                        }
                    }
                    this._count = 0;
                }
            }
            if (this._count == 0) {
                this.removeAll();
            }
        };
        BottomMessageView.prototype.removeAll = function () {
            this._count = 0;
            this._bgImageAry = [];
            // this._iconImageAry = [];
            // this._textFieldAry = [];
            this._msgAry = [];
            // this._colorAry = [];
            // this._bottomIconAry = [];
            this._showIndex = 0;
            this.clearAllTimerDic();
            if (fairui.FairyUIManager.tipLayer.contains(this)) {
                EventManager.removeEventListener(GameEvent.STGAE_RESIZE, this.setPos, this);
                fairui.FairyUIManager.tipLayer.removeChild(this);
            }
        };
        /**
         * 设置底部提示框位置
         */
        BottomMessageView.prototype.setPos = function () {
            this.x = (Global.stageWidth - this.width) * 0.5;
            this.y = Global.stageHeight - this.MSGHEIGHT - 12;
        };
        /**
         * 来新的消息要重新刷新位置
         */
        BottomMessageView.prototype.refreshPos = function () {
            var count = this._bgImageAry.length;
            for (var i = 0; i < count; i++) {
                var img = this._bgImageAry[i];
                if (img) {
                    // TweenLite.to(img, 0.1, { y: -i * this.H, delay: 0.05 * i });
                    fairygui.GTween.to(img.y, -i * this.H, 0.1).setDelay(0.05 * i)
                        .onUpdate(function onUpdate(tw) {
                        img.y = tw.value.x;
                    }, this);
                }
            }
        };
        Object.defineProperty(BottomMessageView.prototype, "width", {
            get: function () {
                return 790;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BottomMessageView.prototype, "height", {
            get: function () {
                return 60;
            },
            enumerable: true,
            configurable: true
        });
        BottomMessageView.prototype.getImage = function () {
            return fairui.PanelRegister.createGObject("tip", "TipBottomItem");
        };
        // private getIconImage(): BaseImage {
        //     return new BaseImage();
        // }
        BottomMessageView.prototype.getBaseTextField = function () {
            return new fairui.BaseTextField();
        };
        return BottomMessageView;
    }(fairui.BaseSprite));
    fairui.BottomMessageView = BottomMessageView;
    __reflect(BottomMessageView.prototype, "fairui.BottomMessageView");
})(fairui || (fairui = {}));
//# sourceMappingURL=BottomMessageView.js.map