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
        (function (data) {
            var bean;
            (function (bean_1) {
                var Q_itemExpandBean = (function (_super) {
                    __extends(Q_itemExpandBean, _super);
                    function Q_itemExpandBean() {
                        return _super !== null && _super.apply(this, arguments) || this;
                    }
                    Q_itemExpandBean.build = function (configName, config, keyObj) {
                        if (configName === void 0) { configName = ""; }
                        var bean = new Q_itemExpandBean();
                        if (keyObj) {
                            for (var key in config) {
                                var key2 = keyObj[key];
                                if (bean.hasOwnProperty("_" + key2)) {
                                    bean["_" + key2] = config[key];
                                }
                                else {
                                    com.bean.DataConfigUtils.instances().beanConfigPropertyError(configName, key2);
                                }
                            }
                        }
                        else {
                            for (key in config) {
                                if (bean.hasOwnProperty("_" + key)) {
                                    bean["_" + key] = config[key];
                                }
                                else {
                                    com.bean.DataConfigUtils.instances().beanConfigPropertyError(configName, key);
                                }
                            }
                        }
                        bean.init(config);
                        return bean;
                    };
                    /* 扩展字段 */
                    Q_itemExpandBean.prototype.init = function (config) {
                    };
                    return Q_itemExpandBean;
                }(bean_1.Q_itemBean));
                bean_1.Q_itemExpandBean = Q_itemExpandBean;
                __reflect(Q_itemExpandBean.prototype, "com.game.data.bean.Q_itemExpandBean");
            })(bean = data.bean || (data.bean = {}));
        })(data = game.data || (game.data = {}));
    })(game = com.game || (com.game = {}));
})(com || (com = {}));
//# sourceMappingURL=Q_itemExpandBean.js.map