var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var utils;
(function (utils) {
    /**
     * Handler方法
     * @author cl 2018.10.25
     */
    var Handler = (function () {
        function Handler(method, thisObj, args, isImmediatelyGc) {
            if (method === void 0) { method = null; }
            if (args === void 0) { args = null; }
            if (isImmediatelyGc === void 0) { isImmediatelyGc = true; }
            this.method = method;
            this.args = args;
            this.thisObject = thisObj || this;
            this.isImmediatelyGc = isImmediatelyGc;
        }
        /**
         * 静态创建Hander
         * @param method 执行方法
         * @param thisObj
         * @param args 方法执行参数
         */
        Handler.Create = function (method, thisObj, args, isImmediatelyGc) {
            if (method === void 0) { method = null; }
            if (args === void 0) { args = null; }
            if (isImmediatelyGc === void 0) { isImmediatelyGc = true; }
            if (method == null) {
                egret.error(this, "参数method为null");
                return null;
            }
            if (Handler.pool.length > 0) {
                var handler = Handler.pool.pop();
                handler.method = method;
                handler.thisObject = thisObj;
                handler.args = args;
                handler.isImmediatelyGc = isImmediatelyGc;
                return handler;
            }
            return new Handler(method, thisObj, args, isImmediatelyGc);
        };
        /**
         * 执行方法
         */
        Handler.prototype.execute = function () {
            try {
                if (this.method != null) {
                    this.method.apply(this.thisObject, this.args);
                    if (this.isImmediatelyGc) {
                        this.gc();
                    }
                }
            }
            catch (e) {
                egret.error(this, "handler.execute调用出错" + e);
            }
        };
        /**
         * 带参数执行方法
         */
        Handler.prototype.executeWith = function (data) {
            if (data == null) {
                this.execute();
                return;
            }
            try {
                if (this.method != null) {
                    this.method.apply(this.thisObject, this.args ? this.args.concat(data) : data);
                    if (this.isImmediatelyGc) {
                        this.gc();
                    }
                }
            }
            catch (e) {
                egret.error(this, "handler.executeWith调用出错" + e);
            }
        };
        /**
         * 回收
         */
        Handler.prototype.gc = function () {
            this.method = null;
            this.thisObject = null;
            this.args = null;
            Handler.pool.push(this);
        };
        Handler.pool = new Array();
        return Handler;
    }());
    utils.Handler = Handler;
    __reflect(Handler.prototype, "utils.Handler");
})(utils || (utils = {}));
//# sourceMappingURL=Handler.js.map