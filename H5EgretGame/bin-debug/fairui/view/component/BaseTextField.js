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
     * 文本基类
     * @author cl 2019.1.30
     */
    var BaseTextField = (function (_super) {
        __extends(BaseTextField, _super);
        function BaseTextField() {
            var _this = _super.call(this) || this;
            //组件缓存池
            _this.m_componentDic = null;
            //事件缓存池
            _this.m_eventPool = null;
            _this.m_eventPool = new EventPool();
            _this.m_componentDic = new flash.Dictionary();
            return _this;
        }
        BaseTextField.prototype.setup_afterAdd = function (buffer, beginPos) {
            _super.prototype.setup_afterAdd.call(this, buffer, beginPos);
        };
        BaseTextField.prototype.IsInited = function () {
            return true;
        };
        Object.defineProperty(BaseTextField.prototype, "textHeight", {
            get: function () {
                return this._textHeight;
            },
            enumerable: true,
            configurable: true
        });
        BaseTextField.prototype.setText = function (value) {
            value = Global.lang.getLang(value);
            this.text = value;
        };
        //---------------------------------------------------
        /**
         * 增加监听事件函数
         */
        BaseTextField.prototype.addAllListener = function () {
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
        BaseTextField.prototype.removeAllListener = function () {
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
        BaseTextField.prototype.addGameListener = function (type, listener, thisObject, target) {
            if (this.m_eventPool != null) {
                this.m_eventPool.addListener(type, listener, target, thisObject);
            }
        };
        /**
         * 移除事件监听
         */
        BaseTextField.prototype.removeGameListener = function (type, listener, thisObject, target) {
            if (this.m_eventPool != null) {
                this.m_eventPool.removeListener(type, listener, target, thisObject);
            }
        };
        /**
         * 添加组件
         */
        BaseTextField.prototype.addComponent = function (component) {
            if (component) {
                var hashCode = component.getHashCode();
                this.m_componentDic.setItem(hashCode, component);
            }
            return component;
        };
        /**
         * 移除组件
         */
        BaseTextField.prototype.removeComponent = function (component) {
            if (component != null) {
                var hashCode = component.getHashCode();
                this.m_componentDic.delItem(hashCode);
            }
        };
        /**
         * 移除所有组件
         */
        BaseTextField.prototype.removeAllComponent = function () {
            this.m_componentDic.reset();
        };
        /**
         * 重置界面
         */
        BaseTextField.prototype.clear = function () {
            if (this.m_eventPool != null) {
                this.m_eventPool.removeAllListener();
            }
            this.m_componentDic.forEach(function (key, data) {
                if (egret.is(data, "IComponent")) {
                    data.clear();
                }
            }, this);
        };
        BaseTextField.prototype.destroyComponent = function () {
            this.m_componentDic.forEach(function (key, data) {
                if (egret.is(data, "IComponent")) {
                    data.dispose();
                }
            }, this);
        };
        /**
         * 获取唯一hashCode
         */
        BaseTextField.prototype.getHashCode = function () {
            return this.hashCode;
        };
        Object.defineProperty(BaseTextField.prototype, "isDisposed", {
            get: function () {
                return this["_disposed"];
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 释放所有资源
         */
        BaseTextField.prototype.dispose = function () {
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
        return BaseTextField;
    }(fairygui.GTextField));
    fairui.BaseTextField = BaseTextField;
    __reflect(BaseTextField.prototype, "fairui.BaseTextField", ["IComponent", "IDispose"]);
})(fairui || (fairui = {}));
//# sourceMappingURL=BaseTextField.js.map