var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var MainPanel = (function () {
    function MainPanel() {
        this._view = fairygui.UIPackage.createObject("Joystick", "Main").asCom;
        this._view.setSize(fairygui.GRoot.inst.width, fairygui.GRoot.inst.height);
        fairygui.GRoot.inst.addChild(this._view);
        this._text = this._view.getChild("n4").asTextField;
        this._joystick = new JoystickModule(this._view);
        this._joystick.addEventListener(JoystickModule.JoystickMoving, this.onJoystickMoving, this);
        this._joystick.addEventListener(JoystickModule.JoystickUp, this.onJoystickUp, this);
    }
    MainPanel.prototype.onJoystickMoving = function (evt) {
        this._text.text = "" + evt.data;
    };
    MainPanel.prototype.onJoystickUp = function (evt) {
        this._text.text = "";
    };
    return MainPanel;
}());
__reflect(MainPanel.prototype, "MainPanel");
