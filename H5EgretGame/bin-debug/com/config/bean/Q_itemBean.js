var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var com;
(function (com) {
    var game;
    (function (game) {
        var data;
        (function (data) {
            var bean;
            (function (bean) {
                /**
                 * q_item Bean
                 * Creater:Administrator
                 */
                var Q_itemBean = (function () {
                    function Q_itemBean() {
                        //物品ID//=不能跟组包ID重复=20-50字段为英雄装备icon预留（尸霸装和虚装）
                        this._q_id = 0;
                        //物品名称//凯峰:=(最大九个汉字。支持_后缀，后缀部分在客户端不予显示)（物品名称需要唯一，以便在爆率表中使用汉字）
                        this._q_name = "";
                        //物品类型//0:货币;1普通物品;2脚本类道具:3英雄经验;4:礼包类;5：完整角色道具=
                        this._q_type = 0;
                        //背包标签//背包标签页展示（不填则不在背包中展示）1料理2福袋礼包3其他道具=0农场种子类道具
                        this._q_type_show = 0;
                        //角色星数//1：一星；2：二星；3：三星……..=只有完成角色用到
                        this._q_star = 0;
                        //打开礼包编号
                        this._q_gift = 0;
                        //图标编号
                        this._q_tiny_icon = "";
                        //颜色(0白色1绿色2蓝色3紫色4橙色5红色)//
                        this._q_default = 0;
                        //叠加数量//凯峰:=（1为不可叠加，最大可以填9999）
                        this._q_max = 0;
                        //BUFF//凯峰:=（格式：BUFF编号;BUFF编号;BUFF编号）
                        this._q_buff = "";
                        //物品描述
                        this._q_describe = "";
                        //扩展字段
                        this._q_extend = "";
                        //是否计入日志//0记录1不记录=
                        this._q_log = 0;
                        //道具使用增加经验//用于料理增加的经验=
                        this._q_add_value = 0;
                        //使用的VIP等级
                        this._q_vip = 0;
                        //产出后公告
                        this._q_output_notice = 0;
                    }
                    Object.defineProperty(Q_itemBean.prototype, "q_id", {
                        /**
                         * get 物品ID//=不能跟组包ID重复=20-50字段为英雄装备icon预留（尸霸装和虚装）
                         * @return
                         */
                        get: function () {
                            return this._q_id;
                        },
                        /**
                         * set 物品ID//=不能跟组包ID重复=20-50字段为英雄装备icon预留（尸霸装和虚装）
                         */
                        set: function ($q_id) {
                            this._q_id = $q_id;
                        },
                        enumerable: true,
                        configurable: true
                    });
                    Object.defineProperty(Q_itemBean.prototype, "q_name", {
                        /**
                         * get 物品名称//凯峰:=(最大九个汉字。支持_后缀，后缀部分在客户端不予显示)（物品名称需要唯一，以便在爆率表中使用汉字）
                         * @return
                         */
                        get: function () {
                            return this._q_name;
                        },
                        /**
                         * set 物品名称//凯峰:=(最大九个汉字。支持_后缀，后缀部分在客户端不予显示)（物品名称需要唯一，以便在爆率表中使用汉字）
                         */
                        set: function ($q_name) {
                            this._q_name = $q_name;
                        },
                        enumerable: true,
                        configurable: true
                    });
                    Object.defineProperty(Q_itemBean.prototype, "q_type", {
                        /**
                         * get 物品类型//0:货币;1普通物品;2脚本类道具:3英雄经验;4:礼包类;5：完整角色道具=
                         * @return
                         */
                        get: function () {
                            return this._q_type;
                        },
                        /**
                         * set 物品类型//0:货币;1普通物品;2脚本类道具:3英雄经验;4:礼包类;5：完整角色道具=
                         */
                        set: function ($q_type) {
                            this._q_type = $q_type;
                        },
                        enumerable: true,
                        configurable: true
                    });
                    Object.defineProperty(Q_itemBean.prototype, "q_type_show", {
                        /**
                         * get 背包标签//背包标签页展示（不填则不在背包中展示）1料理2福袋礼包3其他道具=0农场种子类道具
                         * @return
                         */
                        get: function () {
                            return this._q_type_show;
                        },
                        /**
                         * set 背包标签//背包标签页展示（不填则不在背包中展示）1料理2福袋礼包3其他道具=0农场种子类道具
                         */
                        set: function ($q_type_show) {
                            this._q_type_show = $q_type_show;
                        },
                        enumerable: true,
                        configurable: true
                    });
                    Object.defineProperty(Q_itemBean.prototype, "q_star", {
                        /**
                         * get 角色星数//1：一星；2：二星；3：三星……..=只有完成角色用到
                         * @return
                         */
                        get: function () {
                            return this._q_star;
                        },
                        /**
                         * set 角色星数//1：一星；2：二星；3：三星……..=只有完成角色用到
                         */
                        set: function ($q_star) {
                            this._q_star = $q_star;
                        },
                        enumerable: true,
                        configurable: true
                    });
                    Object.defineProperty(Q_itemBean.prototype, "q_gift", {
                        /**
                         * get 打开礼包编号
                         * @return
                         */
                        get: function () {
                            return this._q_gift;
                        },
                        /**
                         * set 打开礼包编号
                         */
                        set: function ($q_gift) {
                            this._q_gift = $q_gift;
                        },
                        enumerable: true,
                        configurable: true
                    });
                    Object.defineProperty(Q_itemBean.prototype, "q_tiny_icon", {
                        /**
                         * get 图标编号
                         * @return
                         */
                        get: function () {
                            return this._q_tiny_icon;
                        },
                        /**
                         * set 图标编号
                         */
                        set: function ($q_tiny_icon) {
                            this._q_tiny_icon = $q_tiny_icon;
                        },
                        enumerable: true,
                        configurable: true
                    });
                    Object.defineProperty(Q_itemBean.prototype, "q_default", {
                        /**
                         * get 颜色(0白色1绿色2蓝色3紫色4橙色5红色)//
                         * @return
                         */
                        get: function () {
                            return this._q_default;
                        },
                        /**
                         * set 颜色(0白色1绿色2蓝色3紫色4橙色5红色)//
                         */
                        set: function ($q_default) {
                            this._q_default = $q_default;
                        },
                        enumerable: true,
                        configurable: true
                    });
                    Object.defineProperty(Q_itemBean.prototype, "q_max", {
                        /**
                         * get 叠加数量//凯峰:=（1为不可叠加，最大可以填9999）
                         * @return
                         */
                        get: function () {
                            return this._q_max;
                        },
                        /**
                         * set 叠加数量//凯峰:=（1为不可叠加，最大可以填9999）
                         */
                        set: function ($q_max) {
                            this._q_max = $q_max;
                        },
                        enumerable: true,
                        configurable: true
                    });
                    Object.defineProperty(Q_itemBean.prototype, "q_buff", {
                        /**
                         * get BUFF//凯峰:=（格式：BUFF编号;BUFF编号;BUFF编号）
                         * @return
                         */
                        get: function () {
                            return this._q_buff;
                        },
                        /**
                         * set BUFF//凯峰:=（格式：BUFF编号;BUFF编号;BUFF编号）
                         */
                        set: function ($q_buff) {
                            this._q_buff = $q_buff;
                        },
                        enumerable: true,
                        configurable: true
                    });
                    Object.defineProperty(Q_itemBean.prototype, "q_describe", {
                        /**
                         * get 物品描述
                         * @return
                         */
                        get: function () {
                            return this._q_describe;
                        },
                        /**
                         * set 物品描述
                         */
                        set: function ($q_describe) {
                            this._q_describe = $q_describe;
                        },
                        enumerable: true,
                        configurable: true
                    });
                    Object.defineProperty(Q_itemBean.prototype, "q_extend", {
                        /**
                         * get 扩展字段
                         * @return
                         */
                        get: function () {
                            return this._q_extend;
                        },
                        /**
                         * set 扩展字段
                         */
                        set: function ($q_extend) {
                            this._q_extend = $q_extend;
                        },
                        enumerable: true,
                        configurable: true
                    });
                    Object.defineProperty(Q_itemBean.prototype, "q_log", {
                        /**
                         * get 是否计入日志//0记录1不记录=
                         * @return
                         */
                        get: function () {
                            return this._q_log;
                        },
                        /**
                         * set 是否计入日志//0记录1不记录=
                         */
                        set: function ($q_log) {
                            this._q_log = $q_log;
                        },
                        enumerable: true,
                        configurable: true
                    });
                    Object.defineProperty(Q_itemBean.prototype, "q_add_value", {
                        /**
                         * get 道具使用增加经验//用于料理增加的经验=
                         * @return
                         */
                        get: function () {
                            return this._q_add_value;
                        },
                        /**
                         * set 道具使用增加经验//用于料理增加的经验=
                         */
                        set: function ($q_add_value) {
                            this._q_add_value = $q_add_value;
                        },
                        enumerable: true,
                        configurable: true
                    });
                    Object.defineProperty(Q_itemBean.prototype, "q_vip", {
                        /**
                         * get 使用的VIP等级
                         * @return
                         */
                        get: function () {
                            return this._q_vip;
                        },
                        /**
                         * set 使用的VIP等级
                         */
                        set: function ($q_vip) {
                            this._q_vip = $q_vip;
                        },
                        enumerable: true,
                        configurable: true
                    });
                    Object.defineProperty(Q_itemBean.prototype, "q_output_notice", {
                        /**
                         * get 产出后公告
                         * @return
                         */
                        get: function () {
                            return this._q_output_notice;
                        },
                        /**
                         * set 产出后公告
                         */
                        set: function ($q_output_notice) {
                            this._q_output_notice = $q_output_notice;
                        },
                        enumerable: true,
                        configurable: true
                    });
                    //生成时间
                    Q_itemBean.MSG_VER_STR = "2018-5-31 22:01:44";
                    //生成时间（sec）
                    Q_itemBean.MSG_VER_NUM = 1527775304;
                    //生成的时候的表结构校验值
                    Q_itemBean.MSG_VER_CHECK_VALUE = "3d8553147de72c03f4c1e06c938c459b";
                    return Q_itemBean;
                }());
                bean.Q_itemBean = Q_itemBean;
                __reflect(Q_itemBean.prototype, "com.game.data.bean.Q_itemBean");
            })(bean = data.bean || (data.bean = {}));
        })(data = game.data || (game.data = {}));
    })(game = com.game || (com.game = {}));
})(com || (com = {}));
//# sourceMappingURL=Q_itemBean.js.map