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
     * 界面基类
     * @author clong 2019.2.20
     */
    var UIBaseWindow = (function (_super) {
        __extends(UIBaseWindow, _super);
        /**
         * 面板基类
         * @param pkgName 包名
         * @param resName 对应面板名字
         */
        function UIBaseWindow(pkgName, resName) {
            if (pkgName === void 0) { pkgName = ""; }
            if (resName === void 0) { resName = ""; }
            var _this = _super.call(this) || this;
            _this.view = null;
            /**是否加载资源完成 */
            _this.isLoaded = false;
            /**背景遮罩点击是否关闭 */
            _this.maskClick = true;
            /**包名 */
            _this._pkgName = "";
            /**类名 */
            _this._resName = "";
            /**是否释放资源 */
            _this.isDisposeRes = false;
            /**界面显示是否完成，打开界面会有特效，特效没放完则显示还没结束 */
            _this.isShowComplete = false;
            _this._pkgName = pkgName;
            _this._resName = resName;
            _this.setViewStruct();
            return _this;
        }
        /**设置视图结构 */
        UIBaseWindow.prototype.setViewStruct = function () {
            if (this.viewStruct == null) {
                this.viewStruct = new ViewStruct();
                var key = egret.getQualifiedClassName(this);
                // this.viewStruct.window = Windows.getItemByKey(key);
                // if (this.viewStruct.window) {
                // 	this.viewStruct.layerType = this.viewStruct.window.layer;
                // }
                if (this._pkgName == "common" || this._pkgName == "main" || this._pkgName == "scene" || this.viewStruct.isAlert) {
                    this.isDisposeRes = false;
                }
                else {
                    this.isDisposeRes = this.viewStruct.isFirst;
                }
            }
        };
        UIBaseWindow.prototype.init = function (param, cfgParam) {
            // super.init( param );
            if (cfgParam === void 0) { cfgParam = null; }
            this.maskClick = true;
            this.param = param;
            this._cfgParam = cfgParam;
            //加载资源
            this.loadAtlas(cfgParam);
        };
        UIBaseWindow.prototype.initUI = function () {
            _super.prototype.initUI.call(this);
        };
        Object.defineProperty(UIBaseWindow.prototype, "layerType", {
            /**层级类型 0窗口层,1主界面层,2弹窗提示层,3顶层 */
            get: function () {
                return this.viewStruct ? this.viewStruct.layerType : 0;
            },
            enumerable: true,
            configurable: true
        });
        UIBaseWindow.prototype.loadAtlas = function (cfgParam) {
            this._cfgParam = cfgParam;
            if (this._pkgName) {
                fairui.LoaderManager.loadGroups(this._pkgName, this.loadAtlasComplete, this);
            }
            else {
                this.isLoaded = true;
                this.initComplete();
            }
        };
        /**加载组资源完成 */
        UIBaseWindow.prototype.loadAtlasComplete = function () {
            var _self = this;
            _self.isLoaded = true;
            _self.registerClasses();
            //注册类需要一定延时才生效！
            Global.timer.doFrameOnce(1, flash.bind(_self.initComplete, _self));
        };
        /**
         * 当加载完对应包时注册面板需要用到的对应编辑器中的类
         */
        UIBaseWindow.prototype.registerClasses = function () {
            // fairui.PanelRegister.registerClass( "pkgName" , "resName" , cls );
        };
        UIBaseWindow.prototype.initComplete = function () {
            if (!this.isInited()) {
                return false;
            }
            if (this.view == null) {
                if (this._pkgName && !fairygui.UIPackage.getById(this._pkgName)) {
                    fairygui.UIPackage.addPackage(this._pkgName);
                }
                if (this._pkgName && this._resName) {
                    var obj = fairygui.UIPackage.createObject(this._pkgName, this._resName);
                    this.view = obj.asCom;
                    this._buttonController = this.view.getController("button");
                    this.addChild(this.view);
                    fairui.FairyUtils.setVar(this.view, this);
                }
            }
            //检测初始化是否完成
            if (!_super.prototype.initComplete.call(this)) {
                return false;
            }
            this.onResize();
            if (this.viewStruct.isShowEffect) {
                this.playOpenEffect();
            }
            else {
                this.playEffectComplete();
            }
            return true;
        };
        UIBaseWindow.prototype.isInited = function () {
            return _super.prototype.isInited.call(this) && this.isLoaded;
        };
        /**
         * 添加事件函数
         */
        UIBaseWindow.prototype.addAllListener = function () {
            _super.prototype.addAllListener.call(this);
            if (this.btn_close) {
                this.addGameListener(egret.TouchEvent.TOUCH_TAP, this.closeHandler, this, this.btn_close);
            }
        };
        /**
         * 移除事件函数,在clear的时候调用就可以了，通过 addGameListener 监听的事件会自动移除监听!不用再手动去写
         */
        UIBaseWindow.prototype.removeAllListener = function () {
            _super.prototype.removeAllListener.call(this); //已在底层移除对应事件
        };
        /**播放打开界面特效 */
        UIBaseWindow.prototype.playOpenEffect = function () {
            this.touchChildren = false;
            EffectUtil.openWindowEffect(this, this.playEffectComplete, this, null, true);
        };
        /**
         * 播放界面动画完成
         */
        UIBaseWindow.prototype.playEffectComplete = function () {
            this.isShowComplete = true;
            this.touchChildren = true;
        };
        /**关闭面板 */
        UIBaseWindow.prototype.close = function () {
            this.closeHandler(null);
        };
        /**关闭事件 */
        UIBaseWindow.prototype.closeHandler = function (e) {
            UISystem.Inst.removeWindowClass(this.getCls());
        };
        /**
         * 播放关闭特效,方便扩展
         */
        UIBaseWindow.prototype.playCloseEffect = function (complete, params, thisObj) {
            if (params === void 0) { params = null; }
            if (thisObj === void 0) { thisObj = null; }
            this.touchChildren = false;
            EffectUtil.closeWindowEffect(this, complete, thisObj || this, params, true);
        };
        Object.defineProperty(UIBaseWindow.prototype, "isPlayWindowEffect", {
            /**是否正在播放界面特效 */
            get: function () {
                return this["isWindowEffect"];
            },
            enumerable: true,
            configurable: true
        });
        //ui9宫格布局 自适应
        UIBaseWindow.prototype.onResize = function () {
            UILayout.setWindowLayout(this);
        };
        /**设置视图结构 */
        // public SetViewStruct(): void {
        // 	if (this.viewStruct == null) {
        // 		this.viewStruct = new ViewStruct();
        // 		let key: string = egret.getQualifiedClassName(this);
        // 		this.viewStruct.window = Windows.getItemByKey(key);
        // 		if (this.viewStruct.window) {
        // 			this.viewStruct.layerType = this.viewStruct.window.layer;
        // 		}
        // 		if (this._pkgName == "common" || this._pkgName == "main" || this._pkgName == "scene" || this.viewStruct.isAlert) {
        // 			this.isDisposeRes = false;
        // 		} else {
        // 			this.isDisposeRes = this.viewStruct.isFirst;
        // 		}
        // 	}
        // }
        // /**获取界面数据结构 */
        UIBaseWindow.prototype.getViewStruct = function () {
            return this.viewStruct;
        };
        Object.defineProperty(UIBaseWindow.prototype, "panelId", {
            /**面板ID */
            get: function () {
                return this.viewStruct.panelId;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UIBaseWindow.prototype, "isQueue", {
            get: function () {
                return this.viewStruct && this.viewStruct.isQueue;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UIBaseWindow.prototype, "isShowMask", {
            get: function () {
                return this.viewStruct && this.viewStruct.isShowMask;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UIBaseWindow.prototype, "isNotDo", {
            get: function () {
                return this.viewStruct && this.viewStruct.isNotDo;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UIBaseWindow.prototype, "isFirst", {
            get: function () {
                return this.viewStruct && this.viewStruct.isFirst;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UIBaseWindow.prototype, "isTwo", {
            get: function () {
                return this.viewStruct && this.viewStruct.isTwo;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UIBaseWindow.prototype, "canDispose", {
            get: function () {
                return true;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UIBaseWindow.prototype, "mutexViews", {
            /**互斥界面列表 */
            get: function () {
                var arr = [];
                if (this.viewStruct.window == null || !this.viewStruct.window.mutex_views) {
                    return [];
                }
                arr = this.viewStruct.window.mutex_views.split(",");
                for (var i = 0; i < arr.length; i++) {
                    arr[i] = parseFloat(arr[i]);
                }
                return arr;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 置于顶层
         */
        UIBaseWindow.prototype.toTop = function () {
            if (this.parent != null) {
                this.parent.setChildIndex(this, this.parent.numChildren - 1);
            }
        };
        /**
         * 改变界面尺寸，以自适应
         */
        UIBaseWindow.prototype.setSize = function (vw, vh) {
            if (this.view) {
                this.view.setSize(vw, vh);
            }
            if (this.viewStruct) {
                this.viewStruct.window.width = vw;
                this.viewStruct.window.height = vh;
            }
        };
        Object.defineProperty(UIBaseWindow.prototype, "width", {
            get: function () {
                return this.view ? this.view.width : 0;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UIBaseWindow.prototype, "height", {
            get: function () {
                return this.view ? this.view.height : 0;
            },
            enumerable: true,
            configurable: true
        });
        UIBaseWindow.prototype.clear = function () {
            _super.prototype.clear.call(this);
            this.isShowComplete = false;
        };
        UIBaseWindow.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
            // if (this.resource != null && this.isDisposeRes) {
            // 	fairygui.UIPackage.removePackage(this.resource.name);
            // 	this.resource.Dispose();
            // 	AssetsCache.Destroy(this.resource);
            // }
            // this.resource = null;
            this.viewStruct = null;
            this.isLoaded = false;
            this._cfgParam = null;
            this.param = null;
            if (this.view) {
                this.view.dispose();
            }
            this.view = null;
        };
        return UIBaseWindow;
    }(fairui.View));
    fairui.UIBaseWindow = UIBaseWindow;
    __reflect(UIBaseWindow.prototype, "fairui.UIBaseWindow");
})(fairui || (fairui = {}));
//# sourceMappingURL=UIBaseWindow.js.map