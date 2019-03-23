var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var MainPanel = (function () {
    function MainPanel() {
        this._view = fairygui.UIPackage.createObject("Basic", "Main").asCom;
        this._view.setSize(fairygui.GRoot.inst.width, fairygui.GRoot.inst.height);
        fairygui.GRoot.inst.addChild(this._view);
        this._backBtn = this._view.getChild("btn_Back");
        this._backBtn.visible = false;
        this._backBtn.addClickListener(this.onClickBack, this);
        this._demoContainer = this._view.getChild("container").asCom;
        this._cc = this._view.getController("c1");
        var cnt = this._view.numChildren;
        for (var i = 0; i < cnt; i++) {
            var obj = this._view.getChildAt(i);
            if (obj.group != null && obj.group.name == "btns")
                obj.addClickListener(this.runDemo, this);
        }
        this._demoObjects = {};
    }
    MainPanel.prototype.runDemo = function (evt) {
        var type = (evt.currentTarget).name.substr(4);
        var obj = this._demoObjects[type];
        if (obj == null) {
            obj = fairygui.UIPackage.createObject("Basic", "Demo_" + type).asCom;
            this._demoObjects[type] = obj;
        }
        this._demoContainer.removeChildren();
        this._demoContainer.addChild(obj);
        this._cc.selectedIndex = 1;
        this._backBtn.visible = true;
        switch (type) {
            case "Button":
                this.playButton();
                break;
            case "Text":
                this.playText();
                break;
            case "Window":
                this.playWindow();
                break;
            case "Popup":
                this.playPopup();
                break;
            case "Drag&Drop":
                this.playDragDrop();
                break;
            case "Depth":
                this.playDepth();
                break;
            case "Grid":
                this.playGrid();
                break;
        }
    };
    MainPanel.prototype.onClickBack = function (evt) {
        this._cc.selectedIndex = 0;
        this._backBtn.visible = false;
    };
    //------------------------------
    MainPanel.prototype.playButton = function () {
        var obj = this._demoObjects["Button"];
        obj.getChild("n34").addClickListener(this.__clickButton, this);
    };
    MainPanel.prototype.__clickButton = function (evt) {
        console.log("click button");
    };
    //------------------------------
    MainPanel.prototype.playText = function () {
        var obj = this._demoObjects["Text"];
        obj.getChild("n12").asRichTextField.addEventListener(egret.TextEvent.LINK, this.__clickLink, this);
        obj.getChild("n22").addClickListener(this.__clickGetInput, this);
    };
    MainPanel.prototype.__clickLink = function (evt) {
        var obj = evt.currentTarget;
        obj.text = "[img]ui://9leh0eyft9fj5f[/img][color=#FF0000]你点击了链接[/color]：" + evt.text;
    };
    MainPanel.prototype.__clickGetInput = function (evt) {
        var obj = this._demoObjects["Text"];
        obj.getChild("n21").text = obj.getChild("n18").text;
    };
    MainPanel.prototype.playWindow = function () {
        var obj = this._demoObjects["Window"];
        obj.getChild("n0").addClickListener(this.__clickWindowA, this);
        obj.getChild("n1").addClickListener(this.__clickWindowB, this);
    };
    MainPanel.prototype.__clickWindowA = function (evt) {
        if (this._winA == null)
            this._winA = new WindowA();
        this._winA.show();
    };
    MainPanel.prototype.__clickWindowB = function (evt) {
        if (this._winB == null)
            this._winB = new WindowB();
        this._winB.show();
    };
    MainPanel.prototype.playPopup = function () {
        if (this._pm == null) {
            this._pm = new fairygui.PopupMenu();
            this._pm.addItem("Item 1");
            this._pm.addItem("Item 2");
            this._pm.addItem("Item 3");
            this._pm.addItem("Item 4");
            if (this._popupCom == null) {
                this._popupCom = fairygui.UIPackage.createObject("Basic", "Component12").asCom;
                this._popupCom.center();
            }
        }
        var obj = this._demoObjects["Popup"];
        var btn = obj.getChild("n0");
        btn.addClickListener(this.__clickPopup1, this);
        var btn2 = obj.getChild("n2");
        btn2.addClickListener(this.__clickPopup2, this);
    };
    MainPanel.prototype.__clickPopup1 = function (evt) {
        var btn = evt.currentTarget;
        this._pm.show(btn, true);
    };
    MainPanel.prototype.__clickPopup2 = function (evt) {
        fairygui.GRoot.inst.showPopup(this._popupCom);
    };
    //------------------------------
    MainPanel.prototype.playDragDrop = function () {
        var obj = this._demoObjects["Drag&Drop"];
        var btnA = obj.getChild("a");
        btnA.draggable = true;
        var btnB = obj.getChild("b").asButton;
        btnB.draggable = true;
        btnB.addEventListener(fairygui.DragEvent.DRAG_START, this.__onDragStart, this);
        var btnC = obj.getChild("c").asButton;
        btnC.icon = null;
        btnC.addEventListener(fairygui.DropEvent.DROP, this.__onDrop, this);
        var btnD = obj.getChild("d");
        btnD.draggable = true;
        var bounds = obj.getChild("bounds");
        var rect = new egret.Rectangle();
        bounds.localToGlobalRect(0, 0, bounds.width, bounds.height, rect);
        fairygui.GRoot.inst.globalToLocalRect(rect.x, rect.y, rect.width, rect.height, rect);
        //因为这时候面板还在从右往左动，所以rect不准确，需要用相对位置算出最终停下来的范围
        rect.x -= obj.parent.x;
        btnD.dragBounds = rect;
    };
    MainPanel.prototype.__onDragStart = function (evt) {
        //取消对原目标的拖动，换成一个替代品
        evt.preventDefault();
        var btn = evt.currentTarget;
        fairygui.DragDropManager.inst.startDrag(btn, btn.icon, btn.icon);
    };
    MainPanel.prototype.__onDrop = function (evt) {
        var btn = evt.currentTarget;
        btn.icon = evt.source;
    };
    //------------------------------
    MainPanel.prototype.playDepth = function () {
        var obj = this._demoObjects["Depth"];
        var testContainer = obj.getChild("n22").asCom;
        var fixedObj = testContainer.getChild("n0");
        fixedObj.sortingOrder = 100;
        fixedObj.draggable = true;
        var numChildren = testContainer.numChildren;
        var i = 0;
        while (i < numChildren) {
            var child = testContainer.getChildAt(i);
            if (child != fixedObj) {
                testContainer.removeChildAt(i);
                numChildren--;
            }
            else
                i++;
        }
        var startPos = new egret.Point(fixedObj.x, fixedObj.y);
        obj.getChild("btn0").addClickListener(function () {
            var graph = new fairygui.GGraph();
            startPos.x += 10;
            startPos.y += 10;
            graph.setXY(startPos.x, startPos.y);
            graph.setSize(150, 150);
            graph.drawRect(1, 0, 1, 0xFF0000, 1);
            obj.getChild("n22").asCom.addChild(graph);
        }, this);
        obj.getChild("btn1").addClickListener(function () {
            var graph = new fairygui.GGraph();
            startPos.x += 10;
            startPos.y += 10;
            graph.setXY(startPos.x, startPos.y);
            graph.setSize(150, 150);
            graph.drawRect(1, 0, 1, 0x00FF00, 1);
            graph.sortingOrder = 200;
            obj.getChild("n22").asCom.addChild(graph);
        }, this);
    };
    //------------------------------
    MainPanel.prototype.playGrid = function () {
        var obj = this._demoObjects["Grid"];
        var list1 = obj.getChild("list1").asList;
        list1.removeChildrenToPool();
        var testNames = ["苹果手机操作系统", "安卓手机操作系统", "微软手机操作系统", "微软桌面操作系统", "苹果桌面操作系统", "未知操作系统"];
        var testColors = [0xFFFF00, 0xFF0000, 0xFFFFFF, 0x0000FF];
        var cnt = testNames.length;
        for (var i = 0; i < cnt; i++) {
            var item = list1.addItemFromPool().asButton;
            item.getChild("t0").text = "" + (i + 1);
            item.getChild("t1").text = testNames[i];
            item.getChild("t2").asTextField.color = testColors[Math.floor(Math.random() * 4)];
            item.getChild("star").asProgress.value = (Math.floor(Math.random() * 3) + 1) / 3 * 100;
        }
        var list2 = obj.getChild("list2").asList;
        list2.removeChildrenToPool();
        for (var i = 0; i < cnt; i++) {
            var item = list2.addItemFromPool().asButton;
            item.getChild("cb").asButton.selected = false;
            item.getChild("t1").text = testNames[i];
            item.getChild("mc").asMovieClip.playing = i % 2 == 0;
            item.getChild("t3").text = "" + Math.floor(Math.random() * 10000);
        }
    };
    return MainPanel;
}());
__reflect(MainPanel.prototype, "MainPanel");
//# sourceMappingURL=MainPanel.js.map