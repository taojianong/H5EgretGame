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
    /**
     * 触发全局事件
     * @param type 事件类型
     * @param args 事件参数
     */
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
                    try {
                        egret.log("[log][EventManager] 调度事件: " + type); //调度事件出错.
                        list[i][0].apply(list[i][1], args);
                    }
                    catch (e) {
                        egret.error("[log][EventManager] 调度事件出错.", e); //调度事件出错.
                    }
                }
            }
        }
    };
    /**
     * 添加事件方法
     * @param type 事件类型
     * @param listener 事件方法
     * @param thisObject
     * @param target 监听事件对象，为空则监听全局事件
     */
    EventManager.addEventListener = function (type, listener, thisObject, target) {
        if (target === void 0) { target = null; }
        var funcList = null;
        if (target == null) {
            funcList = EventManager._eventDict.getItem(type);
            if (!funcList) {
                funcList = new Array();
                EventManager._eventDict.setItem(type, funcList);
            }
            if (!EventManager.hasEventListener(type, listener, thisObject)) {
                funcList.push([listener, thisObject]);
            }
        }
        else {
            funcList = EventManager.getListenerList(target);
            if (!EventManager.hasListenerOf(type, listener, target)) {
                var obj = new Object();
                obj["type"] = type;
                obj["listener"] = listener;
                obj["thisObject"] = thisObject;
                funcList = funcList || [];
                funcList.push(obj);
                target.addEventListener(type, listener, thisObject);
            }
        }
    };
    /**
     * 移除事件监听
     * @param type 事件类型
     * @param listener 事件方法
     * @param thisObject
     * @param target 监听事件对象，为空则监听全局事件
     */
    EventManager.removeEventListener = function (type, listener, thisObject, target) {
        if (target === void 0) { target = null; }
        var funcList = null;
        if (target == null) {
            funcList = EventManager._eventDict.getItem(type);
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
        }
        else {
            funcList = EventManager.getListenerList(target);
            var obj;
            if (funcList != null) {
                funcList.forEach(function (obj) {
                    if (obj.type == type && obj.listener == listener) {
                        funcList.splice(funcList.indexOf(obj), 1);
                        return;
                    }
                });
            }
            target.removeEventListener(type, listener, thisObject);
        }
    };
    /**
     * 监听事件列表
     * @param target 事件对象
     **/
    EventManager.getListenerList = function (target) {
        var funcList = null;
        if (target) {
            funcList = EventManager._targetMap.getItem(target);
            if (funcList == null) {
                funcList = [];
                EventManager._targetMap.setItem(target, funcList);
            }
        }
        return funcList;
    };
    /**
     * 移除所有监听事件
     * @param target 为空则移除所有全局事件，否则移除对应的对象的所有事件
     */
    EventManager.removeAllListeners = function (target) {
        if (target === void 0) { target = null; }
        if (target == null) {
            EventManager.removeAllEventListener();
        }
        else {
            var list = EventManager.getListenerList(target);
            var obj;
            while (list && list.length > 0) {
                obj = list.shift();
                if (obj) {
                    this.removeEventListener(obj["type"], obj["listener"], obj["thisObject"]);
                }
            }
        }
    };
    /**
     * 移除所有全局事件
     */
    EventManager.removeAllEventListener = function () {
        for (var forinlet__ in EventManager._eventDict.map) {
            var type = EventManager._eventDict.map[forinlet__][0];
            EventManager.removeEventListeners(type);
        }
    };
    /**
     * 移除所有对应类型事件监听
     * @param type 事件类型
     * @param
     */
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
    /**
     * 是否有对应事件的监听事件
     * @param	type      	事件类型
     * @param	listener  	事件方法
     * @param 	target		监听对象
     * @param 	thisObject
     * @return
     */
    EventManager.hasListenerOf = function (type, listener, target, thisObject) {
        if (listener === void 0) { listener = null; }
        if (target === void 0) { target = null; }
        if (thisObject === void 0) { thisObject = null; }
        if (target == null) {
            var funcList = EventManager._targetMap.getItem(target);
            var obj;
            for (var _i = 0, funcList_1 = funcList; _i < funcList_1.length; _i++) {
                obj = funcList_1[_i];
                if (obj && obj["type"] == type && (obj["listener"] == listener || listener == null)) {
                    return true;
                }
            }
        }
        else {
            return EventManager.hasEventListener(type, listener, thisObject);
        }
        return false;
    };
    /**
     * 是否有对应的全局监听事件
     * @param	type      	事件类型
     * @param	listener  	事件方法
     * @param 	thisObject
     * @return
     */
    EventManager.hasEventListener = function (type, listener, thisObject) {
        if (listener === void 0) { listener = null; }
        if (thisObject === void 0) { thisObject = null; }
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
    EventManager._eventDict = new flash.Dictionary();
    EventManager._targetMap = new flash.Dictionary();
    return EventManager;
}());
__reflect(EventManager.prototype, "EventManager");
//# sourceMappingURL=EventManager.js.map