module load {

	/**
	 * 图片加载
	 * @author clong 2019.4.27
	 */
	export class ImageLoader extends LoaderItem {

		public constructor() {

			super();
		}

		protected load(res: Resource): void {

			super.loadRes(res);
		}

		protected loadDataComplete( data: any , url:string ): void {

			if( this.res.url == url ){
				this.res.data = data;
				EventManager.dispatchEvent( LoaderEvent.COMPLETE , this.res );
			}			
		}
	}
}