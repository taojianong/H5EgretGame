var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 公共特效类
 * @author clong 2019.4.20
 */
var EffectUtil = (function () {
    function EffectUtil() {
    }
    /**
     * 打开窗口特效 0秒 大小30% 透明度100 ， 0.3秒 大小105% 透明度100 ，0.6秒 大小98% 透明度100 ， 0.8秒 大小100% 透明度100
     * @param window 界面
     * @param complete 界面特效完成方法
     * @param thisObj
     * @param params 参数
     */
    EffectUtil.openWindowEffect = function (window, complete, thisObj, params, isMust) {
        if (complete === void 0) { complete = null; }
        if (thisObj === void 0) { thisObj = null; }
        if (params === void 0) { params = null; }
        if (isMust === void 0) { isMust = false; }
        if (window) {
            if (!isMust && window["isWindowEffect"]) {
                return;
            }
            else if (isMust) {
                fairygui.GTween.kill(window);
            }
            window.scaleX = window.scaleY = 0.3;
            window.alpha = 1;
            window["isWindowEffect"] = true;
            var _self_1 = this;
            fairygui.GTween.to2(0.3, 0.3, 1.05, 1.05, 0.3)
                .setTarget(window, this)
                .onUpdate(onUpdate, _self_1)
                .onComplete(function onComplete() {
                fairygui.GTween.to2(1.05, 1.05, 0.98, 0.98, 0.3).setTarget(window, _self_1).onUpdate(onUpdate, _self_1).onComplete(function onComplete1() {
                    fairygui.GTween.to2(0.98, 0.98, 1, 1, 0.2).setTarget(window, _self_1).onUpdate(onUpdate, _self_1).onComplete(function onComplete2() {
                        fairygui.GTween.kill(window);
                        delete window["isWindowEffect"];
                        if (complete != null) {
                            complete.apply(thisObj, params);
                        }
                    }, _self_1);
                }, _self_1);
            }, this);
        }
        function onUpdate(tw) {
            window.scaleX = tw.value.x;
            window.scaleY = tw.value.y;
            window.x = (Global.stageWidth - window.scaleX * window.width) * 0.5;
            window.y = (Global.stageHeight - window.scaleY * window.height) * 0.5;
        }
    };
    /**
     * 关闭窗口特效 0秒 大小100% 透明度100 ， 0.4秒 大小80% 透明度0
     * @param window 界面
     * @param complete 完成事件
     * @param thisObj
     * @param params 其他参数
     * @param isMust 是否强制关闭
     */
    EffectUtil.closeWindowEffect = function (window, complete, thisObj, params, isMust) {
        if (complete === void 0) { complete = null; }
        if (thisObj === void 0) { thisObj = null; }
        if (params === void 0) { params = null; }
        if (isMust === void 0) { isMust = false; }
        if (window) {
            if (!isMust && window["isWindowEffect"]) {
                return;
            }
            else if (isMust) {
                fairygui.GTween.kill(window);
            }
            window.alpha = 1;
            window.scaleX = window.scaleY = 1;
            window["isWindowEffect"] = true;
            var w_1 = window.width;
            var h_1 = window.height;
            fairygui.GTween.to3(1, 1, 1, 0.8, 0.8, 0, 0.3).setTarget(window, this)
                .onUpdate(function onUpdate(tw) {
                window.scaleX = tw.value.x;
                window.scaleY = tw.value.y;
                window.alpha = tw.value.z;
                window.x = (Global.stageWidth - window.scaleX * w_1) * 0.5;
                window.y = (Global.stageHeight - window.scaleY * h_1) * 0.5;
            }, this)
                .onComplete(function onComplete() {
                fairygui.GTween.kill(window);
                delete window["isWindowEffect"];
                if (complete != null) {
                    complete.apply(thisObj, params);
                }
            }, this);
        }
    };
    return EffectUtil;
}());
__reflect(EffectUtil.prototype, "EffectUtil");
//# sourceMappingURL=EffectUtil.js.map