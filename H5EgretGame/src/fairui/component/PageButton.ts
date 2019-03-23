module fairui {

	import CommonUtils = com.utils.CommonUtils;

	/**
	 * 翻页按钮
	 * @author cl 2018.4.27
	 */
	export class PageButton extends BaseButton{

		private bg:fairygui.GLoader;
		private btn_left:EButton;
		private btn_right:EButton;

		/**
		 * 当前页
		 */
		private _page:number = 1;
		
		/**
		 * 总页数
		 */
		private _totalPages:number = 1;
		
		/**
		 * 每页总条数
		 */
		private pageItems:number = 5;
		
		/**
		 * 翻页数组数据
		 */
		private _data:Array<any> = null;

		public constructor() {

			super();

			this.touchChildren = true;
			this.touchEnabled = false;
		}

		protected init():void{

			super.init();
		}

		public show( data:any ):void{

			super.show( data );

			this.btn_left.addEventListener( egret.TouchEvent.TOUCH_TAP , this.clickLeftHandler , this );
			this.btn_left.addEventListener( egret.TouchEvent.TOUCH_TAP , this.clickRightHandler , this );
		}

		public hide():void{

			this.btn_left.removeEventListener( egret.TouchEvent.TOUCH_TAP , this.clickLeftHandler , this );
			this.btn_left.removeEventListener( egret.TouchEvent.TOUCH_TAP , this.clickRightHandler , this );
		}

		/**
		 * 上一页
		 */
		private clickLeftHandler( e:egret.TouchEvent ):void{

			if( this._page > 1 ){
				this._page--;
				this.updateBtnStates();
				this.dispatchEvent( new GameEvent( GameEvent.SELECT ) );
			}
		}

		/**
		 * 下一页
		 */
		private clickRightHandler( e:egret.TouchEvent ):void{

			if( this._page < this._totalPages ){
				this._page++;
				this.updateBtnStates();
				this.dispatchEvent( new GameEvent( GameEvent.SELECT ) );
			}
		}

		/**
		 * 设置数据
		 * @param value 要翻页的数组数据
		 * @param items 单页总条数
		 */
		public setData( value:Array<any> , items:number= 5 ):void{
			
			this._data = value || [];
			this.pageItems = items;
			this._totalPages = CommonUtils.getPages( value , items );
			this._page = 1;
			
			//更新按钮状态
			this.updateBtnStates();
			this.dispatchEvent( new GameEvent( GameEvent.SELECT ) );
		}

		/**
		 * 更新按钮状态
		 */
		private updateBtnStates():void{
			
			this.title = this._page + "/" + this._totalPages;
			
			this.btn_left.enabled 	= !(this._page <= 1);
			this.btn_right.enabled 	= !(this._page >= this._totalPages);
		}
		
		/**
		 * 当前页
		 */
		public get page():number{
			
			return this._page;
		}
		
		/**
		 * 总页数
		 */
		public get totalPage():number{
			
			return this._totalPages;
		}
		
		/**
		 * 翻页的所有数据
		 */
		public get data():Array<any>{
			
			return this._data;
		}
		
		/**
		 * 获取当前页数据
		 */
		public get pageData():Array<any>{
			
			return CommonUtils.getPageList( this._data , this.page , this.pageItems );
		}

		/**
         * 设置背景资源 resource\res\image\panel\路径下
         * @param pkgName 包名
         * @param resname 资源名
         * @param suffix  后缀名
         */
        public setBgSource( pkgName:string , resname:string , suffix: string = ".jpg"):void{

            let index:number = resname.lastIndexOf(".");                
            suffix = index != -1 ? resname.substring( index ) : suffix;
            resname = index != -1 ? resname.substring( 0 , index ) : resname;
            this.loadResByUrl( this.getPanelResUrl( pkgName , resname , suffix) , this.bg , this.loadBgComplete );
        }

		protected loadBgComplete( e:any = null ):void{

            if( e instanceof egret.Event ){
                this.bg.removeEventListener( egret.Event.COMPLETE , this.loadBgComplete , this );
            }            
            this.bg.x = ( this.width - this.bg.width ) * 0.5;
            this.bg.y = ( this.height - this.bg.height ) * 0.5;
        }

		public dispose():void{

			super.dispose();

			this._data = null;
			this._page = 0;
			this._totalPages = 0;
			this.pageItems = 0;
		}
	}
}