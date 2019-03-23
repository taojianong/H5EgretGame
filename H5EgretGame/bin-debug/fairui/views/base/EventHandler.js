var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var base;
(function (base) {
    var EventHandler = (function () {
        function EventHandler() {
        }
        EventHandler.getEventHandler = function (type, listener, thisObject, useCapture, priority) {
            var event = new EventHandler();
            event.type = type;
            event.listener = listener;
            event.thisObject = thisObject;
            event.useCapture = useCapture;
            event.priority = priority;
            return event;
        };
        EventHandler.prototype.dispose = function (type) {
            this.type = null;
            this.listener = null;
            this.thisObject = null;
            this.useCapture = null;
            this.priority = null;
        };
        return EventHandler;
    }());
    base.EventHandler = EventHandler;
    __reflect(EventHandler.prototype, "base.EventHandler");
})(base || (base = {}));
//# sourceMappingURL=EventHandler.js.map