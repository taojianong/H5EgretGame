class CHandler implements IDispose {

	private _handler: Function;
	private _params: Array<any>;

	private _isDispose: boolean = false;

	public constructor(handler: Function, param: Array<any> = null) {
		//super();
		this._handler = handler;
		this._params = param;
	}

	public get params(): Array<any> {
		return this._params;
	}

	public set params(value: Array<any>) {
		this._params = value;
	}

	public get handler(): Function {
		return this._handler;
	}

	public execute() {
		if (this._handler != null) {
			this._handler.apply(null, this._params);
		}
	}

	public executeWith(data: Array<any>) {
		if (data == null) {
			this.execute();
		}
		else if (this._handler != null) {
			this._handler.apply(null, this._params ? this._params.concat(data) : data);
		}
	}

	public get isDispose(): boolean {
		return this._isDispose;
	}

	public dispose() {
		this._handler = null;
		this._params = null;
		this._isDispose = true;
	}
}