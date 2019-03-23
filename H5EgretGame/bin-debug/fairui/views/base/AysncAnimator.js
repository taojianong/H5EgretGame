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
var base;
(function (base) {
    var AysncAnimator = (function (_super) {
        __extends(AysncAnimator, _super);
        function AysncAnimator() {
            return _super.call(this) || this;
        }
        AysncAnimator.prototype.getImage = function (index) {
            var image;
            if (this.isDispose == false) {
                image = _super.prototype.getImage.call(this, index);
                if (!image.bitmapData)
                    image.bitmapData = this.createTexture(image.imageName, image.x, image.y, image.width, image.height);
            }
            return image;
        };
        AysncAnimator.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
        };
        return AysncAnimator;
    }(base.Animator));
    base.AysncAnimator = AysncAnimator;
    __reflect(AysncAnimator.prototype, "base.AysncAnimator");
})(base || (base = {}));
//# sourceMappingURL=AysncAnimator.js.map