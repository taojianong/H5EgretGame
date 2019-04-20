var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var com;
(function (com) {
    var bean;
    (function (bean) {
        var DataConfigUtils = (function () {
            function DataConfigUtils() {
                this.SUFIX_MIN = "_client_min.json";
                /**是否完成了策划配置文件解析*/
                this.isComplete = false;
                if (DataConfigUtils._instances) {
                    Global.log.error("Error: DataConfigUtils an only use instances() to get an instance!");
                    return;
                }
                this._beanConfigPropertyErrorDict = new flash.Dictionary();
                this.sufix = this.SUFIX_MIN;
            }
            /**获取静态实例*/
            DataConfigUtils.instances = function () {
                if (!DataConfigUtils._instances) {
                    DataConfigUtils._instances = new DataConfigUtils();
                }
                return DataConfigUtils._instances;
            };
            DataConfigUtils.prototype.start = function (complete) {
                // EventManager.dispatchEvent(LoginEvent.SHOW_INIT_GAME_PROGRESS, 95, 100, "Parse the game configuration file...");
                this._complete = complete;
                this._zip = new JSZip(RES.getRes("configCfg_map"));
                var jsonStr = this._zip.file("configCfg1.data").asText();
                egret.callLater(this.setupJsonData, this, jsonStr);
            };
            DataConfigUtils.prototype.setupJsonData = function (str) {
                this._jsonDataObj1 = JSON.parse(str);
                egret.callLater(this.setupJsonData2, this);
            };
            DataConfigUtils.prototype.setupJsonData2 = function (str) {
                var jsonStr = this._zip.file("configCfg2.data").asText();
                this._jsonDataObj2 = JSON.parse(jsonStr);
                // this._jsonDataObj = <Object>Object.assign(this._jsonDataObj1, this._jsonDataObj2);
                this.clear();
                this.isComplete = true;
                this._complete.apply(this._complete["owner"]);
            };
            DataConfigUtils.prototype.clear = function () {
                this._zip = null;
                this._jsonDataObj1 = null;
                this._jsonDataObj2 = null;
            };
            DataConfigUtils.prototype.loadJsonFile = function (configName, onFinish) {
                var jsonName = configName.replace("Bean", this.sufix);
                this.readJosnData(jsonName, onFinish);
            };
            DataConfigUtils.prototype.readJosnData = function (jsonName, onFinish) {
                var str = this._jsonDataObj[jsonName];
                if (str) {
                    var strList = str.split(/\n/gi);
                    if (strList) {
                        var jsonStr = void 0, jsonObj = void 0, keyObj = void 0;
                        var version = strList[0];
                        if (this.sufix == this.SUFIX_MIN) {
                            var keyStr = strList[1];
                            jsonStr = strList[2];
                            jsonObj = JSON.parse(jsonStr);
                            keyObj = JSON.parse(keyStr);
                        }
                        else {
                            jsonStr = strList[1];
                            jsonObj = JSON.parse(jsonStr);
                        }
                        onFinish(jsonName, jsonObj, keyObj);
                    }
                }
            };
            DataConfigUtils.prototype.notHaveBean = function (configName, key) {
                var info = Global.lang.getLang("lang_client_721", configName, key); //配置表里缺少条目，表名：{0}，主键Id：{1}
                egret.error(info);
            };
            DataConfigUtils.prototype.beanConfigPropertyError = function (configName, key) {
                var dict = this._beanConfigPropertyErrorDict.getItem(configName);
                if (dict == null) {
                    dict = new flash.Dictionary();
                    this._beanConfigPropertyErrorDict.setItem(configName, dict);
                }
                if (!dict.getItem(key)) {
                    dict.setItem(key, key);
                }
            };
            DataConfigUtils._instances = null;
            return DataConfigUtils;
        }());
        bean.DataConfigUtils = DataConfigUtils;
        __reflect(DataConfigUtils.prototype, "com.bean.DataConfigUtils");
    })(bean = com.bean || (com.bean = {}));
})(com || (com = {}));
//# sourceMappingURL=DataConfigUtils.js.map