/**
 * 对象池
 * @author clong 2019.4.27
 */
class ObjectPool implements IDispose{

	public static _pool:Object = {};

	/**
	 * 从池中拿对象
	 * @param cls 类对象
	 */
	public static getObject( cls:any , ...args ):any{

		if( !cls ) return null;
		let clsName:string = egret.getQualifiedClassName(cls);// egret.getDefinitionByName( egret.getQualifiedClassName(cls) );
		let pool:ObjectPool = ObjectPool._pool[ clsName ];
		if( pool == null ){
			pool = new ObjectPool( cls );
			ObjectPool._pool[ clsName ] = pool;
		}
		return pool.getObject( args );
	}

	/**
	 * 回收对象
	 * @param item 实例对象
	 */
	public static recoverObject( item:any ):void{

		if( !item ) return null;
		let clsName:string = egret.getQualifiedClassName( item );
		let pool:ObjectPool = ObjectPool._pool[ clsName ];
		if( pool == null ){
			let cls:any = egret.getDefinitionByName( clsName );
			pool = new ObjectPool( cls );
			ObjectPool._pool[ clsName ] = pool;
		}
		pool.recoverObject( item );
	}

	//--------------------------

	private _cls:any;//类
	private _pool:Array<any> = [];

	public isDisposed:boolean = false;
	
	public constructor( cls:any ){
		
		this._cls = cls;
	}

	public getObject( args:Array<any> ):any{

		let obj:any = this._pool.shift();
		if( obj == null ){
			obj = new this._cls();
		}
		if( egret.is( obj , "IPool" ) ){
			(<IPool>obj).create.apply( obj , args );
		}
		return obj;
	}

	public recoverObject( obj:any ):void{

		if( this._pool.indexOf(obj) == -1 ){
			if( egret.is( obj , "IPool" ) ){
				(<IPool>obj).clear();				
			}
			this._pool.push( obj );
		}
	}

	/**
	 * 释放资源
	 */
	public dispose():void{

		let obj:any;
		while( this._pool && this._pool.length > 0 ){
			obj = this._pool.shift();
			if( egret.is( obj , "IDispose" ) ){
				(<IDispose>obj).dispose();				
			}
		}
		this._pool = [];
	}
}