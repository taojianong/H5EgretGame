module com.time {
	export class ServerTime {
		public static _serverTime: number = 0;
		public static _serverStartTime: number = 0;
		public static _serverOpenZoneTime: number = 0;
		public static _serverCurTime: number = 0;
		public static _loginTime: number = 0;
		public static _serverVer: number = 0;
		public static _msgVer: number = 0;
		public static _init: boolean = false;
		public static _lastEnterTime: number = 0;
		public static _clientTimeMessage: number = 0;
		public static Event_SynServerTime: string = "Event_SynServerTime";

		/**
		 * 同步时间，毫秒
		 * @param time1	高位时间
		 * @param time2	低位时间
		 * 
		 */
		public static setServerTime(time: number) {
			ServerTime._serverTime = time;
			if (ServerTime._init == false) {
				ServerTime._init = true;
				ServerTime._lastEnterTime = 0;
				App.stage.addEventListener(egret.Event.ENTER_FRAME, ServerTime.onEnterFrame, this);
			}
		}

		private static onEnterFrame(e: egret.Event): void {
			let ct: number = egret.getTimer();
			if (ServerTime._lastEnterTime <= 0) {
				ServerTime._lastEnterTime = ct;
				return;
			}
			let cha: number = ct - ServerTime._lastEnterTime;
			ServerTime._serverTime = ServerTime._serverTime + cha;
			ServerTime._clientTimeMessage += cha;
			ServerTime._lastEnterTime = ct;
			if (ServerTime._clientTimeMessage > 15 * 1000) {
				//请求服务器时间
				// let cmd: net.C2S_TimeMessage = new net.C2S_TimeMessage();
				// Config.socket.sendCommand(net.C2S_TimeMessage, cmd);
				ServerTime._clientTimeMessage = 0;
			}
		}

		public static setServerInfo(time: number, time2: number, loginTime: number, ver: number, msgVer: number) {
			ServerTime._serverStartTime = time;
			ServerTime._serverOpenZoneTime = time2;
			ServerTime._serverCurTime = loginTime;
			ServerTime._loginTime = loginTime;
			ServerTime.setServerTime(loginTime * 1000);
			ServerTime._serverVer = ver;
			ServerTime._msgVer = msgVer;
		}

		public static get loginTime(): number {
			return ServerTime._loginTime;
		}

		/**
		 * 服务器时间，秒
		 */
		public static getServerTime(): number {
			return parseInt("" + (ServerTime._serverTime * 0.001));//ServerTime._serverTime / 1000;
		}
		/**
		 * 获取开服天数
		 * @return number
		 * 
		 */
		public static get openServerDayCount(): number {
			let kaifuTime: number = 0;
			let day: number = 60 * 60 * 24;
			let time: Date = new Date();
			let firstDay: number = (ServerTime.serverOpenZoneTime - time.getTimezoneOffset() * 60) / day;
			kaifuTime = (ServerTime.serverTime / 1000 - time.getTimezoneOffset() * 60) / day - firstDay;
			if (kaifuTime < 0) {
				return 1;
			}
			else {
				return kaifuTime + 1;
			}
		}

		public static get serverTime(): number {
			return ServerTime._serverTime;
		}

		public static get systemTime(): number {
			return new Date().getTime() - ServerTime.serverStartTime * 1000;
		}

		public static get flashTime(): number {
			return egret.getTimer();
		}

		public static get serverStartTime(): number {
			return ServerTime._serverStartTime;
		}

		public static get serverOpenZoneTime(): number {
			return ServerTime._serverOpenZoneTime;
		}
	}
}