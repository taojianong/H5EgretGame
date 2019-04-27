module load {

	/**
	 * 主加载器
	 * @author clong 2019.4.26
	 */
	export class LoaderMax extends egret.EventDispatcher {

		/**加载数量上限 */
		public loadThreadLimit:number = 1;
		/**加载队列 */
		private loadMap:flash.Dictionary = new flash.Dictionary();
		/**完成事件字典 */
		private completeMap:flash.Dictionary = new flash.Dictionary();

		public constructor( value: number = 5 ){

			super();

			this.loadThreadLimit = value;
			//加载上限
			RES.setMaxLoadingThread(value);

			EventManager.addEventListener( LoaderEvent.COMPLETE , this.loadResComplete , this );
		}

		//------------------------------------------
		private groupId:number = 0;
		private groupMap:flash.Dictionary = new flash.Dictionary();
		/**
		 * 加载资源列表
		 * @param urls 资源列表
		 * @param handler 资源加载完成调用方法
		 * @param level 加载等级
		 */
		public loadList( urls:Array<string> , handler:utils.Handler , level:number = 0 ):void{

			let group:ResGroup = new ResGroup( this.groupId++ , urls , handler , level );
			this.groupMap.setItem( group.id , group );

			let url:string;
			for( let i=0;i<urls.length;i++ ){
				url = urls[i];
				this.load( url , null , level );
			}
		}

		/**
		 * 加载单个资源
		 * @param url 加载地址
		 * @param handler 加载完成Handler
		 * @param level 加载等级
		 */
		public load( url:string , handler:utils.Handler = null , level:number = 0 ):void{

			let data:any = LoaderCache.getData( url , false );
			if( data != null ){//缓存中已有该资源
				if( handler != null ){
					handler.execute();
				}
				return;
			}
			
			//加载资源完成方法回调
			let map:flash.Dictionary = this.completeMap.getItem( url );
			if( map == null ){
				map = new flash.Dictionary();
				this.completeMap.setItem( url , map );
			}
			map.setItem( handler , handler );

			//添加资源
			let res:Resource = LoaderCache.getRes( url );
			if( res != null ){//正在加载队列中
				return;
			}else{
				res = ObjectPool.getObject( Resource , url , level );//Resource将在资源回收时回收
			}			
			if( res && res.resType == LoaderStatus.TYPE_TEXTURE ){
				let imgLoader:ImageLoader = new ImageLoader();
				imgLoader.loadRes( res );
				this.addToLoadList( imgLoader );

				LoaderCache.put( res );
			}
		}		

		private addToLoadList( loadItem:LoaderCore ):void{

			this.loadMap.setItem( loadItem.url , loadItem );
		}

		/**是否在加载队列中 */
		private isInLoadList( url:string ):boolean{

			return this.loadMap.getItem( url ) != null;
		}

		/**
		 * 加载资源完成
		 */
		private loadResComplete( res:Resource ):void{

			let _self:LoaderMax = this;
			let url:string = res.url;

			//执行加载完成事件
			let map:flash.Dictionary = this.completeMap.getItem( url );
			map.forEach( function(key:any,handler:any):void{
				if( handler instanceof utils.Handler ){
					handler.execute();
				}
			} , this );
			map.reset();
			this.completeMap.delItem( url );

			//判断一组资源是否加载完成
			this.groupMap.forEach( function(id:any,group:ResGroup):void{
				if( group.urls.indexOf( url ) != -1 && group.allLoaded ){
					if( group.handler != null ){
						group.handler.execute();
					}
					_self.groupMap.delItem( id );
					EventManager.dispatchEvent( LoaderEvent.LOAD_LIST_COMPLETE , group.urls );
					group.dispose();
					return;
				}
			} , this );

			//从加载字典中移除
			this.loadMap.delItem( url );
		}

		private static _inst:LoaderMax;
		public static getInst():LoaderMax{
			return this._inst = this._inst || new LoaderMax();
		}
	}

	/**
	 * 资源组
	 * @author clong 2019.4.27
	 */
	class ResGroup{

		public id:number = 0;
		public urls:Array<string> = [];
		public handler:utils.Handler = null;
		public level:number = 0;

		public constructor( id:number , urls:Array<string> , handler:utils.Handler , level:number ){

			this.id = id;
			this.urls = urls;
			this.handler = handler;
			this.level = level;
		}

		/**
		 * 所有资源已加载完
		 */
		public get allLoaded():boolean{

			if( this.urls ){
				let url:string;
				for( url of this.urls ){
					if( !LoaderCache.getData( url ) ){
						return false;
					}
				}
			}
			return true;
		}

		public dispose():void{

			this.id = 0;
			this.urls = null;
			this.handler = null;
			this.level = 0;
		}
	}
}