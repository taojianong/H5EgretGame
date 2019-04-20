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
     * 基类按钮
     * @author cl 2019.1.29
     */
    var BaseButton = (function (_super) {
        __extends(BaseButton, _super);
        function BaseButton() {
            var _this = _super.call(this) || this;
            /**是否已经释放 */
            _this.isDispose = false;
            /**额外数据 */
            _this.__data = null;
            _this._enabled = true;
            /**是否初始化 */
            _this.isInit = false;
            _this._currentState = "";
            //组件缓存池
            _this.m_componentDic = null;
            //事件缓存池
            _this.m_eventPool = null;
            _this.m_eventPool = EventPool.create();
            _this.m_componentDic = new flash.Dictionary();
            return _this;
        }
        /**初始创建时的方法，用于继承IPool的类 */
        BaseButton.prototype.create = function () {
        };
        BaseButton.prototype.constructFromXML = function (xml) {
            _super.prototype.constructFromXML.call(this, xml);
            fairui.FairyUtils.setVar(this, this);
            this._btnController = this["_buttonController"];
            this.init(null);
        };
        BaseButton.prototype.IsInited = function () {
            return this.isInit;
        };
        Object.defineProperty(BaseButton.prototype, "currentState", {
            /**当前状态 */
            get: function () {
                return this._currentState;
            },
            set: function (value) {
                this._currentState = value;
                if (this._btnController) {
                    this._btnController.selectedPage = value;
                }
            },
            enumerable: true,
            configurable: true
        });
        BaseButton.prototype.show = function (value) {
            this.__data = value;
            this.addAllListener();
        };
        BaseButton.prototype.hide = function () {
            this.__data = null;
            this.removeAllListener();
        };
        Object.defineProperty(BaseButton.prototype, "enabled", {
            /**
             * 是否可点击,不可点击置灰
             */
            get: function () {
                return this._enabled;
            },
            set: function (value) {
                this._enabled = value;
                this.touchable = value;
                if (this._iconObject) {
                    this._iconObject.grayed = !value;
                }
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 添加白鹭原生元件
         * @param child 白鹭原生显示对象
         */
        BaseButton.prototype.addEgretChild = function (child) {
            this._rootContainer.addChild(child);
        };
        /**
         * 至于顶层
         */
        BaseButton.prototype.toTop = function () {
            if (this.parent != null) {
                if (this.parent.numChildren > 0) {
                    this.parent.setChildIndex(this, this.parent.numChildren - 1);
                }
                else {
                    this.parent.setChildIndex(this, 0);
                }
            }
        };
        /**
         * 改变元件深度索引
         * @param index 索引
         */
        BaseButton.prototype.indexTo = function (index) {
            if (this.parent != null) {
                if (index > (this.parent.numChildren - 1)) {
                    index = this.parent.numChildren - 1;
                }
                else if (index < 0) {
                    index = 0;
                }
                this.parent.setChildIndex(this, index);
            }
        };
        /**在父容器中的索引 */
        BaseButton.prototype.getIndex = function () {
            return this.parent ? this.parent.getChildIndex(this) : -1;
        };
        /**
         * 至于底部
         */
        BaseButton.prototype.toBottom = function () {
            if (this.parent != null) {
                this.parent.setChildIndex(this, 0);
            }
        };
        /**
         * 获取条目
         * @param name 组件名字
         */
        BaseButton.prototype.getElement = function (name, container) {
            if (container === void 0) { container = null; }
            container = container || this;
            return container.getChild(name);
        };
        /**
         * 是否包含某个对象
         */
        BaseButton.prototype.contains = function (child) {
            return this.getChildIndex(child) != -1;
        };
        Object.defineProperty(BaseButton.prototype, "touchEnabled", {
            get: function () {
                return this._rootContainer.touchEnabled;
            },
            set: function (value) {
                this._rootContainer.touchEnabled = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BaseButton.prototype, "touchChildren", {
            get: function () {
                return this._rootContainer.touchChildren;
            },
            set: function (value) {
                this._rootContainer.touchChildren = value;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 设置FairyGui资源
         * @param pkgName 包名
         * @param resName 资源名
         */
        BaseButton.prototype.setFairySource = function (pkgName, resName, disObj) {
            if (disObj === void 0) { disObj = null; }
            disObj = disObj || this._iconObject;
            var url = fairygui.UIPackage.getItemURL(pkgName, resName);
            this.setFairyUrl(url, disObj);
        };
        /**
         * 设置FairyGui资源地址
         * @param url FairyGui资源地址
         */
        BaseButton.prototype.setFairyUrl = function (url, disObj) {
            if (disObj === void 0) { disObj = null; }
            if (disObj != null) {
                disObj.texture = url ? fairui.FairyTextureUtils.getTexture(url) : null;
            }
        };
        /**
         * 是否包含全局坐标点
         * @param gx 全局X坐标
         * @param gy 全局Y坐标
         */
        BaseButton.prototype.containsGlobalPoint = function (gx, gy) {
            var lp = this.globalToLocal(gx, gy);
            var bounds = new egret.Rectangle(0, 0, this.width, this.height);
            if (this.pivotAsAnchor) {
                bounds.x = -this.width * 0.5;
                bounds.y = -this.height * 0.5;
            }
            return bounds.contains(lp.x, lp.y);
        };
        Object.defineProperty(BaseButton.prototype, "pixelHitTest", {
            /**
             * 像素穿透
             */
            set: function (val) {
                if (this._iconObject) {
                    var loader = this._iconObject.asLoader;
                    if (loader.content instanceof egret.Bitmap) {
                        loader.content.pixelHitTest = val;
                    }
                }
            },
            enumerable: true,
            configurable: true
        });
        //--------------------------------------
        //初始化
        BaseButton.prototype.init = function (param) {
            this.initUI();
            this.addAllListener();
        };
        //初始化UI
        BaseButton.prototype.initUI = function () {
        };
        //增加监听事件函数
        BaseButton.prototype.addAllListener = function () {
            this.m_componentDic.forEach(function (key, data) {
                if (egret.is(data, "IComponent")) {
                    data.addAllListener();
                }
            }, this);
        };
        //移除监听事件函数
        BaseButton.prototype.removeAllListener = function () {
            this.m_componentDic.forEach(function (key, data) {
                if (egret.is(data, "IComponent")) {
                    data.removeAllListener();
                }
            }, this);
        };
        /**
         * 添加事件监听
         */
        BaseButton.prototype.addGameListener = function (type, listener, thisObject, target) {
            if (this.m_eventPool != null) {
                this.m_eventPool.addListener(type, listener, target, thisObject);
            }
        };
        /**
         * 移除事件监听
         */
        BaseButton.prototype.removeGameListener = function (type, listener, thisObject, target) {
            if (this.m_eventPool != null) {
                this.m_eventPool.removeListener(type, listener, target, thisObject);
            }
        };
        /**
         * 添加组件
         */
        BaseButton.prototype.addComponent = function (component) {
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
        BaseButton.prototype.removeComponent = function (component) {
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
        BaseButton.prototype.removeAllComponent = function () {
            this.m_componentDic.reset();
        };
        /**
         * 重置界面
         */
        BaseButton.prototype.clear = function () {
            if (this.m_eventPool != null) {
                this.m_eventPool.removeAllListener();
            }
            this.m_componentDic.forEach(function (key, data) {
                if (egret.is(data, "IComponent")) {
                    data.clear();
                }
            }, this);
        };
        BaseButton.prototype.destroyComponent = function () {
            this.m_componentDic.forEach(function (key, data) {
                if (egret.is(data, "IComponent")) {
                    data.dispose();
                }
            }, this);
        };
        /**
         * 获取唯一hashCode
         */
        BaseButton.prototype.getHashCode = function () {
            return this.hashCode;
        };
        Object.defineProperty(BaseButton.prototype, "isDisposed", {
            get: function () {
                return this["_disposed"];
            },
            enumerable: true,
            configurable: true
        });
        /**回收到池中 */
        BaseButton.prototype.recover = function () {
        };
        /**
         * 释放所有资源
         */
        BaseButton.prototype.dispose = function () {
            if (this["_disposed"])
                return;
            _super.prototype.dispose.call(this);
            this.clear();
            this.__data = null;
            if (this.m_eventPool) {
                this.m_eventPool.dispose();
            }
            this.m_componentDic = null;
            this.m_eventPool = null;
        };
        return BaseButton;
    }(fairygui.GButton));
    fairui.BaseButton = BaseButton;
    __reflect(BaseButton.prototype, "fairui.BaseButton", ["IComponent", "IDispose", "IPool"]);
})(fairui || (fairui = {}));
//# sourceMappingURL=BaseButton.js.map