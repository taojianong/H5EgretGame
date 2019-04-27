module load {

	/**
	 * 资源缓存
	 * @param clong 2019.4.27
	 */
	export class LoaderCache {

		/**回收间隔时间，秒 */
		public static GC_TIME: number = 2;

		/**资源池**/
		private static sourcePool: flash.Dictionary = new flash.Dictionary();

		/**
		 * 加入资源
		 * */
		public static put(res: Resource): void {

			if (res) {
				LoaderCache.sourcePool.setItem(res.url, res);
				if( LoaderCache.sourcePool.keys.length > 0 ){
					Global.timer.doTimeLoop( 1000 , flash.bind( LoaderCache.checkAndDestroyRes , this ) );
				}
			}
		}

		/**
		 * 获取对应URL资源
		 * @param url 资源地址
		 * @param isCount 是否计数，正常是要计数的，只是用于一般逻辑不计数,默认为不计数的(因为用于判断的时候比较多)
		 * @param target 添加引用对象
		 * */
		public static getData(url: string , isCount:boolean = false , target:any = null ): any {

			let res: Resource = LoaderCache.getRes(url);
			if( res ){
				return isCount ? res.getRes( target ) : res.data;
			}
			return null;
		}

		public static getRes(url: string): Resource {

			return LoaderCache.sourcePool.getItem(url);
		}

		public static hasRes(url: string): boolean {

			return LoaderCache.getRes(url) != null;
		}

		/**
		 * 销毁资源
		 * @param url 		资源地址
		 * @param isMust 	是否强制销毁
		 * @param target 	引用对象
		 */
		public static destroyRes(url: string, isMust: boolean = false , target:any = null ): void {

			let res: Resource = LoaderCache.getRes(url);
			if (res) {
				let url:string = res.url;
				if (isMust || !target ) {
					res.forceDispose();
				}else {
					res.removeTarget( target );//移除对应的引用对象
					if( !res.isDisposed ){
						res.dispose();
					}					
				}			
			}
		}

		/**
		 * 检测并销毁资源
		 */
		private static checkAndDestroyRes():void{

			let time:number = egret.getTimer();

			LoaderCache.sourcePool.forEach( function a( key:any , data:any ):void{
				if( data instanceof Resource && data.lastTime > 0 && time > data.lastTime ){
					let url:string = data.url;			
					if( data.isDisposed ){

						// data.dispose();
						if( data.recover() ){							
							// data.recover();//回收Resource到池中
							LoaderCache.sourcePool.delItem( url );
							RES.destroyRes( url );

							Global.log.log( this , "-------资源管理器释放资源 url:" + url );
							fairui.Notice.showMiddleMessage( "释放资源【"+url+"】成功" );
						}
						EventManager.dispatchEvent( LoaderEvent.DISPOSE_RESOURCE , url );				
					}
				}
			} , this );

			if( LoaderCache.sourcePool.keys.length <= 0 ){
				Global.timer.clearTimer( flash.bind( LoaderCache.checkAndDestroyRes , this ) );
			}
		}
	}
}