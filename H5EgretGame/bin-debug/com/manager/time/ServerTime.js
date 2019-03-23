var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var com;
(function (com) {
    var time;
    (function (time_1) {
        var ServerTime = (function () {
            function ServerTime() {
            }
            /**
             * 同步时间，毫秒
             * @param time1	高位时间
             * @param time2	低位时间
             *
             */
            ServerTime.setServerTime = function (time) {
                ServerTime._serverTime = time;
                if (ServerTime._init == false) {
                    ServerTime._init = true;
                    ServerTime._lastEnterTime = 0;
                    App.stage.addEventListener(egret.Event.ENTER_FRAME, ServerTime.onEnterFrame, this);
                }
            };
            ServerTime.onEnterFrame = function (e) {
                var ct = egret.getTimer();
                if (ServerTime._lastEnterTime <= 0) {
                    ServerTime._lastEnterTime = ct;
                    return;
                }
                var cha = ct - ServerTime._lastEnterTime;
                ServerTime._serverTime = ServerTime._serverTime + cha;
                ServerTime._clientTimeMessage += cha;
                ServerTime._lastEnterTime = ct;
                if (ServerTime._clientTimeMessage > 15 * 1000) {
                    //请求服务器时间
                    // let cmd: net.C2S_TimeMessage = new net.C2S_TimeMessage();
                    // Config.socket.sendCommand(net.C2S_TimeMessage, cmd);
                    ServerTime._clientTimeMessage = 0;
                }
            };
            ServerTime.setServerInfo = function (time, time2, loginTime, ver, msgVer) {
                ServerTime._serverStartTime = time;
                ServerTime._serverOpenZoneTime = time2;
                ServerTime._serverCurTime = loginTime;
                ServerTime._loginTime = loginTime;
                ServerTime.setServerTime(loginTime * 1000);
                ServerTime._serverVer = ver;
                ServerTime._msgVer = msgVer;
            };
            Object.defineProperty(ServerTime, "loginTime", {
                get: function () {
                    return ServerTime._loginTime;
                },
                enumerable: true,
                configurable: true
            });
            /**
             * 服务器时间，秒
             */
            ServerTime.getServerTime = function () {
                return parseInt("" + (ServerTime._serverTime * 0.001)); //ServerTime._serverTime / 1000;
            };
            Object.defineProperty(ServerTime, "openServerDayCount", {
                /**
                 * 获取开服天数
                 * @return number
                 *
                 */
                get: function () {
                    var kaifuTime = 0;
                    var day = 60 * 60 * 24;
                    var time = new Date();
                    var firstDay = (ServerTime.serverOpenZoneTime - time.getTimezoneOffset() * 60) / day;
                    kaifuTime = (ServerTime.serverTime / 1000 - time.getTimezoneOffset() * 60) / day - firstDay;
                    if (kaifuTime < 0) {
                        return 1;
                    }
                    else {
                        return kaifuTime + 1;
                    }
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ServerTime, "serverTime", {
                get: function () {
                    return ServerTime._serverTime;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ServerTime, "systemTime", {
                get: function () {
                    return new Date().getTime() - ServerTime.serverStartTime * 1000;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ServerTime, "flashTime", {
                get: function () {
                    return egret.getTimer();
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ServerTime, "serverStartTime", {
                get: function () {
                    return ServerTime._serverStartTime;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ServerTime, "serverOpenZoneTime", {
                get: function () {
                    return ServerTime._serverOpenZoneTime;
                },
                enumerable: true,
                configurable: true
            });
            ServerTime._serverTime = 0;
            ServerTime._serverStartTime = 0;
            ServerTime._serverOpenZoneTime = 0;
            ServerTime._serverCurTime = 0;
            ServerTime._loginTime = 0;
            ServerTime._serverVer = 0;
            ServerTime._msgVer = 0;
            ServerTime._init = false;
            ServerTime._lastEnterTime = 0;
            ServerTime._clientTimeMessage = 0;
            ServerTime.Event_SynServerTime = "Event_SynServerTime";
            return ServerTime;
        }());
        time_1.ServerTime = ServerTime;
        __reflect(ServerTime.prototype, "com.time.ServerTime");
    })(time = com.time || (com.time = {}));
})(com || (com = {}));
//# sourceMappingURL=ServerTime.js.map