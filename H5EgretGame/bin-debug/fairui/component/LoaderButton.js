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
     * 用于加载动态图片的按钮
     * @author cl 2018.3.12
     * 按照mornui图片格式,一张三个状态的图片
     */
    var LoaderButton = (function (_super) {
        __extends(LoaderButton, _super);
        function LoaderButton() {
            return _super.call(this) || this;
        }
        LoaderButton.prototype.constructFromXML = function (xml) {
            _super.prototype.constructFromXML.call(this, xml);
            this.img_loader = this.getElement("icon");
            this.txt_title = this.getElement("title");
            this.img = this.getElement("img");
            this.img.visible = false;
        };
        Object.defineProperty(LoaderButton.prototype, "title", {
            set: function (value) {
                value = App.lang.getLang(value);
                egret.superSetter(LoaderButton, this, "title", value);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LoaderButton.prototype, "selected", {
            set: function (val) {
                this._selected2 = val;
                egret.superSetter(LoaderButton, this, "selected", val);
                if (this.spriteSheet != null && this.img_loader) {
                    this.img_loader.texture = this.spriteSheet.getTexture(val ? "down" : "up");
                }
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 覆写对应按钮
         */
        LoaderButton.prototype.setState = function (value) {
            this._state = value;
            if (this.spriteSheet != null && this.img_loader) {
                if (!this._selected2) {
                    if (value == fairygui.GButton.UP) {
                        this.img_loader.texture = this.spriteSheet.getTexture("up");
                    }
                    else if (value == fairygui.GButton.DOWN || value == fairygui.GButton.SELECTED_DISABLED) {
                        this.img_loader.texture = this.spriteSheet.getTexture("down");
                    }
                    else if (value == fairygui.GButton.OVER || value == fairygui.GButton.SELECTED_OVER) {
                        this.img_loader.texture = this.spriteSheet.getTexture("over");
                    }
                }
                else {
                    this.img_loader.texture = this.spriteSheet.getTexture("down");
                }
                _super.prototype.setState.call(this, value);
            }
        };
        Object.defineProperty(LoaderButton.prototype, "state", {
            /**
             * 当前按钮状态
             */
            get: function () {
                return this._state;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LoaderButton.prototype, "skin", {
            /**
             * 设置皮肤
             */
            get: function () {
                return this._url;
            },
            set: function (value) {
                this.url = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LoaderButton.prototype, "url", {
            /**
             * 设置皮肤加载地址
             */
            get: function () {
                return this._url;
            },
            set: function (value) {
                if (this._url != value && this._url) {
                    fairui.LoaderManager.disposeTarget(this._url, this);
                }
                if (value) {
                    fairui.LoaderManager.loadImageRes(value, this, function loadComplete(texture) {
                        var tempValue = fairui.LoaderManager.getRes(value, this);
                        this.setSpriteSheet(tempValue);
                    }, null);
                }
                else {
                    this.setState(this._state);
                }
                this._url = value;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 设置纹理集
         */
        LoaderButton.prototype.setSpriteSheet = function (value) {
            if (value) {
                this.width = value.textureWidth;
                this.height = parseInt("" + (value.textureHeight / 3));
                if (this._spriteSheet != null) {
                    this._spriteSheet.dispose();
                    this._spriteSheet = null;
                }
                //给加载器添加纹理
                if (this.img_loader && this.img_loader.texture != null) {
                    this.img_loader.texture.dispose();
                    this.img_loader.texture = null;
                }
                if (this.txt_title != null) {
                    this.txt_title.width = this.width;
                    this.txt_title.y = (this.height - this.txt_title.height) >> 1;
                }
                this._spriteSheet = new egret.SpriteSheet(value);
                this._spriteSheet.createTexture("up", 0, 0, this.width, this.height);
                this._spriteSheet.createTexture("over", 0, this.height, this.width, this.height);
                this._spriteSheet.createTexture("down", 0, this.height * 2, this.width, this.height);
                if (this._selected2) {
                    this.setState(fairygui.GButton.DOWN);
                }
                else {
                    this.setState(this._state || fairygui.GButton.UP);
                }
            }
        };
        Object.defineProperty(LoaderButton.prototype, "spriteSheet", {
            /**
             * 按钮纹理集（只读）
             */
            get: function () {
                return this._spriteSheet;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LoaderButton.prototype, "data", {
            /**
             * 获取数据
             */
            get: function () {
                return this._data;
            },
            set: function (value) {
                this._data = value;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 获取条目
         * @param name 组件名字
         */
        LoaderButton.prototype.getElement = function (name) {
            return this.getChild(name);
        };
        LoaderButton.prototype.dispose = function () {
            if (this._url) {
                fairui.LoaderManager.disposeTarget(this._url, this);
                this._url = null;
            }
            if (this._spriteSheet != null) {
                this._spriteSheet.dispose();
                this._spriteSheet = null;
            }
            if (this.img_loader != null) {
                this.img_loader.dispose();
                this.img_loader = null;
            }
            if (this.txt_title != null) {
                this.txt_title.dispose();
                this.txt_title = null;
            }
            this._data = null;
            _super.prototype.dispose.call(this);
        };
        return LoaderButton;
    }(fairui.BaseButton));
    fairui.LoaderButton = LoaderButton;
    __reflect(LoaderButton.prototype, "fairui.LoaderButton");
})(fairui || (fairui = {}));
//# sourceMappingURL=LoaderButton.js.map