var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var fairui;
(function (fairui) {
    var NetHandler = (function () {
        function NetHandler() {
            this._isDispose = false;
            this.clear();
        }
        NetHandler.prototype.netComplete = function () {
            this.foEach(this._completeDict);
        };
        NetHandler.prototype.netProgress = function () {
            this.foEach(this._progressDict);
        };
        NetHandler.prototype.netError = function () {
            this.foEach(this._errorDict);
        };
        NetHandler.prototype.foEach = function (dict) {
            dict.forEach(function (key, cont) {
                key.apply(key["owner"], cont);
            }, this);
            // for (let forinvar__ in dict.map) {
            // 	let fun:Function = dict.map[forinvar__];
            // 	//let fun: Function = fuc;
            // 	fun.apply(fun["owner"], dict.getItem(fun));
            // }
        };
        NetHandler.prototype.addCompleteHandler = function (fuc, vo) {
            if (vo === void 0) { vo = null; }
            this._completeDict.setItem(fuc, (vo ? vo : [true]));
        };
        NetHandler.prototype.addProgressHandler = function (fuc, vo) {
            if (vo === void 0) { vo = null; }
            this._progressDict.setItem(fuc, (vo ? vo : [true]));
        };
        NetHandler.prototype.addErrorHandler = function (fuc, vo) {
            if (vo === void 0) { vo = null; }
            this._errorDict.setItem(fuc, (vo ? vo : [true]));
        };
        NetHandler.prototype.removeCompleteHandler = function (fuc) {
            this._completeDict.delItem(fuc);
        };
        NetHandler.prototype.removeProgressHandler = function (fuc) {
            this._progressDict.delItem(fuc);
        };
        NetHandler.prototype.removeErrorHandler = function (fuc) {
            this._errorDict.delItem(fuc);
        };
        NetHandler.prototype.deleteFuc = function (fuc) {
            this._completeDict.delItem(fuc);
            this._progressDict.delItem(fuc);
            this._errorDict.delItem(fuc);
        };
        NetHandler.prototype.clear = function () {
            this._errorDict = new flash.Dictionary();
            this._progressDict = new flash.Dictionary();
            this._completeDict = new flash.Dictionary();
        };
        Object.defineProperty(NetHandler.prototype, "isDisposed", {
            get: function () {
                return this._isDispose;
            },
            enumerable: true,
            configurable: true
        });
        NetHandler.prototype.dispose = function () {
            this._errorDict = null;
            this._progressDict = null;
            this._completeDict = null;
            this._isDispose = true;
        };
        return NetHandler;
    }());
    fairui.NetHandler = NetHandler;
    __reflect(NetHandler.prototype, "fairui.NetHandler", ["IDispose"]);
})(fairui || (fairui = {}));
//# sourceMappingURL=NetHandler.js.map