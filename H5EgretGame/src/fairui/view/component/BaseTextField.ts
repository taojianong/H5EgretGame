module fairui{

    /**
     * 文本基类
     * @author cl 2019.1.30
     */
    export class BaseTextField extends fairygui.GTextField implements IComponent{

		//组件缓存池
		protected m_componentDic: flash.Dictionary = null;
		//事件缓存池
		protected m_eventPool: EventPool = null;
        
        public constructor(){

            super();

			this.m_eventPool = new EventPool();
			this.m_componentDic = new flash.Dictionary();
        }

		public setup_afterAdd( buffer: fairygui.ByteBuffer, beginPos: number ): void{

			super.setup_afterAdd( buffer , beginPos );
		}

		 public IsInited(): boolean {
			return true;
		}

        public get textHeight():number{

            return this._textHeight;
        }

        public setText( value:string ):void{

            value = Global.lang.getLang( value );
            this.text = value;
        }

        

        //---------------------------------------------------
        
		/**
		 * 增加监听事件函数
		 */
		public addAllListener():void {

			if( this.m_eventPool != null ){
				this.m_eventPool.relistenerAll();
				this.m_componentDic.forEach( function( key:any , data:any ):void{
					if( egret.is( data , "IComponent" ) ){
						(<IComponent>data).addAllListener();
					}
				} , this );
			}			
		}

		/**
		 * 移除监听事件函数
		 */
		public removeAllListener():void {

			if( this.m_eventPool != null ){
				this.m_eventPool.removeAllListener();
				this.m_componentDic.forEach( function( key:any , data:any ):void{
					if( egret.is( data , "IComponent" ) ){
						(<IComponent>data).removeAllListener();
					}
				} , this );
			}			
		}

		/**
		 * 添加事件监听
		 */
		public addGameListener(type: string, listener: Function, thisObject: any, target?: any) {
			if( this.m_eventPool != null ){
				this.m_eventPool.addListener( type , listener , target , thisObject );
			}
		}

		/**
		 * 移除事件监听
		 */
		public removeGameListener(type: string, listener: Function, thisObject: any, target?: any) {
			if( this.m_eventPool != null ){
				this.m_eventPool.removeListener( type , listener , target , thisObject );
			}
		}

		/**
		 * 添加组件
		 */
		public addComponent(component: IComponent): any {

			if( component ){
				let hashCode:number = component.getHashCode();
				this.m_componentDic.setItem( hashCode , component );
			}
			return component;
		}

		/**
		 * 移除组件
		 */
		public removeComponent(component: IComponent): void {

			if( component != null ){
				let hashCode:number = component.getHashCode();
				this.m_componentDic.delItem( hashCode  );
			}
		}

		/**
		 * 移除所有组件
		 */
		public removeAllComponent():void{

			this.m_componentDic.reset();
		}

		/**
		 * 重置界面
		 */
		public clear(): void {

			if (this.m_eventPool != null) {
				this.m_eventPool.removeAllListener();
			}
			this.m_componentDic.forEach( function( key:any , data:any ):void{
				if( egret.is( data , "IComponent" ) ){
					(<IComponent>data).clear();
				}
			} , this );
		}

		protected destroyComponent(): void {
			this.m_componentDic.forEach( function( key:any , data:any ):void{
				if( egret.is( data , "IComponent" ) ){
					(<IComponent>data).dispose();
				}
			} , this );		
		}

		/**
		 * 获取唯一hashCode
		 */
		public getHashCode(): number {

			return this.hashCode;
		}

		public get isDisposed(): boolean {
            return this["_disposed"];
        }

		/**
		 * 释放所有资源
		 */
		public dispose():void{

			if (this["_disposed"]){ //fairygui 中的私有属性
				return;
			}

			super.dispose();

			this.clear();

			if (this.m_eventPool) {
				this.m_eventPool.dispose();
			}
			this.m_componentDic = null;
			this.m_eventPool = null;
		}
    }
}