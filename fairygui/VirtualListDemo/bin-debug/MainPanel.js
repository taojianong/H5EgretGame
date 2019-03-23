var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var MainPanel = (function () {
    function MainPanel() {
        this._view = fairygui.UIPackage.createObject("VirtualList", "Main").asCom;
        this._view.setSize(fairygui.GRoot.inst.width, fairygui.GRoot.inst.height);
        fairygui.GRoot.inst.addChild(this._view);
        this._view.getChild("n6").addClickListener(function () { this._list.addSelection(500, true); }, this);
        this._view.getChild("n7").addClickListener(function () { this._list.scrollPane.scrollTop(); }, this);
        this._view.getChild("n8").addClickListener(function () { this._list.scrollPane.scrollBottom(true); }, this);
        this._list = this._view.getChild("mailList").asList;
        this._list.setVirtual();
        this._list.itemRenderer = this.renderListItem;
        this._list.callbackThisObj = this;
        this._list.numItems = 1000;
    }
    MainPanel.prototype.renderListItem = function (index, obj) {
        var item = obj;
        item.setFetched(index % 3 == 0);
        item.setRead(index % 2 == 0);
        item.setTime("5 Nov 2015 16:24:33");
        item.title = index + " Mail title here";
    };
    return MainPanel;
}());
__reflect(MainPanel.prototype, "MainPanel");
//# sourceMappingURL=MainPanel.js.map