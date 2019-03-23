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
    var Bitmap = egret.Bitmap;
    var GButton = fairygui.GButton;
    var EButton = (function (_super) {
        __extends(EButton, _super);
        function EButton() {
            var _this = _super.call(this) || this;
            _this._data = null;
            _this._iconArr = null;
            /**是否是三种状态的按钮*/
            _this._isThreeStateBtn = true;
            /**是否是加载的外部图片*/
            _this._isExternalImgRes = false;
            /**暂存加载的texture*/
            _this._textures = new Array();
            /**解锁特效*/
            _this.unlockEffect = null;
            _this._custom_downEffect = 0;
            _this._custom_downScaled = false;
            _this._custom_downEffectValue = 0.8;
            return _this;
        }
        Object.defineProperty(EButton.prototype, "downEffect", {
            /**2为缩放 */
            set: function (val) {
                this._custom_downEffect = val;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EButton.prototype, "downEffectValue", {
            set: function (val) {
                this._custom_downEffectValue = val;
            },
            enumerable: true,
            configurable: true
        });
        //public setup_beforeAdd(xml: any): void {
        // super.setup_beforeAdd(xml);
        EButton.prototype.setup_beforeAdd = function (buffer, beginPos) {
            _super.prototype.setup_beforeAdd.call(this, buffer, beginPos);
            if (this.data) {
                this._data = this.data;
                if (this._data && this._data.length > 0) {
                    this._iconArr = this._data.split(",");
                }
            }
            else {
                this._isThreeStateBtn = false;
                if (!this._iconArr) {
                    this._iconArr = new Array(2);
                }
                this._iconArr[0] = this.resourceURL;
                this._iconArr[1] = this.resourceURL;
            }
        };
        EButton.prototype.setState = function (val) {
            _super.prototype.setState.call(this, val);
            switch (val) {
                case EButton.UP:
                    {
                        if (!this._selectedState) {
                            if (this._iconObject) {
                                if (!this._isExternalImgRes) {
                                    this._iconObject.asLoader.url = this.icon;
                                }
                                else {
                                    this._iconObject.asLoader.texture = this._textures[0];
                                }
                            }
                        }
                        break;
                    }
                case EButton.DOWN:
                    {
                        if (this._iconObject) {
                            if (!this._isExternalImgRes) {
                                if (this._iconArr[0] == "") {
                                    this._iconArr[0] = this.icon;
                                }
                                this._iconObject.asLoader.url = this._iconArr[0].replace(/(\\r|\\n|\\)/g, "");
                            }
                            else {
                                this._iconObject.asLoader.texture = this._textures[1];
                            }
                        }
                        break;
                    }
                case EButton.OVER:
                    {
                        if (this._iconObject) {
                            if (!this._isExternalImgRes) {
                                if (this._iconArr[1] == "") {
                                    this._iconArr[1] = this.icon;
                                }
                                this._iconObject.asLoader.url = this._iconArr[1].replace(/(\\r|\\n|\\)/g, "");
                            }
                            else {
                                this._iconObject.asLoader.texture = this._textures[2];
                            }
                        }
                    }
            }
            //主动设置downEffect
            if (this._custom_downEffect == 2) {
                if (val == GButton.DOWN || val == GButton.SELECTED_OVER || val == GButton.SELECTED_DISABLED) {
                    if (!this._custom_downScaled) {
                        this._custom_downScaled = true;
                        this.setScale(this.scaleX * this._custom_downEffectValue, this.scaleY * this._custom_downEffectValue);
                    }
                }
                else {
                    if (this._custom_downScaled) {
                        this._custom_downScaled = false;
                        this.setScale(this.scaleX / this._custom_downEffectValue, this.scaleY / this._custom_downEffectValue);
                    }
                }
            }
        };
        Object.defineProperty(EButton.prototype, "selected", {
            /**
             * 设置按钮选中状态
             */
            set: function (value) {
                if (value) {
                    this._selectedState = true;
                    this.setState(EButton.DOWN);
                }
                else {
                    this._selectedState = false;
                    this.setState(EButton.UP);
                }
            },
            enumerable: true,
            configurable: true
        });
        EButton.prototype.constructFromXML = function (xml) {
            _super.prototype.constructFromXML.call(this, xml);
        };
        /**
         * 设置三种状态的图片url
         * */
        EButton.prototype.btnUrl = function (val, isThreeStateBtn) {
            if (isThreeStateBtn === void 0) { isThreeStateBtn = true; }
            this._isThreeStateBtn = isThreeStateBtn;
            if (val && val.indexOf("ui:") != -1) {
                this._isExternalImgRes = false;
                if (val != this.icon) {
                    this.icon = val;
                    if (!this._iconArr) {
                        this._iconArr = new Array(2);
                    }
                    if (isThreeStateBtn) {
                        this._iconArr[0] = val.replace(/1$/g, "2") || this.icon;
                        this._iconArr[1] = val.replace(/1$/g, "3") || this.icon;
                    }
                    else {
                        this._iconArr[0] = this.icon;
                        this._iconArr[1] = this.icon;
                    }
                }
            }
            else {
                this._isExternalImgRes = true;
                if (this.icon != val && this.icon && this.icon.indexOf("ui:") == -1) {
                    fairui.LoaderManager.disposeTarget(this.icon, this);
                    if (isThreeStateBtn) {
                        fairui.LoaderManager.disposeTarget(this._iconArr[0], this);
                        fairui.LoaderManager.disposeTarget(this._iconArr[1], this);
                    }
                }
                if (!this._iconArr) {
                    this._iconArr = new Array(2);
                }
                if (isThreeStateBtn) {
                    this._iconArr[0] = val.replace(/1\./g, "2.");
                    this._iconArr[1] = val.replace(/1\./g, "3.");
                }
                else {
                    this._iconArr[0] = this.icon;
                    this._iconArr[1] = this.icon;
                }
                if (this.icon != val && val != "") {
                    fairui.LoaderManager.loadImageRes(val, this, function loadComplete(texture) {
                        var tempValue = fairui.LoaderManager.getRes(val, this);
                        this._textures = this._textures || new Array();
                        this._textures[0] = tempValue;
                        this.selected = this._selectedState;
                    }, null);
                    this.icon = val;
                }
                if (isThreeStateBtn) {
                    var _loop_1 = function (i) {
                        fairui.LoaderManager.loadImageRes(this_1._iconArr[i], this_1, function loadComplete(texture) {
                            var tempValue = fairui.LoaderManager.getRes(this._iconArr[i], this);
                            this._textures = this._textures || new Array();
                            this._textures[i + 1] = tempValue;
                            this.selected = this._selectedState;
                        }, null);
                    };
                    var this_1 = this;
                    for (var i = 0; i < 2; i++) {
                        _loop_1(i);
                    }
                }
            }
        };
        Object.defineProperty(EButton.prototype, "pixelHitTest", {
            set: function (val) {
                var loader = this._iconObject.asLoader;
                if (loader.content instanceof Bitmap) {
                    loader.content.pixelHitTest = val;
                }
            },
            enumerable: true,
            configurable: true
        });
        EButton.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
            this._textures = null;
            if (this.icon && this.icon.indexOf("ui:") == -1) {
                fairui.LoaderManager.disposeTarget(this.icon, this);
                fairui.LoaderManager.disposeTarget(this._iconArr[0], this);
                fairui.LoaderManager.disposeTarget(this._iconArr[1], this);
            }
        };
        EButton.prototype.playUnlockEffect = function (func) {
            var _self = this;
            if (_self.unlockEffect == null) {
                _self.unlockEffect = new fairui.AssetEffect();
                _self.unlockEffect.url = AssetPathManager.getInstance().getMenuEffect("main", "effect_05");
                _self.unlockEffect.move(this.width * 0.5, this.height * 0.5);
                _self.addChild(_self.unlockEffect);
                _self.unlockEffect.playOnce(playComplete);
            }
            function playComplete() {
                if (_self.unlockEffect) {
                    _self.unlockEffect.stop();
                    _self.unlockEffect.removeFromParent();
                    // _self.activeEffect.dispose();
                    _self.unlockEffect = null;
                    if (func != null) {
                        func.apply(this);
                    }
                }
            }
        };
        Object.defineProperty(EButton.prototype, "y", {
            get: function () {
                return egret.superGetter(EButton, this, "y");
            },
            set: function (value) {
                egret.superSetter(EButton, this, "y", value);
            },
            enumerable: true,
            configurable: true
        });
        return EButton;
    }(fairui.BaseButton));
    fairui.EButton = EButton;
    __reflect(EButton.prototype, "fairui.EButton");
})(fairui || (fairui = {}));
//# sourceMappingURL=EButton.js.map