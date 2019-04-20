var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var com;
(function (com) {
    var time;
    (function (time_1) {
        /**时钟管理器[同一函数多次计时，默认会被后者覆盖,delay小于1会立即执行]*/
        var TimeManager = (function () {
            function TimeManager() {
                /**当前帧的时间点,毫秒，进入游戏开始计时*/
                this._currTimer = 0;
                /**当前帧数 */
                this._currFrame = 0;
                this._count = 0;
                this._index = 0;
                /**上一帧的用时*/
                this._frametime = 0;
                this._lastTime = 0;
                /**上一帧的时间点*/
                this._fpsLastTime = 0;
                this._fpsCount = 0;
                this._pool = new Array();
                this._handlers = new flash.Dictionary();
                this._serverTimeDict = new flash.Dictionary();
                this._currTimer = egret.getTimer();
                Global.stage.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
            }
            Object.defineProperty(TimeManager.prototype, "currFrame", {
                /**当前进入游戏时间，毫秒 */
                get: function () {
                    return this._currFrame;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TimeManager.prototype, "frametime", {
                get: function () {
                    return this._frametime;
                },
                enumerable: true,
                configurable: true
            });
            TimeManager.prototype.onEnterFrame = function (e) {
                var key, handler;
                var _self__ = this;
                _self__._currFrame++;
                _self__._currTimer = egret.getTimer();
                _self__._frametime = _self__._currTimer - _self__._lastTime;
                _self__._lastTime = _self__._currTimer;
                var fpsInv = _self__._currTimer - _self__._fpsLastTime;
                if (fpsInv > 1000) {
                    var fps = (_self__._currFrame - _self__._fpsCount) / (fpsInv * 0.001);
                    _self__._fpsCount = _self__._currFrame;
                    _self__._fpsLastTime = _self__._currTimer;
                    Config.currentGameFps = Math.floor(fps * 1000) * 0.001;
                }
                _self__._handlers.forEach(function (key, handler) {
                    if (handler != null && handler.method != null) {
                        var t = (handler.userFrame ? _self__._currFrame : _self__._currTimer);
                        if (t >= handler.exeTime) {
                            var method = handler.method;
                            var args = handler.args;
                            if (handler.repeat) {
                                while (t >= handler.exeTime) {
                                    if (_self__._handlers.hasOwnProperty(key)) {
                                        handler.exeTime += handler.delay;
                                        method.apply(method["owner"], args);
                                    }
                                    else {
                                        break;
                                    }
                                }
                            }
                            else {
                                _self__.clearTimer(key);
                                method.apply(method["owner"], args);
                            }
                        }
                    }
                }, _self__);
                _self__.serverTimeHandler();
            };
            TimeManager.prototype.serverTimeHandler = function () {
                var _self__ = this;
                if (_self__._serverTimeDict.length > 0) {
                    var ctSec_1 = com.time.ServerTime.getServerTime();
                    _self__._serverTimeDict.forEach(function (key, data) {
                        var time = data.endServerTime - ctSec_1;
                        if (time != data.spuleTime) {
                            data.spuleTime = time;
                            var arry = [data];
                            if (data.args) {
                                arry = arry.concat(data.args);
                            }
                            data.method.apply(data.method["owner"], arry); //(null, arry);
                        }
                        if (time <= 0) {
                            _self__.clearTimer(key);
                        }
                    }, _self__);
                }
            };
            TimeManager.prototype.create = function (useFrame, repeat, delay, method, args, cover) {
                if (args === void 0) { args = null; }
                if (cover === void 0) { cover = true; }
                var key;
                if (cover) {
                    this.clearTimer(method);
                    key = method;
                }
                else {
                    key = this._index++;
                }
                if (delay < 1) {
                    method.apply(method["owner"], args); //(null, args);
                    return -1;
                }
                var handler = this._pool.length > 0 ? this._pool.pop() : new time_1.TimerHandler();
                handler.userFrame = useFrame;
                handler.repeat = repeat;
                handler.delay = delay;
                handler.method = method;
                handler.args = args;
                handler.exeTime = delay + (useFrame ? this._currFrame : this._currTimer);
                this._handlers.setItem(key, handler);
                this._count++;
                return key;
            };
            /**
             * 定时执行一次
             * @param	delay  延迟时间(单位毫秒)
             * @param	method 结束时的回调方法
             * @param	args   回调参数
             * @param	thisObject 对象源
             * @param	cover  是否覆盖(true:同方法多次计时，后者覆盖前者。false:同方法多次计时，不相互覆盖)
             * @return  cover=true时返回回调函数本身，cover=false时，返回唯一ID，均用来作为clearTimer的参数
             */
            TimeManager.prototype.doTimeOnce = function (delay, method, args, cover) {
                if (args === void 0) { args = null; }
                if (cover === void 0) { cover = true; }
                return this.create(false, false, delay, method, args, cover);
            };
            /**
             * 循环执行
             * @param delay 延迟时间 毫秒
             */
            TimeManager.prototype.doTimeLoop = function (delay, method, args, cover) {
                if (args === void 0) { args = null; }
                if (cover === void 0) { cover = true; }
                return this.create(false, true, delay, method, args, cover);
            };
            TimeManager.prototype.doFrameOnce = function (delay, method, args, cover) {
                if (args === void 0) { args = null; }
                if (cover === void 0) { cover = true; }
                return this.create(true, false, delay, method, args, cover);
            };
            TimeManager.prototype.doFrameLoop = function (delay, method, args, cover) {
                if (args === void 0) { args = null; }
                if (cover === void 0) { cover = true; }
                return this.create(true, true, delay, method, args, cover);
            };
            /**
             * 服务器时间结束
             * @param method 	必须使用flash.bind( method , this );
             * @param endTime 	结束时间(秒)
             */
            TimeManager.prototype.serverTimeEnd = function (method, endTime, args, startTime) {
                if (args === void 0) { args = null; }
                if (startTime === void 0) { startTime = -1; }
                this.clearTimer(method);
                var key = method;
                var data = time_1.ServerTimeData.getData();
                startTime = startTime == -1 ? com.time.ServerTime.getServerTime() : startTime;
                data.setTime(startTime, endTime);
                data.method = method;
                data.args = args;
                this._serverTimeDict.setItem(key, data);
                var ctSec = com.time.ServerTime.getServerTime();
                var time = data.endServerTime - ctSec;
                data.spuleTime = time;
                var arry = [data];
                if (data.args) {
                    arry = arry.concat(data.args);
                }
                data.method.apply(data.method["owner"], arry);
                return key;
            };
            Object.defineProperty(TimeManager.prototype, "count", {
                get: function () {
                    return this._count;
                },
                enumerable: true,
                configurable: true
            });
            TimeManager.prototype.clearTimer = function (method) {
                var handler = this._handlers.getItem(method);
                if (handler != null) {
                    this._handlers.delItem(method);
                    handler.clear();
                    this._pool.push(handler);
                    this._count--;
                }
                var data = this._serverTimeDict.getItem(method);
                if (data) {
                    this._serverTimeDict.delItem(method);
                    data.dispose();
                    this._count--;
                }
            };
            return TimeManager;
        }());
        time_1.TimeManager = TimeManager;
        __reflect(TimeManager.prototype, "com.time.TimeManager");
    })(time = com.time || (com.time = {}));
})(com || (com = {}));
//# sourceMappingURL=TimeManager.js.map