var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var fairui;
(function (fairui) {
    var Animation = (function () {
        function Animation() {
            this._isDispose = false;
            this.init();
        }
        Animation.prototype.init = function () {
            this._animatorDict = new flash.Dictionary();
        };
        Animation.prototype.getAnimator = function (action, fiveDir) {
            if (this._animatorDict.getItem(action))
                return (flash.As3As(this._animatorDict.getItem(action), flash.Dictionary)).getItem(fiveDir);
            return null;
        };
        Animation.prototype.addAnimator = function (action, fiveDir, animator) {
            var dict = flash.As3As(this._animatorDict.getItem(action), flash.Dictionary);
            if (dict == null)
                this._animatorDict.setItem(action, dict = new flash.Dictionary());
            dict.setItem(fiveDir, animator);
        };
        Object.defineProperty(Animation.prototype, "isDispose", {
            get: function () {
                return this._isDispose;
            },
            enumerable: true,
            configurable: true
        });
        Animation.prototype.dispose = function () {
            for (var dict_key_a in this._animatorDict.map) {
                var dict = this._animatorDict.map[dict_key_a][1];
                for (var animator_key_a in dict.map) {
                    var animator = dict.map[animator_key_a][1];
                    animator.dispose();
                }
            }
            this._animatorDict = null;
            this._isDispose = true;
        };
        return Animation;
    }());
    fairui.Animation = Animation;
    __reflect(Animation.prototype, "fairui.Animation", ["IDispose"]);
})(fairui || (fairui = {}));
//# sourceMappingURL=Animation.js.map