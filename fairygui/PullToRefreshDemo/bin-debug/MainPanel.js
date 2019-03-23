var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var MainPanel = (function () {
    function MainPanel() {
        this._view = fairygui.UIPackage.createObject("PullToRefresh", "Main").asCom;
        this._view.setSize(fairygui.GRoot.inst.width, fairygui.GRoot.inst.height);
        fairygui.GRoot.inst.addChild(this._view);
        this._list1 = this._view.getChild("list1").asList;
        this._list1.itemRenderer = this.renderListItem1;
        this._list1.callbackThisObj = this;
        this._list1.setVirtual();
        this._list1.numItems = 1;
        this._list1.scrollPane.addEventListener(fairygui.ScrollPane.PULL_DOWN_RELEASE, this.onPullDownToRefresh, this);
        this._list2 = this._view.getChild("list2").asList;
        this._list2.itemRenderer = this.renderListItem2;
        this._list1.callbackThisObj = this;
        this._list2.setVirtual();
        this._list2.numItems = 1;
        this._list2.scrollPane.addEventListener(fairygui.ScrollPane.PULL_UP_RELEASE, this.onPullUpToRefresh, this);
    }
    MainPanel.prototype.renderListItem1 = function (index, item) {
        item.text = "Item " + (this._list1.numItems - index - 1);
    };
    MainPanel.prototype.renderListItem2 = function (index, item) {
        item.text = "Item " + index;
    };
    MainPanel.prototype.onPullDownToRefresh = function (evt) {
        var header = (this._list1.scrollPane.header);
        if (header.readyToRefresh) {
            header.setRefreshStatus(2);
            this._list1.scrollPane.lockHeader(header.sourceHeight);
            //Simulate a async resquest
            fairygui.GTimers.inst.add(2000, 1, function () {
                this._list1.numItems += 5;
                //Refresh completed
                header.setRefreshStatus(3);
                this._list1.scrollPane.lockHeader(35);
                fairygui.GTimers.inst.add(2000, 1, function () {
                    header.setRefreshStatus(0);
                    this._list1.scrollPane.lockHeader(0);
                }, this);
            }, this);
        }
    };
    MainPanel.prototype.onPullUpToRefresh = function (evt) {
        var footer = this._list2.scrollPane.footer.asCom;
        footer.getController("c1").selectedIndex = 1;
        this._list2.scrollPane.lockFooter(footer.sourceHeight);
        //Simulate a async resquest
        fairygui.GTimers.inst.add(2000, 1, function () {
            this._list2.numItems += 5;
            //Refresh completed
            footer.getController("c1").selectedIndex = 0;
            this._list2.scrollPane.lockFooter(0);
        }, this);
    };
    return MainPanel;
}());
__reflect(MainPanel.prototype, "MainPanel");
//# sourceMappingURL=MainPanel.js.map