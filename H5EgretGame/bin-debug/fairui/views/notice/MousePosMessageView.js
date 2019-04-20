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
     * 鼠标位置的提示
     * @author cl 2018.3.27
     **/
    var MousePosMessageView = (function (_super) {
        __extends(MousePosMessageView, _super);
        function MousePosMessageView() {
            var _this = _super.call(this) || this;
            _this._prePosY = 0; //鼠标起始Y坐标
            _this.FRAME = 2;
            /**向上飘的时间,秒 */
            _this.TIME = 1;
            _this.UPHEIGHT = 40; //向上飘的高度
            //自定义全局坐标
            _this._gp = null;
            return _this;
        }
        MousePosMessageView.recover = function (view) {
            if (this.pool.indexOf(view) == -1) {
                this.pool.push(view);
            }
        };
        MousePosMessageView.create = function () {
            if (this.pool.length > 0) {
                return this.pool.pop();
            }
            return new MousePosMessageView();
        };
        /**
         * 鼠标位置的提示
         * @param str
         * @param color
         * @param parent		提示消息的父容器
         * @param gp            对应全局坐标,不填为默认鼠标点击位置
         * @param delay         延迟时间，秒
         */
        MousePosMessageView.prototype.showMousePosMessage = function (str, color, parent, gp, delay) {
            if (color === void 0) { color = 0xFF3300; }
            if (parent === void 0) { parent = null; }
            if (gp === void 0) { gp = null; }
            if (delay === void 0) { delay = 0; }
            var _self = this;
            this._gp = gp;
            if (this._isLoading)
                return;
            this._isLoading = true;
            if (parent == null) {
                this.thisParent = fairui.FairyUIManager.tipLayer;
            }
            else {
                this.thisParent = parent.parent;
                this._pChild = parent;
                if (this.thisParent == null) {
                    this.thisParent = fairui.FairyUIManager.tipLayer;
                }
            }
            var label = new fairui.BaseTextField();
            label.singleLine = true;
            label.autoSize = fairygui.AutoSizeType.Both; // TextFieldAutoSize.CENTER;
            label.align = fairygui.AlignType.Center;
            label.fontSize = 18;
            label.color = color;
            label.stroke = 1;
            label.strokeColor = 0x000000; //添加描边
            label.text = Global.lang.getLang(str);
            label.bold = true;
            this.addChild(label);
            this.thisParent.addChild(this); //直接显示
            this.width = label.width;
            this.setPos();
            if (delay > 0) {
                this.alpha = 0;
                // TweenLite.to(this, delay , {"alpha":1 , ease:Sine.easeInOut , onComplete:function(){
                //      TweenLite.to(_self, _self.TIME, { y: _self._prePosY - _self.UPHEIGHT, onComplete: flash.bind( _self.moveOver , _self ) , onCompleteParams: [label], ease: Linear.easeNone });
                // }});
                fairygui.GTween.to(_self.alpha, 1, delay).setTarget(this, this)
                    .setEase(fairygui.EaseType.SineInOut)
                    .onUpdate(function onUpdate(tw) {
                    _self.alpha = tw.value.x;
                }, _self)
                    .onComplete(function onComplete1() {
                    fairygui.GTween.to(_self.y, _self._prePosY - _self.UPHEIGHT, _self.TIME)
                        .setEase(fairygui.EaseType.Linear)
                        .onUpdate(function onUpdate(tw) {
                        _self.alpha = tw.value.x;
                    }, _self)
                        .onComplete(function onComplete2() {
                        _self.moveOver.apply(_self, [label]);
                    }, _self);
                }, _self);
            }
            else {
                //  TweenLite.to(this, this.TIME, { y: this._prePosY - this.UPHEIGHT, onComplete: flash.bind( this.moveOver , this ) , onCompleteParams: [label], ease: Linear.easeNone });
                fairygui.GTween.to(_self.y, _self._prePosY - _self.UPHEIGHT, _self.TIME).setTarget(this, this)
                    .setEase(fairygui.EaseType.Linear)
                    .onUpdate(function onUpdate(tw) {
                    _self.y = tw.value.x;
                }, _self)
                    .onComplete(function onComplete() {
                    _self.moveOver.apply(_self, [label]);
                }, _self);
            }
        };
        MousePosMessageView.prototype.moveOver = function (label) {
            if (label != null) {
                label.removeFromParent();
            }
            if (this.parent != null) {
                this._isLoading = false;
                this.removeFromParent();
                this.setPos();
                MousePosMessageView.recover(this);
            }
        };
        MousePosMessageView.prototype.setPos = function (event) {
            if (event === void 0) { event = null; }
            var gp = this._gp || new egret.Point(fairygui.GRoot.mouseX, fairygui.GRoot.mouseY);
            if (this.thisParent == fairui.FairyUIManager.tipLayer) {
                this.x = gp.x - (this.width * 0.5);
                if (this.x < 0) {
                    this.x = 0;
                }
                if (gp.x > Global.stageWidth - this.width) {
                    this.x = Global.stageWidth - this.width;
                }
                this._prePosY = this.y = gp.y - 10.0;
            }
            else {
                this.x = this._pChild.x + (this._pChild.width - this.width >> 1);
                this._prePosY = this.y = this._pChild.y - 10;
            }
        };
        /**鼠标消息组件池 */
        MousePosMessageView.pool = [];
        return MousePosMessageView;
    }(fairui.BaseSprite));
    fairui.MousePosMessageView = MousePosMessageView;
    __reflect(MousePosMessageView.prototype, "fairui.MousePosMessageView");
})(fairui || (fairui = {}));
//# sourceMappingURL=MousePosMessageView.js.map