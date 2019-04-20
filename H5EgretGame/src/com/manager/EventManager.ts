/**
 * 事件管理类
 * @author clong 2019.3.23
 */
class EventManager {

	private static _eventDict: flash.Dictionary = new flash.Dictionary();

	private static _targetMap: flash.Dictionary = new flash.Dictionary();

	/**
	 * 触发全局事件
	 * @param type 事件类型
	 * @param args 事件参数
	 */
	public static dispatchEvent( type: string, ...args ):void {

		let funcList: Array<any> = EventManager._eventDict.getItem(type);
		if (funcList) {
			let list: Array<any> = funcList.concat();
			let length: number = list.length;
			if (length > 0) {
				for (let i: number = 0; i < length; i++) {
					try {
						egret.log("[log][EventManager] 调度事件: " + type);//调度事件出错.
						list[i][0].apply(list[i][1], args);
					}
					catch (e) {
						egret.error("[log][EventManager] 调度事件出错.", e);//调度事件出错.
					}
				}
			}
		}
	}

	/**
	 * 添加事件方法
	 * @param type 事件类型
	 * @param listener 事件方法
	 * @param thisObject
	 * @param target 监听事件对象，为空则监听全局事件
	 */
	public static addEventListener(type: string, listener: Function, thisObject: any, target: egret.EventDispatcher = null): void {

		let funcList: Array<any> = null;
		if (target == null) {
			funcList = <any>EventManager._eventDict.getItem(type);
			if (!funcList) {
				funcList = new Array<any>();
				EventManager._eventDict.setItem(type, funcList);
			}
			if (!EventManager.hasEventListener(type, listener, thisObject)) {
				funcList.push([listener, thisObject]);
			}
		} else {
			funcList = EventManager.getListenerList( target );
			if( !EventManager.hasListenerOf( type , listener , target ) ){ //如果没有监听该事件，避免重复监听
				var obj: Object = new Object();
				obj["type"] = type;
				obj["listener"] = listener;
				obj["thisObject"] = thisObject;
				funcList = funcList || [];
				funcList.push(obj);
				target.addEventListener(type, listener, thisObject);
			}			
		}
	}

	/**
	 * 移除事件监听
	 * @param type 事件类型
	 * @param listener 事件方法
	 * @param thisObject
	 * @param target 监听事件对象，为空则监听全局事件 
	 */
	public static removeEventListener(type: string, listener: Function, thisObject: any, target: egret.EventDispatcher = null): void {
		
		let funcList: Array<any> = null;
		if( target == null ){ //全局事件
			funcList = <any>EventManager._eventDict.getItem(type);
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
		}else{
			funcList = EventManager.getListenerList( target );
			var obj: Object;
            if (funcList != null) {
                funcList.forEach((obj) => {
                    if (obj.type == type && obj.listener == listener) {
                        funcList.splice(funcList.indexOf(obj), 1);
                        return;
                    }
                });
            }
            target.removeEventListener(type, listener, thisObject);
		}		
	}

	/**
	 * 监听事件列表
	 * @param target 事件对象
	 **/
	public static getListenerList( target:egret.EventDispatcher ): Array<Object> {

		let funcList:Array<Object> = null;
		if( target ){
			funcList = EventManager._targetMap.getItem(target);
			if (funcList == null) {
				funcList = [];
				EventManager._targetMap.setItem(target, funcList);
			}
		}		
		return funcList;
	}

	/**
	 * 移除所有监听事件
	 * @param target 为空则移除所有全局事件，否则移除对应的对象的所有事件
	 */
	public static removeAllListeners( target:egret.EventDispatcher = null ):void{

		if( target == null ){
			EventManager.removeAllEventListener();
		}else{
			let list:Array<Object> = EventManager.getListenerList( target );
			var obj: Object;
            while (list && list.length > 0) {
                obj = list.shift();
                if (obj) {
                    this.removeEventListener(obj["type"], obj["listener"], obj["thisObject"]);
                }
            }
		}
	}

	/**
	 * 移除所有全局事件
	 */
	private static removeAllEventListener() {
		for (let forinlet__ in EventManager._eventDict.map) {
			let type = EventManager._eventDict.map[forinlet__][0];
			EventManager.removeEventListeners(type);
		}
	}

	/**
	 * 移除所有对应类型事件监听
	 * @param type 事件类型
	 * @param 
	 */
	public static removeEventListeners( type: string = null ) {
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

	/**
	 * 是否有对应事件的监听事件
	 * @param	type      	事件类型
	 * @param	listener  	事件方法
	 * @param 	target		监听对象
	 * @param 	thisObject
	 * @return
	 */
	public static hasListenerOf(type: string, listener: Function = null, target: egret.EventDispatcher = null, thisObject: any = null): boolean {

		if (target == null) {
			let funcList: Array<any> = EventManager._targetMap.getItem(target);
			var obj: Object;
			for (obj of funcList) {
				if (obj && obj["type"] == type && (obj["listener"] == listener || listener == null)) {
					return true;
				}
			}
		} else {
			return EventManager.hasEventListener(type, listener, thisObject);
		}

		return false;
	}

	/**
	 * 是否有对应的全局监听事件
	 * @param	type      	事件类型
	 * @param	listener  	事件方法
	 * @param 	thisObject
	 * @return
	 */
	private static hasEventListener(type: string, listener: Function = null, thisObject: any = null): boolean {
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
}