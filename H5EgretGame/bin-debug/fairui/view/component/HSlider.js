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
     * 横向滑动条
     * @author clong 2019.2.12
     */
    var HSlider = (function (_super) {
        __extends(HSlider, _super);
        function HSlider() {
            var _this = _super.call(this) || this;
            //组件缓存池
            _this.m_componentDic = null;
            //事件缓存池
            _this.m_eventPool = null;
            _this._min = 0;
            _this.m_eventPool = new EventPool();
            _this.m_componentDic = new flash.Dictionary();
            return _this;
        }
        HSlider.prototype.constructExtension = function (buffer) {
            _super.prototype.constructExtension.call(this, buffer);
            this.init(null);
        };
        HSlider.prototype.constructFromXML = function (xml) {
            _super.prototype.constructFromXML.call(this, xml);
        };
        HSlider.prototype.IsInited = function () {
            return true;
        };
        /**
         * 滑动改变
         */
        HSlider.prototype.onSliderChangedHandler = function (e) {
        };
        Object.defineProperty(HSlider.prototype, "min", {
            /**最小值 */
            get: function () {
                return this._min;
            },
            set: function (value) {
                this._min = value;
            },
            enumerable: true,
            configurable: true
        });
        //-------------------------------------------------------
        /**
         * 增加监听事件函数
         */
        HSlider.prototype.addAllListener = function () {
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
        HSlider.prototype.removeAllListener = function () {
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
        HSlider.prototype.addGameListener = function (type, listener, thisObject, target) {
            if (this.m_eventPool != null) {
                this.m_eventPool.addListener(type, listener, target, thisObject);
            }
        };
        /**
         * 移除事件监听
         */
        HSlider.prototype.removeGameListener = function (type, listener, thisObject, target) {
            if (this.m_eventPool != null) {
                this.m_eventPool.removeListener(type, listener, target, thisObject);
            }
        };
        //初始化
        HSlider.prototype.init = function (param) {
            this.initUI();
            this.addAllListener();
        };
        //初始化UI
        HSlider.prototype.initUI = function () {
            // this.titleTxt = this.getChild("title").asTextField;
        };
        /**
         * 添加组件
         */
        HSlider.prototype.addComponent = function (component) {
            if (component) {
                var hashCode = component.getHashCode();
                this.m_componentDic.setItem(hashCode, component);
            }
            return component;
        };
        /**
         * 移除组件
         */
        HSlider.prototype.removeComponent = function (component) {
            if (component != null) {
                var hashCode = component.getHashCode();
                this.m_componentDic.delItem(hashCode);
            }
        };
        /**
         * 移除所有组件
         */
        HSlider.prototype.removeAllComponent = function () {
            this.m_componentDic.reset();
        };
        /**
         * 获取唯一hashCode
         */
        HSlider.prototype.getHashCode = function () {
            return this.hashCode;
        };
        /**
         * 重置界面
         */
        HSlider.prototype.clear = function () {
            if (this.m_eventPool != null) {
                this.m_eventPool.removeAllListener();
            }
            this.m_componentDic.forEach(function (key, data) {
                if (egret.is(data, "IComponent")) {
                    data.clear();
                }
            }, this);
        };
        HSlider.prototype.destroyComponent = function () {
            this.m_componentDic.forEach(function (key, data) {
                if (egret.is(data, "IComponent")) {
                    data.dispose();
                }
            }, this);
        };
        /**
         * 销毁，完全销毁对象和资源
         */
        HSlider.prototype.dispose = function () {
            this.destroyComponent();
            if (this.m_eventPool) {
                this.m_eventPool.dispose();
            }
            this.m_componentDic = null;
            this.m_eventPool = null;
            this.dispose();
        };
        HSlider.prototype.GetHashCode = function () {
            return this.hashCode;
        };
        return HSlider;
    }(fairygui.GSlider));
    fairui.HSlider = HSlider;
    __reflect(HSlider.prototype, "fairui.HSlider", ["IComponent", "IDispose"]);
})(fairui || (fairui = {}));
//# sourceMappingURL=HSlider.js.map