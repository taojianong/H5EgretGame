var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var com;
(function (com) {
    var loader;
    (function (loader) {
        var AvatarResDecode = (function () {
            function AvatarResDecode() {
                this._isDispose = false;
                this._isCache = false;
            }
            Object.defineProperty(AvatarResDecode.prototype, "ani", {
                get: function () {
                    return this._ani;
                },
                enumerable: true,
                configurable: true
            });
            AvatarResDecode.prototype.parser = function (bytes, url, onFinish, onFail, isCache) {
                egret.callLater(function callParse(bytes, url, onFinish, onFail, isCache) {
                    var _this = this;
                    try {
                        this._isDispose = false;
                        this._onFinish = onFinish;
                        this._onFail = onFail;
                        this._isCache = isCache;
                        if (bytes) {
                            var _zip = new JSZip(bytes.buffer);
                            var strList = url.split("/");
                            var fileName = strList[strList.length - 1].split(".")[0];
                            var jsonTxt_1 = _zip.file(fileName + ".json").asText();
                            // let test:egret.ByteArray = new egret.ByteArray();
                            //  bytes.readBytes(test,test.position,test.length - test.position);
                            var buffer = _zip.file(fileName + ".png").asArrayBuffer();
                            egret.BitmapData.create("arraybuffer", buffer, function (value) {
                                if (!_this.isDispose) {
                                    var texture = new egret.Texture();
                                    texture.bitmapData = value;
                                    var movieClipDataSet = JSON.parse(jsonTxt_1);
                                    _this._ani = _this.getAnimator();
                                    _this._ani.findFromCache(movieClipDataSet, texture);
                                    _this._ani.isCache = _this._isCache;
                                    _this.onComplete();
                                }
                            });
                            // let texture: egret.Texture = new egret.Texture();
                            // texture.bitmapData = egret.BitmapData.create("arraybuffer", buffer);
                            // let movieClipDataSet: any = JSON.parse(jsonTxt);
                            // this._ani = this.getAnimator();
                            // this._ani.findFromCache(movieClipDataSet, texture);
                            // this.onComplete();
                        }
                        else
                            this.onError();
                    }
                    catch (e) {
                        egret.error("AvatarResDecode.parser:", e);
                        this.onError();
                    }
                }, this, bytes, url, onFinish, onFail, isCache);
                // try {
                // 	this._isDispose = false;
                // 	this._onFinish = onFinish;
                // 	this._onFail = onFail;
                // 	this._isCache = isCache;
                // 	if (bytes) {
                // 		let _zip: JSZip = new JSZip(bytes.buffer);
                // 		let strList: string[] = url.split("/");
                // 		let fileName: string = strList[strList.length - 1].split(".")[0];
                // 		let jsonTxt: string = _zip.file(fileName + ".json").asText();
                // 		// let test:egret.ByteArray = new egret.ByteArray();
                // 		//  bytes.readBytes(test,test.position,test.length - test.position);
                // 		let buffer: ArrayBuffer = _zip.file(fileName + ".png").asArrayBuffer();
                // 		egret.BitmapData.create("arraybuffer", buffer, (value: egret.BitmapData) => {
                // 			if (!this.isDispose) { //因为这个方法是异步的，所以该对象有可能被释放了
                // 				let texture: egret.Texture = new egret.Texture();
                // 				texture.bitmapData = value;
                // 				let movieClipDataSet: any = JSON.parse(jsonTxt);
                // 				this._ani = this.getAnimator();
                // 				this._ani.findFromCache(movieClipDataSet, texture);
                // 				this._ani.isCache = this._isCache;
                // 				this.onComplete();
                // 			}
                // 		});
                // 		// let texture: egret.Texture = new egret.Texture();
                // 		// texture.bitmapData = egret.BitmapData.create("arraybuffer", buffer);
                // 		// let movieClipDataSet: any = JSON.parse(jsonTxt);
                // 		// this._ani = this.getAnimator();
                // 		// this._ani.findFromCache(movieClipDataSet, texture);
                // 		// this.onComplete();
                // 	}
                // 	else
                // 		this.onError();
                // }
                // catch (e) {
                // 	egret.error("AvatarResDecode.parser:", e)
                // 	this.onError();
                // }
            };
            AvatarResDecode.prototype.onError = function () {
                //yr_engine.core.utils.debug.stack.$_FunctionStackLog.intoStack("com.core.loader.decode::AvatarResDecode /onError()");
                if (this._onFail)
                    this._onFail.apply(this._onFail["owner"]);
                this.dispose();
            };
            AvatarResDecode.prototype.onComplete = function () {
                if (this._onFinish)
                    this._onFinish.apply(this._onFinish["owner"], [this.ani]);
                this.dispose();
            };
            AvatarResDecode.prototype.getAnimator = function () {
                return new base.AysncAnimator();
            };
            Object.defineProperty(AvatarResDecode.prototype, "isDispose", {
                get: function () {
                    return this._isDispose;
                },
                enumerable: true,
                configurable: true
            });
            AvatarResDecode.prototype.dispose = function () {
                this._isDispose = true;
                this._onFinish = null;
                this._onFail = null;
                this._ani = null;
            };
            return AvatarResDecode;
        }());
        loader.AvatarResDecode = AvatarResDecode;
        __reflect(AvatarResDecode.prototype, "com.loader.AvatarResDecode");
    })(loader = com.loader || (com.loader = {}));
})(com || (com = {}));
//# sourceMappingURL=AvatarResDecode.js.map