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
     * 翻页按钮
     * @author cl 2018.4.27
     */
    var PageButton = (function (_super) {
        __extends(PageButton, _super);
        function PageButton() {
            var _this = _super.call(this) || this;
            /**
             * 当前页
             */
            _this._page = 1;
            /**
             * 总页数
             */
            _this._totalPages = 1;
            /**
             * 每页总条数
             */
            _this.pageItems = 5;
            /**
             * 翻页数组数据
             */
            _this._data = null;
            _this.touchChildren = true;
            _this.touchEnabled = false;
            return _this;
        }
        PageButton.prototype.show = function (data) {
            _super.prototype.show.call(this, data);
            this.btn_left.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickLeftHandler, this);
            this.btn_left.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickRightHandler, this);
        };
        PageButton.prototype.hide = function () {
            this.btn_left.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickLeftHandler, this);
            this.btn_left.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickRightHandler, this);
        };
        /**
         * 上一页
         */
        PageButton.prototype.clickLeftHandler = function (e) {
            if (this._page > 1) {
                this._page--;
                this.updateBtnStates();
                this.dispatchEvent(new GameEvent(GameEvent.SELECT));
            }
        };
        /**
         * 下一页
         */
        PageButton.prototype.clickRightHandler = function (e) {
            if (this._page < this._totalPages) {
                this._page++;
                this.updateBtnStates();
                this.dispatchEvent(new GameEvent(GameEvent.SELECT));
            }
        };
        /**
         * 设置数据
         * @param value 要翻页的数组数据
         * @param items 单页总条数
         */
        PageButton.prototype.setData = function (value, items) {
            if (items === void 0) { items = 5; }
            this._data = value || [];
            this.pageItems = items;
            this._totalPages = ArrayUtil.getPages(value, items);
            this._page = 1;
            //更新按钮状态
            this.updateBtnStates();
            this.dispatchEvent(new GameEvent(GameEvent.SELECT));
        };
        /**
         * 更新按钮状态
         */
        PageButton.prototype.updateBtnStates = function () {
            this.title = this._page + "/" + this._totalPages;
            this.btn_left.enabled = !(this._page <= 1);
            this.btn_right.enabled = !(this._page >= this._totalPages);
        };
        Object.defineProperty(PageButton.prototype, "page", {
            /**
             * 当前页
             */
            get: function () {
                return this._page;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PageButton.prototype, "totalPage", {
            /**
             * 总页数
             */
            get: function () {
                return this._totalPages;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PageButton.prototype, "data", {
            /**
             * 翻页的所有数据
             */
            get: function () {
                return this._data;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PageButton.prototype, "pageData", {
            /**
             * 获取当前页数据
             */
            get: function () {
                return ArrayUtil.getPageList(this._data, this.page, this.pageItems);
            },
            enumerable: true,
            configurable: true
        });
        PageButton.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
            this._data = null;
            this._page = 0;
            this._totalPages = 0;
            this.pageItems = 0;
        };
        return PageButton;
    }(fairui.BaseButton));
    fairui.PageButton = PageButton;
    __reflect(PageButton.prototype, "fairui.PageButton");
})(fairui || (fairui = {}));
//# sourceMappingURL=PageButton.js.map