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
    var CEffect = (function (_super) {
        __extends(CEffect, _super);
        function CEffect() {
            var _this = _super.call(this) || this;
            _this._lastFrameParams = null;
            _this.initY = 0;
            return _this;
        }
        CEffect.prototype.checkMousePoint = function () {
            var bool = false;
            //@TODO 未实现
            // if(this.view)
            // {
            // 	let color:number = flash.checkUint(this.view.getPixel32(this.view["mouseX"],this.view["mouseY"]));
            // 	if(color > 0)
            // 		bool = flash.tranint(color & 0xFF000000) > 30?true:false;
            // }
            return bool;
        };
        Object.defineProperty(CEffect.prototype, "lastFrameHanderCallBack", {
            get: function () {
                return this._lastFrameHanderCallBack;
            },
            set: function (value) {
                this._lastFrameHanderCallBack = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CEffect.prototype, "lastFrameParams", {
            /**最后一帧调用方法参数 */
            get: function () {
                return this._lastFrameParams;
            },
            set: function (value) {
                this._lastFrameParams = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CEffect.prototype, "resType", {
            get: function () {
                return EnumLoader.RES;
            },
            enumerable: true,
            configurable: true
        });
        // public set resType(value: number) {
        // 	egret.superSetter(CEffect, this, "resType", value);
        // }
        CEffect.prototype.play = function () {
            if (this._isPlaying == false)
                this.addToFrameController();
            _super.prototype.play.call(this);
        };
        CEffect.prototype.stop = function () {
            this.removeToFrameController();
            _super.prototype.stop.call(this);
        };
        CEffect.prototype.addToFrameController = function () {
            EffectAdvanceTimeCenter.instance.addEffect(this);
        };
        CEffect.prototype.removeToFrameController = function () {
            EffectAdvanceTimeCenter.instance.deleteEffect(this);
        };
        CEffect.prototype.lastFrameHandler = function () {
            if (this._lastFrameHanderCallBack != null) {
                this._lastFrameHanderCallBack.apply(this, this._lastFrameParams);
            }
        };
        CEffect.prototype.resetAndClear = function () {
            this.removeToFrameController();
            this._lastFrameHanderCallBack = null;
            _super.prototype.resetAndClear.call(this);
        };
        return CEffect;
    }(fairui.NetEffect));
    fairui.CEffect = CEffect;
    __reflect(CEffect.prototype, "fairui.CEffect");
    var EffectAdvanceTimeCenter = (function () {
        function EffectAdvanceTimeCenter() {
            this._effectHash = new flash.Dictionary();
            this._isStart = false;
            this._gapTime = 0;
        }
        Object.defineProperty(EffectAdvanceTimeCenter, "instance", {
            get: function () {
                if (EffectAdvanceTimeCenter._instance == null)
                    EffectAdvanceTimeCenter._instance = new EffectAdvanceTimeCenter();
                return EffectAdvanceTimeCenter._instance;
            },
            enumerable: true,
            configurable: true
        });
        EffectAdvanceTimeCenter.prototype.addEffect = function (data) {
            this._effectHash.setItem(data, data);
            if (this._isStart == false) {
                Global.timer.doFrameLoop(1, flash.bind(this.onEnterFrame, this));
                this._isStart = true;
            }
        };
        EffectAdvanceTimeCenter.prototype.onEnterFrame = function () {
            var time = Global.timer.frametime;
            this._gapTime += time;
            if (this._gapTime > 50) {
                this._effectHash.forEach(function (key, data) {
                    data.addvanceTime(this._gapTime);
                }, this);
                // for (let data_key_a in this._effectHash.dict) {
                // 	let data: NetEffect = this._effectHash.dict[data_key_a];
                // 	data.addvanceTime(this._gapTime);
                // }
                this._gapTime = 0;
            }
        };
        EffectAdvanceTimeCenter.prototype.deleteEffect = function (data) {
            this._effectHash.delItem(data);
        };
        return EffectAdvanceTimeCenter;
    }());
    __reflect(EffectAdvanceTimeCenter.prototype, "EffectAdvanceTimeCenter");
})(fairui || (fairui = {}));
//# sourceMappingURL=CEffect.js.map