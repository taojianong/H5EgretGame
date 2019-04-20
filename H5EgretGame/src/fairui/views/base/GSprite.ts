module base {
	export class GSprite extends egret.Sprite {

		private _eventMap: flash.Dictionary;

		public constructor() {
			super();
		}

		public addEventListener(type: string, listener: Function, thisObject: any, useCapture?: boolean, priority?: number) {
			super.$addListener(type, listener, thisObject, useCapture, priority);
			if (!this._eventMap)
				this._eventMap = new flash.Dictionary();
			let handlerList: EventHandler[] = this._eventMap.getItem(type);
			if (handlerList) {
				for (let index in handlerList) {
					if (handlerList[index].thisObject == thisObject && handlerList[index].listener == listener)
						return;
				}
				let eventObject: EventHandler = EventHandler.getEventHandler(type, listener, thisObject, useCapture, priority);
				handlerList.push(eventObject);
			}
			else {
				let eventObject: EventHandler = EventHandler.getEventHandler(type, listener, thisObject, useCapture, priority);
				this._eventMap.setItem(type, [eventObject]);
			}

		}

		public removeEventListener(type: string, listener: Function, thisObject: any, useCapture?: boolean) {
			super.removeEventListener(type, listener, thisObject, useCapture);
			if (this._eventMap) {
				let handlerList: EventHandler[] = this._eventMap.getItem(type);
				if (handlerList) {
					for (let index in handlerList) {
						if (handlerList[index].thisObject == thisObject && handlerList[index].listener == listener) {
							handlerList[index].dispose();
							handlerList.slice(parseInt(index), 1);
							break;
						}
					}
					if (handlerList.length == 0)
						this._eventMap.delItem(type);
				}
			}
		}

		public removeAllEventListener() {
			if (this._eventMap) {
				for (let key in this._eventMap.map) {
					let handlerList: EventHandler[] = this._eventMap.getItem(key);
					if (handlerList) {
						for (let index in handlerList) {
							handlerList[index].dispose();
						}
					}
				}
				this._eventMap.reset();
			}
			this._eventMap = null;
		}

		public dispose(type?: boolean) {

		}
	}
}