var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var com;
(function (com) {
    var manager;
    (function (manager) {
        /**资源解析器 */
        var GameVersionParser = (function () {
            function GameVersionParser() {
                this._versonListLeng = 0;
                this._crtIndex = 0;
                this._resVerHash = new flash.Dictionary();
                this._resVerToOrgenHash = new flash.Dictionary();
            }
            /**获取版本号 */
            GameVersionParser.prototype.getVersionPath = function (url) {
                var versonUrl = this._resVerHash.getItem(url);
                if (versonUrl) {
                    return versonUrl;
                }
                return url;
            };
            GameVersionParser.prototype.getOrigenPath = function (versonUrl) {
                var oUrl = this._resVerToOrgenHash.getItem(versonUrl);
                if (oUrl) {
                    return oUrl;
                }
                return versonUrl;
            };
            GameVersionParser.prototype.start = function (packDataBuffer, callBack, parmas) {
                if (callBack === void 0) { callBack = null; }
                if (parmas === void 0) { parmas = null; }
                var packData = new egret.ByteArray(packDataBuffer);
                this._callBack = callBack;
                this._parmas = parmas;
                if (packData) {
                    packData.position = 0;
                    egret.log(packData.length);
                    var length_type = flash.checkInt(packData.readInt());
                    if (length_type <= 0 || length_type >= 0x0000ffff) {
                        var configVer_1 = packData.readUTFBytes(20);
                        egret.log("游戏资源版本打包(java)：resourceCfg\n版本号:" + configVer_1);
                        EventManager.dispatchEvent(LoginEvent.SHOW_INIT_GAME_PROGRESS, Global.lang.getLang("lang_client_732") + configVer_1);
                        var configData_1 = new egret.ByteArray();
                        packData.readBytes(configData_1, 0, 0);
                        var inflate1 = new Zlib.Inflate(configData_1.bytes);
                        var outbuffer1 = inflate1.decompress();
                        var outBytes1 = new egret.ByteArray(outbuffer1.buffer);
                        this._resVersionObj = outBytes1.readUTFBytes(outBytes1.length);
                        this.readFileVersionData();
                    }
                    else {
                        var leng = flash.checkInt(length_type);
                        var configVer_2 = packData.readUTFBytes(leng);
                        egret.log("游戏资源版本打包：resourceCfg\n版本号:" + configVer_2);
                        EventManager.dispatchEvent(LoginEvent.SHOW_INIT_GAME_PROGRESS, Global.lang.getLang("lang_client_735") + configVer_2);
                        var configData_2 = new egret.ByteArray();
                        packData.readBytes(configData_2, 0, 0);
                        var inflate2 = new Zlib.Inflate(configData_2.bytes);
                        var outbuffer2 = inflate2.decompress();
                        var outBytes2 = new egret.ByteArray(outbuffer2.buffer);
                        this._resVersionObj = outBytes2.readUTFBytes(outBytes2.length);
                        this.readFileVersionData();
                    }
                }
                else {
                    if (!Config.isDebug) {
                        EventManager.dispatchEvent(LoginEvent.SHOW_INIT_GAME_PROGRESS, Global.lang.getLang("lang_client_736"));
                    }
                    else {
                        this.readFinish();
                    }
                }
            };
            GameVersionParser.prototype.readDirVersionData = function () {
                this._resVerList = [];
                for (var versonData_key_a in this._resVersionObj) {
                    var versonData = this._resVersionObj[versonData_key_a];
                    var list = versonData.split(/\n/gi);
                    this._resVerList = this._resVerList.concat(list);
                }
                this._versonListLeng = this._resVerList.length;
                this.startRead();
            };
            GameVersionParser.prototype.readFileVersionData = function () {
                this._resVerList = [];
                var versonData = this._resVersionObj;
                var list = versonData.split(/\n/gi);
                this._resVerList = this._resVerList.concat(list);
                this._versonListLeng = this._resVerList.length;
                this.startRead();
            };
            GameVersionParser.prototype.startRead = function () {
                this.readVersion();
            };
            GameVersionParser.prototype.readVersion = function (e) {
                if (e === void 0) { e = null; }
                var leng = this._versonListLeng;
                this._crtIndex = 0;
                while (this._crtIndex < leng) {
                    var version = this._resVerList[this._crtIndex];
                    var verList = version.split("|");
                    var name_1 = verList[0];
                    var verNum = verList[1];
                    var verName = this.getVersonName(name_1, verNum);
                    this._resVerHash.setItem(name_1, verName);
                    this._resVerToOrgenHash.setItem(verName, name_1);
                    this._crtIndex++;
                }
                if (this._crtIndex >= this._versonListLeng) {
                    this.readFinish();
                }
            };
            GameVersionParser.prototype.getVersonName = function (name, verNum) {
                if (name.indexOf(".") != -1) {
                    return name.replace(".", "_" + verNum + ".");
                }
                else {
                    var index = flash.checkInt(name.lastIndexOf("/"));
                    var nName = name.slice(0, index);
                    return nName + "_" + verNum + "/";
                }
            };
            GameVersionParser.prototype.readFinish = function () {
                if (this._callBack && this._callBack instanceof Function) {
                    this._callBack.apply(null, this._parmas);
                }
            };
            return GameVersionParser;
        }());
        manager.GameVersionParser = GameVersionParser;
        __reflect(GameVersionParser.prototype, "com.manager.GameVersionParser");
    })(manager = com.manager || (com.manager = {}));
})(com || (com = {}));
//# sourceMappingURL=GameVersionParser.js.map