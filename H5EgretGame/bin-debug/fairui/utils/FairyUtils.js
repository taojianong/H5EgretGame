var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var fairui;
(function (fairui) {
    var GGroup = fairygui.GGroup;
    var GList = fairygui.GList;
    var GLoader = fairygui.GLoader;
    /**
     * FairyGUI工具
     * @author cl 2019.1.29
     */
    var FairyUtils = (function () {
        function FairyUtils() {
        }
        /**
         * 声明容器对应变量
         * @param parent 		容器
         * @param thisObject 	this对象
         */
        FairyUtils.setVar = function (parent, thisObject) {
            if (parent != null && thisObject != null) {
                var disObj = void 0;
                for (var i = 0; i < parent.numChildren; i++) {
                    disObj = parent.getChildAt(i);
                    if (disObj.name == "icon" || disObj.name == "title") {
                        continue;
                    }
                    if (disObj.name && disObj.name.indexOf("tab_") == 0 && disObj instanceof GGroup) {
                        thisObject[disObj.name] = new fairui.ETab(disObj, thisObject);
                        if (thisObject instanceof fairui.BaseSprite)
                            thisObject.addComponent(thisObject[disObj.name]);
                    }
                    else if (disObj.name && disObj.name.indexOf("eglist_") == 0 && disObj instanceof GList) {
                        thisObject[disObj.name] = new fairui.EGList(disObj, thisObject);
                        if (thisObject instanceof fairui.BaseSprite)
                            thisObject.addComponent(thisObject[disObj.name]);
                    }
                    else if (disObj.name && disObj.name.indexOf("eloader_") == 0 && disObj instanceof GLoader) {
                        thisObject[disObj.name] = new fairui.ELoader(disObj);
                        if (thisObject instanceof fairui.BaseSprite)
                            thisObject.addComponent(thisObject[disObj.name]);
                    }
                    else {
                        thisObject[disObj.name] = disObj;
                    }
                }
                for (var i = 0; i < parent._transitions.length; i++) {
                    var transObj = void 0;
                    transObj = parent._transitions[i];
                    thisObject[transObj.name] = transObj;
                }
            }
        };
        return FairyUtils;
    }());
    fairui.FairyUtils = FairyUtils;
    __reflect(FairyUtils.prototype, "fairui.FairyUtils");
})(fairui || (fairui = {}));
//# sourceMappingURL=FairyUtils.js.map