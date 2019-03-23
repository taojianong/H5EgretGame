var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var fairui;
(function (fairui) {
    /**
     * @author Xjy
     * @date 2018/4/2
     * @Description: 自定义选择标签
     */
    var ETab = (function () {
        function ETab(group, callbackThisObjValue) {
            /**选中的Index*/
            this._selectedIndex = -1;
            /**按钮数组*/
            this._buttonArray = new Array();
            /**总条目数*/
            this._itemNum = 0;
            /**初始XY坐标 */
            this.initX = 0;
            this.initY = 0;
            //tab按钮中最大层级
            this.maxIndex = 0;
            this.group = group;
            //初始化Tab
            var tabParent = group.parent;
            var cnt = tabParent.numChildren;
            var btn;
            for (var i = 0; i < cnt; i++) {
                if (tabParent.getChildAt(i).group == group) {
                    btn = tabParent.getChildAt(i);
                    this._buttonArray.push(btn);
                    btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTabButtonClick, this);
                    btn.data = this._buttonArray.length - 1;
                    ++this._itemNum;
                    if (this._buttonArray.length == 1) {
                        this.initX = btn.x;
                        this.initY = btn.y;
                    }
                    this.maxIndex = Math.max(this.maxIndex, i);
                }
            }
            this.callbackThisObj = callbackThisObjValue;
        }
        ETab.prototype.setButtonArray = function (btns) {
            this._buttonArray = btns;
            var i = 0;
            var btn = null;
            for (i = 0; i < this._buttonArray.length; i++) {
                btn = this._buttonArray[i];
                btn.data = i;
                if (i == 0) {
                    this.initX = btn.x;
                    this.initY = btn.y;
                }
            }
        };
        /**
         * 排列按钮坐标
         * @param gap 间隔
         * @param dir 0为竖向，1为横向
         */
        ETab.prototype.sortBtnPoint = function (gap, dir) {
            if (gap === void 0) { gap = 5; }
            if (dir === void 0) { dir = 0; }
            var i = 0;
            var btn = null;
            var prev = null;
            for (i = 0; i < this._buttonArray.length; i++) {
                btn = this._buttonArray[i];
                if (btn && btn.visible) {
                    if (dir == 0) {
                        btn.y = prev == null ? this.initY : prev.y + prev.height + gap;
                    }
                    else if (dir == 1) {
                        btn.x = prev == null ? this.initX : prev.x + prev.width + gap;
                    }
                    prev = btn;
                }
            }
        };
        Object.defineProperty(ETab.prototype, "buttonArray", {
            /**按钮数组 */
            get: function () {
                return this._buttonArray;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ETab.prototype, "selectedIndex", {
            get: function () {
                return this._selectedIndex;
            },
            set: function (val) {
                if (val > this._itemNum) {
                    return;
                }
                if (this._selectedIndex >= 0) {
                    this._buttonArray[this._selectedIndex].selected = false;
                }
                this._buttonArray[val].selected = true;
                if (this._buttonArray[val] instanceof fairui.EButton) {
                    this._buttonArray[val].indexTo(this.maxIndex); // toTop();
                }
                this._selectedIndex = val;
                if (this._selectedHandler != null) {
                    this._selectedHandler.call(this.callbackThisObj, this._selectedIndex);
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ETab.prototype, "clickHandler", {
            set: function (handler) {
                this._selectedHandler = handler;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 按钮点击事件
         * @author xjy
         * @date 2018/4/3
         * @param index 按钮索引
         */
        ETab.prototype.onTabButtonClick = function (evt) {
            this.selectedIndex = (evt.target).data;
        };
        Object.defineProperty(ETab.prototype, "x", {
            get: function () {
                return this.group.x;
            },
            set: function (value) {
                this.group.x = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ETab.prototype, "y", {
            get: function () {
                return this.group.y;
            },
            set: function (value) {
                this.group.y = value;
            },
            enumerable: true,
            configurable: true
        });
        return ETab;
    }());
    fairui.ETab = ETab;
    __reflect(ETab.prototype, "fairui.ETab");
})(fairui || (fairui = {}));
//# sourceMappingURL=ETab.js.map