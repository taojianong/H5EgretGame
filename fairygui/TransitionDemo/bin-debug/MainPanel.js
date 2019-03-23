var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var MainPanel = (function () {
    function MainPanel() {
        this._view = fairygui.UIPackage.createObject("Transition", "Main").asCom;
        this._view.setSize(fairygui.GRoot.inst.width, fairygui.GRoot.inst.height);
        fairygui.GRoot.inst.addChild(this._view);
        this._tweeObject = { value: 0 };
        this._btnGroup = this._view.getChild("g0").asGroup;
        this._g1 = fairygui.UIPackage.createObject("Transition", "BOSS").asCom;
        this._g2 = fairygui.UIPackage.createObject("Transition", "BOSS_SKILL").asCom;
        this._g3 = fairygui.UIPackage.createObject("Transition", "TRAP").asCom;
        this._g4 = fairygui.UIPackage.createObject("Transition", "GoodHit").asCom;
        this._g5 = fairygui.UIPackage.createObject("Transition", "PowerUp").asCom;
        //play_num_now是在编辑器里设定的名称，这里表示播放到'play_num_now'这个位置时才开始播放数字变化效果
        this._g5.getTransition("t0").setHook("play_num_now", this.__playNum, this);
        this._view.getChild("btn0").addClickListener(function () { this.__play(this._g1); }, this);
        this._view.getChild("btn1").addClickListener(function () { this.__play(this._g2); }, this);
        this._view.getChild("btn2").addClickListener(function () { this.__play(this._g3); }, this);
        this._view.getChild("btn3").addClickListener(this.__play4, this);
        this._view.getChild("btn4").addClickListener(this.__play5, this);
    }
    MainPanel.prototype.__play = function (target) {
        this._btnGroup.visible = false;
        fairygui.GRoot.inst.addChild(target);
        var t = target.getTransition("t0");
        t.play(function () {
            this._btnGroup.visible = true;
            fairygui.GRoot.inst.removeChild(target);
        }, this);
    };
    MainPanel.prototype.__play4 = function (evt) {
        this._btnGroup.visible = false;
        this._g4.x = fairygui.GRoot.inst.width - this._g4.width - 20;
        this._g4.y = 100;
        fairygui.GRoot.inst.addChild(this._g4);
        var t = this._g4.getTransition("t0");
        //播放3次
        t.play(function () {
            this._btnGroup.visible = true;
            fairygui.GRoot.inst.removeChild(this._g4);
        }, this, null, 3);
    };
    MainPanel.prototype.__play5 = function (evt) {
        this._btnGroup.visible = false;
        this._g5.x = 20;
        this._g5.y = fairygui.GRoot.inst.height - this._g5.height - 100;
        fairygui.GRoot.inst.addChild(this._g5);
        var t = this._g5.getTransition("t0");
        this._startValue = 10000;
        var add = Math.ceil(Math.random() * 2000 + 1000);
        this._endValue = this._startValue + add;
        this._g5.getChild("value").text = "" + this._startValue;
        this._g5.getChild("add_value").text = "" + add;
        t.play(function () {
            this._btnGroup.visible = true;
            fairygui.GRoot.inst.removeChild(this._g5);
        }, this);
    };
    MainPanel.prototype.__playNum = function () {
        //这里演示了一个数字变化的过程
        this._tweeObject.value = this._startValue;
        var vars = {
            onChange: function () {
                this._g5.getChild("value").text = "" + Math.floor(this._tweeObject.value);
            },
            onChangeObj: this
        };
        egret.Tween.get(this._tweeObject, vars).to({ value: this._endValue }, 300);
    };
    return MainPanel;
}());
__reflect(MainPanel.prototype, "MainPanel");
//# sourceMappingURL=MainPanel.js.map