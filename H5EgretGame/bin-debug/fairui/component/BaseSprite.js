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
     * 容器基类
     * @author cl 2018.3.17
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
             * 用传入的fairyui.GComponent转化为BaseSprite TODO cl 2018.4.9
             */
            _this.ower = null;
            _this._listenerList = []; //监听事件列表
            _this.ower = comp;
            return _this;
        }
        BaseSprite.prototype.constructFromXML = function (xml) {
            _super.prototype.constructFromXML.call(this, xml);
            fairui.FairyUtils.setVar(this, this);
        };
        /**
        * 设置FairyGui资源
        * @param pkgName 包名
        * @param resName 资源名
        */
        BaseSprite.prototype.setFairySource = function (pkgName, resName, disObj) {
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
         * 加载外部图片资源
         * @param url 资源地址
         * @param disObj 显示图片对象
         * @param callback 回调方法
         * @param callbackParams 回调方法参数
         */
        BaseSprite.prototype.loadResByUrl = function (url, disObj, callback, callbackParams) {
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
         * 获取面板图片等资源 cl 2018.3.15
         * @param subPackage 	子目录
         * @param name 			资源名字
         * @param suffix		后缀名
         */
        BaseSprite.prototype.getPanelResUrl = function (subPackage, name, suffix) {
            if (subPackage === void 0) { subPackage = ""; }
            if (suffix === void 0) { suffix = ".png"; }
            return ResPathUtil.getPanelRes(name, subPackage, suffix);
        };
        /**
         * 获取面板特效资源地址
         * @param packName      包名
         * @param effectName    特效名字a (a.xll)
         */
        BaseSprite.prototype.getMenuEffectUrl = function (packName, effectName) {
            return AssetPathManager.getInstance().getMenuEffect(packName, effectName);
        };
        /**
         * 设置FairyGui资源地址
         * @param url FairyGui资源地址
         */
        BaseSprite.prototype.setFairyUrl = function (url, disObj) {
            if (disObj === void 0) { disObj = null; }
            if (disObj != null && url) {
                disObj.texture = fairui.FairyTextureUtils.getTexture(url, this);
                disObj.width = disObj.texture.textureWidth;
                disObj.height = disObj.texture.textureHeight;
            }
            else {
                disObj.texture = null;
            }
        };
        /**
         * 至于顶层 cl 2017.1.6
         */
        BaseSprite.prototype.toTop = function () {
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
         * 遍历所有子元件
         */
        BaseSprite.prototype.ergodicChildren = function (parent, func, funcParams, thisObject) {
            if (parent === void 0) { parent = null; }
            if (func === void 0) { func = null; }
            if (funcParams === void 0) { funcParams = null; }
            if (thisObject === void 0) { thisObject = null; }
            thisObject = thisObject || this.ower || this;
            parent = parent || this.ower || this;
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
        /**
         * 改变元件深度索引
         * @param index 索引
         */
        BaseSprite.prototype.indexTo = function (index) {
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
        BaseSprite.prototype.toBottom = function () {
            if (this.parent != null) {
                this.parent.setChildIndex(this, 0);
            }
        };
        /**
         * json转成Array
         * @param json
         * @return
         *
         */
        BaseSprite.prototype.json2Array = function (json) {
            return StringFormat.getArrayByJson(json);
        };
        /******************************************移除所有监听*********************************************
         * 重载的 addEventListener方法，在添加事件侦听时将其存在一个数组中，以便记录所有已添加的事件侦听
         */
        BaseSprite.prototype.addEventListener = function (type, listener, thisObject) {
            var obj = new Object();
            obj["type"] = type;
            obj["listener"] = listener;
            obj["thisObject"] = thisObject;
            this._listenerList.push(obj);
            _super.prototype.addEventListener.call(this, type, listener, thisObject);
        };
        BaseSprite.prototype.removeEventListener = function (type, listener, thisObject) {
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
        BaseSprite.prototype.removeAllListeners = function () {
            var obj;
            while (this._listenerList && this._listenerList.length > 0) {
                obj = this._listenerList.shift();
                if (obj) {
                    this.removeEventListener(obj["type"], obj["listener"], obj["thisObject"]);
                }
            }
        };
        Object.defineProperty(BaseSprite.prototype, "listenerList", {
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
        BaseSprite.prototype.hasListenerOf = function (type, listener) {
            if (listener === void 0) { listener = null; }
            var obj;
            for (var _i = 0, _a = this._listenerList; _i < _a.length; _i++) {
                obj = _a[_i];
                if (obj["type"] == type && (obj["listener"] == listener || listener == null)) {
                    return true;
                }
            }
            return false;
        };
        /**
        * 事件构造函数
        * @param eventKey 事件Key
        * @param fun 			事件响应处理函数
        * @param source 	事件绑定的控件  非对象绑定传null
        */
        BaseSprite.prototype.addPanelEventListener = function (eventKey, fun, source, thisObj) {
            if (source === void 0) { source = null; }
            if (thisObj === void 0) { thisObj = null; }
            this._eventVec = this._eventVec || [];
            var eObj = new EventObj(eventKey, fun, source, thisObj, null);
            this._eventVec.push(eObj);
        };
        /**
         * 注册面板事件
         */
        BaseSprite.prototype.registerPanelEventListeners = function () {
            if (this._eventVec != null) {
                var eObj = null;
                var i = 0;
                for (i = 0; i < this._eventVec.length; i++) {
                    eObj = this._eventVec[i];
                    if (eObj.source != null) {
                        eObj.source.addEventListener(eObj.eventKey, eObj.fun, eObj.thisObj || this);
                    }
                    else {
                        EventManager.addEventListener(eObj.eventKey, eObj.fun, eObj.thisObj || this);
                    }
                }
            }
        };
        /**
        * 移除所有面板事件
        */
        BaseSprite.prototype.removePanelEventListeners = function () {
            if (this._eventVec != null) {
                var eObj = null;
                var i = 0;
                for (i = 0; i < this._eventVec.length; i++) {
                    eObj = this._eventVec[i];
                    if (eObj.source != null) {
                        eObj.source.removeEventListener(eObj.eventKey, eObj.fun, eObj.thisObj || this);
                    }
                    else {
                        EventManager.removeEventListener(eObj.eventKey, eObj.fun, eObj.thisObj || this);
                    }
                }
            }
        };
        /**
         * 获取条目
         * @param name 组件名字
         */
        BaseSprite.prototype.getElement = function (name) {
            return this.getChild(name);
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
        BaseSprite.prototype.show = function (value) {
            if (value === void 0) { value = null; }
            this._data = value;
            this.visible = true;
            this.registerPanelEventListeners();
        };
        Object.defineProperty(BaseSprite.prototype, "data", {
            /**获取数据*/
            get: function () {
                return this._data;
            },
            set: function (value) {
                this._data = value;
            },
            enumerable: true,
            configurable: true
        });
        BaseSprite.prototype.hide = function () {
            this.visible = false;
            this.removePanelEventListeners();
        };
        Object.defineProperty(BaseSprite.prototype, "isGray", {
            /**
             * 是否置灰
             */
            get: function () {
                return this._isGray;
            },
            set: function (value) {
                this._isGray = value;
                // ObjectUtils.gray(this, !value);
                this.grayed = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BaseSprite.prototype, "opaque", {
            /**是否可穿透空白区域 */
            get: function () {
                return egret.superGetter(BaseSprite, this, "opaque");
            },
            set: function (value) {
                egret.superSetter(BaseSprite, this, "opaque", value);
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
        /**清理根据name值自动生成的变量 */
        BaseSprite.prototype.clearObjectName = function () {
            var disObj;
            for (var i = 0; i < this.numChildren; i++) {
                disObj = this.getChildAt(i);
                this[disObj.name] = null;
            }
        };
        /**
         * 移除Group中所有元素
         */
        BaseSprite.prototype.removeGroupElements = function (group) {
            var _self = this;
            if (group && group.parent != null) {
                var cnt = group.parent.numChildren;
                var i = 0;
                var child = void 0;
                for (i = cnt - 1; i >= 0; i--) {
                    child = group.parent.getChildAt(i);
                    if (child == null)
                        continue;
                    if (child.group != group)
                        continue;
                    if (child instanceof fairygui.GGroup) {
                        //不要移除有子GGroup的Group
                        //_self.removeGroupElements( child );
                    }
                    else {
                        child.dispose();
                        child = null;
                    }
                }
            }
        };
        /**替换字符串中的参数 */
        // protected getSubstitute(str: string, ...rest): string {
        // 	if (<any>!str) {
        // 		return "";
        // 	}
        // 	let len: number = rest.length;
        // 	let args: Array<any>;
        // 	if (len == 1 && flash.As3is(rest[0], Array)) {
        // 		args = rest[0];
        // 		len = args.length;
        // 	}
        // 	else {
        // 		args = rest;
        // 	}
        // 	for (let i: number = 0; i < len; i++) {
        // 		str = str.replace(new RegExp("\\{" + i + "\\}", "g"), args[i]);
        // 	}
        // 	return str;
        // }
        /**
         * 清理数据
         */
        BaseSprite.prototype.clear = function () {
            this.removeAllListeners();
            this.removePanelEventListeners();
            var disObj;
            for (var i = 0; i < this.numChildren; i++) {
                disObj = this.getChildAt(i);
                if (disObj instanceof BaseSprite) {
                    disObj.clear();
                }
                else if (disObj instanceof fairui.BaseButton) {
                    disObj.clear();
                }
            }
        };
        BaseSprite.prototype.dispose = function () {
            this.clear();
            this.clearObjectName();
            _super.prototype.dispose.call(this);
            this._data = null;
            this._eventVec = null;
            this.ower = null;
            this._listenerList = null;
        };
        return BaseSprite;
    }(fairygui.GComponent));
    fairui.BaseSprite = BaseSprite;
    __reflect(BaseSprite.prototype, "fairui.BaseSprite");
})(fairui || (fairui = {}));
//# sourceMappingURL=BaseSprite.js.map