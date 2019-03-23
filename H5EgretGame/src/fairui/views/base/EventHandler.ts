module base {
	export class EventHandler {

		public static getEventHandler(type: string, listener: Function, thisObject: any, useCapture?: boolean, priority?: number): EventHandler {
			let event: EventHandler = new EventHandler();
			event.type = type;
			event.listener = listener;
			event.thisObject = thisObject;
			event.useCapture = useCapture;
			event.priority = priority;
			return event;
		}

		public type: string;
		public listener: Function;
		public thisObject: any;
		public useCapture: boolean;
		public priority: number;

		public dispose(type?: boolean) {
			this.type = null;
			this.listener = null;
			this.thisObject = null;
			this.useCapture = null;
			this.priority = null;
		}
	}
}