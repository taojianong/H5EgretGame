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
     * 容器基类
     * @author cl 2019.1.29
     */
    var BaseSprite = (function (_super) {
        __extends(BaseSprite, _super);
        function BaseSprite(comp) {
            if (comp === void 0) { comp = null; }
            var _this = _super.call(this) || this;
            /**数据 */
            _this._data = null;
            /**是否变灰 */
            _this._isGray = false;
            /**
             * 用传入的fairyui.GComponent转化为BaseSprite
             */
            _this.ower = null;
            //组件缓存池
            _this.m_componentDic = null;
            //事件缓存池
            _this.m_eventPool = null;
            _this._currentState = "";
            _this.ower = comp;
            _this.m_eventPool = EventPool.create();
            _this.m_componentDic = new flash.Dictionary();
            return _this;
        }
        BaseSprite.prototype.constructExtension = function (buffer) {
            _super.prototype.constructExtension.call(this, buffer);
        };
        Object.defineProperty(BaseSprite.prototype, "icon", {
            /**图标 */
            get: function () {
                return this._iconLoader ? this._iconLoader.url : "";
            },
            set: function (value) {
                if (this._iconLoader != null) {
                    this._iconLoader.url = value;
                }
            },
            enumerable: true,
            configurable: true
        });
        BaseSprite.prototype.constructFromXML = function (xml) {
            _super.prototype.constructFromXML.call(this, xml);
            this.initController();
            fairui.FairyUtils.setVar(this, this);
        };
        /**初始化控制器 */
        BaseSprite.prototype.initController = function () {
            this._buttonController = this.getController("button");
            this._iconLoader = this.getChild("icon");
        };
        BaseSprite.prototype.isInited = function () {
            return this.isInit;
        };
        Object.defineProperty(BaseSprite.prototype, "currentState", {
            /**当前状态 */
            get: function () {
                return this._currentState;
            },
            set: function (value) {
                this._currentState = value;
                if (this._buttonController) {
                    this._buttonController.selectedPage = value;
                }
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 是否包含全局坐标点
         * @param gx 全局X坐标
         * @param gy 全局Y坐标
         */
        BaseSprite.prototype.containsGlobalPoint = function (gx, gy) {
            var lp = this.globalToLocal(gx, gy);
            var bounds = new egret.Rectangle(0, 0, this.width, this.height);
            return bounds.contains(lp.x, lp.y);
        };
        BaseSprite.prototype.addChild = function (child) {
            if (egret.is(child, "IComponent")) {
                this.addComponent(child);
            }
            return _super.prototype.addChild.call(this, child);
        };
        BaseSprite.prototype.addChildAt = function (child, index) {
            if (egret.is(child, "IComponent")) {
                this.addComponent(child);
            }
            return _super.prototype.addChildAt.call(this, child, index);
        };
        /**
         * 获取条目
         * @param name 组件名字
         */
        BaseSprite.prototype.getElement = function (name, container) {
            if (container === void 0) { container = null; }
            container = container || this;
            return container.getChild(name);
        };
        /**
         * 是否包含某个对象
         */
        BaseSprite.prototype.contains = function (child) {
            return this.getChildIndex(child) != -1;
        };
        /**
         * 添加白鹭原生元件
         * @param child 白鹭原生显示对象
         */
        BaseSprite.prototype.addEgretChild = function (child) {
            this._rootContainer.addChild(child);
        };
        /**添加白鹭原生元件
         * @param child 白鹭原生显示对象
         */
        BaseSprite.prototype.addEgretChildAt = function (child, index) {
            this._rootContainer.addChildAt(child, index);
        };
        /**
         * 移除白鹭原生元件
         */
        BaseSprite.prototype.removeEgretChild = function (child) {
            if (child && this._rootContainer.contains(child)) {
                this._rootContainer.removeChild(child);
            }
            else if (child && child.parent != null) {
                child.parent.removeChild(child);
            }
        };
        Object.defineProperty(BaseSprite.prototype, "touchEnabled", {
            get: function () {
                return this._rootContainer.touchEnabled;
            },
            set: function (value) {
                this._rootContainer.touchEnabled = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BaseSprite.prototype, "touchChildren", {
            get: function () {
                return this._rootContainer.touchChildren;
            },
            set: function (value) {
                this._rootContainer.touchChildren = value;
            },
            enumerable: true,
            configurable: true
        });
        //-------------------------------------------------------
        /**
         * 增加监听事件函数
         */
        BaseSprite.prototype.addAllListener = function () {
            if (this.m_eventPool != null) {
                this.m_eventPool.relistenerAll();
                this.m_componentDic.forEach(function (key, data) {
                    if (egret.is(data, "IComponent")) {
                        data.addAllListener();
                    }
                }, this);
            }
        };
        /**
         * 移除监听事件函数
         */
        BaseSprite.prototype.removeAllListener = function () {
            if (this.m_eventPool != null) {
                this.m_eventPool.removeAllListener();
                this.m_componentDic.forEach(function (key, data) {
                    if (egret.is(data, "IComponent")) {
                        data.removeAllListener();
                    }
                }, this);
            }
        };
        /**
         * 添加事件监听
         */
        BaseSprite.prototype.addGameListener = function (type, listener, thisObject, target) {
            if (this.m_eventPool != null) {
                this.m_eventPool.addListener(type, listener, target, thisObject);
            }
        };
        /**
         * 移除事件监听
         */
        BaseSprite.prototype.removeGameListener = function (type, listener, thisObject, target) {
            if (this.m_eventPool != null) {
                this.m_eventPool.removeListener(type, listener, target, thisObject);
            }
        };
        /**
         * 添加组件
         */
        BaseSprite.prototype.addComponent = function (component) {
            if (component) {
                var hashCode = component.getHashCode();
                this.m_componentDic.setItem(hashCode, component);
            }
            return component;
        };
        /**
         * 移除组件
         */
        BaseSprite.prototype.removeComponent = function (component) {
            if (component != null) {
                var hashCode = component.getHashCode();
                this.m_componentDic.delItem(hashCode);
            }
        };
        /**
         * 移除所有组件
         */
        BaseSprite.prototype.removeAllComponent = function () {
            this.m_componentDic.reset();
        };
        /**
         * 重置界面
         */
        BaseSprite.prototype.clear = function () {
            if (this.m_eventPool != null) {
                this.m_eventPool.removeAllListener();
            }
            this.m_componentDic.forEach(function (key, data) {
                if (egret.is(data, "IComponent")) {
                    data.clear();
                }
            }, this);
        };
        BaseSprite.prototype.destroyComponent = function () {
            this.m_componentDic.forEach(function (key, data) {
                if (egret.is(data, "IComponent")) {
                    data.dispose();
                }
            }, this);
        };
        /**
         * 获取唯一hashCode
         */
        BaseSprite.prototype.getHashCode = function () {
            return this.hashCode;
        };
        Object.defineProperty(BaseSprite.prototype, "isDisposed", {
            get: function () {
                return this["_disposed"];
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 释放所有资源
         */
        BaseSprite.prototype.dispose = function () {
            if (this["_disposed"]) {
                return;
            }
            _super.prototype.dispose.call(this);
            this.clear();
            if (this.m_eventPool) {
                this.m_eventPool.dispose();
            }
            this.m_componentDic = null;
            this.m_eventPool = null;
        };
        return BaseSprite;
    }(fairygui.GComponent));
    fairui.BaseSprite = BaseSprite;
    __reflect(BaseSprite.prototype, "fairui.BaseSprite", ["IComponent", "IDispose"]);
})(fairui || (fairui = {}));
//# sourceMappingURL=BaseSprite.js.map