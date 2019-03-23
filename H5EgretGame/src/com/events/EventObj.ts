
/**
 * 通用事件类 cl 2019.3.23
 */
class EventObj {

    private _eventKey: string;
    private _fun: Function;
    private _source: egret.EventDispatcher;
    private _handler: Function;
    private _thisObj: any;

    /**
     * 事件构造函数
     * @param eventKey 事件Key
     * @param fun 事件响应处理函数
     * @param source 事件绑定的控件
     * @param handler 是否是绑定控件的 handler方法
     * 
     */
    public constructor(eventKey: string, fun: Function, source: egret.EventDispatcher = null, thisObj: any = null, handler: Function = null, args: Array<any> = null) {

        this._eventKey = eventKey;
        this._fun = fun;
        this._source = source;
        this._handler = handler;
        this._thisObj = thisObj;
    }

    public get eventKey(): string {

        return this._eventKey;
    }

    public get fun(): Function {

        return this._fun;
    }

    public get source(): egret.EventDispatcher {

        return this._source;
    }

    public get handler(): Function {

        return this._handler;
    }

    public get thisObj(): any {

        return this._thisObj;
    }
}