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
var TestWin = (function (_super) {
    __extends(TestWin, _super);
    function TestWin() {
        return _super.call(this) || this;
    }
    TestWin.prototype.onInit = function () {
        this.contentPane = fairygui.UIPackage.createObject("ModalWaiting", "TestWin").asCom;
        this.contentPane.getChild("n1").addClickListener(this.onClick, this);
    };
    TestWin.prototype.onClick = function () {
        //这里模拟一个要锁住当前窗口的过程，在锁定过程中，窗口仍然是可以移动和关闭的
        this.showModalWait();
        fairygui.GTimers.inst.add(3000, 1, function () { this.closeModalWait(); }, this);
    };
    return TestWin;
}(fairygui.Window));
__reflect(TestWin.prototype, "TestWin");
//# sourceMappingURL=TestWin.js.map