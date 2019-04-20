var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * UI管理类
 * @author clong 2019.4.20
 */
var UISystem = (function () {
    function UISystem() {
        //------------------------------------------------------
        //显示对象缓存
        this.m_view = new flash.Dictionary();
        //等待回收显示对象缓存
        this.m_gc_view = new flash.Dictionary();
        /**需要队列显示的窗口 */
        this.queueWindows = [];
        var loopTime = 2 * 60 * 1000;
        if (true) {
            loopTime = 5000;
        }
        Global.timer.doTimeLoop(loopTime, this.checkCache);
    }
    Object.defineProperty(UISystem, "Inst", {
        get: function () {
            if (this._Inst == null)
                this._Inst = new UISystem();
            return this._Inst;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 检测缓存界面并清理
     */
    UISystem.prototype.checkCache = function () {
        var viewDic = this.getGcViewCache();
        viewDic.forEach(function check(key, view) {
            if (view instanceof fairui.View && view.isCanGc()) {
                view.dispose();
                viewDic.delItem(key);
            }
        }, this);
    };
    UISystem.prototype.getGcViewCache = function () {
        return this.m_gc_view;
    };
    /**
     * 是否已打开该界面
     * @param view 界面
     */
    UISystem.prototype.hasOpenView = function (cls) {
        return cls != null && this.m_view[cls] != null && this.m_view[cls].parent != null;
    };
    /**
     * 是否打开过界面
     * @cls		创建类名
     * @param	参数
     */
    UISystem.prototype.getOpenWindow = function (cls) {
        var view = this.m_view[cls];
        if (view == null || view.parent == null) {
            return null;
        }
        return view;
    };
    /**
     * 根据界面ID打开对应界面
     * @param panelId 面板ID
     * @param params 对应参数
     * @param cfgParam 配置对应参数
     */
    UISystem.prototype.openWindow = function (panelId, params, cfgParam) {
        if (params === void 0) { params = null; }
        if (cfgParam === void 0) { cfgParam = null; }
        if (egret.is(panelId, "string")) {
            panelId = parseInt(panelId);
        }
        // let window: Windows;
        // let key: any;
        // for (key in Windows.itemsDic) {
        // 	window = Windows.itemsDic[key];
        // 	if (window && window.id == panelId) {
        // 		this.CreateWindowView(egret.getDefinitionByName(window.clsName), params, cfgParam);
        // 		break;
        // 	}
        // }
    };
    /**
     * 待回收里获取对象
     */
    UISystem.prototype.getViewByGc = function (cls) {
        var view = this.m_gc_view[cls];
        if (view != null) {
            delete this.m_gc_view[cls];
            return view;
        }
        return null;
    };
    /**
     * 打开窗口界面
     */
    UISystem.prototype.openWindowView = function (cls, param, cfgParam) {
        if (param === void 0) { param = null; }
        if (cfgParam === void 0) { cfgParam = null; }
        var view = this.m_view[cls];
        if (view == null) {
            view = this.getViewByGc(cls);
            if (view == null) {
                view = new cls();
                view.cls = cls;
            }
            this.m_view[cls] = view;
        }
        view.init(param, cfgParam);
        if (view.parent == null) {
            UILayout.setWindowLayer(view);
        }
        else {
            Global.log.error(this, "已打开该界面");
        }
        return view;
    };
    /**
     * 统一创建界面窗口类接口，不要其它地方创建
     * @cls		创建类名
     * @param	参数
     */
    UISystem.prototype.createWindowView = function (cls, param, cfgParam) {
        if (param === void 0) { param = null; }
        if (cfgParam === void 0) { cfgParam = null; }
        return this.openWindowView(cls, param, cfgParam);
    };
    /**
     * 统一创建view类接口，不要其它地方创建
     * @cls		创建类名
     * @param	参数
     */
    UISystem.prototype.createView = function (cls, param) {
        if (param === void 0) { param = null; }
        var view = new cls();
        view.cls = cls;
        view.init(param);
        return view;
    };
    /**
     * 移除传入的窗口界面类
     */
    UISystem.prototype.removeWindowClass = function (cls) {
        this.removeWindowView(this.m_view[cls]);
    };
    /**
     * 移除传入的窗口界面对象,并从缓存中清除
     */
    UISystem.prototype.removeWindowView = function (view) {
        if (view == null) {
            return null;
        }
        var _self = this;
        var isShowMask = view.isShowMask;
        var isQueue = view.isQueue;
        var isShowEffect = view.getViewStruct() ? view.getViewStruct().isShowEffect : false;
        if (isShowEffect) {
            view.playCloseEffect(complete, null, this);
        }
        else {
            complete();
        }
        function complete() {
            _self.removeView(view);
            //移除遮罩
            if (isShowMask) {
                UILayout.removeMsk();
            }
        }
    };
    /**
     * 移除但不清除对应缓存
     */
    UISystem.prototype.removeView = function (view) {
        if (view.parent != null) {
            view.parent.removeChild(view);
        }
        view.removeAllListener();
        view.clear();
        if (view.cls in this.m_view) {
            delete this.m_view[view.cls];
            this.m_gc_view[view.cls] = view;
        }
    };
    //--------------------------------------------------
    /**
     * 打开TIP界面
     * @param cls 		界面类，tip类继承自UIBaseTip
     * @param param 	界面参数,target为当前tip点击的对象,showMask显示遮罩自动居中了
     * @param pkgName 	对应资源包名字
     */
    UISystem.prototype.openTipView = function (cls, param, pkgName) {
        if (param === void 0) { param = null; }
        if (pkgName === void 0) { pkgName = ""; }
        var _self = this;
        if (cls == null) {
            return;
        }
        this.closeAllTip();
        var tipView = this.m_view[cls];
        if (tipView == null) {
            tipView = this.getViewByGc(cls);
            if (tipView == null) {
                var clsName_1 = egret.getQualifiedClassName(cls);
                if (clsName_1.lastIndexOf(".") != -1) {
                    clsName_1 = clsName_1.substr(clsName_1.lastIndexOf(".") + 1);
                }
                fairui.PanelRegister.registerClass(pkgName, clsName_1, cls);
                Global.timer.doTimeOnce(100, function init() {
                    tipView = fairui.PanelRegister.createGObject(pkgName, clsName_1);
                    tipView.init(param);
                    tipView.cls = cls;
                    complete();
                });
            }
            else {
                complete();
            }
        }
        else {
            complete();
        }
        function complete() {
            tipView.init(param);
            var showMask = param && param.hasOwnProperty("showMask") && param["showMask"];
            if (showMask) {
                UILayout.showMsk(fairui.FairyUIManager.topLayer);
            }
            if (tipView.parent == null) {
                fairui.FairyUIManager.topLayer.addChild(tipView);
            }
            _self.m_view[cls] = tipView;
        }
    };
    /**
     * 关闭TipView
     * @param cls 		Tip界面类
     */
    UISystem.prototype.closeTipView = function (cls) {
        var _self = this;
        var tipView = this.m_view[cls] || this.getViewByGc(cls);
        ;
        if (tipView != null) {
            var isShowMask = tipView.isShowMask;
            if (isShowMask) {
                EffectUtil.closeWindowEffect(tipView, function complete() {
                    _self.removeView(tipView);
                    UILayout.removeMsk();
                }, _self, null, true);
            }
            else {
                _self.removeView(tipView);
            }
        }
    };
    /**
     * 移除所有TIP界面
     */
    UISystem.prototype.closeAllTip = function () {
        var len = fairui.FairyUIManager.topLayer.numChildren;
        var view = null;
        for (var i = len - 1; i >= 0; i--) {
            view = fairui.FairyUIManager.topLayer.getChildAt(i);
            if (view instanceof fairui.UIBaseTip) {
                var isShowMask = view.isShowMask;
                this.removeView(view);
                if (isShowMask) {
                    UILayout.removeMsk();
                }
            }
        }
    };
    return UISystem;
}());
__reflect(UISystem.prototype, "UISystem");
//# sourceMappingURL=UISystem.js.map