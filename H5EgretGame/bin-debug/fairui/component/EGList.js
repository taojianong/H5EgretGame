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
     * 封装FairyGui列表
     * @author cl 2018.4.18
     */
    var EGList = (function (_super) {
        __extends(EGList, _super);
        function EGList(list, thisObject) {
            if (thisObject === void 0) { thisObject = null; }
            var _this = _super.call(this) || this;
            _this._itemRenderer = null;
            _this._clickHandler = null; //点击事件
            _this._selectedPage = null; //分页选中某一页触发的事件
            _this._elements = null;
            _this._lastclickItem = null;
            _this._isShowDoSpecialEffect = false;
            /**分页组件 */
            _this.currentpage = 0;
            _this.isFirst = false;
            /**这个变量主要是来标识List是否滚动,滚动后由于item复用会导致list的点击bug */
            _this._isRenderData = false;
            _this.list = list;
            if (_this.list != null) {
                _this.callbackThisObj = thisObject || _this;
                _this.list.callbackThisObj = _this;
                _this.list.itemRenderer = _this.listItemRender;
                _this.list.addEventListener(fairygui.ItemEvent.CLICK, _this.clickItem, _this);
            }
            return _this;
        }
        Object.defineProperty(EGList.prototype, "btn_left", {
            /**设置上一页按钮 */
            set: function (value) {
                if (value) {
                    this._btn_left = value;
                    this._btn_left.addEventListener(egret.TouchEvent.TOUCH_TAP, flash.bind(this.touchLeftBtnHandler, this), this);
                }
                else {
                    if (this._btn_left) {
                        this._btn_left.removeEventListener(egret.TouchEvent.TOUCH_TAP, flash.bind(this.touchLeftBtnHandler, this), this);
                    }
                }
            },
            enumerable: true,
            configurable: true
        });
        /**
        * 上一页
        */
        EGList.prototype.touchLeftBtnHandler = function (e) {
            if (this.currentpage > 0) {
                var index = this.currentpage - 1;
                this.toPage(index);
            }
        };
        Object.defineProperty(EGList.prototype, "btn_right", {
            /**设置下一页按钮 */
            set: function (value) {
                if (value) {
                    this._btn_right = value;
                    this._btn_right.addEventListener(egret.TouchEvent.TOUCH_TAP, flash.bind(this.touchRightBtnHandler, this), this);
                }
                else {
                    if (this._btn_right) {
                        this._btn_right.removeEventListener(egret.TouchEvent.TOUCH_TAP, flash.bind(this.touchRightBtnHandler, this), this);
                    }
                }
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 下一页
         */
        EGList.prototype.touchRightBtnHandler = function (e) {
            if (this.currentpage < this.array.length - 1) {
                var index = this.currentpage + 1;
                this.toPage(index);
            }
        };
        /**跳转到某一页 0~n*/
        EGList.prototype.toPage = function (index) {
            index = index < 0 ? 0 : index;
            if (this._selectedPage) {
                this._selectedPage.apply(this.callbackThisObj, 0);
            }
            this.scrollToView(index, true); //滚动到某一个item
        };
        /**滑动list */
        EGList.prototype.scrollListPage = function () {
            var index = ((this.list.getFirstChildInView()) % this.list.numItems); //获取页数
            this.currentpage = index;
            if (this._btn_left) {
                this._btn_left.enabled = this.currentpage > 0;
            }
            if (this._btn_right) {
                this._btn_right.enabled = this.currentpage < (this.array.length - 1);
            }
            if (this._selectedPage) {
                this._selectedPage.apply(this.callbackThisObj, 0);
            }
        };
        Object.defineProperty(EGList.prototype, "isShowDoSpecialEffect", {
            set: function (bool) {
                this._isShowDoSpecialEffect = bool;
                if (this._isShowDoSpecialEffect) {
                    this.list.scrollPane.addEventListener(fairygui.ScrollPane.SCROLL, this.doSpecialEffect, this);
                }
                else {
                    this.list.scrollPane.removeEventListener(fairygui.ScrollPane.SCROLL, this.doSpecialEffect, this);
                }
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 滑动list
         */
        EGList.prototype.doSpecialEffect = function () {
            var midX = this.list.scrollPane.posX + this.list.viewWidth / 2;
            var cnt = this.list.numChildren;
            for (var i = 0; i < cnt; i++) {
                var obj = this.list.getChildAt(i);
                var dist = Math.abs(midX - obj.x - obj.width / 2);
                if (dist <= obj.width * 0.5) {
                    if (this._lastclickItem && obj && this._lastclickItem == obj) {
                        continue;
                    }
                    this.clickIndex = this.getShowItemIndex(obj);
                    return;
                }
            }
        };
        EGList.prototype.getShowItem = function (index) {
            return this.list.getChildAt(index);
        };
        /** 更具条目 获取索引，是否为条目索引*/
        EGList.prototype.getShowItemIndex = function (item, isChindIndex) {
            if (isChindIndex === void 0) { isChindIndex = true; }
            if (isChindIndex) {
                return this.list.getChildIndex(item);
            }
            else {
                return this.list.childIndexToItemIndex(this.list.getChildIndex(item));
            }
        };
        /**转换到显示对象索引*/
        EGList.prototype.itemIndexToChildIndex = function (index) {
            var newIndex = this.list.itemIndexToChildIndex(index);
            return newIndex;
        };
        /**转换显示对象索引为项目索引。*/
        EGList.prototype.childIndexToItemIndex = function (index) {
            var newIndex = this.list.childIndexToItemIndex(index);
            return newIndex;
        };
        /**设置虚拟列表 */
        EGList.prototype.setVirtual = function () {
            this.list.setVirtual();
            this.setScroll();
        };
        EGList.prototype.setScroll = function () {
            if (this.list.scrollPane) {
                this.list.scrollPane.addEventListener(fairygui.ScrollPane.SCROLL, flash.bind(this.scrollListPage, this), this); //这个函数主要是来处理滚动分页
            }
        };
        Object.defineProperty(EGList.prototype, "isDragged", {
            /**
             * 设置List是否能够滚动
             */
            set: function (value) {
                if (this.list.scrollPane) {
                    this.list.scrollPane.touchEffect = value;
                }
            },
            enumerable: true,
            configurable: true
        });
        EGList.prototype.sync = function () {
            this.list.ensureBoundsCorrect();
        };
        Object.defineProperty(EGList.prototype, "clickIndex", {
            /**默认选择第几个 */
            set: function (index) {
                var newIndex = this.itemIndexToChildIndex(index);
                if (newIndex < 0) {
                    newIndex = 0;
                }
                if (this.list.numChildren > 0) {
                    var item = this.list.getChildAt(newIndex);
                    var ie = new fairygui.ItemEvent(fairygui.ItemEvent.CLICK, item);
                    this.list.dispatchEvent(ie);
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EGList.prototype, "callbackThisObj", {
            /**This */
            get: function () {
                return this._thisObject;
            },
            set: function (value) {
                this._thisObject = value;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 设置渲染条目
         */
        EGList.prototype.setRenderItem = function (pkgName, resName) {
            this.list.defaultItem = fairui.FairyTextureUtils.getUrl(pkgName, resName);
        };
        Object.defineProperty(EGList.prototype, "itemProvider", {
            set: function (value) {
                if (this.list != null) {
                    this.list.itemProvider = value;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EGList.prototype, "itemRenderer", {
            /**渲染方法 */
            get: function () {
                return this._itemRenderer;
            },
            set: function (value) {
                this._itemRenderer = value;
                if (this.list != null) {
                    this.list.itemRenderer = value;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EGList.prototype, "clickHandler", {
            /**点击事件 */
            get: function () {
                return this._clickHandler;
            },
            set: function (value) {
                this._clickHandler = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EGList.prototype, "selectedPage", {
            /**获取分页事件 */
            get: function () {
                return this._selectedPage;
            },
            /**设置分页事件 */
            set: function (value) {
                this._selectedPage = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EGList.prototype, "selectionMode", {
            get: function () {
                return this.list.selectionMode;
            },
            /**选择模式 */
            set: function (value) {
                this.list.selectionMode = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EGList.prototype, "array", {
            /**
             * 设置对应数据
             */
            get: function () {
                return this._array;
            },
            /**每次数值改变之前会触发每个显示中子组件的data=null的方法，重写set data自己处理数据引用,某些情况如果显示中的子组件需要数据更新，
             * 请使用elements属性自行进行组件更新，不要给array赋值，可以提升效率*/
            set: function (value) {
                this._array = value || [];
                this.clearData();
                this._elements = [];
                if (this.list != null) {
                    this.list.numItems = this._array.length;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EGList.prototype, "numItems", {
            /**设置条目 */
            get: function () {
                return this.list.numItems;
            },
            set: function (value) {
                this._array = [];
                this.clearData();
                this._elements = [];
                this._array.length = value;
                if (this.list != null) {
                    this.list.numItems = this._array.length;
                }
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 点击条目
         */
        EGList.prototype.clickItem = function (e) {
            this.selectItem(e.itemObject);
        };
        /**选择条目 */
        EGList.prototype.selectItem = function (item) {
            //复选可选择多个可重复选择
            if ((this.selectionMode == fairygui.ListSelectionMode.Single)
                && this._lastclickItem
                && item
                && this._lastclickItem == item
                && (this._lastclickItem["listIndex"] == item["listIndex"] && !this._isRenderData)) {
                return;
            }
            this._isRenderData = false;
            if (this._lastclickItem) {
                this._lastclickItem["select"] = false;
            }
            if (item) {
                item["select"] = true;
            }
            this._lastclickItem = item;
            if (this._clickHandler) {
                this._clickHandler.apply(this.callbackThisObj, [item]);
            }
        };
        Object.defineProperty(EGList.prototype, "lastClickItem", {
            /**获取选择的条目 */
            get: function () {
                return this._lastclickItem;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 渲染条目
         */
        EGList.prototype.listItemRender = function (index, obj) {
            if (index == 0) {
                this._elements = [];
            }
            this._isRenderData = true;
            var item = obj;
            if (item && item["show"] != undefined) {
                item.show(this._array[index]);
            }
            if (this.elements.indexOf(item) == -1) {
                this.elements.push(item);
            }
            //列表渲染单个条目
            var evt = new GameEvent(GameEvent.RENDER);
            evt.data = { "index": index, "obj": obj, "thisObject": this._thisObject };
            this.dispatchEvent(evt);
            //列表渲染完成
            if (index == (this._array.length - 1)) {
                var completeEvt = new GameEvent(GameEvent.COMPLETE);
                completeEvt.thisObject = this._thisObject;
                this.dispatchEvent(completeEvt);
            }
            if (this._selectedPage) {
                //处理分页的时候
                if (index == 0 && !this.isFirst) {
                    this.isFirst = true;
                    this._selectedPage.apply(this.callbackThisObj, 0);
                }
            }
        };
        Object.defineProperty(EGList.prototype, "elements", {
            /**列表渲染所有条目  虚拟列表不可以这样取*/
            get: function () {
                return this._elements;
                //转换项目索引为显示对象索引。
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EGList.prototype, "selectedIndex", {
            /**当前选择条目索引 */
            get: function () {
                return this.list.selectedIndex;
            },
            set: function (value) {
                this.list.selectedIndex = value;
            },
            enumerable: true,
            configurable: true
        });
        /**添加选择 */
        EGList.prototype.addSelection = function (index, scrollItToView) {
            this.list.addSelection(index, scrollItToView);
        };
        /**移除选择 */
        EGList.prototype.removeSelection = function (index) {
            this.list.removeSelection(index);
        };
        /**全选 */
        EGList.prototype.selectAll = function () {
            this.list.selectAll();
        };
        /**不选择 */
        EGList.prototype.selectNone = function () {
            this.list.selectNone();
        };
        /**反选 */
        EGList.prototype.selectReverse = function () {
            this.list.selectReverse();
        };
        /**
         * 滚动到
         * @params index
         * @params ani
         * @params setFirst
         */
        EGList.prototype.scrollToView = function (index, ani, setFirst) {
            if (ani === void 0) { ani = false; }
            if (setFirst === void 0) { setFirst = false; }
            this.list.scrollToView(index, ani, setFirst);
        };
        Object.defineProperty(EGList.prototype, "scrollPane", {
            get: function () {
                return this.list.scrollPane;
            },
            enumerable: true,
            configurable: true
        });
        EGList.prototype.getFirstChildInView = function () {
            return this.list.getFirstChildInView();
        };
        /**
         * 滚动到底部
         */
        EGList.prototype.scrollToBottom = function () {
            this.list.scrollToView(this._array.length - 1);
        };
        Object.defineProperty(EGList.prototype, "touchEnabled", {
            get: function () {
                return this.list._rootContainer.touchEnabled;
            },
            set: function (value) {
                this.list._rootContainer.touchEnabled = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EGList.prototype, "enabled", {
            get: function () {
                return this.list.enabled;
            },
            set: function (val) {
                this.list.enabled = val;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EGList.prototype, "touchChildren", {
            get: function () {
                return this.list._rootContainer.touchChildren;
            },
            set: function (value) {
                this.list._rootContainer.touchChildren = value;
            },
            enumerable: true,
            configurable: true
        });
        EGList.prototype.getChildAt = function (index) {
            return this.list.getChildAt(index);
        };
        Object.defineProperty(EGList.prototype, "numChildren", {
            get: function () {
                return this.list.numChildren;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EGList.prototype, "visible", {
            get: function () {
                return this.list.visible;
            },
            set: function (value) {
                this.list.visible = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EGList.prototype, "x", {
            get: function () {
                return this.list.x;
            },
            set: function (value) {
                this.list.x = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EGList.prototype, "y", {
            get: function () {
                return this.list.y;
            },
            set: function (value) {
                this.list.y = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EGList.prototype, "width", {
            get: function () {
                return this.list.width;
            },
            set: function (value) {
                this.list.width = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EGList.prototype, "height", {
            get: function () {
                return this.list.height;
            },
            set: function (value) {
                this.list.height = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EGList.prototype, "viewWidth", {
            get: function () {
                return this.list.viewWidth;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EGList.prototype, "viewHeight", {
            get: function () {
                return this.list.viewHeight;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EGList.prototype, "grayed", {
            /**置灰 */
            get: function () {
                return this.list.grayed;
            },
            set: function (value) {
                this.list.grayed = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EGList.prototype, "columnCount", {
            set: function (value) {
                this.list.columnCount = value;
            },
            enumerable: true,
            configurable: true
        });
        EGList.prototype.localToGlobal = function (ax, ay, resultPoint) {
            return this.list.localToGlobal(ax, ay, resultPoint);
        };
        EGList.prototype.clearData = function () {
            if (this.elements) {
                for (var index in this.elements) {
                    if (this.elements[index] instanceof fairui.BaseSprite) {
                        this.elements[index]["hide"]();
                    }
                }
            }
            if (this._lastclickItem) {
                this._lastclickItem["select"] = false;
                this._lastclickItem = null;
            }
        };
        /**
         * 释放
         */
        EGList.prototype.dispose = function () {
            if (this.list != null) {
                this.list.removeEventListener(fairygui.ItemEvent.CLICK, this.clickItem, this);
                if (this.list.scrollPane) {
                    this.list.scrollPane.removeEventListener(fairygui.ScrollPane.SCROLL, flash.bind(this.scrollListPage, this), this.list.scrollPane);
                }
                this.list.dispose();
                this.list = null;
            }
            this._btn_left = null;
            this._btn_right = null;
            this._thisObject = null;
            this._itemRenderer = null;
            this._clickHandler = null;
            this._selectedPage = null;
            this._array = null;
            this.clearData();
            this._elements = null;
            this._lastclickItem = null;
            if (this._btn_left) {
                this._btn_left.removeEventListener(egret.TouchEvent.TOUCH_TAP, flash.bind(this.touchLeftBtnHandler, this), this);
            }
            if (this._btn_right) {
                this._btn_right.removeEventListener(egret.TouchEvent.TOUCH_TAP, flash.bind(this.touchRightBtnHandler, this), this);
            }
        };
        return EGList;
    }(egret.EventDispatcher));
    fairui.EGList = EGList;
    __reflect(EGList.prototype, "fairui.EGList");
})(fairui || (fairui = {}));
//# sourceMappingURL=EGList.js.map