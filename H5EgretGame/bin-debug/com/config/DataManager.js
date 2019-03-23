var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var com;
(function (com) {
    var bean;
    (function (bean) {
        var DataManager = (function () {
            function DataManager() {
            }
            Object.defineProperty(DataManager.prototype, "q_itemContainer", {
                /**物品配置*/
                get: function () {
                    if (this._q_itemContainer == null) {
                        this._q_itemContainer = new com.game.data.container.Q_itemContainer();
                        this._q_itemContainer.load();
                    }
                    return this._q_itemContainer;
                },
                enumerable: true,
                configurable: true
            });
            return DataManager;
        }());
        bean.DataManager = DataManager;
        __reflect(DataManager.prototype, "com.bean.DataManager");
    })(bean = com.bean || (com.bean = {}));
})(com || (com = {}));
//# sourceMappingURL=DataManager.js.map