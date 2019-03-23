module fairui{

    /**
     * 外部资源管理器 cl 2018.3.12
     */
    export class LoaderManager{

        /**
         * 资源池
         */
        private static sourceMap:flash.Dictionary = new flash.Dictionary();

        /**
         * 引用对象池 {url:[target]}
         */
        private static targetMap:flash.Dictionary = new flash.Dictionary();

        /**
         * 加载外部图片资源
         * @param url 资源地址
         * @param callback 回调方法
         * @param callbackParams 回调方法参数 
         */
        public static loadImageRes( url:string , thisObj:any = null , callback:Function = null , callbackParams:Array<any> = null ):void{

            thisObj = thisObj || this;

            let _this:any = this;
            let texture:egret.Texture = this.getRes( url );
            if( texture != null ){
                if( callback != null ){
                    callbackParams = callbackParams || [];
                    callbackParams.unshift( texture );
                    callback.apply( thisObj , callbackParams );
                }
            }else{
                RES.getResByUrl( url , function loadJobImg(texture:egret.Texture,index:Number):void{                
                    if( callback != null ){
                        _this.sourceMap.setItem( url , texture );

                        callbackParams = callbackParams || [];
                        callbackParams.unshift( texture );
                        callback.apply( thisObj , callbackParams );                        
                    }
                } , thisObj , RES.ResourceItem.TYPE_IMAGE );
            }            
        }

        /**
         * 获取资源
         * @param url 资源地址
         * @param target 引用对象
         */
        public static getRes( url:string , target:any = null ):any{

            let res:any = this.sourceMap.getItem( url );
            if( res != null ){
                let arr:Array<any> = this.targetMap.getItem( url );
                if( arr == null ){
                    arr = new Array<any>();
                    this.targetMap.setItem( url , arr );                    
                }
                if( arr.indexOf(target) == -1 ){
                    arr.push( target );
                }                
            }
            return res;
        }

        /**
         * 释放对应引用对象
         * @param url    地址
         * @param target url使用对象
         * @param isMust 是否强制释放
         */
        public static disposeTarget( url:string , target:any , isMust:boolean=false):void{

            let arr:Array<any> = this.targetMap.getItem( url );
            if( arr && arr.length > 0 ){
                let index:number = arr.indexOf( target );
                if( index != -1 ){
                    arr.splice( index , 1 );
                }
            }
            if( arr == null || arr.length <= 0 || isMust ){
                this.targetMap.delItem( url );
                this.disposeRes( url );
                arr = null;
            }
        }
        

        /**
         * 释放资源
         */
        public static disposeRes( url:string ):void{

            let texture:egret.Texture = this.getRes( url );
            if( texture != null ){
                this.sourceMap.delItem( url );
                texture.dispose();
                texture = null;

                //清除缓存
                // delete RES.config.config.alias[ url ];
                // delete (<any>RES.fileSystem).fsData[url];
                // delete RES.host.state["resource/"+url];
                // delete RES.host.state[url];

                RES.destroyRes( url );
            }
        }


        /**
		 * 是否所有资源组都加载完毕了
         * @param groups 资源组 如：login,main
		 */
		public static hasLoadAllGroups( groups:string ):boolean{

			let arr:Array<string> = groups.split(",");
			let group:string = "";
			for( group of arr ){
				if( group && !RES.isGroupLoaded(group) ){
					return false;
				}
			}
			return true;	
		}

        /**
		 * 加载多个组资源 
         * @param groups 资源组 如：login,main
         * @param loadComplete 加载完成方法
         * @param params 加载完成方法参数
         * @param reporte 加载进度
         * @param thisObj 
		 */
		public static loadGroups( groups:string , loadComplete:Function = null , params:Array<any> = null , reporte:RES.PromiseTaskReporter=null , thisObj:any = null ):void{

            let arr:Array<string> = groups.split(",");
            loadNext();
            function loadGroup( group:string ):void{
                RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, function loadComplete(event: RES.ResourceEvent): void {
                    if (event.groupName == group ) {
                        loadNext();
                    }
                }, this);
                RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, function loadComplete(event: RES.ResourceEvent): void {
                    if (event.groupName == group ) {//加载完成
                        loadNext();
                    }
                }, this);
                RES.loadGroup( group , 0 , reporte );
            }
            //加载下一个
            function loadNext():void{
                if( arr.length <= 0 ){//加载完成
                    loadComplete.apply( thisObj , params );
                }else{
                    let group:string = arr.shift();
                    if( !RES.isGroupLoaded(group) ){
                        loadGroup( group );//加载下一个
                    }else{
                        loadNext();
                    }                    
                }
            }
		}
    }
}