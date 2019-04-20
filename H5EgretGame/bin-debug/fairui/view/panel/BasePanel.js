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
     * 面板基类
     * @author cl 2018.3.17
     */
    var BasePanel = (function (_super) {
        __extends(BasePanel, _super);
        /**
         * 面板基类
         * @param pkgName 包名
         * @param resName 对应面板名字
         */
        function BasePanel(pkgName, resName) {
            if (pkgName === void 0) { pkgName = ""; }
            if (resName === void 0) { resName = ""; }
            var _this = _super.call(this) || this;
            _this.view = null;
            /**是否需要调整closeBtn位置*/
            _this.needAdjustClose = false;
            /**包名 */
            _this._pkgName = "";
            /**类名 */
            _this._resName = "";
            _this._panelInfo = null;
            if (pkgName && !fairygui.UIPackage.getById(pkgName)) {
                fairygui.UIPackage.addPackage(pkgName);
            }
            _this._pkgName = pkgName;
            _this._resName = resName;
            _this.init();
            return _this;
        }
        BasePanel.prototype.constructFromXML = function (xml) {
            _super.prototype.constructFromXML.call(this, xml);
        };
        BasePanel.prototype.init = function () {
            this.openTapMask = true;
            if (this._pkgName && this._resName) {
                var obj = fairygui.UIPackage.createObject(this._pkgName, this._resName);
                this.view = obj.asCom;
                this.addChild(this.view);
            }
            fairui.FairyUtils.setVar(this.view, this);
            this.initUI();
            this.onResize();
        };
        BasePanel.prototype.initUI = function () {
            if (this.titleBar != null) {
                this.btn_close = this.titleBar.btn_close;
            }
        };
        BasePanel.prototype.addAllListener = function () {
            _super.prototype.addAllListener.call(this);
            if (this.btn_close != null) {
                this.addGameListener(egret.TouchEvent.TOUCH_TAP, this.closeHandler, this.btn_close);
            }
            this.addGameListener(GameEvent.STGAE_RESIZE, this.onResize, this);
        };
        /**
         * 关闭面板ID
         */
        // public getClosePanelId(bean: Q_automaticExpandBean): number {
        //     let jsonArr: Array<Object> = bean && bean.q_conditions ? com.utils.StringFormat.getArrayByJson(bean.q_conditions) : null;
        //     let obj: Object = null;
        //     let _id: number = 0;
        //     if (jsonArr && jsonArr.length > 0) {
        //         for (obj of jsonArr) {
        //             if (obj.hasOwnProperty("closepanel_id")) {
        //                 _id = obj["closepanel_id"];
        //                 break;
        //             }
        //         }
        //     }
        //     return _id;
        // }
        /**
         * 设置背景资源 resource\res\image\panel\路径下
         * @param pkgName 包名
         * @param resname 资源名
         * @param suffix  后缀名
         */
        BasePanel.prototype.setBgSource = function (pkgName, resname, suffix, loader) {
            if (suffix === void 0) { suffix = ".jpg"; }
            if (loader === void 0) { loader = null; }
            var _self = this;
            loader = loader || this.bg;
            var index = resname.lastIndexOf(".");
            suffix = index != -1 ? resname.substring(index) : suffix;
            resname = index != -1 ? resname.substring(0, index) : resname;
            if (loader instanceof fairui.ELoader) {
                // loader.url = this.getPanelResUrl(pkgName, resname, suffix);
                // if (!loader.hasEventListener(egret.Event.COMPLETE)) {
                //     loader.addEventListener(egret.Event.COMPLETE, loadBgComplete, this);
                // }
            }
            else if (loader instanceof fairygui.GLoader) {
                //this.loadResByUrl(this.getPanelResUrl(pkgName, resname, suffix), loader, loadBgComplete);
            }
            function loadBgComplete(e) {
                if (e === void 0) { e = null; }
                if (e instanceof egret.Event) {
                    loader.removeEventListener(egret.Event.COMPLETE, loadBgComplete, this);
                }
                loader.x = (_self.width - loader.width) * 0.5;
                loader.y = (_self.height - loader.height) * 0.5;
            }
        };
        /**
         * 设置标题皮肤
         * @author pkgName 包名
         * @author resName 资源名
         */
        BasePanel.prototype.setTitleSkin = function (pkgName, resName) {
            if (this.titleBar != null) {
                this.titleBar.setTitleSkin(pkgName, resName);
            }
        };
        /**
         * 获取界面子元件
         */
        BasePanel.prototype.getViewChild = function (name) {
            return this.view ? this.view.getChild(name) : null;
        };
        /**
        * 渲染列表条目方法
        * @param index  对应条目索引
        * @param obj    渲染对象
        */
        BasePanel.prototype.renderListItem = function (index, obj) {
        };
        Object.defineProperty(BasePanel.prototype, "showCloseBtn", {
            /**
             * 显示关闭按钮
             */
            set: function (value) {
                if (value) {
                    if (this.btn_close == null) {
                        this.btn_close = fairygui.UIPackage.createObject("common", "btn_close04").asButton;
                        this.adjustCloseBtnPos();
                        this.needAdjustClose = true;
                    }
                    if (this.btn_close.parent == null) {
                        this.addChild(this.btn_close);
                    }
                    this.addGameListener(egret.TouchEvent.TOUCH_END, this.closeHandler, this.btn_close);
                }
                else if (this.btn_close != null) {
                    if (this.btn_close.parent != null) {
                        this.btn_close.parent.removeChild(this.btn_close);
                    }
                }
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 调整关闭按钮位置
         */
        BasePanel.prototype.adjustCloseBtnPos = function () {
            if (this.btn_close != null) {
                this.btn_close.x = this.width - this.btn_close.width - 15;
                this.btn_close.y = 16;
            }
        };
        /**关闭事件 */
        BasePanel.prototype.closeHandler = function () {
            this.close();
        };
        /**
         * 关闭面板
         */
        BasePanel.prototype.close = function (isHideGuide) {
            if (isHideGuide === void 0) { isHideGuide = true; }
            fairui.FairyUIManager.closePanel(this, this.canDispose);
        };
        Object.defineProperty(BasePanel.prototype, "canDispose", {
            /**
             * 界面是否可释放
             */
            get: function () {
                return true;
            },
            enumerable: true,
            configurable: true
        });
        /**点击Mask层,关闭面板 */
        BasePanel.prototype.tapMask = function (e) {
            this.close();
        };
        /**
         * 显示
         */
        BasePanel.prototype.show = function (data) {
            this.visible = true;
            // super.show(data);//这句话一定要放在this.visible = true之后执行,不然面板事件注册不了  
            this.initData(data);
            //显示遮罩
            this.showMask();
        };
        /**
         * 隐藏
         */
        BasePanel.prototype.hide = function () {
            if (this.visible) {
                this.clear();
            }
            this.visible = false;
            this.hideMask();
        };
        Object.defineProperty(BasePanel.prototype, "panelType", {
            /**界面类型 */
            get: function () {
                return EnumPanel.TYPE_WINDOW1;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 显示遮罩
         */
        BasePanel.prototype.showMask = function () {
            if (BasePanel.msk) {
                BasePanel.msk.removeEventListener(egret.TouchEvent.TOUCH_TAP, flash.bind(this.tapMask, this), this);
            }
            if ((this.panelType == EnumPanel.TYPE_ALERT || this.panelType == EnumPanel.TYPE_WINDOW2)
                || (this.data && this.data.hasOwnProperty("showMask") && this.data["showMask"])) {
                if (this.data && this.data.hasOwnProperty("showMask") && this.data["showMask"] == false) {
                    this.hideMask();
                    return;
                }
                if (!BasePanel.msk) {
                    BasePanel.msk = new fairygui.GGraph();
                    BasePanel.msk.graphics.clear();
                    BasePanel.msk.graphics.beginFill(0x000000, 0.8);
                    BasePanel.msk.graphics.drawRect(0, 0, Global.stageWidth, Global.stageHeight);
                    BasePanel.msk.graphics.endFill();
                }
                BasePanel.msk.touchable = true;
                if (this.openTapMask && !BasePanel.msk.hasEventListener(egret.TouchEvent.TOUCH_TAP)) {
                    if (this.parent != null && BasePanel.msk.parent == null) {
                        if (this.parent.numChildren > 1) {
                            this.parent.addChildAt(BasePanel.msk, this.parent.numChildren - 1);
                        }
                        else {
                            this.parent.addChildAt(BasePanel.msk, 0);
                        }
                    }
                    BasePanel.msk.addEventListener(egret.TouchEvent.TOUCH_TAP, flash.bind(this.tapMask, this), this);
                }
                else {
                    BasePanel.msk.removeEventListener(egret.TouchEvent.TOUCH_TAP, flash.bind(this.tapMask, this), this);
                }
            }
            else {
                this.hideMask();
            }
        };
        /**
         * 隐藏遮罩
         */
        BasePanel.prototype.hideMask = function () {
            if (BasePanel.msk && this.openTapMask) {
                BasePanel.msk.removeFromParent();
                BasePanel.msk.removeEventListener(egret.TouchEvent.TOUCH_TAP, flash.bind(this.tapMask, this), this);
            }
            //这里不能重复绘制，在runtime上会出现涨内存现象    
            // if (this.msk != null) {
            //     this.msk.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.tapMask, this);
            //     this.msk.graphics.clear();
            //     // this.msk.dispose();
            //     this.msk = null;
            // }
        };
        /**
         * 转化为对应的类
         */
        BasePanel.prototype.toClass = function () {
            var clsName = egret.getQualifiedClassName(this);
            return egret.getDefinitionByName(clsName);
        };
        Object.defineProperty(BasePanel.prototype, "panelInfo", {
            /**面板信息*/
            get: function () {
                return this._panelInfo;
            },
            /**面板信息*/
            set: function (value) {
                this._panelInfo = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BasePanel.prototype, "width", {
            get: function () {
                return this.bg ? this.bg.width : 1136;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BasePanel.prototype, "height", {
            get: function () {
                return this.bg ? this.bg.height : 640;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 自适应
         */
        BasePanel.prototype.onResize = function () {
            // if (this.panelInfo && this.panelInfo.panelType == com.enums.EnumPanel.TYPE_BOTTOM) {
            //     this.x = Global.stageWidth - this.width >> 1;
            //     this.y = Global.stageHeight - this.height;
            // }
            // else {
            //     this.x = (Global.stageWidth - this.width) * 0.5;
            //     this.y = (Global.stageHeight - this.height) * 0.5 + 1;
            //     //this.showMask();
            //     if (this.btn_close != null && this.needAdjustClose) {
            //         this.btn_close.x = this.x < 0 ? Global.stageWidth - this.btn_close.width - this.x : 1035;
            //         this.btn_close.y = this.y < 0 ? -this.y : 0;
            //     }
            // }
            // if (BasePanel.msk && BasePanel.msk.parent) {
            //     BasePanel.msk.setScale(Global.stageWidth / 1136, Global.stageHeight / 640);
            // }
        };
        /**
         * 清理数据
         */
        BasePanel.prototype.clear = function () {
            this.hideMask();
            _super.prototype.clear.call(this);
        };
        /**
         * 释放资源,不允许外部直接调用这个方法
         */
        BasePanel.prototype.dispose = function () {
            var comp;
            var child;
            while (this.view && this.view.numChildren > 0) {
                child = this.view.removeChildAt(0);
                if (child.name && child.name.indexOf("tab_") == 0 && child instanceof fairygui.GGroup) {
                    comp = this[child.name];
                    if (comp != null) {
                        // tab.dispose();
                    }
                }
                if (child.name && child.name.indexOf("eglist_") == 0 && child instanceof fairygui.GList) {
                    comp = this[child.name];
                    if (comp != null) {
                        comp.dispose();
                        comp = null;
                    }
                }
                if (child.name && child.name.indexOf("eloader_") == 0 && child instanceof fairygui.GLoader) {
                    comp = this[child.name];
                    if (comp != null) {
                        comp.dispose();
                        comp = null;
                    }
                }
                else if (egret.is(child, "fairygui.GLoader")) {
                    fairui.LoaderManager.disposeTarget(child.url, child);
                }
                if (child != null) {
                    child.dispose();
                }
                child = null;
            }
            this.removeChildren(0, this.numChildren, true);
            if (this.parent != null) {
                this.parent.removeChild(this, true);
            }
            _super.prototype.dispose.call(this);
            this.hideMask();
            this.view = null;
            this._data = null;
            this._panelInfo = null;
        };
        return BasePanel;
    }(fairui.View));
    fairui.BasePanel = BasePanel;
    __reflect(BasePanel.prototype, "fairui.BasePanel");
})(fairui || (fairui = {}));
//# sourceMappingURL=BasePanel.js.map