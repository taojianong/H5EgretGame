var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var MainPanel = (function () {
    function MainPanel() {
        this._view = fairygui.UIPackage.createObject("LoopList", "Main").asCom;
        this._view.setSize(fairygui.GRoot.inst.width, fairygui.GRoot.inst.height);
        fairygui.GRoot.inst.addChild(this._view);
        this._list = this._view.getChild("list").asList;
        this._list.setVirtualAndLoop();
        this._list.itemRenderer = this.renderListItem;
        this._list.callbackThisObj = this;
        this._list.numItems = 5;
        this._list.scrollPane.addEventListener(fairygui.ScrollPane.SCROLL, this.doSpecialEffect, this);
        this.doSpecialEffect();
    }
    MainPanel.prototype.doSpecialEffect = function () {
        //change the scale according to the distance to the middle
        var midX = this._list.scrollPane.posX + this._list.viewWidth / 2;
        var cnt = this._list.numChildren;
        for (var i = 0; i < cnt; i++) {
            var obj = this._list.getChildAt(i);
            var dist = Math.abs(midX - obj.x - obj.width / 2);
            if (dist > obj.width)
                obj.setScale(1, 1);
            else {
                var ss = 1 + (1 - dist / obj.width) * 0.24;
                obj.setScale(ss, ss);
            }
        }
        this._view.getChild("n3").text = "" + ((this._list.getFirstChildInView() + 1) % this._list.numItems);
    };
    MainPanel.prototype.renderListItem = function (index, obj) {
        var item = obj;
        item.setPivot(0.5, 0.5);
        item.icon = fairygui.UIPackage.getItemURL("LoopList", "n" + (index + 1));
    };
    return MainPanel;
}());
__reflect(MainPanel.prototype, "MainPanel");
//# sourceMappingURL=MainPanel.js.map