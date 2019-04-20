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
     * 下拉列表
     * @author cl 2018.11.2
     */
    var UIDropDownList = (function (_super) {
        __extends(UIDropDownList, _super);
        function UIDropDownList() {
            var _this = _super.call(this) || this;
            _this._dataList = null;
            //组件缓存池
            _this.m_componentDic = null;
            //事件缓存池
            _this.m_eventPool = null;
            _this.m_eventPool = new EventPool();
            _this.m_componentDic = new flash.Dictionary();
            return _this;
        }
        UIDropDownList.prototype.constructExtension = function (buffer) {
            _super.prototype.constructExtension.call(this, buffer);
            this.init(null);
        };
        UIDropDownList.prototype.constructFromXML = function (xml) {
            _super.prototype.constructFromXML.call(this, xml);
        };
        UIDropDownList.prototype.IsInited = function () {
            return true;
        };
        UIDropDownList.prototype.setup_afterAdd = function (buffer, beginPos) {
            _super.prototype.setup_afterAdd.call(this, buffer, beginPos);
            this.visibleItemCount = fairygui.UIConfig.defaultComboBoxVisibleItemCount;
        };
        Object.defineProperty(UIDropDownList.prototype, "array", {
            /**
             * 数据列表
             * {"label":"全部","index":0}
             */
            get: function () {
                return this._dataList;
            },
            set: function (value) {
                this._dataList = value;
                var strs = [];
                if (this._dataList != null) {
                    for (var i = 0; i < this._dataList.length; i++) {
                        var o = this._dataList[i];
                        if (egret.is(o, "string")) {
                            strs.push(o);
                        }
                        else if (o.hasOwnProperty("label")) {
                            strs.push(o["label"]);
                        }
                    }
                }
                this.items = strs;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UIDropDownList.prototype, "selectHandler", {
            get: function () {
                return this._selectHandler;
            },
            set: function (value) {
                this._selectHandler = value;
                value.isImmediatelyGc = false;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 选择列表条目
         */
        UIDropDownList.prototype.onItemTapHandler = function (e) {
            var index = this.selectedIndex;
            var item = this._dataList[index];
            if (item) {
                if (this._selectHandler != null) {
                    this._selectHandler.executeWith([item]);
                }
            }
        };
        //-------------------------------------------------------
        //初始化
        UIDropDownList.prototype.init = function (param) {
            this.initUI();
            this.addAllListener();
        };
        //初始化UI
        UIDropDownList.prototype.initUI = function () {
        };
        //增加监听事件函数
        UIDropDownList.prototype.addAllListener = function () {
            this.m_componentDic.forEach(function (key, data) {
                if (egret.is(data, "IComponent")) {
                    data.addAllListener();
                }
            }, this);
        };
        //移除监听事件函数
        UIDropDownList.prototype.removeAllListener = function () {
            this.m_componentDic.forEach(function (key, data) {
                if (egret.is(data, "IComponent")) {
                    data.removeAllListener();
                }
            }, this);
        };
        /**
         * 添加事件监听
         */
        UIDropDownList.prototype.addGameListener = function (type, listener, thisObject, target) {
            if (this.m_eventPool != null) {
                this.m_eventPool.addListener(type, listener, target, thisObject);
            }
        };
        /**
         * 移除事件监听
         */
        UIDropDownList.prototype.removeGameListener = function (type, listener, thisObject, target) {
            if (this.m_eventPool != null) {
                this.m_eventPool.removeListener(type, listener, target, thisObject);
            }
        };
        /**
         * 添加组件
         */
        UIDropDownList.prototype.addComponent = function (component) {
            if (component == null || this.m_componentDic.hasOwnProperty(component.getHashCode())) {
                //console.log("已有相同组件");
                return component;
            }
            this.m_componentDic.setItem(component.getHashCode(), component);
            return component;
        };
        /**
         * 移除组件
         */
        UIDropDownList.prototype.removeComponent = function (component) {
            if (component == null)
                return;
            var pool = this.m_componentDic[component.getHashCode()];
            if (pool == null)
                return;
            delete this.m_componentDic[component.getHashCode()];
        };
        /**
         * 移除所有组件
         */
        UIDropDownList.prototype.removeAllComponent = function () {
            this.m_componentDic.reset();
        };
        /**
         * 重置界面
         */
        UIDropDownList.prototype.clear = function () {
            if (this.m_eventPool != null) {
                this.m_eventPool.removeAllListener();
            }
            this.m_componentDic.forEach(function (key, data) {
                if (egret.is(data, "IComponent")) {
                    data.clear();
                }
            }, this);
        };
        UIDropDownList.prototype.destroyComponent = function () {
            this.m_componentDic.forEach(function (key, data) {
                if (egret.is(data, "IComponent")) {
                    data.dispose();
                }
            }, this);
        };
        /**
         * 获取唯一hashCode
         */
        UIDropDownList.prototype.getHashCode = function () {
            return this.hashCode;
        };
        Object.defineProperty(UIDropDownList.prototype, "isDisposed", {
            get: function () {
                return this["_disposed"];
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 释放所有资源
         */
        UIDropDownList.prototype.dispose = function () {
            if (this["_disposed"])
                return;
            _super.prototype.dispose.call(this);
            this.clear();
            if (this.m_eventPool) {
                this.m_eventPool.dispose();
            }
            this.m_componentDic = null;
            this.m_eventPool = null;
        };
        return UIDropDownList;
    }(fairygui.GComboBox));
    fairui.UIDropDownList = UIDropDownList;
    __reflect(UIDropDownList.prototype, "fairui.UIDropDownList", ["IComponent", "IDispose"]);
})(fairui || (fairui = {}));
//# sourceMappingURL=UIDropDownList.js.map