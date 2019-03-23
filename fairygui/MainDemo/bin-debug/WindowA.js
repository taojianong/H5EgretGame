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
var WindowA = (function (_super) {
    __extends(WindowA, _super);
    function WindowA() {
        return _super.call(this) || this;
    }
    WindowA.prototype.onInit = function () {
        this.contentPane = fairygui.UIPackage.createObject("Basic", "WindowA").asCom;
        this.center();
    };
    WindowA.prototype.onShown = function () {
        var list = this.contentPane.getChild("n6").asList;
        list.removeChildrenToPool();
        for (var i = 0; i < 6; i++) {
            var item = list.addItemFromPool().asButton;
            item.title = "" + i;
            item.icon = fairygui.UIPackage.getItemURL("Basic", "r4");
        }
    };
    return WindowA;
}(fairygui.Window));
__reflect(WindowA.prototype, "WindowA");
//# sourceMappingURL=WindowA.js.map