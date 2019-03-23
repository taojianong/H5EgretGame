module com.game.data.bean
{

	
		export class Q_itemExpandBean extends Q_itemBean 
		{
			public static build(configName:string = "", config:Object, keyObj:Object):Q_itemExpandBean
			{
				var bean:Q_itemExpandBean = new Q_itemExpandBean();
				if(keyObj)
				{
					for (var key in config) 
					{
						var key2:Object = keyObj[key];
						if(bean.hasOwnProperty("_"+key2)){
							bean["_"+key2] = config[key];
						}
						else{
							com.bean.DataConfigUtils.instances().beanConfigPropertyError(configName, key2);
						}
					}
				}
				else
				{
					for (key in config) 
					{
						if(bean.hasOwnProperty("_"+key)){
							bean["_"+key] = config[key];
						}
						else{
							com.bean.DataConfigUtils.instances().beanConfigPropertyError(configName, key);
						}
					}
				}
				bean.init(config);
				return bean;
			}
			
			/* 扩展字段 */
			public init(config:Object):void
			{
				
			}
		}
	}
