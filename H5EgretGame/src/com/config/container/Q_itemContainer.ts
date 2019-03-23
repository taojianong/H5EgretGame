module com {
	export module game {
		export module data {
			export module container {
				export class Q_itemContainer extends egret.HashObject {
					protected list:Array<com.game.data.bean.Q_itemExpandBean> = new Array<com.game.data.bean.Q_itemExpandBean>();
					protected map:flash.Dictionary = new flash.Dictionary();
					protected configName:string = "";
					public load()
					{
						com.bean.DataConfigUtils.instances().loadJsonFile("Q_itemBean",flash.bind(this.onFinish,this));
					}

					protected onFinish(_configName:string,data:any,keyObj:any)
					{
						this.configName = _configName;
						var ary:Array<any> = flash.As3As(data,Array);
						var leng:number = flash.checkInt(ary.length);
						for(var i:number = flash.checkInt(0);i < leng; i++)
						{
							var config:any = flash.As3As(ary[i],Object);
							var mybean:com.game.data.bean.Q_itemExpandBean = com.game.data.bean.Q_itemExpandBean.build(this.configName,config,keyObj);
							this.map.setItem(mybean.q_id,mybean);
							this.list.push(mybean);
						}
					}

					public getDataBean(key:any):com.game.data.bean.Q_itemExpandBean
					{
						if(this.map.getItem(key))
						{
							return flash.As3As(this.map.getItem(key),com.game.data.bean.Q_itemExpandBean);
						}
						else
						{
							com.bean.DataConfigUtils.instances().notHaveBean(this.configName,key);
						}
						return null;
					}

					public hasDataBean(key:any):boolean
					{
						return flash.Boolean(this.map.getItem(key));
					}

					public getList():Array<com.game.data.bean.Q_itemExpandBean>
					{
						return this.list;
					}

					public getHashMap():flash.Dictionary
					{
						return this.map;
					}

				}
			}
		}
	}
}

