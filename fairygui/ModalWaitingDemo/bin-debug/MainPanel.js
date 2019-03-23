var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var MainPanel = (function () {
    function MainPanel() {
        this._view = fairygui.UIPackage.createObject("ModalWaiting", "Main").asCom;
        this._view.setSize(fairygui.GRoot.inst.width, fairygui.GRoot.inst.height);
        fairygui.GRoot.inst.addChild(this._view);
        this._testWin = new TestWin();
        this._view.getChild("n0").addClickListener(function () { this._testWin.show(); }, this);
        //这里模拟一个要锁住全屏的等待过程
        fairygui.GRoot.inst.showModalWait();
        fairygui.GTimers.inst.add(3000, 1, function () {
            fairygui.GRoot.inst.closeModalWait();
        }, this);
    }
    return MainPanel;
}());
__reflect(MainPanel.prototype, "MainPanel");
//# sourceMappingURL=MainPanel.js.map