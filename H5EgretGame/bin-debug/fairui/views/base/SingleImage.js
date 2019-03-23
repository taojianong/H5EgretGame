var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var base;
(function (base) {
    var SingleImage = (function () {
        function SingleImage(bitmapdata) {
            this.width = 0;
            this.height = 0;
            this.offsetX = 0;
            this.offsetY = 0;
            this.frameNum = 0;
            this.delayTime = 0;
            this.x = 0;
            this.y = 0;
            this._isDispose = false;
            this.bitmapData = bitmapdata;
            if (this.bitmapData) {
                this.width = this.bitmapData.textureWidth;
                this.height = this.bitmapData.textureHeight;
            }
        }
        Object.defineProperty(SingleImage.prototype, "isDispose", {
            get: function () {
                return this._isDispose;
            },
            enumerable: true,
            configurable: true
        });
        SingleImage.prototype.dispose = function () {
            if (this.bitmapData) {
                this.bitmapData.dispose();
            }
            this.bitmapData = null;
            this.width = 0;
            this.height = 0;
            this.offsetX = 0;
            this.offsetY = 0;
            this.frameNum = 0;
            this.imageName = null;
            this._isDispose = true;
        };
        return SingleImage;
    }());
    base.SingleImage = SingleImage;
    __reflect(SingleImage.prototype, "base.SingleImage");
})(base || (base = {}));
//# sourceMappingURL=SingleImage.js.map