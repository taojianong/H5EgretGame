var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var com;
(function (com) {
    var time;
    (function (time) {
        var ServerTimeData = (function () {
            function ServerTimeData() {
                this._startServerTime = 0;
                this._endServerTime = 0;
                this._spuleTime = 0;
            }
            ServerTimeData.getData = function () {
                return com.time.ServerTimeData.pool.getObject();
            };
            Object.defineProperty(ServerTimeData.prototype, "args", {
                get: function () {
                    return this._args;
                },
                set: function (value) {
                    this._args = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ServerTimeData.prototype, "method", {
                get: function () {
                    return this._method;
                },
                set: function (value) {
                    this._method = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ServerTimeData.prototype, "callbackThisObj", {
                get: function () {
                    return this._callbackThisObj;
                },
                set: function (value) {
                    this._callbackThisObj = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ServerTimeData.prototype, "spuleTime", {
                get: function () {
                    return this._spuleTime;
                },
                /**
                 * 剩余时间，单位秒
                 */
                set: function (value) {
                    this._spuleTime = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ServerTimeData.prototype, "endServerTime", {
                get: function () {
                    return this._endServerTime;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ServerTimeData.prototype, "startServerTime", {
                get: function () {
                    return this._startServerTime;
                },
                enumerable: true,
                configurable: true
            });
            ServerTimeData.prototype.setTime = function (startTime, endTime) {
                this._startServerTime = startTime;
                this._endServerTime = endTime;
            };
            ServerTimeData.prototype.dispose = function () {
                this._method = null;
                this._args = null;
                this._callbackThisObj = null;
                com.time.ServerTimeData.pool.push(this);
            };
            return ServerTimeData;
        }());
        time.ServerTimeData = ServerTimeData;
        __reflect(ServerTimeData.prototype, "com.time.ServerTimeData");
    })(time = com.time || (com.time = {}));
})(com || (com = {}));
com.time.ServerTimeData.pool = new flash.ObjectPool(com.time.ServerTimeData);
//# sourceMappingURL=ServerTimeData.js.map