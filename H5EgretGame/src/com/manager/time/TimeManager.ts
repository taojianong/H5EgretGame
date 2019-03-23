module com.time {
	/**时钟管理器[同一函数多次计时，默认会被后者覆盖,delay小于1会立即执行]*/
	export class TimeManager {
		private _pool: Array<TimerHandler>;// = new Array<TimerHandler>();
		private _handlers: flash.Dictionary;// = new flash.Dictionary();
		/**当前帧的时间点*/
		private _currTimer: number = 0;
		private _currFrame: number = 0;
		private _count: number = 0;
		private _index: number = 0;
		/**上一帧的用时*/
		private _frametime: number = 0;
		private _lastTime: number = 0;
		/**上一帧的时间点*/
		private _fpsLastTime: number = 0;
		private _fpsCount: number = 0;
		private _serverTimeDict: flash.Dictionary;// = new flash.Dictionary();

		public constructor() {
			this._pool = new Array<TimerHandler>();
			this._handlers = new flash.Dictionary();
			this._serverTimeDict = new flash.Dictionary();
			this._currTimer = egret.getTimer();
			App.stage.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
		}

		public get frametime(): number {
			return this._frametime;
		}

		private onEnterFrame(e: egret.Event) {
			let key: any, handler: TimerHandler;
			let _self__: TimeManager = this;
			// try {
				_self__._currFrame++;
				_self__._currTimer = egret.getTimer();
				_self__._frametime = _self__._currTimer - _self__._lastTime;
				_self__._lastTime = _self__._currTimer;
				let fpsInv: number = _self__._currTimer - _self__._fpsLastTime;
				if (fpsInv > 1000) {
					let fps: number = (_self__._currFrame - _self__._fpsCount) / (fpsInv * 0.001)//(fpsInv / 1000);
					_self__._fpsCount = _self__._currFrame;
					_self__._fpsLastTime = _self__._currTimer;
					Config.currentGameFps = Math.floor(fps * 1000) * 0.001;//Math.floor(fps * 1000) / 1000;
				}
				//let lastTime:number = egret.getTimer();
				_self__._handlers.forEach(function (key, handler) {
					if (handler != null && handler.method != null) {
						let t: number = (handler.userFrame ? _self__._currFrame : _self__._currTimer);
						if (t >= handler.exeTime) {
							let method: Function = handler.method;
							let args: any[] = handler.args;
							if (handler.repeat) {
								while (t >= handler.exeTime) {
									//if (key in this._handlers) {
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
				//App.log.debug(egret.getTimer() - lastTime);
				// for (key in this._handlers.map) {
				// 	//key = this._handlers.map[forinlet__][0];						
				// 	handler = <any>this._handlers.getItem(key);
				// 	if (handler == null && handler.method == null)
				// 		continue;
				// 	let t: number = (handler.userFrame ? this._currFrame : this._currTimer);
				// 	if (t >= handler.exeTime) {
				// 		let method: Function = handler.method;
				// 		let args: Array<any> = handler.args;
				// 		if (handler.repeat) {
				// 			while (t >= handler.exeTime) {
				// 				if (key in this._handlers) {
				// 					handler.exeTime += handler.delay;
				// 					method.apply(method["owner"], args);
				// 				}
				// 				else {
				// 					break;
				// 				}
				// 			}
				// 		}
				// 		else {
				// 			this.clearTimer(key);
				// 			method.apply(method["owner"], args);
				// 		}
				// 	}
				// }
				_self__.serverTimeHandler();
			// }
			// catch (e) {
			// 	// let str: string = "";
			// 	// if (key != null)
			// 	// 	str += "@@key" + key;
			// 	// if (handler != null)
			// 	// 	str += handler.method + "@@" + handler.delay + "@@" + handler.exeTime + "@@" + handler.repeat + "@@" + handler.userFrame + "@@" + handler.args;
			// 	App.log.error("TimeManager.onEnterFrame Error.", e);
			// }
		}

		private serverTimeHandler() {
			let _self__: TimeManager = this;
			if (_self__._serverTimeDict.length > 0) {
				let ctSec: number = com.time.ServerTime.getServerTime();
				_self__._serverTimeDict.forEach(function (key: any, data: ServerTimeData) {
					let time: number = data.endServerTime - ctSec;
					if (time != data.spuleTime) {
						data.spuleTime = time;
						let arry: Array<any> = [data];
						if (data.args) {
							arry = arry.concat(data.args);
						}
						data.method.apply(data.method["owner"], arry);//(null, arry);
					}
					if (time <= 0) {
						_self__.clearTimer(key);
					}
				}, _self__);
			}
			// for (let key in this._serverTimeDict.map) {
			// 	//let key = this._serverTimeDict.map[forinlet__][0];
			// 	let data: ServerTimeData = <any>this._serverTimeDict.getItem(key);
			// 	let time: number = data.endServerTime - ctSec;
			// 	if (time != data.spuleTime) {
			// 		data.spuleTime = time;
			// 		let arry: Array<any> = [data];
			// 		if (data.args) {
			// 			arry = arry.concat(data.args);
			// 		}
			// 		data.method.apply(data.method["owner"], arry);//(null, arry);
			// 	}
			// 	if (time <= 0) {
			// 		this.clearTimer(key);
			// 	}
			// }
		}

		private create(useFrame: boolean, repeat: boolean, delay: number, method: Function, args: Array<any> = null, cover: boolean = true): any {
			let key: any;
			if (cover) {
				this.clearTimer(method);
				key = method;
			}
			else {
				key = this._index++;
			}
			if (delay < 1) {
				method.apply(method["owner"], args);//(null, args);
				return -1;
			}
			let handler: TimerHandler = <any>this._pool.length > 0 ? this._pool.pop() : new TimerHandler();
			handler.userFrame = useFrame;
			handler.repeat = repeat;
			handler.delay = delay;
			handler.method = method;
			handler.args = args;
			handler.exeTime = delay + (useFrame ? this._currFrame : this._currTimer);
			this._handlers.setItem(key, handler);
			this._count++;
			return key;
		}
		/**
		 * 定时执行一次
		 * @param	delay  延迟时间(单位毫秒)
		 * @param	method 结束时的回调方法
		 * @param	args   回调参数
		 * @param	thisObject 对象源
		 * @param	cover  是否覆盖(true:同方法多次计时，后者覆盖前者。false:同方法多次计时，不相互覆盖)
		 * @return  cover=true时返回回调函数本身，cover=false时，返回唯一ID，均用来作为clearTimer的参数
		 */
		public doTimeOnce(delay: number, method: Function, args: Array<any> = null, cover: boolean = true): any {
			return this.create(false, false, delay, method, args, cover);
		}

		/**
		 * 循环执行
		 * @param delay 延迟时间 毫秒
		 */
		public doTimeLoop(delay: number, method: Function, args: Array<any> = null, cover: boolean = true): any {
			return this.create(false, true, delay, method, args, cover);
		}

		public doFrameOnce(delay: number, method: Function, args: Array<any> = null, cover: boolean = true): any {
			return this.create(true, false, delay, method, args, cover);
		}

		public doFrameLoop(delay: number, method: Function, args: Array<any> = null, cover: boolean = true): any {
			return this.create(true, true, delay, method, args, cover);
		}

		/**
		 * 服务器时间结束
		 * @param method 	必须使用flash.bind( method , this );
		 * @param endTime 	结束时间(秒)
		 */
		public serverTimeEnd(method: Function, endTime: number, args: Array<any> = null, startTime: number = -1): any {
			this.clearTimer(method);
			let key: any = <any>method;
			let data: ServerTimeData = ServerTimeData.getData();
			startTime = startTime == -1 ? com.time.ServerTime.getServerTime() : startTime;
			data.setTime(startTime, endTime);
			data.method = method;
			data.args = args;
			this._serverTimeDict.setItem(key, data);
			let ctSec: number = com.time.ServerTime.getServerTime();
			let time: number = data.endServerTime - ctSec;
			data.spuleTime = time;
			let arry: Array<any> = [data];
			if (data.args) {
				arry = arry.concat(data.args);
			}
			data.method.apply(data.method["owner"], arry);//(null, arry);
			return key;
		}

		public get count(): number {
			return this._count;
		}

		public clearTimer(method: any) {
			let handler: TimerHandler = <any>this._handlers.getItem(method);
			if (handler != null) {
				this._handlers.delItem(method);
				handler.clear();
				this._pool.push(handler);
				this._count--;
			}
			let data: ServerTimeData = <any>this._serverTimeDict.getItem(method);
			if (data) {
				this._serverTimeDict.delItem(method);
				data.dispose();
				this._count--;
			}
		}
	}
}