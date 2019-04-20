var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var base;
(function (base) {
    var GSprite = (function (_super) {
        __extends(GSprite, _super);
        function GSprite() {
            return _super.call(this) || this;
        }
        GSprite.prototype.addEventListener = function (type, listener, thisObject, useCapture, priority) {
            _super.prototype.$addListener.call(this, type, listener, thisObject, useCapture, priority);
            if (!this._eventMap)
                this._eventMap = new flash.Dictionary();
            var handlerList = this._eventMap.getItem(type);
            if (handlerList) {
                for (var index in handlerList) {
                    if (handlerList[index].thisObject == thisObject && handlerList[index].listener == listener)
                        return;
                }
                var eventObject = base.EventHandler.getEventHandler(type, listener, thisObject, useCapture, priority);
                handlerList.push(eventObject);
            }
            else {
                var eventObject = base.EventHandler.getEventHandler(type, listener, thisObject, useCapture, priority);
                this._eventMap.setItem(type, [eventObject]);
            }
        };
        GSprite.prototype.removeEventListener = function (type, listener, thisObject, useCapture) {
            _super.prototype.removeEventListener.call(this, type, listener, thisObject, useCapture);
            if (this._eventMap) {
                var handlerList = this._eventMap.getItem(type);
                if (handlerList) {
                    for (var index in handlerList) {
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
        };
        GSprite.prototype.removeAllEventListener = function () {
            if (this._eventMap) {
                for (var key in this._eventMap.map) {
                    var handlerList = this._eventMap.getItem(key);
                    if (handlerList) {
                        for (var index in handlerList) {
                            handlerList[index].dispose();
                        }
                    }
                }
                this._eventMap.reset();
            }
            this._eventMap = null;
        };
        GSprite.prototype.dispose = function (type) {
        };
        return GSprite;
    }(egret.Sprite));
    base.GSprite = GSprite;
    __reflect(GSprite.prototype, "base.GSprite");
})(base || (base = {}));
//# sourceMappingURL=GSprite.js.map