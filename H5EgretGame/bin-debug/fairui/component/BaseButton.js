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
    var ResPathUtil = com.utils.ResPathUtil;
    /**
     * 基类按钮
     * @author cl 2018.3.22
     */
    var BaseButton = (function (_super) {
        __extends(BaseButton, _super);
        function BaseButton() {
            var _this = _super.call(this) || this;
            /**是否已经释放 */
            _this.isDispose = false;
            _this._enabled = true;
            /**是否初始化 */
            _this.isInit = false;
            _this._listenerList = []; //监听事件列表
            return _this;
        }
        BaseButton.prototype.constructFromXML = function (xml) {
            _super.prototype.constructFromXML.call(this, xml);
            fairui.FairyUtils.setVar(this, this);
            this.init();
            this._noticeType = [];
            this._noticeState = new flash.Dictionary();
        };
        BaseButton.prototype.init = function () {
            this.isInit = true;
        };
        /**增加Type */
        BaseButton.prototype.addNoticeType = function (value) {
            if (this._noticeType.indexOf(value) == -1) {
                this._noticeType.push(value);
            }
            this._noticeState.setItem(value, false);
        };
        /**移除Type */
        BaseButton.prototype.removeNoticeType = function (value) {
            var i = this._noticeType.indexOf(value);
            if (i != -1) {
                this._noticeType.splice(i, 1);
            }
        };
        Object.defineProperty(BaseButton.prototype, "noticeType", {
            /**用于监听红点显示类型 [EnumButtonDotType] */
            get: function () {
                return this._noticeType || [];
            },
            /**赋值type */
            set: function (value) {
                this._noticeType = value;
                if (value == null || value.length <= 0) {
                    this._noticeState = new flash.Dictionary();
                }
                else {
                    for (var i = 0; i < value.length; i++) {
                        this._noticeState.setItem(value[i], false);
                    }
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BaseButton.prototype, "tag", {
            /**其他数据 */
            get: function () {
                return this._tag;
            },
            set: function (value) {
                this._tag = value;
            },
            enumerable: true,
            configurable: true
        });
        BaseButton.prototype.show = function (value) {
        };
        BaseButton.prototype.hide = function () {
        };
        Object.defineProperty(BaseButton.prototype, "flowEffect", {
            /**
             * 流光特效
             * @return
             *
             */
            get: function () {
                return this._flowEffect;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BaseButton.prototype, "touchable", {
            /**触摸 */
            get: function () {
                return egret.superGetter(BaseButton, this, "touchable");
            },
            set: function (value) {
                egret.superSetter(BaseButton, this, "touchable", value);
            },
            enumerable: true,
            configurable: true
        });
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
                this.grayed = !value;
                // ObjectUtils.gray(this, !value);
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
         * 至于顶层 cl 2017.1.6
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
        /**
         * 至于底部 cl 2017.7.17
         */
        BaseButton.prototype.toBottom = function () {
            if (this.parent != null) {
                this.parent.setChildIndex(this, 0);
            }
        };
        /**
         * 遍历所有子元件
         */
        BaseButton.prototype.ergodicChildren = function (parent, func, funcParams, thisObject) {
            if (parent === void 0) { parent = null; }
            if (func === void 0) { func = null; }
            if (funcParams === void 0) { funcParams = null; }
            if (thisObject === void 0) { thisObject = null; }
            thisObject = thisObject || this;
            parent = parent || this;
            if (parent.numChildren > 0) {
                var child = null;
                for (var i = 0; i < parent.numChildren; i++) {
                    child = parent.getChildAt(i);
                    if (child != null) {
                        if (func != null) {
                            var args = funcParams || [];
                            args.unshift(child);
                            func.apply(thisObject, args);
                        }
                        if (child instanceof fairygui.GComponent) {
                            this.ergodicChildren(child, func, funcParams, thisObject);
                        }
                    }
                }
            }
        };
        /******************************************移除所有监听*********************************************
         * 重载的 addEventListener方法，在添加事件侦听时将其存在一个数组中，以便记录所有已添加的事件侦听
         */
        BaseButton.prototype.addEventListener = function (type, listener, thisObject) {
            var obj = new Object();
            obj["type"] = type;
            obj["listener"] = listener;
            obj["thisObject"] = thisObject;
            this._listenerList = this._listenerList || [];
            this._listenerList.push(obj);
            _super.prototype.addEventListener.call(this, type, listener, thisObject);
        };
        BaseButton.prototype.removeEventListener = function (type, listener, thisObject) {
            var _this = this;
            var obj;
            if (this._listenerList != null) {
                this._listenerList.forEach(function (obj) {
                    if (obj.type == type && obj.listener == listener) {
                        _this._listenerList.splice(_this._listenerList.indexOf(obj), 1);
                        return;
                    }
                });
            }
            _super.prototype.removeEventListener.call(this, type, listener, thisObject);
        };
        /**
         * 自我毁灭，删除所有事件侦听器以及从父显示对象中移除，等待垃圾回收
         */
        BaseButton.prototype.removeAllListeners = function () {
            var obj;
            while (this._listenerList && this._listenerList.length > 0) {
                obj = this._listenerList.shift();
                if (obj) {
                    this.removeEventListener(obj["type"], obj["listener"], obj["thisObject"]);
                }
            }
        };
        Object.defineProperty(BaseButton.prototype, "listenerList", {
            /**
             * 监听事件列表
             *
             **/
            get: function () {
                return this._listenerList;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 是否有对应事件的监听事件
         * @param	type      事件类型
         * @param	listener  事件方法
         * @return
         */
        BaseButton.prototype.hasListenerOf = function (type, listener) {
            if (listener === void 0) { listener = null; }
            var obj;
            for (var _i = 0, _a = this._listenerList; _i < _a.length; _i++) {
                obj = _a[_i];
                if (obj && obj["type"] == type && (obj["listener"] == listener || listener == null)) {
                    return true;
                }
            }
            return false;
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
         * 获取面板图片等资源 cl 2018.3.15
         * @param subPackage 	子目录
         * @param name 			资源名字
         * @param suffix		后缀名
         */
        BaseButton.prototype.getPanelResUrl = function (subPackage, name, suffix) {
            if (subPackage === void 0) { subPackage = ""; }
            if (suffix === void 0) { suffix = ".png"; }
            return ResPathUtil.getPanelRes(name, subPackage, suffix);
        };
        /**
         * 设置FairyGui资源
         * @param pkgName 包名
         * @param resName 资源名
         */
        BaseButton.prototype.setFairySource = function (pkgName, resName, disObj) {
            if (disObj === void 0) { disObj = null; }
            var url = fairygui.UIPackage.getItemURL(pkgName, resName);
            if (url) {
                if (url.indexOf("ui://") == 0) {
                    fairui.FairyTextureUtils.disposeTexture(url, this); //如果这里释放了，不可能重新加载，所以不能释放，除非整包资源都被卸载了!
                    disObj.texture = null;
                }
                else if (url) {
                    fairui.LoaderManager.disposeTarget(url, this);
                }
            }
            this.setFairyUrl(url, disObj);
        };
        /**
         * 设置FairyGui资源地址
         * @param url FairyGui资源地址
         */
        BaseButton.prototype.setFairyUrl = function (url, disObj) {
            if (disObj === void 0) { disObj = null; }
            if (disObj != null && url) {
                disObj.texture = fairui.FairyTextureUtils.getTexture(url, this);
            }
            else {
                disObj.texture = null;
            }
        };
        /**
         * 加载外部图片资源
         * @param url 资源地址
         * @param disObj 显示图片对象
         * @param callback 回调方法
         * @param callbackParams 回调方法参数
         */
        BaseButton.prototype.loadResByUrl = function (url, disObj, callback, callbackParams) {
            if (disObj === void 0) { disObj = null; }
            if (callback === void 0) { callback = null; }
            if (callbackParams === void 0) { callbackParams = null; }
            if (fairui.LoaderManager.getRes(url, disObj)) {
                disObj.texture = fairui.LoaderManager.getRes(url, disObj);
                return;
            }
            var thisObj = this;
            fairui.LoaderManager.loadImageRes(url, this, function loadComplete(texture) {
                if (disObj != null) {
                    var texture_1 = fairui.LoaderManager.getRes(url, disObj); // texture;
                    disObj.texture = texture_1;
                    // disObj.width = texture.textureWidth;
                    // disObj.height = texture.textureHeight;
                }
                if (callback != null) {
                    callbackParams = callbackParams || [];
                    callbackParams.unshift(texture);
                    callback.apply(thisObj, callbackParams);
                }
            }, null);
        };
        /**
         * 是否包含全局坐标点
         * @param gx 全局X坐标
         * @param gy 全局Y坐标
         */
        BaseButton.prototype.containsGlobalPoint = function (gx, gy) {
            var lp = this.globalToLocal(gx, gy);
            var bounds = new egret.Rectangle(0, 0, this.width, this.height);
            return bounds.contains(lp.x, lp.y);
        };
        /**
         * 清理数据
         */
        BaseButton.prototype.clear = function () {
            this.removeAllListeners();
        };
        BaseButton.prototype.dispose = function () {
            // EventManager.removeEventListener( EventType.ShowOrHideButtonDot, this.showOrHideDot, this);
            this.clear();
            var child;
            while (this.numChildren > 0) {
                child = this.removeChildAt(0);
                //是否对应资源
                if (egret.is(child, "fairygui.GLoader")) {
                    fairui.LoaderManager.disposeTarget(child.url, child);
                }
                child.dispose();
                child = null;
            }
            this.removeFromParent();
            _super.prototype.dispose.call(this);
            this._listenerList = null;
            this._flowEffect = null;
            this._tag = null;
            this.isDispose = true;
            this._noticeState = null;
            this._noticeType = null;
        };
        return BaseButton;
    }(fairygui.GButton));
    fairui.BaseButton = BaseButton;
    __reflect(BaseButton.prototype, "fairui.BaseButton");
})(fairui || (fairui = {}));
//# sourceMappingURL=BaseButton.js.map