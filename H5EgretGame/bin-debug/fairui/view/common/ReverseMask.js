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
     * 反向遮罩
     * @author clong 2019.3.28
     */
    var ReverseMask = (function (_super) {
        __extends(ReverseMask, _super);
        function ReverseMask() {
            var _this = _super.call(this) || this;
            /**目标对象 */
            _this._target = null;
            _this._onUpdate = null;
            _this._onComplete = null;
            _this._thisObj = null;
            /**正在移动 */
            _this._isMoving = false;
            _this._texture = null;
            return _this;
        }
        ReverseMask.prototype.constructFromXML = function (xml) {
            _super.prototype.constructFromXML.call(this, xml);
            this.initUI();
        };
        ReverseMask.prototype.initUI = function () {
            this.sp.blendMode = egret.BlendMode.ERASE;
        };
        /**
         * 设置目标对象
         * @param target  	对应接受对象ELoader
         * @param onUpdate	刷新方法
         * @param onComplete完成方法
         * @param thisObj
         */
        ReverseMask.prototype.setTarget = function (target, onUpdate, onComplete, thisObj) {
            this._target = target;
            this._onUpdate = onUpdate;
            this._onComplete = onComplete;
            this._thisObj = thisObj;
        };
        /**
         * 移动中心点到目标位置
         * @param x 		中心点x坐标
         * @param y 		中心点y坐标
         * @param width 	中心点宽度
         * @param height	中心点高度
         */
        ReverseMask.prototype.moveTo = function (x, y, width, height) {
            var _self = this;
            if (this._target && !this._target.parent) {
                this.moveCircle(x, y, width, height);
                if (_self._onComplete) {
                    _self._onComplete.apply(_self._thisObj);
                }
                return;
            }
            this.sp.width = width * 2;
            this.sp.height = height * 2;
            this._isMoving = true;
            fairygui.GTween.to2(this.sp.width, this.sp.height, width, height, 0.4).setTarget(this.sp, this).onUpdate(onUpdate, this).onComplete(onComplete, this);
            function onUpdate(tw) {
                _self.moveCircle(x, y, tw.value.x, tw.value.y);
                if (_self._target instanceof fairui.ELoader) {
                    _self._target.texture = _self.texture;
                }
                if (_self._onUpdate) {
                    _self._onUpdate.apply(_self._thisObj);
                }
            }
            function onComplete() {
                _self.moveCircle(x, y, width, height);
                if (_self._target instanceof fairui.ELoader) {
                    _self._target.pixelHitTest = true;
                    _self._target.texture = _self.texture;
                }
                _self._isMoving = false;
                if (_self._onComplete) {
                    _self._onComplete.apply(_self._thisObj);
                }
            }
        };
        ReverseMask.prototype.moveCircle = function (x, y, w, h) {
            x = parseInt("" + x);
            y = parseInt("" + y);
            w = parseInt(w + "");
            h = parseInt(h + "");
            x = x % 2 == 1 ? x + 1 : x;
            y = y % 2 == 1 ? y + 1 : y;
            w = w % 2 == 1 ? w + 1 : w;
            h = h % 2 == 1 ? h + 1 : h;
            this.sp.setXY(x, y);
            this.sp.setSize(w, h);
        };
        Object.defineProperty(ReverseMask.prototype, "texture", {
            /**最后渲染纹理 */
            get: function () {
                if (this._texture == null) {
                    this._texture = new egret.RenderTexture();
                }
                this._texture.drawToTexture(this._container);
                return this._texture;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ReverseMask.prototype, "isMoving", {
            /**正在移动 */
            get: function () {
                return this._isMoving;
            },
            enumerable: true,
            configurable: true
        });
        ReverseMask.prototype.clear = function () {
            _super.prototype.clear.call(this);
            this._isMoving = false;
        };
        ReverseMask.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
            if (this._texture) {
                this._texture.dispose();
            }
            this._texture = null;
            this._target = null;
            this._onUpdate = null;
            this._onComplete = null;
            this._thisObj = null;
            this.sp = null;
            this.bg = null;
            this._isMoving = false;
        };
        return ReverseMask;
    }(fairui.BaseSprite));
    fairui.ReverseMask = ReverseMask;
    __reflect(ReverseMask.prototype, "fairui.ReverseMask");
})(fairui || (fairui = {}));
//# sourceMappingURL=ReverseMask.js.map