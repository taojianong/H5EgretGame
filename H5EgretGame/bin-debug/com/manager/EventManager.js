var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 事件管理类
 * @author clong 2019.3.23
 */
var EventManager = (function () {
    function EventManager() {
    }
    EventManager.dispatchEvent = function (type) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var funcList = EventManager._eventDict.getItem(type);
        if (funcList) {
            var list = funcList.concat();
            var length_1 = list.length;
            if (length_1 > 0) {
                for (var i = 0; i < length_1; i++) {
                    //if (Config.isDebug) {
                    try {
                        App.log.log("EventManager 调度事件: " + type); //调度事件出错.
                        list[i][0].apply(list[i][1], args);
                    }
                    catch (e) {
                        App.log.error(App.lang.getLang("lang_client_1675"), e); //调度事件出错.
                    }
                    //}
                    //else {
                    //	list[i][0].apply(list[i][1], args);
                    //}
                }
            }
        }
    };
    EventManager.hasEventListener = function (type, listener, thisObject) {
        if (listener === void 0) { listener = null; }
        var bool = false;
        var funcList = EventManager._eventDict.getItem(type);
        if (!funcList || funcList.length == 0) {
            bool = false;
        }
        else {
            if (listener == null) {
                bool = true;
            }
            else {
                funcList.forEach(function (element) {
                    if (element[0] == listener && element[1] == thisObject) {
                        bool = true;
                        return bool;
                    }
                });
            }
        }
        return bool;
    };
    EventManager.addEventListener = function (type, listener, thisObject) {
        var funcList = EventManager._eventDict.getItem(type);
        if (!funcList) {
            funcList = new Array();
            EventManager._eventDict.setItem(type, funcList);
        }
        if (!EventManager.hasEventListener(type, listener, thisObject)) {
            funcList.push([listener, thisObject]);
        }
    };
    EventManager.removeEventListener = function (type, listener, thisObject) {
        var funcList = EventManager._eventDict.getItem(type);
        if (funcList) {
            var length_2 = funcList.length;
            for (var i = 0; i < length_2; i++) {
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
    };
    EventManager.removeAllEventListener = function () {
        for (var forinlet__ in EventManager._eventDict.map) {
            var type = EventManager._eventDict.map[forinlet__][0];
            EventManager.removeEventListeners(type);
        }
    };
    EventManager.removeEventListeners = function (type) {
        if (type === void 0) { type = null; }
        if (type != null) {
            if (EventManager._eventDict.getItem(type) != null) {
                EventManager._eventDict.setItem(type, null);
                EventManager._eventDict.delItem(type);
            }
        }
        else {
            EventManager.removeAllEventListener();
        }
    };
    EventManager._eventDict = new flash.Dictionary();
    return EventManager;
}());
__reflect(EventManager.prototype, "EventManager");
//# sourceMappingURL=EventManager.js.map