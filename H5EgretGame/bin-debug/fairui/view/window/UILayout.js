var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 界面布局
 * @author clong 2019.4.20
 */
var UILayout = (function () {
    function UILayout() {
    }
    /**
     * 设置9宫格布局
     */
    UILayout.setWindowLayout = function (view) {
        var layout = view.getViewStruct().layout;
        switch (layout) {
            //左上 7
            case UILayout.LEFT_TOP:
                view.x = 0;
                view.y = 0;
                break;
            //上中 8
            case UILayout.TOP_CENTER:
                view.x = (Global.stageWidth - view.width) * 0.5;
                view.y = 0;
                break;
            //右上 9
            case UILayout.TOP_RIGHT:
                view.x = Global.stageWidth - view.width;
                view.y = 0;
                break;
            //左中 4
            case UILayout.LEFT_CENTER:
                view.x = 0;
                view.y = (Global.stageHeight - view.height) * 0.5;
                break;
            case 0:
            //上下左右居中 5
            case UILayout.CENTER:
                view.x = (Global.stageWidth - view.width) * 0.5;
                view.y = (Global.stageHeight - view.height) * 0.5;
                break;
            //右中 6
            case UILayout.RIGHT_CENTER:
                view.x = Global.stageWidth - view.width;
                view.y = (Global.stageHeight - view.height) * 0.5;
                break;
            //左下 1
            case UILayout.LEFT_BOTTOM:
                view.x = 0;
                view.y = Global.stageHeight - view.height;
                break;
            //底部中间 2
            case UILayout.BOTTOM_CENTER:
                view.x = (Global.stageWidth - view.width) * 0.5;
                view.y = Global.stageHeight - view.height;
                break;
            //右下 3
            case UILayout.RIGHT_BOTTOM:
                view.x = Global.stageWidth - view.width;
                view.y = Global.stageHeight - view.height;
                break;
        }
    };
    /**
     * 添加显示层级
     */
    UILayout.setWindowLayer = function (view) {
        var i = 0;
        var len = 0;
        var panel;
        switch (view.layerType) {
            //主界面
            case UILayout.TYPE_MAIN:
                {
                    //先关闭窗口界面的所有面板
                    len = fairui.FairyUIManager.windowLayer.numChildren; // fairui.FairyUIManager.windowLayer.numChildren;
                    for (i = len - 1; i >= 0; i--) {
                        if (fairui.FairyUIManager.windowLayer.numChildren == 0) {
                            break; //因遮罩可能在这层，删除界面会删除遮罩一次会移除两个原件,从而导致报错
                        }
                        try {
                            panel = fairui.FairyUIManager.windowLayer.getChildAt(i);
                        }
                        catch (e) {
                            console.log("xxx");
                        }
                        if (panel instanceof fairui.UIBaseWindow && !panel.isNotDo) {
                            UISystem.Inst.removeWindowView(panel);
                        }
                    }
                    fairui.FairyUIManager.mainLayer.addChild(view);
                    break;
                }
            //窗口界面
            case UILayout.TYPE_WINDOW:
                {
                    len = fairui.FairyUIManager.windowLayer.numChildren;
                    if (view.isFirst) {
                        for (i = len - 1; i >= 0; i--) {
                            if (fairui.FairyUIManager.windowLayer.numChildren == 0) {
                                break; //因遮罩可能在这层，删除界面会删除遮罩一次会移除两个原件,从而导致报错
                            }
                            panel = fairui.FairyUIManager.windowLayer.getChildAt(i);
                            if (panel instanceof fairui.UIBaseWindow && !panel.isNotDo) {
                                UISystem.Inst.removeWindowView(panel);
                            }
                        }
                    }
                    else if (view.isTwo) {
                        var mutexViews = view.mutexViews; //互斥界面列表
                        for (i = len - 1; i >= 0; i--) {
                            if (fairui.FairyUIManager.windowLayer.numChildren == 0) {
                                break; //因遮罩可能在这层，删除界面会删除遮罩一次会移除两个原件,从而导致报错
                            }
                            panel = fairui.FairyUIManager.windowLayer.getChildAt(i);
                            if (panel instanceof fairui.UIBaseWindow) {
                                if (panel.isTwo && mutexViews && mutexViews.indexOf(panel.panelId) != -1) {
                                    UISystem.Inst.removeWindowView(panel);
                                }
                            }
                        }
                    }
                    if (view.isShowMask) {
                        UILayout.showMsk(fairui.FairyUIManager.windowLayer);
                    }
                    fairui.FairyUIManager.windowLayer.addChild(view);
                    break;
                }
            //弹框界面
            case UILayout.TYPE_ALERT:
                {
                    if (view.isShowMask) {
                        UILayout.showMsk(fairui.FairyUIManager.alertLayer);
                    }
                    fairui.FairyUIManager.alertLayer.addChild(view);
                    break;
                }
            //顶层界面,不添加有遮罩的界面
            case UILayout.TYPE_TOP:
                fairui.FairyUIManager.topLayer.addChild(view);
                break;
        }
    };
    /**
     * 显示遮罩
     * @param parent 	遮罩的容器
     * @param index 	层级
     */
    UILayout.showMsk = function (parent, index) {
        if (index === void 0) { index = -1; }
        if (UILayout.bgMsk == null) {
            UILayout.bgMsk = new fairui.ELoader();
            UILayout.bgMsk.autoSize = false;
            UILayout.bgMsk.fill = fairygui.LoaderFillType.ScaleFree; //自由缩放
            UILayout.bgMsk.setFairySource("common", "common_BG");
            UILayout.bgMsk.width = Global.stageWidth;
            UILayout.bgMsk.height = Global.stageHeight;
            UILayout.bgMsk.touchable = true;
            UILayout.bgMsk.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchEndHandler, this);
        }
        if (UILayout.bgMsk != null) {
            UILayout.bgMsk.removeFromParent();
        }
        if (parent) {
            if (index <= -1) {
                parent.addChild(UILayout.bgMsk.img);
            }
            else {
                parent.addChildAt(UILayout.bgMsk.img, index);
            }
        }
    };
    /**点击遮罩关闭对应界面 */
    UILayout.touchEndHandler = function (e) {
        var i = 0;
        var view;
        for (i = fairui.FairyUIManager.topLayer.numChildren - 1; i >= 0; i--) {
            view = fairui.FairyUIManager.topLayer.getChildAt(i);
            if (view instanceof fairui.UIBaseTip && view.maskClick && view.isShowMask) {
                view.close();
                return;
            }
        }
        for (i = fairui.FairyUIManager.alertLayer.numChildren - 1; i >= 0; i--) {
            view = fairui.FairyUIManager.alertLayer.getChildAt(i);
            if (view instanceof fairui.UIBaseWindow && view.maskClick && view.isShowMask) {
                view.close();
                return;
            }
        }
        for (i = fairui.FairyUIManager.windowLayer.numChildren - 1; i >= 0; i--) {
            view = fairui.FairyUIManager.windowLayer.getChildAt(i);
            if (view instanceof fairui.UIBaseWindow && view.maskClick && view.isShowMask) {
                view.close();
                return;
            }
        }
    };
    /**
     * 移除遮罩
     */
    UILayout.removeMsk = function () {
        if (UILayout.bgMsk != null) {
            UILayout.bgMsk.removeFromParent();
        }
        //检测是否有其他弹框并显示在后面
        var i = 0;
        var view;
        for (i = fairui.FairyUIManager.topLayer.numChildren - 1; i >= 0; i--) {
            view = fairui.FairyUIManager.topLayer.getChildAt(i);
            if (view instanceof fairui.UIBaseTip && view.isShowMask) {
                if (i >= 1) {
                    UILayout.showMsk(fairui.FairyUIManager.topLayer, i);
                }
                else {
                    UILayout.showMsk(fairui.FairyUIManager.topLayer, 0);
                }
                return;
            }
        }
        for (i = fairui.FairyUIManager.alertLayer.numChildren - 1; i >= 0; i--) {
            view = fairui.FairyUIManager.alertLayer.getChildAt(i);
            if (view instanceof fairui.UIBaseWindow && view.isShowMask) {
                if (i >= 1) {
                    UILayout.showMsk(fairui.FairyUIManager.alertLayer, i);
                }
                else {
                    UILayout.showMsk(fairui.FairyUIManager.alertLayer, 0);
                }
                return;
            }
        }
        for (i = fairui.FairyUIManager.windowLayer.numChildren - 1; i >= 0; i--) {
            view = fairui.FairyUIManager.windowLayer.getChildAt(i);
            if (view instanceof fairui.UIBaseWindow && view.isShowMask) {
                if (i >= 1) {
                    UILayout.showMsk(fairui.FairyUIManager.windowLayer, i);
                }
                else {
                    UILayout.showMsk(fairui.FairyUIManager.windowLayer, 0);
                }
                return;
            }
        }
    };
    /**
     * 自适应
     */
    UILayout.resizeDisplay = function () {
        if (UILayout.bgMsk != null) {
            UILayout.bgMsk.width = Global.stageWidth;
            UILayout.bgMsk.height = Global.stageHeight;
        }
    };
    /**窗口层 0*/
    UILayout.TYPE_WINDOW = 0;
    /**主界面层 1*/
    UILayout.TYPE_MAIN = 1;
    /**弹窗提示层*/
    UILayout.TYPE_ALERT = 2;
    /**顶层 */
    UILayout.TYPE_TOP = 3;
    /**默认不用处理的界面 */
    UILayout.VIEW_TYPE_0 = 0;
    /**界面类型，一级界面 */
    UILayout.VIEW_TYPE_1 = 1;
    /**界面类型，二级界面 */
    UILayout.VIEW_TYPE_2 = 2;
    /**界面类型，弹框界面 */
    UILayout.VIEW_TYPE_ALERT = 3;
    //界面布局
    /**左上 7*/
    UILayout.LEFT_TOP = 7;
    /**上中 8*/
    UILayout.TOP_CENTER = 8;
    /**上右 9*/
    UILayout.TOP_RIGHT = 9;
    /**左中 4*/
    UILayout.LEFT_CENTER = 4;
    /**上下左右居中 5*/
    UILayout.CENTER = 5;
    /**右中 6*/
    UILayout.RIGHT_CENTER = 6;
    /**左下 1*/
    UILayout.LEFT_BOTTOM = 1;
    /**底部中间 2*/
    UILayout.BOTTOM_CENTER = 2;
    /**右下 3*/
    UILayout.RIGHT_BOTTOM = 3;
    return UILayout;
}());
__reflect(UILayout.prototype, "UILayout");
//# sourceMappingURL=UILayout.js.map