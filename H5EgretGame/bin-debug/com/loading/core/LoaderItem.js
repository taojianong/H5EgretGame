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
var load;
(function (load) {
    /**
     * 加载条目
     * @author clong 2019.4.27
     */
    var LoaderItem = (function (_super) {
        __extends(LoaderItem, _super);
        function LoaderItem() {
            var _this = _super.call(this) || this;
            // public readonly onFinish: Array<Function> = new Array<Function>();
            // public readonly thisObject: Array<any> = new Array<any>();
            // public readonly param: Array<any> = new Array<any>();
            _this.res = null;
            return _this;
        }
        LoaderItem.prototype.create = function (url, type, level, state) {
            if (level === void 0) { level = 0; }
            if (state === void 0) { state = 0; }
            _super.prototype.create.call(this, url, type, level, state);
        };
        LoaderItem.prototype.loadRes = function (res) {
            this.res = res;
            this.state = load.LoaderStatus.LOADING;
            var type = "";
            if (res.resType == load.LoaderStatus.TYPE_TEXTURE) {
                type = load.LoaderStatus.IMAGE;
            }
            else if (res.resType == load.LoaderStatus.TYPE_TEXT) {
                type = load.LoaderStatus.TEXT;
            }
            else if (res.resType == load.LoaderStatus.TYPE_BINARY) {
                type = load.LoaderStatus.BIN;
            }
            else if (res.resType == load.LoaderStatus.TYPE_SOUND) {
                type = load.LoaderStatus.SOUND;
            }
            else if (res.resType == load.LoaderStatus.TYPE_FONT) {
                type = load.LoaderStatus.FONT;
            }
            this.url = res.url;
            RES.getResByUrl(res.url, this.loadDataComplete, this, type);
        };
        LoaderItem.prototype.loadDataComplete = function (data, url) {
        };
        Object.defineProperty(LoaderItem.prototype, "resType", {
            get: function () {
                return this.res.resType;
            },
            enumerable: true,
            configurable: true
        });
        // protected onComplete(asset: any, isCallAsset:boolean): void {
        // 	if (asset == null){
        // 		console.log(this, "加载失败 url:" + this.url);
        // 	}
        // 	this.state = LoaderStatus.COMPLETED;
        // 	var leng: number = this.onFinish.length;
        // 	if (leng == 0) return;
        // 	var func: Function;
        // 	for (var i = 0; i < leng; i++) {
        // 		func = this.onFinish[i];
        // 		if (func) {
        // 			if (isCallAsset) {
        // 				if (this.param[i] != null) func.call(this.thisObject[i], asset, this.param[i]);
        // 				else func.call(this.thisObject[i], asset);
        // 			} else {
        // 				func.call(this.thisObject[i]);
        // 			}
        // 		}
        // 	}
        // 	//Logger.log(this,"回调次数：" + this.onFinish.length + "\nurl:" + this.url);
        // 	this.onFinish.length = 0;
        // 	this.thisObject.length = 0;
        // }
        LoaderItem.prototype.clear = function () {
            _super.prototype.clear.call(this);
            this.res = null;
            // this.onFinish.length = 0;
            // this.thisObject.length = 0;
            // this.param.length = 0;
        };
        return LoaderItem;
    }(load.LoaderCore));
    load.LoaderItem = LoaderItem;
    __reflect(LoaderItem.prototype, "load.LoaderItem");
})(load || (load = {}));
//# sourceMappingURL=LoaderItem.js.map