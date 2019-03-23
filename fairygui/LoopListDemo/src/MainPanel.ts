class MainPanel {
    private _view: fairygui.GComponent;
    private _list:fairygui.GList;
        
    public constructor() {
        this._view = fairygui.UIPackage.createObject("LoopList","Main").asCom;
        this._view.setSize(fairygui.GRoot.inst.width,fairygui.GRoot.inst.height);
        fairygui.GRoot.inst.addChild(this._view);

        this._list = this._view.getChild("list").asList;
        this._list.setVirtualAndLoop();

        this._list.itemRenderer = this.renderListItem;
        this._list.callbackThisObj = this;
        this._list.numItems = 5;
        this._list.scrollPane.addEventListener(fairygui.ScrollPane.SCROLL, this.doSpecialEffect, this);
        
        this.doSpecialEffect();
    }
    
    private doSpecialEffect():void
    {
        //change the scale according to the distance to the middle
        var midX:number = this._list.scrollPane.posX + this._list.viewWidth / 2;
        var cnt:number = this._list.numChildren;
        for (var i:number = 0; i < cnt; i++)
        {
            var obj:fairygui.GObject = this._list.getChildAt(i);
            var dist:number = Math.abs(midX - obj.x - obj.width / 2);
            if (dist > obj.width) //no intersection
                obj.setScale(1, 1);
            else
            {
                var ss:number = 1 + (1 - dist / obj.width) * 0.24;
                obj.setScale(ss, ss);
            }
        }
        
        this._view.getChild("n3").text = "" + ((this._list.getFirstChildInView() + 1) % this._list.numItems);
    }
    
    private renderListItem(index:number, obj:fairygui.GObject):void
    {
        var item:fairygui.GButton = <fairygui.GButton>obj;
        item.setPivot(0.5, 0.5);
        item.icon = fairygui.UIPackage.getItemURL("LoopList", "n" + (index + 1));
    }
}

