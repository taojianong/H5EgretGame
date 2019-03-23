module com.game.data.bean
{

	/** 
	 * q_item Bean
	 * Creater:Administrator
	 */
	export class Q_itemBean {
		
		//生成时间
	    public static MSG_VER_STR:string = "2018-5-31 22:01:44";
	    //生成时间（sec）
	    public static MSG_VER_NUM:number = 1527775304;
	    //生成的时候的表结构校验值
	    public static MSG_VER_CHECK_VALUE:string = "3d8553147de72c03f4c1e06c938c459b";
			    //物品ID//=不能跟组包ID重复=20-50字段为英雄装备icon预留（尸霸装和虚装）
				    	private _q_id:number = 0;
			    //物品名称//凯峰:=(最大九个汉字。支持_后缀，后缀部分在客户端不予显示)（物品名称需要唯一，以便在爆率表中使用汉字）
				    	private _q_name:string="";
			    //物品类型//0:货币;1普通物品;2脚本类道具:3英雄经验;4:礼包类;5：完整角色道具=
				    	private _q_type:number = 0;
			    //背包标签//背包标签页展示（不填则不在背包中展示）1料理2福袋礼包3其他道具=0农场种子类道具
				    	private _q_type_show:number = 0;
			    //角色星数//1：一星；2：二星；3：三星……..=只有完成角色用到
				    	private _q_star:number = 0;
			    //打开礼包编号
				    	private _q_gift:number = 0;
			    //图标编号
				    	private _q_tiny_icon:string="";
			    //颜色(0白色1绿色2蓝色3紫色4橙色5红色)//
				    	private _q_default:number = 0;
			    //叠加数量//凯峰:=（1为不可叠加，最大可以填9999）
				    	private _q_max:number = 0;
			    //BUFF//凯峰:=（格式：BUFF编号;BUFF编号;BUFF编号）
				    	private _q_buff:string="";
			    //物品描述
				    	private _q_describe:string="";
			    //扩展字段
				    	private _q_extend:string="";
			    //是否计入日志//0记录1不记录=
				    	private _q_log:number = 0;
			    //道具使用增加经验//用于料理增加的经验=
				    	private _q_add_value:number = 0;
			    //使用的VIP等级
				    	private _q_vip:number = 0;
			    //产出后公告
				    	private _q_output_notice:number = 0;
	    /**
	     * get 物品ID//=不能跟组包ID重复=20-50字段为英雄装备icon预留（尸霸装和虚装）
	     * @return 
	     */
	    public get q_id():number {
	        return this._q_id;
	    }
	    /**
	     * set 物品ID//=不能跟组包ID重复=20-50字段为英雄装备icon预留（尸霸装和虚装）
	     */
	    public set q_id($q_id:number){
	        this._q_id = $q_id;
	    }
	    /**
	     * get 物品名称//凯峰:=(最大九个汉字。支持_后缀，后缀部分在客户端不予显示)（物品名称需要唯一，以便在爆率表中使用汉字）
	     * @return 
	     */
	    public get q_name():string {
	        return this._q_name;
	    }
	    /**
	     * set 物品名称//凯峰:=(最大九个汉字。支持_后缀，后缀部分在客户端不予显示)（物品名称需要唯一，以便在爆率表中使用汉字）
	     */
	    public set q_name($q_name:string){
	        this._q_name = $q_name;
	    }
	    /**
	     * get 物品类型//0:货币;1普通物品;2脚本类道具:3英雄经验;4:礼包类;5：完整角色道具=
	     * @return 
	     */
	    public get q_type():number {
	        return this._q_type;
	    }
	    /**
	     * set 物品类型//0:货币;1普通物品;2脚本类道具:3英雄经验;4:礼包类;5：完整角色道具=
	     */
	    public set q_type($q_type:number){
	        this._q_type = $q_type;
	    }
	    /**
	     * get 背包标签//背包标签页展示（不填则不在背包中展示）1料理2福袋礼包3其他道具=0农场种子类道具
	     * @return 
	     */
	    public get q_type_show():number {
	        return this._q_type_show;
	    }
	    /**
	     * set 背包标签//背包标签页展示（不填则不在背包中展示）1料理2福袋礼包3其他道具=0农场种子类道具
	     */
	    public set q_type_show($q_type_show:number){
	        this._q_type_show = $q_type_show;
	    }
	    /**
	     * get 角色星数//1：一星；2：二星；3：三星……..=只有完成角色用到
	     * @return 
	     */
	    public get q_star():number {
	        return this._q_star;
	    }
	    /**
	     * set 角色星数//1：一星；2：二星；3：三星……..=只有完成角色用到
	     */
	    public set q_star($q_star:number){
	        this._q_star = $q_star;
	    }
	    /**
	     * get 打开礼包编号
	     * @return 
	     */
	    public get q_gift():number {
	        return this._q_gift;
	    }
	    /**
	     * set 打开礼包编号
	     */
	    public set q_gift($q_gift:number){
	        this._q_gift = $q_gift;
	    }
	    /**
	     * get 图标编号
	     * @return 
	     */
	    public get q_tiny_icon():string {
	        return this._q_tiny_icon;
	    }
	    /**
	     * set 图标编号
	     */
	    public set q_tiny_icon($q_tiny_icon:string){
	        this._q_tiny_icon = $q_tiny_icon;
	    }
	    /**
	     * get 颜色(0白色1绿色2蓝色3紫色4橙色5红色)//
	     * @return 
	     */
	    public get q_default():number {
	        return this._q_default;
	    }
	    /**
	     * set 颜色(0白色1绿色2蓝色3紫色4橙色5红色)//
	     */
	    public set q_default($q_default:number){
	        this._q_default = $q_default;
	    }
	    /**
	     * get 叠加数量//凯峰:=（1为不可叠加，最大可以填9999）
	     * @return 
	     */
	    public get q_max():number {
	        return this._q_max;
	    }
	    /**
	     * set 叠加数量//凯峰:=（1为不可叠加，最大可以填9999）
	     */
	    public set q_max($q_max:number){
	        this._q_max = $q_max;
	    }
	    /**
	     * get BUFF//凯峰:=（格式：BUFF编号;BUFF编号;BUFF编号）
	     * @return 
	     */
	    public get q_buff():string {
	        return this._q_buff;
	    }
	    /**
	     * set BUFF//凯峰:=（格式：BUFF编号;BUFF编号;BUFF编号）
	     */
	    public set q_buff($q_buff:string){
	        this._q_buff = $q_buff;
	    }
	    /**
	     * get 物品描述
	     * @return 
	     */
	    public get q_describe():string {
	        return this._q_describe;
	    }
	    /**
	     * set 物品描述
	     */
	    public set q_describe($q_describe:string){
	        this._q_describe = $q_describe;
	    }
	    /**
	     * get 扩展字段
	     * @return 
	     */
	    public get q_extend():string {
	        return this._q_extend;
	    }
	    /**
	     * set 扩展字段
	     */
	    public set q_extend($q_extend:string){
	        this._q_extend = $q_extend;
	    }
	    /**
	     * get 是否计入日志//0记录1不记录=
	     * @return 
	     */
	    public get q_log():number {
	        return this._q_log;
	    }
	    /**
	     * set 是否计入日志//0记录1不记录=
	     */
	    public set q_log($q_log:number){
	        this._q_log = $q_log;
	    }
	    /**
	     * get 道具使用增加经验//用于料理增加的经验=
	     * @return 
	     */
	    public get q_add_value():number {
	        return this._q_add_value;
	    }
	    /**
	     * set 道具使用增加经验//用于料理增加的经验=
	     */
	    public set q_add_value($q_add_value:number){
	        this._q_add_value = $q_add_value;
	    }
	    /**
	     * get 使用的VIP等级
	     * @return 
	     */
	    public get q_vip():number {
	        return this._q_vip;
	    }
	    /**
	     * set 使用的VIP等级
	     */
	    public set q_vip($q_vip:number){
	        this._q_vip = $q_vip;
	    }
	    /**
	     * get 产出后公告
	     * @return 
	     */
	    public get q_output_notice():number {
	        return this._q_output_notice;
	    }
	    /**
	     * set 产出后公告
	     */
	    public set q_output_notice($q_output_notice:number){
	        this._q_output_notice = $q_output_notice;
	    }
	}
}