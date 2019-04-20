var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 界面结构
 * @author clong 2019.4.20
 */
var ViewStruct = (function () {
    function ViewStruct() {
        /**
         * 层级类型 0窗口层,1主界面层,2弹窗提示层,3顶层
         */
        this.layerType = UILayout.TYPE_WINDOW;
        /**
         * 是否windows配置界面
         */
        this.isWindow = true;
    }
    Object.defineProperty(ViewStruct.prototype, "layout", {
        /**
         * 界面布局 九键盘布局 7为左上，8为上中，9为上右 4为左中 5中间 6为右中 1为左下 2为下中 3为右下
         */
        get: function () {
            return 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ViewStruct.prototype, "panelId", {
        /**面板ID */
        get: function () {
            return this.window ? this.window.id : 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ViewStruct.prototype, "isNotDo", {
        /**是否为不处理的界面 */
        get: function () {
            return this.window && this.window.view_type == UILayout.VIEW_TYPE_0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ViewStruct.prototype, "isFirst", {
        /**是否为一级界面 */
        get: function () {
            return this.window && this.window.view_type == UILayout.VIEW_TYPE_1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ViewStruct.prototype, "isTwo", {
        /**是否为二级界面 */
        get: function () {
            return this.window && this.window.view_type == UILayout.VIEW_TYPE_2;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ViewStruct.prototype, "isAlert", {
        /**是否为弹框界面 */
        get: function () {
            return this.window && this.window.view_type == UILayout.VIEW_TYPE_ALERT;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ViewStruct.prototype, "isShowMask", {
        /**是否显示遮罩 */
        get: function () {
            return this.window && this.window.show_mask == 1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ViewStruct.prototype, "isQueue", {
        /**是否显示加入队列显示 */
        get: function () {
            return this.window && this.window.isQueue == 1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ViewStruct.prototype, "isShowEffect", {
        /**是否显示特效 */
        get: function () {
            return this.window && this.window.isEffect == 0;
        },
        enumerable: true,
        configurable: true
    });
    return ViewStruct;
}());
__reflect(ViewStruct.prototype, "ViewStruct");
//# sourceMappingURL=ViewStruct.js.map