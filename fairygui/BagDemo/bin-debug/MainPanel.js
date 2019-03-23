var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var MainPanel = (function () {
    function MainPanel() {
        this._view = fairygui.UIPackage.createObject("Bag", "Main").asCom;
        this._view.setSize(fairygui.GRoot.inst.width, fairygui.GRoot.inst.height);
        fairygui.GRoot.inst.addChild(this._view);
        this._list = this._view.getChild("list").asList;
        this._list.addEventListener(fairygui.ItemEvent.CLICK, this.__clickItem, this);
        for (var i = 0; i < 10; i++) {
            var button = this._list.getChildAt(i).asButton;
            button.icon = "resource/assets/i" + Math.floor(Math.random() * 10) + ".png";
            button.title = "" + Math.floor(Math.random() * 100);
        }
    }
    MainPanel.prototype.__clickItem = function (evt) {
        var item = evt.itemObject;
        this._view.getChild("n3").asLoader.url = item.icon;
        this._view.getChild("n5").text = item.icon;
    };
    return MainPanel;
}());
__reflect(MainPanel.prototype, "MainPanel");
