
/**
 * 通用事件类
 * @author clong 2019.3.23
 */
class EventObj {

    private static pool:Array<EventObj> = [];

    public static create( type: string, listener: Function, target: egret.EventDispatcher = null, thisObj: any = null ):EventObj{

        let obj:EventObj = EventObj.pool.shift();
        if( obj == null ){
            obj = new EventObj();
        }
        obj.type = type;
        obj.listener = listener;
        obj.target = target;
        obj.thisObj = thisObj;
        return obj;
    }

    public static recover( obj:EventObj ):void{

        if( obj != null && EventObj.pool.indexOf( obj ) == -1 ){
            EventObj.pool.push( obj );
        }
    }

    //----------------------------------------------------

    private _type: string;
    private _listener: Function;
    private _target: egret.EventDispatcher;
    private _thisObj: any;

    /**
     * 事件构造函数
     * @param type      事件类型
     * @param listener       事件响应处理函数
     * @param target    事件绑定的控件
     * @param _hisObj   是否是绑定控件的 handler方法
     * 
     */
    public constructor( type: string = "" , listener: Function = null , target: egret.EventDispatcher = null, thisObj: any = null ) {

        this._type = type;
        this._listener = listener;
        this._target = target;
        this._thisObj = thisObj;
    }

    public set type(value:string){

        this._type = value;
    }

    public get type(): string {

        return this._type;
    }

    public set listener( value:Function ){

        this._listener = value;
    }

    public get listener(): Function {

        return this._listener;
    }

    public set target( value:egret.EventDispatcher ){

        this._target = value;
    }

    public get target(): egret.EventDispatcher {

        return this._target;
    }

    public set thisObj( value:any ){

        this._thisObj = value;
    }

    public get thisObj(): any {

        return this._thisObj;
    }

    /**重置并回收 */
    public recover():void{

        this._type = "";
        this._listener = null;
        this._target = null;
        this._thisObj = null;

        EventObj.recover( this );
    }
}