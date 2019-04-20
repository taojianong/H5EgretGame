var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var fairui;
(function (fairui) {
    /**
     * @author clong 2019.1.29
     * @Description: 自定义选择标签
     */
    var ETab = (function (_super) {
        __extends(ETab, _super);
        function ETab(group, callbackThisObjValue) {
            var _this = _super.call(this) || this;
            /**选中的Index*/
            _this._selectedIndex = -1;
            /**按钮数组*/
            _this._buttonArray = new Array();
            /**总条目数*/
            _this._itemNum = 0;
            /**初始XY坐标 */
            _this.initX = 0;
            _this.initY = 0;
            //tab按钮中最大层级
            _this.maxIndex = 0;
            /**按钮所在最低层级 */
            _this.minLayer = -1;
            _this.tabGroup = group;
            //初始化Tab
            var tabParent = group.parent;
            var cnt = tabParent.numChildren;
            var btn;
            for (var i = 0; i < cnt; i++) {
                if (tabParent.getChildAt(i).group == group) {
                    btn = tabParent.getChildAt(i);
                    _this._buttonArray.push(btn);
                    btn.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onTabButtonClick, _this);
                    btn.data = _this._buttonArray.length - 1;
                    ++_this._itemNum;
                    if (_this._buttonArray.length == 1) {
                        _this.initX = btn.x;
                        _this.initY = btn.y;
                    }
                    _this.maxIndex = Math.max(_this.maxIndex, i);
                    if (_this.minLayer == -1) {
                        _this.minLayer = i;
                    }
                }
            }
            _this.callbackThisObj = callbackThisObjValue;
            return _this;
        }
        ETab.prototype.IsInited = function () {
            return true;
        };
        Object.defineProperty(ETab.prototype, "isReverse", {
            set: function (value) {
                if (value) {
                    this._buttonArray = this._buttonArray.reverse();
                    for (var i = 0; i < this._buttonArray.length; i++) {
                        this._buttonArray[i].data = i;
                    }
                    this.tabIndex = 0;
                }
            },
            enumerable: true,
            configurable: true
        });
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
                    this.minLayer = btn.getIndex();
                }
                else {
                    this.minLayer = Math.min(this.minLayer, btn.getIndex());
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
        Object.defineProperty(ETab.prototype, "tabIndex", {
            get: function () {
                return this._selectedIndex;
            },
            set: function (value) {
                this.selectedIndex = value;
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
                this.sortBtnLayers(val);
                this._selectedIndex = val;
                if (this._selectedHandler != null) {
                    this._selectedHandler.call(this.callbackThisObj, this._selectedIndex);
                }
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 标签按钮层级排序
         * @param except 当前选中按钮索引
         */
        ETab.prototype.sortBtnLayers = function (except) {
            var btn = null;
            var len = this._buttonArray.length;
            for (var i = 0; i < len; i++) {
                btn = this._buttonArray[i];
                if (btn) {
                    btn.parent.setChildIndex(btn, this.minLayer + len - i - 1);
                }
            }
            btn = this._buttonArray[except];
            if (btn) {
                btn.indexTo(this.minLayer + len - 1);
            }
        };
        /**
         * 按钮点击事件
         * @param index 按钮索引
         */
        ETab.prototype.onTabButtonClick = function (evt) {
            this.selectedIndex = (evt.target).data;
        };
        Object.defineProperty(ETab.prototype, "x", {
            get: function () {
                return this.tabGroup.x;
            },
            set: function (value) {
                this.tabGroup.x = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ETab.prototype, "y", {
            get: function () {
                return this.tabGroup.y;
            },
            set: function (value) {
                this.tabGroup.y = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ETab.prototype, "parent", {
            get: function () {
                return this.tabGroup.parent;
            },
            enumerable: true,
            configurable: true
        });
        //---------------------------------------------------
        ETab.prototype.clear = function () {
            _super.prototype.clear.call(this);
        };
        ETab.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
            if (this.tabGroup != null) {
                this.tabGroup.dispose();
            }
            this.tabGroup = null;
            this._buttonArray = null;
            this._selectedHandler = null;
            this.callbackThisObj = null;
            this._selectedIndex = -1;
            this.minLayer = -1;
            this.maxIndex = 0;
            this.initX = 0;
            this.initY = 0;
            this._itemNum = 0;
        };
        return ETab;
    }(fairui.BaseSprite));
    fairui.ETab = ETab;
    __reflect(ETab.prototype, "fairui.ETab");
})(fairui || (fairui = {}));
//# sourceMappingURL=ETab.js.map