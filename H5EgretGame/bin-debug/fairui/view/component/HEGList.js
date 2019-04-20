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
     * 横向滚动列表
     * @author clong 2019.3.22
     */
    var HEGList = (function (_super) {
        __extends(HEGList, _super);
        function HEGList() {
            var _this = _super.call(this) || this;
            _this._elements = null;
            /**分页组件 */
            _this.currentpage = 0;
            _this._selectedPage = null; //分页选中某一页触发的事件
            return _this;
        }
        HEGList.prototype.constructFromXML = function (xml) {
            _super.prototype.constructFromXML.call(this, xml);
            this.initUI();
        };
        HEGList.prototype.initUI = function () {
            this.callbackThisObj = this;
            this.list.callbackThisObj = this;
            this.list.itemRenderer = this.listItemRender;
            // this.list.addEventListener(fairygui.ItemEvent.CLICK, this.clickItem, this);
        };
        /**
         * 渲染条目
         */
        HEGList.prototype.listItemRender = function (index, obj) {
            if (index == 0) {
                this._elements = [];
            }
            var item = obj;
            if (item && item["show"] != undefined) {
                item.show(this._array[index]);
            }
            if (this.elements.indexOf(item) == -1) {
                this.elements.push(item);
            }
            //列表渲染单个条目
            var evt = new GameEvent(GameEvent.EGLIST_RENDER);
            evt.data = { "index": index, "obj": obj };
            evt.thisObject = this._thisObject;
            this.dispatchEvent(evt);
            //列表渲染完成
            if (index == (this._array.length - 1)) {
                var completeEvt = new GameEvent(GameEvent.EGLIST_COMPLETE);
                completeEvt.thisObject = this._thisObject;
                this.dispatchEvent(completeEvt);
            }
            if (egret.is(obj, "IComponent")) {
                this.addComponent(obj);
            }
        };
        Object.defineProperty(HEGList.prototype, "elements", {
            /**列表渲染所有条目  虚拟列表不可以这样取*/
            get: function () {
                return this._elements;
                //转换项目索引为显示对象索引。
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(HEGList.prototype, "callbackThisObj", {
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
        HEGList.prototype.setRenderItem = function (pkgName, resName) {
            this.list.defaultItem = fairui.FairyTextureUtils.getUrl(pkgName, resName);
        };
        Object.defineProperty(HEGList.prototype, "array", {
            /**
             * 设置对应数据
             */
            get: function () {
                return this._array;
            },
            /**每次数值改变之前会触发每个显示中子组件的data=null的方法，重写set data自己处理数据引用,某些情况如果显示中的子组件需要数据更新，
             * 请使用elements属性自行进行组件更新，不要给array赋值，可以提升效率*/
            set: function (value) {
                this.removeAllComponent();
                this.clearData();
                this._array = value || [];
                this.updateList();
            },
            enumerable: true,
            configurable: true
        });
        /**更新列表 */
        HEGList.prototype.updateList = function () {
            if (this.list != null) {
                this.list.numItems = this._array.length;
            }
        };
        /**清理数据 */
        HEGList.prototype.clearData = function () {
            if (this.elements) {
                for (var index in this.elements) {
                    if (this.elements[index] instanceof fairui.BaseSprite) {
                        this.elements[index]["hide"]();
                    }
                }
            }
            if (this._btn_left) {
                this._btn_left.removeEventListener(egret.TouchEvent.TOUCH_TAP, flash.bind(this.touchLeftBtnHandler, this), this);
            }
            if (this._btn_right) {
                this._btn_right.removeEventListener(egret.TouchEvent.TOUCH_TAP, flash.bind(this.touchRightBtnHandler, this), this);
            }
            this._btn_left = null;
            this._btn_right = null;
            this._elements = [];
            this._array = [];
        };
        /**
        * 上一页
        */
        HEGList.prototype.touchLeftBtnHandler = function (e) {
            if (this.currentpage > 0) {
                var index = this.currentpage - 1;
                this.toPage(index);
            }
        };
        /**
         * 下一页
         */
        HEGList.prototype.touchRightBtnHandler = function (e) {
            if (this.currentpage < this.array.length - 1) {
                var index = this.currentpage + 1;
                this.toPage(index);
            }
        };
        /**跳转到某一页 0~n*/
        HEGList.prototype.toPage = function (index) {
            index = index < 0 ? 0 : index;
            if (this._selectedPage) {
                this._selectedPage.apply(this.callbackThisObj, 0);
            }
            this.scrollToView(index, true); //滚动到某一个item
        };
        Object.defineProperty(HEGList.prototype, "btn_left", {
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
        Object.defineProperty(HEGList.prototype, "btn_right", {
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
         * 滚动到
         * @params index
         * @params ani
         * @params setFirst
         */
        HEGList.prototype.scrollToView = function (index, ani, setFirst) {
            if (ani === void 0) { ani = false; }
            if (setFirst === void 0) { setFirst = false; }
            this.list.scrollToView(index, ani, setFirst);
        };
        Object.defineProperty(HEGList.prototype, "columnGap", {
            /**列距 */
            get: function () {
                return this.list.columnGap;
            },
            set: function (value) {
                this.list.columnGap = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(HEGList.prototype, "isOverflow", {
            /**是否溢出 */
            get: function () {
                var len = this.elements.length;
                var w = 0;
                for (var i = 0; i < len; i++) {
                    w += this.elements[i] ? this.elements[i].width : 0;
                }
                w += len > 0 ? (len - 1) * this.columnGap : 0;
                return w > this.list.width;
            },
            enumerable: true,
            configurable: true
        });
        HEGList.prototype.scrollLeft = function (ratio, ani) {
            if (this.list && this.list.scrollPane) {
                this.list.scrollPane.scrollLeft(ratio, ani);
            }
        };
        HEGList.prototype.scrollRight = function (ratio, ani) {
            if (this.list && this.list.scrollPane) {
                this.list.scrollPane.scrollRight(ratio, ani);
            }
        };
        /**
         * 释放
         */
        HEGList.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
            this.clearData();
            if (this.list != null) {
                // this.list.removeEventListener(fairygui.ItemEvent.CLICK, this.clickItem, this);
                // if (this.list.scrollPane) {
                // 	this.list.scrollPane.removeEventListener(fairygui.ScrollPane.SCROLL, flash.bind(this.scrollListPage, this), this.list.scrollPane);
                // }
                this.list.dispose();
                this.list = null;
            }
            this._btn_left = null;
            this._btn_right = null;
            this._thisObject = null;
            this._selectedPage = null;
            this._array = null;
            this._elements = null;
        };
        return HEGList;
    }(fairui.BaseSprite));
    fairui.HEGList = HEGList;
    __reflect(HEGList.prototype, "fairui.HEGList");
})(fairui || (fairui = {}));
//# sourceMappingURL=HEGList.js.map