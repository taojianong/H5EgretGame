/**
 * 事件池
 * @author clong 2019.4.20
 */
class EventPool {

	private static pool:Array<EventPool> = [];

    public static create():EventPool{

        let obj:EventPool = EventPool.pool.shift();
        if( obj == null ){
            obj = new EventPool();
        }
        return obj;
    }

    public static recover( obj:EventPool ):void{

        if( obj != null && EventPool.pool.indexOf( obj ) == -1 ){
            EventPool.pool.push( obj );
        }
    }

    //----------------------------------------------------

	private _eventObjList:Array<EventObj> = null;

	public constructor() {

		this._eventObjList = [];
	}

	/**
	 * 添加事件监听
	 * @param type 		事件类型
	 * @param listener 	事件方法
	 * @param target	事件对象
	 * @param thisObj
	 */
	public addListener( type:string , listener:Function , target:egret.EventDispatcher = null , thisObj:any ):void{

		if( !this.hasEventListener(type,listener,target,thisObj) ){
			let obj:EventObj = EventObj.create( type , listener , target , thisObj );
			this._eventObjList.push( obj );
			EventManager.addEventListener( type , listener , thisObj , target );			
		}
	}

	/**
	 * 移除事件监听
	 * @param type 		事件类型
	 * @param listener 	事件方法
	 * @param target	事件对象
	 * @param thisObj	
	 */
	public removeListener( type:string , listener:Function , target:egret.EventDispatcher = null , thisObj:any ):void{

		let obj:EventObj = null;
		for( let i=0;i<this._eventObjList.length;i++ ){
			obj = this._eventObjList[i];
			if( obj && obj.type == type && obj.listener == listener && obj.thisObj == thisObj ){
				this._eventObjList.splice(i,1);
				break;
			}
		}
		EventManager.removeEventListener( type , listener , thisObj , target );
	}

	/**
	 * 移除池里所有事件监听,保持的对象不从列表里移除
	 */
	public removeAllListener():void{

		let obj:EventObj = null;
		for( let i=0;i<this._eventObjList.length;i++ ){
			obj = this._eventObjList[i];
			if( obj ){
				EventManager.removeEventListener( obj.type , obj.listener , obj.thisObj , obj.target );
			}
		}
	}

	/**
	 * 重新监听所有事件
	 */
	public relistenerAll():void{

		let obj:EventObj = null;
		for( let i=0;i<this._eventObjList.length;i++ ){
			obj = this._eventObjList[i];
			if( obj ){
				EventManager.addEventListener( obj.type , obj.listener , obj.thisObj , obj.target );
			}
		}
	}

	/**
	 * 是否有某个监听
	 * @param type 		事件类型
	 * @param listener 	事件方法
	 * @param target	事件对象
	 * @param thisObj	
	 */
	public hasEventListener( type:string , listener:Function , target:egret.EventDispatcher = null , thisObj:any ):boolean{

		let obj:EventObj = null;
		for( obj of this._eventObjList ){
			if( obj && obj.type == type && obj.listener == listener ){
				if( target == null ){
					return obj.thisObj == thisObj;
				}else{
					return obj.target == target && obj.thisObj == thisObj;
				}
			}
		}
		return false;
	}

	/**
	 * 释放资源
	 */
	public dispose():void{

		while( this._eventObjList && this._eventObjList.length > 0 ){
			let obj:EventObj = this._eventObjList.shift();
			if( obj ){
				EventManager.removeEventListener( obj.type , obj.listener , obj.thisObj , obj.target );
				obj.recover();
			}
		}
		this._eventObjList = [];

		EventPool.recover( this );
	}
}