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
var com;
(function (com) {
    var game;
    (function (game) {
        var data;
        (function (data_1) {
            var container;
            (function (container) {
                var Q_itemContainer = (function (_super) {
                    __extends(Q_itemContainer, _super);
                    function Q_itemContainer() {
                        var _this = _super !== null && _super.apply(this, arguments) || this;
                        _this.list = new Array();
                        _this.map = new flash.Dictionary();
                        _this.configName = "";
                        return _this;
                    }
                    Q_itemContainer.prototype.load = function () {
                        com.bean.DataConfigUtils.instances().loadJsonFile("Q_itemBean", flash.bind(this.onFinish, this));
                    };
                    Q_itemContainer.prototype.onFinish = function (_configName, data, keyObj) {
                        this.configName = _configName;
                        var ary = flash.As3As(data, Array);
                        var leng = flash.checkInt(ary.length);
                        for (var i = flash.checkInt(0); i < leng; i++) {
                            var config = flash.As3As(ary[i], Object);
                            var mybean = com.game.data.bean.Q_itemExpandBean.build(this.configName, config, keyObj);
                            this.map.setItem(mybean.q_id, mybean);
                            this.list.push(mybean);
                        }
                    };
                    Q_itemContainer.prototype.getDataBean = function (key) {
                        if (this.map.getItem(key)) {
                            return flash.As3As(this.map.getItem(key), com.game.data.bean.Q_itemExpandBean);
                        }
                        else {
                            com.bean.DataConfigUtils.instances().notHaveBean(this.configName, key);
                        }
                        return null;
                    };
                    Q_itemContainer.prototype.hasDataBean = function (key) {
                        return flash.Boolean(this.map.getItem(key));
                    };
                    Q_itemContainer.prototype.getList = function () {
                        return this.list;
                    };
                    Q_itemContainer.prototype.getHashMap = function () {
                        return this.map;
                    };
                    return Q_itemContainer;
                }(egret.HashObject));
                container.Q_itemContainer = Q_itemContainer;
                __reflect(Q_itemContainer.prototype, "com.game.data.container.Q_itemContainer");
            })(container = data_1.container || (data_1.container = {}));
        })(data = game.data || (game.data = {}));
    })(game = com.game || (com.game = {}));
})(com || (com = {}));
//# sourceMappingURL=Q_itemContainer.js.map