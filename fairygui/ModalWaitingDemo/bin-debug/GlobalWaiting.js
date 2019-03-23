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
var GlobalWaiting = (function (_super) {
    __extends(GlobalWaiting, _super);
    function GlobalWaiting() {
        return _super.call(this) || this;
    }
    GlobalWaiting.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this._obj = this.getChild("n1");
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddedToStage, this);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
    };
    GlobalWaiting.prototype.onAddedToStage = function () {
        fairygui.GTimers.inst.callBy24Fps(this.onTimer, this);
    };
    GlobalWaiting.prototype.onRemoveFromStage = function () {
        fairygui.GTimers.inst.remove(this.onTimer, this);
    };
    GlobalWaiting.prototype.onTimer = function () {
        var i = this._obj.rotation;
        i += 10;
        if (i > 360)
            i = i % 360;
        this._obj.rotation = i;
    };
    return GlobalWaiting;
}(fairygui.GComponent));
__reflect(GlobalWaiting.prototype, "GlobalWaiting");
//# sourceMappingURL=GlobalWaiting.js.map