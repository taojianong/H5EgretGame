var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var flash;
(function (flash) {
    var ObjectPool = (function () {
        function ObjectPool(cls, checkDuplicate) {
            if (checkDuplicate === void 0) { checkDuplicate = true; }
            this._pool = [];
            this._poolDict = null;
            this._numCount = 0;
            this._checkDuplicate = true;
            this._cls = cls;
            this._checkDuplicate = checkDuplicate;
            if (this._checkDuplicate) {
                this._poolDict = new flash.Dictionary();
            }
        }
        Object.defineProperty(ObjectPool.prototype, "numCount", {
            get: function () {
                return this._numCount;
            },
            enumerable: true,
            configurable: true
        });
        ObjectPool.prototype.getObject = function () {
            var eft;
            if (this._pool.length > 0) {
                eft = this._pool.pop();
                if (this._checkDuplicate) {
                    this._poolDict.delItem(eft);
                }
            }
            else {
                eft = new this._cls();
                this._numCount++;
            }
            return eft;
        };
        ObjectPool.prototype.push = function (data) {
            if (this._checkDuplicate) {
                if (this._poolDict.getItem(data) == null) {
                    this._pool.push(data);
                    this._poolDict.setItem(data, data);
                }
                else {
                    egret.error("有重复的对象入池", data.toString());
                }
            }
            else {
                this._pool.push(data);
            }
        };
        ObjectPool.prototype.pushArr = function (datas) {
            for (var da_key_a in datas) {
                var da = datas[da_key_a];
                this.push(da);
            }
        };
        return ObjectPool;
    }());
    flash.ObjectPool = ObjectPool;
    __reflect(ObjectPool.prototype, "flash.ObjectPool");
})(flash || (flash = {}));
//# sourceMappingURL=ObjectPool.js.map