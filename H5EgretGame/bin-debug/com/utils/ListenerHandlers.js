var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var com;
(function (com) {
    var utils;
    (function (utils) {
        var ListenerHandlers = (function () {
            function ListenerHandlers() {
                this._isDispose = false;
                //super();
                this._handlerDict = new flash.Dictionary();
            }
            ListenerHandlers.prototype.addListnerHandler = function (key, fuc, data) {
                if (data === void 0) { data = null; }
                var dict = this._handlerDict.getItem(key);
                if (dict) {
                    var handler = dict.getItem(fuc);
                    if (handler) {
                        if (handler.params != data)
                            handler.params = data;
                    }
                    else {
                        dict.setItem(fuc, new CHandler(fuc, data));
                    }
                }
                else {
                    dict = new flash.Dictionary();
                    dict.setItem(fuc, new CHandler(fuc, data));
                    this._handlerDict.setItem(key, dict);
                }
            };
            ListenerHandlers.prototype.removeListnerHandler = function (key, fuc) {
                var dict = this._handlerDict.getItem(key);
                if (dict)
                    dict.delItem(fuc);
            };
            ListenerHandlers.prototype.execute = function (key, data) {
                if (data === void 0) { data = null; }
                var dict = this._handlerDict.getItem(key);
                if (dict) {
                    for (var handler_key_a in dict.map) {
                        var handler = dict.map[handler_key_a][1];
                        handler.executeWith(data);
                    }
                }
            };
            Object.defineProperty(ListenerHandlers.prototype, "isDisposed", {
                get: function () {
                    return this._isDispose;
                },
                enumerable: true,
                configurable: true
            });
            ListenerHandlers.prototype.dispose = function () {
                this._handlerDict = null;
                this._isDispose = true;
            };
            return ListenerHandlers;
        }());
        utils.ListenerHandlers = ListenerHandlers;
        __reflect(ListenerHandlers.prototype, "com.utils.ListenerHandlers", ["IDispose"]);
    })(utils = com.utils || (com.utils = {}));
})(com || (com = {}));
//# sourceMappingURL=ListenerHandlers.js.map