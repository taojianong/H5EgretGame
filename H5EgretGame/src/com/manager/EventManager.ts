/**
 * 事件管理类
 * @author clong 2019.3.23
 */
class EventManager {
	public static _eventDict: flash.Dictionary = new flash.Dictionary();

	public static dispatchEvent(type: string, ...args) {

		let funcList: Array<any> = EventManager._eventDict.getItem(type);
		if (funcList) {
			let list: Array<any> = funcList.concat();
			let length: number = list.length;
			if (length > 0) {
				for (let i: number = 0; i < length; i++) {
					//if (Config.isDebug) {
					try {
						App.log.log("EventManager 调度事件: " + type);//调度事件出错.
						list[i][0].apply(list[i][1], args);
					}
					catch (e) {
						App.log.error(App.lang.getLang("lang_client_1675"), e);//调度事件出错.
					}
					//}
					//else {
					//	list[i][0].apply(list[i][1], args);
					//}
				}
			}
		}
	}

	public static hasEventListener(type: string, listener: Function = null, thisObject: any): boolean {
		let bool: boolean = false;
		let funcList: Array<any> = <any>EventManager._eventDict.getItem(type);
		if (!funcList || funcList.length == 0) {
			bool = false;
		}
		else {
			if (listener == null) {
				bool = true;
			}
			else {
				funcList.forEach(element => {
					if (element[0] == listener && element[1] == thisObject) {
						bool = true;
						return bool;
					}
				});
			}
		}
		return bool;
	}

	public static addEventListener(type: string, listener: Function, thisObject: any) {
		let funcList: Array<any> = <any>EventManager._eventDict.getItem(type);
		if (!funcList) {
			funcList = new Array<any>();
			EventManager._eventDict.setItem(type, funcList);
		}
		if (!EventManager.hasEventListener(type, listener, thisObject)) {
			funcList.push([listener, thisObject]);
		}
	}

	public static removeEventListener(type: string, listener: Function, thisObject: any) {
		let funcList: Array<any> = <any>EventManager._eventDict.getItem(type);
		if (funcList) {
			let length: number = funcList.length;
			for (let i: number = 0; i < length; i++) {
				if (funcList[i][0] == listener && funcList[i][1] == thisObject) {
					funcList.splice(i, 1);
					if (funcList.length == 0) {
						EventManager._eventDict.setItem(type, null);
						EventManager._eventDict.delItem(type);
					}
					break;
				}
			}
		}
	}

	public static removeAllEventListener() {
		for (let forinlet__ in EventManager._eventDict.map) {
			let type = EventManager._eventDict.map[forinlet__][0];
			EventManager.removeEventListeners(type);
		}
	}

	public static removeEventListeners(type: string = null) {
		if (type != null) {
			if (EventManager._eventDict.getItem(type) != null) {
				EventManager._eventDict.setItem(type, null);
				EventManager._eventDict.delItem(type);
			}
		}
		else {
			EventManager.removeAllEventListener();
		}
	}
}